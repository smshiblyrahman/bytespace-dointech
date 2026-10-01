import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CourseLoading() {
  return (
    <>
      <Header />
      <div className="relative" role="status" aria-label="Loading course">
        <div aria-hidden className="bg-blueprint absolute inset-x-0 top-0 h-[520px] bg-persian-blue-800 xl:h-[957px]" />
        <Container className="relative grid gap-10 pt-28 md:pt-[140px] xl:grid-cols-[723px_412px] xl:justify-between xl:gap-0 xl:pt-[172px]">
          <div className="flex flex-col gap-6 xl:col-span-2">
            <Skeleton className="h-11 w-[640px] max-w-full bg-white/20" />
            <Skeleton className="h-6 w-[480px] max-w-full bg-white/20" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-36 bg-white/20" />
              <Skeleton className="h-10 w-40 bg-white/20" />
              <Skeleton className="h-10 w-36 bg-white/20" />
            </div>
          </div>
          <Skeleton className="aspect-[720/479] w-full bg-white/20 xl:mt-[59px] xl:w-[720px]" />
          <Skeleton className="h-[640px] border border-shuttle-200 bg-white xl:mt-[59px]" />
        </Container>
      </div>
    </>
  );
}
