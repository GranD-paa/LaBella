"use server";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import {
  canEditRolePermissions,
  sanitizeRolePermissionOverride,
  type RoleSlug,
} from "@/lib/permissions/roles";

/**
 * Rewrites what an editable role may do.
 *
 * The head admin's one lever over the admin tier. Three things keep it from
 * becoming a way up: only `EDITABLE_ROLE_SLUGS` can be named, only grantable
 * permissions survive `sanitizeRolePermissionOverride`, and the check
 * constraint on the table refuses the escalating ones even if both of those
 * were somehow bypassed.
 */
export async function updateRolePermissionsAction(
  roleSlug: string,
  permissions: Record<string, unknown>
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageAdminPermissions");
  if (!guard.ok) return { error: guard.error };

  const verdict = canEditRolePermissions(
    guard.profile.role as RoleSlug,
    roleSlug
  );
  if (!verdict.allowed) return { error: verdict.reason };

  const clean = sanitizeRolePermissionOverride(permissions);

  const result = await getDataRepository().setRolePermissionOverride(
    roleSlug,
    clean as Record<string, boolean>,
    guard.profile.id
  );

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
