# ByteSpace

ByteSpace is a modern online course marketplace and learning platform website built with pixel-level precision.

## Project Overview

ByteSpace is a high-fidelity website implementation based on the provided Figma design:
- [ByteSpace Figma Design](https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website)

The project includes the complete landing page experience, interactive course exploration and filtering, comprehensive course details and curriculum overviews, video player views, creator profile pages, and authentication flows (login and signup).

## Features

- **Landing Page**: Complete hero section, partner showcase, featured course topics with animated tab switching, learning paths, creator features, call-to-action sections, and community testimonials.
- **Course Discovery & Search**: Filter courses by topic, difficulty level, category, and instructor with responsive search controls.
- **Course Details & Player**: Multi-tab course pages with curriculum breakdowns, instructor bios, reviews, and interactive video lesson interfaces.
- **Creator Profiles**: Instructor showcase displaying portfolio courses and instructor statistics.
- **Authentication**: Responsive Login and Sign Up flows with input validation.
- **Aesthetics & Performance**: Built with design tokens from Figma, self-hosted typography, custom 3D ornaments, smooth Lenis scrolling, and micro-animations.

## Tech Stack

Detected from `package.json`:
- **Framework**: [Next.js](https://nextjs.org/) 16.3.6 (App Router, Turbopack)
- **UI Library**: [React](https://react.dev/) 19.2.8
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Animations**: [Motion](https://motion.dev/) (Framer Motion v13)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) 1.3.26
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5
- **Linting**: [ESLint](https://eslint.org/) 9 with `eslint-config-next`

## Project Structure

```
bytespace/
├── public/
│   └── assets/              # Static assets (icons, images, backgrounds, logos, shapes)
├── src/
│   ├── app/                 # Next.js App Router pages and route handlers
│   │   ├── (auth)/          # Authentication routes (login, signup)
│   │   ├── courses/         # Course details and lesson player routes
│   │   ├── creators/        # Creator profile routes
│   │   ├── search/          # Course discovery and catalog search
│   │   ├── layout.tsx       # Root layout with fonts, metadata, and providers
│   │   └── page.tsx         # ByteSpace landing page
│   ├── assets/              # Local typography (Satoshi, Clash Display)
│   ├── components/          # Reusable UI, layout, card, and section components
│   │   ├── auth/            # Auth forms and layout shells
│   │   ├── cards/           # Course, category, creator, and stat cards
│   │   ├── layout/          # Header, footer, logo, and newsletter components
│   │   ├── motion/          # Motion reveal and stagger wrappers
│   │   ├── providers/       # Smooth scrolling provider
│   │   ├── sections/        # Landing page sections
│   │   └── ui/              # Buttons, containers, badges, and ornaments
│   ├── data/                # Static datasets (courses, creators, testimonials, site config)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility helpers, fonts, and search functions
│   └── types/               # TypeScript type definitions
├── .gitignore               # Ignored files and patterns
├── package.json             # Scripts and project dependencies
└── tsconfig.json            # TypeScript configuration
```

## Installation

Install project dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Build

Run production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Deployment

The application is optimized for deployment on [Vercel](https://vercel.com/):
1. Connect your GitHub repository to Vercel.
2. Vercel automatically detects Next.js build settings (`npm run build`).
3. Deploy directly with production-ready asset caching, font optimization, and static/dynamic route handling.

## Figma Reference

Designed according to the official ByteSpace specification:
[https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website](https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website)
