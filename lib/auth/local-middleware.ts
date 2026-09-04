import { NextResponse, type NextRequest } from "next/server";

import {
  LOCAL_SESSION_COOKIE,
  verifyLocalSessionToken,
} from "@/lib/auth/local-session";

// The landing page, `/blog`, the sitemap and robots.txt are public on purpose:
// they are the whole SEO surface, and a crawler hitting an auth redirect would
// index nothing. `/login` stays public so the header link and the sign-up
// form both still reach it — it is simply no longer where a visitor is sent.
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

export async function updateLocalSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
  const rawSession = request.cookies.get(LOCAL_SESSION_COOKIE)?.value ?? null;
  const userId = rawSession
    ? await verifyLocalSessionToken(rawSession)
    : null;

  // Anyone reaching for the product without an account is sent to sign-up,
  // not to login: they are overwhelmingly first-time visitors, and a password
  // form is a dead end for someone who has no password yet.
  if (!userId && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/sign-up";
    redirectUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (userId && (pathname === "/login" || pathname === "/sign-up")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/menu";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (userId && pathname === "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/menu";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({ request });
}
