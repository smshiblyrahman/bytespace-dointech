import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: ReactNode;
  description: ReactNode;
  size?: "md" | "sm";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({ title, description, size = "md", className, titleClassName }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mx-auto flex max-w-[965px] flex-col items-center gap-4 px-4 sm:px-6 text-center", className)}>
      <h2
        className={cn(
          "font-heading font-semibold leading-[1.2] tracking-[-0.01em] text-ink",
          size === "md" ? "text-[32px] sm:text-[44px]" : "text-[28px] sm:text-[36px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <p className="font-body text-base leading-[1.6] text-shuttle-400 sm:text-lg">{description}</p>
    </Reveal>
  );
}
