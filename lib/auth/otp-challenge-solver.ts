import { leadingZeroBits } from "@/lib/auth/sha256";

/**
 * The client half of the OTP challenge.
 *
 * Separate from `otp-challenge.ts` because that one is `server-only` — it
 * holds the signing secret — while this runs in the browser. The one thing
 * both sides must agree on is the string being hashed, so it is defined here,
 * on the side that cannot import the other.
 */

export type Challenge = {
  nonce: string;
  issuedAt: number;
  difficulty: number;
  signature: string;
};

export type SolvedChallenge = Challenge & { counter: string };

/** The string both sides hash. Kept in one place so they cannot drift apart. */
export function challengePayload(nonce: string, counter: string): string {
  return `${nonce}.${counter}`;
}

/**
 * Give up rather than pin a slow phone to a spinner forever.
 *
 * At 17 bits a solution turns up within a few hundred thousand tries with
 * overwhelming probability; a run this long means something is wrong, and a
 * user who cannot sign in at all is worse than a request that goes through
 * without its toll.
 */
const MAX_ATTEMPTS = 8_000_000;

/** How many hashes to run before handing the frame back to the browser. */
const SLICE = 4_000;

/**
 * Hunts for a counter whose digest starts with enough zero bits.
 *
 * Yields every few thousand tries so typing stays smooth — this is meant to
 * run *while* the user fills in their number, not after they submit, which is
 * the whole reason the wait is invisible.
 */
export async function solveChallenge(
  challenge: Challenge,
  signal?: AbortSignal
): Promise<SolvedChallenge | null> {
  for (let counter = 0; counter < MAX_ATTEMPTS; counter += 1) {
    if (leadingZeroBits(challengePayload(challenge.nonce, String(counter))) >= challenge.difficulty) {
      return { ...challenge, counter: String(counter) };
    }

    if (counter % SLICE === SLICE - 1) {
      if (signal?.aborted) {
        return null;
      }
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
  return null;
}
