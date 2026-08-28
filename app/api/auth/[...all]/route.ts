import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth/better-auth";

/**
 * Better Auth's own endpoints — sign-in/out, email verification links, and the
 * phone-number OTP send/verify pair. The middleware must let this path through
 * unauthenticated or none of it can ever be reached.
 */
export const { GET, POST } = toNextJsHandler(auth);
