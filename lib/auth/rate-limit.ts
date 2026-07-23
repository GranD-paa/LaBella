type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMs: number };

export function checkRateLimit(
  key: string,
  maxAttempts = 8,
  windowMs = 15 * 60_000
): RateLimitResult {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (current.count >= maxAttempts) {
    return { allowed: false, retryAfterMs: current.resetAt - now };
  }

  current.count += 1;
  buckets.set(key, current);
  return { allowed: true };
}

export function buildAuthRateLimitKey(scope: string, email: string): string {
  return `${scope}:${email.trim().toLowerCase()}`;
}
