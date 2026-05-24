import { siteConfig } from "@/lib/site";
import { FadeIn } from "@/components/primitives/fade-in";

export function Footer() {
  const links: Array<{ label: string; href: string; external?: boolean }> = [
    { label: "LinkedIn", href: siteConfig.socials.linkedin, external: true },
    { label: "GitHub", href: siteConfig.socials.github, external: true },
    { label: "Email", href: `mailto:${siteConfig.email}` },
    { label: "Resume", href: siteConfig.resume, external: true },
  ];

  return (
    <footer className="border-t border-[color:var(--color-outline-soft)]/40 mt-24">
      <FadeIn className="container-page py-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-lg italic text-[color:var(--color-ink)]">
            Portfolio
          </p>
          <p className="label-caps mt-2 text-[color:var(--color-ink-soft)]">
            © {siteConfig.name}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="label-caps text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-copper)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </footer>
  );
}
