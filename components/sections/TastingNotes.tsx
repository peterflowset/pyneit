import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface TastingNotesProps {
  title: string;
  notes: { title: string; text: string }[];
  details: { label: string; value: string }[];
  detailsTitle: string;
}

export function TastingNotes({
  title,
  notes,
  details,
  detailsTitle,
}: TastingNotesProps) {
  return (
    <section className="bg-bg-light text-text-primary py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-center mb-20">
            {title}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-24">
          {notes.map((note, i) => (
            <ScrollReveal key={note.title} delay={i * 0.1}>
              <div className="text-center">
                <h3 className="font-serif text-xl md:text-2xl tracking-wide mb-4">
                  {note.title}
                </h3>
                <div className="w-8 h-[1px] bg-accent-primary mx-auto mb-6" />
                <p className="font-sans text-sm leading-relaxed text-text-muted">
                  {note.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <h3 className="font-serif text-xl tracking-wide text-center mb-10">
              {detailsTitle}
            </h3>
            <div className="space-y-4">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex justify-between items-baseline border-b border-text-muted/10 pb-4"
                >
                  <span className="font-sans text-sm text-text-muted uppercase tracking-wider">
                    {d.label}
                  </span>
                  <span className="font-sans text-sm">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
