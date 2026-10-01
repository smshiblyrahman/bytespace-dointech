import { cn } from "@/lib/cn";

/** Full-width "Learning Progress" card from the Lessons tab. */
export function LearningProgress({ percent, className }: { percent: number; className?: string }) {
  return (
    <div className={cn("flex w-full flex-col gap-2 rounded-2xl border border-shuttle-200 bg-white p-4", className)}>
      <p className="font-body text-sm leading-[1.2] font-medium text-shuttle-950">Learning Progress</p>
      <p className="font-heading text-4xl leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-950">{percent}%</p>
      <div
        className="h-2 w-full overflow-hidden rounded-3xl bg-shuttle-100"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        <div className="h-full rounded-3xl bg-lime-400 transition-[width] duration-700" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
