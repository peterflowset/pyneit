import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark text-text-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          <div>
            <p className="font-serif text-2xl uppercase tracking-[0.3em] mb-4">
              Pyneit
            </p>
            <p className="font-sans text-sm text-text-muted leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div>
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-text-muted mb-6">
              {t("navigation")}
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/930", label: nav("wine") },
                { href: "/geschichte", label: nav("geschichte") },
                { href: "/philosophie", label: nav("philosophie") },
                { href: "/weingut", label: nav("weingut") },
                { href: "/kontakt", label: nav("kontakt") },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-sans text-sm text-text-muted hover:text-text-secondary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-serif text-sm uppercase tracking-[0.2em] text-text-muted mb-6">
              {t("legal")}
            </p>
            <nav className="flex flex-col gap-3">
              <Link
                href="/impressum"
                className="font-sans text-sm text-text-muted hover:text-text-secondary transition-colors duration-300"
              >
                {t("impressum")}
              </Link>
              <Link
                href="/datenschutz"
                className="font-sans text-sm text-text-muted hover:text-text-secondary transition-colors duration-300"
              >
                {t("datenschutz")}
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-text-muted/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="font-sans text-xs text-text-muted">
              {t("copyright", { year })}
            </p>
            <p className="font-sans text-xs text-text-muted">
              {t("ageNotice")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
