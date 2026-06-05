"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { products } from "#content";
import { SectionShell } from "@/components/primitives/section-shell";
import { Pill } from "@/components/primitives/pill";
import { GlassCard } from "@/components/primitives/glass-card";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp, stagger, cardHover } from "@/lib/motion";

const hiddenCuratedSlugs = new Set(["01-supply-chain-os", "02-intelligence-os"]);

type Project = (typeof products)[number];
type AdditionalBuild = {
  slug: string;
  title: string;
  label: string;
  year?: string;
  image: string;
  imageAlt: string;
  summary: string;
  tools: string[];
  href?: string;
  ctaLabel?: string;
};
type ProjectMetaData = {
  label: string;
  year?: string;
  industry?: string;
};

const notifyBuild: AdditionalBuild = {
  slug: "notify",
  title: "Notify",
  label: "Productivity Tool",
  image: "/additional-notify-panel.png",
  imageAlt: "Abstract AI productivity interface with voice waves and reminder cards",
  summary:
    "AI-powered productivity app that turns voice input into structured reminders, tasks, notes, Google Calendar events, and WhatsApp reminder notifications.",
  tools: ["Next.js", "Fastify", "OpenAI"],
  href: "https://github.com/piyush-shrivastava04/Notify",
  ctaLabel: "View",
};

const gtmPlannerBuild: AdditionalBuild = {
  slug: "gtm-planner-skill",
  title: "GTM Planner Skill",
  label: "Claude Code Skill",
  image: "/additional-gtm-planner-panel.png",
  imageAlt: "Abstract go-to-market planning dashboard with funnel and launch timeline",
  summary:
    "Go-to-market planning skill that builds 90-day launch roadmaps, customer acquisition channel strategy, budget allocation, growth targets, and success metrics.",
  tools: ["GTM Strategy", "Roadmaps", "Metrics"],
  href: "https://github.com/piyush-shrivastava04/GTM-Planner-Skill",
  ctaLabel: "View",
};

const businessStrategyBuild: AdditionalBuild = {
  slug: "business-strategy-planner-skill",
  title: "Business Strategy Planner Skill",
  label: "Claude Code Skill",
  image: "/additional-business-strategy-panel.png",
  imageAlt: "Abstract business strategy workspace with matrix and planning charts",
  summary:
    "Business planning skill using an 8-phase framework for product concepts, personas, market sizing, revenue models, financial planning, and execution roadmaps.",
  tools: ["Strategy", "Market Sizing", "Planning"],
  href: "https://github.com/piyush-shrivastava04/Business-Strategy-Planner-Skill",
  ctaLabel: "View",
};

export function Projects() {
  const sortedProducts = [...products].sort((a, b) => a.order - b.order);
  const items = sortedProducts.filter((product) => !hiddenCuratedSlugs.has(product.slug));
  const additionalBuilds = [notifyBuild, gtmPlannerBuild, businessStrategyBuild];

  return (
    <>
      <SectionShell id="projects" overline="The Work" title="Curated Case Studies">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.02 }}
          variants={stagger(0.08)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {items.map((project) => (
            <motion.li key={project.slug} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </SectionShell>

      <SectionShell
        id="additional-builds"
        overline="More Work"
        title="Additional builds"
        className="pt-0"
      >
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger(0.08)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {additionalBuilds.map((project) => (
            <motion.li key={project.slug} variants={fadeUp}>
              <AdditionalBuildCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </SectionShell>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={cardHover}>
      <GlassCard
        gradient
        className="h-full flex flex-col gap-5 p-6 lg:p-8 hover:shadow-[var(--shadow-copper-glow)] transition-shadow"
      >
        <CoverPanel
          label={project.label}
          title={project.title}
          year={project.year}
          empty={project.coverEmpty}
          cover={project.cover}
        />
        <ProjectMeta project={project} />
        <h3 className="font-serif text-[length:var(--text-headline-md)] leading-[var(--text-headline-md--line-height)] text-balance">
          {project.title}
        </h3>
        <p className="text-left text-[color:var(--color-ink-soft)] text-pretty hyphens-auto lg:text-justify">
          {project.summary}
        </p>
        {project.highlights && project.highlights.length > 0 && (
          <ul className="flex flex-col gap-2 text-sm text-[color:var(--color-ink-soft)]">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="relative pl-5 text-left text-pretty hyphens-auto lg:text-justify before:content-['-'] before:absolute before:left-0 before:top-0 before:text-[color:var(--color-copper)]"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}
        <ProjectTools tools={project.tools} />
      </GlassCard>
    </motion.div>
  );
}

function AdditionalBuildCard({ project }: { project: AdditionalBuild }) {
  return (
    <motion.div whileHover={{ y: -3, scale: 1.01 }} transition={cardHover} className="h-full">
      <GlassCard
        gradient
        className="h-full flex flex-col gap-4 p-5 lg:p-6 hover:shadow-[var(--shadow-copper-glow)] transition-shadow"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[color:var(--color-maroon-deep)]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 30vw, 90vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--color-copper)]/20 rounded-lg" />
        </div>
        <ProjectMeta project={project} compact />
        <h3 className="font-serif text-2xl leading-tight text-balance">{project.title}</h3>
        <p className="text-left text-sm leading-6 text-[color:var(--color-ink-soft)] text-pretty hyphens-auto lg:text-justify">
          {project.summary}
        </p>
        {project.href && project.ctaLabel && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "mt-auto self-start",
            })}
          >
            {project.ctaLabel}
            <ExternalLink size={14} strokeWidth={2} />
          </a>
        )}
      </GlassCard>
    </motion.div>
  );
}

function ProjectMeta({
  project,
  compact = false,
}: {
  project: ProjectMetaData;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[color:var(--color-ink-soft)]">
      <span className="label-caps text-[color:var(--color-copper)]">{project.label}</span>
      {!compact && project.industry && (
        <>
          <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-40" />
          <span className="label-caps">{project.industry}</span>
        </>
      )}
      {project.year && (
        <>
          <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-40" />
          <span className="mono-data">{project.year}</span>
        </>
      )}
    </div>
  );
}

function ProjectTools({
  tools,
  compact = false,
}: {
  tools: Project["tools"];
  compact?: boolean;
}) {
  if (tools.length === 0) return null;

  const visibleTools = compact ? tools.slice(0, 3) : tools;

  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-2">
      {visibleTools.map((tool) => (
        <Pill key={tool} tone="outline">
          {tool}
        </Pill>
      ))}
    </div>
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
          alt={`${label} - ${title}`}
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
                  {year ? ` - ${year}` : ""}
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
