import { defineConfig, defineCollection, s } from "velite";

const hero = defineCollection({
  name: "Hero",
  pattern: "hero.mdx",
  single: true,
  schema: s
    .object({
      overline: s.string(),
      name: s.string(),
      bio: s.string(),
      primaryCta: s.object({ label: s.string(), href: s.string() }),
      secondaryCta: s.object({ label: s.string(), href: s.string() }),
      image: s.string().optional(),
      body: s.markdown(),
    })
    .strict(),
});

const strategy = defineCollection({
  name: "Strategy",
  pattern: "strategy.mdx",
  single: true,
  schema: s
    .object({
      overline: s.string(),
      title: s.string(),
      mindsetTitle: s.string(),
      pillars: s.array(s.string()),
      body: s.markdown(),
    })
    .strict(),
});

const pillarCards = defineCollection({
  name: "PillarCard",
  pattern: "pillars/*.mdx",
  schema: s
    .object({
      order: s.number(),
      label: s.string(),
      title: s.string(),
      icon: s.string(),
      summary: s.string(),
    })
    .strict(),
});

const jobs = defineCollection({
  name: "Job",
  pattern: "jobs/*.mdx",
  schema: s
    .object({
      order: s.number(),
      date: s.isodate(),
      title: s.string(),
      company: s.string(),
      companyUrl: s.string().url().optional(),
      location: s.string(),
      range: s.string(),
      employmentType: s.string().optional(),
      body: s.markdown(),
    })
    .strict()
    .transform((data, { meta }) => ({
      ...data,
      slug:
        meta.path
          .split(/[\\/]/)
          .pop()
          ?.replace(/\.mdx$/, "") ?? "",
    })),
});

const products = defineCollection({
  name: "Product",
  pattern: "products/**/*.mdx",
  schema: s
    .object({
      order: s.number(),
      title: s.string(),
      label: s.string(),
      cover: s.string().optional(),
      year: s.string().optional(),
      industry: s.string().optional(),
      tools: s.array(s.string()),
      summary: s.string(),
      highlights: s.array(s.string()).optional(),
      coverEmpty: s.boolean().optional(),
      body: s.markdown(),
    })
    .strict()
    .transform((data, { meta }) => ({
      ...data,
      slug:
        meta.path
          .split(/[\\/]/)
          .slice(-2, -1)[0]
          ?.replace(/\.mdx$/, "") ?? "",
    })),
});

const contact = defineCollection({
  name: "Contact",
  pattern: "contact.mdx",
  single: true,
  schema: s
    .object({
      overline: s.string(),
      title: s.string(),
      submitLabel: s.string(),
      body: s.markdown(),
    })
    .strict(),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: {
    hero,
    strategy,
    pillarCards,
    jobs,
    products,
    contact,
  },
});
