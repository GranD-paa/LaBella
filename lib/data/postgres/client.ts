import { Pool } from "pg";

/**
 * One pool per process. Next.js reloads modules in dev, so it is stashed on
 * globalThis to avoid leaking a new pool (and its connections) on every edit —
 * the ArvanCloud Starter cluster allows 250 connections in total.
 */
const globalForPool = globalThis as unknown as { laparliPool?: Pool };

export function getPool(): Pool {
  if (!globalForPool.laparliPool) {
    globalForPool.laparliPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    });
  }
  return globalForPool.laparliPool;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  values: unknown[] = []
): Promise<T[]> {
  const result = await getPool().query(text, values);
  return result.rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(
  text: string,
  values: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(text, values);
  return rows[0] ?? null;
}
