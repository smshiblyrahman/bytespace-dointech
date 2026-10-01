import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

type EmptyResultsProps = { query: string; clearHref: string; subject?: string };

export function EmptyResults({ query, clearHref, subject = "courses" }: EmptyResultsProps) {
  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-dashed border-shuttle-200 px-6 py-20 text-center">
      <span className="grid size-[72px] place-items-center rounded-3xl bg-lime-400">
        <Image src="/assets/icons/search.svg" alt="" width={32} height={32} className="brightness-0" />
      </span>
      <div className="flex max-w-[480px] flex-col gap-2">
        <h2 className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-950">
          {query ? `No ${subject} found for “${query}”` : `No ${subject} match these filters`}
        </h2>
        <p className="font-body text-base leading-[1.6] text-shuttle-700">
          Try a different keyword, pick another topic, or clear your filters to browse everything.
        </p>
      </div>
      <ButtonLink href={clearHref}>Clear search</ButtonLink>
    </div>
  );
}
