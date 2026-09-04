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
// The landing page, `/blog`, the sitemap and robots.txt are public on purpose:
// they are the whole SEO surface, and a crawler hitting an auth redirect would
// index nothing. `/login` stays public so the header's "sign in" link and the
// sign-up form's "already have an account" link both still work — it is simply
// no longer where an anonymous visitor is *sent*.
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/sign-up",
  "/auth",
  "/api/auth",
  "/blog",
  // The marketing surface. Prices are already quoted on the landing page, so
  // `/subscription` puts nothing new in the open; what it does is let someone
  // read the plans before deciding to make an account. Buying still needs one
  // — the plan cards send a signed-out visitor to sign-up.
  "/about",
  "/contact",
  "/subscription",
  "/sitemap.xml",
  "/robots.txt",
];

export async function updatePostgresSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
  const hasSession = Boolean(getSessionCookie(request));

  // Anyone reaching for the product without an account is sent to sign-up,
  // not to login. Almost everyone who lands on a protected URL is a visitor
  // who has never had an account, and asking them for a password they do not
  // have is a dead end; the returning learner is one link away on that page.
  if (!hasSession && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/sign-up";
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
