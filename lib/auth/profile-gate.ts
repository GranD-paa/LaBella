import { cookies } from "next/headers";

/**
 * The flag that says "this account has a name on it".
 *
 * A brand-new account is created the instant a code is verified, with a
 * placeholder name and a placeholder email, and it must not wander into the
 * product in that state. Something has to stop it at every route.
 *
 * That something is a cookie, not a database read, for the same reason the
 * session check in the middleware is a cookie: the app runs in Tehran and the
 * database is in Tabriz, and a round trip on every request to every route is
 * a cost paid by every page to catch a state that lasts ninety seconds once
 * in an account's life.
 *
 * This is a UX gate, not a security boundary, and the difference matters:
 * clearing the cookie does not grant anything. `/welcome` reads the database
 * itself and waves through anyone already finished — so a missing cookie
 * costs one redirect and then repairs itself — and every action that writes
 * checks its own permissions regardless.
 */

export const PROFILE_OK_COOKIE = "laparli_profile_ok";

/**
 * Deliberately far longer than the thirty-day session it rides with.
 *
 * If this expired first, a signed-in account would be sent to `/welcome` to
 * redo a step it finished months ago. Outliving the session by a wide margin
 * means the only way to arrive without it is to have deleted it — which
 * `/api/auth/profile-ok` repairs in one redirect.
 */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 400;

export async function markProfileComplete(): Promise<void> {
  (await cookies()).set(PROFILE_OK_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearProfileFlag(): Promise<void> {
  (await cookies()).delete(PROFILE_OK_COOKIE);
}
