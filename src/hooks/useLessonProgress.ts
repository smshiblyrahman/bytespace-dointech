"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "bytespace:completed-lessons";
const EVENT = "bytespace:progress";
const EMPTY: string[] = [];

let cache: { raw: string | null; value: string[] } = { raw: null, value: EMPTY };

function read(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cache.raw) return cache.value;
  let value: string[] = EMPTY;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    value = Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : EMPTY;
  } catch {
    value = EMPTY;
  }
  cache = { raw, value };
  return value;
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Completed lesson keys (`courseId/lessonId`) persisted in localStorage. */
export function useLessonProgress(courseId: string) {
  const completed = useSyncExternalStore(subscribe, read, () => EMPTY);

  const isComplete = useCallback((lessonId: string) => completed.includes(`${courseId}/${lessonId}`), [completed, courseId]);

  const toggle = useCallback(
    (lessonId: string) => {
      const key = `${courseId}/${lessonId}`;
      const next = read().includes(key) ? read().filter((k) => k !== key) : [...read(), key];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // Storage unavailable (private mode) — progress just won't persist.
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [courseId],
  );

  const completedCount = completed.filter((k) => k.startsWith(`${courseId}/`)).length;

  return { isComplete, toggle, completedCount };
}
