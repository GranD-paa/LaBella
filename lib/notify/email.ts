/**
 * Only foreign accounts need email — they verify by link instead of SMS.
 * No sender is configured yet; see the same dev/production split as
 * `lib/notify/sms.ts` for why this shouts instead of failing quietly.
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<void> {
  if (!process.env.SMTP_URL) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP_URL is not set — cannot send email.");
    }
    console.info(`[email:dev] ${to} | ${subject}\n${body}`);
    return;
  }

  throw new Error("SMTP sender not implemented yet.");
}
