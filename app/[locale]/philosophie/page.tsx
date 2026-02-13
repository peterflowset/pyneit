import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { EditorialTextSection } from "@/components/sections/EditorialTextSection";
import { ValuesSection } from "@/components/sections/ValuesSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("philosophieTitle"),
    description: t("philosophieDescription"),
  };
}

export default function PhilosophiePage() {
  const t = useTranslations("philosophie");

  return (
    <>
      <HeroSection
        imageSrc="/images/grapes-closeup.webp"
        imageAlt="Trauben am Rebstock"
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        height="tall"
        priority
      />

      <EditorialTextSection text={t("intro.text")} />

      <ValuesSection
        values={[
          {
            title: t("values.terroirTitle"),
            text: t("values.terroirText"),
            imageSrc: "/images/terroir-soil.webp",
            imageAlt: "Terroir — Kalksteinboden",
          },
          {
            title: t("values.sustainabilityTitle"),
            text: t("values.sustainabilityText"),
            imageSrc: "/images/vineyard-930m.webp",
            imageAlt: "Nachhaltiger Weinbau",
          },
          {
            title: t("values.craftTitle"),
            text: t("values.craftText"),
            imageSrc: "/images/winemaker-hands.webp",
            imageAlt: "Handwerk — Trauben von Hand gelesen",
          },
        ]}
      />
    </>
  );
}
