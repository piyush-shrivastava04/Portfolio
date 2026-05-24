import type { Variants, Transition } from "framer-motion";

export const easePortfolio: Transition["ease"] = [0.645, 0.045, 0.355, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePortfolio },
  },
};

export const stagger = (gap = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap } },
});

export const cardHover: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 22,
};
