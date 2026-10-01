import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Course, CourseDetail, Creator, Lesson } from "@/types";

const includes = [
  { icon: "/assets/icons/resources.svg", label: "Learning Resources" },
  { icon: "/assets/icons/videocam.svg", label: "Quality Lesson Videos" },
  { icon: "/assets/icons/certificate.svg", label: "Certificate of Completion" },
  { icon: "/assets/icons/consultation.svg", label: "Private Consultation" },
];

const pitch = "Ready to Dive In? Enroll Now and Start Building Your Digital Future!";

type CourseSidebarProps = {
  course: Course;
  detail: CourseDetail;
  creator?: Creator;
  className?: string;
};

export function CourseSidebar({ course, detail, creator, className }: CourseSidebarProps) {
  // The card highlights the opening lesson of each of the first three modules.
  const highlights: Lesson[] = detail.sections.slice(0, 3).map((section) => section.lessons[0]);
  const firstLesson = detail.sections[0].lessons[0];

  return (
    <aside
      aria-label="Enrollment"
      className={cn(
        "flex flex-col gap-6 overflow-hidden rounded-3xl border border-shuttle-200 bg-white p-6 sm:p-10 xl:w-[412px]",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <h2 className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-950">
          {detail.totalLessons} Lessons ({detail.totalHours} hours)
        </h2>
        <ol className="flex flex-col gap-3 font-body text-base">
          {highlights.map((lesson, i) => (
            <li key={lesson.id}>
              <Link
                href={`/courses/${course.id}/lessons/${lesson.id}`}
                className="group flex items-start justify-between gap-6"
              >
                <span className="flex gap-2 leading-[1.2] font-medium text-shuttle-950">
                  <span className="w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="max-w-[198px] group-hover:text-persian-blue-800 group-hover:underline">
                    {lesson.title}
                  </span>
                </span>
                <span className="shrink-0 leading-[1.6] whitespace-nowrap text-persian-blue-800">
                  {lesson.duration} mins
                </span>
              </Link>
            </li>
          ))}
          <li className="leading-[1.6] text-shuttle-700">{detail.totalVideos - highlights.length} more videos</li>
        </ol>
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-body text-base leading-[1.6] text-shuttle-700">{pitch}</p>
        <p className="flex items-end">
          <span className="flex h-[38px] items-center font-heading text-4xl leading-[1.2] font-semibold tracking-[-0.01em] text-persian-blue-800">
            ${course.price}
          </span>
          <span className="font-body text-base leading-[1.6] text-shuttle-700">/lifetime</span>
        </p>
        <ButtonLink href={`/courses/${course.id}/lessons/${firstLesson.id}`} className="w-full">
          Enroll Now
        </ButtonLink>
      </div>

      <h2 className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-950">
        This course include
      </h2>
      <ul className="flex flex-col gap-3">
        {includes.map((item) => (
          <li key={item.label} className="flex items-start gap-2 font-body text-base leading-[1.6] text-shuttle-700">
            <Image src={item.icon} alt="" width={24} height={24} />
            {item.label}
          </li>
        ))}
      </ul>

      <Image src="/assets/icons/line-card.svg" alt="" width={332} height={1} className="h-px w-full" />

      {creator && (
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <Image src={creator.avatar} alt="" width={52} height={52} className="rounded-full" />
            <div>
              <p className="font-body text-lg leading-[1.2] font-medium text-shuttle-950">{creator.name}</p>
              <p className="font-body text-base leading-[1.6] text-shuttle-700">{creator.headline}</p>
            </div>
          </div>
          <p className="font-body text-base leading-[1.6] text-shuttle-700">{pitch}</p>
          <Link
            href={`/creators/${creator.id}`}
            className="self-start rounded-3xl border border-shuttle-200 px-4 py-2 font-body text-base leading-[1.2] font-medium text-shuttle-700 transition-colors hover:border-persian-blue-800 hover:text-persian-blue-800"
          >
            See Full Profile
          </Link>
        </div>
      )}
    </aside>
  );
}
