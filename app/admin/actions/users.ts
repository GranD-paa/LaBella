"use server";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import {
  canChangeUserRole,
  canChangeUserStatus,
  resolveAdminToggleRole,
  type ManagedAccount,
  type RoleSlug,
  type UserStatus,
} from "@/lib/permissions/roles";
import type { DataRepository } from "@/lib/data/repository";

async function loadTarget(
  repo: DataRepository,
  userId: string
): Promise<ManagedAccount | null> {
  const profile = await repo.getProfileById(userId);
  if (!profile) return null;
  return { id: profile.id, role: profile.role as RoleSlug };
}

async function countSuperAdmins(repo: DataRepository): Promise<number> {
  const profiles = await repo.getAllProfiles();
  return profiles.filter((profile) => profile.role === "super_admin").length;
}

export async function updateUserAdminStatus(
  userId: string,
  isAdmin: boolean
): Promise<ActionResult> {
  // Promote/demote rewrites the role, so it is gated like any other role
  // change: super admins only, never against another super admin.
  const guard = await requireAdminPermission("manageRoles");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const target = await loadTarget(repo, userId);
  if (!target) return { error: "actions.errors.generic" };

  const actor: ManagedAccount = {
    id: guard.profile.id,
    role: guard.profile.role as RoleSlug,
  };
  const nextRole = resolveAdminToggleRole(target.role, isAdmin);
  const verdict = canChangeUserRole(
    actor,
    target,
    nextRole,
    await countSuperAdmins(repo)
  );
  if (!verdict.allowed) return { error: verdict.reason };

  const result = await repo.updateUserAdminStatus(userId, isAdmin);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}

export async function updateUserRole(
  userId: string,
  role: RoleSlug
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageRoles");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const target = await loadTarget(repo, userId);
  if (!target) return { error: "actions.errors.generic" };

  const actor: ManagedAccount = {
    id: guard.profile.id,
    role: guard.profile.role as RoleSlug,
  };
  const verdict = canChangeUserRole(
    actor,
    target,
    role,
    await countSuperAdmins(repo)
  );
  if (!verdict.allowed) return { error: verdict.reason };

  const result = await repo.updateUserRole(userId, role);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}

export async function updateUserStatus(
  userId: string,
  status: UserStatus
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageUsers");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const target = await loadTarget(repo, userId);
  if (!target) return { error: "actions.errors.generic" };

  const actor: ManagedAccount = {
    id: guard.profile.id,
    role: guard.profile.role as RoleSlug,
  };
  const verdict = canChangeUserStatus(actor, target, status);
  if (!verdict.allowed) return { error: verdict.reason };

  const result = await repo.updateUserStatus(userId, status);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
