import { createHash, randomBytes } from "node:crypto";
import { describe, expect, it } from "vitest";

import { leadingZeroBits, sha256Hex } from "./sha256";

const reference = (text: string): string =>
  createHash("sha256").update(text, "utf8").digest("hex");

describe("sha256Hex", () => {
  it("matches the published digest of the empty string", () => {
    expect(sha256Hex("")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
  });

  it("matches the published digest of abc", () => {
    expect(sha256Hex("abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
  });

  it.each([54, 55, 56, 63, 64, 65, 119, 120, 128])(
    "matches node:crypto either side of the padding boundary at %i bytes",
    (length) => {
      const text = "a".repeat(length);
      expect(sha256Hex(text)).toBe(reference(text));
    }
  );

  it("matches node:crypto on two hundred random inputs", () => {
    for (let i = 0; i < 200; i += 1) {
      const text = randomBytes(1 + (i % 200)).toString("hex");
      expect(sha256Hex(text)).toBe(reference(text));
    }
  });

  it("does not carry state between calls", () => {
    sha256Hex("a".repeat(1000));
    expect(sha256Hex("abc")).toBe(reference("abc"));
  });
});

describe("leadingZeroBits", () => {
  it("agrees with the digest it is counting", () => {
    for (let i = 0; i < 300; i += 1) {
      const text = `probe-${i}`;
      const digest = sha256Hex(text);
      const expected = digest
        .split("")
        .map((c) => parseInt(c, 16).toString(2).padStart(4, "0"))
        .join("")
        .indexOf("1");
      expect(leadingZeroBits(text)).toBe(expected);
    }
  });

  it("counts a whole zero byte as eight bits", () => {
    // Search for an input whose digest starts with 0x00, then check the count.
    for (let i = 0; i < 5000; i += 1) {
      const text = `zero-${i}`;
      if (sha256Hex(text).startsWith("00")) {
        expect(leadingZeroBits(text)).toBeGreaterThanOrEqual(8);
        return;
      }
    }
    throw new Error("no input with a leading zero byte found in 5000 tries");
  });
});
