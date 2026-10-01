import type { Metadata, Viewport } from "next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { clashDisplay, poppins, satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ByteSpace — Get Access to Hundreds of Courses",
    template: "%s | ByteSpace",
  },
  description:
    "Unlock your creativity, gain valuable knowledge, and grow your business with ByteSpace's wide range of courses.",
};

export const viewport: Viewport = {
  themeColor: "#003be2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${satoshi.variable} ${clashDisplay.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
