"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import type { CourseSection } from "@/types";

type CourseCurriculumProps = {
  courseId: string;
  sections: CourseSection[];
};

/** Module list from the Lessons tab; each module expands to reveal its lessons. */
export function CourseCurriculum({ courseId, sections }: CourseCurriculumProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="flex flex-col gap-6">
      {sections.map((section) => {
        const expanded = open === section.id;
        const panelId = `${section.id}-lessons`;
        return (
          <li key={section.id}>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : section.id)}
              className="group flex w-full items-center gap-[13px] text-left"
            >
              <span className="flex shrink-0 items-center justify-center rounded-3xl bg-lime-400 p-4 transition-transform duration-300 group-hover:scale-105">
                <Image src="/assets/icons/videocam-lg.svg" alt="" width={40} height={40} />
              </span>
              <span className="flex min-w-0 flex-col gap-1 font-body text-base lg:w-[638px]">
                <span className="leading-[1.2] font-medium text-shuttle-950 group-hover:text-persian-blue-800">
                  {section.title}
                </span>
                <span className="leading-[1.6] text-shuttle-700">{section.description}</span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ol
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pl-[85px]"
                >
                  {section.lessons.map((lesson) => (
                    <li key={lesson.id} className="first:mt-4">
                      <Link
                        href={`/courses/${courseId}/lessons/${lesson.id}`}
                        className={cn(
                          "flex items-center justify-between gap-4 border-b border-shuttle-100 py-3 font-body text-base transition-colors hover:text-persian-blue-800",
                          "text-shuttle-950",
                        )}
                      >
                        <span className="leading-[1.2] font-medium">{lesson.title}</span>
                        <span className="flex shrink-0 items-center gap-3 leading-[1.6] text-persian-blue-800">
                          {lesson.isPreview && (
                            <span className="rounded-3xl bg-lime-400 px-2 py-0.5 text-xs font-medium text-shuttle-950">
                              Preview
                            </span>
                          )}
                          {lesson.duration} mins
                        </span>
                      </Link>
                    </li>
                  ))}
                </motion.ol>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
