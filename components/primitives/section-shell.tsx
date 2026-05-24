"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Overline } from "./overline";
import { easePortfolio } from "@/lib/motion";

type SectionShellProps = {
  id: string;
  overline?: string;
  title?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function SectionShell({
  id,
  overline,
  title,
  align = "center",
  className,
  containerClassName,
  children,
}: SectionShellProps) {
  const reduced = useReducedMotion();

  return (
    <section id={id} className={cn("section-y scroll-mt-24", className)}>
      <div className={cn("container-page", containerClassName)}>
        {(overline || title) && (
          <motion.header
            initial={reduced ? undefined : { opacity: 0, y: 32 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: easePortfolio }}
            className={cn(
              "mb-12 lg:mb-16 flex flex-col gap-4",
              align === "center" && "items-center text-center",
            )}
          >
            {overline && <Overline align={align}>{overline}</Overline>}
            {title && (
              <h2 className="font-serif text-[length:var(--text-display-mobile)] leading-[var(--text-display-mobile--line-height)] tracking-[var(--text-display-mobile--letter-spacing)] text-balance lg:text-[length:var(--text-headline-lg)] lg:leading-[var(--text-headline-lg--line-height)]">
                {title}
              </h2>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
