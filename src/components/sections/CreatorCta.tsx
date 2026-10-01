import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Ornament } from "@/components/ui/Ornament";

export function CreatorCta() {
  return (
    <section className="bg-blueprint relative isolate overflow-hidden bg-persian-blue-800">
      {/* Ornaments laid out on the 1440px Figma frame, centred and scaled for smaller screens */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[488px] w-[1440px] origin-top -translate-x-1/2 scale-[.6] opacity-60 md:scale-[.8] md:opacity-100 xl:scale-100">
        <Ornament shape="cone" tint="lime" size={188} className="top-0 left-[1080px]" delay={0.4} />
        <Ornament shape="coil" tint="lime" size={330} className="top-[289px] left-[1110px]" delay={1.1} />
        <Ornament shape="spring" tint="lime" size={385} className="top-[-162px] left-[-118px]" />
        <Ornament shape="spring" tint="white" size={175} flip className="top-[5px] left-[178px]" delay={0.7} />
        <Ornament shape="pyramid" tint="white" size={188} className="top-[225px] left-[-48px]" delay={1.4} />
        <Ornament shape="torus" tint="lime" size={342} className="top-[299px] left-[20px]" delay={0.9} />
        <Ornament shape="cylinder" tint="white" size={370} className="top-[6px] left-[1226px]" delay={0.2} />
      </div>

      <Reveal className="mx-auto flex max-w-[1012px] flex-col items-center justify-center gap-10 px-4 sm:px-6 py-24 text-center lg:h-[488px] lg:py-0">
        <h2 className="max-w-[710px] font-heading text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-50 sm:text-[44px]">
          Unlock Your Potential as a Creator with ByteSpace
        </h2>
        <p className="font-body text-base leading-[1.6] text-shuttle-50 sm:text-lg">
          Experience the collaboration of numerous creators and an expanding selection of courses. Register now and
          become a part of a community comprising over 10,000 local and international creators. Utilize our Course
          Editor, and showcase your expertise by publishing your finest course on the ByteSpace Course Library.
        </p>
        <ButtonLink href="/signup">Join as Creator</ButtonLink>
      </Reveal>
    </section>
  );
}
