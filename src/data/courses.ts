import type { Category, Course, Level } from "@/types";

export type { Course } from "@/types";

const images = {
  figma: "/assets/courses/figma-basics.png",
  asset: "/assets/courses/digital-asset.png",
  data: "/assets/courses/big-data.png",
  productivity: "/assets/courses/productivity.png",
  money: "/assets/courses/money.png",
  startup: "/assets/courses/startup.png",
} as const;

const base = {
  lessons: 17,
  duration: "2 hours 16 mins",
  comments: 59,
  enrolled: 26,
};

type Row = [
  id: string,
  title: string,
  image: keyof typeof images,
  level: Level,
  category: Category,
  rating: number,
  price: number,
  students: number,
  publishedAt: string,
  topics: string[],
];

/** The first six rows are the courses shown on the Figma home page, in order. */
const rows: Row[] = [
  ["learn-figma-from-basic", "Learn Figma from Basic", "figma", "Beginner", "Design", 4.5, 25, 1840, "2023-11-02", ["Featured", "UI/UX Design", "Graphic Design", "Digital Illustration"]],
  ["build-digital-asset", "Build Digital Asset", "asset", "Beginner", "Design", 4.5, 25, 199, "2023-10-18", ["Featured", "Graphic Design", "Animation", "Digital Illustration"]],
  ["the-power-of-big-data", "the Power of Big Data", "data", "Beginner", "IT & Software", 4.5, 25, 1260, "2023-09-27", ["Featured", "Data Science", "Web Development"]],
  ["balancing-productivity-and-self-care", "Balancing Productivity and Self-Care", "productivity", "Beginner", "Business", 4.5, 25, 940, "2023-09-11", ["Featured", "Productivity"]],
  ["mastering-money-management", "Mastering Money Management", "money", "Beginner", "Business", 4.5, 25, 1120, "2023-08-30", ["Featured", "Freelance & Entrepreneurship", "Data Science"]],
  ["from-idea-to-startup-success", "From Idea to Startup Success", "startup", "Beginner", "Marketing", 4.5, 25, 870, "2023-08-14", ["Featured", "Marketing", "Creative Marketing", "Freelance & Entrepreneurship"]],
  ["figma-prototyping-masterclass", "Figma Prototyping Masterclass", "figma", "Intermediate", "Design", 4.8, 35, 1520, "2023-12-05", ["Featured", "UI/UX Design"]],
  ["design-systems-in-practice", "Design Systems in Practice", "asset", "Advanced", "Design", 4.7, 45, 760, "2024-01-12", ["Featured", "UI/UX Design", "Graphic Design"]],
  ["data-visualization-essentials", "Data Visualization Essentials", "data", "Intermediate", "IT & Software", 4.6, 30, 1030, "2023-12-19", ["Featured", "Data Science", "Web Development"]],
  ["deep-work-for-creatives", "Deep Work for Creatives", "productivity", "Beginner", "Business", 4.4, 19, 620, "2024-02-02", ["Featured", "Productivity", "Social Media"]],
  ["investing-for-beginners", "Investing for Beginners", "money", "Beginner", "Business", 4.3, 22, 1310, "2024-01-25", ["Featured", "Freelance & Entrepreneurship"]],
  ["pitching-your-startup", "Pitching Your Startup", "startup", "Intermediate", "Marketing", 4.6, 29, 540, "2024-02-14", ["Featured", "Marketing", "Creative Marketing"]],
  ["ui-animation-fundamentals", "UI Animation Fundamentals", "figma", "Intermediate", "Design", 4.7, 32, 880, "2024-03-01", ["Featured", "Animation", "UI/UX Design"]],
  ["icon-design-bootcamp", "Icon Design Bootcamp", "asset", "Beginner", "Design", 4.5, 18, 450, "2024-03-09", ["Featured", "Digital Illustration", "Graphic Design", "Drawing & Painting"]],
  ["analytics-dashboards-with-sql", "Analytics Dashboards with SQL", "data", "Advanced", "IT & Software", 4.8, 49, 690, "2024-03-18", ["Featured", "Data Science", "Web Development"]],
  ["building-a-home-studio", "Building a Home Studio", "productivity", "Beginner", "Photography", 4.2, 15, 380, "2024-04-02", ["Featured", "Photography", "Film & Video", "Music"]],
  ["freelance-pricing-strategies", "Freelance Pricing Strategies", "money", "Intermediate", "Business", 4.6, 27, 720, "2024-04-10", ["Featured", "Freelance & Entrepreneurship", "Marketing"]],
  ["growth-marketing-playbook", "Growth Marketing Playbook", "startup", "Advanced", "Marketing", 4.7, 39, 960, "2024-04-22", ["Featured", "Marketing", "Social Media", "Creative Marketing"]],
  ["responsive-web-design", "Responsive Web Design", "figma", "Beginner", "Development", 4.6, 24, 2050, "2024-05-03", ["Web Development", "UI/UX Design"]],
  ["brand-identity-design", "Brand Identity Design", "asset", "Intermediate", "Design", 4.5, 33, 810, "2024-05-15", ["Graphic Design", "Creative Marketing", "Drawing & Painting"]],
  ["python-for-data-analysis", "Python for Data Analysis", "data", "Beginner", "Development", 4.8, 29, 2400, "2024-05-28", ["Data Science", "Web Development"]],
  ["habits-of-productive-teams", "Habits of Productive Teams", "productivity", "Intermediate", "Business", 4.3, 21, 530, "2024-06-06", ["Productivity"]],
  ["personal-finance-for-freelancers", "Personal Finance for Freelancers", "money", "Beginner", "Business", 4.4, 17, 670, "2024-06-19", ["Freelance & Entrepreneurship"]],
  ["social-media-content-strategy", "Social Media Content Strategy", "startup", "Beginner", "Marketing", 4.5, 20, 1180, "2024-07-01", ["Social Media", "Marketing", "Creative Marketing"]],
  ["product-photography-at-home", "Product Photography at Home", "productivity", "Beginner", "Photography", 4.6, 23, 740, "2024-07-12", ["Photography", "Crafts"]],
  ["motion-graphics-for-social", "Motion Graphics for Social", "figma", "Intermediate", "Design", 4.7, 31, 590, "2024-07-24", ["Animation", "Social Media", "Film & Video"]],
  ["cooking-for-busy-creators", "Cooking for Busy Creators", "productivity", "Beginner", "Business", 4.4, 12, 330, "2024-08-05", ["Cooking", "Productivity"]],
  ["songwriting-foundations", "Songwriting Foundations", "asset", "Beginner", "Marketing", 4.5, 16, 410, "2024-08-17", ["Music"]],
  ["watercolor-illustration", "Watercolor Illustration", "asset", "Beginner", "Design", 4.6, 18, 520, "2024-08-29", ["Drawing & Painting", "Digital Illustration", "Crafts"]],
  ["short-film-storytelling", "Short Film Storytelling", "startup", "Intermediate", "Photography", 4.5, 28, 460, "2024-09-10", ["Film & Video", "Creative Marketing"]],
  ["next-js-for-designers", "Next.js for Designers", "figma", "Intermediate", "Development", 4.8, 36, 1390, "2024-09-22", ["Web Development", "UI/UX Design"]],
  ["machine-learning-basics", "Machine Learning Basics", "data", "Intermediate", "IT & Software", 4.7, 42, 1760, "2024-10-04", ["Data Science"]],
  ["negotiation-for-creators", "Negotiation for Creators", "money", "Intermediate", "Business", 4.4, 22, 390, "2024-10-16", ["Freelance & Entrepreneurship", "Productivity"]],
  ["launching-on-product-hunt", "Launching on Product Hunt", "startup", "Beginner", "Marketing", 4.3, 14, 280, "2024-10-28", ["Marketing", "Social Media"]],
  ["portrait-photography-basics", "Portrait Photography Basics", "productivity", "Beginner", "Photography", 4.6, 21, 870, "2024-11-09", ["Photography"]],
  ["accessible-interface-design", "Accessible Interface Design", "figma", "Advanced", "Design", 4.9, 44, 640, "2024-11-21", ["UI/UX Design", "Web Development"]],
];

/** The Figma catalogue belongs to PurePearl Studio; the extra mock courses are spread across other creators. */
const creatorFor = (index: number, category: Category): [id: string, byline: string] => {
  if (index < 6) return ["purepearl-studio", "purepearl studio"];
  if (category === "Design") return ["brightline-studio", "brightline studio"];
  if (category === "Development" || category === "IT & Software") return ["codecraft-labs", "codecraft labs"];
  return ["northwind-academy", "northwind academy"];
};

export const courses: Course[] = rows.map(
  ([id, title, image, level, category, rating, price, students, publishedAt, topics], index) => ({
    ...base,
    creatorId: creatorFor(index, category)[0],
    creator: creatorFor(index, category)[1],
    id,
    title,
    image: images[image],
    level,
    category,
    rating,
    price,
    students,
    publishedAt,
    topics,
  }),
);

/** The six courses featured on the home page. */
export const featuredCourses = courses.slice(0, 6);

export function getCourse(id: string) {
  return courses.find((course) => course.id === id);
}

export function getCoursesByCreator(creatorId: string) {
  return courses.filter((course) => course.creatorId === creatorId);
}

export const courseTopics = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
] as const;

/** Topic chips shown on the search page, in Figma order. */
export const searchTopics = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Cooking",
] as const;

export const levels: Level[] = ["Beginner", "Intermediate", "Advanced"];

export const categories = [
  { label: "Design", icon: "/assets/icons/cat-design.svg" },
  { label: "Development", icon: "/assets/icons/cat-development.svg" },
  { label: "IT & Software", icon: "/assets/icons/cat-it.svg" },
  { label: "Business", icon: "/assets/icons/cat-business.svg" },
  { label: "Marketing", icon: "/assets/icons/cat-marketing.svg" },
  { label: "Photography", icon: "/assets/icons/cat-photography.svg" },
] as const satisfies readonly { label: Category; icon: string }[];
