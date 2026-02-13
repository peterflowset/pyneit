"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { cn } from "@/lib/cn";

interface SplitSectionProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  cta?: string;
  href?: string;
  imagePosition?: "left" | "right";
  dark?: boolean;
}

export function SplitSection({
  imageSrc,
  imageAlt,
  title,
  text,
  cta,
  href,
  imagePosition = "left",
  dark = false,
}: SplitSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const imageBlock = (
    <ScrollReveal className="relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden">
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-[-15%] will-change-transform"
      >
        <OptimizedImage
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </ScrollReveal>
  );

  const textBlock = (
    <ScrollReveal
      delay={0.2}
      className="flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-0"
    >
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-wide mb-6">
        {title}
      </h2>
      <p className="font-sans text-base leading-relaxed text-text-muted max-w-md mb-8">
        {text}
      </p>
      {cta && href && (
        <AnimatedLink
          href={href}
          className="font-serif text-sm uppercase tracking-[0.2em]"
        >
          {cta}
        </AnimatedLink>
      )}
    </ScrollReveal>
  );

  return (
    <section
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 min-h-[70vh]",
        dark ? "bg-bg-dark text-text-secondary" : "bg-bg-light text-text-primary"
      )}
    >
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </section>
  );
}
