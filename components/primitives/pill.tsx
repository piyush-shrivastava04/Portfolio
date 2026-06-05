import * as React from "react";
import { cn } from "@/lib/utils";

export function Pill({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: "default" | "filled" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-caps inline-flex max-w-full items-center justify-center rounded-full px-3 py-1.5 text-center transition-colors",
        tone === "default" &&
          "bg-[#f9f7f5] border border-[color:var(--color-maroon-deep)]/15 text-[color:var(--color-maroon-deep)]",
        tone === "filled" &&
          "bg-[color:var(--color-secondary-soft)] text-[color:var(--color-maroon-deep)]",
        tone === "outline" &&
          "border border-[color:var(--color-outline)] text-[color:var(--color-ink-soft)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
