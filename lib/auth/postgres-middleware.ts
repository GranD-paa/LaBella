import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

/**
 * The same routing rules as `local-middleware.ts`, reading Better Auth's
 * session cookie instead of the hand-rolled one.
 *
 * This only checks that a session cookie is present — it does not validate it
 * against the database. Middleware runs on every request and the database now
 * lives in another city (app in Tehran, cluster in Tabriz), so a round trip
 * here would tax every page load. Pages and server actions re-check the real
 * session through `getAuthUser()`, which is where the decision actually
 * matters; a forged cookie gets someone the login-redirect skip and nothing
 * else.
 */
const PUBLIC_ROUTES = ["/", "/login", "/sign-up", "/auth", "/api/auth"];

export async function updatePostgresSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
  const hasSession = Boolean(getSessionCookie(request));

  if (!hasSession && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (hasSession && (pathname === "/login" || pathname === "/sign-up")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/menu";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({ request });
}
