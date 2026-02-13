"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

interface PlaceTeaserProps {
  overline: string;
  title: string;
  text: string;
  cta: string;
}

export function PlaceTeaser({ overline, title, text, cta }: PlaceTeaserProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-[-10%] will-change-transform"
      >
        <Image
          src="/images/suedtirol-panorama.webp"
          alt="Südtiroler Alpenlandschaft mit Weinbergen"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-text-secondary px-6 will-change-transform"
      >
        <ScrollReveal>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-text-secondary/60 mb-4">
            {overline}
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-wide mb-6">
            {title}
          </h2>
          <p className="font-sans text-base text-text-secondary/70 max-w-lg mb-10">
            {text}
          </p>
          <AnimatedLink
            href="/weingut"
            className="font-serif text-sm uppercase tracking-[0.2em] text-text-secondary"
          >
            {cta}
          </AnimatedLink>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}
