"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const COOKIE_KEY = "pyneit_age_verified";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const t = useTranslations("ageGate");
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_KEY}=`));
    setVerified(cookie ? true : false);
  }, []);

  const handleVerify = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `${COOKIE_KEY}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    setVerified(true);
  };

  if (verified === null) return null;

  return (
    <>
      <AnimatePresence>
        {!verified && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-bg-dark/95 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
              className="text-center max-w-md"
            >
              <p className="font-serif text-2xl md:text-3xl text-text-secondary tracking-wide mb-4">
                {t("title")}
              </p>
              <p className="font-sans text-base text-text-muted mb-10">
                {t("text")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleVerify}>
                  {t("yes")}
                </Button>
                <Button
                  variant="outline"
                  className="text-text-secondary border-text-secondary/30 hover:bg-text-secondary hover:text-bg-dark"
                  onClick={() => window.history.back()}
                >
                  {t("no")}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {verified && children}
    </>
  );
}
