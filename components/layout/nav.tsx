"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    mass: 0.4,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  React.useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-[color:var(--color-surface)] border-b transition-all duration-300",
        scrolled
          ? "border-[color:var(--color-outline-soft)]/50 shadow-[var(--shadow-card)]"
          : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <a
          href="#top"
          className="font-serif text-xl italic text-[color:var(--color-ink)]"
        >
          Portfolio
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-caps text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-maroon-deep)] transition-colors relative group"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-[color:var(--color-maroon-deep)] origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex"
          >
            <Button variant="primary" size="sm">
              Resume
            </Button>
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[color:var(--color-card-soft)] transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute bottom-0 inset-x-0 h-[2px] origin-left bg-[color:var(--color-copper)]"
      />

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t border-[color:var(--color-outline-soft)]/50 glass"
        >
          <nav className="container-page flex flex-col gap-4 py-6">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-2xl text-[color:var(--color-ink)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2"
            >
              <Button variant="primary" size="md" className="w-full">
                Resume
              </Button>
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
