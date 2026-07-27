"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { isLocalDataMode } from "@/lib/config/data-source";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { getDataRepository } from "@/lib/data";
import { resolveContinueLearningPath } from "@/lib/curriculum/learning-state";
import {
  buildAuthRateLimitKey,
  checkRateLimit,
} from "@/lib/auth/rate-limit";
import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";
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

async function getClientIpForRateLimit(): Promise<string> {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown"
  );
}

export async function signInAction(
  values: SignInValues,
  redirectTo?: string
): Promise<ActionResult | void> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidCredentials" };
  }

  const ip = await getClientIpForRateLimit();
  const rateLimit = checkRateLimit(
    buildAuthRateLimitKey(`sign-in:${ip}`, parsed.data.email)
  );
  if (!rateLimit.allowed) {
    return { error: "actions.errors.generic" };
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
  const profile = user ? await repo.getProfileById(user.id) : null;

  // Admins manage the platform, not take quizzes — send them to the admin
  // dashboard instead of resuming (or starting) a learner's course path.
  if (profile?.is_admin) {
    redirect("/dashboard");
  }

  const [learningState, languages, lessons, quizzes, attempts] =
    await Promise.all([
      user ? repo.getLearningState(user.id) : Promise.resolve(null),
      getLanguagesWithAvailability(repo),
      repo.getLessons(),
      repo.getQuizzes(),
      user ? repo.getAttemptsByUserId(user.id) : Promise.resolve([]),
    ]);

  // No explicit destination requested: send returning learners straight back
  // into their last active language/level/section (advancing past it if
  // they've already passed its checkpoint quiz), and first-time learners to
  // the Main Menu to choose a language.
  redirect(
    resolveContinueLearningPath(learningState, languages, {
      lessons,
      quizzes,
      attemptedQuizIds: new Set(attempts.map((attempt) => attempt.quiz_id)),
    })
  );
}

export async function signUpAction(
  values: SignUpValues
): Promise<ActionResult | void> {
  const parsed = signUpSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.formCheck" };
  }

  const ip = await getClientIpForRateLimit();
  const rateLimit = checkRateLimit(
    buildAuthRateLimitKey(`sign-up:${ip}`, parsed.data.email),
    5
  );
  if (!rateLimit.allowed) {
    return { error: "actions.errors.generic" };
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
