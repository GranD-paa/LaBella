import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.signUp");
}

export default function SignUpPage() {
  return <SignUpForm />;
}
