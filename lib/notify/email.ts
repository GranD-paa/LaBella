import nodemailer, { type Transporter } from "nodemailer";

/**
 * Outgoing mail.
 *
 * Only foreign accounts need email — they verify by link instead of SMS,
 * because an international SMS costs about 146x a domestic one. Everything
 * else the app says to a user goes out over another channel.
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

export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<void> {
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
    return;
  }

  await getTransport(host, user, pass).sendMail({
    from: process.env.MAIL_FROM ?? FALLBACK_FROM,
    to,
    subject,
    text: body,
  });
}
