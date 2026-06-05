import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Strategy } from "./strategy";

type MotionElementProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  initial?: unknown;
  transition?: unknown;
  variants?: unknown;
  viewport?: unknown;
  whileInView?: unknown;
};

function motionProps<T extends HTMLElement>({ children, ...props }: MotionElementProps<T>) {
  const domProps = { ...props };

  delete domProps.initial;
  delete domProps.transition;
  delete domProps.variants;
  delete domProps.viewport;
  delete domProps.whileInView;

  return { children, domProps };
}

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: MotionElementProps<HTMLDivElement>) => {
      const { children, domProps } = motionProps(props);
      return <div {...domProps}>{children}</div>;
    },
    header: (props: MotionElementProps<HTMLElement>) => {
      const { children, domProps } = motionProps(props);
      return <header {...domProps}>{children}</header>;
    },
  },
  useReducedMotion: () => true,
}));

describe("Strategy", () => {
  it("uses consistent readable text alignment across viewport sizes", () => {
    render(<Strategy />);

    const mindset = screen.getByText(/Strong technical thinking/i).parentElement;
    const pillarSummary = screen.getByText(/Roadmap summary/i);

    expect(mindset).toHaveClass("text-left");
    expect(mindset).toHaveClass("lg:text-justify");
    expect(mindset).not.toHaveClass("text-justify");
    expect(pillarSummary).toHaveClass("text-left");
    expect(pillarSummary).toHaveClass("lg:text-justify");
    expect(pillarSummary).not.toHaveClass("text-justify");
  });
});
