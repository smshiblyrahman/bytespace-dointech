import type { Metadata } from "next";
import { CourseGrid } from "@/components/cards/CourseGrid";
import { CreatorCard } from "@/components/cards/CreatorCard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CourseToolbar } from "@/components/search/CourseToolbar";
import { EmptyResults } from "@/components/search/EmptyResults";
import { SearchHero } from "@/components/search/SearchHero";
import { TopicTabs } from "@/components/search/TopicTabs";
import { Container } from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import { getCoursesByCreator } from "@/data/courses";
import { creators } from "@/data/creators";
import { buildFilterHref, parseSearchParams, searchCourses } from "@/lib/search";

export const metadata: Metadata = {
  title: "Find Your Next Course",
  description: "Search ByteSpace courses by topic, level, category and creator.",
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const raw = await searchParams;
  const filters = parseSearchParams(raw);
  const type = raw.type === "creators" ? "creators" : "courses";
  const hasActiveFilters = Boolean(
    filters.q || filters.level || filters.category || filters.minRating || filters.maxPrice || filters.topic !== "Featured",
  );

  return (
    <>
      <Header />
      <main>
        <SearchHero key={`${filters.q}-${type}`} query={filters.q} type={type} />

        {type === "creators" ? (
          <CreatorResults query={filters.q} />
        ) : (
          <CourseResults filters={filters} hasActiveFilters={hasActiveFilters} />
        )}
      </main>
      <Footer />
    </>
  );
}

function CourseResults({
  filters,
  hasActiveFilters,
}: {
  filters: ReturnType<typeof parseSearchParams>;
  hasActiveFilters: boolean;
}) {
  const { items, total, page, pageCount } = searchCourses(filters);

  return (
    <Container className="flex flex-col pt-[72px] pb-[72px]">
      <CourseToolbar filters={filters} />
      <div className="mt-8">
        <TopicTabs filters={filters} basePath="/search" />
      </div>

      <div className="mt-[77px] flex flex-col" aria-live="polite">
        {hasActiveFilters && total > 0 && (
          <p className="-mt-12 mb-6 font-body text-base leading-[1.6] text-shuttle-700">
            <span className="font-medium text-shuttle-950">{total}</span> {total === 1 ? "course" : "courses"}
            {filters.q && (
              <>
                {" "}
                for <span className="font-medium text-shuttle-950">“{filters.q}”</span>
              </>
            )}
          </p>
        )}

        {items.length > 0 ? (
          <>
            <CourseGrid courses={items} />
            {pageCount > 1 && (
              <div className="mt-[72px]">
                <Pagination
                  page={page}
                  pageCount={pageCount}
                  hrefFor={(n) => buildFilterHref("/search", filters, { page: n })}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyResults query={filters.q} clearHref="/search" />
        )}
      </div>
    </Container>
  );
}

function CreatorResults({ query }: { query: string }) {
  const q = query.toLowerCase();
  const matches = creators.filter((c) => !q || [c.name, c.role].join(" ").toLowerCase().includes(q));

  return (
    <Container className="pt-[72px] pb-[120px]">
      {matches.length > 0 ? (
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((creator) => (
            <li key={creator.id}>
              <CreatorCard creator={creator} courseCount={getCoursesByCreator(creator.id).length} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyResults query={query} clearHref="/search?type=creators" subject="creators" />
      )}
    </Container>
  );
}
