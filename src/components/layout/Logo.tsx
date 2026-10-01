import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  tone?: "light" | "dark";
  /** Auth screens show the mark only. */
  markOnly?: boolean;
  className?: string;
};

export function Logo({ tone = "light", markOnly, className }: LogoProps) {
  return (
    <Link href="/" aria-label="ByteSpace home" className={cn("flex items-start gap-2", className)}>
      <Image src="/assets/logo/logo-mark.svg" alt="" width={29} height={32} className="h-[31.5px] w-[28.875px]" />
      {!markOnly && (
        <span
          className={cn(
            "mt-[7px] font-display text-2xl leading-[30px] font-bold",
            tone === "light" ? "text-shuttle-50" : "text-shuttle-950",
          )}
        >
          ByteSpace
        </span>
      )}
    </Link>
  );
}
