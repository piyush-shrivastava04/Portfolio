import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Pill } from "./pill";

describe("Pill", () => {
  it("centers wrapped label text inside the capsule", () => {
    render(<Pill>AI Research & Workflow Automation</Pill>);

    const pill = screen.getByText("AI Research & Workflow Automation");

    expect(pill).toHaveClass("items-center");
    expect(pill).toHaveClass("justify-center");
    expect(pill).toHaveClass("text-center");
  });
});
