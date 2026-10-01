import type { ReactNode } from "react";
import { AuthCollage } from "@/components/auth/AuthCollage";
import { Logo } from "@/components/layout/Logo";
import { Reveal } from "@/components/motion/Reveal";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <main className="bg-blueprint relative min-h-dvh overflow-hidden bg-persian-blue-800">
      <div className="mx-auto flex h-[120px] max-w-[1440px] items-start px-4 sm:px-6 pt-[35px] xl:px-[122px]">
        <Logo markOnly />
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-4 sm:px-6 pb-16 lg:flex-row lg:items-start lg:justify-between xl:pr-[120px] xl:pl-[122px]">
        <div className="relative flex-1 xl:h-[784px]">
          <Reveal className="flex max-w-[475px] flex-col gap-4 text-shuttle-50">
            <h1 className="font-heading text-xl font-semibold leading-[1.2] tracking-[-0.01em]">{title}</h1>
            <p className="font-body text-lg leading-[1.6]">{description}</p>
          </Reveal>
          <AuthCollage />
        </div>

        <Reveal
          delay={0.15}
          className="w-full rounded-3xl bg-white px-6 py-10 sm:px-[63px] sm:pt-[61px] sm:pb-10 lg:min-h-[784px] lg:w-[579px] lg:shrink-0"
        >
          {children}
        </Reveal>
      </div>
    </main>
  );
}
