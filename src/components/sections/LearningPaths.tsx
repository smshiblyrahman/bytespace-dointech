import { CategoryCard } from "@/components/cards/CategoryCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/courses";

export function LearningPaths() {
  return (
    <section id="categories" className="scroll-mt-24 bg-white pb-[120px]">
      <SectionHeading
        size="sm"
        title="Explore Diverse Learning Paths at Bytespace"
        description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
        titleClassName="lg:whitespace-nowrap"
      />
      <Stagger className="mx-auto mt-[68px] grid max-w-[1250px] grid-cols-2 gap-6 px-4 sm:px-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
        {categories.map((category) => (
          <StaggerItem key={category.label}>
            <CategoryCard {...category} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
