import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type PaginationProps = {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
};

const arrow =
  "flex items-center justify-center rounded-3xl border border-shuttle-200 bg-white px-3 py-3 transition-colors hover:border-shuttle-400 sm:px-4";

export function Pagination({ page, pageCount, hrefFor }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3 sm:gap-6">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={arrow} aria-label="Previous page" scroll={false}>
          <Image src="/assets/icons/chevron-left.svg" alt="" width={24} height={24} />
        </Link>
      ) : (
        <span className={cn(arrow, "opacity-50")} aria-disabled>
          <Image src="/assets/icons/chevron-left.svg" alt="" width={24} height={24} />
        </span>
      )}

      <ol className="flex items-center gap-4 sm:gap-6">
        {pages.map((n) => (
          <li key={n}>
            {/* Figma greys out the page you are on */}
            <Link
              href={hrefFor(n)}
              scroll={false}
              aria-current={n === page ? "page" : undefined}
              className={cn(
                "flex min-h-11 min-w-6 items-center justify-center font-heading text-xl leading-7 font-semibold tracking-[-0.01em] transition-colors",
                n === page ? "pointer-events-none text-shuttle-200" : "text-shuttle-950 hover:text-persian-blue-800",
              )}
            >
              {n}
            </Link>
          </li>
        ))}
      </ol>

      {page < pageCount ? (
        <Link href={hrefFor(page + 1)} className={arrow} aria-label="Next page" scroll={false}>
          <Image src="/assets/icons/chevron-right.svg" alt="" width={24} height={24} />
        </Link>
      ) : (
        <span className={cn(arrow, "opacity-50")} aria-disabled>
          <Image src="/assets/icons/chevron-right.svg" alt="" width={24} height={24} />
        </span>
      )}
    </nav>
  );
}
