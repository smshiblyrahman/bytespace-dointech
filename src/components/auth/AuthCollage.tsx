import { CourseCard } from "@/components/cards/CourseCard";
import { HappyStudentsCard } from "@/components/cards/StatCards";
import { Reveal } from "@/components/motion/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { courses } from "@/data/courses";

const [, digitalAsset, bigData] = courses;

/**
 * Decorative collage from the auth screens. The stage's origin sits at Figma (97, 305) — i.e. 185px
 * below and 25px left of the intro text — so on xl it lands exactly where the design has it, and on
 * laptops it flows under the text and scales to the column.
 */
export function AuthCollage() {
  return (
    <ScaledStage
      width={548}
      height={588}
      className="pointer-events-none mt-12 hidden lg:block xl:absolute xl:top-[185px] xl:left-[-25px] xl:mt-0"
    >
      {/* Decorative only: hidden from assistive tech and removed from the tab order */}
      <div aria-hidden inert className="size-full">
        <Reveal className="absolute top-[89px] left-[25px] w-[373px]" delay={0.2} y={60}>
          <CourseCard course={digitalAsset} tone="dark" />
        </Reveal>
        <Reveal className="absolute top-0 left-[136px] w-[373px]" delay={0.35} y={60}>
          <CourseCard course={bigData} tone="dark" />
        </Reveal>
        <Reveal className="absolute top-[435px] left-[251px]" delay={0.5}>
          <HappyStudentsCard variant="lime" showcase />
        </Reveal>
        <Ornament shape="spring" tint="white" size={175} flip className="top-[321px] left-[373px]" delay={0.6} />
        <Ornament shape="torus" tint="lime" size={146} className="top-[15px] left-[54px]" delay={0.2} />
        <Ornament shape="cone" tint="lime" size={188} className="top-[397px] left-0" delay={1} />
      </div>
    </ScaledStage>
  );
}
