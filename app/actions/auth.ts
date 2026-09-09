"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { resolveContinueLearningPath } from "@/lib/curriculum/learning-state";
import { getDataRepository } from "@/lib/data";
import { getSafeRedirectPath } from "@/lib/auth/safe-redirect";
import { isLocalDataMode } from "@/lib/config/data-source";
import { clearProfileFlag, markProfileComplete } from "@/lib/auth/profile-gate";
import { jalaliToISODate } from "@/lib/date/jalali";
import {
  completeProfileSchema,
  requestCodeSchema,
  verifyCodeSchema,
} from "@/lib/validations/auth";
import type { CompleteProfileValues } from "@/lib/validations/auth";
import type {
  Challenge,
  RequestCodeInput,
  RequestCodeResult,
  VerifyCodeInput,
  VerifyCodeResult,
} from "@/lib/auth/phone-auth-types";

/**
 * One door: a number, a code, and whichever of "welcome back" or "welcome"
 * the number turns out to deserve.
 *
 * The order of checks in `requestPhoneCode` is not arbitrary. Everything free
 * runs before anything that costs — shape, then the signed ticket, then the
 * database, then the money. A flood of malformed or forged requests never
 * reaches Postgres, let alone the gateway.
 */

type ActionResult = { error: string } | { success: true; message: string };

/**
 * A floor under every answer from the first step.
 *
 * Not a fix for timing analysis — the SMS itself takes as long as it takes —
 * but it flattens the obvious tell, where a refusal that never touched the
 * gateway comes back in five milliseconds and a real send takes half a
 * second. What this deliberately does NOT hide is `mode`: telling the person
 * whether they are signing in or joining is the product decision, and the
 * rate limits are what stop it being harvested.
 */
const RESPONSE_FLOOR_MS = 400;

async function padTiming(startedAt: number): Promise<void> {
  const remaining = RESPONSE_FLOOR_MS - (Date.now() - startedAt);
  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }
}

async function getClientIpForRateLimit(): Promise<string> {
  const headerStore = await headers();
  return (
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown"
  );
}

/**
 * The ticket the browser solves while the user is typing their number.
 *
 * Issued on its own rather than embedded in the page so it is fresh whenever
 * the form is: a challenge baked into server-rendered HTML goes stale in a
 * tab left open, and the first thing the user would meet is a failure.
 */
export async function getAuthChallenge(): Promise<Challenge | null> {
  if (isLocalDataMode()) {
    return null;
  }
  const { issueChallenge } = await import("@/lib/auth/otp-challenge");
  return issueChallenge();
}

export async function requestPhoneCode(
  input: RequestCodeInput
): Promise<RequestCodeResult> {
  const startedAt = Date.now();
  const result = await decideAndSend(input);
  await padTiming(startedAt);
  return result;
}

async function decideAndSend(input: RequestCodeInput): Promise<RequestCodeResult> {
  // A field no human sees. Anything in it means a form filler walked the DOM,
  // and the honest answer is the one that wastes the most of its time: yes,
  // fine, we sent it.
  if (input.trap && input.trap.trim() !== "") {
    return { ok: true, mode: "signup", phone: "", resendAfterMs: 60_000 };
  }

  const parsed = requestCodeSchema.safeParse({ phone: input.phone });
  if (!parsed.success) {
    return { ok: false, error: "actions.errors.invalidPhone" };
  }

  const { assertVerifiablePhone } = await import("@/lib/auth/better-auth");
  const phoneCheck = assertVerifiablePhone(parsed.data.phone);
  if (!phoneCheck.ok) {
    return { ok: false, error: phoneCheck.error };
  }
  const phone = phoneCheck.phone;

  if (isLocalDataMode()) {
    const { findLocalUserByPhone } = await import("@/lib/auth/local-phone-auth");
    if (!findLocalUserByPhone(phone)) {
      return { ok: false, error: "actions.errors.localModeUnknownPhone" };
    }
    return { ok: true, mode: "signin", phone, resendAfterMs: 0 };
  }

  const { redeemChallenge } = await import("@/lib/auth/otp-challenge");
  const ticket = await redeemChallenge(input.challenge);
  if (!ticket.ok) {
    return { ok: false, error: "actions.errors.challengeFailed" };
  }

  const { phoneHasAccount } = await import("@/lib/auth/phone-accounts");
  const { checkVerifyAllowed } = await import("@/lib/auth/otp-attempts");

  let hasAccount: boolean;
  try {
    hasAccount = await phoneHasAccount(phone);
  } catch {
    return { ok: false, error: "actions.errors.authServerUnreachable" };
  }

  // A number that has been guessing wrong all hour does not need another
  // code — it needs to stop. Checking here rather than only at the verify
  // step means the attack costs no SMS at all.
  const guessing = await checkVerifyAllowed(phone);
  if (!guessing.allowed) {
    return {
      ok: false,
      error: "actions.errors.tooManyAttempts",
      retryAfterMs: guessing.retryAfterMs,
    };
  }

  const { claimSend, releaseSend } = await import("@/lib/notify/send-limit");
  const claim = await claimSend("sms", {
    recipient: phone,
    ip: await getClientIpForRateLimit(),
    hasAccount,
  });

  if (!claim.allowed) {
    return {
      ok: false,
      error: refusalKey(claim.reason),
      retryAfterMs: "retryAfterMs" in claim ? claim.retryAfterMs : undefined,
    };
  }

  try {
    const { auth } = await import("@/lib/auth/better-auth");
    await auth.api.sendPhoneNumberOTP({
      body: { phoneNumber: phone },
      headers: await headers(),
    });
  } catch (error) {
    // Claimed before sending, so a hung gateway cannot be used as a free
    // channel — and refunded here, so an outage does not also cost the user
    // their cooldown for a message that never existed.
    await releaseSend("sms", phone);
    console.error("[auth] verification SMS failed", error);
    return { ok: false, error: "actions.errors.smsUnavailable" };
  }

  return {
    ok: true,
    mode: hasAccount ? "signin" : "signup",
    phone,
    resendAfterMs: claim.nextGapMs,
  };
}

function refusalKey(reason: "cooldown" | "daily" | "origin" | "capacity"): string {
  switch (reason) {
    case "cooldown":
      return "actions.errors.codeTooSoon";
    case "daily":
      return "actions.errors.tooManyCodes";
    case "origin":
      return "actions.errors.tooManyFromHere";
    case "capacity":
      return "actions.errors.smsUnavailable";
  }
}

/**
 * Trades a correct code for a session, then decides where the person belongs.
 *
 * Returns only on failure. Success ends in `redirect`, which throws — so
 * nothing after it runs, and there is no window where a signed-in user is
 * looking at the code form.
 */
export async function verifyPhoneCode(
  input: VerifyCodeInput
): Promise<VerifyCodeResult | void> {
  const parsed = verifyCodeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "actions.errors.codeInvalid" };
  }

  const { assertVerifiablePhone } = await import("@/lib/auth/better-auth");
  const phoneCheck = assertVerifiablePhone(parsed.data.phone);
  if (!phoneCheck.ok) {
    return { ok: false, error: phoneCheck.error };
  }
  const phone = phoneCheck.phone;

  if (isLocalDataMode()) {
    const { LOCAL_DEV_CODE, signInLocalByPhone } = await import(
      "@/lib/auth/local-phone-auth"
    );
    if (parsed.data.code !== LOCAL_DEV_CODE) {
      return { ok: false, error: "actions.errors.codeWrong" };
    }
    if (!(await signInLocalByPhone(phone))) {
      return { ok: false, error: "actions.errors.localModeUnknownPhone" };
    }
    await markProfileComplete();
    redirect(await destinationFor(input.redirectTo));
  }

  const { checkVerifyAllowed, recordVerifyAttempt } = await import(
    "@/lib/auth/otp-attempts"
  );

  const gate = await checkVerifyAllowed(phone);
  if (!gate.allowed) {
    return {
      ok: false,
      error: "actions.errors.tooManyAttempts",
      retryAfterMs: gate.retryAfterMs,
    };
  }

  try {
    const { auth } = await import("@/lib/auth/better-auth");
    await auth.api.verifyPhoneNumber({
      body: { phoneNumber: phone, code: parsed.data.code },
      headers: await headers(),
    });
  } catch {
    await recordVerifyAttempt(phone, false);
    // One message for a wrong code and an expired one alike. Telling them
    // apart would say which guesses were close to a live code.
    return { ok: false, error: "actions.errors.codeWrong" };
  }

  await recordVerifyAttempt(phone, true);

  // A number that verifies without an account gets one, created by the
  // plugin, holding a placeholder name. `/welcome` is where a person is
  // attached to it, and nothing else is reachable until they do.
  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  if (!user) {
    return { ok: false, error: "actions.errors.generic" };
  }

  const { readProfileState } = await import("@/lib/auth/phone-accounts");
  const profile = await readProfileState(user.id);

  // A suspended account can still prove it owns its number — that was never
  // the question. The session it just earned is taken back here, which used to
  // be the job of the password sign-in this replaced.
  if (profile?.isSuspended) {
    await repo.signOut();
    return { ok: false, error: "actions.errors.accountSuspended" };
  }

  if (!profile?.isComplete) {
    redirect(welcomeHref(input.redirectTo));
  }

  await markProfileComplete();
  redirect(await destinationFor(input.redirectTo, profile.isAdmin));
}

export async function completeProfile(
  values: CompleteProfileValues,
  redirectTo?: string
): Promise<ActionResult | void> {
  const parsed = completeProfileSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.formCheck" };
  }

  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  if (!user) {
    redirect("/login");
  }

  if (isLocalDataMode()) {
    // Local profiles are fixtures, not accounts being filled in. Nothing to
    // write; the flag is what the middleware reads.
    await markProfileComplete();
    redirect(await destinationFor(redirectTo));
  }

  const { saveProfile } = await import("@/lib/auth/phone-accounts");
  const saved = await saveProfile(user.id, {
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    email: parsed.data.email,
    birthDate: jalaliToISODate(
      parsed.data.birthYear,
      parsed.data.birthMonth,
      parsed.data.birthDay
    ),
  });

  if (!saved.ok) {
    return {
      error:
        saved.error === "emailTaken"
          ? "actions.errors.emailTaken"
          : "actions.errors.generic",
    };
  }

  await markProfileComplete();
  redirect(await destinationFor(redirectTo));
}

export async function signOutAction() {
  const repo = getDataRepository();
  await repo.signOut();
  await clearProfileFlag();
  redirect("/login");
}

function welcomeHref(redirectTo?: string): string {
  const safe = redirectTo ? getSafeRedirectPath(redirectTo) : null;
  return safe && safe !== "/menu"
    ? `/welcome?redirectedFrom=${encodeURIComponent(safe)}`
    : "/welcome";
}

/**
 * Where this person goes now.
 *
 * An explicit `redirectTo` means they were bounced here from a specific
 * protected page — honour that instead of resuming their last lesson.
 *
 * `/menu` is the exception. It is where the middleware parks anyone with a
 * session and where every signed-in user lands by default, so being sent back
 * from it says nothing about where this person meant to go — an admin whose
 * session expired on the menu still belongs on the dashboard. Every other path
 * was genuinely asked for and outranks the default landing.
 */
async function destinationFor(
  redirectTo?: string,
  knownAdmin?: boolean
): Promise<string> {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  const isAdmin =
    knownAdmin ??
    Boolean(user ? (await repo.getProfileById(user.id))?.is_admin : false);

  const requested = redirectTo ? getSafeRedirectPath(redirectTo) : null;
  if (requested && !(isAdmin && requested === "/menu")) {
    return requested;
  }

  // Admins manage the platform rather than take quizzes.
  if (isAdmin) {
    return "/dashboard";
  }

  const [learningState, languages, lessons, quizzes, attempts] =
    await Promise.all([
      user ? repo.getLearningState(user.id) : Promise.resolve(null),
      getLanguagesWithAvailability(repo),
      repo.getLessons(),
      repo.getQuizzes(),
      user ? repo.getAttemptsByUserId(user.id) : Promise.resolve([]),
    ]);

  // Returning learners resume their last active language, level and section,
  // advancing past it when they have already passed its checkpoint quiz;
  // first-timers go to the menu to choose a language.
  return resolveContinueLearningPath(learningState, languages, {
    lessons,
    quizzes,
    attemptedQuizIds: new Set(attempts.map((attempt) => attempt.quiz_id)),
  });
}
