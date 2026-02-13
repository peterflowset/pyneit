"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const menuItems = [
  { href: "/930", labelKey: "wine", subtitleKey: "wineSubtitle" },
  { href: "/geschichte", labelKey: "geschichte", subtitleKey: "geschichteSubtitle" },
  { href: "/philosophie", labelKey: "philosophie", subtitleKey: "philosophieSubtitle" },
  { href: "/weingut", labelKey: "weingut", subtitleKey: "weingutSubtitle" },
  { href: "/kontakt", labelKey: "kontakt", subtitleKey: undefined },
] as const;

export function OverlayMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={onClose}
          />

          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full md:w-[480px] bg-bg-dark text-text-secondary flex flex-col"
          >
            <div className="flex justify-end px-6 md:px-12 py-5">
              <button
                onClick={onClose}
                className="font-serif text-sm uppercase tracking-[0.15em] text-text-muted hover:text-text-secondary transition-colors duration-300"
              >
                {t("close")}
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-12 md:px-16 gap-10">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.5,
                    ease: [0.87, 0, 0.13, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group block"
                  >
                    <span className="block font-serif text-4xl md:text-5xl tracking-wide group-hover:text-accent-secondary transition-colors duration-500">
                      {t(item.labelKey)}
                    </span>
                    {item.subtitleKey && (
                      <span className="block mt-1 font-sans text-sm text-text-muted tracking-wider uppercase">
                        {t(item.subtitleKey)}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="px-12 md:px-16 py-10">
              <p className="font-sans text-xs text-text-muted tracking-wider uppercase">
                Pyneit — Wein aus Südtirol
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
