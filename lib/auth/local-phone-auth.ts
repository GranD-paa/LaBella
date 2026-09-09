import { setLocalSessionUserId } from "@/lib/auth/local-session";
import { LOCAL_SEED } from "@/lib/data/local/seed";
import { getLocalStore } from "@/lib/data/local/store";

/**
 * The phone door, offline.
 *
 * `NEXT_PUBLIC_DATA_SOURCE=local` exists so the product can be worked on with
 * no database and no network, and the moment the only way in became an SMS
 * code, that mode had a door it could not open. This is that door: the same
 * two screens, the same validation, no gateway and no secrets.
 *
 * Deliberately not wired into `DataRepository`. Adding a phone method to the
 * interface would oblige the Supabase implementation — which is abandoned and
 * has no phone column — to grow one too, for a mode nobody signs into.
 */

/**
 * The code local mode always accepts.
 *
 * Fixed rather than random because there is nowhere for a random one to be
 * read from: no SMS goes out, and a developer hunting the server log for a
 * number every time they sign in is friction with nothing bought by it.
 */
export const LOCAL_DEV_CODE = "000000";

/**
 * The seeded account holding this number, if any.
 *
 * Falls back to the seed when the stored row has no number on it. `.local-data`
 * is written once and then kept across restarts, so a store created before
 * phone sign-in existed has users without the field — and the backfill in
 * `store.ts` only restores missing collections, not missing keys. Reading the
 * seed's own numbers covers that without asking anyone to delete their local
 * database and lose whatever they were working on.
 */
export function findLocalUserByPhone(e164: string): { id: string } | null {
  const users = getLocalStore().users;

  const byStoredPhone = users.find((entry) => entry.phone === e164);
  if (byStoredPhone) {
    return { id: byStoredPhone.id };
  }

  const seeded = LOCAL_SEED.users.find((entry) => entry.phone === e164);
  return seeded && users.some((entry) => entry.id === seeded.id)
    ? { id: seeded.id }
    : null;
}

/**
 * Signs in the seeded account for this number.
 *
 * Returns false when the number matches nobody. Local mode does not create
 * accounts: the seed is the fixture the rest of the offline data hangs off,
 * and an account invented at sign-in would have no lessons, no progress and
 * no profile to look at — which is worse than being told to use one of the
 * two numbers that do work.
 */
export async function signInLocalByPhone(e164: string): Promise<boolean> {
  const user = findLocalUserByPhone(e164);
  if (!user) {
    return false;
  }
  await setLocalSessionUserId(user.id);
  return true;
}
