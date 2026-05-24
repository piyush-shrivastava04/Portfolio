import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { strategy, pillarCards } from "#content";
import { siteConfig } from "@/lib/site";
import { SectionShell } from "@/components/primitives/section-shell";
import { GlassCard } from "@/components/primitives/glass-card";
import { Pill } from "@/components/primitives/pill";
import { FadeIn, FadeChild } from "@/components/primitives/fade-in";

export function Strategy() {
  const cards = [...pillarCards].sort((a, b) => a.order - b.order);

  return (
    <SectionShell id="strategy" overline={strategy.overline} title={strategy.title}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Mindset card */}
        <FadeIn className="lg:col-span-7" delay={0}>
          <GlassCard variant="elevated" className="h-full relative overflow-hidden">
            <Icons.Network
              aria-hidden
              className="pointer-events-none absolute -right-8 -bottom-8 h-48 w-48 text-[color:var(--color-maroon-deep)] opacity-[0.05]"
              strokeWidth={1}
            />
            <Icons.Compass
              aria-hidden
              className="h-7 w-7 text-[color:var(--color-maroon-deep)] mb-6"
              strokeWidth={1.5}
            />
            <h3 className="font-serif text-[length:var(--text-headline-md)] leading-[var(--text-headline-md--line-height)] mb-4 text-balance">
              {strategy.mindsetTitle}
            </h3>
            <div
              className="prose prose-sm max-w-none text-[color:var(--color-ink-soft)] text-justify hyphens-auto [&_p]:leading-relaxed [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: strategy.body }}
            />
            <ul className="mt-6 flex flex-col gap-2.5">
              {strategy.pillars.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 text-[color:var(--color-ink)] text-sm"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-maroon-deep)]"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </GlassCard>
        </FadeIn>

        {/* Pillar cards column */}
        <FadeIn
          className="lg:col-span-5 flex flex-col gap-4"
          staggerChildren={0.08}
        >
          {cards.map((card) => {
            const Icon = (Icons[card.icon as keyof typeof Icons] ??
              Icons.Sparkles) as LucideIcon;
            return (
              <FadeChild key={card.label}>
                <GlassCard className="flex items-start gap-4 p-6">
                  <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--color-maroon-deep)] text-white">
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="label-caps text-[color:var(--color-maroon-deep)]">
                      {card.label}
                    </p>
                    <p className="mt-2 text-[color:var(--color-ink-soft)] text-sm leading-relaxed text-justify hyphens-auto">
                      {card.summary}
                    </p>
                  </div>
                </GlassCard>
              </FadeChild>
            );
          })}
        </FadeIn>
      </div>

      {/* Product & AI Expertise */}
      <div className="mt-20 lg:mt-28">
        <p className="label-caps text-center text-[color:var(--color-ink)] !text-2xl !font-bold tracking-[0.14em] mb-12">
          {siteConfig.expertise.heading}
        </p>
        <div className="flex flex-col gap-6 lg:gap-8">
          {siteConfig.expertise.groups.map((group) => (
            <GlassCard key={group.title} className="p-6 lg:p-8">
              <p className="label-caps text-center text-[color:var(--color-copper)] mb-5">
                {group.title}
              </p>
              <FadeIn
                className="flex flex-wrap justify-center gap-2.5"
                staggerChildren={0.02}
              >
                {group.items.map((item) => (
                  <FadeChild key={item}>
                    <Pill>{item}</Pill>
                  </FadeChild>
                ))}
              </FadeIn>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
