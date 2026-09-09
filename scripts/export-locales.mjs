/**
 * Regenerates `locales/<locale>/translation.json` from the TypeScript sources
 * in `lib/i18n/messages/`.
 *
 *   npm run messages:export
 *
 * A wrapper rather than the export itself because the message modules import
 * each other through the `@/` alias, which only the bundler resolves — so the
 * write happens inside `locales-in-sync.test.ts`, under Vitest, where the
 * alias works. That same file fails the suite when the JSON has drifted, so
 * forgetting to run this is caught rather than shipped.
 *
 * The env var is set here instead of inline in package.json: `VAR=1 cmd` is
 * shell syntax, and this project is developed on Windows.
 */
import { spawnSync } from "node:child_process";

// `shell: true` rather than naming npx.cmd: the Git Bash shell this project is
// developed in resolves it, and a bare "npx" under win32 silently does nothing.
const result = spawnSync(
  "npx vitest run lib/i18n/messages/locales-in-sync.test.ts",
  {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, UPDATE_LOCALES: "1" },
  }
);

if (result.status !== 0) {
  console.error("locale export failed");
}
process.exit(result.status ?? 1);
