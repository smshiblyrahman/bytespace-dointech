import { notFound } from "next/navigation";
import { getCourse } from "@/data/courses";

/** Validates the course id before the loading boundary streams, so unknown ids return a real 404. */
export default async function CourseLayout({ children, params }: LayoutProps<"/courses/[id]">) {
  if (!getCourse((await params).id)) notFound();
  return children;
}
