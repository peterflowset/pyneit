"use client";

import { useState } from "react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Minus, Plus, Wine } from "lucide-react";

export function ShopSection() {
  const t = useTranslations("wine.shop");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <section className="bg-bg-light text-text-primary py-28 md:py-40" id="shop">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <ScrollReveal>
            <div className="relative aspect-square max-w-md mx-auto">
              <OptimizedImage
                src="/images/bottle-packaging.webp"
                alt="Pyneit 930 Flasche und Verpackung"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wide mb-10">
              {t("title")}
            </h2>

            <p className="font-sans text-sm uppercase tracking-wider text-text-muted mb-2">
              {t("priceLabel")}
            </p>
            <p className="font-serif text-3xl mb-10">€ 120,00</p>

            <div className="mb-8">
              <p className="font-sans text-sm uppercase tracking-wider text-text-muted mb-4">
                {t("quantity")}
              </p>
              <div className="inline-flex items-center border border-text-muted/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-text-primary/5 transition-colors"
                  aria-label="Weniger"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-sans text-base min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-text-primary/5 transition-colors"
                  aria-label="Mehr"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full md:w-auto mb-8"
            >
              <Wine className="w-4 h-4 mr-3" />
              {loading ? t("buying") : t("buyButton")}
            </Button>

            <div className="space-y-2">
              <p className="font-sans text-xs text-text-muted">
                {t("shipping")}
              </p>
              <p className="font-sans text-xs text-text-muted">
                {t("shippingNote")}
              </p>
              <p className="font-sans text-xs text-accent-primary">
                {t("ageNotice")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
