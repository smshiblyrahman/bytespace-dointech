import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { CourseGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function CreatorLoading() {
  return (
    <>
      <Header />
      <section className="bg-blueprint bg-persian-blue-800 pt-28 md:pt-[140px] pb-16 lg:h-[592px] lg:pt-[172px] lg:pb-0" role="status" aria-label="Loading creator">
        <Container className="flex flex-col gap-10">
          <div className="flex items-center gap-6">
            <Skeleton className="size-24 bg-white/20" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-11 w-[360px] max-w-[60vw] bg-white/20" />
              <Skeleton className="h-6 w-[260px] max-w-[50vw] bg-white/20" />
            </div>
          </div>
          <Skeleton className="h-[86px] w-full bg-white/20" />
          <Skeleton className="h-12 w-[300px] bg-white/20" />
        </Container>
      </section>
      <Container className="flex flex-col gap-10 pt-[62px] pb-[61px]">
        <Skeleton className="h-12 w-full" />
        <CourseGridSkeleton />
      </Container>
    </>
  );
}
