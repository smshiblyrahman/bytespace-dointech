"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { CourseCard } from "@/components/cards/CourseCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { courseTopics, featuredCourses } from "@/data/courses";
import { cn } from "@/lib/cn";

type Topic = (typeof courseTopics)[number];

const topicRows = [courseTopics.slice(0, 8), courseTopics.slice(8, 14), courseTopics.slice(14)];

export function FeaturedCourses() {
  const [active, setActive] = useState<Topic>("Featured");

  const filtered = useMemo(() => featuredCourses.filter((c) => c.topics.includes(active)), [active]);

  return (
    <section id="courses" className="scroll-mt-24 bg-white pt-[72px] pb-[72px]">
      <SectionHeading
        title={<>Discover Your Passion, <br className="hidden sm:block" />Build Your Skills</>}
        description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        titleClassName="sm:max-w-[588px]"
      />

      <Reveal delay={0.1} className="mx-auto mt-[42px] max-w-[1134px] px-4 sm:px-6">
        <LayoutGroup>
          {/* Three centred rows, matching the line breaks in the design */}
          <div
            role="tablist"
            aria-label="Course topics"
            className="-mx-4 flex items-center gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-col sm:gap-x-0 sm:gap-y-[21px] sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {topicRows.map((row, r) => (
              <ul key={r} className="contents sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4 sm:gap-y-[21px]">
                {row.map((topic) => {
                  const selected = topic === active;
                  return (
                    <li key={topic}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActive(topic)}
                        className={cn(
                          "relative shrink-0 rounded-3xl px-4 py-3 font-body text-base font-medium leading-[1.2] whitespace-nowrap transition-colors duration-300",
                          selected ? "text-shuttle-950" : "bg-shuttle-50 text-shuttle-700 hover:bg-shuttle-100",
                        )}
                      >
                        {selected && (
                          <motion.span
                            layoutId="topic-pill"
                            className="absolute inset-0 rounded-3xl bg-lime-400"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{topic}</span>
                      </button>
                    </li>
                  );
                })}
                {r === topicRows.length - 1 && (
                  <li>
                    <a
                      href="#categories"
                      className="block shrink-0 font-body text-base font-medium leading-[1.2] whitespace-nowrap text-persian-blue-800 hover:underline"
                    >
                      + More
                    </a>
                  </li>
                )}
              </ul>
            ))}
          </div>
        </LayoutGroup>
      </Reveal>

      <div className="mx-auto mt-[77px] max-w-[1247px] px-4 sm:px-6">
        <motion.div layout className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.08 }}
                className="rounded-3xl transition-[translate,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgb(0_59_226/0.35)]"
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="py-16 text-center font-body text-lg text-shuttle-400">
            No courses in “{active}” yet — try another topic.
          </p>
        )}
      </div>
    </section>
  );
}
