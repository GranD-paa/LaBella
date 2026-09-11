import { redirect } from "next/navigation";

import { getRolePermissions } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { adminLandingPath, hasPermission } from "@/lib/permissions/admin-nav";
import type { PermissionKey, RolePermissions, RoleSlug } from "@/lib/permissions/roles";

export async function requireAdmin() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login?redirectedFrom=/admin");
  }

  const profile = await repo.getProfileById(user.id);

  if (!profile?.is_admin) {
    redirect("/dashboard");
  }

  return {
    user: { id: user.id, email: user.email },
    profile,
  };
}

export type AdminPageContext = {
  user: { id: string; email: string };
  profile: Awaited<ReturnType<typeof requireAdmin>>["profile"];
  role: RoleSlug;
  permissions: RolePermissions;
  /** Empty for every role that is not language-scoped. */
  assignedLanguages: string[];
};

/**
 * The page-level twin of `requireAdminPermission()`.
 *
 * Server actions already refuse work a role may not do, but a page that still
 * renders is a page that still lies: a writer who can open the accounting
 * dashboard reads real revenue numbers before any action stops them. So the
 * page redirects instead — to the first page the role *can* open, which is
 * also what makes the panel feel built for that role rather than filtered.
 */
export async function requireAdminPage(
  permission?: PermissionKey
): Promise<AdminPageContext> {
  const { user, profile } = await requireAdmin();
  const role = profile.role as RoleSlug;
  const permissions = await getRolePermissions(role);

  if (permission && !hasPermission(permissions, permission)) {
    redirect(adminLandingPath(permissions));
  }

  return {
    user,
    profile,
    role,
    permissions,
    assignedLanguages: profile.assigned_languages ?? [],
  };
}
