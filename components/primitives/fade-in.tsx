"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

type FadeInProps = Omit<HTMLMotionProps<"div">, "variants" | "children"> & {
  delay?: number;
  variants?: Variants;
  staggerChildren?: number;
  once?: boolean;
  children?: React.ReactNode;
};

export function FadeIn({
  delay = 0,
  variants,
  staggerChildren,
  once = true,
  className,
  children,
  ...props
}: FadeInProps) {
  const reduced = useReducedMotion();
  const resolved = variants ?? (staggerChildren ? stagger(staggerChildren) : fadeUp);
  if (reduced) {
    return (
      <div className={typeof className === "string" ? className : undefined}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
      variants={resolved}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeChild(props: HTMLMotionProps<"div">) {
  return <motion.div variants={fadeUp} {...props} />;
}
