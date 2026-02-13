import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { WineTeaser } from "@/components/sections/WineTeaser";
import { VideoSection } from "@/components/sections/VideoSection";
import { TwoColsImageCta } from "@/components/sections/TwoColsImageCta";
import { PlaceTeaser } from "@/components/sections/PlaceTeaser";
import { ParallaxDivider } from "@/components/sections/ParallaxDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      <HeroSection
        imageSrc="/images/hero-vineyard.webp"
        imageAlt={t("heroAlt")}
        scrollLabel={t("scrollDown")}
        showLogo
        priority
      />

      <QuoteSection
        quote={t("introQuote")}
        author={t("introQuoteAuthor")}
        dark
      />

      <ParallaxDivider
        imageSrc="/images/grapes-closeup.webp"
        imageAlt="Trauben im Detail"
        height="short"
        overlay="dark"
      />

      <WineTeaser
        overline={t("wineTeaser.overline")}
        title={t("wineTeaser.title")}
        description={t("wineTeaser.description")}
        cta={t("wineTeaser.cta")}
      />

      <ParallaxDivider
        imageSrc="/images/wine-cellar.webp"
        imageAlt="Weinkeller"
        height="medium"
        overlay="dark"
      />

      <VideoSection
        overline={t("videoSection.overline")}
        title={t("videoSection.title")}
      />

      <TwoColsImageCta
        left={{
          imageSrc: "/images/vineyard-closeup.webp",
          imageAlt: "Weinberge in Südtirol",
          title: t("storyTeaser.geschichteTitle"),
          text: t("storyTeaser.geschichteText"),
          href: "/geschichte",
          cta: t("storyTeaser.cta"),
        }}
        right={{
          imageSrc: "/images/winemaker-portrait.webp",
          imageAlt: "Winzer bei der Arbeit",
          title: t("storyTeaser.philosophieTitle"),
          text: t("storyTeaser.philosophieText"),
          href: "/philosophie",
          cta: t("storyTeaser.cta"),
        }}
      />

      <PlaceTeaser
        overline={t("placeTeaser.overline")}
        title={t("placeTeaser.title")}
        text={t("placeTeaser.text")}
        cta={t("placeTeaser.cta")}
      />
    </>
  );
}
