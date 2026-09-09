import { queryOne, withTransaction } from "@/lib/data/postgres/client";

/**
 * The few reads and writes the phone flow needs that no repository method
 * covers, kept together so the action file stays about the flow.
 *
 * These reach past `DataRepository` on purpose. The repository is shaped
 * around a learner and their course; a phone number is not a learner yet, and
 * "does this number exist" has to be answerable before there is anything to
 * be a repository of.
 */

/** Whether this number is already somebody's. Nothing else about them. */
export async function phoneHasAccount(e164: string): Promise<boolean> {
  const row = await queryOne<{ exists: boolean }>(
    `select true as exists from public."user" where "phoneNumber" = $1 limit 1`,
    [e164]
  );
  return row !== null;
}

export type ProfileState = {
  id: string;
  isAdmin: boolean;
  isComplete: boolean;
  isSuspended: boolean;
};

/**
 * The three things the sign-in path has to know before letting someone
 * through, in one read: whether they run the place, whether they have finished
 * introducing themselves, and whether they are allowed in at all.
 */
export async function readProfileState(
  userId: string
): Promise<ProfileState | null> {
  const row = await queryOne<{
    id: string;
    is_admin: boolean;
    status: string;
    profile_completed_at: string | null;
  }>(
    `select id, is_admin, status, profile_completed_at
       from public.profiles
      where id = $1`,
    [userId]
  );

  if (!row) {
    return null;
  }
  return {
    id: row.id,
    isAdmin: Boolean(row.is_admin),
    isComplete: row.profile_completed_at !== null,
    isSuspended: row.status === "suspended",
  };
}

export type ProfileDetails = {
  firstName: string;
  lastName: string;
  email: string;
  /** Gregorian `YYYY-MM-DD`; the form speaks Jalali and converts on the way in. */
  birthDate: string;
};

export type SaveProfileResult =
  | { ok: true }
  | { ok: false; error: "emailTaken" | "failed" };

/** Postgres says this when a unique index refuses a row. */
const UNIQUE_VIOLATION = "23505";

/**
 * Puts the real person over the placeholder, on both tables at once.
 *
 * One transaction because these two rows are one fact. Better Auth owns
 * `user` and the app owns `profiles`, and a half-applied write here leaves an
 * account whose name depends on which screen you look at.
 *
 * The `user` row is updated with plain SQL rather than through Better Auth,
 * whose email change is a verification flow — a confirmation link, for an
 * address this product deliberately never verifies.
 */
export async function saveProfile(
  userId: string,
  details: ProfileDetails
): Promise<SaveProfileResult> {
  const fullName = `${details.firstName} ${details.lastName}`.trim();

  try {
    await withTransaction(async (run) => {
      await run(
        `update public."user"
            set "name" = $2, email = $3, "updatedAt" = now()
          where id = $1`,
        [userId, fullName, details.email]
      );
      await run(
        `update public.profiles
            set first_name = $2,
                last_name  = $3,
                full_name  = $4,
                email      = $5,
                birth_date = $6::date,
                profile_completed_at = now()
          where id = $1`,
        [
          userId,
          details.firstName,
          details.lastName,
          fullName,
          details.email,
          details.birthDate,
        ]
      );
    });
    return { ok: true };
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    if (code === UNIQUE_VIOLATION) {
      return { ok: false, error: "emailTaken" };
    }
    return { ok: false, error: "failed" };
  }
}
