#!/usr/bin/env node
/**
 * Copies the live site's *content* into the local development store.
 *
 * Local mode reads `.local-data/database.json`, which ships with a handful of
 * placeholder lessons. Working against placeholders means every visual change
 * has to be checked on production to see how it really looks — this pulls the
 * real curriculum down instead, so localhost renders what learners actually
 * see.
 *
 * **Content only.** Real accounts, payments, subscriptions and quiz attempts
 * are deliberately not copied: they are other people's personal data, they are
 * not needed to work on the interface, and the local test accounts have to
 * survive the import or signing in locally stops working.
 *
 * Usage:
 *   1. Run supabase/export-content.sql in the Supabase SQL editor.
 *   2. Save the single JSON value it returns to .local-data/production-export.json
 *   3. node scripts/sync-local-content.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EXPORT_FILE = path.join(ROOT, ".local-data", "production-export.json");
const STORE_FILE = path.join(ROOT, ".local-data", "database.json");

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

if (!existsSync(EXPORT_FILE)) {
  fail(
    `No export found at ${path.relative(ROOT, EXPORT_FILE)}\n` +
      `  Run supabase/export-content.sql in the Supabase SQL editor and save\n` +
      `  the JSON it returns to that path.`
  );
}
if (!existsSync(STORE_FILE)) {
  fail(`No local store at ${path.relative(ROOT, STORE_FILE)} — start the dev server once first.`);
}

let exported;
try {
  exported = JSON.parse(readFileSync(EXPORT_FILE, "utf8"));
} catch (error) {
  fail(
    `The export is not valid JSON (${error.message}).\n` +
      `  Copy the whole cell value from the SQL editor, including the outer { }.`
  );
}

const store = JSON.parse(readFileSync(STORE_FILE, "utf8"));

/** Straight table -> collection copies, no reshaping needed. */
const DIRECT = {
  lessons: "lessons",
  vocabulary: "vocabulary",
  grammar_rules: "grammarRules",
  video_lessons: "videoLessons",
  quizzes: "quizzes",
  quiz_questions: "quizQuestions",
  banners: "banners",
  subscription_plans: "subscriptionPlans",
  fx_rates: "fxRates",
};

const summary = [];

for (const [source, target] of Object.entries(DIRECT)) {
  const rows = exported[source];
  if (!Array.isArray(rows)) continue;
  store[target] = rows;
  summary.push([target, rows.length]);
}

// Singleton rows arrive as one-element arrays.
if (Array.isArray(exported.subscription_page_content) && exported.subscription_page_content[0]) {
  store.subscriptionPageContent = exported.subscription_page_content[0];
  summary.push(["subscriptionPageContent", 1]);
}
if (Array.isArray(exported.payment_settings) && exported.payment_settings[0]) {
  store.paymentSettings = exported.payment_settings[0];
  summary.push(["paymentSettings", 1]);
}

// language_settings is a table of rows in Postgres but a slug -> bool map locally.
if (Array.isArray(exported.language_settings)) {
  store.languageSettings = Object.fromEntries(
    exported.language_settings.map((row) => [row.language_slug, row.enabled])
  );
  summary.push(["languageSettings", exported.language_settings.length]);
}

// curriculum_level_overrides is snake_case in Postgres, camelCase locally.
if (Array.isArray(exported.curriculum_level_overrides)) {
  store.curriculumLevelOverrides = exported.curriculum_level_overrides.map((row) => ({
    languageSlug: row.language_slug,
    slug: row.slug,
    code: row.code,
    title: row.title,
    description: row.description ?? "",
    orderNumber: row.order_number,
    isCustom: row.is_custom,
  }));
  summary.push(["curriculumLevelOverrides", exported.curriculum_level_overrides.length]);
}

// Anything referencing a real user is dropped rather than carried over: the
// imported content has different lesson/quiz ids, so stale attempts and
// learning positions would point at rows that no longer exist.
store.userQuizAttempts = [];
store.learningStates = [];
store.subscriptions = [];
store.payments = [];
store.refunds = [];
store.subscriptionEvents = [];

writeFileSync(STORE_FILE, JSON.stringify(store, null, 2));

console.log("\n✔ Local store updated from the live site\n");
for (const [name, count] of summary) {
  console.log(`   ${String(count).padStart(5)}  ${name}`);
}

// Both roles have to stay usable locally — the admin panel and the learner
// experience are different products and each needs checking. Listing them
// here makes it obvious if an import ever wipes one out.
const roleByUser = new Map((store.profiles ?? []).map((p) => [p.id, p]));
const accounts = (store.users ?? []).map((user) => {
  const profile = roleByUser.get(user.id);
  return { email: user.email, role: profile?.role ?? "learner" };
});

console.log("\n   Sign-in accounts (unchanged by this import):");
for (const account of accounts) {
  const label = account.role === "learner" ? "learner" : `admin · ${account.role}`;
  console.log(`     ${account.email.padEnd(30)} ${label}`);
}

if (!accounts.some((a) => a.role !== "learner")) {
  console.log("\n   ⚠ No admin account locally — the admin panel will be unreachable.");
}
if (!accounts.some((a) => a.role === "learner")) {
  console.log("\n   ⚠ No learner account locally — you can only see the admin view.");
}

console.log("\n   Restart the dev server to pick this up.\n");
