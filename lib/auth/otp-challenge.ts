import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import { execute } from "@/lib/data/postgres/client";
import { leadingZeroBits } from "@/lib/auth/sha256";
import {
  challengePayload,
  type Challenge,
  type SolvedChallenge,
} from "@/lib/auth/otp-challenge-solver";

/**
 * A small toll in front of the code request. Server only — it holds the
 * signing secret. The browser's half lives in `otp-challenge-solver.ts`.
 *
 * What this is for, stated plainly so nobody mistakes it for more than it is:
 * the endpoint that sends an SMS is now one public field, and the scripts that
 * bomb such endpoints are `curl` in a loop. Requiring a signed, single-use
 * ticket that costs a little CPU to stamp turns that loop into "reimplement
 * the handshake and the hash first" — which is most of the way to never being
 * bothered, because those scripts are aimed at whoever left the door open.
 *
 * What it is NOT: a defence against someone who wants *this* app. A server
 * stamps these thousands of times a second. The rules in `send-limit.ts` are
 * what actually bound the damage; this only raises the floor.
 *
 * Three properties, in the order they matter:
 *
 *   - **signed**, so the server keeps no state between issuing and redeeming
 *     and a challenge cannot be invented;
 *   - **single-use**, enforced by inserting the nonce — the primary key is
 *     the check, so there is no read to race against;
 *   - **short-lived**, so a stockpile of pre-solved tickets goes stale.
 */

/**
 * Leading zero bits required of the solution's digest.
 *
 * 17 bits is about 130,000 hashes: a quarter-second on a laptop, a second or
 * two on a mid-range phone. It is free in practice because the browser starts
 * solving when the field is focused and the user then spends several seconds
 * typing eleven digits — the answer is ready before they press the button.
 */
export const CHALLENGE_DIFFICULTY = 17;

/** Long enough to type a phone number, short enough that stockpiling is pointless. */
const CHALLENGE_TTL_MS = 120_000;

/** Clocks disagree; a ticket from just after "now" is a skew, not an attack. */
const CLOCK_SKEW_MS = 5_000;

export type { Challenge, SolvedChallenge };

function secret(): string {
  const value = process.env.BETTER_AUTH_SECRET?.trim();
  if (value) {
    return value;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("BETTER_AUTH_SECRET is not set — cannot sign OTP challenges.");
  }
  return "laparli-development-challenge-secret";
}

function sign(nonce: string, issuedAt: number, difficulty: number): string {
  return createHmac("sha256", secret())
    .update(`${nonce}.${issuedAt}.${difficulty}`)
    .digest("hex");
}

export function issueChallenge(): Challenge {
  const nonce = randomBytes(16).toString("hex");
  const issuedAt = Date.now();
  return {
    nonce,
    issuedAt,
    difficulty: CHALLENGE_DIFFICULTY,
    signature: sign(nonce, issuedAt, CHALLENGE_DIFFICULTY),
  };
}

function signatureMatches(candidate: SolvedChallenge): boolean {
  const expected = sign(candidate.nonce, candidate.issuedAt, candidate.difficulty);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(candidate.signature ?? "", "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export type ChallengeVerdict =
  | { ok: true }
  /** Forged, stale, unsolved, or already spent — all one answer on purpose. */
  | { ok: false; reason: "invalid" };

const INVALID: ChallengeVerdict = { ok: false, reason: "invalid" };

/**
 * Checks the ticket and spends it, in that order.
 *
 * The cheap tests run first so a flood of forgeries never reaches the
 * database, and the insert runs last so a valid ticket is only consumed once
 * everything else about it holds.
 */
export async function redeemChallenge(
  candidate: SolvedChallenge | null | undefined
): Promise<ChallengeVerdict> {
  if (!candidate || typeof candidate.nonce !== "string") {
    return INVALID;
  }
  if (candidate.difficulty !== CHALLENGE_DIFFICULTY) {
    return INVALID;
  }
  if (!/^[0-9a-f]{32}$/.test(candidate.nonce)) {
    return INVALID;
  }
  if (!signatureMatches(candidate)) {
    return INVALID;
  }

  const age = Date.now() - candidate.issuedAt;
  if (age > CHALLENGE_TTL_MS || age < -CLOCK_SKEW_MS) {
    return INVALID;
  }

  const counter = String(candidate.counter ?? "");
  if (!/^\d{1,12}$/.test(counter)) {
    return INVALID;
  }
  if (leadingZeroBits(challengePayload(candidate.nonce, counter)) < candidate.difficulty) {
    return INVALID;
  }

  try {
    const spent = await execute(
      `insert into public.otp_challenges (nonce)
       values ($1)
       on conflict (nonce) do nothing`,
      [candidate.nonce]
    );
    // Zero rows means the nonce was already spent. Fail closed on a database
    // error too: a ticket we cannot record is a ticket that can be replayed.
    return spent === 1 ? { ok: true } : INVALID;
  } catch {
    return INVALID;
  }
}
