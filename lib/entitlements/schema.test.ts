/**
 * Runs the entitlement migration against a real PostgreSQL instance (PGlite —
 * Postgres compiled to WASM, no Docker) on top of the billing migration it
 * builds on, and exercises the parts that only exist in SQL.
 *
 * Three of those are security boundaries rather than conveniences, and none is
 * reachable from a TypeScript unit test:
 *
 *  * `create_pending_payment` must refuse a plan that is switched off, because
 *    hiding a plan in the storefront is not authorisation.
 *  * three-month pricing must agree, to the cent, with `resolvePlanPeriodPrice`
 *    in TypeScript — the browser shows one and the ledger charges the other.
 *  * `record_quiz_attempt` must enforce the retake allowance itself, since
 *    retakes are a paid entitlement and the client cannot be trusted to count.
 */
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { resolvePlanPeriodPrice } from "@/lib/billing/money";

const BILLING_MIGRATION = join(
  process.cwd(),
  "supabase/migrations/20260804120000_billing_accounting.sql"
);
const ENTITLEMENTS_MIGRATION = join(
  process.cwd(),
  "supabase/migrations/20260813120000_entitlements_and_plan_periods.sql"
);

// Mirrors what Supabase provides, plus the two tables this migration alters
// that live in schema.sql rather than in the billing migration.
const STUBS = `
do $do$ begin
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then
    create role service_role nologin bypassrls;
  end if;
end $do$;

create schema if not exists auth;
create schema if not exists private;

create table if not exists auth.users (
  id uuid primary key default gen_random_uuid(),
  email text
);

create or replace function auth.uid() returns uuid
language sql stable as $fn$
  select nullif(current_setting('test.user_id', true), '')::uuid;
$fn$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false,
  role text not null default 'learner'
);

create or replace function private.is_admin() returns boolean
language sql security definer stable set search_path = '' as $fn$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = (select auth.uid())),
    false
  );
$fn$;

create table if not exists public.subscription_plans (
  plan_slug text not null,
  language_slug text not null,
  price_eur numeric(10,2) not null,
  discount_percent integer not null default 0,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  features jsonb not null default '[]'::jsonb,
  order_number integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (plan_slug, language_slug)
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null,
  language_slug text not null default 'italian',
  level_slug text not null default 'a1-1',
  section_slug text not null default 'quiz',
  status text not null default 'published'
);

create table if not exists public.user_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  score integer not null default 0,
  answers_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- The unique index the entitlement migration has to replace to allow retakes.
create unique index if not exists user_quiz_attempts_user_quiz_unique
  on public.user_quiz_attempts (user_id, quiz_id);
`;

let db: PGlite;
let learnerId: string;
let quizId: string;

async function newUser(email: string): Promise<string> {
  const res = await db.query<{ id: string }>(
    `insert into auth.users (email) values ($1) returning id`,
    [email]
  );
  const id = res.rows[0]!.id;
  await db.query(`insert into public.profiles (id) values ($1)`, [id]);
  return id;
}

async function actAs(userId: string): Promise<void> {
  await db.query(`set test.user_id = '${userId}'`);
}

async function startCheckout(
  plan: string,
  language: string,
  currency = "EUR",
  periodMonths = 1
): Promise<string> {
  const res = await db.query<{ id: string }>(
    `select public.create_pending_payment($1,$2,$3,$4,$5) as id`,
    [plan, language, "stripe", currency, periodMonths]
  );
  return res.rows[0]!.id;
}

async function recordAttempt(
  quiz: string,
  score = 80
): Promise<{ ok: boolean; reason?: string; attempt_number?: number }> {
  const res = await db.query<{ result: { ok: boolean } }>(
    `select public.record_quiz_attempt($1,$2) as result`,
    [quiz, score]
  );
  return res.rows[0]!.result as never;
}

beforeAll(async () => {
  db = await PGlite.create();
  await db.exec(STUBS);
  await db.exec(readFileSync(BILLING_MIGRATION, "utf8"));
  await db.exec(readFileSync(ENTITLEMENTS_MIGRATION, "utf8"));

  await db.exec(`
    insert into public.subscription_plans
      (plan_slug, language_slug, price_eur, discount_percent,
       title, is_active, quarterly_enabled, quarterly_discount_percent)
    values
      ('basic', 'italian', 4.99, 0,  '{"en":"Basic"}'::jsonb, true,  true,  10),
      ('pro',   'italian', 7.99, 25, '{"en":"Pro"}'::jsonb,   true,  true,  15),
      -- Switched off, as the reserved fourth slot ships.
      ('elite', 'italian', 9.99, 0,  '{"en":"Elite"}'::jsonb, false, true,  0),
      -- On sale, but monthly only.
      ('basic', 'english', 4.99, 0,  '{"en":"Basic"}'::jsonb, true,  false, 0)
    on conflict (plan_slug, language_slug) do update
      set price_eur = excluded.price_eur,
          discount_percent = excluded.discount_percent,
          is_active = excluded.is_active,
          quarterly_enabled = excluded.quarterly_enabled,
          quarterly_discount_percent = excluded.quarterly_discount_percent;

    insert into public.lessons (title) values ('Lesson 1');
  `);

  const lesson = await db.query<{ id: string }>(`select id from public.lessons limit 1`);
  const quiz = await db.query<{ id: string }>(
    `insert into public.quizzes (lesson_id, title, language_slug)
     values ($1, 'Quiz 1', 'italian') returning id`,
    [lesson.rows[0]!.id]
  );
  quizId = quiz.rows[0]!.id;

  learnerId = await newUser("learner@test.local");
  await actAs(learnerId);
}, 180_000);

describe("the migration itself", () => {
  it("is idempotent — applying it twice is safe", async () => {
    // Migrations get re-run by mistake. One that only works once turns a
    // routine re-deploy into an outage.
    await expect(
      db.exec(readFileSync(ENTITLEMENTS_MIGRATION, "utf8"))
    ).resolves.toBeDefined();
  });

  it("seeds a capability row for every shipped tier", async () => {
    const res = await db.query<{ plan_slug: string; tier_rank: number }>(
      `select plan_slug, tier_rank from public.subscription_tiers order by tier_rank`
    );
    expect(res.rows.map((row) => row.plan_slug)).toEqual([
      "basic",
      "pro",
      "ultimate",
      "elite",
    ]);
  });

  it("ships with gating switched off so a deploy cannot black out the site", async () => {
    const res = await db.query<{
      enforce_entitlements: boolean;
      free_cefr_bands: string[];
      free_quiz_retake_limit: number;
    }>(`select enforce_entitlements, free_cefr_bands, free_quiz_retake_limit
        from public.payment_settings where id = 'default'`);

    expect(res.rows[0]!.enforce_entitlements).toBe(false);
    expect(res.rows[0]!.free_cefr_bands).toEqual(["A1"]);
    expect(res.rows[0]!.free_quiz_retake_limit).toBe(0);
  });

  it("gives basic three retakes and the higher tiers unlimited", async () => {
    const res = await db.query<{ plan_slug: string; quiz_retake_limit: number | null }>(
      `select plan_slug, quiz_retake_limit from public.subscription_tiers
       order by tier_rank`
    );
    const byPlan = Object.fromEntries(
      res.rows.map((row) => [row.plan_slug, row.quiz_retake_limit])
    );
    expect(byPlan.basic).toBe(3);
    expect(byPlan.pro).toBeNull();
    expect(byPlan.ultimate).toBeNull();
  });

  it("reads the CEFR band off a level slug the same way TypeScript does", async () => {
    const res = await db.query<{ band: string }>(
      `select private.cefr_band_of('a2-10') as band`
    );
    expect(res.rows[0]!.band).toBe("A2");
  });
});

describe("create_pending_payment", () => {
  it("refuses a plan that is not on sale", async () => {
    // The whole point of the reserved fourth slot: invisible in the UI *and*
    // unbuyable by a hand-crafted request.
    await expect(startCheckout("elite", "italian")).rejects.toThrow(
      /not on sale/
    );
  });

  it("refuses a billing period that is not sold", async () => {
    await expect(
      db.query(`select public.create_pending_payment('basic','italian','stripe','EUR',6)`)
    ).rejects.toThrow(/unsupported billing period/);
  });

  it("refuses three months on a plan that only sells monthly", async () => {
    await expect(startCheckout("basic", "english", "EUR", 3)).rejects.toThrow(
      /quarterly billing is not available/
    );
  });

  it("charges one month at the monthly price", async () => {
    const id = await startCheckout("basic", "italian", "EUR", 1);
    const res = await db.query<{
      amount_eur_cents: number;
      period_months: number;
    }>(`select amount_eur_cents, period_months from public.payments where id = $1`, [
      id,
    ]);

    expect(res.rows[0]!.period_months).toBe(1);
    expect(res.rows[0]!.amount_eur_cents).toBe(499);
  });

  it("prices three months exactly as the storefront does", async () => {
    const plan = {
      price_eur: 4.99,
      discount_percent: 0,
      quarterly_discount_percent: 10,
    };
    const expected = resolvePlanPeriodPrice(plan, 3);

    const id = await startCheckout("basic", "italian", "EUR", 3);
    const res = await db.query<{
      list_price_eur_cents: number;
      discount_eur_cents: number;
      amount_eur_cents: number;
      discount_percent: number;
      period_months: number;
    }>(
      `select list_price_eur_cents, discount_eur_cents, amount_eur_cents,
              discount_percent, period_months
       from public.payments where id = $1`,
      [id]
    );
    const row = res.rows[0]!;

    expect(row.period_months).toBe(3);
    expect(row.list_price_eur_cents).toBe(expected.listCents);
    expect(row.amount_eur_cents).toBe(expected.netCents);
    expect(row.discount_percent).toBe(expected.discountPercent);
    // The ledger invariant that makes reporting reconcile.
    expect(row.amount_eur_cents + row.discount_eur_cents).toBe(
      row.list_price_eur_cents
    );
  });

  it("stacks the plan discount and the quarterly discount", async () => {
    const expected = resolvePlanPeriodPrice(
      { price_eur: 7.99, discount_percent: 25, quarterly_discount_percent: 15 },
      3
    );

    const id = await startCheckout("pro", "italian", "EUR", 3);
    const res = await db.query<{ amount_eur_cents: number; discount_percent: number }>(
      `select amount_eur_cents, discount_percent from public.payments where id = $1`,
      [id]
    );

    expect(res.rows[0]!.discount_percent).toBe(40);
    expect(res.rows[0]!.amount_eur_cents).toBe(expected.netCents);
  });

  it("carries the period through settlement into the subscription", async () => {
    const id = await startCheckout("basic", "italian", "EUR", 3);
    await db.query(`select public.settle_payment($1, $2)`, [id, `ref-${id}`]);

    const res = await db.query<{ period_months: number }>(
      `select period_months from public.subscriptions
       where user_id = $1 and language_slug = 'italian'`,
      [learnerId]
    );
    expect(res.rows[0]!.period_months).toBe(3);

    await db.query(`delete from public.subscriptions where user_id = $1`, [
      learnerId,
    ]);
  });
});

describe("record_quiz_attempt", () => {
  beforeEach(async () => {
    await db.query(`delete from public.user_quiz_attempts where user_id = $1`, [
      learnerId,
    ]);
    await db.query(`delete from public.subscriptions where user_id = $1`, [
      learnerId,
    ]);
    await db.query(
      `update public.payment_settings
       set enforce_entitlements = false, free_quiz_retake_limit = 0
       where id = 'default'`
    );
    await actAs(learnerId);
  });

  it("allows the first attempt with no subscription at all", async () => {
    await db.query(
      `update public.payment_settings set enforce_entitlements = true where id = 'default'`
    );

    const result = await recordAttempt(quizId);
    expect(result.ok).toBe(true);
    expect(result.attempt_number).toBe(1);
  });

  it("refuses a retake for an unsubscribed learner", async () => {
    await db.query(
      `update public.payment_settings set enforce_entitlements = true where id = 'default'`
    );

    await recordAttempt(quizId);
    const second = await recordAttempt(quizId);

    expect(second.ok).toBe(false);
    expect(second.reason).toBe("retake_limit_reached");

    const count = await db.query<{ n: number }>(
      `select count(*)::int as n from public.user_quiz_attempts where user_id = $1`,
      [learnerId]
    );
    expect(count.rows[0]!.n).toBe(1);
  });

  it("gives a basic subscriber exactly three retakes, then stops", async () => {
    await db.query(
      `update public.payment_settings set enforce_entitlements = true where id = 'default'`
    );
    await db.query(
      `insert into public.subscriptions
         (user_id, plan_slug, language_slug, status, current_period_end, anchor_day)
       values ($1, 'basic', 'italian', 'active', now() + interval '20 days', 1)`,
      [learnerId]
    );

    // 1 free attempt + 3 retakes = 4 recorded attempts.
    for (const expectedNumber of [1, 2, 3, 4]) {
      const result = await recordAttempt(quizId);
      expect(result.ok).toBe(true);
      expect(result.attempt_number).toBe(expectedNumber);
    }

    const fifth = await recordAttempt(quizId);
    expect(fifth.ok).toBe(false);
    expect(fifth.reason).toBe("retake_limit_reached");
  });

  it("lets a pro subscriber retake without limit", async () => {
    await db.query(
      `update public.payment_settings set enforce_entitlements = true where id = 'default'`
    );
    await db.query(
      `insert into public.subscriptions
         (user_id, plan_slug, language_slug, status, current_period_end, anchor_day)
       values ($1, 'pro', 'italian', 'active', now() + interval '20 days', 1)`,
      [learnerId]
    );

    for (let i = 0; i < 8; i += 1) {
      expect((await recordAttempt(quizId)).ok).toBe(true);
    }
  });

  it("keeps retakes unlimited while gating is switched off", async () => {
    // Before entitlements existed a quiz could be attempted once, ever. Turning
    // the gate off must not reinstate that: the limit only applies when the
    // system is actually being used to sell access.
    for (let i = 0; i < 5; i += 1) {
      expect((await recordAttempt(quizId)).ok).toBe(true);
    }
  });

  it("honours the free retake allowance when an admin raises it", async () => {
    await db.query(
      `update public.payment_settings
       set enforce_entitlements = true, free_quiz_retake_limit = 2
       where id = 'default'`
    );

    expect((await recordAttempt(quizId)).ok).toBe(true);
    expect((await recordAttempt(quizId)).ok).toBe(true);
    expect((await recordAttempt(quizId)).ok).toBe(true);
    expect((await recordAttempt(quizId)).ok).toBe(false);
  });

  it("numbers attempts so history is kept rather than overwritten", async () => {
    await recordAttempt(quizId, 40);
    await recordAttempt(quizId, 90);

    const res = await db.query<{ attempt_number: number; score: number }>(
      `select attempt_number, score from public.user_quiz_attempts
       where user_id = $1 and quiz_id = $2 order by attempt_number`,
      [learnerId, quizId]
    );

    expect(res.rows.map((row) => [row.attempt_number, row.score])).toEqual([
      [1, 40],
      [2, 90],
    ]);
  });
});

describe("attach_checkout_reference", () => {
  it("records the gateway handle on the caller's own pending payment", async () => {
    const id = await startCheckout("basic", "italian");
    await db.query(`select public.attach_checkout_reference($1, $2)`, [id, "auth-1"]);

    const res = await db.query<{ checkout_reference: string | null }>(
      `select checkout_reference from public.payments where id = $1`,
      [id]
    );
    expect(res.rows[0]!.checkout_reference).toBe("auth-1");
  });

  it("will not overwrite a reference that is already set", async () => {
    const id = await startCheckout("basic", "italian");
    await db.query(`select public.attach_checkout_reference($1, $2)`, [id, "auth-1"]);
    await db.query(`select public.attach_checkout_reference($1, $2)`, [id, "auth-2"]);

    const res = await db.query<{ checkout_reference: string | null }>(
      `select checkout_reference from public.payments where id = $1`,
      [id]
    );
    expect(res.rows[0]!.checkout_reference).toBe("auth-1");
  });

  it("cannot touch someone else's payment", async () => {
    const id = await startCheckout("basic", "italian");
    const otherId = await newUser("other@test.local");

    await actAs(otherId);
    await db.query(`select public.attach_checkout_reference($1, $2)`, [id, "stolen"]);
    await actAs(learnerId);

    const res = await db.query<{ checkout_reference: string | null }>(
      `select checkout_reference from public.payments where id = $1`,
      [id]
    );
    expect(res.rows[0]!.checkout_reference).toBeNull();
  });
});

describe("list_stale_pending_payments", () => {
  it("only returns payments older than the configured timeout", async () => {
    const fresh = await startCheckout("basic", "italian");
    const old = await startCheckout("pro", "italian");
    await db.query(
      `update public.payments set created_at = now() - interval '2 hours' where id = $1`,
      [old]
    );

    const res = await db.query<{ id: string }>(
      `select id from public.list_stale_pending_payments(50)`
    );
    const ids = res.rows.map((row) => row.id);

    expect(ids).toContain(old);
    // A payment the customer may still be paying must not be reconciled.
    expect(ids).not.toContain(fresh);
  });
});
