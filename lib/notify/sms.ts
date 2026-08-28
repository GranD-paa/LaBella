import { isIranianPhone } from "@/lib/notify/phone";

/**
 * Melipayamak is the chosen gateway but is not wired up yet — no panel, no
 * API key. Until it is, dev prints the code to the server console and
 * production refuses loudly rather than silently swallowing a verification
 * the user is waiting on.
 */
export async function sendSms(to: string, text: string): Promise<void> {
  if (!isIranianPhone(to)) {
    throw new Error(`Refusing to SMS a non-Iranian number: ${to}`);
  }

  const apiKey = process.env.MELIPAYAMAK_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("MELIPAYAMAK_API_KEY is not set — cannot send SMS.");
    }
    console.info(`[sms:dev] ${to} -> ${text}`);
    return;
  }

  throw new Error("Melipayamak sender not implemented yet.");
}
