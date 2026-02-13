import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-text-secondary hover:bg-accent-primary/90 border border-accent-primary",
  outline:
    "border border-current bg-transparent hover:bg-text-primary hover:text-text-secondary",
  ghost: "bg-transparent hover:bg-text-primary/5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-8 py-3 font-serif text-sm uppercase tracking-[0.2em] transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
