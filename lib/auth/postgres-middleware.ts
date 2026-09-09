import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

import { routeFor } from "@/lib/auth/route-rules";

/**
 * The routing rules in `route-rules.ts`, reading Better Auth's session cookie.
 *
 * The only thing this file decides is whether a session cookie is present;
 * everything that follows from that answer is shared with the local mode, so
 * the two cannot drift.
 */
export async function updatePostgresSession(request: NextRequest) {
  const decision = routeFor(request, Boolean(getSessionCookie(request)));
  return decision ?? NextResponse.next({ request });
}
