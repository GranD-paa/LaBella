import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { en } from "./en";
import { fa } from "./fa";
import { it as itMessages } from "./it";

/**
 * The `.ts` files here are the source; `locales/<locale>/translation.json` is
 * generated from them, and the generated JSON is what the app actually loads
 * (`messages/index.ts`) and what `Messages` is typed from (`lib/i18n/types.ts`).
 *
 * Which means editing a string here and forgetting the export ships the old
 * word, silently, in every language — and the type still checks, because the
 * type comes from the stale file too.
 *
 * So this is a test rather than a script anyone has to remember: drift fails
 * the suite, and the failure says how to fix it.
 *
 *   npm run messages:export
 */

const PAYLOADS = { en, fa, it: itMessages } as const;

function serialise(payload: unknown): string {
  return `${JSON.stringify(payload, null, 2)}\n`;
}

const shouldWrite = process.env.UPDATE_LOCALES === "1";

describe("locale JSON", () => {
  for (const [locale, payload] of Object.entries(PAYLOADS)) {
    it(`${locale} matches its source`, () => {
      const path = `locales/${locale}/translation.json`;
      const expected = serialise(payload);

      if (shouldWrite) {
        mkdirSync(`locales/${locale}`, { recursive: true });
        writeFileSync(path, expected);
        return;
      }

      let onDisk: string;
      try {
        onDisk = readFileSync(path, "utf8");
      } catch {
        throw new Error(`${path} is missing — run: npm run messages:export`);
      }

      expect(
        onDisk,
        `${path} is out of date — run: npm run messages:export`
      ).toBe(expected);
    });
  }
});
