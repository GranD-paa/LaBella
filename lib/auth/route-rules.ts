import { NextResponse, type NextRequest } from "next/server";

import { PROFILE_OK_COOKIE } from "@/lib/auth/profile-gate";

/**
 * Where a request is allowed to go, given what it is carrying.
 *
 * Shared by the Postgres and local middlewares, which differ only in how they
 * read a session — one asks Better Auth's cookie, the other verifies a signed
 * one. Everything after that answer was duplicated in both files and drifted;
 * the rules live here now so a route added to one is added to both.
 */

// The landing page, `/blog`, the sitemap and robots.txt are public on purpose:
// they are the whole SEO surface, and a crawler hitting an auth redirect would
// index nothing.
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  // Kept public and kept working: it is what every marketing CTA points at.
  // The page itself is now a redirect to `/login`, which is one door for both
  // signing in and joining.
  "/sign-up",
  "/auth",
  "/api/auth",
  "/blog",
  // The marketing surface. Prices are already quoted on the landing page, so
  // `/subscription` puts nothing new in the open; what it does is let someone
  // read the plans before deciding to make an account. Buying still needs one
  // — the plan cards send a signed-out visitor to the sign-in page.
  "/about",
  "/contact",
  "/subscription",
  "/sitemap.xml",
  "/robots.txt",
  // Same class of file as the two above: a map of the site, written for the
  // models that read one. It is fetched by something with no session by
  // definition, and answering it with a login page would be answering it with
  // a description of the login page.
  "/llms.txt",
  // Blog pictures. Fetched by crawlers, by link-preview bots, and by Next's
  // own image optimizer — none of which carries a session cookie. Exactly the
  // reasoning `/api/banner-images` is excluded from the matcher for, and safe
  // for the same reason: the route returns image bytes and nothing else, only
  // to someone who already knows an unguessable UUID.
  "/api/blog-images",
];

/** The one door. Both `/login` and `/sign-up` land on the same screen. */
export const AUTH_PATHS = ["/login", "/sign-up"];

/** Where a brand-new account says who it belongs to. Never public. */
export const WELCOME_PATH = "/welcome";

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
}

function redirectTo(
  request: NextRequest,
  pathname: string,
  from?: string
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  if (from) {
    url.searchParams.set("redirectedFrom", from);
  }
  return NextResponse.redirect(url);
}

/**
 * The routing decision, or null to let the request through.
 *
 * `hasSession` is only ever "a session cookie is present". Neither middleware
 * validates it against the database: middleware runs on every request and the
 * database lives in another city (app in Tehran, cluster in Tabriz), so a
 * round trip here would tax every page load. Pages and actions re-check the
 * real session through `getAuthUser()`, which is where the decision actually
 * matters; a forged cookie buys someone the redirect skip and nothing else.
 */
export function routeFor(
  request: NextRequest,
  hasSession: boolean
): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const isPublic = isPublicRoute(pathname);
  const isAuthPath = AUTH_PATHS.includes(pathname);
  const isWelcome = pathname === WELCOME_PATH;

  // Anyone reaching for the product without an account is sent to the door
  // with `redirectedFrom` on it, so they land where they were headed.
  if (!hasSession && !isPublic) {
    return redirectTo(request, "/login", pathname);
  }

  /**
   * A session whose account never finished `/welcome`.
   *
   * The flag is a cookie rather than a database read, for the same reason the
   * session check is: this runs on every request, to catch a state that lasts
   * ninety seconds once in an account's life. It is a UX gate, not a security
   * boundary — clearing the cookie grants nothing, and `/welcome` reads the
   * database itself and waves through anyone already finished, so a missing
   * flag costs one redirect and then repairs itself.
   */
  const unfinished =
    hasSession && !request.cookies.get(PROFILE_OK_COOKIE)?.value;

  if (hasSession && isAuthPath) {
    return redirectTo(request, unfinished ? WELCOME_PATH : "/menu");
  }

  if (unfinished && !isWelcome && !isPublic) {
    return redirectTo(request, WELCOME_PATH, pathname);
  }

  // Finished, and asking for the page that exists to finish them.
  if (hasSession && !unfinished && isWelcome) {
    return redirectTo(request, "/menu");
  }

  return null;
}
