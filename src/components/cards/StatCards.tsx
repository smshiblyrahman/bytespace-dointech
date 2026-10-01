"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { studentAvatars } from "@/data/site";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { cn } from "@/lib/cn";

type CardProps = { className?: string };

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

function ProgressBar({ percent, track = "bg-track" }: { percent: number; track?: string }) {
  return (
    <div className={cn("h-2 w-[200px] overflow-hidden rounded-3xl", track)}>
      <motion.div
        className="h-full rounded-3xl bg-lime-400"
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </div>
  );
}

/** `showcase` = the collage instances in Figma, which use 24px label lines (the hero uses 1.2). */
type ShowcaseProps = CardProps & { showcase?: boolean };

export function ProgressCard({ className, showcase }: ShowcaseProps) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-2xl bg-white p-4", className)}>
      <p className={cn("font-body text-sm font-medium text-shuttle-950", showcase ? "leading-6" : "leading-[1.2]")}>
        Learning Progress
      </p>
      <p className="flex h-12 w-[200px] items-center font-heading text-5xl font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-950">
        <CountUp to={55} suffix="%" />
      </p>
      {/* 112 / 200px in the design */}
      <ProgressBar percent={56} />
    </div>
  );
}

export function HappyStudentsCard({
  className,
  variant = "white",
  showcase,
}: ShowcaseProps & { variant?: "white" | "lime" }) {
  const lime = variant === "lime";
  return (
    <div
      className={cn(
        "flex w-[258px] flex-col justify-center gap-2 rounded-2xl p-4",
        lime ? "bg-lime-400" : "bg-white",
        className,
      )}
    >
      <div>
        <p className={cn("font-body text-base font-medium text-shuttle-950", showcase ? "leading-6" : "leading-[1.2]")}>
          Happy Students
        </p>
        <p
          className={cn(
            "flex items-center font-body text-shuttle-400",
            showcase ? "text-[10px] leading-[1.5]" : "text-xs leading-[1.6]",
          )}
        >
          <span className={cn("text-shuttle-950", showcase && "font-bold")}>4.5&nbsp;</span>(240)
          <Image
            src={lime ? "/assets/icons/star-blue.svg" : "/assets/icons/star-lime.svg"}
            alt=""
            width={13}
            height={13}
            className="ml-0.5"
          />
        </p>
      </div>
      <AvatarStack avatars={studentAvatars} size={43} count="2K+" tone={lime ? "dark" : "lime"} />
    </div>
  );
}

export function TopicCard({ className }: CardProps) {
  return (
    <div className={cn("flex flex-col justify-center rounded-2xl bg-white p-4", className)}>
      <p className="font-body text-base font-medium leading-[1.2] text-shuttle-950">UI/UX Design</p>
      <p className="flex items-center gap-2 font-body text-xs leading-[1.6] whitespace-nowrap text-shuttle-400">
        200 Courses <span className="text-[10px] leading-[1.5]">•</span> 1000+ Students
      </p>
    </div>
  );
}

type RevenueCardProps = CardProps & {
  title: string;
  period: string;
  amount: string;
  compact?: boolean;
};

export function RevenueCard({ title, period, amount, compact, className }: RevenueCardProps) {
  const delta = (
    <span className="rounded-3xl bg-lime-500 px-2 py-0.5 font-body text-[10px] font-medium leading-5 text-shuttle-950">
      +12$
    </span>
  );

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 rounded-2xl bg-persian-blue-800 p-4 text-shuttle-50",
        className,
      )}
    >
      <div>
        <p className="font-body text-base font-medium leading-[1.2]">{title}</p>
        <p className="font-body text-[10px] leading-[1.2]">{period}</p>
      </div>
      {compact ? (
        <>
          <p className="font-heading text-2xl font-semibold leading-8 tracking-[-0.01em]">{amount}</p>
          {delta}
        </>
      ) : (
        <>
          <div className="flex w-[200px] items-center justify-between">
            <p className="font-heading text-2xl font-semibold leading-8 tracking-[-0.01em]">{amount}</p>
            {delta}
          </div>
          <ProgressBar percent={56} track="bg-white" />
        </>
      )}
    </div>
  );
}
