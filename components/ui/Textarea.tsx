import { cn } from "@/lib/cn";
import { type TextareaHTMLAttributes, forwardRef } from "react";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full border-b border-text-muted/30 bg-transparent px-0 py-3 text-base font-sans text-text-primary placeholder:text-text-muted/50 focus:border-text-primary focus:outline-none transition-colors duration-300 resize-none min-h-[120px]",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
