import Image from "next/image";
import { cn } from "@/lib/cn";

/** Padding (in CSS px) baked around the artwork in `*-shadow.png` to make room for the shadow. */
const PAD = { left: 60, top: 40, right: 170, bottom: 190 };

type ShadowedImageProps = {
  /** Pre-rendered PNG: the cut-out plus Figma's 8-layer "A" drop shadow (see public/assets/images). */
  src: string;
  alt: string;
  /** Size of the artwork box in the design; the shadow bleeds outside it. */
  width: number;
  height: number;
  preload?: boolean;
  className?: string;
};

/**
 * Cut-out photo with the Figma shadow baked into the bitmap. A static image costs nothing per frame,
 * unlike eight chained CSS drop-shadow() filters, which were repainted on every animation frame.
 */
export function ShadowedImage({ src, alt, width, height, preload, className }: ShadowedImageProps) {
  const outerW = width + PAD.left + PAD.right;
  const outerH = height + PAD.top + PAD.bottom;
  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={outerW * 2}
        height={outerH * 2}
        preload={preload}
        sizes={`${outerW}px`}
        className="pointer-events-none absolute max-w-none select-none"
        style={{ left: -PAD.left, top: -PAD.top, width: outerW, height: outerH }}
      />
    </div>
  );
}
