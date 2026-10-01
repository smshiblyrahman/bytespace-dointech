import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/data/courses";
import { learnerAvatars } from "@/data/site";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { cn } from "@/lib/cn";

type CourseCardProps = {
  course: Course;
  /** "lime" = catalogue style, "dark" = showcase style used in feature/auth collages. */
  tone?: "lime" | "dark";
  className?: string;
};

export function CourseCard({ course, tone = "lime", className }: CourseCardProps) {
  // The Figma showcase cards (feature + auth collages) use 28px/20px line boxes; catalogue cards use 1.2.
  const showcase = tone === "dark";

  return (
    <article
      className={cn(
        "group relative flex h-[384px] w-full flex-col overflow-hidden rounded-3xl border border-shuttle-200 bg-white p-[15px] transition-[box-shadow,transform] duration-500",
        className,
      )}
    >
      <div className="relative h-[195px] w-full shrink-0 overflow-hidden rounded-xl bg-[#443131]">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(min-width: 1024px) 341px, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <ul
          className={cn(
            "absolute right-3 left-3 flex flex-wrap gap-x-3 gap-y-1.5",
            showcase ? "bottom-[13px]" : "bottom-[19px]",
          )}
        >
          {[`${course.lessons} Lessons`, course.duration, `${course.comments} Comments`].map((meta) => (
            <li
              key={meta}
              className={cn(
                "rounded-3xl bg-[rgb(246_246_246/0.6)] px-3 py-1.5 font-body text-xs font-medium whitespace-nowrap text-black-700 backdrop-blur-[4px]",
                showcase ? "leading-5" : "leading-[1.2]",
              )}
            >
              {meta}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[21px] flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn(
                "truncate font-heading text-xl font-semibold tracking-[-0.01em] text-black",
                showcase ? "leading-7" : "leading-[1.2]",
              )}
            >
              {/* Stretched link: the whole card opens the course */}
              <Link
                href={`/courses/${course.id}`}
                title={course.title}
                className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-persian-blue-800"
              >
                {course.title}
              </Link>
            </h3>
            <p className={cn("font-body text-xs text-black-700", showcase ? "leading-5" : "leading-[1.6]")}>
              by{" "}
              <Link href={`/creators/${course.creatorId}`} className="relative z-10 text-persian-blue-800 hover:underline">
                {course.creator}
              </Link>
            </p>
          </div>
          <p
            className={cn(
              "flex shrink-0 items-center font-body text-lg text-black-700",
              showcase ? "leading-7 font-medium" : "leading-[1.6]",
            )}
          >
            {course.rating}&nbsp;
            <Image
              src={tone === "lime" ? "/assets/icons/star-outline.svg" : "/assets/icons/star-lime-lg.svg"}
              alt=""
              width={24}
              height={24}
            />
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex items-center gap-1 rounded-3xl bg-shuttle-50 px-3 py-1.5 font-body text-xs font-medium text-shuttle-700",
              showcase ? "leading-5" : "leading-[1.2]",
            )}
          >
            <Image src="/assets/icons/signal.svg" alt="" width={20} height={20} />
            {course.level}
          </span>
          <AvatarStack avatars={learnerAvatars} size={32} count={`${course.enrolled}+`} tone={tone} />
        </div>

        <p className="flex items-end">
          <span
            className={cn(
              "flex h-6 items-center font-heading text-xl font-semibold tracking-[-0.01em] text-persian-blue-800",
              showcase ? "leading-7" : "leading-[1.2]",
            )}
          >
            {showcase && <span className="font-medium">$</span>}
            {showcase ? course.price : `$${course.price}`}
          </span>
          <span className={cn("font-body text-xs text-black-700", showcase ? "leading-5" : "leading-[1.6]")}>/lifetime</span>
        </p>
      </div>
    </article>
  );
}
