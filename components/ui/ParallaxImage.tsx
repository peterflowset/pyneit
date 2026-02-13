"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  overlay?: "dark" | "light" | "none";
  scaleOnScroll?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
  imgClassName,
  priority = false,
  overlay = "none",
  scaleOnScroll = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, scale: scaleOnScroll ? scale : undefined }}
        className="absolute inset-[-20%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", imgClassName)}
          sizes="100vw"
          priority={priority}
        />
      </motion.div>
      {overlay === "dark" && <div className="absolute inset-0 bg-black/40" />}
      {overlay === "light" && <div className="absolute inset-0 bg-white/20" />}
    </div>
  );
}
