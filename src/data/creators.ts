import type { Creator } from "@/types";

export const creators: Creator[] = [
  {
    id: "purepearl-studio",
    name: "PurePearl Studio",
    role: "Passionate UI/UX, Web designer",
    headline: "Professional Creator",
    avatar: "/assets/creators/purepearl-avatar.png",
    profileImage: "/assets/creators/purepearl-profile.png",
    bio: [
      "Welcome to the creative world of [Creator's Name]. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
      "ive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
    ],
    followers: 12,
  },
  {
    id: "brightline-studio",
    name: "Brightline Studio",
    role: "Product designer & design-systems lead",
    headline: "Professional Creator",
    avatar: "/assets/avatars/reviewer-1.png",
    profileImage: "/assets/avatars/reviewer-1.png",
    bio: [
      "Brightline Studio teaches the craft behind great interfaces — prototyping, motion, icons and accessible design systems.",
      "Every course is built from real client work, so you learn the decisions as well as the tools.",
    ],
    followers: 48,
  },
  {
    id: "codecraft-labs",
    name: "Codecraft Labs",
    role: "Frontend engineer & data educator",
    headline: "Professional Creator",
    avatar: "/assets/avatars/reviewer-3.png",
    profileImage: "/assets/avatars/reviewer-3.png",
    bio: [
      "Codecraft Labs turns complex engineering and data topics into short, practical lessons.",
      "From responsive web design to machine learning, every module ends with something you can ship.",
    ],
    followers: 31,
  },
  {
    id: "northwind-academy",
    name: "Northwind Academy",
    role: "Business, marketing & creative skills",
    headline: "Professional Creator",
    avatar: "/assets/avatars/reviewer-4.png",
    profileImage: "/assets/avatars/reviewer-4.png",
    bio: [
      "Northwind Academy helps independent creators build sustainable businesses — from pricing and pitching to storytelling.",
      "Our courses mix frameworks with hands-on exercises you can apply the same day.",
    ],
    followers: 27,
  },
];

export function getCreator(id: string) {
  return creators.find((creator) => creator.id === id);
}
