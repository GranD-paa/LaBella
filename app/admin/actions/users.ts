"use server";

import {
  requireAdminPermission,
} from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import type { RoleSlug, UserStatus } from "@/lib/permissions/roles";

export async function updateUserAdminStatus(
  userId: string,
  isAdmin: boolean
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageUsers");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
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
  const result = await repo.updateUserStatus(userId, status);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
