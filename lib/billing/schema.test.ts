/**
 * Executes the real billing migration against a real PostgreSQL instance
 * (PGlite — Postgres compiled to WASM, no Docker needed) and exercises the
 * money-critical paths.
 *
 * The logic these tests cover lives in SQL, not TypeScript: pricing is derived
 * inside `create_pending_payment` so a tampered client cannot choose its own
 * price, settlement is atomic inside `settle_payment`, and the real access
 * boundary is Row Level Security. None of that is reachable from a normal unit
 * test, and all of it is the kind of thing you only discover is broken after
 * money has moved.
 *
 * Supabase-specific objects (the `auth` schema, the `authenticated` role,
 * `private.is_admin()`) are stubbed to match production behaviour.
 */
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

const MIGRATION_PATH = join(
  process.cwd(),
  "supabase/migrations/20260804120000_billing_accounting.sql"
);

// Mirrors what Supabase provides out of the box. `auth.uid()` reads a session
// setting so a test can act as any user.
const SUPABASE_STUBS = `
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
`;

let db: PGlite;
let learnerId: string;

async function newUser(email: string, isAdmin = false): Promise<string> {
  const res = await db.query<{ id: string }>(
    `insert into auth.users (email) values ($1) returning id`,
    [email]
  );
  const id = res.rows[0].id;
  await db.query(`insert into public.profiles (id, is_admin) values ($1, $2)`, [
    id,
    isAdmin,
  ]);
  return id;
}

async function actAs<T>(userId: string, fn: () => Promise<T>): Promise<T> {
  await db.query(`set test.user_id = '${userId}'`);
  return fn();
}

/** Runs `fn` with RLS actually enforced, as the `authenticated` role would. */
async function asAuthenticated<T>(userId: string, fn: () => Promise<T>): Promise<T> {
  await db.exec(`set role authenticated;`);
  await db.query(`set test.user_id = '${userId}'`);
  try {
    return await fn();
  } finally {
    await db.exec(`reset role;`);
  }
}

async function startCheckout(
  plan: string,
  language: string,
  provider: string,
  currency: string
): Promise<string> {
  const res = await db.query<{ id: string }>(
    `select public.create_pending_payment($1,$2,$3,$4) as id`,
    [plan, language, provider, currency]
  );
  return res.rows[0].id;
}

beforeAll(async () => {
  db = await PGlite.create();
  await db.exec(SUPABASE_STUBS);
  await db.exec(readFileSync(MIGRATION_PATH, "utf8"));

  await db.exec(`
    insert into public.subscription_plans
      (plan_slug, language_slug, price_eur, discount_percent, title)
    values
      ('basic', 'italian', 5.99, 10, '{"en":"Basic"}'::jsonb),
      ('pro',   'italian', 7.99, 25, '{"en":"Pro"}'::jsonb),
      ('free',  'italian', 0.00,  0, '{"en":"Free"}'::jsonb),
      ('basic', 'english', 5.99,  0, '{"en":"Basic"}'::jsonb);

    insert into public.fx_rates (rate, source) values (2221600, 'tgju');

    grant usage on schema public to authenticated;
    grant all on all tables in schema public to authenticated;
  `);

  learnerId = await newUser("learner@test.local");
  await db.query(`set test.user_id = '${learnerId}'`);
}, 120_000);

describe("migration", () => {
  it("is safely re-runnable", async () => {
    await expect(db.exec(readFileSync(MIGRATION_PATH, "utf8"))).resolves.toBeDefined();
  });
});

describe("pricing is derived server-side", () => {
  it("matches lib/billing/money.ts for a discounted plan", async () => {
    const id = await startCheckout("basic", "italian", "stripe", "EUR");
    const { rows } = await db.query<{
      list_price_eur_cents: string;
      discount_eur_cents: string;
      amount_eur_cents: string;
      paid_amount: string;
    }>(`select * from public.payments where id = $1`, [id]);

    // €5.99 at 10% off, the same 539 cents the subscription UI displays.
    expect(Number(rows[0].list_price_eur_cents)).toBe(599);
    expect(Number(rows[0].amount_eur_cents)).toBe(539);
    expect(Number(rows[0].discount_eur_cents)).toBe(60);
    expect(Number(rows[0].paid_amount)).toBe(539);
  });

  it("converts to Rial using the stored rate and margin", async () => {
    const id = await startCheckout("basic", "italian", "zarinpal", "IRR");
    const { rows } = await db.query<{
      paid_amount: string;
      fx_rate: string;
      fx_source: string;
      amount_eur_cents: string;
    }>(`select * from public.payments where id = $1`, [id]);

    // 5.39 EUR * 2,221,600 * 1.025 = 12,274,163.8, rounded up to 10,000.
    expect(Number(rows[0].paid_amount)).toBe(12_280_000);
    // The rate is snapshotted so the row stays reconcilable forever.
    expect(Number(rows[0].fx_rate)).toBe(2_221_600);
    expect(rows[0].fx_source).toBe("tgju");
    // The euro value is recorded too, so reporting can normalise currencies.
    expect(Number(rows[0].amount_eur_cents)).toBe(539);
  });

  it("keeps a free plan free rather than charging one rounding step", async () => {
    const id = await startCheckout("free", "italian", "zarinpal", "IRR");
    const { rows } = await db.query<{ paid_amount: string }>(
      `select paid_amount from public.payments where id = $1`,
      [id]
    );
    expect(Number(rows[0].paid_amount)).toBe(0);
  });

  it("rejects an unknown plan instead of charging zero", async () => {
    await expect(
      startCheckout("enterprise", "italian", "stripe", "EUR")
    ).rejects.toThrow();
  });

  it("rejects an unsupported currency", async () => {
    await expect(startCheckout("basic", "italian", "stripe", "USD")).rejects.toThrow();
  });
});

describe("ledger integrity constraints", () => {
  it("refuses a row where list price does not equal net plus discount", async () => {
    await expect(
      db.query(
        `insert into public.payments
           (user_id, plan_slug, language_slug, list_price_eur_cents,
            discount_eur_cents, amount_eur_cents, paid_currency, paid_amount,
            provider, status)
         values ($1,'basic','italian', 599, 0, 100, 'EUR', 100, 'manual','succeeded')`,
        [learnerId]
      )
    ).rejects.toThrow();
  });

  it("refuses an IRR payment with no exchange rate to reconcile against", async () => {
    await expect(
      db.query(
        `insert into public.payments
           (user_id, plan_slug, language_slug, list_price_eur_cents,
            discount_eur_cents, amount_eur_cents, paid_currency, paid_amount,
            provider, status)
         values ($1,'basic','italian', 599, 60, 539, 'IRR', 12280000, 'zarinpal','succeeded')`,
        [learnerId]
      )
    ).rejects.toThrow();
  });
});

describe("settlement", () => {
  it("creates an active subscription and links the payment", async () => {
    const userId = await newUser("settle@test.local");
    await actAs(userId, async () => {
      const paymentId = await startCheckout("basic", "italian", "stripe", "EUR");
      const { rows } = await db.query<{ sub_id: string }>(
        `select public.settle_payment($1,'pi_1','ref') as sub_id`,
        [paymentId]
      );

      const sub = await db.query<{ status: string }>(
        `select status from public.subscriptions where id = $1`,
        [rows[0].sub_id]
      );
      expect(sub.rows[0].status).toBe("active");

      const pay = await db.query<{ status: string; subscription_id: string }>(
        `select status, subscription_id from public.payments where id = $1`,
        [paymentId]
      );
      expect(pay.rows[0].status).toBe("succeeded");
      expect(pay.rows[0].subscription_id).toBe(rows[0].sub_id);

      const events = await db.query<{ type: string }>(
        `select type from public.subscription_events where subscription_id = $1`,
        [rows[0].sub_id]
      );
      expect(events.rows.map((e) => e.type)).toEqual(["created"]);
    });
  });

  it("is idempotent, so a replayed webhook does not buy a second month", async () => {
    const userId = await newUser("replay@test.local");
    await actAs(userId, async () => {
      const first = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'pi_a','r')`, [first]);

      const second = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'pi_b','r')`, [second]);
      const once = await db.query<{ current_period_end: Date }>(
        `select current_period_end from public.subscriptions where user_id = $1`,
        [userId]
      );

      // Exact same call again, as a retrying gateway would make.
      await db.query(`select public.settle_payment($1,'pi_b','r')`, [second]);
      const twice = await db.query<{ current_period_end: Date }>(
        `select current_period_end from public.subscriptions where user_id = $1`,
        [userId]
      );

      expect(twice.rows[0].current_period_end.getTime()).toBe(
        once.rows[0].current_period_end.getTime()
      );
    });
  });

  it("stacks an early renewal on the existing period instead of truncating it", async () => {
    const userId = await newUser("early@test.local");
    await actAs(userId, async () => {
      const first = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'e1','r')`, [first]);
      const before = await db.query<{ current_period_end: Date }>(
        `select current_period_end from public.subscriptions where user_id=$1`,
        [userId]
      );

      const second = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'e2','r')`, [second]);
      const after = await db.query<{ current_period_end: Date }>(
        `select current_period_end from public.subscriptions where user_id=$1`,
        [userId]
      );

      const addedDays =
        (after.rows[0].current_period_end.getTime() -
          before.rows[0].current_period_end.getTime()) /
        86_400_000;
      expect(addedDays).toBeGreaterThanOrEqual(28);
      expect(addedDays).toBeLessThanOrEqual(31);
    });
  });

  it("restarts the clock for a lapsed subscriber rather than crediting unpaid time", async () => {
    const userId = await newUser("lapsed@test.local");
    await db.query(
      `insert into public.subscriptions
         (user_id, plan_slug, language_slug, status,
          current_period_start, current_period_end, anchor_day)
       values ($1,'basic','italian','past_due',
               now() - interval '60 days', now() - interval '30 days', 15)`,
      [userId]
    );

    await actAs(userId, async () => {
      const paymentId = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'l1','r')`, [paymentId]);
      const { rows } = await db.query<{
        status: string;
        current_period_start: Date;
      }>(
        `select status, current_period_start from public.subscriptions where user_id=$1`,
        [userId]
      );
      expect(rows[0].status).toBe("active");
      const startedDaysAgo =
        (Date.now() - rows[0].current_period_start.getTime()) / 86_400_000;
      expect(startedDaysAgo).toBeLessThan(1);
    });
  });

  it("never lets a settled payment be walked back to failed", async () => {
    const userId = await newUser("nowalkback@test.local");
    await actAs(userId, async () => {
      const paymentId = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'w1','r')`, [paymentId]);
      await db.query(`select public.fail_payment($1,'late failure')`, [paymentId]);
      const { rows } = await db.query<{ status: string }>(
        `select status from public.payments where id=$1`,
        [paymentId]
      );
      expect(rows[0].status).toBe("succeeded");
    });
  });

  it("allows only one live subscription per user and language", async () => {
    const userId = await newUser("dupe@test.local");
    await actAs(userId, async () => {
      const paymentId = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'d1','r')`, [paymentId]);
    });

    await expect(
      db.query(
        `insert into public.subscriptions
           (user_id, plan_slug, language_slug, status, current_period_end, anchor_day)
         values ($1,'pro','italian','active', now() + interval '30 days', 5)`,
        [userId]
      )
    ).rejects.toThrow();
  });

  it("treats each language as its own subscription", async () => {
    const userId = await newUser("multilang@test.local");
    await actAs(userId, async () => {
      const it1 = await startCheckout("basic", "italian", "stripe", "EUR");
      const itSub = await db.query<{ sub_id: string }>(
        `select public.settle_payment($1,'m1','r') as sub_id`,
        [it1]
      );
      const en1 = await startCheckout("basic", "english", "stripe", "EUR");
      const enSub = await db.query<{ sub_id: string }>(
        `select public.settle_payment($1,'m2','r') as sub_id`,
        [en1]
      );
      expect(enSub.rows[0].sub_id).not.toBe(itSub.rows[0].sub_id);
    });
  });
});

describe("anchor-day billing", () => {
  it("recovers the 31st after passing through February", async () => {
    const userId = await newUser("anchor@test.local");
    // Period end must be in the future, or the lapsed-subscriber rule applies.
    await db.query(
      `insert into public.subscriptions
         (user_id, plan_slug, language_slug, status,
          current_period_start, current_period_end, anchor_day)
       values ($1,'basic','italian','active',
               timestamptz '2027-01-01T00:00:00Z',
               timestamptz '2027-01-31T00:00:00Z', 31)`,
      [userId]
    );

    await actAs(userId, async () => {
      const p1 = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'an1','r')`, [p1]);
      const feb = await db.query<{ current_period_end: Date }>(
        `select current_period_end from public.subscriptions where user_id=$1`,
        [userId]
      );
      expect(feb.rows[0].current_period_end.toISOString()).toContain("2027-02-28");

      const p2 = await startCheckout("basic", "italian", "stripe", "EUR");
      await db.query(`select public.settle_payment($1,'an2','r')`, [p2]);
      const mar = await db.query<{ current_period_end: Date }>(
        `select current_period_end from public.subscriptions where user_id=$1`,
        [userId]
      );
      // Without an anchor this would stay on the 28th forever.
      expect(mar.rows[0].current_period_end.toISOString()).toContain("2027-03-31");
    });
  });
});

describe("sweeper", () => {
  it("moves lapsed subscriptions through past_due to expired", async () => {
    const userId = await newUser("sweep@test.local");
    await db.query(
      `insert into public.subscriptions
         (user_id, plan_slug, language_slug, status,
          current_period_start, current_period_end, anchor_day)
       values ($1,'basic','german','active', now() - interval '31 days',
               now() - interval '1 day', 1)`,
      [userId]
    );
    await db.query(
      `insert into public.subscriptions
         (user_id, plan_slug, language_slug, status,
          current_period_start, current_period_end, anchor_day)
       values ($1,'basic','turkish','active', now() - interval '60 days',
               now() - interval '30 days', 1)`,
      [userId]
    );

    await db.query(`select * from public.sweep_subscriptions()`);

    const german = await db.query<{ status: string }>(
      `select status from public.subscriptions where user_id=$1 and language_slug='german'`,
      [userId]
    );
    // One day past the end is still inside the 3-day grace window.
    expect(german.rows[0].status).toBe("past_due");

    const turkish = await db.query<{ status: string; ended_at: Date | null }>(
      `select status, ended_at from public.subscriptions where user_id=$1 and language_slug='turkish'`,
      [userId]
    );
    expect(turkish.rows[0].status).toBe("expired");
    expect(turkish.rows[0].ended_at).not.toBeNull();
  });
});

describe("self-service cancellation", () => {
  it("cancels at period end without taking away paid-for time", async () => {
    const userId = await newUser("cancel@test.local");
    let subId = "";
    await actAs(userId, async () => {
      const paymentId = await startCheckout("basic", "italian", "stripe", "EUR");
      const res = await db.query<{ sub_id: string }>(
        `select public.settle_payment($1,'c1','r') as sub_id`,
        [paymentId]
      );
      subId = res.rows[0].sub_id;
    });

    const before = await db.query<{ current_period_end: Date }>(
      `select current_period_end from public.subscriptions where id=$1`,
      [subId]
    );

    await actAs(userId, async () => {
      await db.query(`select public.cancel_my_subscription($1)`, [subId]);
    });

    const after = await db.query<{
      cancel_at_period_end: boolean;
      status: string;
      current_period_end: Date;
    }>(`select * from public.subscriptions where id=$1`, [subId]);

    expect(after.rows[0].cancel_at_period_end).toBe(true);
    expect(after.rows[0].status).toBe("active");
    expect(after.rows[0].current_period_end.getTime()).toBe(
      before.rows[0].current_period_end.getTime()
    );
  });

  it("cannot cancel a subscription belonging to someone else", async () => {
    const ownerId = await newUser("owner@test.local");
    const attackerId = await newUser("attacker@test.local");
    let subId = "";
    await actAs(ownerId, async () => {
      const paymentId = await startCheckout("basic", "italian", "stripe", "EUR");
      const res = await db.query<{ sub_id: string }>(
        `select public.settle_payment($1,'o1','r') as sub_id`,
        [paymentId]
      );
      subId = res.rows[0].sub_id;
    });

    await actAs(attackerId, async () => {
      await expect(
        db.query(`select public.cancel_my_subscription($1)`, [subId])
      ).rejects.toThrow();
    });
  });
});

describe("row level security", () => {
  it("shows a learner only their own payments", async () => {
    const { rows } = await asAuthenticated(learnerId, () =>
      db.query<{ user_id: string }>(`select user_id from public.payments`)
    );
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((r) => r.user_id === learnerId)).toBe(true);
  });

  it("blocks a learner from inserting into the ledger", async () => {
    await expect(
      asAuthenticated(learnerId, () =>
        db.query(
          `insert into public.payments
             (user_id, plan_slug, language_slug, list_price_eur_cents,
              discount_eur_cents, amount_eur_cents, paid_currency, paid_amount,
              provider, status)
           values ($1,'pro','italian', 0, 0, 0, 'EUR', 0, 'manual','succeeded')`,
          [learnerId]
        )
      )
    ).rejects.toThrow();
  });

  it("blocks a learner from marking their own payment as paid", async () => {
    const pending = await db.query<{ id: string }>(
      `select id from public.payments where user_id=$1 and status='pending' limit 1`,
      [learnerId]
    );

    const res = await asAuthenticated(learnerId, () =>
      db.query(`update public.payments set status='succeeded' where id=$1`, [
        pending.rows[0].id,
      ])
    );
    expect(res.affectedRows).toBe(0);

    const after = await db.query<{ status: string }>(
      `select status from public.payments where id=$1`,
      [pending.rows[0].id]
    );
    expect(after.rows[0].status).toBe("pending");
  });

  it("keeps the ledger append-only, with no delete path for anyone", async () => {
    const target = await db.query<{ id: string }>(
      `select id from public.payments where user_id=$1 limit 1`,
      [learnerId]
    );
    const before = await db.query<{ n: number }>(
      `select count(*)::int as n from public.payments`
    );

    await asAuthenticated(learnerId, () =>
      db.query(`delete from public.payments where id=$1`, [target.rows[0].id])
    );

    const after = await db.query<{ n: number }>(
      `select count(*)::int as n from public.payments`
    );
    expect(after.rows[0].n).toBe(before.rows[0].n);
  });

  it("blocks a learner from granting themselves a subscription", async () => {
    let blocked = false;
    try {
      const res = await asAuthenticated(learnerId, () =>
        db.query(
          `insert into public.subscriptions
             (user_id, plan_slug, language_slug, status, current_period_end, anchor_day)
           values ($1,'ultimate','german','active', now() + interval '10 years', 1)`,
          [learnerId]
        )
      );
      blocked = res.affectedRows === 0;
    } catch {
      blocked = true;
    }
    expect(blocked).toBe(true);
  });

  it("blocks a learner from editing pricing settings", async () => {
    const res = await asAuthenticated(learnerId, () =>
      db.query(`update public.payment_settings set fx_margin_percent = 0`)
    );
    expect(res.affectedRows).toBe(0);

    const after = await db.query<{ fx_margin_percent: string }>(
      `select fx_margin_percent from public.payment_settings where id='default'`
    );
    expect(Number(after.rows[0].fx_margin_percent)).toBe(2.5);
  });

  it("hides raw webhook payloads from learners", async () => {
    const { rows } = await asAuthenticated(learnerId, () =>
      db.query(`select * from public.webhook_events`)
    );
    expect(rows).toHaveLength(0);
  });

  it("does not let a learner call settle_payment directly", async () => {
    const pending = await db.query<{ id: string }>(
      `select id from public.payments where user_id=$1 and status='pending' limit 1`,
      [learnerId]
    );
    await expect(
      asAuthenticated(learnerId, () =>
        db.query(`select public.settle_payment($1,'forged','forged')`, [
          pending.rows[0].id,
        ])
      )
    ).rejects.toThrow();
  });

  it("lets an admin read the whole ledger", async () => {
    const adminId = await newUser("admin@test.local", true);
    const { rows } = await asAuthenticated(adminId, () =>
      db.query<{ user_id: string }>(`select distinct user_id from public.payments`)
    );
    expect(rows.length).toBeGreaterThan(1);
  });
});
