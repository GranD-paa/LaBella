import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

/**
 * Supabase client authenticated with the service role.
 *
 * This key bypasses Row Level Security entirely, so it is restricted to the
 * two places that genuinely have no user session and must still write:
 *
 *   * payment gateway webhooks — the caller is Stripe or ZarinPal, not a
 *     signed-in learner, and settlement has to happen anyway;
 *   * scheduled cron jobs — the hourly FX refresh and the nightly
 *     subscription sweep.
 *
 * It must never be imported into a Server Component, a Server Action reachable
 * from the UI, or anything that runs in the browser. `SUPABASE_SERVICE_ROLE_KEY`
 * is deliberately not prefixed with `NEXT_PUBLIC_`, so Next.js will refuse to
 * bundle it client-side, and this module throws rather than silently falling
 * back to the anon key if it is missing.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured");
  }
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured — required for webhooks and cron jobs"
    );
  }

  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: {
      // There is no user here and nothing to persist between invocations.
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Guards a cron route.
 *
 * Vercel Cron sends `Authorization: Bearer $CRON_SECRET`. Without this check
 * the endpoints would be public URLs that anyone could hammer to force
 * exchange-rate writes or subscription sweeps.
 */
export function isAuthorizedCronRequest(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  // Fail closed: an unset secret means the endpoint is unusable, not open.
  if (!secret) return false;

  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}
