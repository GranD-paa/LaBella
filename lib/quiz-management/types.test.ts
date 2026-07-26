import { describe, expect, it } from "vitest";
import { normalizeAnswer, scoreWrittenAnswer, getSectionLabel, orderNumberToLevelSlug } from "./types";

describe("normalizeAnswer", () => {
  it("trims, lowercases, and collapses internal whitespace", () => {
    expect(normalizeAnswer("  Ciao   Bello  ")).toBe("ciao bello");
  });
});

describe("scoreWrittenAnswer", () => {
  it("matches regardless of case and surrounding whitespace", () => {
    expect(scoreWrittenAnswer("  CIAO  ", "ciao")).toBe(true);
  });

  it("returns false when expectedAnswer is null", () => {
    expect(scoreWrittenAnswer("anything", null)).toBe(false);
  });

  it("returns false on a real mismatch", () => {
    expect(scoreWrittenAnswer("ciao", "buongiorno")).toBe(false);
  });
});

describe("getSectionLabel", () => {
  it("returns the title for a known section slug", () => {
    expect(getSectionLabel("grammar")).toBe("Grammar");
  });

  it("falls back to the raw slug for an unknown section", () => {
    expect(getSectionLabel("unknown-section")).toBe("unknown-section");
  });
});

describe("orderNumberToLevelSlug", () => {
  it("builds an a1-N slug from the order number", () => {
    expect(orderNumberToLevelSlug(3)).toBe("a1-3");
  });
});
