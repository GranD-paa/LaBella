import { NextResponse, type NextRequest } from "next/server";

import {
  LOCAL_SESSION_COOKIE,
  verifyLocalSessionToken,
} from "@/lib/auth/local-session";

// `/blog`, the sitemap and robots.txt are public on purpose: the blog is the
// SEO surface, and a crawler hitting a login redirect would index nothing.
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/sign-up",
  "/auth",
  "/api/auth",
  "/blog",
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

  if (!userId && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
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

  if (!userId && pathname === "/") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next({ request });
}
