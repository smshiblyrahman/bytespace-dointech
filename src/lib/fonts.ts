import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const satoshi = localFont({
  src: [
    { path: "../assets/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const clashDisplay = localFont({
  src: [{ path: "../assets/fonts/ClashDisplay-Bold.woff2", weight: "700", style: "normal" }],
  variable: "--font-clash",
  display: "swap",
});
