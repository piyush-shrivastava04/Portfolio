import { describe, expect, it } from "vitest";

import { siteConfig } from "./site";

describe("siteConfig", () => {
  it("lists Gen AI and Agentic AI as adjacent expertise skills", () => {
    const toolsGroup = siteConfig.expertise.groups.find(
      (group) => group.title === "Tools, Platforms & Analytics",
    );

    expect(toolsGroup).toBeDefined();
    expect(toolsGroup?.items).toContain("Gen AI");
    expect(toolsGroup?.items).toContain("Agentic AI");
    expect(toolsGroup?.items).not.toContain("GenAI Tools");

    const genAiIndex = toolsGroup!.items.indexOf("Gen AI");
    expect(toolsGroup!.items[genAiIndex + 1]).toBe("Agentic AI");
  });
});
