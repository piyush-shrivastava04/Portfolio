"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { jobs } from "#content";
import { SectionShell } from "@/components/primitives/section-shell";
import { cn } from "@/lib/utils";
import { easePortfolio } from "@/lib/motion";

export function Timeline() {
  const items = React.useMemo(
    () => [...jobs].sort((a, b) => a.order - b.order),
    [],
  );
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const total = items.length;
    let next = active;
    if (e.key === "ArrowDown") next = (active + 1) % total;
    else if (e.key === "ArrowUp") next = (active - 1 + total) % total;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const job = items[active];

  return (
    <SectionShell
      id="timeline"
      overline="The Journey"
      title="Architecting the future"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: easePortfolio }}
        className="mx-auto max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {/* Left rail - company tabs */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Career history"
            onKeyDown={onKeyDown}
            className="md:col-span-4 flex flex-row md:flex-col overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 gap-1 md:gap-0 md:border-l md:border-[color:var(--color-outline-soft)]/60"
          >
            {items.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.slug}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tl-tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls={`tl-panel-${item.slug}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative shrink-0 md:shrink whitespace-nowrap md:whitespace-normal text-left",
                    "font-mono text-sm tracking-wide transition-colors duration-200",
                    "px-4 md:px-5 py-3",
                    // mobile underline rail
                    "border-b-2 md:border-b-0 md:border-l-2",
                    selected
                      ? "border-[color:var(--color-maroon-deep)] bg-[color:var(--color-card-soft)] text-[color:var(--color-maroon-deep)] md:-ml-[2px]"
                      : "border-transparent text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-maroon-deep)] hover:bg-[color:var(--color-card-soft)]/60 md:-ml-[2px]",
                  )}
                >
                  {item.company}
                </button>
              );
            })}
          </div>

          {/* Right pane - active job */}
          <div className="md:col-span-8 min-h-[24rem]">
            <AnimatePresence mode="wait">
              <motion.article
                key={job.slug}
                id={`tl-panel-${job.slug}`}
                role="tabpanel"
                aria-labelledby={`tl-tab-${job.slug}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: easePortfolio }}
                className="md:pl-4"
              >
                <h3 className="font-serif text-[length:var(--text-headline-md)] leading-[var(--text-headline-md--line-height)] text-balance">
                  <span className="text-[color:var(--color-ink)]">
                    {job.title}
                  </span>
                  <span className="text-[color:var(--color-ink-soft)]"> @ </span>
                  <span className="italic text-[color:var(--color-maroon-deep)]">
                    {job.company}
                  </span>
                </h3>
                <p className="mono-data mt-2 text-[color:var(--color-ink-soft)]">
                  {job.range}
                  {job.employmentType && (
                    <>
                      <span className="mx-2 opacity-60">·</span>
                      {job.employmentType}
                    </>
                  )}
                  {job.location && (
                    <>
                      <span className="mx-2 opacity-60">·</span>
                      {job.location}
                    </>
                  )}
                </p>

                <div
                  className={cn(
                    "mt-6 text-[length:var(--text-body-md)] leading-[var(--text-body-md--line-height)] text-[color:var(--color-ink-soft)]",
                    // bullets with copper triangular markers
                    "[&_ul]:list-none [&_ul]:pl-0 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-4",
                    "[&_li]:relative [&_li]:pl-7 [&_li]:text-left [&_li]:text-pretty [&_li]:hyphens-auto lg:[&_li]:text-justify",
                    "[&_li]:before:content-['▸'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[1px] [&_li]:before:text-[color:var(--color-copper)] [&_li]:before:text-base",
                    "[&_strong]:text-[color:var(--color-maroon-deep)] [&_strong]:font-medium",
                  )}
                  dangerouslySetInnerHTML={{ __html: job.body }}
                />
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  );
}
