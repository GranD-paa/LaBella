import { cookies } from "next/headers";

export const LOCAL_SESSION_COOKIE = "labella_local_session";

export async function getLocalSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(LOCAL_SESSION_COOKIE)?.value ?? null;
}

export async function setLocalSessionUserId(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(LOCAL_SESSION_COOKIE, userId, {
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
