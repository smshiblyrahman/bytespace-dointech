import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseAbout } from "@/components/course/CourseAbout";
import { CourseHeader } from "@/components/course/CourseHeader";
import { CourseLessons } from "@/components/course/CourseLessons";
import { CoursePreview } from "@/components/course/CoursePreview";
import { CourseReviews } from "@/components/course/CourseReviews";
import { CourseSidebar } from "@/components/course/CourseSidebar";
import { CourseTabs, type CourseTab } from "@/components/course/CourseTabs";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { getCourseDetail } from "@/data/course-details";
import { getCourse } from "@/data/courses";
import { getCreator } from "@/data/creators";

export async function generateMetadata({ params }: PageProps<"/courses/[id]">): Promise<Metadata> {
  const course = getCourse((await params).id);
  if (!course) return { title: "Course not found" };
  const detail = getCourseDetail(course);
  return { title: detail.headline, description: detail.subtitle };
}

const tabValues: CourseTab[] = ["about", "lessons", "reviews"];

export default async function CoursePage({ params, searchParams }: PageProps<"/courses/[id]">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const course = getCourse(id);
  if (!course) notFound();

  const detail = getCourseDetail(course);
  const creator = getCreator(course.creatorId);
  const tab = tabValues.includes(query.tab as CourseTab) ? (query.tab as CourseTab) : "about";
  const firstLesson = detail.sections[0].lessons[0];

  return (
    <>
      <Header />
      <main className="relative">
        {/* Blue hero band (957px in Figma) that the enrollment card overlaps */}
        <div aria-hidden className="bg-blueprint absolute inset-x-0 top-0 hidden h-[957px] bg-persian-blue-800 xl:block" />

        <Container className="relative grid grid-cols-1 gap-10 pb-20 xl:grid-cols-[723px_412px] xl:grid-rows-[auto_538px_auto] xl:justify-between xl:gap-0 xl:pb-[58px]">
          <div className="bg-blueprint -mx-4 sm:-mx-6 flex flex-col gap-10 bg-persian-blue-800 px-4 sm:px-6 pt-28 md:pt-[140px] pb-10 xl:contents">
            <CourseHeader course={course} detail={detail} creator={creator} className="xl:col-span-2 xl:pt-[172px]" />
            <CoursePreview
              image={detail.previewImage}
              title={detail.headline}
              href={`/courses/${course.id}/lessons/${firstLesson.id}`}
              className="xl:col-start-1 xl:mt-[59px] xl:ml-[5px]"
            />
          </div>

          <CourseSidebar
            course={course}
            detail={detail}
            creator={creator}
            className="self-start xl:col-start-2 xl:row-span-2 xl:row-start-2 xl:mt-[59px]"
          />

          <div className="xl:col-start-1 xl:row-start-3 xl:mt-[141px]">
            <CourseTabs
              initial={tab}
              panels={{
                about: <CourseAbout detail={detail} />,
                lessons: <CourseLessons courseId={course.id} detail={detail} />,
                reviews: <CourseReviews detail={detail} />,
              }}
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
