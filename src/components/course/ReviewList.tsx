"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/cn";
import type { Review } from "@/types";

type ReviewWithDate = Review & { when: string };

const STAR = "M14.43 10L12 2L9.57 10H2L8.18 14.41L5.83 22L12 17.31L18.18 22L15.83 14.41L22 10H14.43Z";

export function ReviewList({ reviews }: { reviews: ReviewWithDate[] }) {
  const [rating, setRating] = useState<number | null>(null);
  const visible = rating ? reviews.filter((r) => r.rating === rating) : reviews;

  const chip = (selected: boolean) =>
    cn(
      "flex items-center justify-center gap-1 rounded-3xl px-4 py-3 font-body text-base leading-[1.2] font-medium transition-colors duration-300",
      selected ? "bg-lime-400 text-shuttle-950" : "bg-shuttle-50 text-shuttle-700 hover:bg-shuttle-100",
    );

  return (
    <>
      <div role="group" aria-label="Filter reviews by rating" className="flex flex-wrap gap-4">
        <button type="button" aria-pressed={rating === null} onClick={() => setRating(null)} className={chip(rating === null)}>
          All rating
        </button>
        {[5, 4, 3, 2, 1].map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={rating === n}
            aria-label={`${n} star reviews`}
            onClick={() => setRating(n)}
            className={chip(rating === n)}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
              <path d={STAR} fill="#4B4C53" />
            </svg>
            {n}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-6">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((review) => (
            <motion.li
              key={review.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6 rounded-3xl border border-shuttle-200 p-6 sm:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-3">
                    <Image src={review.user.avatar} alt="" width={52} height={52} className="rounded-full" />
                    <div>
                      <p className="font-body text-lg leading-[1.2] font-medium text-shuttle-950">{review.user.name}</p>
                      <p className="font-body text-base leading-[1.6] text-shuttle-700">{review.user.role}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <time dateTime={review.createdAt} className="shrink-0 font-body text-base leading-[1.6] text-shuttle-700">
                  {review.when}
                </time>
              </div>
              <p className="font-body text-base leading-[1.6] text-shuttle-700">{review.comment}</p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {visible.length === 0 && (
        <p className="rounded-3xl border border-dashed border-shuttle-200 p-10 text-center font-body text-base text-shuttle-700">
          No {rating}-star reviews yet.
        </p>
      )}
    </>
  );
}
