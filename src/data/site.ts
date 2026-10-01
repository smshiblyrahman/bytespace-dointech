export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/search" },
  { label: "Creators", href: "/creators/purepearl-studio" },
] as const;

export const partners = [
  { src: "/assets/partners/partner-1.svg", width: 167, height: 41 },
  { src: "/assets/partners/partner-2.svg", width: 168, height: 41 },
  { src: "/assets/partners/partner-3.svg", width: 170, height: 41 },
  { src: "/assets/partners/partner-4.svg", width: 170, height: 41 },
  { src: "/assets/partners/partner-5.svg", width: 169, height: 42 },
] as const;

export const studentAvatars = [1, 2, 3, 4, 5, 6, 7].map(
  (n) => `/assets/avatars/student-${n}.png`,
);

export const learnerAvatars = [1, 2, 3, 4].map((n) => `/assets/avatars/learner-${n}.png`);

export const footerLinks = [
  ["Featured Courses", "Featured Categories", "Business", "IT", "Design"],
  ["Development", "Marketing", "Photography", "Finance", "Sport"],
  ["Become a Creator", "Affiliate Program", "Contact", "Help", "About"],
] as const;

export const legalLinks = ["Privacy Policy", "Terms of Service", "Cookies Settings"] as const;
