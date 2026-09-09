import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CompleteProfileForm } from "@/components/auth/complete-profile-form";
import { getDataRepository } from "@/lib/data";
import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";
import { isLocalDataMode } from "@/lib/config/data-source";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.welcome");
}

/**
 * Where an account stops being a phone number and becomes a person.
 *
 * Reached only through the middleware's flag, but it does not trust it: an
 * account that turns out to be finished is sent through
 * `/api/auth/profile-ok`, which re-reads the database, re-issues the flag and
 * forwards them — the page cannot set a cookie itself, and redirecting
 * straight to `/menu` would bounce off the middleware and back here for ever.
 */
export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ redirectedFrom?: string }>;
}) {
  const { redirectedFrom } = await searchParams;
  const next = redirectedFrom ? getSafeRedirectPath(redirectedFrom) : "/menu";

  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  if (!user) {
    redirect("/login");
  }

  if (isLocalDataMode()) {
    redirect(`/api/auth/profile-ok?next=${encodeURIComponent(next)}`);
  }

  const { readProfileState } = await import("@/lib/auth/phone-accounts");
  const profile = await readProfileState(user.id);
  if (profile?.isComplete) {
    redirect(`/api/auth/profile-ok?next=${encodeURIComponent(next)}`);
  }

  return <CompleteProfileForm redirectTo={redirectedFrom} />;
}
