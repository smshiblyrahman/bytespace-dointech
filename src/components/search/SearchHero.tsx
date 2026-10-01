"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

type SearchType = "courses" | "creators";

const typeLabels: Record<SearchType, string> = { courses: "Courses", creators: "Creators" };

export function SearchHero({ query, type }: { query: string; type: SearchType }) {
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !menuRef.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function go(q: string, nextType: SearchType) {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (nextType === "creators") params.set("type", "creators");
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : "/search", { scroll: false });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    go(value, type);
  }

  return (
    <section className="bg-blueprint bg-persian-blue-800 pt-28 md:pt-[140px] pb-16 lg:h-[360px] lg:pt-[164px] lg:pb-0">
      <div className="mx-auto flex max-w-[1248px] flex-col items-center gap-8 px-4 sm:px-6">
        <h1 className="text-center font-heading text-[32px] leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-50 sm:text-4xl">
          Find Your Next Course
        </h1>
        <form role="search" onSubmit={onSubmit} className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <label className="flex h-[52px] w-full items-center gap-2 rounded-3xl bg-white px-6 py-3 transition-shadow focus-within:shadow-[0_0_0_4px_rgb(212_251_32/0.5)] sm:w-[461px]">
            <Image src="/assets/icons/search.svg" alt="" width={24} height={24} />
            <span className="sr-only">Search {typeLabels[type].toLowerCase()}</span>
            <input
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent font-body text-lg leading-[1.6] text-shuttle-950 outline-none placeholder:text-shuttle-400"
            />
          </label>

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-full min-h-12 w-full items-center justify-center gap-2 rounded-3xl bg-lime-400 px-6 py-3 font-body text-lg leading-[1.2] font-medium text-shuttle-950 transition-colors hover:bg-lime-500 sm:w-auto"
            >
              {typeLabels[type]}
              <Image
                src="/assets/icons/chevron-down.svg"
                alt=""
                width={24}
                height={24}
                className={cn("transition-transform duration-200", open && "rotate-180")}
              />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-[calc(100%+8px)] right-0 z-30 flex min-w-[180px] flex-col rounded-2xl bg-white p-2 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.35)]"
                >
                  {(Object.keys(typeLabels) as SearchType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="menuitemradio"
                      aria-checked={t === type}
                      onClick={() => {
                        setOpen(false);
                        go(value, t);
                      }}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-left font-body text-base leading-[1.2]",
                        t === type ? "bg-lime-400 font-medium text-shuttle-950" : "text-shuttle-700 hover:bg-shuttle-50",
                      )}
                    >
                      {typeLabels[t]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </section>
  );
}
