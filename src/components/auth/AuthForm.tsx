"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { TextField } from "@/components/auth/TextField";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Mode = "login" | "signup";
type Errors = Partial<Record<"name" | "email" | "password", string>>;

const copy = {
  login: {
    eyebrow: "Sign In",
    title: "Welcome Back",
    submit: "Sign In",
    footer: { text: "New user?", link: "Create an account", href: "/signup" },
  },
  signup: {
    eyebrow: "Create an Account",
    title: "Welcome to ByteSpace",
    submit: "Continue",
    footer: { text: "Already have an account?", link: "Login", href: "/login" },
  },
} as const;

function validate(mode: Mode, data: FormData): Errors {
  const errors: Errors = {};
  const email = String(data.get("email") ?? "").trim();
  const password = String(data.get("password") ?? "");
  if (mode === "signup" && !String(data.get("name") ?? "").trim()) errors.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  return errors;
}

export function AuthForm({ mode }: { mode: Mode }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const t = copy[mode];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(mode, new FormData(e.currentTarget));
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("loading");
    // No backend yet — simulate the request so the flow can be demoed.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center gap-12",
        mode === "login" ? "justify-between lg:min-h-[683px]" : "lg:gap-[122px]",
      )}
    >
      <div className="flex w-full flex-col gap-10">
        <div>
          <p className="font-body text-lg leading-[1.6] text-persian-blue-800">{t.eyebrow}</p>
          <h2 className="font-heading text-[36px] font-semibold leading-[1.2] tracking-[-0.01em] text-shuttle-950 sm:text-[44px]">
            {t.title}
          </h2>
        </div>

        <form noValidate onSubmit={onSubmit} className="flex w-full flex-col items-end gap-6">
          {mode === "signup" && (
            <TextField label="Full Name" name="name" autoComplete="name" placeholder="Jamie Davis" error={errors.name} />
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="designer@example.com"
            error={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            placeholder="********"
            error={errors.password}
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Please wait…" : t.submit}
          </Button>
          <AnimatePresence>
            {status === "done" && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full rounded-xl bg-lime-400/30 px-4 py-3 font-body text-sm text-shuttle-950"
                role="status"
              >
                {mode === "login" ? "Signed in successfully (demo)." : "Account created successfully (demo)."}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>

      {mode === "login" && (
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full items-center gap-[11px]">
            <Image src="/assets/icons/line-divider.svg" alt="" width={200} height={1} className="h-px min-w-0 flex-1 sm:w-[200px] sm:flex-none" />
            <span className="font-body text-lg leading-[1.6] text-black-400">or</span>
            <Image src="/assets/icons/line-divider.svg" alt="" width={200} height={1} className="h-px min-w-0 flex-1 sm:w-[200px] sm:flex-none" />
          </div>
          <div className="flex items-center gap-4">
            {[
              { label: "Continue with Facebook", icon: "/assets/icons/facebook.svg" },
              { label: "Continue with Google", icon: "/assets/icons/google.svg" },
            ].map((provider) => (
              <button
                key={provider.label}
                type="button"
                aria-label={provider.label}
                className="grid size-[72px] place-items-center rounded-3xl border border-black-200 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-persian-blue-800"
              >
                <Image src={provider.icon} alt="" width={40} height={40} />
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="flex gap-1 font-body text-base leading-[1.6]">
        <span className={mode === "login" ? "text-black-400" : "text-shuttle-700"}>{t.footer.text}</span>
        <Link href={t.footer.href} className="text-persian-blue-800 hover:underline">
          {t.footer.link}
        </Link>
      </p>
    </div>
  );
}
