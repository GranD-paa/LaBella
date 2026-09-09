import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * The nonce table is the single-use check, so it is the one thing that has to
 * behave like the real one: an insert of a nonce already there touches no
 * rows. A Set reproduces exactly that, without a database.
 */
const spent = new Set<string>();
const executeFails = { value: false };

vi.mock("@/lib/data/postgres/client", () => ({
  execute: vi.fn(async (_sql: string, values: unknown[]) => {
    if (executeFails.value) {
      throw new Error("database is down");
    }
    const nonce = String(values[0]);
    if (spent.has(nonce)) {
      return 0;
    }
    spent.add(nonce);
    return 1;
  }),
}));

// `vi.mock` is hoisted above these, so the import below already sees the fake.
import {
  CHALLENGE_DIFFICULTY,
  issueChallenge,
  redeemChallenge,
} from "./otp-challenge";
import { solveChallenge } from "./otp-challenge-solver";

async function solved() {
  const challenge = issueChallenge();
  const answer = await solveChallenge(challenge);
  if (!answer) {
    throw new Error("no solution found");
  }
  return answer;
}

describe("issueChallenge", () => {
  it("hands out a fresh nonce each time", () => {
    const seen = new Set(Array.from({ length: 50 }, () => issueChallenge().nonce));
    expect(seen.size).toBe(50);
  });

  it("states the difficulty the verifier will require", () => {
    expect(issueChallenge().difficulty).toBe(CHALLENGE_DIFFICULTY);
  });
});

describe("redeemChallenge", () => {
  beforeEach(() => {
    spent.clear();
    executeFails.value = false;
    vi.useRealTimers();
  });

  it("accepts a ticket that was signed here and solved honestly", async () => {
    expect(await redeemChallenge(await solved())).toEqual({ ok: true });
  });

  it("refuses the same ticket a second time", async () => {
    const answer = await solved();
    expect(await redeemChallenge(answer)).toEqual({ ok: true });
    expect(await redeemChallenge(answer)).toEqual({ ok: false, reason: "invalid" });
  });

  it("refuses a forged signature", async () => {
    const answer = await solved();
    const forged = { ...answer, signature: "0".repeat(64) };
    expect(await redeemChallenge(forged)).toEqual({ ok: false, reason: "invalid" });
  });

  it("refuses a nonce that was never signed", async () => {
    const answer = await solved();
    const swapped = { ...answer, nonce: "a".repeat(32) };
    expect(await redeemChallenge(swapped)).toEqual({ ok: false, reason: "invalid" });
  });

  it("refuses a counter that does not solve the puzzle", async () => {
    const challenge = issueChallenge();
    const unsolved = { ...challenge, counter: "1" };
    expect(await redeemChallenge(unsolved)).toEqual({ ok: false, reason: "invalid" });
  });

  it("refuses a ticket that has gone stale", async () => {
    const answer = await solved();
    const stale = { ...answer, issuedAt: answer.issuedAt - 121_000 };
    expect(await redeemChallenge(stale)).toEqual({ ok: false, reason: "invalid" });
  });

  it("refuses a ticket stamped in the future beyond clock skew", async () => {
    const answer = await solved();
    const ahead = { ...answer, issuedAt: answer.issuedAt + 60_000 };
    expect(await redeemChallenge(ahead)).toEqual({ ok: false, reason: "invalid" });
  });

  it("refuses a difficulty the client lowered for itself", async () => {
    const answer = await solved();
    const easier = { ...answer, difficulty: 1 };
    expect(await redeemChallenge(easier)).toEqual({ ok: false, reason: "invalid" });
  });

  it.each([null, undefined, {} as never, { nonce: 42 } as never])(
    "refuses junk (%s)",
    async (input) => {
      expect(await redeemChallenge(input)).toEqual({ ok: false, reason: "invalid" });
    }
  );

  it("refuses a counter that is not a plain number", async () => {
    const answer = await solved();
    expect(
      await redeemChallenge({ ...answer, counter: "1e9" })
    ).toEqual({ ok: false, reason: "invalid" });
  });

  it("fails closed when the nonce cannot be recorded", async () => {
    const answer = await solved();
    executeFails.value = true;
    expect(await redeemChallenge(answer)).toEqual({ ok: false, reason: "invalid" });
  });
});

describe("solveChallenge", () => {
  it("finds a counter whose digest clears the difficulty", async () => {
    const challenge = issueChallenge();
    const answer = await solveChallenge(challenge);
    expect(answer).not.toBeNull();
    expect(Number(answer!.counter)).toBeGreaterThanOrEqual(0);
  });

  it("gives up when told to", async () => {
    const controller = new AbortController();
    // A difficulty nothing will reach, so the abort is what ends it.
    const impossible = { ...issueChallenge(), difficulty: 200 };
    setTimeout(() => controller.abort(), 20);
    expect(await solveChallenge(impossible, controller.signal)).toBeNull();
  });
});
