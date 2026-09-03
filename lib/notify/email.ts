import nodemailer, { type Transporter } from "nodemailer";

import { claimSend } from "@/lib/notify/send-limit";

/**
 * Outgoing mail.
 *
 * No account is proved by email — that is the SMS code's job — but every
 * account gives an address, and receipts and notices go to it.
 *
 * The sender is an ordinary SMTP mailbox rather than an email API. The app
 * runs on Iranian infrastructure and the transactional-email providers refuse
 * traffic from those addresses; a mailbox on a host that does not care where
 * the connection comes from is the way through.
 *
 * Configured as four separate variables rather than one connection URL. A URL
 * would have to carry `noreply%40laparli.com` for the username and percent-
 * encode every awkward character in the password, and these are typed into a
 * hosting panel by hand — the encoding would be got wrong exactly once and the
 * failure would look like bad credentials.
 */

/** Who the mail is from, when `MAIL_FROM` does not say. */
const FALLBACK_FROM = "Laparli <noreply@laparli.com>";

/**
 * One transport for the life of the process.
 *
 * Nodemailer pools connections per transport, so building a new one per
 * message would mean a fresh TLS handshake and SMTP login for every email —
 * several round trips to Europe on every sign-up.
 */
let transport: Transporter | null = null;

function getTransport(host: string, user: string, pass: string): Transporter {
  if (transport) return transport;

  // 465 is implicit TLS, 587 upgrades with STARTTLS. `secure` has to agree
  // with the port or the handshake hangs rather than failing.
  const port = Number(process.env.SMTP_PORT ?? 465);

  transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    pool: true,
    maxConnections: 2,
    // A hung connection to a mail host must not hold a request open.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return transport;
}

/**
 * Sends one email, or declines to.
 *
 * The send limit is enforced here rather than left to each caller. A rule the
 * caller has to remember holds only until someone adds a feature without
 * reading this file — and the whole point of the limit is the message nobody
 * thought about. Anything that goes out through this function is counted,
 * whatever adds it later.
 *
 * Returns false when the limit refused it. Callers should treat a refusal as
 * "sent" in anything they say back to a visitor: a response that differs
 * between the two turns the endpoint into a way of discovering which addresses
 * have accounts.
 */
export async function sendEmail(
  to: string,
  subject: string,
  body: string,
  /** The caller's IP, when the send is on behalf of a request. */
  ip?: string | null
): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SMTP_HOST, SMTP_USER and SMTP_PASS must all be set — cannot send email."
      );
    }
    // Development has no mailbox and should not need one: the link a
    // developer is waiting on is more useful in the terminal than in an inbox.
    console.info(`[email:dev] ${to} | ${subject}\n${body}`);
    // No quota is spent, because nothing left the building.
    return true;
  }

  if (!(await claimSend("email", { recipient: to, ip }))) return false;

  await getTransport(host, user, pass).sendMail({
    from: process.env.MAIL_FROM ?? FALLBACK_FROM,
    to,
    subject,
    text: body,
  });

  return true;
}
