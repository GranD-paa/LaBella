/**
 * Check or reset the Better Auth password of an existing account, straight
 * against whatever database DATABASE_URL points at.
 *
 * The sign-in form cannot tell a wrong password from a database that dropped
 * the connection — `signInWithPassword` turns every failure into the same
 * "invalid credentials" — so `check` exists to answer that question on its
 * own, without writing anything.
 *
 *   node scripts/admin-password.mjs check "<email>" "<password>"
 *   node scripts/admin-password.mjs set   "<email>" "<new password>"
 *
 * The password is read from argv and never written to a file or logged. The
 * hashing comes from Better Auth itself, so the stored value is exactly what
 * `signInEmail` will verify against — no format to keep in sync by hand.
 */
import fs from "node:fs";
import { randomUUID } from "node:crypto";

import { hashPassword, verifyPassword } from "better-auth/crypto";
import pg from "pg";

const [mode, email, password] = process.argv.slice(2);

if (!["check", "set"].includes(mode) || !email || !password) {
  console.error(
    'usage: node scripts/admin-password.mjs <check|set> "<email>" "<password>"'
  );
  process.exit(1);
}

for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

// Same DNS workaround the app uses: Iranian DNS for *.db.arvandbaas.ir does
// not resolve reliably from outside ArvanCloud's network.
let connectionString = process.env.DATABASE_URL;
if (connectionString && process.env.DATABASE_HOST_IP) {
  const url = new URL(connectionString);
  url.hostname = process.env.DATABASE_HOST_IP;
  connectionString = url.toString();
}

const pool = new pg.Pool({
  connectionString,
  connectionTimeoutMillis: 15_000,
  query_timeout: 30_000,
});

// The path to the cluster drops packets often enough that a single attempt
// says nothing: a failure here is far more likely to be the link than the
// database. Retry before believing a bad answer.
async function query(text, values) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await pool.query(text, values);
    } catch (error) {
      lastError = error;
      console.warn(`  (attempt ${attempt} failed: ${error.message})`);
    }
  }
  throw lastError;
}

const users = await query(
  'select id, email from "user" where lower(email) = lower($1)',
  [email]
);

if (users.rowCount === 0) {
  console.error(`No account with the email ${email}.`);
  await pool.end();
  process.exit(2);
}

const user = users.rows[0];
console.log(`user ${user.email} (${user.id})`);

const accounts = await query(
  'select id, "password" from account where "userId" = $1 and "providerId" = $2',
  [user.id, "credential"]
);

if (mode === "check") {
  if (accounts.rowCount === 0) {
    console.log("No password credential on this account — sign-in cannot work.");
  } else if (!accounts.rows[0].password) {
    console.log("The credential row has no password stored.");
  } else {
    const matches = await verifyPassword({
      hash: accounts.rows[0].password,
      password,
    });
    console.log(matches ? "MATCH: this password is correct." : "NO MATCH.");
  }
  await pool.end();
  process.exit(0);
}

const hash = await hashPassword(password);

// `updatedAt` is part of Better Auth's schema, but this database was migrated
// by hand from Supabase, so do not assume the column is there.
const columns = await query(
  "select column_name from information_schema.columns where table_name = 'account'"
);
const names = new Set(columns.rows.map((row) => row.column_name));

if (accounts.rowCount > 0) {
  await query(
    names.has("updatedAt")
      ? 'update account set "password" = $1, "updatedAt" = now() where id = $2'
      : 'update account set "password" = $1 where id = $2',
    [hash, accounts.rows[0].id]
  );
  console.log("Password replaced on the existing credential.");
} else {
  const fields = ['id', '"accountId"', '"providerId"', '"userId"', '"password"'];
  const values = [randomUUID(), user.id, "credential", user.id, hash];
  for (const column of ["createdAt", "updatedAt"]) {
    if (names.has(column)) {
      fields.push(`"${column}"`);
      values.push(new Date());
    }
  }
  await query(
    `insert into account (${fields.join(", ")}) values (${values
      .map((_, index) => `$${index + 1}`)
      .join(", ")})`,
    values
  );
  console.log("Credential created for an account that had none.");
}

await pool.end();
