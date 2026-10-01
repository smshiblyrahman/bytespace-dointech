"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type FollowStatsProps = { products: number; followers: number; name: string };

const stat =
  "flex items-center justify-center gap-2 rounded-3xl bg-white px-4 py-3 font-body text-base sm:px-6 sm:text-lg leading-[1.2] font-medium whitespace-nowrap";

export function FollowStats({ products, followers, name }: FollowStatsProps) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <ul className="flex flex-wrap gap-3 sm:gap-4">
        <li className={stat}>
          <span className="text-persian-blue-800">{products}</span>
          <span className="text-shuttle-950">Products</span>
        </li>
        <li className={stat}>
          <span className="text-persian-blue-800" aria-live="polite">
            {followers + (following ? 1 : 0)}
          </span>
          <span className="text-shuttle-950">Followers</span>
        </li>
      </ul>
      <button
        type="button"
        aria-pressed={following}
        aria-label={following ? `Unfollow ${name}` : `Follow ${name}`}
        onClick={() => setFollowing((f) => !f)}
        className={cn(
          "rounded-3xl px-6 py-3 font-body text-lg leading-[1.2] font-medium transition-colors duration-200",
          following ? "bg-white text-persian-blue-800 hover:bg-shuttle-50" : "bg-lime-400 text-ink hover:bg-lime-500",
        )}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}
