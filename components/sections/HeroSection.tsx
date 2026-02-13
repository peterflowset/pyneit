"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  id?: string;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  scrollLabel?: string;
  overlay?: "dark" | "light" | "none";
  height?: "full" | "tall" | "medium";
  priority?: boolean;
  showLogo?: boolean;
}

const heightClasses = {
  full: "h-screen",
  tall: "h-[85vh]",
  medium: "h-[60vh]",
};

export function HeroSection({
  id,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  scrollLabel,
  overlay = "dark",
  height = "full",
  priority = false,
  showLogo = false,
}: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.6]);

  const handleScrollDown = () => {
    const nextSection = ref.current?.nextElementSibling as HTMLElement | null;
    if (!nextSection) {
      return;
    }

    const headerOffset = 88;
    const targetTop =
      window.scrollY + nextSection.getBoundingClientRect().top - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
  };

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative overflow-hidden", heightClasses[height])}
    >
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.87, 0, 0.13, 1] }}
          className="h-full w-full"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority={priority}
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {overlay !== "none" && (
        <motion.div
          style={{ opacity: overlay === "dark" ? overlayOpacity : undefined }}
          className={cn(
            "absolute inset-0",
            overlay === "dark" && "bg-black",
            overlay === "light" && "bg-white/20"
          )}
        />
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-text-secondary px-6 will-change-transform"
      >
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.87, 0, 0.13, 1] }}
          >
            <Image
              src="/logo.svg"
              alt="Pyneit"
              width={200}
              height={120}
              className="h-24 md:h-32 lg:h-40 w-auto brightness-0 invert"
              priority
            />
          </motion.div>
        )}
        {title && (
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.87, 0, 0.13, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide"
          >
            {title}
          </motion.h1>
        )}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.87, 0, 0.13, 1] }}
            className="mt-6 font-sans text-base md:text-lg text-text-secondary/80 max-w-xl tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      {scrollLabel && (
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-8 left-6 md:left-12 z-10"
        >
          <button
            type="button"
            onClick={handleScrollDown}
            className="group flex items-center gap-3 text-text-secondary/60 hover:text-text-secondary transition-colors duration-300"
          >
            <span className="font-sans text-xs uppercase tracking-[0.2em]">
              {scrollLabel}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>
      )}
    </section>
  );
}
