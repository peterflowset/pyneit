"use client";

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
}

export function TwoColsImageCta({ item }: TwoColsImageCtaProps) {
  return (
    <section className="bg-bg-white text-text-primary py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide leading-[1.1] mb-6">
            {item.title}
          </h3>
          <p className="font-sans text-base md:text-lg leading-relaxed text-text-muted mb-8 max-w-xl">
            {item.text}
          </p>
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
