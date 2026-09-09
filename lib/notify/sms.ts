import { isIranianMobile, toLocalIranFormat } from "@/lib/notify/phone";

/**
 * Melipayamak, the only thing this app sends an SMS through.
 *
 * Three ways in, because a Melipayamak account can be sold with any of them
 * and which one you have is not visible from the code:
 *
 *   - `pattern`  — a template approved in the panel, addressed by `bodyId`.
 *     The right one for a verification code: it needs no dedicated line and
 *     it reaches numbers on the carrier blacklist, which a marketing line
 *     does not. A user who once texted OFF to 10 is otherwise unreachable,
 *     and they will never know why their code does not arrive.
 *   - `line`     — a dedicated sender number and free text.
 *   - `console`  — the newer key-based console API.
 *
 * All three were reachable over a foreign VPN when this was written, so the
 * gateway is not the thing that breaks when the developer is abroad.
 */

export type SmsMode = "pattern" | "line" | "console";

const REST_BASE = "https://rest.payamak-panel.com/api/SendSMS";
const CONSOLE_BASE = "https://console.melipayamak.com/api/send";

/** An SMS must never be the reason a request hangs. */
const TIMEOUT_MS = 10_000;

export class SmsError extends Error {
  constructor(
    message: string,
    readonly retriable: boolean
  ) {
    super(message);
    this.name = "SmsError";
  }
}

/**
 * The panel username, as the web service wants it.
 *
 * Melipayamak identifies an account by its mobile number **without the trunk
 * zero** — `9121234567`, not `09121234567` — and rejects the zero-prefixed
 * form with `UserNameAndPasswordFailed`, the same answer it gives a genuinely
 * wrong key. So the one mistake everybody makes is reported as the one thing
 * it is not, and the hunt goes to the API key instead.
 *
 * Stripping it here means either spelling works in `.env`.
 */
function panelUsername(raw: string): string {
  return /^0\d{10}$/.test(raw) ? raw.slice(1) : raw;
}

function resolveMode(): SmsMode {
  const raw = process.env.MELIPAYAMAK_MODE?.trim().toLowerCase();
  if (raw === "line" || raw === "console" || raw === "pattern") {
    return raw;
  }
  return "pattern";
}

/**
 * Whether the gateway is configured well enough to try.
 *
 * Read as a whole rather than key by key so a half-filled `.env` fails at
 * startup-shaped moments rather than at the moment a user is waiting on a code.
 *
 * `MELIPAYAMAK_PASSWORD` takes the panel's **API key**, not the password you
 * log in with. Melipayamak says this outright and it is the single most common
 * way this integration fails: the sign-in password is refused by the web
 * service with the same `UserNameAndPasswordFailed` as a genuine typo, so it
 * looks like wrong credentials rather than the wrong *kind* of credential.
 * Find it in the panel under توسعه دهندگان › وب سرویس و API.
 */
function credentials(mode: SmsMode) {
  const rawUsername = process.env.MELIPAYAMAK_USERNAME?.trim();
  const username = rawUsername ? panelUsername(rawUsername) : undefined;
  const password = process.env.MELIPAYAMAK_PASSWORD?.trim();
  const apiKey = process.env.MELIPAYAMAK_API_KEY?.trim();
  const from = process.env.MELIPAYAMAK_FROM?.trim();
  const bodyId = process.env.MELIPAYAMAK_BODY_ID?.trim();

  switch (mode) {
    case "pattern":
      return username && password && bodyId
        ? ({ mode, username, password, bodyId } as const)
        : null;
    case "line":
      return username && password && from
        ? ({ mode, username, password, from } as const)
        : null;
    case "console":
      return apiKey && from ? ({ mode, apiKey, from } as const) : null;
  }
}

export function isSmsConfigured(): boolean {
  return credentials(resolveMode()) !== null;
}

async function post(
  url: string,
  body: string,
  contentType: string
): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) {
      throw new SmsError(`gateway returned HTTP ${response.status}`, true);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof SmsError) {
      throw error;
    }
    const reason = error instanceof Error ? error.message : String(error);
    throw new SmsError(`gateway unreachable: ${reason}`, true);
  } finally {
    clearTimeout(timer);
  }
}

type RestResult = { Value?: unknown; RetStatus?: unknown; StrRetStatus?: unknown };

/**
 * The REST API answers 200 with the failure in the body, so the status code
 * says nothing. `RetStatus` 1 is the only success; everything else — bad
 * credentials, no credit, an unapproved template — is a refusal wearing an OK.
 */
function assertRestAccepted(payload: unknown): void {
  const result = (payload ?? {}) as RestResult;
  if (Number(result.RetStatus) === 1) {
    return;
  }
  const detail = String(result.StrRetStatus ?? result.RetStatus ?? "unknown");
  // Credentials and quota are ours to fix; the network is worth another try.
  throw new SmsError(`gateway refused: ${detail}`, false);
}

function assertConsoleAccepted(payload: unknown): void {
  const result = (payload ?? {}) as { recId?: unknown; status?: unknown };
  if (Number(result.recId) > 0) {
    return;
  }
  throw new SmsError(`gateway refused: ${String(result.status ?? "unknown")}`, false);
}

/**
 * The code, on its way to a handset.
 *
 * Takes the code rather than a finished sentence because `pattern` mode sends
 * the code alone and lets the approved template say the rest — passing it a
 * pre-written message would put our words inside their template and deliver
 * nonsense.
 */
export async function sendVerificationCode(
  e164: string,
  code: string
): Promise<void> {
  if (!isIranianMobile(e164)) {
    throw new SmsError(`refusing to SMS a number no Iranian handset holds: ${e164}`, false);
  }

  const mode = resolveMode();
  const creds = credentials(mode);
  const to = toLocalIranFormat(e164);

  if (!creds) {
    if (process.env.NODE_ENV === "production") {
      throw new SmsError(`MELIPAYAMAK_* is not configured for mode "${mode}"`, false);
    }
    // Development without a panel: the code goes to the terminal, which is the
    // only place a developer can read it from anyway.
    console.info(`[sms:dev] ${to} -> code ${code}`);
    return;
  }

  if (creds.mode === "pattern") {
    const payload = await post(
      `${REST_BASE}/BaseServiceNumber`,
      new URLSearchParams({
        username: creds.username,
        password: creds.password,
        text: code,
        to,
        bodyId: creds.bodyId,
      }).toString(),
      "application/x-www-form-urlencoded"
    );
    assertRestAccepted(payload);
    return;
  }

  if (creds.mode === "line") {
    const payload = await post(
      `${REST_BASE}/SendSMS`,
      new URLSearchParams({
        username: creds.username,
        password: creds.password,
        to,
        from: creds.from,
        text: verificationText(code),
        isflash: "false",
      }).toString(),
      "application/x-www-form-urlencoded"
    );
    assertRestAccepted(payload);
    return;
  }

  const payload = await post(
    `${CONSOLE_BASE}/simple/${encodeURIComponent(creds.apiKey)}`,
    JSON.stringify({ from: creds.from, to, text: verificationText(code) }),
    "application/json"
  );
  assertConsoleAccepted(payload);
}

/**
 * What a Persian-speaking user reads on their lock screen.
 *
 * The number goes on its own line so the phone's one-time-code detector finds
 * it, and the brand goes first so the message is recognisable before it is
 * opened.
 *
 * Used only by `line` and `console` mode. In `pattern` mode Melipayamak owns
 * the wording — we send the digits alone and their approved template says the
 * rest — so this must be kept word-for-word identical to that template, minus
 * the `{0}` placeholder. Two versions of the same sentence is how a user ends
 * up told "۵ دقیقه" by an SMS and "۲ دقیقه" by the screen.
 *
 * The domain is not decoration: a service-line template is only approved with
 * the sender's site on it.
 */
export function verificationText(code: string): string {
  return `لاپارلی\nکد ورود شما: ${code}\nاین کد تا ۲ دقیقه معتبر است.\nlaparli.com`;
}
