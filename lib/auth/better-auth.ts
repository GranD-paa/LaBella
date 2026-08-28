import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";

import { resolveConnectionString } from "@/lib/data/postgres/client";
import { sendEmail } from "@/lib/notify/email";
import { isIranianPhone, normalizePhone } from "@/lib/notify/phone";
import { sendSms } from "@/lib/notify/sms";

/** Which verification path an account follows, chosen by the user at sign-up. */
export type Region = "ir" | "intl";

/**
 * Auth for the ArvanCloud Postgres deployment, replacing Supabase Auth.
 *
 * Verification is deliberately NOT enforced here. Better Auth can only gate
 * sign-in on one channel globally (`requireVerification`), but our rule splits
 * by audience: accounts inside Iran pass SMS OTP, accounts abroad verify by
 * email link because an international SMS costs ~146x a domestic one.
 * `isVerified` below is the single place that rule lives.
 *
 * The split follows the region the user picks before signing up, not the phone
 * prefix — an explicit answer beats inferring one, and `assertRegionMatchesPhone`
 * keeps the two from disagreeing. Every account stores a phone number either
 * way; it is what SpotPlayer burns into the video watermark.
 */
export const auth = betterAuth({
  database: new Pool({ connectionString: resolveConnectionString() }),
  user: {
    additionalFields: {
      region: { type: "string", required: true, defaultValue: "ir", input: true },
    },
  },
  emailAndPassword: {
    enabled: true,
    // Our own gate decides this per audience — see `isVerified`.
    requireEmailVerification: false,
  },
  emailVerification: {
    sendOnSignUp: false,
    async sendVerificationEmail({ user, url }) {
      await sendEmail(
        user.email,
        "Laparli — confirm your email",
        `Confirm your account: ${url}`
      );
    },
  },
  plugins: [
    phoneNumber({
      otpLength: 6,
      expiresIn: 300,
      phoneNumberValidator: (value) => normalizePhone(value) !== null,
      async sendOTP({ phoneNumber: to, code }) {
        await sendSms(to, `Laparli verification code: ${code}`);
      },
    }),
    // Must stay last: it wraps the others so `auth.api.*` can set session
    // cookies from inside a server action.
    nextCookies(),
  ],
});

type VerifiableUser = {
  region?: string | null;
  phoneNumberVerified?: boolean | null;
  emailVerified?: boolean | null;
};

/**
 * Whether an account has cleared the verification step that applies to it:
 * SMS inside Iran, an email link abroad. Unknown regions fall back to the
 * email path, which costs nothing to send.
 */
export function isVerified(user: VerifiableUser): boolean {
  return user.region === "ir"
    ? Boolean(user.phoneNumberVerified)
    : Boolean(user.emailVerified);
}

/**
 * Someone who says they are in Iran but hands us a foreign number would never
 * receive their code — the SMS gateway only serves +98. Reject the pair at
 * sign-up rather than stranding the account half-verified.
 *
 * The reverse is allowed on purpose: an Iranian number is perfectly normal for
 * someone living abroad, and they verify by email regardless.
 */
export function assertRegionMatchesPhone(
  region: Region,
  rawPhone: string
): { ok: true; phone: string } | { ok: false; error: string } {
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    return { ok: false, error: "actions.errors.invalidPhone" };
  }
  if (region === "ir" && !isIranianPhone(phone)) {
    return { ok: false, error: "actions.errors.iranPhoneRequired" };
  }
  return { ok: true, phone };
}
