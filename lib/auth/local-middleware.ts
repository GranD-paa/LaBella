import { NextResponse, type NextRequest } from "next/server";

import { LOCAL_SESSION_COOKIE } from "@/lib/auth/local-session";

const PUBLIC_ROUTES = ["/", "/login", "/sign-up", "/auth", "/pricing"];

export function updateLocalSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
  const userId = request.cookies.get(LOCAL_SESSION_COOKIE)?.value ?? null;

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
