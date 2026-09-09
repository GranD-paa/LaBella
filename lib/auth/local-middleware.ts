import { NextResponse, type NextRequest } from "next/server";

import {
  LOCAL_SESSION_COOKIE,
  verifyLocalSessionToken,
} from "@/lib/auth/local-session";
import { routeFor } from "@/lib/auth/route-rules";

/**
 * The routing rules in `route-rules.ts`, reading the hand-rolled offline
 * session cookie.
 *
 * Unlike the Postgres side this one can afford to verify the cookie's
 * signature: there is no database to reach for, only an HMAC.
 */
export async function updateLocalSession(request: NextRequest) {
  const raw = request.cookies.get(LOCAL_SESSION_COOKIE)?.value ?? null;
  const userId = raw ? await verifyLocalSessionToken(raw) : null;

  const decision = routeFor(request, userId !== null);
  if (decision) {
    return decision;
  }

  // Offline development starts from the menu rather than the landing page;
  // the marketing surface is not what is being worked on in this mode.
  if (userId && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/menu";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request });
}
