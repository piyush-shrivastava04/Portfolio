import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-[var(--ease-portfolio)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-copper)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-maroon-deep)] text-white shadow-[var(--shadow-card)] hover:bg-[color:var(--color-copper)] hover:shadow-[var(--shadow-copper-glow)] hover:scale-[1.02] active:scale-[0.99]",
        outline:
          "border border-[color:var(--color-maroon-deep)] text-[color:var(--color-maroon-deep)] bg-transparent hover:bg-[color:var(--color-maroon-deep)] hover:text-white hover:scale-[1.02]",
        ghost:
          "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-maroon-deep)]",
        link: "text-[color:var(--color-maroon-deep)] underline-offset-4 hover:underline hover:text-[color:var(--color-copper)]",
      },
      size: {
        sm: "label-caps h-9 rounded-full px-4",
        md: "label-caps h-11 rounded-full px-6",
        lg: "label-caps h-12 rounded-full px-10 py-4 tracking-[0.1em]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
