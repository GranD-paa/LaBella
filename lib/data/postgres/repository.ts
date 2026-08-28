import { headers } from "next/headers";

import { auth } from "@/lib/auth/better-auth";
import { query, queryOne } from "@/lib/data/postgres/client";
import type {
  AuthUser,
  DataRepository,
  ProfileSummary,
} from "@/lib/data/repository";
import type { Profile } from "@/types";

type ProfileRow = Omit<ProfileSummary, "created_at"> & { created_at: Date };

const PROFILE_COLUMNS =
  "id, full_name, avatar_url, email, is_admin, role, status, created_at";

function toProfileSummary(row: ProfileRow): ProfileSummary {
  return { ...row, created_at: row.created_at.toISOString() };
}

/**
 * Reads and writes go through Better Auth for identity and plain SQL for
 * everything else. Unlike the Supabase repository there is no per-request
 * database identity to lean on — the app connects as a single role — so every
 * caller must pass the user id it means, and authorization lives in
 * `lib/permissions` and `lib/auth/action-guards.ts`.
 */
export function createPostgresRepository(): DataRepository {
  const implemented: Partial<DataRepository> = {
    async getAuthUser(): Promise<AuthUser | null> {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user?.email) {
        return null;
      }
      return { id: session.user.id, email: session.user.email };
    },

    async signInWithPassword(email: string, password: string) {
      try {
        await auth.api.signInEmail({
          body: { email, password },
          headers: await headers(),
        });
      } catch {
        // Better Auth distinguishes unknown-email from wrong-password; we
        // deliberately do not, so the form cannot be used to discover which
        // addresses have accounts.
        return { error: "Invalid login credentials" };
      }

      const profile = await queryOne<{ status: Profile["status"] }>(
        "select status from profiles where email = $1",
        [email]
      );
      if (profile?.status === "suspended") {
        await this.signOut!();
        return {
          error: "Your account has been suspended. Contact an administrator.",
        };
      }

      return {};
    },

    async signOut(): Promise<void> {
      await auth.api.signOut({ headers: await headers() });
    },

    async getProfileById(userId: string) {
      const row = await queryOne<ProfileRow>(
        `select ${PROFILE_COLUMNS} from profiles where id = $1`,
        [userId]
      );
      return row ? toProfileSummary(row) : null;
    },

    async getAllProfiles() {
      const rows = await query<ProfileRow>(
        `select ${PROFILE_COLUMNS} from profiles order by created_at desc`
      );
      return rows.map(toProfileSummary);
    },

    async updateUserAdminStatus(userId: string, isAdmin: boolean) {
      await query("update profiles set is_admin = $2 where id = $1", [
        userId,
        isAdmin,
      ]);
      return {};
    },

    async updateUserRole(userId: string, role: Profile["role"]) {
      await query("update profiles set role = $2 where id = $1", [
        userId,
        role,
      ]);
      return {};
    },

    async updateUserStatus(userId: string, status: Profile["status"]) {
      await query("update profiles set status = $2 where id = $1", [
        userId,
        status,
      ]);
      return {};
    },

    async sendPasswordResetEmail(email: string) {
      await auth.api.requestPasswordReset({
        body: { email, redirectTo: "/login" },
        headers: await headers(),
      });
      return {};
    },
  };

  // The interface is 81 methods wide and this source is being filled in a
  // slice at a time. Anything not yet ported fails loudly and by name rather
  // than silently returning undefined into a page.
  return new Proxy(implemented as DataRepository, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (value !== undefined) {
        return value;
      }
      return () => {
        throw new Error(
          `postgres repository: ${String(property)}() is not implemented yet`
        );
      };
    },
  });
}
