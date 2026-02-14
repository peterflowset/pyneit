"use client";

import { motion, type Variants } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

interface ItemProps {
  title: string;
  text: string;
  href: string;
  cta: string;
}

interface TwoColsImageCtaProps {
  item: ItemProps;
  slideFrom?: "left" | "right";
}

const EASE_PREMIUM: [number, number, number, number] = [0.87, 0, 0.13, 1];

export function TwoColsImageCta({
  item,
  slideFrom = "left",
}: TwoColsImageCtaProps) {
  const xOffset = slideFrom === "left" ? -80 : 80;

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: xOffset },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: EASE_PREMIUM },
    },
  };

  return (
    <section className="bg-bg-white text-text-primary py-24 md:py-36 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide leading-[1.1] mb-6">
            {item.title}
          </h3>
        </motion.div>

        <ScrollReveal delay={0.15}>
          <p className="font-sans text-base md:text-lg leading-relaxed text-text-muted mb-8 max-w-xl">
            {item.text}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <AnimatedLink
            href={item.href}
            className="font-serif text-sm uppercase tracking-[0.2em]"
          >
            {item.cta}
          </AnimatedLink>
        </ScrollReveal>
      </div>
    </section>
  );
}
