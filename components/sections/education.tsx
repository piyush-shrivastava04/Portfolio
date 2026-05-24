import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { SectionShell } from "@/components/primitives/section-shell";
import { GlassCard } from "@/components/primitives/glass-card";
import { FadeIn } from "@/components/primitives/fade-in";

export function Education() {
  return (
    <SectionShell
      id="education"
      overline="The Foundation"
      title="Where the textbooks became the toolkit."
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left: degrees card */}
        <FadeIn className="md:col-span-7">
          <GlassCard variant="elevated" className="h-full p-8 lg:p-10">
            <h3 className="font-serif text-[length:var(--text-headline-md)] leading-[var(--text-headline-md--line-height)]">
              Academic Foundation
            </h3>

            <ul className="mt-8 divide-y divide-[color:var(--color-outline-soft)]/40">
              {siteConfig.education.map((entry) => (
                <li
                  key={entry.degree}
                  className="py-7 first:pt-0 last:pb-0"
                >
                  <p className="label-caps text-[color:var(--color-copper)]">
                    {entry.degree}
                  </p>
                  <p className="mt-2 font-medium text-[color:var(--color-ink)]">
                    {entry.field}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                    {entry.institution}
                  </p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </FadeIn>

        {/* Right: editorial photo */}
        <FadeIn className="md:col-span-5" delay={0.1}>
          <div className="relative h-full min-h-[280px] md:min-h-[360px] overflow-hidden rounded-2xl ring-1 ring-[color:var(--color-outline-soft)]/50">
            <Image
              src="/education.png"
              alt="The Foundation"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-center"
            />
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
}
