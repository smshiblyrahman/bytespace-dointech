import Image from "next/image";
import { partners } from "@/data/site";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Partners() {
  return (
    <section aria-label="Our partners" className="bg-shuttle-50 py-14 lg:h-[202px] lg:py-0 lg:pt-20">
      <Stagger className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-center gap-x-8 gap-y-8 sm:gap-x-[72px] px-4 sm:px-6">
        {partners.map((logo) => (
          <StaggerItem key={logo.src}>
            <Image
              src={logo.src}
              alt="Partner logo"
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto transition-opacity duration-300 hover:opacity-70 sm:h-auto"
            />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
