import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/cn";

interface EditorialTextSectionProps {
  text: string;
  overline?: string;
  dark?: boolean;
}

export function EditorialTextSection({
  text,
  overline,
  dark = false,
}: EditorialTextSectionProps) {
  return (
    <section
      className={cn(
        "py-28 md:py-40",
        dark ? "bg-bg-dark text-text-secondary" : "bg-bg-light text-text-primary"
      )}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <ScrollReveal>
          {overline && (
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-text-muted mb-8">
              {overline}
            </p>
          )}
          <p className="font-sans text-lg md:text-xl leading-relaxed text-text-muted">
            {text}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
