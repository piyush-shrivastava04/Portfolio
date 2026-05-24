import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full bg-transparent border-0 border-b border-[color:var(--color-maroon-deep)]/40 px-0 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-soft)]/60 focus:border-[color:var(--color-copper)] focus:outline-none transition-colors",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full bg-transparent border-0 border-b border-[color:var(--color-maroon-deep)]/40 px-0 py-3 text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-soft)]/60 focus:border-[color:var(--color-copper)] focus:outline-none transition-colors resize-none",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
