# Piyush Shrivastava Portfolio

A personal portfolio, focused on AI product management, business analysis, SaaS delivery, and selected product case studies.

Built with Next.js, Tailwind CSS, and MDX content so the portfolio can be updated mostly through files in `content/`.

## Stack

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS v4
- Velite + MDX
- Framer Motion
- EmailJS
- Vitest + Testing Library

## Getting Started

```bash
pnpm install
pnpm dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Environment

Copy the example env file and add EmailJS values if you want the contact form to send messages.

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Scripts

```bash
pnpm dev        # generate content and start dev server
pnpm build      # production build
pnpm start      # start production server
pnpm lint       # run eslint
pnpm test       # run tests
pnpm typecheck  # generate content and run TypeScript
pnpm format     # format source files
```

## Structure

```text
app/          Next.js app routes and global styles
components/   Layout, section, primitive, and UI components
content/      MDX content for hero, strategy, projects, jobs, and contact
lib/          Site config, utilities, and motion presets
public/       Images, resume, and static assets
test/         Test fixtures
```

