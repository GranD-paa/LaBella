import { describe, expect, it } from "vitest";

import { localizeDigits } from "@/lib/i18n/digits";

describe("localizeDigits", () => {
  it("writes a phone number in Persian for a Persian reader", () => {
    expect(localizeDigits("0912 123 4567", "fa")).toBe("۰۹۱۲ ۱۲۳ ۴۵۶۷");
  });

  it("leaves the same number alone in English and Italian", () => {
    expect(localizeDigits("0912 123 4567", "en")).toBe("0912 123 4567");
    expect(localizeDigits("0912 123 4567", "it")).toBe("0912 123 4567");
  });

  it("converts the digits inside a sentence and nothing else", () => {
    expect(localizeDigits("1:50 left", "fa")).toBe("۱:۵۰ left");
  });

  it("keeps the marks that hold a number's direction", () => {
    expect(localizeDigits("\u20660912\u2069", "fa")).toBe("\u2066۰۹۱۲\u2069");
  });
});
