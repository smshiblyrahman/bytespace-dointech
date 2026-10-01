"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { cn } from "@/lib/cn";
import type { CourseSection } from "@/types";

type LessonSidebarProps = {
  courseId: string;
  sections: CourseSection[];
  activeLessonId: string;
  className?: string;
};

const CHECK = "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";

/** Curriculum card for the learning view: expandable modules, active + completed lessons, progress. */
export function LessonSidebar({ courseId, sections, activeLessonId, className }: LessonSidebarProps) {
  const { isComplete, completedCount } = useLessonProgress(courseId);
  const activeSection = sections.find((s) => s.lessons.some((l) => l.id === activeLessonId))?.id;
  const [open, setOpen] = useState<string[]>(activeSection ? [activeSection] : []);
  const total = sections.reduce((n, s) => n + s.lessons.length, 0);
  const percent = Math.round((completedCount / total) * 100);

  // Lesson numbers run continuously across modules.
  const offsets = sections.map((_, i) => sections.slice(0, i).reduce((n, s) => n + s.lessons.length, 0));

  return (
    <aside
      aria-label="Course content"
      className={cn("flex flex-col gap-6 rounded-3xl border border-shuttle-200 bg-white p-6 sm:p-10 xl:w-[412px]", className)}
    >
      <div className="flex flex-col gap-3">
        <h2 className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-950">
          Course content
        </h2>
        <p className="font-body text-base leading-[1.6] text-shuttle-700">
          {completedCount} of {total} lessons completed
        </p>
        <div className="h-2 w-full overflow-hidden rounded-3xl bg-shuttle-100" aria-hidden>
          <div className="h-full rounded-3xl bg-lime-400 transition-[width] duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <ul className="flex flex-col gap-2">
        {sections.map((section, sectionIndex) => {
          const expanded = open.includes(section.id);
          const listId = `${section.id}-list`;
          return (
            <li key={section.id} className="border-b border-shuttle-100 pb-2 last:border-0">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={listId}
                onClick={() =>
                  setOpen((ids) => (expanded ? ids.filter((id) => id !== section.id) : [...ids, section.id]))
                }
                className="flex w-full items-center justify-between gap-4 py-2 text-left font-body text-base leading-[1.2] font-medium text-shuttle-950 hover:text-persian-blue-800"
              >
                {section.title}
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  aria-hidden
                  className={cn("shrink-0 transition-transform duration-300", expanded && "rotate-180")}
                >
                  <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" fill="#4B4C53" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.ol
                    id={listId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-1 overflow-hidden"
                  >
                    {section.lessons.map((lesson, i) => {
                      const number = offsets[sectionIndex] + i + 1;
                      const active = lesson.id === activeLessonId;
                      const done = isComplete(lesson.id);
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/courses/${courseId}/lessons/${lesson.id}`}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-start justify-between gap-4 rounded-2xl px-3 py-2.5 font-body text-base transition-colors",
                              active ? "bg-lime-400 text-shuttle-950" : "text-shuttle-700 hover:bg-shuttle-50",
                            )}
                          >
                            <span className="flex gap-2 leading-[1.2] font-medium">
                              <span className="w-6 shrink-0">{String(number).padStart(2, "0")}</span>
                              {lesson.title}
                            </span>
                            <span className="flex shrink-0 items-center gap-2 leading-[1.2]">
                              {done && (
                                <svg width={18} height={18} viewBox="0 0 24 24" aria-label="Completed">
                                  <path d={CHECK} fill={active ? "#242528" : "#003BE2"} />
                                </svg>
                              )}
                              <span className={active ? "" : "text-persian-blue-800"}>{lesson.duration} mins</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ol>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
