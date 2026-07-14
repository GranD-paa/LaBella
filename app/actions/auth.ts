"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import type { SignInValues, SignUpValues } from "@/lib/validations/auth";

type ActionResult = { error: string } | { success: true; message: string };

function formatAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("connect timeout") ||
    normalized.includes("econnreset") ||
    normalized.includes("network")
  ) {
    return "Cannot reach the authentication server. Check your internet connection, VPN/firewall settings, and that your Supabase project is active, then try again.";
  }

  return message;
}

export async function signInAction(
  values: SignInValues
): Promise<ActionResult | void> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please check your email and password and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: formatAuthError(error.message) };
  }

  redirect("/dashboard");
}

export async function signUpAction(
  values: SignUpValues
): Promise<ActionResult | void> {
  const parsed = signUpSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please double-check the form and try again." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
    },
  });

  if (error) {
    return { error: formatAuthError(error.message) };
  }

  // If email confirmation is enabled in the Supabase project, `session`
  // will be null until the user confirms their email address.
  if (data.session) {
    redirect("/dashboard");
  }

  return {
    success: true,
    message: "Check your inbox to confirm your email before signing in.",
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
