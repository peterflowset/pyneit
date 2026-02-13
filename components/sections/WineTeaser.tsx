import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedLink } from "@/components/ui/AnimatedLink";

interface WineTeaserProps {
  overline: string;
  title: string;
  description: string;
  cta: string;
}

export function WineTeaser({
  overline,
  title,
  description,
  cta,
}: WineTeaserProps) {
  return (
    <section className="bg-bg-light text-text-primary py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <ScrollReveal>
            <div className="relative aspect-[2/3] max-w-sm mx-auto md:mx-0 overflow-hidden">
              <Image
                src="/images/bottle-930-dark.webp"
                alt="Pyneit 930 Weinflasche"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-text-muted mb-4">
              {overline}
            </p>
            <h2 className="font-serif text-6xl md:text-8xl tracking-wide mb-6">
              {title}
            </h2>
            <p className="font-sans text-base leading-relaxed text-text-muted max-w-md mb-10">
              {description}
            </p>
            <AnimatedLink
              href="/930"
              className="font-serif text-sm uppercase tracking-[0.2em]"
            >
              {cta}
            </AnimatedLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
