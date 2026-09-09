import type { Metadata } from "next";

import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";
import { PhoneAuthForm } from "@/components/auth/phone-auth-form";
import { createPageMetadata } from "@/lib/i18n/metadata";

/**
 * The only door. `/sign-up` redirects here — signing in and joining are the
 * same two steps, and which one it turns out to be is decided by the number.
 */
function parseLoginRedirect(redirectedFrom?: string) {
  if (!redirectedFrom) {
    return undefined;
  }

  // `getSafeRedirectPath` answers `/menu` both for a real request for the menu
  // and for anything it refused. Only the real one is worth carrying.
  const safe = getSafeRedirectPath(redirectedFrom);
  if (safe === "/menu" && redirectedFrom !== "/menu") {
    return undefined;
  }

  return safe;
}

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.login");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectedFrom?: string }>;
}) {
  const { redirectedFrom } = await searchParams;

  return <PhoneAuthForm redirectTo={parseLoginRedirect(redirectedFrom)} />;
}
