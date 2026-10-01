# ByteSpace

Pixel-faithful build of the **ByteSpace New** Figma design: a course marketplace landing page plus the Login and Signup screens.

**Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · Motion (Framer Motion) · Lenis smooth scrolling

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Routes & Screens

| Screen | Route / Local URL | Description |
| --- | --- | --- |
| **Home** | [`/`](http://localhost:3000/) | Landing page |
| **Register** | [`/signup`](http://localhost:3000/signup) | Create an account |
| **Login** | [`/login`](http://localhost:3000/login) | Sign in |
| **Search Page** | [`/search`](http://localhost:3000/search) | Course catalog search & filter |
| **Course Details** | [`/courses/learn-figma-from-basic`](http://localhost:3000/courses/learn-figma-from-basic) | Course overview & about tab |
| **Course Lessons** | [`/courses/learn-figma-from-basic?tab=lessons`](http://localhost:3000/courses/learn-figma-from-basic?tab=lessons) | Syllabus / player: [`/lessons/1-1`](http://localhost:3000/courses/learn-figma-from-basic/lessons/1-1) |
| **Course Reviews** | [`/courses/learn-figma-from-basic?tab=reviews`](http://localhost:3000/courses/learn-figma-from-basic?tab=reviews) | Student reviews & feedback |
| **Creator Profile** | [`/creators/purepearl-studio`](http://localhost:3000/creators/purepearl-studio) | Instructor profile & courses |
| **404 Not Found** | [`/404`](http://localhost:3000/404) | Custom 404 page |

## Project structure

```
public/assets/           Images and SVGs exported from Figma
  avatars/ backgrounds/ courses/ icons/ images/ logo/ partners/ shapes/
src/
  app/
    layout.tsx           Root layout: fonts, metadata, Lenis provider
    page.tsx             Landing page (composes the sections)
    (auth)/login         Sign-in page
    (auth)/signup        Sign-up page
    globals.css          Tailwind v4 theme (design tokens from Figma)
  assets/fonts/          Self-hosted Satoshi and Clash Display
  components/
    auth/                AuthShell, AuthCollage, AuthForm, TextField
    cards/               CourseCard, CategoryCard, stat cards (progress, revenue, …)
    layout/              Header, Footer, Logo, NewsletterForm
    motion/              Reveal / Stagger scroll animations
    providers/           SmoothScroll (Lenis)
    sections/            Hero, Partners, FeaturedCourses, LearningPaths,
                         CreatorFeatures, CreatorCta, Testimonials
    ui/                  Button, Container, Ornament, AvatarStack, SectionHeading
  data/                  Course, category, testimonial and navigation content
  lib/                   Font loaders and the `cn` class helper
```

## Implementation notes

- **Design tokens.** Colors, fonts and the layered drop shadow come from the Figma styles and are defined in the `@theme` block in `globals.css`. Poppins is loaded with `next/font/google`; Satoshi and Clash Display are self-hosted with `next/font/local`.
- **3D ornaments.** The design tints neutral 3D renders by masking a lime or white layer to each shape and blending it with `hard-light`. `Ornament` rebuilds this in CSS (`mask-image` plus `mix-blend-mode`), so the design's source renders are used as-is.
- **Responsive art.** The hero, feature collages and CTA keep the exact 1440px Figma coordinates on desktop. On smaller screens the same layout is scaled down, and the text reflows normally.
- **Interactions.**
  - Topic chips filter the course grid, with an animated active pill.
  - The hero search filters courses (`?q=`) and scrolls to the grid.
  - Cards animate on hover, and sections animate into view.
  - Hero cards have parallax, stats count up, and progress bars fill in.
  - The header turns solid on scroll and has a mobile menu.
  - The auth forms validate input. There is no backend, so a successful submit is simulated.
