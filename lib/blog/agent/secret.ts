import {
  createCipheriv,
  createDecipheriv,
  hkdfSync,
  randomBytes,
} from "node:crypto";

/**
 * Seals the AI service's API key before it goes into the database.
 *
 * The key is typed into the admin panel and stored in `blog_agent_settings`,
 * next to everything else in the same database. Encrypting it means a
 * database dump on its own does not hand over a key that spends money.
 *
 * The encryption key is derived from `BETTER_AUTH_SECRET` rather than a new
 * variable, so production needs nothing added for this to work. The cost is
 * known and small: rotating that secret makes the stored key unreadable, the
 * panel says so, and the owner pastes the key in once more.
 */

const VERSION = "v1";

/**
 * GCM's full sixteen-byte tag, pinned on both sides. Left to infer the length
 * from the stored value, decryption accepts a tag cut down to four bytes —
 * and a four-byte tag is one that can be guessed.
 */
const TAG_BYTES = 16;

function encryptionKey(): Buffer {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is not set; the API key cannot be sealed.");
  }
  // HKDF with a label of its own, so the key is never the auth secret itself
  // and cannot coincide with anything else derived from it.
  return Buffer.from(
    hkdfSync("sha256", secret, "laparli", "blog-agent/api-key/v1", 32)
  );
}

export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv, {
    authTagLength: TAG_BYTES,
  });
  const body = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return [
    VERSION,
    iv.toString("base64"),
    cipher.getAuthTag().toString("base64"),
    body.toString("base64"),
  ].join(".");
}

/**
 * The plain key, or null when it cannot be recovered — sealed under a
 * different secret, tampered with, or not a sealed value at all. Null rather
 * than a throw, because the panel's job at that point is to say "enter the
 * key again", not to fail to render.
 */
export function decryptSecret(sealed: string): string | null {
  const [version, iv, tag, body] = sealed.split(".");
  if (version !== VERSION || !iv || !tag || !body) return null;

  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      encryptionKey(),
      Buffer.from(iv, "base64"),
      { authTagLength: TAG_BYTES }
    );
    decipher.setAuthTag(Buffer.from(tag, "base64"));
    return Buffer.concat([
      decipher.update(Buffer.from(body, "base64")),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    return null;
  }
}
