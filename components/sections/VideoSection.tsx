"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface VideoSectionProps {
  overline?: string;
  title: string;
}

function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.15,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y }}
        className="absolute inset-[-20%] will-change-transform"
      >
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 50vw"
        />
      </motion.div>
    </div>
  );
}

export function VideoSection({ overline, title }: VideoSectionProps) {
  return (
    <section className="bg-bg-dark text-text-secondary py-28 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            {overline && (
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-text-muted mb-4">
                {overline}
              </p>
            )}
            <h2 className="font-serif text-3xl md:text-5xl tracking-wide">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative flex justify-center items-center gap-6 md:gap-12">
          {/* Left image — grapes, shifted up */}
          <ScrollReveal delay={0.1}>
            <ParallaxImage
              src="/images/grapes.webp"
              alt="Trauben am Weinberg"
              className="relative aspect-[3/4] w-[55vw] max-w-[500px] md:w-[450px] overflow-hidden -mt-10 md:-mt-20"
              speed={0.15}
            />
          </ScrollReveal>

          {/* Right image — wine pouring, shifted down */}
          <ScrollReveal delay={0.25}>
            <ParallaxImage
              src="/images/wine-pouring.webp"
              alt="Weißwein wird ins Glas gegossen"
              className="relative aspect-[3/4] w-[55vw] max-w-[500px] md:w-[450px] overflow-hidden mt-10 md:mt-20"
              speed={0.1}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
