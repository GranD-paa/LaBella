import { query, execute } from "@/lib/data/postgres/client";

/**
 * How many messages this app is willing to send, and to whom.
 *
 * The shape follows what the abuse actually looks like rather than one number
 * per channel. A verification code has three different victims — the person
 * whose phone rings, the account being farmed, and the bill — and each wants
 * a different limit:
 *
 *   - a cooldown per recipient, which is what stops the "press resend fifty
 *     times" case and is the single most effective rule here;
 *   - a daily cap per recipient, which is what stops a stranger's phone being
 *     used as a doorbell;
 *   - an hourly cap per IP, deliberately looser than the per-recipient one,
 *     because an Iranian mobile IP behind carrier NAT carries dozens of real
 *     users and a tight limit there locks out the innocent;
 *   - a daily ceiling for the whole app, which is not an anti-abuse rule at
 *     all — it is what keeps a bug from burning the SMS credit or getting the
 *     mailbox suspended for exceeding its sending quota overnight.
 *
 * The counters live in Postgres (`db/005_send_limits.sql`) rather than in
 * process memory, because a limit that a deploy resets is a limit an attacker
 * waits out.
 *
 * The one rule not enforced here, because it belongs to the caller: whether a
 * send happened or was refused must look identical to whoever asked. A
 * different response turns this into a way of discovering which numbers and
 * addresses have accounts.
 */

export type SendChannel = "sms" | "email";

type Rule = {
  scope: "phone" | "email" | "ip" | "global";
  max: number;
  windowMs: number;
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * A code costs money to send and rings a real phone, so the recipient rules
 * are strict and the IP rule is not.
 */
const SMS_RULES: Rule[] = [
  { scope: "phone", max: 1, windowMs: MINUTE },
  { scope: "phone", max: 3, windowMs: DAY },
  { scope: "ip", max: 15, windowMs: HOUR },
  { scope: "global", max: 300, windowMs: DAY },
];

/**
 * Nothing in the product mails a stranger — an address only receives once it
 * belongs to an account — so these are quota guards rather than defences.
 */
const EMAIL_RULES: Rule[] = [
  { scope: "email", max: 3, windowMs: DAY },
  { scope: "ip", max: 20, windowMs: HOUR },
  { scope: "global", max: 400, windowMs: DAY },
];

const RULES: Record<SendChannel, Rule[]> = {
  sms: SMS_RULES,
  email: EMAIL_RULES,
};

/** The subject a `global` row is counted against. */
const GLOBAL_KEY = "all";

export type SendSubjects = {
  /** The phone number or email address the message is aimed at. */
  recipient: string;
  /** The caller's IP, when there is one to attribute this to. */
  ip?: string | null;
};

/**
 * Whether one more message may go out, and the counting of it if so.
 *
 * Deliberately one call rather than a check and a separate record: two calls
 * leave a window where several requests all pass the check before any of them
 * writes, which is exactly the burst this is meant to stop.
 *
 * Returns `false` when any rule is at its limit. It never throws for a full
 * bucket; a caller that cannot send should carry on as if it had.
 */
export async function claimSend(
  channel: SendChannel,
  subjects: SendSubjects
): Promise<boolean> {
  const rules = RULES[channel];
  const recipient = subjects.recipient.trim().toLowerCase();
  const ip = subjects.ip?.trim() || null;

  for (const rule of rules) {
    const subject = subjectFor(rule.scope, recipient, ip);
    // An IP rule with no IP to blame cannot be enforced; skipping it is
    // better than counting every anonymous request against one bucket.
    if (subject === null) continue;

    const since = new Date(Date.now() - rule.windowMs);
    const rows = await query<{ used: string }>(
      `select count(*)::text as used
         from public.send_attempts
        where channel = $1 and scope = $2 and subject = $3
          and created_at >= $4`,
      [channel, rule.scope, subject, since]
    );

    if (Number(rows[0]?.used ?? 0) >= rule.max) return false;
  }

  // Past every rule: write one row per scope, so the next call sees this send.
  for (const rule of rules) {
    const subject = subjectFor(rule.scope, recipient, ip);
    if (subject === null) continue;

    await execute(
      `insert into public.send_attempts (channel, scope, subject)
       values ($1, $2, $3)`,
      [channel, rule.scope, subject]
    );
  }

  void prune();
  return true;
}

function subjectFor(
  scope: Rule["scope"],
  recipient: string,
  ip: string | null
): string | null {
  switch (scope) {
    case "global":
      return GLOBAL_KEY;
    case "ip":
      return ip;
    default:
      // 'phone' and 'email' are both the recipient; the scope name is there so
      // a number and an address can never collide in one bucket.
      return recipient;
  }
}

/**
 * Drops rows older than any window, roughly once an hour.
 *
 * Opportunistic rather than scheduled: a cron job is one more thing to set up
 * on a host and one more thing to notice has stopped running, and the table
 * only grows while sends are happening anyway.
 */
let lastPruneAt = 0;

async function prune(): Promise<void> {
  const now = Date.now();
  if (now - lastPruneAt < HOUR) return;
  lastPruneAt = now;

  try {
    await execute(
      "delete from public.send_attempts where created_at < now() - interval '2 days'"
    );
  } catch {
    // Housekeeping must never be the reason a message did not go out.
  }
}
