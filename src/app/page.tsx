import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CreatorCta } from "@/components/sections/CreatorCta";
import { CreatorFeatures } from "@/components/sections/CreatorFeatures";
import { FeaturedCourses } from "@/components/sections/FeaturedCourses";
import { Hero } from "@/components/sections/Hero";
import { LearningPaths } from "@/components/sections/LearningPaths";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
        <Hero />
        <Partners />
        <FeaturedCourses />
        <LearningPaths />
        <CreatorFeatures />
        <CreatorCta />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
