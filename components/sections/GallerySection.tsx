"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface GallerySectionProps {
  title: string;
  images: { src: string; alt: string }[];
}

export function GallerySection({ title, images }: GallerySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      ref={containerRef}
      className="bg-bg-white text-text-primary py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <ScrollReveal>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide">
            {title}
          </h2>
        </ScrollReveal>
      </div>

      <motion.div style={{ x }} className="flex gap-6 px-6 md:px-12">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[70vw] md:w-[40vw] aspect-[3/2] overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
              sizes="(max-width: 768px) 70vw, 40vw"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
