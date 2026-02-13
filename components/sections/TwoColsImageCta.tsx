"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

interface ColProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
  href: string;
  cta: string;
}

interface TwoColsImageCtaProps {
  left: ColProps;
  right: ColProps;
}

function Col({ imageSrc, imageAlt, title, text, href, cta }: ColProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="group">
      <div className="relative aspect-[4/5] overflow-hidden mb-8">
        <motion.div
          style={{ y: imgY }}
          className="absolute inset-[-15%] will-change-transform"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
      <h3 className="font-serif text-2xl md:text-3xl tracking-wide mb-3">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-text-muted mb-6 max-w-sm">
        {text}
      </p>
      <AnimatedLink
        href={href}
        className="font-serif text-sm uppercase tracking-[0.2em]"
      >
        {cta}
      </AnimatedLink>
    </div>
  );
}

export function TwoColsImageCta({ left, right }: TwoColsImageCtaProps) {
  return (
    <section className="bg-bg-white text-text-primary py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ScrollReveal>
            <Col {...left} />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <Col {...right} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
