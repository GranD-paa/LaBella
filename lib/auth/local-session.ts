import { cookies } from "next/headers";

export const LOCAL_SESSION_COOKIE = "labella_local_session";

function getSessionSecret(): string {
  const secret = process.env.LOCAL_SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && !secret) {
    throw new Error("LOCAL_SESSION_SECRET must be set when using local data mode.");
  }
  return secret ?? "labella-local-dev-secret-change-me";
}

function toBase64Url(bytes: ArrayBuffer): string {
  return Buffer.from(bytes).toString("base64url");
}

async function signSession(userId: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(userId)
  );
  return `${userId}.${toBase64Url(signature)}`;
}

export async function verifyLocalSessionToken(
  token: string
): Promise<string | null> {
  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex <= 0) {
    return null;
  }

  const userId = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);
  if (!userId || !signature) {
    return null;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const expected = toBase64Url(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(userId))
  );

  if (signature.length !== expected.length) {
    return null;
  }

  let mismatch = 0;
  for (let index = 0; index < signature.length; index += 1) {
    mismatch |= signature.charCodeAt(index) ^ expected.charCodeAt(index);
  }

  return mismatch === 0 ? userId : null;
}

export async function getLocalSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(LOCAL_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  return verifyLocalSessionToken(token);
}

export async function setLocalSessionUserId(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(LOCAL_SESSION_COOKIE, await signSession(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearLocalSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(LOCAL_SESSION_COOKIE);
}
