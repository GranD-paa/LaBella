import { describe, expect, it } from "vitest";

import { slugifyTitle } from "@/lib/blog/types";

describe("slugifyTitle", () => {
  it("keeps an English slug exactly as it is", () => {
    expect(slugifyTitle("italian-definite-articles-il-lo-la")).toBe(
      "italian-definite-articles-il-lo-la"
    );
  });

  it("lowercases, and turns spaces and underscores into single hyphens", () => {
    expect(slugifyTitle("  Italian  Definite_Articles  ")).toBe(
      "italian-definite-articles"
    );
  });

  it("drops Persian letters instead of putting them in the address", () => {
    // A Persian slug is percent-encoded into a URL nobody can read or share.
    expect(slugifyTitle("راهنمای حروف تعریف")).toBe("");
    expect(slugifyTitle("راهنمای‌ il، lo و la")).toBe("il-lo-la");
  });
});
