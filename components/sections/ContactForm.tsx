"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { submitContact, type ContactState } from "@/app/[locale]/kontakt/action";

const initialState: ContactState = { success: false, error: null };

export function ContactForm() {
  const t = useTranslations("kontakt.form");
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <section className="bg-bg-light text-text-primary py-28 md:py-40">
      <div className="max-w-2xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          {state.success ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl tracking-wide">{t("success")}</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-8">
              <div>
                <label htmlFor="name" className="sr-only">
                  {t("name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t("name")}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  {t("email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="sr-only">
                  {t("subject")}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t("subject")}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  {t("message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("message")}
                  required
                />
              </div>

              {state.error && (
                <p className="font-sans text-sm text-accent-primary">
                  {t("error")}
                </p>
              )}

              <Button type="submit" disabled={isPending}>
                {isPending ? t("sending") : t("send")}
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
