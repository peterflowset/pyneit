import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pyneit — Wein aus Südtirol",
    template: "%s | Pyneit",
  },
  description:
    "Pyneit — Südtiroler Wein aus 930 Metern Höhe. Entdecken Sie unseren 930, gewachsen in den Dolomiten.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
