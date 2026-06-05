import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Contact } from "./contact";

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

describe("Contact", () => {
  it("keeps long contact details inside mobile width", () => {
    render(<Contact />);

    const body = screen.getByText(/Want to discuss/i);
    const email = screen.getByText("piyush2.shrivastava2017@gmail.com");

    expect(body.parentElement).toHaveClass("text-left");
    expect(body.parentElement).toHaveClass("lg:text-justify");
    expect(email).toHaveClass("min-w-0");
    expect(email).toHaveClass("flex-1");
    expect(email).toHaveClass("break-all");
  });
});
