import { panelHeading, panelText } from "@/components/course/CourseAbout";
import { CourseCurriculum } from "@/components/course/CourseCurriculum";
import { LearningProgress } from "@/components/course/LearningProgress";
import type { CourseDetail } from "@/types";

export function CourseLessons({ courseId, detail }: { courseId: string; detail: CourseDetail }) {
  return (
    <div className="flex flex-col gap-6 lg:w-[723px]">
      <h2 className={panelHeading}>Explore the Modules</h2>
      <p className={panelText}>{detail.modulesIntro}</p>

      <h2 className={panelHeading}>Lesson List</h2>
      <CourseCurriculum courseId={courseId} sections={detail.sections} />

      <h2 className={panelHeading}>Lesson Content</h2>
      <p className={panelText}>{detail.lessonContent}</p>

      <h2 className={panelHeading}>Lesson Progress Tracking</h2>
      <p className={panelText}>{detail.progressIntro}</p>
      <LearningProgress percent={detail.progress} />
    </div>
  );
}
