import Link from "next/link";
import { searchTopics } from "@/data/courses";
import { buildFilterHref } from "@/lib/search";
import { cn } from "@/lib/cn";
import type { SearchFilters } from "@/types";

/** Topic chips, spread edge-to-edge on desktop and scrollable on small screens. */
export function TopicTabs({ filters, basePath }: { filters: SearchFilters; basePath: string }) {
  return (
    <nav aria-label="Topics" className="-mx-4 sm:-mx-6 overflow-x-auto px-4 sm:px-6 [scrollbar-width:none] xl:mx-0 xl:overflow-visible xl:px-0">
      <ul className="flex w-max gap-4 xl:w-full xl:justify-between xl:gap-0">
        {searchTopics.map((topic) => {
          const selected = topic === filters.topic;
          return (
            <li key={topic}>
              <Link
                href={buildFilterHref(basePath, filters, { topic, page: 1 })}
                scroll={false}
                aria-current={selected ? "page" : undefined}
                className={cn(
                  "block rounded-3xl px-4 py-3 font-body text-base font-medium leading-[1.2] whitespace-nowrap transition-colors duration-300",
                  selected ? "bg-lime-400 text-shuttle-950" : "bg-shuttle-50 text-shuttle-700 hover:bg-shuttle-100",
                )}
              >
                {topic}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
