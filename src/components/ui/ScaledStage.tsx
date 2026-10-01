import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ScaledStageProps = {
  /** Native Figma size of the artwork. */
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
};

/**
 * Renders a fixed-size Figma composition at 1:1 when there is room and scales it down fluidly
 * (never up) to fit its container, reserving the scaled height so surrounding layout flows.
 * `tan(atan2(100cqw, W))` turns the container width into a unitless ratio in pure CSS.
 */
export function ScaledStage({ width, height, className, children }: ScaledStageProps) {
  return (
    <div className={cn("w-full [container-type:inline-size]", className)} style={{ maxWidth: width }}>
      <div
        className="relative"
        style={
          {
            "--stage-scale": `min(1, tan(atan2(100cqw, ${width}px)))`,
            height: `calc(${height}px * var(--stage-scale))`,
          } as CSSProperties
        }
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{ width, height, scale: "var(--stage-scale)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
