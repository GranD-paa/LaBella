import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildAuthRateLimitKey, checkRateLimit } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows attempts under the max within the window", () => {
    const key = `test-key-${Math.random()}`;
    for (let i = 0; i < 3; i += 1) {
      expect(checkRateLimit(key, 3, 1000)).toEqual({ allowed: true });
    }
  });

  it("blocks once the max attempts is reached within the window", () => {
    const key = `test-key-${Math.random()}`;
    checkRateLimit(key, 2, 1000);
    checkRateLimit(key, 2, 1000);
    const result = checkRateLimit(key, 2, 1000);
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.retryAfterMs).toBeGreaterThan(0);
    }
  });

  it("resets the bucket after the window elapses", () => {
    const key = `test-key-${Math.random()}`;
    checkRateLimit(key, 1, 1000);
    expect(checkRateLimit(key, 1, 1000).allowed).toBe(false);

    vi.setSystemTime(1001);
    expect(checkRateLimit(key, 1, 1000).allowed).toBe(true);
  });

  it("tracks separate keys independently", () => {
    const keyA = `key-a-${Math.random()}`;
    const keyB = `key-b-${Math.random()}`;
    checkRateLimit(keyA, 1, 1000);
    expect(checkRateLimit(keyA, 1, 1000).allowed).toBe(false);
    expect(checkRateLimit(keyB, 1, 1000).allowed).toBe(true);
  });
});

describe("buildAuthRateLimitKey", () => {
  it("lowercases and trims the email, namespaced by scope", () => {
    expect(buildAuthRateLimitKey("login", "  User@Example.com  ")).toBe(
      "login:user@example.com"
    );
  });

  it("produces different keys for different scopes with the same email", () => {
    const a = buildAuthRateLimitKey("login", "a@b.com");
    const b = buildAuthRateLimitKey("signup", "a@b.com");
    expect(a).not.toBe(b);
  });
});
