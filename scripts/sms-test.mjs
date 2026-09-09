/**
 * Ask Melipayamak whether the credentials in .env.local actually work, and
 * optionally send one real code to one real handset.
 *
 *   node scripts/sms-test.mjs                 # check credit only, sends nothing
 *   node scripts/sms-test.mjs 09121234567     # send one test code
 *
 * Why this is not `lib/notify/sms.ts` with a CLI wrapper: it is answering a
 * different question. That module asks "can this code reach this person"; this
 * one asks "is the account configured at all" — and the moment those two share
 * an implementation, a bug in the shared part reports itself as healthy. When
 * this script says the gateway is fine and the app still cannot send, the
 * difference between them is the answer.
 *
 * Nothing here is logged that should not be: the panel password is read from
 * the environment and never printed.
 */
import fs from "node:fs";

for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) process.env[match[1]] = match[2].trim();
}

const REST = "https://rest.payamak-panel.com/api/SendSMS";
const CONSOLE = "https://console.melipayamak.com/api/send";

const mode = (process.env.MELIPAYAMAK_MODE ?? "pattern").toLowerCase();
// Melipayamak wants the mobile number without its trunk zero; the zero-
// prefixed form comes back as UserNameAndPasswordFailed, which reads as a
// bad key rather than a bad username. Accept either spelling.
const rawUsername = process.env.MELIPAYAMAK_USERNAME;
const username = /^0\d{10}$/.test(rawUsername ?? "")
  ? rawUsername.slice(1)
  : rawUsername;
const password = process.env.MELIPAYAMAK_PASSWORD;
const apiKey = process.env.MELIPAYAMAK_API_KEY;
const from = process.env.MELIPAYAMAK_FROM;
const bodyId = process.env.MELIPAYAMAK_BODY_ID;

const target = process.argv[2];

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

async function post(url, body, contentType) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body,
    signal: AbortSignal.timeout(15_000),
  });
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 200) };
  }
}

const form = (fields) =>
  post(
    fields.url,
    new URLSearchParams(fields.body).toString(),
    "application/x-www-form-urlencoded"
  );

console.log(`mode: ${mode}`);

if (mode === "console") {
  if (!apiKey) fail("MELIPAYAMAK_API_KEY is not set");
  if (!from) fail("MELIPAYAMAK_FROM is not set");
} else {
  if (!username || !password) {
    fail("MELIPAYAMAK_USERNAME / MELIPAYAMAK_PASSWORD are not set");
  }

  // Credentials first, and on their own. A template is approved days after a
  // key is issued, and refusing to check the key until the template exists
  // would leave the one thing that can be verified today unverifiable.
  const credit = await form({
    url: `${REST}/GetCredit`,
    body: { username, password },
  });
  if (Number(credit.RetStatus) !== 1) {
    fail(`credentials rejected: ${credit.StrRetStatus ?? JSON.stringify(credit)}`);
  }
  console.log(`✓ credentials accepted — credit: ${credit.Value}`);

  // Only a send needs these.
  if (target && mode === "pattern" && !bodyId) {
    fail("MELIPAYAMAK_BODY_ID is not set — the template is not approved yet");
  }
  if (target && mode === "line" && !from) fail("MELIPAYAMAK_FROM is not set");
}

if (!target) {
  console.log("no number given, so nothing was sent. Pass one to send a code.");
  process.exit(0);
}

if (!/^09\d{9}$/.test(target)) {
  fail(`expected a number like 09121234567, got ${target}`);
}

// A visibly fake code: if this arrives on a handset, the path works, and it is
// obviously not a real login code to anyone who reads it.
const code = "123456";

// Word for word what the app sends, so what arrives on the handset is what a
// real user would see — a test that sends different text can pass while the
// real message is refused for its wording.
const TEST_TEXT = `لاپارلی\nکد ورود شما: ${code}\nاین کد تا ۲ دقیقه معتبر است.\nlaparli.com`;

let result;
if (mode === "pattern") {
  result = await form({
    url: `${REST}/BaseServiceNumber`,
    body: { username, password, text: code, to: target, bodyId },
  });
} else if (mode === "line") {
  result = await form({
    url: `${REST}/SendSMS`,
    body: {
      username,
      password,
      to: target,
      from,
      text: TEST_TEXT,
      isflash: "false",
    },
  });
} else {
  result = await post(
    `${CONSOLE}/simple/${encodeURIComponent(apiKey)}`,
    JSON.stringify({
      from,
      to: target,
      text: TEST_TEXT,
    }),
    "application/json"
  );
}

const accepted =
  mode === "console" ? Number(result.recId) > 0 : Number(result.RetStatus) === 1;

if (!accepted) {
  fail(`gateway refused: ${JSON.stringify(result)}`);
}

console.log(`✓ accepted for ${target} — ${JSON.stringify(result)}`);
console.log("if nothing arrives, the credentials are fine and the problem is");
console.log("the template approval, the sender line, or the carrier blacklist.");
