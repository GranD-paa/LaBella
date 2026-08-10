import fs from "node:fs";
import path from "node:path";

import { LOCAL_SEED, type LocalDatabase } from "@/lib/data/local/seed";
import {
  DEFAULT_SUBSCRIPTION_PAGE_CONTENT,
  DEFAULT_SUBSCRIPTION_PLANS,
} from "@/lib/subscription/default-content";

const DATA_DIR = path.join(process.cwd(), ".local-data");
const DATA_FILE = path.join(DATA_DIR, "database.json");

let store: LocalDatabase | null = null;
// Next.js dev mode compiles Server Components and Server Actions into
// separate webpack bundles, so this module can end up instantiated more than
// once in the same process — each instance would otherwise keep its own
// stale in-memory copy. Tracking the file's mtime lets every instance detect
// writes made by any other instance and re-sync from disk before reading.
let loadedMtimeMs: number | null = null;

function cloneSeed(): LocalDatabase {
  return structuredClone(LOCAL_SEED);
}

function getFileMtimeMs(): number | null {
  try {
    return fs.statSync(DATA_FILE).mtimeMs;
  } catch {
    return null;
  }
}

/**
 * Fills in any collection the persisted file predates.
 *
 * The local store is a plain JSON file that survives across upgrades, so a
 * file written before a feature existed is missing that feature's keys — and
 * the code reading them crashes on `undefined.filter(...)`. Adding a
 * hand-written check per collection worked until someone forgot one, which is
 * exactly what happened when billing landed.
 *
 * Deriving the check from the seed instead means any collection added in
 * future is backfilled automatically. Existing data is never overwritten:
 * only keys that are absent, or whose shape no longer matches the seed's
 * (array vs object), are replaced.
 */
function backfillMissingCollections(parsed: LocalDatabase): void {
  const seed = LOCAL_SEED as unknown as Record<string, unknown>;
  const target = parsed as unknown as Record<string, unknown>;

  for (const key of Object.keys(seed)) {
    const seedValue = seed[key];
    const current = target[key];

    const shapeChanged =
      current === undefined ||
      current === null ||
      Array.isArray(seedValue) !== Array.isArray(current);

    if (shapeChanged) {
      target[key] = structuredClone(seedValue);
    }
  }
}

function loadPersistedStore(): LocalDatabase | null {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return null;
    }

    const parsed = JSON.parse(
      fs.readFileSync(DATA_FILE, "utf8")
    ) as LocalDatabase;

    if (
      !parsed ||
      !Array.isArray(parsed.quizzes) ||
      !Array.isArray(parsed.quizQuestions)
    ) {
      return null;
    }

    backfillMissingCollections(parsed);

    // Subscription plans have their own rule: an *empty* list is treated as
    // missing rather than as "the admin deleted every plan", because a
    // storefront with no plans is never what anyone wants locally.
    if (parsed.subscriptionPlans.length === 0) {
      parsed.subscriptionPlans = DEFAULT_SUBSCRIPTION_PLANS.map((plan) => ({ ...plan }));
    }
    if (!parsed.subscriptionPageContent || typeof parsed.subscriptionPageContent !== "object") {
      parsed.subscriptionPageContent = { ...DEFAULT_SUBSCRIPTION_PAGE_CONTENT };
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getLocalStore(): LocalDatabase {
  const currentMtimeMs = getFileMtimeMs();

  if (!store || (currentMtimeMs !== null && currentMtimeMs !== loadedMtimeMs)) {
    store = loadPersistedStore() ?? cloneSeed();
    loadedMtimeMs = currentMtimeMs;
  }

  return store;
}

export function persistLocalStore(): void {
  if (!store) {
    return;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
  loadedMtimeMs = getFileMtimeMs();
}

export function resetLocalStore(): void {
  store = cloneSeed();
  persistLocalStore();
}

export function createLocalId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
