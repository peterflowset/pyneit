"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface ParallaxDividerProps {
  imageSrc: string;
  imageAlt: string;
  height?: "tall" | "medium" | "short";
  overlay?: "dark" | "light" | "none";
  children?: React.ReactNode;
}

const heightClasses = {
  tall: "h-[80vh]",
  medium: "h-[60vh]",
  short: "h-[40vh]",
};

export function ParallaxDivider({
  imageSrc,
  imageAlt,
  height = "medium",
  overlay = "dark",
  children,
}: ParallaxDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.0, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden", heightClasses[height])}
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-20%] will-change-transform"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {overlay === "dark" && (
        <motion.div style={{ opacity }} className="absolute inset-0 bg-black/40" />
      )}
      {overlay === "light" && (
        <motion.div style={{ opacity }} className="absolute inset-0 bg-white/30" />
      )}

      {children && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </section>
  );
}
