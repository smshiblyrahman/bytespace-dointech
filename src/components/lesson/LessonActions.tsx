"use client";

import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import type { Lesson } from "@/types";

type LessonActionsProps = {
  courseId: string;
  lessonId: string;
  prev?: Lesson;
  next?: Lesson;
};

const secondary =
  "inline-flex items-center justify-center rounded-3xl border border-shuttle-200 px-6 py-3 font-body text-lg leading-[1.2] font-medium whitespace-nowrap text-shuttle-700 transition-colors hover:border-persian-blue-800 hover:text-persian-blue-800";

export function LessonActions({ courseId, lessonId, prev, next }: LessonActionsProps) {
  const { isComplete, toggle } = useLessonProgress(courseId);
  const done = isComplete(lessonId);

  return (
    <div className="flex flex-col gap-4 border-t border-shuttle-100 pt-10 sm:flex-row sm:items-center sm:justify-between">
      <Button
        onClick={() => toggle(lessonId)}
        aria-pressed={done}
        className={done ? "bg-persian-blue-800 text-white hover:bg-persian-blue-800" : undefined}
      >
        {done ? "Completed ✓" : "Mark as complete"}
      </Button>

      <nav aria-label="Lesson navigation" className="flex flex-wrap gap-4">
        {prev ? (
          <Link href={`/courses/${courseId}/lessons/${prev.id}`} className={secondary}>
            ← Previous
          </Link>
        ) : (
          <Link href={`/courses/${courseId}`} className={secondary}>
            ← Back to course
          </Link>
        )}
        {next ? (
          <ButtonLink href={`/courses/${courseId}/lessons/${next.id}`}>Next lesson →</ButtonLink>
        ) : (
          <ButtonLink href={`/courses/${courseId}?tab=reviews`}>Finish course</ButtonLink>
        )}
      </nav>
    </div>
  );
}
