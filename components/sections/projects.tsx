"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "#content";
import { SectionShell } from "@/components/primitives/section-shell";
import { Pill } from "@/components/primitives/pill";
import { GlassCard } from "@/components/primitives/glass-card";
import { fadeUp, stagger, cardHover } from "@/lib/motion";

export function Projects() {
  const items = [...products].sort((a, b) => a.order - b.order);

  return (
    <SectionShell id="projects" overline="The Work" title="Curated Case Studies">
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.08)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {items.map((p) => (
          <motion.li key={p.slug} variants={fadeUp}>
            <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={cardHover}>
              <GlassCard
                gradient
                className="h-full flex flex-col gap-5 p-6 lg:p-8 hover:shadow-[var(--shadow-copper-glow)] transition-shadow"
              >
                <CoverPanel
                  label={p.label}
                  title={p.title}
                  year={p.year}
                  empty={p.coverEmpty}
                  cover={p.cover}
                />
                <div className="flex items-center gap-3 text-[color:var(--color-ink-soft)]">
                  <span className="label-caps text-[color:var(--color-copper)]">
                    {p.label}
                  </span>
                  {p.industry && (
                    <>
                      <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-40" />
                      <span className="label-caps">{p.industry}</span>
                    </>
                  )}
                  {p.year && (
                    <>
                      <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-40" />
                      <span className="mono-data">{p.year}</span>
                    </>
                  )}
                </div>
                <h3 className="font-serif text-[length:var(--text-headline-md)] leading-[var(--text-headline-md--line-height)] text-balance">
                  {p.title}
                </h3>
                <p className="text-[color:var(--color-ink-soft)] text-justify hyphens-auto">
                  {p.summary}
                </p>
                {p.highlights && p.highlights.length > 0 && (
                  <ul className="flex flex-col gap-2 text-sm text-[color:var(--color-ink-soft)]">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="relative pl-5 before:content-['▸'] before:absolute before:left-0 before:top-0 before:text-[color:var(--color-copper)]"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {p.tools.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {p.tools.map((t) => (
                      <Pill key={t} tone="outline">
                        {t}
                      </Pill>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </SectionShell>
  );
}

// Decorative cover panel - used while we don't have project imagery yet.
function CoverPanel({
  label,
  title,
  year,
  empty,
  cover,
}: {
  label: string;
  title: string;
  year?: string;
  empty?: boolean;
  cover?: string;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[color:var(--color-maroon-deep)]">
      {cover ? (
        <Image
          src={cover}
          alt={`${label} — ${title}`}
          fill
          sizes="(min-width: 1024px) 32rem, (min-width: 768px) 45vw, 90vw"
          className="object-cover object-center"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 20% 10%, rgba(233,193,118,0.35), transparent 60%), radial-gradient(120% 80% at 90% 90%, rgba(204,114,109,0.25), transparent 55%)",
            }}
          />
          {!empty && (
            <div className="absolute inset-0 p-5 flex items-end">
              <div className="text-white/85">
                <p className="label-caps text-[color:var(--color-copper-dim)]">
                  {label}
                  {year ? ` · ${year}` : ""}
                </p>
                <p className="font-serif text-xl leading-tight mt-2 line-clamp-2 max-w-[18ch]">
                  {title}
                </p>
              </div>
            </div>
          )}
        </>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--color-copper)]/20 rounded-xl" />
    </div>
  );
}
