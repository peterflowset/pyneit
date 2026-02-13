"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { OverlayMenu } from "@/components/sections/OverlayMenu";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const t = useTranslations("nav");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
          isScrolled
            ? "bg-bg-white/95 backdrop-blur-sm text-text-primary border-b border-text-muted/10"
            : "bg-transparent text-text-secondary"
        )}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <LanguageSwitcher />

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/logo.svg"
              alt="Pyneit"
              width={100}
              height={60}
              className={cn(
                "h-10 md:h-12 w-auto transition-all duration-300 will-change-transform",
                isScrolled
                  ? "opacity-100 translate-y-0 brightness-0"
                  : "opacity-0 translate-y-3 brightness-0 invert pointer-events-none"
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
