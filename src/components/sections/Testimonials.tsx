import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="relative scroll-mt-24 overflow-hidden bg-surface pt-[74px] pb-24 lg:h-[784px] lg:pb-0">
      <Image
        src="/assets/backgrounds/glow-lime-lg.svg"
        alt=""
        width={1217}
        height={1217}
        className="pointer-events-none absolute top-[-281px] left-1/2 max-w-none translate-x-[82px]"
      />
      <Image
        src="/assets/backgrounds/glow-lime-sm.svg"
        alt=""
        width={752}
        height={752}
        className="pointer-events-none absolute top-[-178px] left-1/2 max-w-none -translate-x-[365px]"
      />
      <Image
        src="/assets/backgrounds/glow-blue-lg.svg"
        alt=""
        width={1217}
        height={1217}
        className="pointer-events-none absolute top-[109px] left-1/2 max-w-none -translate-x-[1202px]"
      />

      <div className="relative mx-auto flex max-w-[1248px] flex-col gap-12 px-4 sm:px-6 lg:gap-[72px]">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[43px]">
          <h2 id="testimonials-title" className="font-heading text-[32px] font-semibold leading-[1.2] tracking-[-0.01em] text-black sm:text-[44px] lg:w-[577px] lg:shrink-0">
            Discover What Our Community Is Saying
          </h2>
          <p className="font-body text-lg leading-[1.6] text-black-700 lg:w-[580px]">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly
            from those who have experienced the transformative journey of learning and creating on our platform.
            Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished
            creators.
          </p>
        </Reveal>

        <Stagger className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between lg:justify-start lg:gap-[41px]" stagger={0.15}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="w-full max-w-[374px]">
              <figure className="flex flex-col gap-6 rounded-3xl bg-white p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgb(0_59_226/0.3)]">
                <Image src={t.avatar} alt={t.name} width={80} height={80} className="rounded-full" />
                <figcaption>
                  <p className="font-heading text-xl font-semibold leading-[1.2] tracking-[-0.01em] text-black">{t.name}</p>
                  <p className="font-body text-lg leading-[1.6] text-persian-blue-800">{t.role}</p>
                </figcaption>
                <blockquote className="font-body text-lg leading-[1.6] text-black-700">&quot;{t.quote}&quot;</blockquote>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
