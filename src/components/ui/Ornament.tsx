"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type OrnamentShape = "coil" | "spring" | "torus" | "cylinder" | "cone" | "pyramid";

type OrnamentProps = {
  shape: OrnamentShape;
  tint: "lime" | "white";
  size: number;
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Seconds to offset the idle float animation so shapes don't bob in sync. */
  delay?: number;
};

/**
 * 3D ornament from the design. The Figma tint (colour layer masked to the render and blended with
 * `hard-light`) is pre-baked into `/assets/shapes/{shape}-{tint}.png`, so the browser only moves a
 * plain bitmap on the GPU instead of re-blending a mask every animation frame.
 */
export function Ornament({ shape, tint, size, flip, className, style, delay = 0 }: OrnamentProps) {
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
      style={{ width: size, height: size, ...style }}
      initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 + delay * 0.3 }}
    >
      <div
        className="animate-float relative size-full"
        style={{ "--float-duration": `${6 + delay}s`, animationDelay: `${delay}s` } as CSSProperties}
      >
        <Image
          src={`/assets/shapes/${shape}-${tint}.png`}
          alt=""
          fill
          sizes={`${size}px`}
          className={cn("object-contain", flip && "-scale-x-100")}
        />
      </div>
    </motion.div>
  );
}
