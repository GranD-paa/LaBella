import { execute, queryOne } from "@/lib/data/postgres/client";

/**
 * A limit on guessing the code, and the reason Better Auth's own is not
 * enough.
 *
 * The plugin counts attempts against the code it issued, so the counter dies
 * with the code. "Request a code, guess three times, request another" walks
 * the six-digit space at three tries a code, and the only thing standing in
 * the way is the send limit — which is about the bill and the stranger's
 * phone, not about the guessing.
 *
 * This counter is attached to the NUMBER and outlives every code sent to it.
 * Ten wrong answers in an hour and that number stops being asked, however
 * many fresh codes were fetched in between.
 *
 * Ten, not three: a real person mistypes, reads the wrong message, or pastes
 * a stale code from an earlier attempt, and locking them out on the third
 * fumble makes an angry support ticket out of a typo. Ten still leaves an
 * attacker needing about four thousand hours to cover the space.
 */

const WRONG_ANSWERS_PER_HOUR = 10;
const WINDOW = "1 hour";

export type VerifyGate =
  | { allowed: true }
  /** Locked; `retryAfterMs` is until the oldest wrong answer ages out. */
  | { allowed: false; retryAfterMs: number };

/**
 * Whether this number may be asked about a code at all.
 *
 * Fails closed. A guess we cannot count is a guess worth refusing — the cost
 * is one signed-in user waiting, the alternative is an uncounted brute force.
 */
export async function checkVerifyAllowed(phone: string): Promise<VerifyGate> {
  try {
    const row = await queryOne<{ wrong: string; ms_until_free: string | null }>(
      `select count(*)::text as wrong,
              (extract(epoch from (min(created_at) + interval '${WINDOW}' - now())) * 1000)::text
                as ms_until_free
         from public.otp_attempts
        where phone = $1
          and succeeded = false
          and created_at >= now() - interval '${WINDOW}'`,
      [phone]
    );

    if (Number(row?.wrong ?? 0) < WRONG_ANSWERS_PER_HOUR) {
      return { allowed: true };
    }
    return {
      allowed: false,
      retryAfterMs: Math.max(1000, Math.ceil(Number(row?.ms_until_free ?? 0))),
    };
  } catch {
    return { allowed: false, retryAfterMs: 60_000 };
  }
}

/**
 * Records what happened, and clears the slate on a right answer.
 *
 * Clearing matters: without it, a user who fumbled nine times and then got in
 * would be one mistake from a lockout for the rest of the hour, on an account
 * they have just proved is theirs.
 */
export async function recordVerifyAttempt(
  phone: string,
  succeeded: boolean
): Promise<void> {
  try {
    if (succeeded) {
      await execute("delete from public.otp_attempts where phone = $1", [phone]);
      return;
    }
    await execute(
      "insert into public.otp_attempts (phone, succeeded) values ($1, false)",
      [phone]
    );
  } catch {
    // A counter we could not write is not worth failing the sign-in over; the
    // gate above already refuses when it cannot read.
  }
}
