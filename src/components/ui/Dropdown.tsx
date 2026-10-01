"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type DropdownOption = { value: string; label: string };

export type DropdownGroup = {
  title?: string;
  options: DropdownOption[];
  selected?: string;
  onSelect: (value: string) => void;
};

type DropdownProps = {
  label: string;
  icon: string;
  groups: DropdownGroup[];
  /** Highlights the trigger when a non-default value is applied. */
  active?: boolean;
  align?: "left" | "right";
  className?: string;
};

/** Pill trigger from the Figma toolbar ("Filter", "Level", "Category", "Most relevant") with a popover menu. */
export function Dropdown({ label, icon, groups, active, align = "left", className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-center gap-1 rounded-3xl border px-4 py-3 sm:w-auto font-body text-base font-medium leading-[1.2] whitespace-nowrap text-shuttle-700 transition-colors duration-200 hover:border-shuttle-400",
          active ? "border-persian-blue-800 bg-persian-blue-800/5" : "border-shuttle-200 bg-white",
        )}
      >
        <Image src={icon} alt="" width={24} height={24} />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Phones: the menu becomes a bottom sheet over a dimmed page */}
            <motion.div
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 sm:hidden"
            />
          <motion.div
            id={menuId}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            data-lenis-prevent
            className={cn(
              "fixed inset-x-0 bottom-0 z-[61] flex max-h-[75dvh] flex-col gap-3 overflow-y-auto rounded-t-3xl bg-white p-4 pb-[max(16px,env(safe-area-inset-bottom))] shadow-[0_-16px_40px_-12px_rgb(36_37_40/0.25)]",
              "sm:absolute sm:inset-x-auto sm:top-[calc(100%+8px)] sm:bottom-auto sm:z-30 sm:max-h-[360px] sm:min-w-[220px] sm:rounded-2xl sm:border sm:border-shuttle-200 sm:p-2 sm:shadow-[0_16px_40px_-12px_rgb(36_37_40/0.25)]",
              align === "right" ? "sm:right-0 sm:origin-top-right" : "sm:left-0 sm:origin-top-left",
            )}
          >
            <div className="flex items-center justify-between px-3 pt-1 sm:hidden">
              <p className="font-heading text-lg leading-[1.2] font-semibold text-shuttle-950">{label}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid size-11 place-items-center rounded-full text-2xl leading-none text-shuttle-700 hover:bg-shuttle-50"
              >
                ×
              </button>
            </div>
            {groups.map((group, g) => (
              <div key={group.title ?? g} role="group" aria-label={group.title}>
                {group.title && (
                  <p className="px-3 pt-2 pb-1 font-body text-xs font-medium tracking-wide text-shuttle-400 uppercase">
                    {group.title}
                  </p>
                )}
                {group.options.map((option) => {
                  const selected = option.value === group.selected;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="menuitemradio"
                      aria-checked={selected}
                      onClick={() => {
                        group.onSelect(option.value);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex min-h-11 w-full items-center justify-between gap-6 rounded-xl px-3 py-2.5 text-left font-body text-base leading-[1.2] transition-colors sm:min-h-0",
                        selected ? "bg-lime-400 font-medium text-shuttle-950" : "text-shuttle-700 hover:bg-shuttle-50",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
