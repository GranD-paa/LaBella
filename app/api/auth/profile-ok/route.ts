import { NextResponse, type NextRequest } from "next/server";

import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";
import { getDataRepository } from "@/lib/data";
import { isLocalDataMode } from "@/lib/config/data-source";
import { PROFILE_OK_COOKIE } from "@/lib/auth/profile-gate";

/**
 * Re-issues the "this account has a name on it" cookie, and sends the visitor
 * on their way.
 *
 * It exists because of a loop. The middleware sends a session with no such
 * cookie to `/welcome`; `/welcome` reads the database, finds the profile
 * already complete, and wants to redirect onward — but a page render cannot
 * set a cookie in Next.js, so the middleware would just send them back, for
 * ever. A route handler can set one.
 *
 * The state it repairs is rare by design: the cookie outlives the session it
 * rides with, so it normally cannot expire first. What is left is a browser
 * that dropped one cookie and not the other, and a person who deleted it by
 * hand — both worth one redirect rather than a permanent trap.
 *
 * It grants nothing. The flag only decides whether `/welcome` is in the way,
 * and this re-reads the database before writing it: a request from an account
 * that really is unfinished is sent back to finish.
 *
 * Lives under `/api/auth/` so the middleware treats it as public — a static
 * segment, which Next.js prefers over Better Auth's `[...all]` sibling.
 */
export async function GET(request: NextRequest) {
  const next = getSafeRedirectPath(
    request.nextUrl.searchParams.get("next") ?? "/menu"
  );

  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isLocalDataMode()) {
    const { readProfileState } = await import("@/lib/auth/phone-accounts");
    const profile = await readProfileState(user.id);
    if (!profile?.isComplete) {
      return NextResponse.redirect(new URL("/welcome", request.url));
    }
  }

  const response = NextResponse.redirect(new URL(next, request.url));
  response.cookies.set(PROFILE_OK_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 400,
  });
  return response;
}
