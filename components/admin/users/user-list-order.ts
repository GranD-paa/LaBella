import { ROLE_SLUGS, type RoleSlug } from "@/lib/permissions/roles";

/**
 * How many rows the users table shows. Past this the page would only grow
 * longer; anyone further down the list is one search away.
 */
export const VISIBLE_USER_LIMIT = 12;

/** Where a role sits in the team; an unrecognised one sinks below everybody. */
function roleRank(role: RoleSlug): number {
  const rank = ROLE_SLUGS.indexOf(role);
  return rank === -1 ? ROLE_SLUGS.length : rank;
}

/**
 * The order the users table lists accounts in.
 *
 * The team leads, walking down the hierarchy exactly as `ROLE_SLUGS` does:
 * super admins, head admins, admins, teachers, writers. Inside a tier the
 * longest-standing account comes first, so the people who have run the
 * platform longest stay at the top whoever is looking. Learners follow,
 * newest sign-up first — the learner worth a glance is the one who just
 * arrived, and they are the rows that fill whatever the team leaves empty.
 */
export function orderUsersForTable<
  T extends { role: RoleSlug; createdAt: string },
>(users: readonly T[]): T[] {
  return [...users].sort((a, b) => {
    const byRole = roleRank(a.role) - roleRank(b.role);
    if (byRole !== 0) return byRole;

    const oldestFirst = Date.parse(a.createdAt) - Date.parse(b.createdAt);
    return a.role === "learner" ? -oldestFirst : oldestFirst;
  });
}
