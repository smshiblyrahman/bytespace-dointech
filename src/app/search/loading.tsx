import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { CourseGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function SearchLoading() {
  return (
    <>
      <Header />
      <section className="bg-blueprint bg-persian-blue-800 pt-28 md:pt-[140px] pb-16 lg:h-[360px] lg:pt-[164px] lg:pb-0">
        <div className="mx-auto flex max-w-[1248px] flex-col items-center gap-8 px-4 sm:px-6">
          <Skeleton className="h-11 w-[420px] max-w-full bg-white/20" />
          <Skeleton className="h-[52px] w-[600px] max-w-full bg-white/20" />
        </div>
      </section>
      <Container className="flex flex-col gap-8 pt-[72px] pb-[72px]">
        <div className="flex justify-between">
          <Skeleton className="h-12 w-[352px] max-w-[60%]" />
          <Skeleton className="h-12 w-[157px]" />
        </div>
        <Skeleton className="h-[43px] w-full" />
        <div className="mt-[45px]">
          <CourseGridSkeleton />
        </div>
      </Container>
    </>
  );
}
