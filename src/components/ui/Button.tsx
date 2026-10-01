import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-lime-400 text-shuttle-950 hover:bg-lime-500 hover:shadow-[0_10px_24px_-8px_rgb(212_251_32/0.7)] focus-visible:outline-lime-400",
  secondary:
    "bg-persian-blue-800 text-white hover:bg-persian-blue-900 focus-visible:outline-persian-blue-800",
  outline:
    "border border-shuttle-200 bg-transparent text-shuttle-950 hover:bg-shuttle-50 focus-visible:outline-shuttle-400",
};

const base =
  "inline-flex shrink-0 items-center justify-center rounded-3xl px-6 py-3 font-body text-lg font-medium leading-[1.2] whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

type ButtonVariant = keyof typeof variants;

type ButtonProps = ComponentProps<"button"> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(base, variants[variant], className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}
