import { StarRating } from "@/components/ui/StarRating";
import type { CourseDetail } from "@/types";

export function RatingSummary({ breakdown }: { breakdown: CourseDetail["ratingBreakdown"] }) {
  const total = breakdown.reduce((sum, row) => sum + row.count, 0);
  const average = breakdown.reduce((sum, row) => sum + row.stars * row.count, 0) / total;

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-shuttle-200 bg-white p-6 sm:flex-row sm:p-10">
      <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-lime-400 p-10 whitespace-nowrap text-shuttle-950">
        <p className="font-body text-sm leading-[1.2] font-medium">Ratings</p>
        <p className="font-heading text-4xl leading-[1.2] font-semibold tracking-[-0.01em]">{average.toFixed(1)}</p>
      </div>
      <ul className="flex w-full min-w-0 flex-1 flex-col gap-1" aria-label={`${total} ratings`}>
        {breakdown.map((row) => (
          <li key={row.stars} className="flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-3xl bg-shuttle-100">
              <div className="h-full rounded-3xl bg-lime-400" style={{ width: `${(row.count / total) * 100}%` }} />
            </div>
            <StarRating rating={row.stars} className="max-sm:[&_svg]:size-4" />
            <span className="w-10 text-right font-body text-base leading-[1.6] text-shuttle-700">{row.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
