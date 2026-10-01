"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav } from "@/data/site";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.split("/").slice(0, 2).join("/")) ||
        (href === "/search" && pathname.startsWith("/courses"));

  // While the mobile menu is open: lock page scroll, close on Escape, keep focus inside the panel.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const toggle = toggleRef.current;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
      toggle?.focus({ preventScroll: true });
    };
  }, [open, lenis]);

  return (
    <>
      {/* Sibling of <header>: its backdrop-filter would otherwise trap this fixed layer inside the bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
        )}
      </AnimatePresence>
      <header
        className={cn(
          "animate-header-in fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          (scrolled || open) && "bg-persian-blue-800/85 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-md",
        )}
      >
        <nav
          className={cn(
            "relative mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 transition-[height] duration-500 sm:px-6 lg:px-[120px]",
            !scrolled && "tall-md:h-[120px]",
          )}
          aria-label="Main"
        >
          {/* Figma: mark at y=35 in the 120px bar, not vertically centred */}
          <Logo className={cn("transition-[margin] duration-500 lg:ml-0.5", !scrolled && "tall-md:-mt-[13px]")} />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-start gap-6 md:flex">
            {mainNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative font-body text-base text-shuttle-50 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-lime-400 after:transition-transform after:duration-300 hover:after:scale-x-100",
                    isActive(item.href) ? "font-medium leading-[1.2]" : "leading-[1.6]",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/login" className="font-body text-base leading-6 text-shuttle-50 transition-colors hover:text-lime-400">
              Sign In
            </Link>
            <Link href="/signup" className="font-body text-base leading-6 text-shuttle-50 transition-colors hover:text-lime-400">
              Join Us
            </Link>
            <button type="button" aria-label="Cart" className="transition-transform hover:scale-110">
              <Image src="/assets/icons/shopping-bag.svg" alt="" width={24} height={24} />
            </button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 flex size-11 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen(!open)}
          >
            <span className={cn("h-0.5 w-6 bg-shuttle-50 transition-transform", open && "translate-y-2 rotate-45")} />
            <span className={cn("h-0.5 w-6 bg-shuttle-50 transition-opacity", open && "opacity-0")} />
            <span className={cn("h-0.5 w-6 bg-shuttle-50 transition-transform", open && "-translate-y-2 -rotate-45")} />
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                ref={panelRef}
                id={panelId}
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="relative mx-4 max-h-[calc(100dvh-96px)] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl md:hidden"
              >
                <ul className="flex flex-col gap-1 font-body text-lg text-shuttle-950">
                  {mainNav.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center rounded-2xl px-3",
                          isActive(item.href) ? "bg-shuttle-50 font-medium" : "hover:bg-shuttle-50",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-shuttle-100 pt-5 font-body text-base">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-center rounded-3xl border border-shuttle-200 px-5"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center justify-center rounded-3xl bg-lime-400 px-5 font-medium"
                  >
                    Join Us
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
