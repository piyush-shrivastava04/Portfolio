import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Timeline } from "./timeline";

type MotionElementProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  animate?: unknown;
  exit?: unknown;
  initial?: unknown;
  transition?: unknown;
  viewport?: unknown;
  whileInView?: unknown;
};

function motionProps<T extends HTMLElement>({ children, ...props }: MotionElementProps<T>) {
  const domProps = { ...props };

  delete domProps.animate;
  delete domProps.exit;
  delete domProps.initial;
  delete domProps.transition;
  delete domProps.viewport;
  delete domProps.whileInView;

  return { children, domProps };
}

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    article: (props: MotionElementProps<HTMLElement>) => {
      const { children, domProps } = motionProps(props);
      return <article {...domProps}>{children}</article>;
    },
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

describe("Timeline", () => {
  it("keeps career bullets readable on mobile and justified on desktop", () => {
    render(<Timeline />);

    const bullet = screen.getByText(/Delivered product outcomes/i);
    const copyWrapper = bullet.closest("div");
    const classTokens = copyWrapper?.className.split(/\s+/) ?? [];

    expect(classTokens).toContain("[&_li]:text-left");
    expect(classTokens).toContain("lg:[&_li]:text-justify");
    expect(classTokens).not.toContain("[&_li]:text-justify");
  });
});
