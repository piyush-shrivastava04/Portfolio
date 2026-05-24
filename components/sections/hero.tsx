"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { hero } from "#content";
import { Overline } from "@/components/primitives/overline";
import { Button } from "@/components/ui/button";
import { easePortfolio } from "@/lib/motion";

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="container-page pt-12 lg:pt-24 pb-20 lg:pb-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: text */}
        <motion.div
          style={reduced ? undefined : { y: textY, opacity: textOpacity }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easePortfolio }}
          >
            <Overline align="left" className="!text-base tracking-[0.16em]">
              {hero.overline}
            </Overline>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easePortfolio }}
            className="font-serif text-[length:var(--text-display-mobile)] leading-[var(--text-display-mobile--line-height)] tracking-[var(--text-display-mobile--letter-spacing)] text-balance text-[color:var(--color-maroon)] lg:text-[length:var(--text-display-lg)] lg:leading-[var(--text-display-lg--line-height)] lg:tracking-[var(--text-display-lg--letter-spacing)]"
          >
            {hero.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easePortfolio }}
            className="max-w-xl text-[length:var(--text-body-lg)] leading-[var(--text-body-lg--line-height)] text-[color:var(--color-ink-soft)] text-justify hyphens-auto"
          >
            {hero.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easePortfolio }}
            className="mt-4 flex flex-wrap gap-4"
          >
            <a href={hero.primaryCta.href}>
              <Button variant="primary" size="lg">
                {hero.primaryCta.label}
              </Button>
            </a>
            <a href={hero.secondaryCta.href}>
              <Button variant="outline" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right: portrait with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easePortfolio }}
          className="lg:col-span-5 mx-auto w-full max-w-sm"
        >
          <motion.div
            style={reduced ? undefined : { y: portraitY, scale: portraitScale }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <Portrait />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Portrait() {
  return (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[var(--shadow-ambient)] bg-[color:var(--color-maroon-deep)]">
      <Image
        src="/piyush-portrait.png"
        alt="Piyush Shrivastava"
        fill
        priority
        sizes="(min-width: 1024px) 24rem, (min-width: 640px) 22rem, 90vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-[color:var(--color-copper)]/25 rounded-2xl pointer-events-none" />
    </div>
  );
}
