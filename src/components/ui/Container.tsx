import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** 1200px content column used across the 1440px design, with fluid gutters below that. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1248px] px-4 sm:px-6", className)} {...props} />;
}
