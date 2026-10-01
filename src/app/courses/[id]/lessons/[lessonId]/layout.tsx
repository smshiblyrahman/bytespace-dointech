import { notFound } from "next/navigation";
import { getCourseDetail, getLessons } from "@/data/course-details";
import { getCourse } from "@/data/courses";

/** Validates the lesson id up front so unknown lessons return a real 404. */
export default async function LessonLayout({ children, params }: LayoutProps<"/courses/[id]/lessons/[lessonId]">) {
  const { id, lessonId } = await params;
  const course = getCourse(id);
  if (!course || !getLessons(getCourseDetail(course)).some((l) => l.id === lessonId)) notFound();
  return children;
}
