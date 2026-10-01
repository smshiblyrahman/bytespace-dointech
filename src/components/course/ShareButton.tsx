"use client";

import Image from "next/image";
import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href.split("?")[0];
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Share sheet dismissed or clipboard unavailable — nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="flex shrink-0 items-center justify-center gap-2 self-start rounded-3xl bg-lime-400 px-6 py-2 font-body text-base leading-6 font-medium text-shuttle-950 transition-colors hover:bg-lime-500"
    >
      <Image src="/assets/icons/share.svg" alt="" width={24} height={24} />
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
