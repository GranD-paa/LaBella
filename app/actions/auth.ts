"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { isLocalDataMode, isPostgresDataMode } from "@/lib/config/data-source";
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

  const user = await repo.getAuthUser();
  const profile = user ? await repo.getProfileById(user.id) : null;
  const isAdmin = Boolean(profile?.is_admin);

  // An explicit redirectTo means the user was bounced here from a specific
  // protected page (e.g. a deep link) — honor that instead of resuming their
  // last learning position.
  //
  // `/menu` is the exception. It is where the middleware parks anyone with a
  // session and where every signed-in user lands by default, so being sent
  // back from it says nothing about where this person meant to go — an admin
  // whose session expired on the menu still belongs on the dashboard. Every
  // other path was genuinely asked for and outranks the default landing.
  const requestedPath = redirectTo ? getSafeRedirectPath(redirectTo) : null;

  if (requestedPath && !(isAdmin && requestedPath === "/menu")) {
    redirect(requestedPath);
  }

  // Admins manage the platform, not take quizzes — send them to the admin
  // dashboard instead of resuming (or starting) a learner's course path.
  if (isAdmin) {
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

  if (isPostgresDataMode()) {
    return await signUpWithPostgres(parsed.data);
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

/**
 * Sign-up against the self-hosted stack.
 *
 * The phone number is normalized to E.164 *before* Better Auth stores it —
 * the OTP endpoints look users up by the exact stored string, so a raw
 * `09121234567` here would never match the `+989121234567` the verify step
 * sends. It is also the value SpotPlayer burns into the video watermark, so a
 * consistent shape matters beyond login.
 */
async function signUpWithPostgres(
  values: SignUpValues
): Promise<ActionResult | void> {
  const { assertRegionMatchesPhone, auth } = await import(
    "@/lib/auth/better-auth"
  );

  const phoneCheck = assertRegionMatchesPhone(values.region, values.phone);
  if (!phoneCheck.ok) {
    return { error: phoneCheck.error };
  }

  const requestHeaders = await headers();

  try {
    await auth.api.signUpEmail({
      body: {
        email: values.email,
        password: values.password,
        name: values.fullName,
        phoneNumber: phoneCheck.phone,
        region: values.region,
      },
      headers: requestHeaders,
    });
  } catch (error) {
    return {
      error: formatAuthErrorKey(
        error instanceof Error ? error.message : "sign up failed"
      ),
    };
  }

  // Iranian accounts prove themselves by SMS; everyone else gets an email
  // link, because an international SMS costs ~146x a domestic one.
  if (values.region === "ir") {
    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber: phoneCheck.phone },
      headers: requestHeaders,
    });
    return { success: true, message: "actions.errors.confirmPhone" };
  }

  await auth.api.sendVerificationEmail({
    body: { email: values.email, callbackURL: "/login" },
    headers: requestHeaders,
  });
  return { success: true, message: "actions.errors.confirmEmail" };
}
