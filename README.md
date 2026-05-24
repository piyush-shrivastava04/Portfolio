# Portfolio V1 - Sovereign AI

Piyush Shrivastava's AI Product Management portfolio. Premium editorial design.

## Stack

- Next.js 16 (App Router, React 19)
- Tailwind CSS v4 (CSS-first `@theme`)
- TypeScript 5 (strict)
- Velite (MDX content with Zod schemas)
- Framer Motion
- next/font (Playfair Display, Sora, JetBrains Mono)

## Dev

```bash
pnpm install
pnpm dev          # velite + next dev on :3000
pnpm typecheck    # velite + tsc --noEmit
pnpm build        # production build
```

## Layout

- `app/` - App Router routes, layout, globals
- `components/layout/` - nav, footer, shell
- `components/primitives/` - GlassCard, Overline, Pill, etc
- `components/sections/` - page sections
- `content/` - MDX source (hero, about, contact, jobs, products, capabilities)
- `lib/` - site config, utils, motion presets
- `.velite/` - generated content + types (gitignored)
