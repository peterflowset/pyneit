import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface TimelineChapter {
  title: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
}

interface TimelineSectionProps {
  chapters: TimelineChapter[];
}

export function TimelineSection({ chapters }: TimelineSectionProps) {
  return (
    <section className="bg-bg-white text-text-primary py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="space-y-32 md:space-y-40">
          {chapters.map((chapter, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
              >
                <ScrollReveal
                  className={isEven ? "md:order-1" : "md:order-2"}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={chapter.imageSrc}
                      alt={chapter.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  delay={0.2}
                  className={isEven ? "md:order-2" : "md:order-1"}
                >
                  <h3 className="font-serif text-2xl md:text-4xl tracking-wide mb-6">
                    {chapter.title}
                  </h3>
                  <p className="font-sans text-base leading-relaxed text-text-muted">
                    {chapter.text}
                  </p>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
