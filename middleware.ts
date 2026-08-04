import { type NextRequest } from "next/server";

import { updateLocalSession } from "@/lib/auth/local-middleware";
import { isLocalDataMode } from "@/lib/config/data-source";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (isLocalDataMode()) {
    return await updateLocalSession(request);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - image files
     *
     * Machine-to-machine endpoints are excluded too, because this middleware
     * bounces anyone without a session cookie to the login page — and none of
     * these callers has one. Left in, they silently 200 with login HTML
     * instead of running: the exchange rate would never refresh, and a paid
     * Stripe checkout would never activate the subscription.
     *
     * Each carries its own authentication instead of the session cookie:
     * - api/cron      -> CRON_SECRET bearer token (isAuthorizedCronRequest)
     * - api/webhooks  -> provider HMAC signature (verifyStripeWebhook)
     * - api/payments  -> the gateway is re-asked server-to-server whether the
     *                    payment succeeded, quoting the amount from our own
     *                    ledger, so the query string proves nothing on its own
     */
    "/((?!_next/static|_next/image|favicon.ico|api/cron|api/webhooks|api/payments|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
