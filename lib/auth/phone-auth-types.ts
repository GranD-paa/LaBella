import type { Challenge, SolvedChallenge } from "@/lib/auth/otp-challenge-solver";

/**
 * What the sign-in screen and the server actions agree on.
 *
 * Kept apart from the actions file because a `"use server"` module exports
 * only callable functions, and the form needs these shapes at compile time.
 */

/**
 * Which half of the one door this number is going through.
 *
 * The screen says "ورود" or "عضویت" from this, which is a deliberate
 * trade: it tells anyone who types a number whether it belongs to a customer.
 * The alternative — a neutral heading until the code is verified — leaks
 * nothing but leaves people unsure whether they are making a second account.
 * The rate limits are what keep that answer expensive to harvest.
 */
export type AuthMode = "signin" | "signup";

export type RequestCodeInput = {
  phone: string;
  challenge: SolvedChallenge | null;
  /**
   * A field no human sees and no human fills. Anything in it means a form
   * filler walked the DOM, and the request is answered as if it worked.
   */
  trap?: string;
};

export type RequestCodeResult =
  | {
      ok: true;
      mode: AuthMode;
      /** E.164, so the code step asks about exactly what was sent to. */
      phone: string;
      /** How long until "resend" is allowed to do anything. */
      resendAfterMs: number;
    }
  | {
      ok: false;
      /** An i18n key, resolved by the form. Never raw prose. */
      error: string;
      retryAfterMs?: number;
    };

export type VerifyCodeInput = {
  phone: string;
  code: string;
  redirectTo?: string;
};

/** Only ever returned on failure — success redirects instead. */
export type VerifyCodeResult = {
  ok: false;
  error: string;
  retryAfterMs?: number;
};

export type { Challenge, SolvedChallenge };
