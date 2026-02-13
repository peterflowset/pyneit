import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductHeroProps {
  overline: string;
  title: string;
  subtitle: string;
  details: { label: string; value: string }[];
}

export function ProductHero({
  overline,
  title,
  subtitle,
  details,
}: ProductHeroProps) {
  return (
    <section className="bg-bg-dark text-text-secondary min-h-screen flex items-center pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <ScrollReveal>
            <div className="relative aspect-[2/3] max-w-md mx-auto">
              <Image
                src="/images/bottle-930-dark.webp"
                alt="Pyneit 930"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-text-muted mb-4">
              {overline}
            </p>
            <h1 className="font-serif text-7xl md:text-9xl tracking-wide mb-6">
              {title}
            </h1>
            <p className="font-sans text-base leading-relaxed text-text-muted max-w-md mb-12">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {details.map((d) => (
                <div key={d.label}>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-text-muted mb-1">
                    {d.label}
                  </p>
                  <p className="font-serif text-lg">{d.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
