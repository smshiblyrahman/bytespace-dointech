import Image from "next/image";
import type { CourseDetail } from "@/types";

export const panelHeading = "font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-950";
export const panelText = "font-body text-base leading-[1.6] text-shuttle-700";

export function CourseAbout({ detail }: { detail: CourseDetail }) {
  return (
    <div className="flex flex-col gap-6 lg:w-[725px]">
      <h2 className={panelHeading}>Description</h2>
      <div className={`${panelText} flex flex-col gap-[25.6px] lg:w-[723px]`}>
        {detail.description.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <h2 className={panelHeading}>Sneak Peak</h2>
      <ul className="grid grid-cols-2 gap-4 sm:flex sm:justify-between sm:gap-0">
        {detail.sneakPeek.map((src, i) => (
          <li key={src} className="relative h-[125px] overflow-hidden rounded-2xl bg-[#d9d9d9] sm:w-[167px]">
            <Image
              src={src}
              alt={`Course preview ${i + 1}`}
              fill
              sizes="167px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </li>
        ))}
      </ul>

      <h2 className={panelHeading}>Key Points</h2>
      <ul className="flex flex-col gap-3">
        {detail.keyPoints.map((point) => (
          <li key={point} className={`${panelText} flex items-start gap-2`}>
            <Image src="/assets/icons/check-circle.svg" alt="" width={24} height={24} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
