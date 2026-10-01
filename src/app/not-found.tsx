import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-persian-blue-800 lg:h-[957px]">
          {/* Giant gradient "404" sits under the blueprint grid, like the Figma layer order */}
          <p
            aria-hidden
            className="absolute top-[120px] left-1/2 -z-10 -translate-x-1/2 bg-clip-text font-heading text-[min(42vw,300px)] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap text-transparent sm:text-[300px] lg:top-[160px] lg:text-[480px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(212 251 32) 0%, rgb(212 251 32 / 0.96) 25%, rgb(212 251 32 / 0.81) 50.5%, rgb(212 251 32 / 0.61) 68%, rgb(255 255 255 / 0) 100%)",
            }}
          >
            404
          </p>
          <div aria-hidden className="bg-blueprint absolute inset-0 -z-10" />

          <div className="mx-auto flex max-w-[1248px] flex-col items-center gap-8 px-4 sm:px-6 pt-[260px] pb-24 text-center sm:pt-[340px] lg:pt-[521px] lg:pb-0">
            <h1 className="max-w-[935px] font-heading text-[40px] leading-[1.2] font-semibold tracking-[-0.01em] text-white sm:text-[56px] lg:text-[72px]">
              The page you are looking for doesn’t exist
            </h1>
            <p className="font-body text-base leading-[1.6] text-shuttle-100 sm:text-lg">
              Try to use a correct url or go back to homepage to start again
            </p>
            <ButtonLink href="/">Back to Home</ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
