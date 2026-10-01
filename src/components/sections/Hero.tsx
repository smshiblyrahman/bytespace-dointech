"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HappyStudentsCard, ProgressCard, TopicCard } from "@/components/cards/StatCards";
import { easeOutExpo } from "@/components/motion/Reveal";
import { HeroSearch } from "@/components/sections/HeroSearch";
import { Ornament } from "@/components/ui/Ornament";
import { ShadowedImage } from "@/components/ui/ShadowedImage";

const pop = (delay: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.9, ease: easeOutExpo, delay },
});

export function Hero() {
  return (
    <section
      className="bg-blueprint relative overflow-hidden bg-persian-blue-800 pt-28 md:pt-[140px] xl:h-[1024px] xl:pt-[169px]"
    >
      {/* Headline + search (flows naturally on small screens) */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-4 sm:px-6 text-center lg:gap-[60px]"
      >
        <div className="flex flex-col items-center gap-6 lg:gap-8">
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } } }}
            className="max-w-[935px] font-heading text-[40px] font-semibold leading-[1.2] tracking-[-0.01em] text-white sm:text-[56px] lg:text-[72px]"
          >
            Get Access to Hundreds Courses Available
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } } }}
            className="font-body text-base leading-[1.6] text-shuttle-100 lg:text-lg lg:whitespace-nowrap"
          >
            Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
          </motion.p>
        </div>
        <motion.div
          className="w-full sm:w-auto"
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } } }}
        >
          <HeroSearch />
        </motion.div>
      </motion.div>

      {/* Illustration stage: exact 1440×1024 Figma coordinates, scaled down below xl */}
      <div className="pointer-events-none relative mx-auto mt-10 h-[190px] sm:h-[269px] md:h-[347px] lg:h-[448px] xl:absolute xl:inset-0 xl:mt-0 xl:h-auto">
        <div className="absolute top-[-158px] left-1/2 h-[1024px] w-[1440px] origin-top -translate-x-1/2 scale-[.34] sm:top-[-223px] sm:scale-[.48] md:top-[-288px] md:scale-[.62] lg:top-[-371px] lg:scale-[.8] xl:top-0 xl:scale-100">
          <motion.div
            className="absolute top-[582px] left-[145px] size-[1149px]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.4 }}
          >
            <Image src="/assets/backgrounds/hero-circle.svg" alt="" fill preload />
          </motion.div>

          <div className="absolute top-[512px] left-[431px] h-[541px] w-[578px]">
            <motion.div {...pop(0.55)}>
              <ShadowedImage
                src="/assets/images/hero-student-shadow.png"
                alt="Smiling student with headphones holding a laptop"
                width={578}
                height={541}
                preload
              />
            </motion.div>
          </div>

          <motion.div {...pop(0.9)} className="absolute top-[651px] left-[842px]">
            <ProgressCard />
          </motion.div>
          <motion.div {...pop(1.05)} className="absolute top-[837px] left-[328px]">
            <HappyStudentsCard />
          </motion.div>

          <Ornament shape="spring" tint="lime" size={385} className="top-[221px] left-[-118px] hidden xl:block" />
          <Ornament shape="spring" tint="white" size={175} flip className="top-[477px] left-[183px]" delay={0.6} />
          <Ornament shape="coil" tint="white" size={330} className="top-[672px] left-[1127px]" delay={1.2} />
          <Ornament shape="torus" tint="white" size={342} className="top-[682px] left-[18px]" delay={0.9} />
          <Ornament shape="cylinder" tint="lime" size={370} className="top-[221px] left-[1231px] hidden xl:block" delay={0.3} />
          <Ornament shape="cone" tint="white" size={188} className="top-[464px] left-[1106px]" delay={1.5} />

          <motion.div {...pop(0.8)} className="absolute top-[639px] left-[404px]">
            <TopicCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
