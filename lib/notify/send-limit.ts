import { withTransaction } from "@/lib/data/postgres/client";

/**
 * How many messages this app is willing to send, and to whom.
 *
 * The shape follows what the abuse actually looks like rather than one number
 * per channel. A verification code has three different victims — the person
 * whose phone rings, the bill, and the queue of real people trying to sign in
 * — and each wants a different rule:
 *
 *   - an escalating gap per number, which is what stops "press resend fifty
 *     times" and is the single most effective rule here;
 *   - a daily cap per number, so a stranger's phone cannot be used as a
 *     doorbell;
 *   - a cap per IP on how many DIFFERENT numbers it asks about, which is the
 *     actual signature of SMS pumping. A plain count per IP cannot see it: a
 *     carrier NAT legitimately sends plenty, and a script walking a number
 *     range sends no more than a busy office does;
 *   - a ceiling for the whole app, which is not an anti-abuse rule at all —
 *     it keeps a bug from burning the SMS credit overnight.
 *
 * The counters live in Postgres (`db/005_send_limits.sql`, widened by 008)
 * rather than in process memory, because a limit that a deploy resets is a
 * limit an attacker waits out.
 *
 * The one rule not enforced here, because it belongs to the caller: whether a
 * send happened or was refused must not reveal whether the number has an
 * account. Refusals here are about a number's own recent history, which
 * anyone can discover about their own number, so returning the wait is safe;
 * returning "no such account" would not be.
 */

export type SendChannel = "sms" | "email";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * The wait before the nth code to one number, counting from the first.
 *
 * The first is free — a real person who mistyped their number should not be
 * punished for fixing it. After that the gap is a flat two minutes, which is
 * exactly how long a code lives: a resend becomes available at the moment the
 * old code dies, and never before. Five is the day's allowance, and the sixth
 * attempt waits until tomorrow — the ceiling, not the climb, is what stops
 * someone pestering a stranger's phone.
 */
const PHONE_LADDER_MS = [0, 2 * MINUTE, 2 * MINUTE, 2 * MINUTE, 2 * MINUTE];
const PHONE_DAILY_MAX = PHONE_LADDER_MS.length;

/**
 * Deliberately looser than the per-number rules, and looser than it used to
 * be, because the old numbers did not match their own reasoning.
 *
 * An Iranian mobile carrier does not give a subscriber a public address. It
 * puts thousands of them behind one, so "ten different numbers from this IP
 * in an hour" is not a household — it is ten customers, and the eleventh real
 * person to open the app on mobile data was being turned away for what the
 * ten before them did. That is the failure this cap was least able to
 * survive: it gets worse exactly as the product succeeds.
 *
 * What actually protects a stranger's phone is the per-number ladder above —
 * five codes a day, two minutes apart, and no IP can lift that. These
 * counters exist for a different animal: a script walking a number range,
 * which does not do forty numbers an hour, it does hundreds. Set high enough
 * to miss the crowd and still catch the script.
 */
const IP_SENDS_PER_HOUR = 60;
const IP_DISTINCT_RECIPIENTS_PER_HOUR = 40;

/**
 * Cheap proxy pools rent whole /24s; one IP moving is not one attacker
 * leaving. Raised with the per-IP numbers for the same reason — a carrier's
 * /24 is a city, not a customer.
 */
const SUBNET_SENDS_PER_HOUR = 200;

/**
 * The global ceiling, and the one thing about it that matters:
 *
 * a cap on everything is also a lever an attacker can pull. Burn it and real
 * sign-ins stop. So it counts only codes going to numbers with no account —
 * whatever a flood does to the budget, an existing customer can always get
 * back in.
 */
const GLOBAL_SENDS_PER_HOUR = 200;
const GLOBAL_SENDS_PER_DAY = 300;

const EMAIL_PER_ADDRESS_PER_DAY = 3;
const EMAIL_ADDRESS_COOLDOWN_MS = 1 * MINUTE;
const EMAIL_SENDS_PER_IP_PER_HOUR = 20;
const EMAIL_SENDS_PER_DAY = 400;

const GLOBAL_KEY = "all";

export type SendSubjects = {
  /** The phone number in E.164, or the email address. */
  recipient: string;
  /** The caller's IP, when there is one to attribute this to. */
  ip?: string | null;
  /**
   * Whether the recipient already has an account.
   *
   * Only consulted for SMS, and only to decide whether the global ceiling
   * applies. Defaults to false, which is the safe reading for a caller that
   * has not checked.
   */
  hasAccount?: boolean;
};

export type SendRefusal =
  /** This number may have another code, just not yet. */
  | { allowed: false; reason: "cooldown"; retryAfterMs: number }
  /** This number has had its share for today. */
  | { allowed: false; reason: "daily"; retryAfterMs: number }
  /** This address, or the range it sits in, is asking about too many numbers. */
  | { allowed: false; reason: "origin" }
  /** The app itself is at its ceiling, or could not count. */
  | { allowed: false; reason: "capacity" };

export type SendAllowed = {
  allowed: true;
  /**
   * How long before this recipient may have another.
   *
   * Handed back so the form can run an honest countdown instead of guessing
   * at the ladder, and so the two cannot drift apart when the ladder changes.
   */
  nextGapMs: number;
};

export type SendDecision = SendAllowed | SendRefusal;

const REFUSED_UNCOUNTABLE: SendRefusal = { allowed: false, reason: "capacity" };

/**
 * Whether one more message may go out, and the counting of it if so.
 *
 * One call rather than a check and a separate record, and — unlike the
 * version this replaces — actually atomic. That one ran every SELECT and then
 * every INSERT with nothing between them: twenty simultaneous requests all
 * read zero, all passed, and all wrote, which turned "one per minute" into
 * "as many as you can send at once". The transaction and the advisory locks
 * below are what close that.
 *
 * Refuses when the counters cannot be read at all. These limits guard a bill
 * and a stranger's phone, and a send we are unable to count is exactly the
 * send worth skipping. Nothing is lost by it either — every path that sends
 * needs the database anyway.
 */
export async function claimSend(
  channel: SendChannel,
  subjects: SendSubjects
): Promise<SendDecision> {
  try {
    return await countAndClaim(channel, subjects);
  } catch {
    return REFUSED_UNCOUNTABLE;
  }
}

async function countAndClaim(
  channel: SendChannel,
  subjects: SendSubjects
): Promise<SendDecision> {
  const recipient = subjects.recipient.trim().toLowerCase();
  const ip = subjects.ip?.trim() || null;
  const subnet = ip ? subnetOf(ip) : null;
  const recipientScope = channel === "sms" ? "phone" : "email";

  return withTransaction(async (run) => {
    // Locking by number serialises the burst the old code let through. The IP
    // is locked too, because a pumping script hits many different numbers at
    // once and would otherwise race past the distinct-number cap on all of
    // them. Both keys are sorted before locking, so two requests that share a
    // lock can never take them in opposite orders and deadlock.
    const keys = [`${channel}:${recipientScope}:${recipient}`];
    if (ip) {
      keys.push(`${channel}:ip:${ip}`);
    }
    await run(
      `select pg_advisory_xact_lock(h)
         from (select hashtext(k) as h
                 from unnest($1::text[]) as k
                order by 1) as locks`,
      [keys]
    );

    const counts = await readCounts(
      run,
      channel,
      recipientScope,
      recipient,
      ip,
      subnet
    );
    const decision =
      channel === "sms"
        ? decideSms(counts, subjects.hasAccount === true)
        : decideEmail(counts);

    if (!decision.allowed) {
      return decision;
    }

    const scopes = [recipientScope, "global"];
    const subjectValues = [recipient, GLOBAL_KEY];
    if (ip) {
      scopes.push("ip");
      subjectValues.push(ip);
    }
    if (subnet) {
      scopes.push("subnet");
      subjectValues.push(subnet);
    }

    await run(
      `insert into public.send_attempts (channel, scope, subject, target)
       select $1, s.scope, s.subject, $2
         from unnest($3::text[], $4::text[]) as s(scope, subject)`,
      [channel, recipient, scopes, subjectValues]
    );

    void prune();
    return decision;
  });
}

export type Counts = {
  recipientDay: number;
  msSinceRecipientLast: number | null;
  ipHour: number;
  ipDistinctHour: number;
  subnetHour: number;
  globalHour: number;
  globalDay: number;
};

type Run = (text: string, values?: unknown[]) => Promise<unknown[]>;

async function readCounts(
  run: Run,
  channel: SendChannel,
  recipientScope: string,
  recipient: string,
  ip: string | null,
  subnet: string | null
): Promise<Counts> {
  const rows = (await run(
    `with recent as (
       select scope, subject, target, created_at
         from public.send_attempts
        where channel = $1 and created_at >= now() - interval '24 hours'
     )
     select
       (select count(*) from recent
         where scope = $2 and subject = $3)                     as recipient_day,
       (select extract(epoch from now() - max(created_at)) * 1000 from recent
         where scope = $2 and subject = $3)                     as ms_since_last,
       (select count(*) from recent
         where scope = 'ip' and subject = $4
           and created_at >= now() - interval '1 hour')         as ip_hour,
       (select count(distinct target) from recent
         where scope = 'ip' and subject = $4
           and created_at >= now() - interval '1 hour')         as ip_distinct_hour,
       (select count(*) from recent
         where scope = 'subnet' and subject = $5
           and created_at >= now() - interval '1 hour')         as subnet_hour,
       (select count(*) from recent
         where scope = 'global'
           and created_at >= now() - interval '1 hour')         as global_hour,
       (select count(*) from recent where scope = 'global')     as global_day`,
    [channel, recipientScope, recipient, ip, subnet]
  )) as Array<Record<string, unknown>>;

  const row = rows[0] ?? {};
  const num = (key: string): number => Number(row[key] ?? 0);
  const sinceLast = row.ms_since_last;

  return {
    recipientDay: num("recipient_day"),
    msSinceRecipientLast:
      sinceLast === null || sinceLast === undefined ? null : Number(sinceLast),
    ipHour: num("ip_hour"),
    ipDistinctHour: num("ip_distinct_hour"),
    subnetHour: num("subnet_hour"),
    globalHour: num("global_hour"),
    globalDay: num("global_day"),
  };
}

/**
 * Exported for its tests. The ladder and the ceilings are pure arithmetic
 * over counts and belong under test; the atomicity around them is a
 * transaction and two advisory locks, which only a real Postgres can prove.
 */
export function decideSms(counts: Counts, hasAccount: boolean): SendDecision {
  if (counts.recipientDay >= PHONE_DAILY_MAX) {
    return { allowed: false, reason: "daily", retryAfterMs: DAY };
  }

  const requiredGap = PHONE_LADDER_MS[counts.recipientDay] ?? 0;
  const elapsed = counts.msSinceRecipientLast;
  if (requiredGap > 0 && elapsed !== null && elapsed < requiredGap) {
    return {
      allowed: false,
      reason: "cooldown",
      retryAfterMs: Math.ceil(requiredGap - elapsed),
    };
  }

  if (
    counts.ipHour >= IP_SENDS_PER_HOUR ||
    counts.ipDistinctHour >= IP_DISTINCT_RECIPIENTS_PER_HOUR ||
    counts.subnetHour >= SUBNET_SENDS_PER_HOUR
  ) {
    return { allowed: false, reason: "origin" };
  }

  // Strangers share the ceiling; customers are never locked out by it.
  if (
    !hasAccount &&
    (counts.globalHour >= GLOBAL_SENDS_PER_HOUR ||
      counts.globalDay >= GLOBAL_SENDS_PER_DAY)
  ) {
    return { allowed: false, reason: "capacity" };
  }

  // The gap the send being allowed right now will impose on the next one.
  const sentAfterThis = counts.recipientDay + 1;
  return {
    allowed: true,
    nextGapMs:
      sentAfterThis >= PHONE_DAILY_MAX ? DAY : PHONE_LADDER_MS[sentAfterThis],
  };
}

export function decideEmail(counts: Counts): SendDecision {
  if (counts.recipientDay >= EMAIL_PER_ADDRESS_PER_DAY) {
    return { allowed: false, reason: "daily", retryAfterMs: DAY };
  }

  const elapsed = counts.msSinceRecipientLast;
  if (elapsed !== null && elapsed < EMAIL_ADDRESS_COOLDOWN_MS) {
    return {
      allowed: false,
      reason: "cooldown",
      retryAfterMs: Math.ceil(EMAIL_ADDRESS_COOLDOWN_MS - elapsed),
    };
  }
  if (counts.ipHour >= EMAIL_SENDS_PER_IP_PER_HOUR) {
    return { allowed: false, reason: "origin" };
  }
  if (counts.globalDay >= EMAIL_SENDS_PER_DAY) {
    return { allowed: false, reason: "capacity" };
  }
  return { allowed: true, nextGapMs: EMAIL_ADDRESS_COOLDOWN_MS };
}

/**
 * Gives back a claim whose message never left.
 *
 * Only for the case where the gateway itself failed: the quota was spent on
 * nothing, and making someone wait out the ladder for a code that was never
 * sent turns an outage into a lockout. Deliberately narrow — it deletes only
 * this recipient's rows from the last few seconds, so it cannot be used to
 * wipe a history.
 *
 * Claiming first and releasing on failure, rather than sending first and
 * counting after, is the safe order: a gateway that hangs must not become a
 * free channel for the burst the limits exist to stop.
 */
export async function releaseSend(
  channel: SendChannel,
  recipient: string
): Promise<void> {
  try {
    const { execute } = await import("@/lib/data/postgres/client");
    await execute(
      `delete from public.send_attempts
        where channel = $1
          and target = $2
          and created_at >= now() - interval '10 seconds'`,
      [channel, recipient.trim().toLowerCase()]
    );
  } catch {
    // A refund we could not make costs the user one cooldown, not their account.
  }
}

/**
 * The range an address sits in: /24 for IPv4, /64 for IPv6.
 *
 * Both are the smallest block normally handed out as a unit, so they are the
 * granularity at which "one more IP" actually costs an attacker something.
 */
export function subnetOf(ip: string): string | null {
  const v4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.\d{1,3}$/.exec(ip);
  if (v4) {
    return `${v4[1]}.${v4[2]}.${v4[3]}.0/24`;
  }
  if (ip.includes(":")) {
    const groups = ip.split(":").slice(0, 4);
    return groups.length === 4 ? `${groups.join(":")}::/64` : null;
  }
  return null;
}

/**
 * Drops rows older than any window, roughly once an hour.
 *
 * Opportunistic rather than scheduled: a cron job is one more thing to set up
 * on a host and one more thing to notice has stopped running, and the tables
 * only grow while sends are happening anyway.
 */
let lastPruneAt = 0;

async function prune(): Promise<void> {
  const now = Date.now();
  if (now - lastPruneAt < HOUR) {
    return;
  }
  lastPruneAt = now;

  try {
    const { execute } = await import("@/lib/data/postgres/client");
    await execute(
      "delete from public.send_attempts where created_at < now() - interval '2 days'"
    );
    await execute(
      "delete from public.otp_attempts where created_at < now() - interval '2 days'"
    );
    await execute(
      "delete from public.otp_challenges where used_at < now() - interval '1 day'"
    );
  } catch {
    // Housekeeping must never be the reason a message did not go out.
  }
}
