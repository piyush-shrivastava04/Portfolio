import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "./hero";

type MotionElementProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  animate?: unknown;
  initial?: unknown;
  style?: React.CSSProperties;
  transition?: unknown;
  whileHover?: unknown;
};

function motionProps<T extends HTMLElement>({ children, ...props }: MotionElementProps<T>) {
  const domProps = { ...props };

  delete domProps.animate;
  delete domProps.initial;
  delete domProps.transition;
  delete domProps.whileHover;

  return { children, domProps };
}

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: MotionElementProps<HTMLDivElement>) => {
      const { children, domProps } = motionProps(props);
      return <div {...domProps}>{children}</div>;
    },
    h1: (props: MotionElementProps<HTMLHeadingElement>) => {
      const { children, domProps } = motionProps(props);
      return <h1 {...domProps}>{children}</h1>;
    },
    p: (props: MotionElementProps<HTMLParagraphElement>) => {
      const { children, domProps } = motionProps(props);
      return <p {...domProps}>{children}</p>;
    },
  },
  useReducedMotion: () => true,
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: () => undefined,
}));

vi.mock("next/image", () => ({
  default: ({ alt, src, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  }) => {
    const imageProps = { ...props };

    delete imageProps.fill;
    delete imageProps.priority;
    delete imageProps.sizes;

    return React.createElement("img", {
      ...imageProps,
      alt,
      src: String(src),
    });
  },
}));

describe("Hero", () => {
  it("uses mobile-safe text flow and portrait sizing", () => {
    render(<Hero />);

    const bio = screen.getByText(/Product-focused Business Analyst/i);
    const portrait = screen.getByAltText("Piyush Shrivastava");
    const portraitWrapper = portrait.parentElement?.parentElement?.parentElement;

    expect(bio).toHaveClass("text-left");
    expect(bio).toHaveClass("lg:text-justify");
    expect(bio).not.toHaveClass("text-justify");
    expect(portraitWrapper).toHaveClass("max-w-[17rem]");
    expect(portraitWrapper).toHaveClass("sm:max-w-xs");
    expect(portraitWrapper).toHaveClass("lg:max-w-sm");
  });
});
