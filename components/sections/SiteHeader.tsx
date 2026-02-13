"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { OverlayMenu } from "@/components/sections/OverlayMenu";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasPassedHero, setHasPassedHero] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { isScrolled } = useScrollPosition();
  const t = useTranslations("nav");
  const showLogo = !isHomePage || hasPassedHero;
  const useSolidStyle = isHomePage ? hasPassedHero : isScrolled;

  useEffect(() => {
    if (!isHomePage) {
      setHasPassedHero(true);
      return;
    }

    setHasPassedHero(false);
    const hero = document.getElementById("home-hero");

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasPassedHero(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-88px 0px 0px 0px",
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHomePage, pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
          useSolidStyle
            ? "bg-bg-white/95 backdrop-blur-sm text-text-primary border-b border-text-muted/10"
            : "bg-transparent text-text-secondary"
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <LanguageSwitcher />

          <Link
            href="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2",
              showLogo ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            <Image
              src="/logo.svg"
              alt="Pyneit"
              width={100}
              height={60}
              className={cn(
                "h-10 md:h-12 w-auto transition-all duration-300 will-change-transform",
                showLogo
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3",
                useSolidStyle ? "brightness-0" : "brightness-0 invert"
              )}
              priority
            />
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="font-serif text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity duration-300"
            aria-label={t("menu")}
          >
            {t("menu")}
          </button>
        </div>
      </header>

      <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
