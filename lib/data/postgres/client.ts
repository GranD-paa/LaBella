import { Pool, types } from "pg";

/**
 * `numeric` and `bigint` arrive from pg as strings so no precision is lost.
 * Every such column here is money-in-cents or a small counter that the app
 * types as `number`, so they are parsed once, globally. Timestamps are
 * deliberately left alone: Better Auth shares this driver and wants Date
 * objects for its own columns — `serialize()` below converts them per row
 * instead, for our tables only.
 */
types.setTypeParser(types.builtins.NUMERIC, (value) => Number(value));
types.setTypeParser(types.builtins.INT8, (value) => Number(value));

/**
 * Iranian DNS for `*.db.arvandbaas.ir` resolves unreliably from outside
 * ArvanCloud's network — often `ENOTFOUND` while the rest of the internet is
 * fine — which makes local development against the cluster stop and start at
 * random. Setting `DATABASE_HOST_IP` swaps in the A record directly.
 *
 * Development convenience only. The cluster speaks no TLS, so there is no
 * certificate hostname to invalidate, and inside ArvanCloud (where the app
 * will actually run) DNS works and the variable stays unset.
 */
export function resolveConnectionString(): string | undefined {
  const raw = process.env.DATABASE_URL;
  const override = process.env.DATABASE_HOST_IP;
  if (!raw || !override) {
    return raw;
  }
  const url = new URL(raw);
  url.hostname = override;
  return url.toString();
}

/**
 * One pool per process. Next.js reloads modules in dev, so it is stashed on
 * globalThis to avoid leaking a new pool (and its connections) on every edit —
 * the ArvanCloud Starter cluster allows 250 connections in total.
 */
const globalForPool = globalThis as unknown as { laparliPool?: Pool };

export function getPool(): Pool {
  if (!globalForPool.laparliPool) {
    globalForPool.laparliPool = new Pool({
      connectionString: resolveConnectionString(),
      max: 10,
    });
  }
  return globalForPool.laparliPool;
}

/**
 * Supabase handed timestamps to the app as ISO strings and the row types say
 * so; the pg driver hands back Date objects. Converting here keeps every
 * caller — and every JSON payload sent to a client component — unchanged.
 */
function serialize<T>(row: T): T {
  if (!row || typeof row !== "object") {
    return row;
  }
  const out: Record<string, unknown> = { ...(row as Record<string, unknown>) };
  for (const [key, value] of Object.entries(out)) {
    if (value instanceof Date) {
      out[key] = value.toISOString();
    }
  }
  return out as T;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  values: unknown[] = []
): Promise<T[]> {
  const result = await getPool().query(text, values);
  return (result.rows as T[]).map(serialize);
}

export async function queryOne<T = Record<string, unknown>>(
  text: string,
  values: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(text, values);
  return rows[0] ?? null;
}

/** Runs a write and reports how many rows it touched. */
export async function execute(
  text: string,
  values: unknown[] = []
): Promise<number> {
  const result = await getPool().query(text, values);
  return result.rowCount ?? 0;
}

/**
 * Turns a partial update object into `set` fragments, skipping keys the caller
 * left undefined so a patch never blanks a column it did not mention.
 */
export function buildUpdate(
  input: Record<string, unknown>,
  columnFor: Record<string, string>
): { sql: string; values: unknown[] } | null {
  const fragments: string[] = [];
  const values: unknown[] = [];

  for (const [key, column] of Object.entries(columnFor)) {
    if (input[key] === undefined) {
      continue;
    }
    values.push(input[key]);
    fragments.push(`"${column}" = $${values.length}`);
  }

  return fragments.length ? { sql: fragments.join(", "), values } : null;
}

/**
 * Runs `work` inside a transaction on a single dedicated connection, so a
 * multi-statement write either lands whole or not at all.
 */
export async function withTransaction<T>(
  work: (run: (text: string, values?: unknown[]) => Promise<unknown[]>) => Promise<T>
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("begin");
    const result = await work(async (text, values = []) => {
      const rows = await client.query(text, values);
      return rows.rows;
    });
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
