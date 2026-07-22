import fs from "node:fs";
import path from "node:path";

import { LOCAL_SEED, type LocalDatabase } from "@/lib/data/local/seed";

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

    // Backward-compat: older persisted files predate `languageSettings`.
    if (!parsed.languageSettings || typeof parsed.languageSettings !== "object") {
      parsed.languageSettings = {};
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
