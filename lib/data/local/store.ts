import fs from "node:fs";
import path from "node:path";

import { LOCAL_SEED, type LocalDatabase } from "@/lib/data/local/seed";

const DATA_DIR = path.join(process.cwd(), ".local-data");
const DATA_FILE = path.join(DATA_DIR, "database.json");

let store: LocalDatabase | null = null;

function cloneSeed(): LocalDatabase {
  return structuredClone(LOCAL_SEED);
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

    return parsed;
  } catch {
    return null;
  }
}

export function getLocalStore(): LocalDatabase {
  if (!store) {
    store = loadPersistedStore() ?? cloneSeed();
  }
  return store;
}

export function persistLocalStore(): void {
  if (!store) {
    return;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf8");
}

export function resetLocalStore(): void {
  store = cloneSeed();
  persistLocalStore();
}

export function createLocalId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
