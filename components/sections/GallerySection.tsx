"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useMediaQuery } from "@/hooks/use-media-query";

interface GallerySectionProps {
  title: string;
  images: { src: string; alt: string }[];
}

function MobileCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);
  const intervalMs = 2500;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative w-full aspect-[3/2] overflow-hidden mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <OptimizedImage
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-cover"
            sizes="90vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-6"
                : "bg-white/50"
            }`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopParallax({ images }: { images: { src: string; alt: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-6 px-12">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[40vw] aspect-[3/2] overflow-hidden"
          >
            <OptimizedImage
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              sizes="40vw"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function GallerySection({ title, images }: GallerySectionProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section className="bg-bg-white text-text-primary py-28 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide">
            {title}
          </h2>
        </ScrollReveal>
      </div>

      <div className="px-6 md:px-0">
        {isDesktop ? (
          <DesktopParallax images={images} />
        ) : (
          <MobileCarousel images={images} />
        )}
      </div>
    </section>
  );
}
