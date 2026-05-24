import * as React from "react";
import { cn } from "@/lib/utils";

export function Overline({
  children,
  align = "center",
  tone = "copper",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  tone?: "copper" | "ink" | "maroon";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "label-caps",
        align === "center" && "text-center",
        tone === "copper" && "text-[color:var(--color-copper)]",
        tone === "ink" && "text-[color:var(--color-ink-soft)]",
        tone === "maroon" && "text-[color:var(--color-maroon-deep)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
