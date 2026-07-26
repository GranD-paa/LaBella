// NOTE: this is an in-memory, best-effort limiter scoped to a single
// process/lambda instance. On Vercel (or any multi-instance/serverless
// deployment) each instance keeps its own counters, so a determined
// attacker distributed across instances sees a higher effective limit than
// `maxAttempts`. It still meaningfully slows down casual brute-forcing from
// a single instance, and Supabase Auth enforces its own server-side rate
// limits independently. If this app ever needs a hard global limit, swap
// this module's storage for a shared store (e.g. Upstash Redis) behind the
// same `checkRateLimit`/`buildAuthRateLimitKey` signatures.
type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

// Bounds the Map's memory growth: instead of only ever adding entries,
// periodically sweep out ones whose window has already expired.
const CLEANUP_INTERVAL_MS = 5 * 60_000;
let lastCleanupAt = Date.now();

function cleanupExpiredBuckets(now: number) {
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;

  buckets.forEach((entry, key) => {
    if (now > entry.resetAt) {
      buckets.delete(key);
    }
  });
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMs: number };

export function checkRateLimit(
  key: string,
  maxAttempts = 8,
  windowMs = 15 * 60_000
): RateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);

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
