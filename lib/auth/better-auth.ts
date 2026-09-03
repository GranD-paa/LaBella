import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";

import {
  POOL_OPTIONS,
  resolveConnectionString,
} from "@/lib/data/postgres/client";
import { isIranianPhone, normalizePhone } from "@/lib/notify/phone";
import { sendSms } from "@/lib/notify/sms";

/**
 * Auth for the ArvanCloud Postgres deployment, replacing Supabase Auth.
 *
 * One rule, no branches: an account is proved by an SMS code to an Iranian
 * number. Someone living abroad supplies an Iranian number too — that is
 * deliberate, and it is why the sign-up form has no country choice on it.
 *
 * An email address is still required of everyone, because receipts and notices
 * go there. It is never verified: nothing in the product waits on it, and a
 * confirmation link the user can ignore is a step that only loses sign-ups.
 *
 * Verification is not enforced by Better Auth's own `requireVerification` —
 * `isVerified` below is the single place that rule lives, so the answer stays
 * one function rather than a setting plus a gate that can disagree.
 */
export const auth = betterAuth({
  database: new Pool({
    connectionString: resolveConnectionString(),
    ...POOL_OPTIONS,
  }),
  emailAndPassword: {
    enabled: true,
    // The phone is what proves an account — see `isVerified`.
    requireEmailVerification: false,
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
 * +98 — so it is refused at sign-up rather than stranding an account that can
 * never finish verifying.
 */
export function assertVerifiablePhone(
  rawPhone: string
): { ok: true; phone: string } | { ok: false; error: string } {
  const phone = normalizePhone(rawPhone);
  if (!phone) {
    return { ok: false, error: "actions.errors.invalidPhone" };
  }
  if (!isIranianPhone(phone)) {
    return { ok: false, error: "actions.errors.iranPhoneRequired" };
  }
  return { ok: true, phone };
}
