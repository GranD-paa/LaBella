import { describe, expect, it as test } from "vitest";
import en from "@/locales/en/translation.json";
import fa from "@/locales/fa/translation.json";
import itLocale from "@/locales/it/translation.json";

function flattenKeys(value: unknown, prefix = "", out: Set<string> = new Set()) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      flattenKeys(child, prefix ? `${prefix}.${key}` : key, out);
    }
  } else {
    out.add(prefix);
  }
  return out;
}

const enKeys = flattenKeys(en);

describe.each([
  ["fa", fa],
  ["it", itLocale],
])("locale key parity: %s vs en", (locale, messages) => {
  test(`has no keys missing from ${locale}`, () => {
    const localeKeys = flattenKeys(messages);
    const missing = Array.from(enKeys).filter((key) => !localeKeys.has(key));
    expect(missing).toEqual([]);
  });

  test(`has no extra keys not present in en`, () => {
    const localeKeys = flattenKeys(messages);
    const extra = Array.from(localeKeys).filter((key) => !enKeys.has(key));
    expect(extra).toEqual([]);
  });
});
