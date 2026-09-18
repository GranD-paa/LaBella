import { describe, expect, it } from "vitest";

import { fitMetaDescription } from "@/lib/blog/agent/schema";

const SUMMARY =
  "حروف تعریف ایتالیایی بر اساس حرف اول اسم انتخاب می‌شوند، نه بر اساس معنی آن. " +
  "این راهنما تفاوت آن‌ها را با مثال و جدول نشان می‌دهد و خطاهای رایج فارسی‌زبان‌ها را می‌گوید.";

describe("fitMetaDescription", () => {
  it("keeps a description that is already inside the window", () => {
    const notes: string[] = [];
    const good = "ب".repeat(120);
    expect(fitMetaDescription(good, SUMMARY, notes)).toBe(good);
    expect(notes).toEqual([]);
  });

  it("falls back to the summary when the model omitted the field", () => {
    // The failure this pins: a finished article, already paid for, thrown away
    // because one field of fourteen was absent.
    const notes: string[] = [];
    for (const missing of [undefined, null, ""]) {
      const result = fitMetaDescription(missing, SUMMARY, notes);
      expect(result.length).toBeGreaterThanOrEqual(80);
      expect(result.length).toBeLessThanOrEqual(155);
    }
    expect(notes).toHaveLength(3);
  });

  it("falls back when the description is too short to be worth showing", () => {
    const notes: string[] = [];
    const result = fitMetaDescription("خیلی کوتاه", SUMMARY, notes);
    expect(result).not.toBe("خیلی کوتاه");
    expect(result.length).toBeGreaterThanOrEqual(80);
  });

  it("cuts an overlong description at a word boundary, not mid-word", () => {
    const notes: string[] = [];
    const long = Array.from({ length: 60 }, () => "کلمه").join(" ");
    const result = fitMetaDescription(long, SUMMARY, notes);
    expect(result.length).toBeLessThanOrEqual(155);
    // Whatever survives is whole words, so the last one is not a fragment.
    expect(long.startsWith(result)).toBe(true);
    expect(result.endsWith("کلمه")).toBe(true);
    expect(notes).toHaveLength(1);
  });

  it("never returns trailing punctuation left behind by the cut", () => {
    const notes: string[] = [];
    const long = Array.from({ length: 40 }, () => "واژه،").join(" ");
    expect(fitMetaDescription(long, SUMMARY, notes)).not.toMatch(/[\s،؛:-]$/);
  });

  it("still respects the ceiling when the summary itself is the long one", () => {
    const notes: string[] = [];
    const longSummary = Array.from({ length: 80 }, () => "جمله").join(" ");
    expect(fitMetaDescription("", longSummary, notes).length).toBeLessThanOrEqual(155);
  });
});
