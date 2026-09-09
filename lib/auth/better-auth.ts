import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";

import {
  POOL_OPTIONS,
  resolveConnectionString,
} from "@/lib/data/postgres/client";
import { isIranianMobile, normalizePhone } from "@/lib/notify/phone";
import { sendVerificationCode } from "@/lib/notify/sms";

/**
 * Auth for the ArvanCloud Postgres deployment.
 *
 * One rule, no branches: an account is a phone number that answered an SMS.
 * There is no password to forget, no email to confirm, and no second way in
 * — a second way in is a second thing to attack and a second thing to keep
 * working.
 *
 * An email address is still collected once, on `/welcome`, because receipts
 * and notices go there. It is never verified: nothing in the product waits on
 * it, and a confirmation link the user can ignore is a step that only loses
 * sign-ups.
 */

const DAY = 60 * 60 * 24;

export const auth = betterAuth({
  database: new Pool({
    connectionString: resolveConnectionString(),
    ...POOL_OPTIONS,
  }),

  /**
   * Thirty days, sliding.
   *
   * `expiresIn` is the absolute ceiling and `updateAge` is what pushes it
   * forward, so a session extends on any day it is used: someone who opens a
   * lesson once a month is never asked for a code again, and a session
   * abandoned on a borrowed laptop is dead within thirty days. That pairing —
   * an idle timeout inside an absolute cap — is what OWASP asks for, and it
   * is the shape every consumer app the users already have behaves like.
   *
   * No `cookieCache`. It would save a round trip to Tabriz on every request,
   * but `/welcome` rewrites the user's name and email moments after the
   * session is created, and a cached session would serve the placeholder
   * values for minutes afterwards. Correct beats fast on the one screen where
   * the user is watching their own name appear.
   */
  session: {
    expiresIn: 30 * DAY,
    updateAge: 1 * DAY,
  },

  user: {
    additionalFields: {
      /**
       * Not a feature — a shim around a column we have not been able to
       * retire yet.
       *
       * `user.region` used to decide the verification path. That decision is
       * gone, but Better Auth created the column as `not null` with no
       * default, so an insert that omits it fails, and the failure surfaces
       * as a broken sign-up rather than as a schema complaint. It applies to
       * accounts created by `signUpOnVerification` too — they go through the
       * same `createUser`.
       *
       * Delete this block together with the column — see
       * `db/005_send_limits.sql`.
       */
      region: {
        type: "string",
        required: false,
        defaultValue: "ir",
        input: false,
      },
    },
  },

  // There is no password anywhere in the product. Leaving the endpoints
  // mounted would keep a credential path alive that no screen uses and
  // nobody would notice being probed.
  emailAndPassword: { enabled: false },

  plugins: [
    phoneNumber({
      otpLength: 6,

      /**
       * Two minutes, and it has to stay in step with two other things: the
       * sentence under the boxes (`auth.codeHint`) and — less forgivingly —
       * the approved Melipayamak template, which is a person's word held on
       * their servers. A code that outlives what the SMS promised, or dies
       * before it, is a support ticket either way.
       */
      expiresIn: 120,

      /**
       * The plugin's own attempt counter, which dies with each code it
       * guards. The one that actually bounds guessing lives in
       * `otp-attempts.ts` and is attached to the number instead.
       */
      allowedAttempts: 3,

      /**
       * Normalised first, because the plugin is handed whatever the request
       * body carried. Strict rather than merely Iranian: the gateway charges
       * per message, so an unallocated operator range is money spent on
       * nobody. This used to accept any country while `sendSms` refused
       * everything but +98 — two rules that could disagree, now one.
       */
      phoneNumberValidator: (value) => {
        const e164 = normalizePhone(value);
        return e164 !== null && isIranianMobile(e164);
      },

      async sendOTP({ phoneNumber: to, code }) {
        await sendVerificationCode(to, code);
      },

      /**
       * A number that verifies and has no account gets one, right there.
       *
       * This is the whole "sign in or sign up, we will work out which" idea in
       * one option. The name and email are placeholders — `/welcome` is where
       * the person supplies the real ones, and until they do,
       * `profiles.profile_completed_at` is null and every route sends them
       * back there.
       *
       * The temp email must be unique and must not be empty: `getAuthUser()`
       * treats a session without an email as no session at all, so a blank
       * one would look like being signed out. Deriving it from the number
       * gives both properties for free.
       */
      signUpOnVerification: {
        getTempEmail: (phone) => `${phone.replace(/\D/g, "")}@phone.laparli.local`,
        getTempName: () => "",
      },
    }),

    // Must stay last: it wraps the others so `auth.api.*` can set session
    // cookies from inside a server action.
    nextCookies(),
  ],
});

type VerifiableUser = {
  phoneNumberVerified?: boolean | null;
};

/** Whether the account has passed its SMS code. Nothing else counts. */
export function isVerified(user: VerifiableUser): boolean {
  return Boolean(user.phoneNumberVerified);
}

/**
 * The number in E.164, or the reason it cannot be used.
 *
 * A foreign number would never receive its code — the gateway only serves
 * +98 — so it is refused at the door rather than stranding an account that
 * can never finish verifying.
 */
export function assertVerifiablePhone(
  rawPhone: string
): { ok: true; phone: string } | { ok: false; error: string } {
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    return { ok: false, error: "actions.errors.invalidPhone" };
  }
  if (!isIranianMobile(phone)) {
    return { ok: false, error: "actions.errors.iranPhoneRequired" };
  }
  return { ok: true, phone };
}

/** The placeholder address `signUpOnVerification` hands a brand-new account. */
export function isPlaceholderEmail(email: string | null | undefined): boolean {
  return typeof email === "string" && email.endsWith("@phone.laparli.local");
}
