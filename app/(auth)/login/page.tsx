import type { Metadata } from "next";

import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";
import { SignInForm } from "@/components/auth/sign-in-form";
import { createPageMetadata } from "@/lib/i18n/metadata";

function parseLoginRedirect(redirectedFrom?: string) {
  if (!redirectedFrom) {
    return undefined;
  }

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

  return <SignInForm redirectTo={parseLoginRedirect(redirectedFrom)} />;
}
