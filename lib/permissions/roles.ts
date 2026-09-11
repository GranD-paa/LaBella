// The role tiers behind the admin panel.
//
// Two layers decide what an account may do:
//
//   1. `role` on the profile picks a row out of `ROLE_DEFINITIONS` below. That
//      row is the *default* permission set for the tier.
//   2. For the roles listed in `EDITABLE_ROLE_SLUGS`, a head admin may store
//      an override in `role_permission_overrides`, which
//      `resolveRolePermissions()` merges on top of the default.
//
// `requireAdmin()` still decides who may open /admin at all; the permission
// flags decide which pages and which server actions answer once they are in.
//
// Paid tiers (pro, max, …) are deliberately NOT roles. A learner's paid access
// comes from their live subscription and from what the admin panel says each
// plan unlocks — see `lib/entitlements`. Storing "pro" as a role would be a
// second, silently diverging source of truth for the same question.

import type { LanguageSlug } from "@/lib/curriculum/types";

export const ROLE_SLUGS = [
  "super_admin",
  "head_admin",
  "admin",
  "teacher",
  "writer",
  "learner",
] as const;

export type RoleSlug = (typeof ROLE_SLUGS)[number];

export const ADMIN_ROLE_SLUGS = ROLE_SLUGS.filter(
  (slug) => slug !== "learner"
) as Exclude<RoleSlug, "learner">[];

export const USER_STATUSES = ["active", "suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

// ------------------------------------------------------------- permissions

/**
 * Every distinct thing the panel gates on, in the order the reference table
 * renders them. Adding one here is all it takes for a head admin to be able
 * to hand it to the admin tier — the editor is generated from this list.
 */
export const PERMISSION_KEYS = [
  "viewUsers",
  "answerSupport",
  "suspendUsers",
  "manageRoles",
  "manageAdminPermissions",
  "manageContent",
  "manageQuizzes",
  "manageBlog",
  "manageLanguages",
  "manageBanners",
  "manageLanding",
  "manageSubscriptions",
  "manageBilling",
  "fullAccess",
] as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[number];

export type RolePermissions = Record<PermissionKey, boolean>;

/** One translation key per permission, for every surface that lists them. */
export const PERMISSION_LABEL_KEYS: Record<PermissionKey, string> = {
  viewUsers: "admin.users.permissions.viewUsers",
  answerSupport: "admin.users.permissions.answerSupport",
  suspendUsers: "admin.users.permissions.suspendUsers",
  manageRoles: "admin.users.permissions.manageRoles",
  manageAdminPermissions: "admin.users.permissions.manageAdminPermissions",
  manageContent: "admin.users.permissions.manageContent",
  manageQuizzes: "admin.users.permissions.manageQuizzes",
  manageBlog: "admin.users.permissions.manageBlog",
  manageLanguages: "admin.users.permissions.manageLanguages",
  manageBanners: "admin.users.permissions.manageBanners",
  manageLanding: "admin.users.permissions.manageLanding",
  manageSubscriptions: "admin.users.permissions.manageSubscriptions",
  manageBilling: "admin.users.permissions.manageBilling",
  fullAccess: "admin.users.permissions.fullAccess",
};

const NO_PERMISSIONS: RolePermissions = {
  viewUsers: false,
  answerSupport: false,
  suspendUsers: false,
  manageRoles: false,
  manageAdminPermissions: false,
  manageContent: false,
  manageQuizzes: false,
  manageBlog: false,
  manageLanguages: false,
  manageBanners: false,
  manageLanding: false,
  manageSubscriptions: false,
  manageBilling: false,
  fullAccess: false,
};

function permissions(granted: PermissionKey[]): RolePermissions {
  const result = { ...NO_PERMISSIONS };
  for (const key of granted) {
    result[key] = true;
  }
  return result;
}

export type RoleDefinition = {
  slug: RoleSlug;
  labelKey: string;
  descriptionKey: string;
  badgeClassName: string;
  permissions: RolePermissions;
  /** True when this tier's work is confined to the languages assigned to it. */
  languageScoped: boolean;
};

export const ROLE_DEFINITIONS: Record<RoleSlug, RoleDefinition> = {
  super_admin: {
    slug: "super_admin",
    labelKey: "admin.users.roles.superAdmin.label",
    descriptionKey: "admin.users.roles.superAdmin.description",
    badgeClassName: "border-red-400/30 bg-red-500/15 text-red-300",
    permissions: permissions([...PERMISSION_KEYS]),
    languageScoped: false,
  },
  // Watches the admin tier: can see every account, suspend one, and decide
  // what the admin role is allowed to do — but can never move an account
  // between roles, which keeps the top of the hierarchy with the super admin.
  head_admin: {
    slug: "head_admin",
    labelKey: "admin.users.roles.headAdmin.label",
    descriptionKey: "admin.users.roles.headAdmin.description",
    badgeClassName: "border-orange-400/30 bg-orange-500/15 text-orange-300",
    permissions: permissions([
      "viewUsers",
      "answerSupport",
      "suspendUsers",
      "manageAdminPermissions",
    ]),
    languageScoped: false,
  },
  // Customer-facing support. Deliberately cannot suspend anybody: an account
  // being locked out is an oversight decision, not a support one.
  admin: {
    slug: "admin",
    labelKey: "admin.users.roles.admin.label",
    descriptionKey: "admin.users.roles.admin.description",
    badgeClassName: "border-brand-accent/30 bg-brand-accent/15 text-brand-accent",
    permissions: permissions(["viewUsers", "answerSupport"]),
    languageScoped: false,
  },
  teacher: {
    slug: "teacher",
    labelKey: "admin.users.roles.teacher.label",
    descriptionKey: "admin.users.roles.teacher.description",
    badgeClassName: "border-sky-400/30 bg-sky-500/15 text-sky-300",
    permissions: permissions(["manageContent", "manageQuizzes"]),
    languageScoped: true,
  },
  writer: {
    slug: "writer",
    labelKey: "admin.users.roles.writer.label",
    descriptionKey: "admin.users.roles.writer.description",
    badgeClassName: "border-violet-400/30 bg-violet-500/15 text-violet-300",
    permissions: permissions(["manageBlog"]),
    languageScoped: false,
  },
  learner: {
    slug: "learner",
    labelKey: "admin.users.roles.learner.label",
    descriptionKey: "admin.users.roles.learner.description",
    badgeClassName: "border-white/15 bg-white/5 text-muted-foreground",
    permissions: permissions([]),
    languageScoped: false,
  },
};

// ------------------------------------------------- head-admin permission editor

/** The roles a head admin may re-scope. Everything else is fixed in code. */
export const EDITABLE_ROLE_SLUGS = ["admin"] as const;
export type EditableRoleSlug = (typeof EDITABLE_ROLE_SLUGS)[number];

/**
 * Permissions the editor refuses to hand out, whoever is using it.
 *
 * A head admin polices the admin tier, so it must not be able to hand that
 * tier the powers it polices with — nor anything that moves money. Without
 * this an admin could be granted `suspendUsers` and start locking out the
 * very accounts the head admin exists to protect.
 */
export const LOCKED_PERMISSIONS: PermissionKey[] = [
  "suspendUsers",
  "manageRoles",
  "manageAdminPermissions",
  "manageSubscriptions",
  "manageBilling",
  "fullAccess",
];

export function isEditableRole(slug: string): slug is EditableRoleSlug {
  return (EDITABLE_ROLE_SLUGS as readonly string[]).includes(slug);
}

export function isGrantablePermission(key: PermissionKey): boolean {
  return !LOCKED_PERMISSIONS.includes(key);
}

/** One stored override: a partial permission map for a single role. */
export type RolePermissionOverride = Partial<RolePermissions>;
export type RolePermissionOverrides = Partial<
  Record<RoleSlug, RolePermissionOverride>
>;

/**
 * The permissions a role actually has right now.
 *
 * Overrides only ever apply to `EDITABLE_ROLE_SLUGS`, and only to permissions
 * that are grantable — so a row that somehow reaches the database with
 * `fullAccess: true` on it still grants nothing.
 */
export function resolveRolePermissions(
  role: RoleSlug,
  overrides?: RolePermissionOverrides | null
): RolePermissions {
  const base = ROLE_DEFINITIONS[role]?.permissions ?? NO_PERMISSIONS;
  if (!isEditableRole(role)) return { ...base };

  const override = overrides?.[role];
  if (!override) return { ...base };

  const resolved = { ...base };
  for (const key of PERMISSION_KEYS) {
    if (!isGrantablePermission(key)) continue;
    const value = override[key];
    if (typeof value === "boolean") {
      resolved[key] = value;
    }
  }
  return resolved;
}

/** Strips anything the editor is not allowed to store, before a write. */
export function sanitizeRolePermissionOverride(
  input: Record<string, unknown>
): RolePermissionOverride {
  const clean: RolePermissionOverride = {};
  for (const key of PERMISSION_KEYS) {
    if (!isGrantablePermission(key)) continue;
    const value = input[key];
    if (typeof value === "boolean") {
      clean[key] = value;
    }
  }
  return clean;
}

export function isRoleSlug(value: string): value is RoleSlug {
  return (ROLE_SLUGS as readonly string[]).includes(value);
}

export function isPermissionKey(value: string): value is PermissionKey {
  return (PERMISSION_KEYS as readonly string[]).includes(value);
}

export function roleImpliesAdmin(role: RoleSlug): boolean {
  return role !== "learner";
}

// ------------------------------------------------------------ language scope

/**
 * Whether a language-scoped role may touch a given language.
 *
 * A teacher with no language assigned can edit nothing — an empty list is an
 * empty grant, never a wildcard, so forgetting to assign a language fails
 * closed rather than handing over every language on the platform.
 */
export function coversLanguage(
  role: RoleSlug,
  assignedLanguages: readonly string[] | null | undefined,
  languageSlug: string
): boolean {
  if (!ROLE_DEFINITIONS[role]?.languageScoped) return true;
  return (assignedLanguages ?? []).includes(languageSlug);
}

export function isLanguageScopedRole(role: RoleSlug): boolean {
  return Boolean(ROLE_DEFINITIONS[role]?.languageScoped);
}

/**
 * Narrows a list of languages to the ones a role may work in.
 *
 * Used to build the panel a scoped role actually sees, so a teacher is never
 * offered a curriculum whose save button would only refuse them. Roles that
 * are not scoped get the list back untouched.
 */
export function scopeLanguageList<T extends { slug: string }>(
  items: readonly T[],
  role: RoleSlug,
  assignedLanguages: readonly string[] | null | undefined
): T[] {
  if (!isLanguageScopedRole(role)) return [...items];
  const allowed = new Set(assignedLanguages ?? []);
  return items.filter((item) => allowed.has(item.slug));
}

/** Drops unknown slugs and duplicates from an assignment coming off a form. */
export function normalizeAssignedLanguages(
  input: readonly string[],
  known: readonly LanguageSlug[]
): string[] {
  const allowed = new Set<string>(known);
  return Array.from(new Set(input)).filter((slug) => allowed.has(slug));
}

// --------------------------------------------------------------- admin guards
// One admin must never be able to remove, demote, or lock out another admin.
// Role changes are reserved for a super admin; suspension is shared with the
// head admin, which is the whole point of that tier. A super admin account is
// untouchable through the panel either way.

/** Hard cap on how many super admins the platform can ever have. */
export const MAX_SUPER_ADMINS = 3;

export type ManagedAccount = {
  id: string;
  role: RoleSlug;
};

export const USER_GUARD_MESSAGES = {
  self: "admin.users.guard.self",
  superAdminProtected: "admin.users.guard.superAdminProtected",
  superAdminOnly: "admin.users.guard.superAdminOnly",
  superAdminLimit: "admin.users.guard.superAdminLimit",
  suspendForbidden: "admin.users.guard.suspendForbidden",
  headAdminPeer: "admin.users.guard.headAdminPeer",
  permissionsForbidden: "admin.users.guard.permissionsForbidden",
  roleNotEditable: "admin.users.guard.roleNotEditable",
  languageForbidden: "admin.users.guard.languageForbidden",
} as const;

export type UserGuardMessage =
  (typeof USER_GUARD_MESSAGES)[keyof typeof USER_GUARD_MESSAGES];

export type UserGuardVerdict =
  | { allowed: true }
  | { allowed: false; reason: UserGuardMessage };

const ALLOWED: UserGuardVerdict = { allowed: true };

function deny(reason: UserGuardMessage): UserGuardVerdict {
  return { allowed: false, reason };
}

export function isProtectedAccount(role: RoleSlug): boolean {
  return role === "super_admin";
}

/**
 * Role changes — including promote/demote, which are role changes in disguise.
 * Only a super admin may run them, never against another super admin, and
 * never past the super-admin cap.
 */
export function canChangeUserRole(
  actor: ManagedAccount,
  target: ManagedAccount,
  nextRole: RoleSlug,
  superAdminCount: number
): UserGuardVerdict {
  if (actor.id === target.id) {
    return deny(USER_GUARD_MESSAGES.self);
  }

  if (isProtectedAccount(target.role)) {
    return deny(USER_GUARD_MESSAGES.superAdminProtected);
  }

  if (actor.role !== "super_admin") {
    return deny(USER_GUARD_MESSAGES.superAdminOnly);
  }

  if (nextRole === "super_admin" && superAdminCount >= MAX_SUPER_ADMINS) {
    return deny(USER_GUARD_MESSAGES.superAdminLimit);
  }

  return ALLOWED;
}

/**
 * Suspending or reactivating an account.
 *
 * Shared between the super admin and the head admin, which is the head
 * admin's reason to exist: it watches the admin tier and can take an account
 * out of service without being able to re-rank anybody.
 */
export function canChangeUserStatus(
  actor: ManagedAccount,
  target: ManagedAccount,
  nextStatus: UserStatus
): UserGuardVerdict {
  if (actor.id === target.id && nextStatus === "suspended") {
    return deny(USER_GUARD_MESSAGES.self);
  }

  // A super admin can never be locked out; reactivating one stays possible so a
  // legacy suspension is recoverable, and the rule below keeps that with them.
  if (isProtectedAccount(target.role) && nextStatus === "suspended") {
    return deny(USER_GUARD_MESSAGES.superAdminProtected);
  }

  if (actor.role !== "super_admin" && actor.role !== "head_admin") {
    return deny(USER_GUARD_MESSAGES.suspendForbidden);
  }

  // Head admins are peers. Letting one suspend another turns oversight into a
  // race, so only the super admin above them can.
  if (
    actor.role === "head_admin" &&
    (target.role === "head_admin" || target.role === "super_admin")
  ) {
    return deny(USER_GUARD_MESSAGES.headAdminPeer);
  }

  return ALLOWED;
}

/** Editing what a role may do. Reserved for the tiers that police the panel. */
export function canEditRolePermissions(
  actorRole: RoleSlug,
  targetRole: string
): UserGuardVerdict {
  if (actorRole !== "super_admin" && actorRole !== "head_admin") {
    return deny(USER_GUARD_MESSAGES.permissionsForbidden);
  }

  if (!isEditableRole(targetRole)) {
    return deny(USER_GUARD_MESSAGES.roleNotEditable);
  }

  return ALLOWED;
}

/** The role a promote/demote toggle lands on, without downgrading a tier. */
export function resolveAdminToggleRole(
  currentRole: RoleSlug,
  isAdmin: boolean
): RoleSlug {
  if (!isAdmin) return "learner";
  return currentRole === "learner" ? "admin" : currentRole;
}
