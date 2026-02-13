import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PRODUCT_930 } from "@/lib/product";
import { ProductHero } from "@/components/sections/ProductHero";
import { TastingNotes } from "@/components/sections/TastingNotes";
import { VineyardDetail } from "@/components/sections/VineyardDetail";
import { ShopSection } from "@/components/sections/ShopSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { AgeGate } from "@/components/sections/AgeGate";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("wineTitle"),
    description: t("wineDescription"),
  };
}

export default function WinePage() {
  const t = useTranslations("wine");

  return (
    <>
      <ProductHero
        overline={t("hero.overline")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        details={[
          { label: t("hero.grape"), value: PRODUCT_930.grape },
          { label: t("hero.vintage"), value: String(PRODUCT_930.year) },
          { label: t("hero.altitude"), value: `${PRODUCT_930.altitude}m` },
        ]}
      />

      <TastingNotes
        title={t("tasting.title")}
        notes={[
          { title: t("tasting.eye"), text: t("tasting.eyeText") },
          { title: t("tasting.nose"), text: t("tasting.noseText") },
          { title: t("tasting.palate"), text: t("tasting.palateText") },
        ]}
        detailsTitle={t("tasting.details")}
        details={[
          { label: t("tasting.grapeLabel"), value: PRODUCT_930.grape },
          { label: t("tasting.alcoholLabel"), value: PRODUCT_930.alcohol },
          { label: t("tasting.agingLabel"), value: PRODUCT_930.aging },
          {
            label: t("tasting.altitudeLabel"),
            value: `${PRODUCT_930.altitude}m`,
          },
          { label: t("tasting.sizeLabel"), value: PRODUCT_930.bottleSize },
        ]}
      />

      <VineyardDetail
        title={t("vineyard.title")}
        text={t("vineyard.text")}
      />

      <AgeGate>
        <ShopSection />
      </AgeGate>

      <QuoteSection
        quote={t("winemakerQuote.quote")}
        author={t("winemakerQuote.author")}
        dark
      />
    </>
  );
}
