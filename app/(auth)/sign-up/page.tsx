import type { Metadata } from "next";

import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { createPageMetadata } from "@/lib/i18n/metadata";

/**
 * Sign-up is where the middleware now sends anyone without a session, so the
 * page has to carry the destination they were reaching for. Without this, a
 * visitor who clicked a lesson link would sign up, sign in, and land on the
 * menu wondering what happened to the lesson.
 *
 * `getSafeRedirectPath` rejects anything that is not a path on this site; the
 * extra `/menu` check drops a sanitised value that was never a real
 * destination, so the form falls back to its own default instead of
 * advertising one.
 */
function parseSignUpRedirect(redirectedFrom?: string) {
  if (!redirectedFrom) {
    return undefined;
  }

  const safe = getSafeRedirectPath(redirectedFrom);
  return safe === "/menu" && redirectedFrom !== "/menu" ? undefined : safe;
}

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.signUp");
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectedFrom?: string }>;
}) {
  const { redirectedFrom } = await searchParams;

  return <SignUpForm redirectTo={parseSignUpRedirect(redirectedFrom)} />;
}
