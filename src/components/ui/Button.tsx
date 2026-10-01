import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex shrink-0 items-center justify-center rounded-3xl bg-lime-400 px-6 py-3 font-body text-lg font-medium leading-[1.2] text-shuttle-950 whitespace-nowrap transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-lime-500 hover:shadow-[0_10px_24px_-8px_rgb(212_251_32/0.7)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = ComponentProps<"button"> & { children: ReactNode };

export function Button({ className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(base, className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { children: ReactNode };

export function ButtonLink({ className, ...props }: ButtonLinkProps) {
  return <Link className={cn(base, className)} {...props} />;
}
