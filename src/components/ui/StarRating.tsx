import { cn } from "@/lib/cn";

type StarRatingProps = {
  rating: number;
  /** px, the Figma review stars are 24. */
  size?: number;
  className?: string;
};

const STAR_PATH = "M14.43 10L12 2L9.57 10H2L8.18 14.41L5.83 22L12 17.31L18.18 22L15.83 14.41L22 10H14.43Z";

/** Row of five stars; filled stars use the Figma star colour, the rest a lighter tint. */
export function StarRating({ rating, size = 24, className }: StarRatingProps) {
  return (
    <span className={cn("flex gap-1", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d={STAR_PATH} fill={i < Math.round(rating) ? "#4B4C53" : "#CED0D3"} />
        </svg>
      ))}
    </span>
  );
}
