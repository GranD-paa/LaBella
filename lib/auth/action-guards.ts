import { getDataRepository } from "@/lib/data";
import {
  coversLanguage,
  isLanguageScopedRole,
  resolveRolePermissions,
  type PermissionKey,
  type RolePermissions,
  type RolePermissionOverrides,
  type RoleSlug,
} from "@/lib/permissions/roles";
import type { Profile } from "@/types";

type GuardOk = {
  ok: true;
  user: { id: string; email: string };
  profile: Profile;
  role: RoleSlug;
  /** Already merged with any head-admin override for the role. */
  permissions: RolePermissions;
  /** Empty for every role that is not language-scoped. */
  assignedLanguages: string[];
};

type GuardFail = {
  ok: false;
  error:
    | "actions.errors.forbidden"
    | "actions.errors.mustSignIn"
    | "admin.users.guard.languageForbidden";
};

export type AdminGuardResult = GuardOk | GuardFail;

export async function requireAuthenticatedAction(): Promise<GuardOk | GuardFail> {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    return { ok: false, error: "actions.errors.mustSignIn" };
  }

  const profile = await repo.getProfileById(user.id);
  if (!profile) {
    return { ok: false, error: "actions.errors.forbidden" };
  }

  const role = profile.role as RoleSlug;

  return {
    ok: true,
    user: { id: user.id, email: user.email },
    profile,
    role,
    // The plain role defaults. Only `requireAdminPermission` pays for the
    // override read, because only it can be changed by one.
    permissions: resolveRolePermissions(role),
    assignedLanguages: profile.assigned_languages ?? [],
  };
}

export async function requireAdminAction(): Promise<GuardOk | GuardFail> {
  const auth = await requireAuthenticatedAction();
  if (!auth.ok) {
    return auth;
  }

  if (!auth.profile.is_admin) {
    return { ok: false, error: "actions.errors.forbidden" };
  }

  return auth;
}

/**
 * The effective permissions of a role, including whatever a head admin has
 * changed about it.
 *
 * Read fresh on every call rather than cached in module scope: an override is
 * a security decision, and a stale process holding yesterday's copy is exactly
 * the failure mode the editor exists to prevent.
 */
export async function getRolePermissions(
  role: RoleSlug
): Promise<RolePermissions> {
  const overrides = (await getDataRepository().getRolePermissionOverrides()) as
    | RolePermissionOverrides
    | undefined;
  return resolveRolePermissions(role, overrides);
}

export async function requireAdminPermission(
  permission: PermissionKey
): Promise<GuardOk | GuardFail> {
  const admin = await requireAdminAction();
  if (!admin.ok) {
    return admin;
  }

  const permissions = await getRolePermissions(admin.role);
  if (!permissions[permission] && !permissions.fullAccess) {
    return { ok: false, error: "actions.errors.forbidden" };
  }

  return { ...admin, permissions };
}

/**
 * A permission plus the language the work lands in.
 *
 * Language-scoped roles (the teacher) may only touch their own languages; for
 * everyone else the language is irrelevant and the check passes through. Pass
 * `null` when the target's language genuinely cannot be determined — that is
 * treated as out of scope for a scoped role rather than as a free pass.
 */
export async function requireContentScope(
  permission: PermissionKey,
  languageSlug: string | null | undefined
): Promise<GuardOk | GuardFail> {
  const guard = await requireAdminPermission(permission);
  if (!guard.ok) return guard;

  if (
    !coversLanguage(guard.role, guard.assignedLanguages, languageSlug ?? "")
  ) {
    return { ok: false, error: "admin.users.guard.languageForbidden" };
  }

  return guard;
}

/**
 * Checks an already-granted guard against the language of the row being
 * touched, when the row's language is only knowable from the database.
 *
 * Returns an error key to hand straight back, or null when the work may go
 * ahead. The lookup is skipped entirely for roles that are not language-scoped,
 * so the common path costs nothing.
 */
export async function enforceLanguageScope(
  guard: GuardOk,
  resolveLanguage: () => Promise<string | null>
): Promise<GuardFail["error"] | null> {
  if (!isLanguageScopedRole(guard.role)) return null;

  const languageSlug = await resolveLanguage();
  if (!coversLanguage(guard.role, guard.assignedLanguages, languageSlug ?? "")) {
    return "admin.users.guard.languageForbidden";
  }

  return null;
}

export async function requireSuperAdminAction(): Promise<GuardOk | GuardFail> {
  const admin = await requireAdminAction();
  if (!admin.ok) {
    return admin;
  }

  if (admin.role !== "super_admin") {
    return { ok: false, error: "actions.errors.forbidden" };
  }

  return admin;
}
