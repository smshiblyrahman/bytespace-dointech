import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("animate-pulse rounded-3xl bg-shuttle-100", className)} />;
}

/** Placeholder with the exact footprint of a CourseCard. */
export function CourseCardSkeleton() {
  return (
    <div className="flex h-[384px] flex-col gap-5 rounded-3xl border border-shuttle-200 bg-white p-[15px]">
      <Skeleton className="h-[195px] rounded-xl" />
      <Skeleton className="h-6 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-1/3 rounded-lg" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-6 w-1/4 rounded-lg" />
    </div>
  );
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading courses">
      {Array.from({ length: count }, (_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}
