import { describe, expect, it } from "vitest";
import {
  ADMIN_ROLE_SLUGS,
  MAX_SUPER_ADMINS,
  ROLE_DEFINITIONS,
  USER_GUARD_MESSAGES,
  canChangeUserRole,
  canChangeUserStatus,
  isRoleSlug,
  resolveAdminToggleRole,
  roleImpliesAdmin,
} from "./roles";

describe("isRoleSlug", () => {
  it("accepts every known role", () => {
    for (const slug of Object.keys(ROLE_DEFINITIONS)) {
      expect(isRoleSlug(slug)).toBe(true);
    }
  });

  it("rejects an arbitrary string", () => {
    expect(isRoleSlug("not-a-role")).toBe(false);
  });
});

describe("roleImpliesAdmin", () => {
  it("is false only for learner", () => {
    expect(roleImpliesAdmin("learner")).toBe(false);
  });

  it("is true for every admin role tier", () => {
    for (const slug of ADMIN_ROLE_SLUGS) {
      expect(roleImpliesAdmin(slug)).toBe(true);
    }
  });
});

describe("ROLE_DEFINITIONS permissions", () => {
  it("grants super_admin every permission", () => {
    const perms = ROLE_DEFINITIONS.super_admin.permissions;
    expect(Object.values(perms).every(Boolean)).toBe(true);
  });

  it("keeps learner with no admin permissions", () => {
    const perms = ROLE_DEFINITIONS.learner.permissions;
    expect(Object.values(perms).every((value) => value === false)).toBe(true);
  });

  it("only super_admin can manage roles", () => {
    for (const [slug, def] of Object.entries(ROLE_DEFINITIONS)) {
      if (slug === "super_admin") {
        expect(def.permissions.manageRoles).toBe(true);
      } else {
        expect(def.permissions.manageRoles).toBe(false);
      }
    }
  });

  it("restricts content_manager to content permissions only", () => {
    const perms = ROLE_DEFINITIONS.content_manager.permissions;
    expect(perms.manageContent).toBe(true);
    expect(perms.manageQuizzes).toBe(false);
    expect(perms.manageUsers).toBe(false);
  });

  it("restricts quiz_manager to quiz permissions only", () => {
    const perms = ROLE_DEFINITIONS.quiz_manager.permissions;
    expect(perms.manageQuizzes).toBe(true);
    expect(perms.manageContent).toBe(false);
    expect(perms.manageUsers).toBe(false);
  });
});

const superAdmin = { id: "super-1", role: "super_admin" } as const;
const otherSuperAdmin = { id: "super-2", role: "super_admin" } as const;
const admin = { id: "admin-1", role: "admin" } as const;
const otherAdmin = { id: "admin-2", role: "admin" } as const;
const learner = { id: "learner-1", role: "learner" } as const;

describe("canChangeUserRole", () => {
  it("refuses an admin touching another admin's role", () => {
    const verdict = canChangeUserRole(admin, otherAdmin, "learner", 1);
    expect(verdict).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.superAdminOnly,
    });
  });

  it("refuses an admin promoting a learner", () => {
    expect(canChangeUserRole(admin, learner, "admin", 1).allowed).toBe(false);
  });

  it("lets a super admin change a non-super account", () => {
    expect(canChangeUserRole(superAdmin, otherAdmin, "learner", 1).allowed).toBe(
      true
    );
  });

  it("protects a super admin from every other account", () => {
    for (const actor of [admin, otherSuperAdmin]) {
      expect(canChangeUserRole(actor, superAdmin, "learner", 2)).toEqual({
        allowed: false,
        reason: USER_GUARD_MESSAGES.superAdminProtected,
      });
    }
  });

  it("refuses changing your own role", () => {
    expect(canChangeUserRole(superAdmin, superAdmin, "learner", 1)).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.self,
    });
  });

  it("caps the number of super admins", () => {
    expect(
      canChangeUserRole(superAdmin, admin, "super_admin", MAX_SUPER_ADMINS - 1)
        .allowed
    ).toBe(true);
    expect(
      canChangeUserRole(superAdmin, admin, "super_admin", MAX_SUPER_ADMINS)
    ).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.superAdminLimit,
    });
  });
});

describe("canChangeUserStatus", () => {
  it("refuses an admin suspending another admin", () => {
    expect(canChangeUserStatus(admin, otherAdmin, "suspended")).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.adminTargetSuperAdminOnly,
    });
  });

  it("refuses an admin reactivating another admin", () => {
    expect(canChangeUserStatus(admin, otherAdmin, "active").allowed).toBe(false);
  });

  it("still lets an admin manage learners", () => {
    expect(canChangeUserStatus(admin, learner, "suspended").allowed).toBe(true);
    expect(canChangeUserStatus(admin, learner, "active").allowed).toBe(true);
  });

  it("never suspends a super admin", () => {
    for (const actor of [admin, otherSuperAdmin]) {
      expect(canChangeUserStatus(actor, superAdmin, "suspended")).toEqual({
        allowed: false,
        reason: USER_GUARD_MESSAGES.superAdminProtected,
      });
    }
  });

  it("keeps reactivating a super admin possible for a super admin", () => {
    expect(canChangeUserStatus(otherSuperAdmin, superAdmin, "active").allowed).toBe(
      true
    );
    expect(canChangeUserStatus(admin, superAdmin, "active").allowed).toBe(false);
  });

  it("refuses suspending yourself", () => {
    expect(canChangeUserStatus(admin, admin, "suspended")).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.self,
    });
  });
});

describe("resolveAdminToggleRole", () => {
  it("promotes a learner to admin and keeps a finer tier intact", () => {
    expect(resolveAdminToggleRole("learner", true)).toBe("admin");
    expect(resolveAdminToggleRole("content_manager", true)).toBe(
      "content_manager"
    );
  });

  it("demotes everything to learner", () => {
    expect(resolveAdminToggleRole("admin", false)).toBe("learner");
  });
});
