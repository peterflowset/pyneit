"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

interface QuoteSectionProps {
  quote: string;
  author?: string;
  dark?: boolean;
}

export function QuoteSection({ quote, author, dark = true }: QuoteSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section
      ref={ref}
      className={cn(
        "py-28 md:py-40 overflow-hidden",
        dark ? "bg-bg-dark text-text-secondary" : "bg-bg-light text-text-primary"
      )}
    >
      <motion.div
        style={{ y }}
        className="max-w-4xl mx-auto px-6 md:px-12 text-center will-change-transform"
      >
        <ScrollReveal>
          <div className="flex justify-center mb-10">
            <motion.div
              style={{ scaleY: lineScale }}
              className={cn(
                "w-[1px] h-16 origin-top",
                dark ? "bg-text-muted/30" : "bg-text-muted/30"
              )}
            />
          </div>
          <blockquote className="font-serif text-2xl md:text-4xl lg:text-[2.8rem] italic leading-snug tracking-wide">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {author && (
            <cite className="block mt-8 font-sans text-sm uppercase tracking-[0.2em] text-text-muted not-italic">
              — {author}
            </cite>
          )}
        </ScrollReveal>
      </motion.div>
    </section>
  );
}
