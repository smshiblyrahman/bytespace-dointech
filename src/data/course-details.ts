import type { Course, CourseDetail, CourseSection, Lesson, Review } from "@/types";

/** Module outline from the Figma "Lessons" tab; lesson titles are taken from each module's copy. */
const moduleOutline: { title: string; description: string; lessons: [string, number][] }[] = [
  {
    title: "Module 1: Introduction to Digital Assets",
    description:
      "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
    lessons: [
      ["Introduction to Digital Assets", 12],
      ["Understanding Digital Elements", 14],
      ["Navigating Design Software Tools", 18],
    ],
  },
  {
    title: "Module 2: Design Principles for Impact",
    description:
      "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
    lessons: [
      ["Design Principles for Impacts", 21],
      ["Color Theory in Digital Design", 17],
      ["Typography Essentials", 19],
    ],
  },
  {
    title: "Module 4: User-Centric Design Strategies",
    description:
      "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
    lessons: [
      ["Advanced Techniques in Digital Creation", 16],
      ["Design Thinking in Digital Creation", 22],
      ["User Experience (UX) Essentials", 20],
    ],
  },
  {
    title: "Module 5: Interactive Media and Engagement",
    description:
      "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
    lessons: [
      ["Creating Interactive Presentations", 18],
      ["Integrating Multimedia Elements", 24],
    ],
  },
  {
    title: "Module 6: Project Showcase and Critique",
    description:
      "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
    lessons: [
      ["Effective Presentation Techniques", 15],
      ["Peer Critique and Collaboration", 26],
    ],
  },
  {
    title: "Module 7: Optimizing Digital Assets for Various Platforms",
    description:
      "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
    lessons: [
      ["Designing for Mobile Platforms", 19],
      ["Optimizing for Social Media", 16],
      ["Capstone Project: Building Your Portfolio", 32],
    ],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const sections: CourseSection[] = moduleOutline.map((module, m) => ({
  id: `module-${m + 1}`,
  title: module.title,
  description: module.description,
  lessons: module.lessons.map(([title, duration], l): Lesson => {
    const index = moduleOutline.slice(0, m).reduce((n, mod) => n + mod.lessons.length, 0) + l;
    return {
      id: index === 0 ? "introduction" : slugify(title),
      title,
      duration,
      isPreview: index < 3,
      summary: `In this lesson we cover ${title.toLowerCase()} step by step — with a guided walkthrough, practical examples you can follow along with, and a short exercise to lock in what you've learned.`,
      resources: [
        { label: `${title} — slides.pdf`, size: "2.4 MB" },
        { label: "Exercise files.zip", size: "18 MB" },
      ],
    };
  }),
}));

const reviews: Review[] = [
  {
    id: "r1",
    user: { name: "PurePearl Studio", avatar: "/assets/avatars/reviewer-1.png", role: "UI/UX Designer" },
    rating: 5,
    comment:
      '"The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!"',
    createdAt: "2025-09-12",
  },
  {
    id: "r2",
    user: { name: "Albert Flores", avatar: "/assets/avatars/reviewer-2.png", role: "UI/UX Designer" },
    rating: 5,
    comment:
      "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
    createdAt: "2025-08-30",
  },
  {
    id: "r3",
    user: { name: "Cody Fisher", avatar: "/assets/avatars/reviewer-3.png", role: "UI/UX Designer" },
    rating: 5,
    comment:
      "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
    createdAt: "2025-08-21",
  },
  {
    id: "r4",
    user: { name: "Brooklyn Simmons", avatar: "/assets/avatars/reviewer-4.png", role: "UI/UX Designer" },
    rating: 5,
    comment:
      "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
    createdAt: "2025-08-02",
  },
];

/** Hand-written copy for the course that the Figma details page shows. */
const headlines: Record<string, { headline: string; subtitle: string; level: CourseDetail["level"] }> = {
  "build-digital-asset": {
    headline: "Build Digital Asset: A Comprehensive Guide",
    subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
    level: "Intermediate",
  },
};

export function getCourseDetail(course: Course): CourseDetail {
  const copy = headlines[course.id] ?? {
    headline: course.title.charAt(0).toUpperCase() + course.title.slice(1),
    subtitle: "Learn by doing with practical, project-based lessons",
    level: course.level,
  };
  const quoted = `'${copy.headline}'`;

  return {
    ...copy,
    rating: 4.8,
    reviewCount: 172,
    studentCount: course.students,
    totalLessons: 112,
    totalVideos: 102,
    totalHours: 24,
    previewImage: "/assets/course/preview-poster.png",
    description: [
      `Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "${copy.headline}." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.`,
      "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
      "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
    ],
    sneakPeek: [1, 2, 3, 4].map((n) => `/assets/course/sneak-${n}.png`),
    keyPoints: [
      "Foundational Concepts",
      "Design Principles Mastery",
      "Advanced Techniques in Digital Creation",
      "Project Showcase and Critique",
      "Optimizing for Various Platforms",
      "Digital Asset Management Best Practices",
      "Monetization Strategies",
      "Capstone Project: Building Your Portfolio",
    ],
    modulesIntro:
      "Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.",
    lessonContent:
      "Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.",
    progressIntro:
      "Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.",
    progress: 55,
    reviewsIntro: `Discover what our learners have to say about their experience with ${quoted}. Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.`,
    ratingBreakdown: [
      { stars: 5, count: 720 },
      { stars: 4, count: 120 },
      { stars: 3, count: 21 },
      { stars: 2, count: 12 },
      { stars: 1, count: 16 },
    ],
    sections,
    reviews,
  };
}

export function getLessons(detail: CourseDetail) {
  return detail.sections.flatMap((section) => section.lessons);
}
