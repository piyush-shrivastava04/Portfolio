import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "elevated";
  gradient?: boolean;
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", gradient = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl p-8 transition-all duration-300",
          variant === "default" ? "glass" : "glass-elevated",
          gradient &&
            "bg-gradient-to-b from-white/70 to-[color:var(--color-maroon-deep)]/[0.04]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GlassCard.displayName = "GlassCard";
