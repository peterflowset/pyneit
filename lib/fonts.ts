import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google";

export const hatton = localFont({
  src: "../public/fonts/Hatton-Medium.woff2",
  variable: "--font-hatton",
  display: "swap",
  weight: "500",
});

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});
