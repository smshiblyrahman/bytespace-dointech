import Image from "next/image";
import Link from "next/link";
import { ShareButton } from "@/components/course/ShareButton";
import { cn } from "@/lib/cn";
import type { Course, CourseDetail, Creator } from "@/types";

type CourseHeaderProps = {
  course: Course;
  detail: CourseDetail;
  creator?: Creator;
  className?: string;
};

export function CourseHeader({ course, detail, creator, className }: CourseHeaderProps) {
  const pills = [
    { icon: "/assets/icons/level-dark.svg", label: detail.level },
    { icon: "/assets/icons/star-dark.svg", label: `${detail.rating} (${detail.reviewCount} reviews)` },
    { icon: "/assets/icons/people.svg", label: `${detail.studentCount} Students` },
  ];

  return (
    <div className={cn("flex flex-col justify-between gap-6 sm:flex-row", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 font-heading font-semibold text-shuttle-50">
          <h1 className="text-[28px] leading-[1.2] tracking-[-0.01em] sm:text-4xl">{detail.headline}</h1>
          <p className="text-lg leading-[1.2] tracking-[-0.01em] sm:text-xl">{detail.subtitle}</p>
        </div>
        <p className="font-body text-lg leading-[1.2] font-medium text-[#f1f4fe]">
          by{" "}
          <Link href={`/creators/${course.creatorId}`} className="text-lime-400 hover:underline">
            {creator?.name.toLowerCase() ?? course.creator}
          </Link>
        </p>
        <ul className="flex flex-wrap gap-4">
          {pills.map((pill) => (
            <li
              key={pill.label}
              className="flex items-center justify-center gap-2 rounded-3xl bg-white px-6 py-2 font-body text-base leading-[1.2] font-medium whitespace-nowrap text-shuttle-950"
            >
              <Image src={pill.icon} alt="" width={24} height={24} />
              {pill.label}
            </li>
          ))}
        </ul>
      </div>
      <ShareButton title={detail.headline} />
    </div>
  );
}
