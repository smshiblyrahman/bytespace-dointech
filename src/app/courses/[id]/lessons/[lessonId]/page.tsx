import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { panelHeading, panelText } from "@/components/course/CourseAbout";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LessonActions } from "@/components/lesson/LessonActions";
import { LessonNotes } from "@/components/lesson/LessonNotes";
import { LessonSidebar } from "@/components/lesson/LessonSidebar";
import { LessonVideoPlayer } from "@/components/lesson/LessonVideoPlayer";
import { Container } from "@/components/ui/Container";
import { getCourseDetail, getLessons } from "@/data/course-details";
import { getCourse } from "@/data/courses";

type Params = PageProps<"/courses/[id]/lessons/[lessonId]">;

async function load(params: Params["params"]) {
  const { id, lessonId } = await params;
  const course = getCourse(id);
  if (!course) return null;
  const detail = getCourseDetail(course);
  const lessons = getLessons(detail);
  const index = lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;
  const section = detail.sections.find((s) => s.lessons.some((l) => l.id === lessonId))!;
  return { course, detail, lessons, index, lesson: lessons[index], section };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await load(params);
  if (!data) return { title: "Lesson not found" };
  return { title: `${data.lesson.title} · ${data.detail.headline}`, description: data.lesson.summary };
}

export default async function LessonPage({ params }: Params) {
  const data = await load(params);
  if (!data) notFound();
  const { course, detail, lessons, index, lesson, section } = data;

  const pills = [section.title.split(":")[0], `${lesson.duration} mins`, `Lesson ${index + 1} of ${lessons.length}`];

  return (
    <>
      <Header />
      <main className="relative">
        <div aria-hidden className="bg-blueprint absolute inset-x-0 top-0 hidden h-[800px] bg-persian-blue-800 xl:block" />

        <Container className="relative grid grid-cols-1 gap-10 pb-20 xl:grid-cols-[723px_412px] xl:grid-rows-[auto_538px_auto] xl:justify-between xl:gap-0 xl:pb-[79px]">
          <div className="bg-blueprint -mx-4 sm:-mx-6 flex flex-col gap-10 bg-persian-blue-800 px-4 sm:px-6 pt-28 md:pt-[140px] pb-10 xl:contents">
            <div className="flex flex-col gap-6 xl:col-span-2 xl:pt-[172px]">
              <Link
                href={`/courses/${course.id}?tab=lessons`}
                className="flex items-center gap-2 self-start font-body text-lg leading-[1.2] font-medium text-lime-400 hover:underline"
              >
                <Image src="/assets/icons/chevron-left.svg" alt="" width={20} height={20} className="brightness-0 invert" />
                {detail.headline}
              </Link>
              <h1 className="font-heading text-[28px] leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-50 sm:text-4xl">
                {lesson.title}
              </h1>
              <ul className="flex flex-wrap gap-4">
                {pills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-3xl bg-white px-6 py-2 font-body text-base leading-[1.2] font-medium whitespace-nowrap text-shuttle-950"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            </div>
            <LessonVideoPlayer
              key={lesson.id}
              poster={detail.previewImage}
              title={lesson.title}
              duration={lesson.duration}
              className="xl:col-start-1 xl:mt-[59px] xl:ml-[5px]"
            />
          </div>

          <LessonSidebar
            key={section.id}
            courseId={course.id}
            sections={detail.sections}
            activeLessonId={lesson.id}
            className="order-last self-start xl:order-none xl:col-start-2 xl:row-span-2 xl:row-start-2 xl:mt-[59px]"
          />

          <article className="flex flex-col gap-6 xl:col-start-1 xl:row-start-3 xl:mt-[80px] xl:w-[723px]">
            <h2 className={panelHeading}>About this lesson</h2>
            <p className={panelText}>{lesson.summary}</p>

            {lesson.resources && lesson.resources.length > 0 && (
              <>
                <h2 className={panelHeading}>Resources</h2>
                <ul className="flex flex-col gap-3">
                  {lesson.resources.map((resource) => (
                    <li
                      key={resource.label}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-shuttle-200 px-6 py-4"
                    >
                      <span className="flex items-center gap-3 font-body text-base leading-[1.2] font-medium text-shuttle-950">
                        <Image src="/assets/icons/resources.svg" alt="" width={24} height={24} />
                        {resource.label}
                      </span>
                      <span className="shrink-0 font-body text-sm text-shuttle-700">{resource.size}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className={panelHeading}>Notes</h2>
            <LessonNotes key={lesson.id} lessonTitle={lesson.title} />

            <LessonActions
              courseId={course.id}
              lessonId={lesson.id}
              prev={lessons[index - 1]}
              next={lessons[index + 1]}
            />
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
