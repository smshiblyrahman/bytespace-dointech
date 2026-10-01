"use client";

import { useState } from "react";

/** Private notes for the lesson, kept in memory for the session. */
export function LessonNotes({ lessonTitle }: { lessonTitle: string }) {
  const [notes, setNotes] = useState("");
  return (
    <label className="flex flex-col gap-3">
      <span className="sr-only">Notes for {lessonTitle}</span>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={5}
        placeholder="Write down key takeaways, questions or timestamps…"
        className="w-full resize-y rounded-2xl border border-shuttle-100 bg-white px-6 py-4 font-body text-base leading-[1.6] text-shuttle-950 outline-none transition-[border-color,box-shadow] placeholder:text-shuttle-400 focus:border-persian-blue-800 focus:shadow-[0_0_0_4px_rgb(0_59_226/0.12)]"
      />
      <span className="self-end font-body text-sm text-shuttle-400">{notes.length} characters</span>
    </label>
  );
}
