import Image, { type ImageProps } from "next/image";

const DEFAULT_QUALITY = 90;

export function OptimizedImage({ quality, ...props }: ImageProps) {
  return <Image quality={quality ?? DEFAULT_QUALITY} {...props} />;
}
