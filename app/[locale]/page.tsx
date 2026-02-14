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
        id="home-hero"
        imageSrc="/images/mountain-view.webp"
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

      <TwoColsImageCta
        item={{
          title: t("storyTeaser.geschichteTitle"),
          text: t("storyTeaser.geschichteText"),
          href: "/geschichte",
          cta: t("storyTeaser.cta"),
        }}
      />

      <VideoSection
        overline={t("videoSection.overline")}
        title={t("videoSection.title")}
      />

      <TwoColsImageCta
        item={{
          title: t("storyTeaser.philosophieTitle"),
          text: t("storyTeaser.philosophieText"),
          href: "/philosophie",
          cta: t("storyTeaser.cta"),
        }}
        slideFrom="right"
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
