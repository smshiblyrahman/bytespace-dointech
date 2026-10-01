import Image from "next/image";
import { CourseCard } from "@/components/cards/CourseCard";
import { HappyStudentsCard, ProgressCard, RevenueCard } from "@/components/cards/StatCards";
import { Reveal } from "@/components/motion/Reveal";
import { Ornament } from "@/components/ui/Ornament";
import { ShadowedImage } from "@/components/ui/ShadowedImage";
import { ScaledStage } from "@/components/ui/ScaledStage";
import { courses } from "@/data/courses";

const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

const perks = ["Share Your Expertise", "Monetize Your Passion", "Flexibility and Autonomy", "Build a Community"];


export function CreatorFeatures() {
  return (
    <section id="creators" className="relative scroll-mt-24 overflow-hidden bg-surface py-20 lg:py-[120px]">
      <Image
        src="/assets/backgrounds/features-glow.svg"
        alt=""
        width={2536}
        height={2471}
        className="pointer-events-none absolute top-[-506px] left-1/2 max-w-none -translate-x-[1268px]"
      />
      <Image
        src="/assets/backgrounds/glow-lime-sm.svg"
        alt=""
        width={752}
        height={752}
        className="pointer-events-none absolute top-[906px] left-1/2 max-w-none -translate-x-[1047px]"
      />

      <div className="relative mx-auto flex max-w-[1248px] flex-col gap-20 px-4 sm:px-6 lg:gap-[72px]">
        {/* Row 1 — professional growth */}
        <div className="flex flex-col items-center gap-12 xl:flex-row xl:gap-[63px]">
          <Reveal className="flex flex-col gap-10 lg:w-[574px]">
            <h2 className="font-heading text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-950 sm:text-[44px] lg:w-[577px]">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="font-body text-lg leading-[1.6] text-shuttle-700 lg:w-[477px]">
              Explore our curated selection of courses tailored to enhance your capabilities and accelerate your
              career journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark
              on a new career path entirely, we have the resources you need.
            </p>
            <dl className="flex items-end gap-14">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="font-body text-lg leading-[1.6] text-shuttle-700">{stat.label}</dt>
                  <dd className="font-heading text-4xl leading-[44px] font-medium tracking-[-0.01em] text-persian-blue-800">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <ScaledStage width={621} height={552} className="xl:w-[621px] xl:shrink-0">
              <Reveal className="absolute top-0 left-0 w-[373px]" y={60}>
                <CourseCard course={courses[0]} tone="dark" />
              </Reveal>
              <Reveal className="absolute top-3 left-0" delay={0.15} y={60}>
                <ShadowedImage src="/assets/images/hero-student-shadow.png" alt="Student learning online" width={577} height={540} />
              </Reveal>
              <Reveal className="absolute top-[213px] left-[345px]" delay={0.3}>
                <ProgressCard showcase />
              </Reveal>
              <Ornament shape="coil" tint="lime" size={215} className="top-[67px] left-[406px]" />
          </ScaledStage>
        </div>

        {/* Row 2 — creator tools */}
        <div className="flex flex-col-reverse items-center gap-12 xl:flex-row xl:gap-[79px]">
          <ScaledStage width={541} height={596} className="xl:w-[541px] xl:shrink-0">
              <Reveal className="absolute top-11 left-0" delay={0.1} y={40}>
                <RevenueCard title="Total Revenue" period="July 1-28" amount="$120.29" />
              </Reveal>
              <Reveal className="absolute top-[194px] left-0 w-[134px]" delay={0.2} y={40}>
                <RevenueCard title="Year to Date" period="2023" amount="$1,200.38" compact />
              </Reveal>
              <Reveal className="absolute top-0 left-7" y={60}>
                <ShadowedImage
                  src="/assets/images/creator-girl-shadow.png"
                  alt="Creator with headphones holding a tablet"
                  width={435}
                  height={596}
                />
              </Reveal>
              <Reveal className="absolute top-[413px] left-[283px]" delay={0.3}>
                <HappyStudentsCard showcase />
              </Reveal>
              <Ornament shape="spring" tint="lime" size={215} className="top-[114px] left-[305px]" delay={0.8} />
          </ScaledStage>

          <Reveal className="flex flex-col gap-10 lg:w-[580px]">
            <h2 className="font-heading text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-950 sm:text-[44px] lg:w-[391px]">
              Create &amp; Manage Courses Easily.
            </h2>
            <p className="font-body text-lg leading-[1.6] text-shuttle-700 lg:w-[574px]">
              <strong className="font-bold text-shuttle-950">ByteSpace</strong> supports individuals or entities in
              the creation, publication, and administration of educational courses.
            </p>
            <ul className="flex flex-col gap-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-end gap-2 font-body text-lg font-medium leading-[1.2] text-shuttle-950">
                  <Image src="/assets/icons/check-circle.svg" alt="" width={24} height={24} />
                  {perk}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
