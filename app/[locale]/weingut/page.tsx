import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { EditorialTextSection } from "@/components/sections/EditorialTextSection";
import { GallerySection } from "@/components/sections/GallerySection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("weingutTitle"),
    description: t("weingutDescription"),
  };
}

export default function WeingutPage() {
  const t = useTranslations("weingut");

  return (
    <>
      <HeroSection
        imageSrc="/images/suedtirol-panorama.webp"
        imageAlt="Südtiroler Alpenlandschaft mit Weinbergen"
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        overlay="none"
        height="compact"
        priority
      />

      <EditorialTextSection text={t("location.text")} />

      <GallerySection
        title={t("galleryTitle")}
        images={[
          { src: "/images/vineyard-closeup.webp", alt: "Weinreben im Herbstlicht" },
          { src: "/images/wine-cellar.webp", alt: "Weinkeller" },
          { src: "/images/vineyard-930m.webp", alt: "Weinberg auf 930m" },
          { src: "/images/grapes-closeup.webp", alt: "Trauben am Rebstock" },
          {
            src: "/images/suedtirol-panorama.webp",
            alt: "Südtiroler Panorama",
          },
        ]}
      />
    </>
  );
}
