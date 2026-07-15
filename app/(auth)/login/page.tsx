import type { Metadata } from "next";

import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in — LaBella",
};

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
