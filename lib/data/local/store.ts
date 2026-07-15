import { LOCAL_SEED, type LocalDatabase } from "@/lib/data/local/seed";

let store: LocalDatabase | null = null;

function cloneSeed(): LocalDatabase {
  return structuredClone(LOCAL_SEED);
}

export function getLocalStore(): LocalDatabase {
  if (!store) {
    store = cloneSeed();
  }
  return store;
}

export function resetLocalStore(): void {
  store = cloneSeed();
}

export function createLocalId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
