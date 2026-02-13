import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ContactForm } from "@/components/sections/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MapPin, Phone, Mail } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("kontaktTitle"),
    description: t("kontaktDescription"),
  };
}

export default function KontaktPage() {
  const t = useTranslations("kontakt");

  return (
    <>
      <HeroSection
        imageSrc="/images/vineyard-930m.webp"
        imageAlt="Weinberg"
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        height="medium"
        priority
      />

      <ContactForm />

      <section className="bg-bg-white text-text-primary py-28 md:py-40">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl tracking-wide mb-12 text-center">
              {t("address.title")}
            </h2>
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-4 h-4 text-text-muted flex-shrink-0" />
                <div className="font-sans text-sm text-text-muted">
                  <p>{t("address.company")}</p>
                  <p>{t("address.street")}</p>
                  <p>{t("address.city")}</p>
                  <p>{t("address.country")}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-4 h-4 text-text-muted flex-shrink-0" />
                <a
                  href={`tel:${t("address.phone")}`}
                  className="font-sans text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  {t("address.phone")}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-4 h-4 text-text-muted flex-shrink-0" />
                <a
                  href={`mailto:${t("address.email")}`}
                  className="font-sans text-sm text-text-muted hover:text-text-primary transition-colors"
                >
                  {t("address.email")}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
