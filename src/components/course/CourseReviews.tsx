import { panelHeading, panelText } from "@/components/course/CourseAbout";
import { RatingSummary } from "@/components/course/RatingSummary";
import { ReviewList } from "@/components/course/ReviewList";
import { timeAgo } from "@/lib/format";
import type { CourseDetail } from "@/types";

export function CourseReviews({ detail }: { detail: CourseDetail }) {
  // Dates are formatted on the server so client hydration always matches.
  const reviews = detail.reviews.map((review) => ({ ...review, when: timeAgo(review.createdAt) }));

  return (
    <div className="flex flex-col gap-6 lg:w-[723px]">
      <h2 className={panelHeading}>What Learners Are Saying</h2>
      <p className={panelText}>{detail.reviewsIntro}</p>
      <RatingSummary breakdown={detail.ratingBreakdown} />
      <h2 className={panelHeading}>Individual Reviews:</h2>
      <ReviewList reviews={reviews} />
    </div>
  );
}
