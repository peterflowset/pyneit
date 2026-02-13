import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Check } from "lucide-react";

export default function CheckoutSuccessPage() {
  const t = useTranslations("checkout.success");

  return (
    <section className="min-h-screen flex items-center justify-center bg-bg-light text-text-primary px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-accent-primary/10 flex items-center justify-center mx-auto mb-8">
          <Check className="w-8 h-8 text-accent-primary" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl tracking-wide mb-4">
          {t("title")}
        </h1>
        <p className="font-sans text-base text-text-muted mb-10 leading-relaxed">
          {t("text")}
        </p>
        <Link
          href="/"
          className="font-serif text-sm uppercase tracking-[0.2em] border-b border-text-primary pb-1 hover:border-transparent transition-colors duration-300"
        >
          {t("backHome")}
        </Link>
      </div>
    </section>
  );
}
