"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: "de" | "it") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={cn("flex items-center gap-2 font-serif text-sm uppercase tracking-[0.15em]", className)}>
      <button
        onClick={() => switchLocale("de")}
        className={cn(
          "transition-opacity duration-300",
          locale === "de" ? "opacity-100" : "opacity-40 hover:opacity-70"
        )}
      >
        DE
      </button>
      <span className="opacity-30">|</span>
      <button
        onClick={() => switchLocale("it")}
        className={cn(
          "transition-opacity duration-300",
          locale === "it" ? "opacity-100" : "opacity-40 hover:opacity-70"
        )}
      >
        IT
      </button>
    </div>
  );
}
