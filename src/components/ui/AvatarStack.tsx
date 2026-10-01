import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: readonly string[];
  size: 32 | 43;
  count: string;
  tone: "lime" | "dark";
  className?: string;
};

const badges = {
  lime: { 32: "/assets/icons/badge-lime-sm.svg", 43: "/assets/icons/badge-lime.svg" },
  dark: { 32: "/assets/icons/badge-dark-sm.svg", 43: "/assets/icons/badge-dark.svg" },
};

export function AvatarStack({ avatars, size, count, tone, className }: AvatarStackProps) {
  const overlap = size === 43 ? 16 : 8;

  return (
    <div className={cn("flex items-start", className)}>
      {avatars.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={size}
          height={size}
          className="shrink-0 rounded-full"
          style={{ marginRight: -overlap }}
        />
      ))}
      <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
        <Image src={badges[tone][size]} alt="" width={size} height={size} className="absolute inset-0" />
        <span
          className={cn(
            "relative font-body text-xs",
            size === 43 ? "font-bold leading-[1.5]" : "font-medium leading-[1.2]",
            tone === "lime" ? "text-shuttle-950" : "text-white",
          )}
        >
          {count}
        </span>
      </span>
    </div>
  );
}
