"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface VineyardDetailProps {
  title: string;
  text: string;
}

export function VineyardDetail({ title, text }: VineyardDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center overflow-hidden">
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-[-15%] will-change-transform"
      >
        <OptimizedImage
          src="/images/vineyard-930m.webp"
          alt="Weinberg auf 930 Metern Höhe"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center text-text-secondary will-change-transform"
      >
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide mb-8">
            {title}
          </h2>
          <p className="font-sans text-base md:text-lg leading-relaxed text-text-secondary/80">
            {text}
          </p>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}
