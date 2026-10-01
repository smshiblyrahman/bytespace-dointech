import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  // Ensure Next.js produces clean production output for Vercel
  poweredByHeader: false,
};

export default nextConfig;
