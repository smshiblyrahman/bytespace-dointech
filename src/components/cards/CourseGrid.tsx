import { CourseCard } from "@/components/cards/CourseCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Course } from "@/types";

/** Three-column grid of course cards (373px columns, 40px gaps on desktop). */
export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <Stagger className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3" stagger={0.05}>
      {courses.map((course) => (
        <StaggerItem
          key={course.id}
          className="rounded-3xl transition-[translate,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgb(0_59_226/0.35)]"
        >
          <CourseCard course={course} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
