// Role tiers for the admin user-management system. `requireAdmin()` in
// layouts still gates the admin UI; server actions enforce the granular
// permission flags below via `requireAdminPermission()`.

export const ROLE_SLUGS = [
  "super_admin",
  "admin",
  "content_manager",
  "quiz_manager",
  "limited_admin",
  "learner",
] as const;

export type RoleSlug = (typeof ROLE_SLUGS)[number];

export const ADMIN_ROLE_SLUGS = ROLE_SLUGS.filter(
  (slug) => slug !== "learner"
) as Exclude<RoleSlug, "learner">[];

export const USER_STATUSES = ["active", "suspended"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export type RolePermissions = {
  manageContent: boolean;
  manageQuizzes: boolean;
  manageUsers: boolean;
  manageRoles: boolean;
  fullAccess: boolean;
};

export type RoleDefinition = {
  slug: RoleSlug;
  labelKey: string;
  descriptionKey: string;
  badgeClassName: string;
  permissions: RolePermissions;
};

export const ROLE_DEFINITIONS: Record<RoleSlug, RoleDefinition> = {
  super_admin: {
    slug: "super_admin",
    labelKey: "admin.users.roles.superAdmin.label",
    descriptionKey: "admin.users.roles.superAdmin.description",
    badgeClassName: "border-red-400/30 bg-red-500/15 text-red-300",
    permissions: {
      manageContent: true,
      manageQuizzes: true,
      manageUsers: true,
      manageRoles: true,
      fullAccess: true,
    },
  },
  admin: {
    slug: "admin",
    labelKey: "admin.users.roles.admin.label",
    descriptionKey: "admin.users.roles.admin.description",
    badgeClassName: "border-brand-accent/30 bg-brand-accent/15 text-brand-accent",
    permissions: {
      manageContent: true,
      manageQuizzes: true,
      manageUsers: true,
      manageRoles: false,
      fullAccess: false,
    },
  },
  content_manager: {
    slug: "content_manager",
    labelKey: "admin.users.roles.contentManager.label",
    descriptionKey: "admin.users.roles.contentManager.description",
    badgeClassName: "border-sky-400/30 bg-sky-500/15 text-sky-300",
    permissions: {
      manageContent: true,
      manageQuizzes: false,
      manageUsers: false,
      manageRoles: false,
      fullAccess: false,
    },
  },
  quiz_manager: {
    slug: "quiz_manager",
    labelKey: "admin.users.roles.quizManager.label",
    descriptionKey: "admin.users.roles.quizManager.description",
    badgeClassName: "border-violet-400/30 bg-violet-500/15 text-violet-300",
    permissions: {
      manageContent: false,
      manageQuizzes: true,
      manageUsers: false,
      manageRoles: false,
      fullAccess: false,
    },
  },
  limited_admin: {
    slug: "limited_admin",
    labelKey: "admin.users.roles.limitedAdmin.label",
    descriptionKey: "admin.users.roles.limitedAdmin.description",
    badgeClassName: "border-amber-400/30 bg-amber-500/15 text-amber-300",
    permissions: {
      manageContent: true,
      manageQuizzes: false,
      manageUsers: false,
      manageRoles: false,
      fullAccess: false,
    },
  },
  learner: {
    slug: "learner",
    labelKey: "admin.users.roles.learner.label",
    descriptionKey: "admin.users.roles.learner.description",
    badgeClassName: "border-white/15 bg-white/5 text-muted-foreground",
    permissions: {
      manageContent: false,
      manageQuizzes: false,
      manageUsers: false,
      manageRoles: false,
      fullAccess: false,
    },
  },
};

export function isRoleSlug(value: string): value is RoleSlug {
  return (ROLE_SLUGS as readonly string[]).includes(value);
}

export function roleImpliesAdmin(role: RoleSlug): boolean {
  return role !== "learner";
}

// --------------------------------------------------------------- admin guards
// One admin must never be able to remove, demote, or lock out another admin.
// Everything that touches an admin-tier account is reserved for a super admin,
// and a super admin account itself is untouchable through the panel.

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
  adminTargetSuperAdminOnly: "admin.users.guard.adminTargetSuperAdminOnly",
  superAdminLimit: "admin.users.guard.superAdminLimit",
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

/** Suspending or reactivating an account. */
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

  if (roleImpliesAdmin(target.role) && actor.role !== "super_admin") {
    return deny(USER_GUARD_MESSAGES.adminTargetSuperAdminOnly);
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
