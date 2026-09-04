import { type NextRequest, type NextResponse } from "next/server";

import { updateLocalSession } from "@/lib/auth/local-middleware";
import { updatePostgresSession } from "@/lib/auth/postgres-middleware";
import { isLocalDataMode, isPostgresDataMode } from "@/lib/config/data-source";
import { isSiteIndexable } from "@/lib/seo/indexing";
import { updateSession } from "@/lib/supabase/middleware";

async function resolveSession(request: NextRequest): Promise<NextResponse> {
  if (isLocalDataMode()) {
    return await updateLocalSession(request);
  }

  if (isPostgresDataMode()) {
    return await updatePostgresSession(request);
  }

  return await updateSession(request);
}

export async function middleware(request: NextRequest) {
  const response = await resolveSession(request);

  /**
   * The site is not finished, so nothing may enter a search index yet.
   *
   * A `noindex` header is the only signal that binds: robots.txt asks a
   * crawler not to fetch, but a URL someone links to can still be listed
   * without it. Setting the header here rather than in `next.config.mjs`
   * covers the responses that carry no HTML to hold a meta tag — sitemap.xml,
   * the RSS feed, images — and keeps the switch a runtime one, since
   * `next.config.mjs` is read at build time and would bake the answer in.
   */
  if (!isSiteIndexable()) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
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
