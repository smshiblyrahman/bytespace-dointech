"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-4 sm:flex-row sm:gap-6">
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Enter your email"
        className="h-[52px] w-full rounded-[100px] border border-shuttle-200 bg-white px-6 font-body text-base leading-[1.6] text-shuttle-950 outline-none transition-colors placeholder:text-shuttle-950 focus:border-persian-blue-800 sm:w-[376px]"
      />
      {/* The design labels this button "Search" */}
      <Button type="submit" className="self-start">
        Search
      </Button>
      <AnimatePresence>
        {done && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-6 left-6 font-body text-xs text-persian-blue-800"
          >
            Thanks for subscribing!
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
