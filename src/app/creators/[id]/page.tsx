import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CourseGrid } from "@/components/cards/CourseGrid";
import { FollowStats } from "@/components/creator/FollowStats";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CourseToolbar } from "@/components/search/CourseToolbar";
import { EmptyResults } from "@/components/search/EmptyResults";
import { Container } from "@/components/ui/Container";
import { Pagination } from "@/components/ui/Pagination";
import { getCoursesByCreator } from "@/data/courses";
import { getCreator } from "@/data/creators";
import { buildFilterHref, filterCourses, parseSearchParams } from "@/lib/search";

const PER_PAGE = 6;

export async function generateMetadata({ params }: PageProps<"/creators/[id]">): Promise<Metadata> {
  const creator = getCreator((await params).id);
  if (!creator) return { title: "Creator not found" };
  return { title: creator.name, description: `${creator.name} — ${creator.role}` };
}

export default async function CreatorPage({ params, searchParams }: PageProps<"/creators/[id]">) {
  const [{ id }, raw] = await Promise.all([params, searchParams]);
  const creator = getCreator(id);
  if (!creator) notFound();

  const allCourses = getCoursesByCreator(creator.id);
  const filters = parseSearchParams(raw);
  const results = filterCourses(allCourses, filters);
  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const page = Math.min(filters.page, pageCount);
  const items = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const basePath = `/creators/${creator.id}`;

  return (
    <>
      <Header />
      <main>
        <section className="bg-blueprint bg-persian-blue-800 pt-28 md:pt-[140px] pb-16 lg:h-[592px] lg:pt-[172px] lg:pb-0">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Image
                  src={creator.profileImage}
                  alt={creator.name}
                  width={96}
                  height={96}
                  preload
                  className="size-24 rounded-3xl object-cover"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-start gap-2">
                    <h1 className="font-heading text-[28px] leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-50 sm:text-4xl">
                      {creator.name}
                    </h1>
                    <span className="rounded-3xl bg-lime-400 px-6 py-2 font-body text-base leading-[1.2] font-medium text-shuttle-950">
                      Creator
                    </span>
                  </div>
                  <p className="font-body text-lg leading-[1.6] text-shuttle-50">{creator.role}</p>
                </div>
              </div>
              <div className="font-body text-lg leading-[1.6] text-shuttle-50 lg:w-[1197px] lg:max-w-full">
                {creator.bio.map((line) => (
                  <p key={line.slice(0, 24)}>{line}</p>
                ))}
              </div>
            </div>
            <FollowStats products={allCourses.length} followers={creator.followers} name={creator.name} />
          </Container>
        </section>

        <Container className="flex flex-col gap-10 pt-[62px] pb-[61px]">
          <h2 className="sr-only">Courses by {creator.name}</h2>
          <CourseToolbar filters={filters} />
          {items.length > 0 ? (
            <>
              <CourseGrid courses={items} />
              {pageCount > 1 && (
                <div className="mt-8">
                  <Pagination
                    page={page}
                    pageCount={pageCount}
                    hrefFor={(n) => buildFilterHref(basePath, filters, { page: n })}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyResults query={filters.q} clearHref={basePath} />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
