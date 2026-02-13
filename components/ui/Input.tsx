import { cn } from "@/lib/cn";
import { type InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full border-b border-text-muted/30 bg-transparent px-0 py-3 text-base font-sans text-text-primary placeholder:text-text-muted/50 focus:border-text-primary focus:outline-none transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
