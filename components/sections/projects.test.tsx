import * as React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Projects } from "./projects";

type MotionElementProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  initial?: unknown;
  transition?: unknown;
  variants?: unknown;
  viewport?: { amount?: number } | unknown;
  whileHover?: unknown;
  whileInView?: unknown;
};

function motionProps<T extends HTMLElement>({ children, ...props }: MotionElementProps<T>) {
  const domProps = { ...props };

  if (
    props.viewport &&
    typeof props.viewport === "object" &&
    "amount" in props.viewport &&
    typeof props.viewport.amount === "number"
  ) {
    domProps["data-viewport-amount" as keyof typeof domProps] = String(props.viewport.amount);
  }

  delete domProps.initial;
  delete domProps.transition;
  delete domProps.variants;
  delete domProps.viewport;
  delete domProps.whileHover;
  delete domProps.whileInView;

  return { children, domProps };
}

vi.mock("framer-motion", () => ({
  motion: {
    div: (props: MotionElementProps<HTMLDivElement>) => {
      const { children, domProps } = motionProps(props);
      return <div {...domProps}>{children}</div>;
    },
    li: (props: MotionElementProps<HTMLLIElement>) => {
      const { children, domProps } = motionProps(props);
      return <li {...domProps}>{children}</li>;
    },
    header: (props: MotionElementProps<HTMLElement>) => {
      const { children, domProps } = motionProps(props);
      return <header {...domProps}>{children}</header>;
    },
    ul: (props: MotionElementProps<HTMLUListElement>) => {
      const { children, domProps } = motionProps(props);
      return <ul {...domProps}>{children}</ul>;
    },
  },
  useReducedMotion: () => true,
}));

afterEach(() => {
  cleanup();
});

describe("Projects", () => {
  it("reveals the mobile case-study list as soon as the first cards enter view", () => {
    render(<Projects />);

    const curatedSection = screen
      .getByRole("heading", { name: "Curated Case Studies" })
      .closest("section");

    const projectGrid = within(curatedSection!)
      .getAllByRole("list")
      .find((list) => list.getAttribute("data-viewport-amount") !== null);

    expect(projectGrid).toHaveAttribute(
      "data-viewport-amount",
      "0.02",
    );
  });

  it("aligns project highlight bullets with the rest of the card copy", () => {
    render(<Projects />);

    const highlight = screen.getByText(/Reduced coordination effort/i);

    expect(highlight).toHaveClass("text-left");
    expect(highlight).toHaveClass("lg:text-justify");
    expect(highlight).not.toHaveClass("text-justify");
  });

  it("keeps B2B Procurement in curated case studies while adding the new section", () => {
    render(<Projects />);

    const curatedSection = screen
      .getByRole("heading", { name: "Curated Case Studies" })
      .closest("section");
    const additionalSection = screen
      .getByRole("heading", { name: "Additional builds" })
      .closest("section");

    expect(curatedSection).not.toBeNull();
    expect(additionalSection).not.toBeNull();

    expect(within(curatedSection!).queryByText("Capacity Supply Chain")).not.toBeInTheDocument();
    expect(within(curatedSection!).queryByText("Lemon Intelligence")).not.toBeInTheDocument();
    expect(
      within(curatedSection!).getAllByText("B2B Procurement SaaS Product").length,
    ).toBeGreaterThan(0);
    expect(within(curatedSection!).getAllByText("PVR INOX Advertising OS").length).toBeGreaterThan(
      0,
    );

    expect(within(additionalSection!).getAllByRole("listitem")).toHaveLength(3);
    expect(within(additionalSection!).getByRole("heading", { name: "Notify" })).toBeInTheDocument();
    expect(
      within(additionalSection!).getByText(/turns voice input into structured reminders/i),
    ).toBeInTheDocument();
    expect(
      within(additionalSection!).getByRole("heading", { name: "GTM Planner Skill" }),
    ).toBeInTheDocument();
    expect(
      within(additionalSection!).getByRole("heading", {
        name: "Business Strategy Planner Skill",
      }),
    ).toBeInTheDocument();

    expect(within(additionalSection!).queryByText("GitHub Build")).not.toBeInTheDocument();
    expect(within(additionalSection!).getByText("Productivity Tool")).toBeInTheDocument();
    expect(within(additionalSection!).queryByText("Next.js")).not.toBeInTheDocument();
    expect(within(additionalSection!).queryByText("GTM Strategy")).not.toBeInTheDocument();
    expect(within(additionalSection!).queryByText("Market Sizing")).not.toBeInTheDocument();

    const repoLinks = within(additionalSection!).getAllByRole("link", {
      name: /^view$/i,
    });
    expect(repoLinks).toHaveLength(3);
    expect(repoLinks[0]).toHaveAttribute("href", "https://github.com/piyush-shrivastava04/Notify");
    expect(repoLinks[1]).toHaveAttribute(
      "href",
      "https://github.com/piyush-shrivastava04/GTM-Planner-Skill",
    );
    expect(repoLinks[2]).toHaveAttribute(
      "href",
      "https://github.com/piyush-shrivastava04/Business-Strategy-Planner-Skill",
    );

    expect(
      within(additionalSection!).getByAltText(/ai productivity interface/i),
    ).toBeInTheDocument();
    expect(
      within(additionalSection!).getByAltText(/go-to-market planning dashboard/i),
    ).toBeInTheDocument();
    expect(
      within(additionalSection!).getByAltText(/business strategy workspace/i),
    ).toBeInTheDocument();

    expect(within(additionalSection!).queryByText("Lemon Intelligence")).not.toBeInTheDocument();
    expect(
      within(additionalSection!).queryByText("B2B Procurement SaaS Product"),
    ).not.toBeInTheDocument();
    expect(
      within(curatedSection!).getAllByText("B2B Procurement SaaS Product").length,
    ).toBeGreaterThan(0);
  });
});
