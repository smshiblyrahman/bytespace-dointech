"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CourseTab = "about" | "lessons" | "reviews";

const tabs: { id: CourseTab; label: string }[] = [
  { id: "about", label: "About" },
  { id: "lessons", label: "Lessons" },
  { id: "reviews", label: "Reviews" },
];

type CourseTabsProps = {
  initial: CourseTab;
  panels: Record<CourseTab, ReactNode>;
};

/** Pill tabs (About / Lessons / Reviews). The active tab is mirrored to `?tab=` so it can be shared. */
export function CourseTabs({ initial, panels }: CourseTabsProps) {
  const [active, setActive] = useState<CourseTab>(initial);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(tab: CourseTab) {
    setActive(tab);
    const url = new URL(window.location.href);
    if (tab === "about") url.searchParams.delete("tab");
    else url.searchParams.set("tab", tab);
    window.history.replaceState(window.history.state, "", url);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + tabs.length) % tabs.length;
    select(tabs[next].id);
    refs.current[next]?.focus();
  }

  return (
    <div className="flex flex-col gap-10">
      <div
        role="tablist"
        aria-label="Course information"
        className="-mx-4 flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0"
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "shrink-0 rounded-3xl px-4 py-3 font-body text-base leading-[1.2] font-medium whitespace-nowrap transition-colors duration-300",
                selected ? "bg-lime-400 text-shuttle-950" : "bg-shuttle-50 text-shuttle-700 hover:bg-shuttle-100",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-${tab.id}-panel`}
          aria-labelledby={`${baseId}-${tab.id}-tab`}
          hidden={tab.id !== active}
          tabIndex={0}
          className="outline-none"
        >
          {panels[tab.id]}
        </div>
      ))}
    </div>
  );
}
