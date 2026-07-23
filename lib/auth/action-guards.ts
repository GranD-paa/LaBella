import { getDataRepository } from "@/lib/data";
import {
  ROLE_DEFINITIONS,
  type RolePermissions,
  type RoleSlug,
} from "@/lib/permissions/roles";
import type { Profile } from "@/types";

type GuardOk = {
  ok: true;
  user: { id: string; email: string };
  profile: Profile;
};

type GuardFail = {
  ok: false;
  error: "actions.errors.forbidden" | "actions.errors.mustSignIn";
};

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

  return { ok: true, user: { id: user.id, email: user.email }, profile };
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

export async function requireAdminPermission(
  permission: keyof RolePermissions
): Promise<GuardOk | GuardFail> {
  const admin = await requireAdminAction();
  if (!admin.ok) {
    return admin;
  }

  const role = admin.profile.role as RoleSlug;
  if (!ROLE_DEFINITIONS[role]?.permissions[permission]) {
    return { ok: false, error: "actions.errors.forbidden" };
  }

  return admin;
}

export async function requireSuperAdminAction(): Promise<GuardOk | GuardFail> {
  const admin = await requireAdminAction();
  if (!admin.ok) {
    return admin;
  }

  if (admin.profile.role !== "super_admin") {
    return { ok: false, error: "actions.errors.forbidden" };
  }

  return admin;
}
