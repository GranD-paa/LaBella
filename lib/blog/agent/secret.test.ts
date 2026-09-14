import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { decryptSecret, encryptSecret } from "./secret";

describe("blog agent API key sealing", () => {
  const original = process.env.BETTER_AUTH_SECRET;

  beforeEach(() => {
    process.env.BETTER_AUTH_SECRET = "test-secret-for-sealing";
  });

  afterEach(() => {
    if (original === undefined) delete process.env.BETTER_AUTH_SECRET;
    else process.env.BETTER_AUTH_SECRET = original;
  });

  it("round-trips a key without storing it in the clear", () => {
    const sealed = encryptSecret("sk-live-1234567890");
    expect(sealed).not.toContain("sk-live");
    expect(decryptSecret(sealed)).toBe("sk-live-1234567890");
  });

  it("uses a fresh IV for every seal", () => {
    expect(encryptSecret("same key")).not.toBe(encryptSecret("same key"));
  });

  it("refuses a value that was tampered with", () => {
    const [version, iv, tag, body] = encryptSecret("sk-live-1234567890").split(".");
    const flipped = Buffer.from(body, "base64");
    flipped[0] ^= 1;
    expect(
      decryptSecret([version, iv, tag, flipped.toString("base64")].join("."))
    ).toBeNull();
  });

  it("refuses a tag that was cut short", () => {
    const [version, iv, tag, body] = encryptSecret("sk-live-1234567890").split(".");
    // The first four bytes of the real tag: GCM without a pinned tag length
    // accepts these as proof that the value is intact.
    const short = Buffer.from(tag, "base64").subarray(0, 4).toString("base64");
    expect(decryptSecret([version, iv, short, body].join("."))).toBeNull();
  });

  it("cannot read a key once the server secret has been rotated", () => {
    const sealed = encryptSecret("sk-live-1234567890");
    process.env.BETTER_AUTH_SECRET = "rotated-secret";
    expect(decryptSecret(sealed)).toBeNull();
  });

  it("returns null for anything that is not a sealed value", () => {
    expect(decryptSecret("not-a-sealed-value")).toBeNull();
    expect(decryptSecret("")).toBeNull();
  });
});
