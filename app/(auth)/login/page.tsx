import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.login");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectedFrom?: string }>;
}) {
  const { redirectedFrom } = await searchParams;
  const redirectTo =
    redirectedFrom && redirectedFrom.startsWith("/") ? redirectedFrom : "/menu";

  return <SignInForm redirectTo={redirectTo} />;
}
