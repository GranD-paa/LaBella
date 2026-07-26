import { describe, expect, it } from "vitest";
import {
  ADMIN_ROLE_SLUGS,
  ROLE_DEFINITIONS,
  isRoleSlug,
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
