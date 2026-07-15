"use server";

import { redirect } from "next/navigation";

import { isLocalDataMode } from "@/lib/config/data-source";
import { getDataRepository } from "@/lib/data";
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

function getSafeRedirectPath(path?: string) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/menu";
  }

  if (path === "/login" || path === "/sign-up") {
    return "/menu";
  }

  return path;
}

export async function signInAction(
  values: SignInValues,
  redirectTo?: string
): Promise<ActionResult | void> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please check your email and password and try again." };
  }

  const repo = getDataRepository();
  const result = await repo.signInWithPassword(
    parsed.data.email,
    parsed.data.password
  );

  if (result.error) {
    return { error: formatAuthError(result.error) };
  }

  redirect(getSafeRedirectPath(redirectTo));
}

export async function signUpAction(
  values: SignUpValues
): Promise<ActionResult | void> {
  const parsed = signUpSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Please double-check the form and try again." };
  }

  if (isLocalDataMode()) {
    return {
      error:
        "Local development mode uses seeded accounts. Sign in with the sample admin or user credentials.",
    };
  }

  const { createClient } = await import("@/lib/supabase/server");
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

  if (data.session) {
    redirect("/menu");
  }

  return {
    success: true,
    message: "Check your inbox to confirm your email before signing in.",
  };
}

export async function signOutAction() {
  const repo = getDataRepository();
  await repo.signOut();
  redirect("/login");
}
