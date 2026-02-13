import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface VideoSectionProps {
  overline?: string;
  title: string;
}

export function VideoSection({ overline, title }: VideoSectionProps) {
  return (
    <section className="bg-bg-dark text-text-secondary py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            {overline && (
              <p className="font-sans text-xs uppercase tracking-[0.3em] text-text-muted mb-4">
                {overline}
              </p>
            )}
            <h2 className="font-serif text-3xl md:text-5xl tracking-wide">
              {title}
            </h2>
          </div>
          <div className="relative aspect-video bg-bg-dark/50 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster="/images/video-poster.webp"
            >
              <source src="/videos/winemaking.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
