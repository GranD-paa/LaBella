"use server";

import { redirect } from "next/navigation";

import { isLocalDataMode } from "@/lib/config/data-source";
import { getDataRepository } from "@/lib/data";
import { resolveContinueLearningPath } from "@/lib/curriculum/learning-state";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import type { SignInValues, SignUpValues } from "@/lib/validations/auth";

type ActionResult = { error: string } | { success: true; message: string };

function formatAuthErrorKey(message: string) {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("fetch failed") ||
    normalized.includes("connect timeout") ||
    normalized.includes("econnreset") ||
    normalized.includes("network")
  ) {
    return "actions.errors.authServerUnreachable";
  }

  if (
    normalized.includes("invalid login credentials") ||
    normalized.includes("invalid email or password")
  ) {
    return "actions.errors.invalidCredentials";
  }

  return "actions.errors.generic";
}

function getSafeRedirectPath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) {
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
    return { error: "actions.errors.invalidCredentials" };
  }

  const repo = getDataRepository();
  const result = await repo.signInWithPassword(
    parsed.data.email,
    parsed.data.password
  );

  if (result.error) {
    return { error: formatAuthErrorKey(result.error) };
  }

  // An explicit redirectTo means the user was bounced here from a specific
  // protected page (e.g. a deep link) — honor that instead of resuming their
  // last learning position.
  if (redirectTo) {
    redirect(getSafeRedirectPath(redirectTo));
  }

  const user = await repo.getAuthUser();
  const learningState = user ? await repo.getLearningState(user.id) : null;

  // No explicit destination requested: send returning learners straight back
  // into their last active language/level/section, and first-time learners
  // to the Main Menu to choose a language.
  redirect(resolveContinueLearningPath(learningState));
}

export async function signUpAction(
  values: SignUpValues
): Promise<ActionResult | void> {
  const parsed = signUpSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.formCheck" };
  }

  if (isLocalDataMode()) {
    return {
      error: "actions.errors.localModeSignUp",
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
    return { error: formatAuthErrorKey(error.message) };
  }

  if (data.session) {
    redirect("/menu");
  }

  return {
    success: true,
    message: "actions.errors.confirmEmail",
  };
}

export async function signOutAction() {
  const repo = getDataRepository();
  await repo.signOut();
  redirect("/login");
}
