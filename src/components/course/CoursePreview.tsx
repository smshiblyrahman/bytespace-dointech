import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type CoursePreviewProps = {
  image: string;
  title: string;
  href: string;
  className?: string;
};

/** 720×479 preview frame with the frosted play button from the Figma hero. */
export function CoursePreview({ image, title, href, className }: CoursePreviewProps) {
  return (
    <Link
      href={href}
      aria-label={`Play preview: ${title}`}
      className={cn(
        "group relative block aspect-[720/479] w-full overflow-hidden rounded-3xl bg-[#443131] xl:w-[720px]",
        className,
      )}
    >
      <Image src={image} alt="" fill preload sizes="(min-width: 1024px) 720px, 100vw" className="object-contain" />
      <span className="absolute top-[calc(50%-52px)] left-[calc(50%-52px)] flex items-center justify-center rounded-3xl border border-black-700 bg-[rgb(61_61_61/0.24)] p-4 backdrop-blur-[20px] transition-transform duration-300 group-hover:scale-110 max-sm:scale-75 xl:top-[204px] xl:left-[324px]">
        <Image src="/assets/icons/play.svg" alt="" width={72} height={72} />
      </span>
    </Link>
  );
}
