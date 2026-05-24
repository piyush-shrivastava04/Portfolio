import { contact } from "#content";
import { siteConfig } from "@/lib/site";
import { SectionShell } from "@/components/primitives/section-shell";
import { FadeIn, FadeChild } from "@/components/primitives/fade-in";
import { stagger } from "@/lib/motion";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <SectionShell id="contact" overline={contact.overline} title={contact.title}>
      <FadeIn
        variants={stagger(0.12)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
      >
        <FadeChild className="lg:col-span-5 flex flex-col gap-6">
          <div
            className="prose max-w-none text-[color:var(--color-ink-soft)] text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-justify hyphens-auto"
            dangerouslySetInnerHTML={{ __html: contact.body }}
          />
          <div className="flex flex-col gap-3 mt-2">
            <Detail label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
            <Detail label="Based in" value={siteConfig.location} />
            <Detail label="LinkedIn" value="@piyush-shrivastava" href={siteConfig.socials.linkedin} />
          </div>
        </FadeChild>
        <FadeChild className="lg:col-span-7">
          <ContactForm submitLabel={contact.submitLabel} />
        </FadeChild>
      </FadeIn>
    </SectionShell>
  );
}

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="label-caps text-[color:var(--color-ink-soft)]/70 w-20 shrink-0">
        {label}
      </span>
      <span className="text-[color:var(--color-ink)]">{value}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="flex items-baseline gap-4 group hover:text-[color:var(--color-copper)] transition-colors"
    >
      {inner}
    </a>
  ) : (
    <div className="flex items-baseline gap-4">{inner}</div>
  );
}
