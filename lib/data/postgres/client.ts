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
 * globalThis to avoid leaking a new pool (and its connections) on every edit.
 *
 * The budget is smaller than it looks. The cluster reports
 * `max_connections = 50` with three held back for superusers, and a rolling
 * deploy runs the old pod and the new one at once — two pools, not one — with
 * Better Auth keeping its own alongside. Sizing this to the headline number
 * would mean a deploy that cannot open a connection.
 */
/**
 * Connection settings shared by this pool and Better Auth's.
 *
 * `query_timeout` is the important one. The path to the cluster drops packets
 * often enough that a response occasionally never arrives, and without a
 * driver-side deadline `pg` waits forever — the request hangs instead of
 * failing, which is how a missing column default first showed up as a sign-up
 * that never returned rather than an error. Every knob here bounds a wait that
 * would otherwise be unbounded.
 */
export const POOL_OPTIONS = {
  connectionTimeoutMillis: 10_000,
  query_timeout: 20_000,
  statement_timeout: 20_000,
  idleTimeoutMillis: 30_000,
  keepAlive: true,
  keepAliveInitialDelayMillis: 5_000,
} as const;

const globalForPool = globalThis as unknown as { laparliPool?: Pool };

export function getPool(): Pool {
  if (!globalForPool.laparliPool) {
    globalForPool.laparliPool = new Pool({
      connectionString: resolveConnectionString(),
      /**
       * Sixteen, sized against the fifty above rather than against hope.
       *
       * Ten was the number that made a crowd feel like an outage: a burst of
       * sign-ins holds one client each for the length of a transaction, and
       * once all ten are held every other query on the site queues behind
       * them until `connectionTimeoutMillis` gives up. The page that fails is
       * not the one that caused the burst.
       *
       * Two pods at sixteen leaves room under fifty for Better Auth and for
       * whoever else is connected. Raising it further is not free: past the
       * cluster's ceiling the failure moves from "slow" to "refused", which
       * is strictly worse.
       */
      max: 16,
      ...POOL_OPTIONS,
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

/**
 * Failures that mean the connection died, not that the query was wrong.
 *
 * The pool keeps connections open across requests and the path to the cluster
 * drops them — a socket reset, a cluster-side restart, a DNS blip. The client
 * finds out only when it writes to a connection the other end already closed,
 * so the query never reached Postgres and nothing ran. These all surface
 * immediately rather than after a wait.
 *
 * Deliberately absent: the three timeouts in `POOL_OPTIONS`. A query that has
 * already spent twenty seconds may well have executed, and waiting another
 * twenty to find out turns a slow page into a broken one.
 */
const TRANSIENT_ERROR_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "EPIPE",
  "ENOTFOUND",
  "EAI_AGAIN",
  "08000", // connection_exception
  "08001", // sqlclient_unable_to_establish_sqlconnection
  "08003", // connection_does_not_exist
  "08006", // connection_failure
  "57P01", // admin_shutdown
  "57P02", // crash_shutdown
  "57P03", // cannot_connect_now
]);

function isTransientConnectionError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const { code, message } = error as { code?: unknown; message?: unknown };
  if (typeof code === "string" && TRANSIENT_ERROR_CODES.has(code)) return true;

  // `pg` reports a socket that closed under an idle pooled client with a
  // message and no code, so there is nothing else to match on.
  return (
    typeof message === "string" &&
    /connection terminated|connection ended|socket hang up|client has encountered a connection error/i.test(
      message
    )
  );
}

/**
 * True only for a statement that cannot change anything.
 *
 * The retry below re-runs a statement that may already have been sent, so it
 * must never see a write. Matching on the leading keyword rather than on the
 * caller is the part that makes that guarantee hold: `queryOne` is used for
 * two `insert ... returning id` statements (a grammar rule, a banner image),
 * and a retried insert would quietly create the row twice.
 */
function isReadOnlyStatement(text: string): boolean {
  return /^\s*select\b/i.test(text);
}

export async function query<T = Record<string, unknown>>(
  text: string,
  values: unknown[] = []
): Promise<T[]> {
  let result;
  try {
    result = await getPool().query(text, values);
  } catch (error) {
    if (!isReadOnlyStatement(text) || !isTransientConnectionError(error)) {
      throw error;
    }
    // The dead connection has been discarded by now, so the second attempt
    // gets a fresh one. One retry only: past that the cluster is genuinely
    // unreachable and the caller should hear about it rather than wait.
    console.warn(
      "[db] read failed on a dropped connection, retrying once:",
      error instanceof Error ? error.message : error
    );
    result = await getPool().query(text, values);
  }
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
