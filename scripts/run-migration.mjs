/**
 * Applies one db/*.sql migration to the database named by DATABASE_URL.
 *
 * The migrations in db/ were applied by hand until now, which is fine exactly
 * once and then stops being fine: there was no way to see what a file would do
 * before it did it, and no way to be sure a half-failed run had been undone.
 *
 * The whole file runs inside a single transaction, so a statement that fails
 * leaves the database exactly as it was rather than half-migrated.
 *
 * The password is read from the file and never printed: the summary below
 * reports only the host, the database name and the row counts.
 *
 *   node scripts/run-migration.mjs db/010_roles_rebuild.sql [--apply]
 *
 * Without --apply it connects, reports what is already there, and rolls back
 * without writing anything.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const PROJECT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sqlPath = process.argv[2];
const apply = process.argv.includes("--apply");

if (!sqlPath) {
  console.error("usage: node run-migration.mjs <file.sql> [--apply]");
  process.exit(1);
}

function readDatabaseUrl() {
  const env = fs.readFileSync(path.join(PROJECT, ".env.local"), "utf8");
  for (const line of env.split(/\r?\n/)) {
    const match = /^\s*DATABASE_URL\s*=\s*(.*)$/.exec(line);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("DATABASE_URL not found in .env.local");
}

const url = readDatabaseUrl();
const parsed = new URL(url);

// DNS for *.db.arvandbaas.ir fails often from here (Cloudflare WARP): both
// EAI_AGAIN and SERVFAIL, while the rest of the internet works. `--ip` dials
// the cluster's A record directly. The cluster speaks no TLS, so there is no
// certificate hostname to break by doing so.
const CLUSTER_IP = "37.32.4.130";
if (process.argv.includes("--ip")) {
  parsed.hostname = CLUSTER_IP;
}
console.log(`host     ${parsed.hostname}:${parsed.port}`);
console.log(`database ${parsed.pathname.slice(1)}`);
console.log(`user     ${parsed.username}`);
console.log(`mode     ${apply ? "APPLY (will commit)" : "DRY RUN (will roll back)"}`);
console.log("connecting…");
console.log("");

const sql = fs.readFileSync(path.resolve(PROJECT, sqlPath), "utf8");

// The cluster speaks no TLS at all — see the arvancloud-db-facts note.
const client = new pg.Client({
  connectionString: parsed.toString(),
  ssl: false,
  // Fail fast rather than hanging on a name that will not resolve: a script
  // that sits there forever tells you nothing about whether it wrote anything.
  connectionTimeoutMillis: 15_000,
  statement_timeout: 120_000,
});

/** Counts that say whether the migration has already been applied. */
async function snapshot(label) {
  const q = async (text) => {
    try {
      const { rows } = await client.query(text);
      return rows[0]?.value ?? rows;
    } catch (error) {
      return `n/a (${error.message.split("\n")[0]})`;
    }
  };

  console.log(`--- ${label}`);
  console.log(
    "roles in use:",
    await q(
      `select json_agg(t) as value from (
         select role, count(*)::int from profiles group by role order by role
       ) t`
    )
  );
  console.log(
    "profiles.assigned_languages:",
    await q(
      `select (count(*) > 0)::text as value from information_schema.columns
        where table_name = 'profiles' and column_name = 'assigned_languages'`
    )
  );
  console.log(
    "lessons.language_slug:",
    await q(
      `select (count(*) > 0)::text as value from information_schema.columns
        where table_name = 'lessons' and column_name = 'language_slug'`
    )
  );
  console.log(
    "role_permission_overrides table:",
    await q(
      `select (count(*) > 0)::text as value from information_schema.tables
        where table_name = 'role_permission_overrides'`
    )
  );
  console.log(
    "grant_subscription function:",
    await q(
      `select (count(*) > 0)::text as value from pg_proc
        where proname = 'grant_subscription'`
    )
  );
  console.log(
    "lessons by language:",
    await q(
      `select json_agg(t) as value from (
         select language_slug, count(*)::int from lessons
         group by language_slug order by language_slug
       ) t`
    )
  );
  console.log("");
}

try {
  await client.connect();
  await snapshot("before");

  await client.query("begin");
  await client.query(sql);
  await snapshot("after (inside the transaction)");

  if (apply) {
    await client.query("commit");
    console.log("COMMITTED");
  } else {
    await client.query("rollback");
    console.log("ROLLED BACK — nothing was written. Re-run with --apply.");
  }
} catch (error) {
  try {
    await client.query("rollback");
  } catch {}
  console.error("FAILED:", error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
