import { writeFileSync, mkdirSync } from "fs";

import { en } from "./en";
import { fa } from "./fa";
import { it } from "./it";

const payloads = { en, fa, it };

for (const locale of ["en", "fa", "it"] as const) {
  const dir = `locales/${locale}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    `${dir}/translation.json`,
    `${JSON.stringify(payloads[locale], null, 2)}\n`
  );
}

console.log("Locale JSON files updated.");
