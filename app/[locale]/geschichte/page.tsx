import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { EditorialTextSection } from "@/components/sections/EditorialTextSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { QuoteSection } from "@/components/sections/QuoteSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("geschichteTitle"),
    description: t("geschichteDescription"),
  };
}

export default function GeschichtePage() {
  const t = useTranslations("geschichte");

  return (
    <>
      <HeroSection
        imageSrc="/images/hero-landscape.webp"
        imageAlt="Südtiroler Landschaft"
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        height="tall"
        priority
      />

      <EditorialTextSection text={t("intro.text")} />

      <TimelineSection
        chapters={[
          {
            title: t("timeline.chapter1Title"),
            text: t("timeline.chapter1Text"),
            imageSrc: "/images/terroir-soil.webp",
            imageAlt: "Kalkstein und Boden des Weinbergs",
          },
          {
            title: t("timeline.chapter2Title"),
            text: t("timeline.chapter2Text"),
            imageSrc: "/images/vineyard-closeup.webp",
            imageAlt: "Junge Reben im Weinberg",
          },
          {
            title: t("timeline.chapter3Title"),
            text: t("timeline.chapter3Text"),
            imageSrc: "/images/wine-cellar.webp",
            imageAlt: "Weinkeller mit Eichenfässern",
          },
        ]}
      />

      <QuoteSection
        quote={t("quote.text")}
        author={t("quote.author")}
        dark
      />
    </>
  );
}
