"use client";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function AnimatedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block",
        "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-100 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.87,0,0.13,1)]",
        "hover:after:origin-right hover:after:scale-x-0",
        className
      )}
    >
      {children}
    </Link>
  );
}
