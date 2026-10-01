"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function HeroSearch() {
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form role="search" onSubmit={onSubmit} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
      <label className="flex h-[52px] w-full items-center gap-2 rounded-3xl bg-white px-6 py-3 transition-shadow focus-within:shadow-[0_0_0_4px_rgb(212_251_32/0.5)] sm:w-[461px]">
        <Image src="/assets/icons/search.svg" alt="" width={24} height={24} />
        <span className="sr-only">Search courses</span>
        <input
          name="q"
          type="search"
          placeholder="Course, topic, creator"
          className="w-full bg-transparent font-body text-lg leading-[1.6] text-shuttle-950 outline-none placeholder:text-shuttle-400"
        />
      </label>
      <Button type="submit">Search</Button>
    </form>
  );
}
