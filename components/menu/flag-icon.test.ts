import { describe, expect, it } from "vitest";

import { getLanguageCode, getLanguagesMissingCodes } from "@/lib/curriculum/language-codes";
import { LANGUAGES } from "@/lib/curriculum/languages";

/**
 * Every language in the curriculum must have a flag drawn for it.
 *
 * Flags are hand-drawn SVGs rather than Unicode emoji, because Windows has no
 * font that composes regional-indicator pairs — 🇮🇹 renders there as the bare
 * letters "IT". The cost of that choice is that adding a language to
 * LANGUAGES does not automatically give it a flag, so this test is the thing
 * that remembers.
 */
describe("flag coverage", () => {
  it("has a curated code for every curriculum language", () => {
    // Fails the moment a language is added to LANGUAGES without one, which is
    // the point: the flag drawing and the code both have to be filled in by
    // hand, and this is what remembers to ask.
    expect(getLanguagesMissingCodes()).toEqual([]);
  });

  it("returns a curated two-letter code per language", () => {
    expect(getLanguageCode("italian")).toBe("IT");
    expect(getLanguageCode("english")).toBe("EN");
    expect(getLanguageCode("german")).toBe("DE");
    expect(getLanguageCode("turkish")).toBe("TR");
  });

  it("codes are two uppercase letters and unique", () => {
    const codes = LANGUAGES.map((language) => getLanguageCode(language.slug));
    codes.forEach((code) => expect(code).toMatch(/^[A-Z]{2}$/));
    expect(new Set(codes).size).toBe(codes.length);
  });
});
