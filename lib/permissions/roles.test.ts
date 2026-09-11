import { describe, expect, it } from "vitest";
import {
  ADMIN_ROLE_SLUGS,
  EDITABLE_ROLE_SLUGS,
  LOCKED_PERMISSIONS,
  MAX_SUPER_ADMINS,
  PERMISSION_KEYS,
  PERMISSION_LABEL_KEYS,
  ROLE_DEFINITIONS,
  ROLE_SLUGS,
  USER_GUARD_MESSAGES,
  canChangeUserRole,
  canChangeUserStatus,
  canEditRolePermissions,
  coversLanguage,
  isRoleSlug,
  normalizeAssignedLanguages,
  resolveAdminToggleRole,
  resolveRolePermissions,
  roleImpliesAdmin,
  sanitizeRolePermissionOverride,
  scopeLanguageList,
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

  it("rejects the tiers that were retired", () => {
    for (const slug of ["content_manager", "quiz_manager", "limited_admin"]) {
      expect(isRoleSlug(slug)).toBe(false);
    }
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

  it("lets the head admin suspend and re-scope the admin tier, but not re-rank it", () => {
    const perms = ROLE_DEFINITIONS.head_admin.permissions;
    expect(perms.suspendUsers).toBe(true);
    expect(perms.manageAdminPermissions).toBe(true);
    expect(perms.manageRoles).toBe(false);
    expect(perms.fullAccess).toBe(false);
  });

  it("keeps the admin tier on support work only", () => {
    const perms = ROLE_DEFINITIONS.admin.permissions;
    expect(perms.viewUsers).toBe(true);
    expect(perms.answerSupport).toBe(true);
    // The whole point of the tier: support answers questions, it does not
    // lock anybody out.
    expect(perms.suspendUsers).toBe(false);
    expect(perms.manageContent).toBe(false);
    expect(perms.manageBlog).toBe(false);
  });

  it("restricts the teacher to content, scoped by language", () => {
    const definition = ROLE_DEFINITIONS.teacher;
    expect(definition.permissions.manageContent).toBe(true);
    expect(definition.permissions.manageQuizzes).toBe(true);
    expect(definition.permissions.viewUsers).toBe(false);
    expect(definition.languageScoped).toBe(true);
  });

  it("restricts the writer to the blog", () => {
    const perms = ROLE_DEFINITIONS.writer.permissions;
    expect(perms.manageBlog).toBe(true);
    expect(
      PERMISSION_KEYS.filter((key) => key !== "manageBlog").every(
        (key) => perms[key] === false
      )
    ).toBe(true);
  });

  it("gives every permission a label", () => {
    for (const key of PERMISSION_KEYS) {
      expect(PERMISSION_LABEL_KEYS[key]).toBeTruthy();
    }
  });

  it("defines every role in the slug list", () => {
    for (const slug of ROLE_SLUGS) {
      expect(ROLE_DEFINITIONS[slug].slug).toBe(slug);
    }
  });
});

describe("resolveRolePermissions", () => {
  it("returns the defaults when there is no override", () => {
    expect(resolveRolePermissions("admin")).toEqual(
      ROLE_DEFINITIONS.admin.permissions
    );
  });

  it("applies a grantable override to an editable role", () => {
    const resolved = resolveRolePermissions("admin", {
      admin: { manageContent: true, viewUsers: false },
    });
    expect(resolved.manageContent).toBe(true);
    expect(resolved.viewUsers).toBe(false);
  });

  it("ignores an override stored against a locked permission", () => {
    const resolved = resolveRolePermissions("admin", {
      admin: { suspendUsers: true, fullAccess: true, manageRoles: true },
    });
    expect(resolved.suspendUsers).toBe(false);
    expect(resolved.fullAccess).toBe(false);
    expect(resolved.manageRoles).toBe(false);
  });

  it("ignores an override aimed at a role that is not editable", () => {
    const resolved = resolveRolePermissions("teacher", {
      teacher: { manageBlog: true },
    });
    expect(resolved.manageBlog).toBe(false);
  });

  it("does not hand back the shared definition object", () => {
    const resolved = resolveRolePermissions("learner");
    resolved.fullAccess = true;
    expect(ROLE_DEFINITIONS.learner.permissions.fullAccess).toBe(false);
  });
});

describe("sanitizeRolePermissionOverride", () => {
  it("keeps only grantable booleans", () => {
    const clean = sanitizeRolePermissionOverride({
      manageContent: true,
      suspendUsers: true,
      fullAccess: true,
      manageBlog: "yes",
      nonsense: true,
    });
    expect(clean).toEqual({ manageContent: true });
  });

  it("never returns a locked key, whatever is passed", () => {
    const clean = sanitizeRolePermissionOverride(
      Object.fromEntries(PERMISSION_KEYS.map((key) => [key, true]))
    );
    for (const locked of LOCKED_PERMISSIONS) {
      expect(locked in clean).toBe(false);
    }
  });
});

describe("canEditRolePermissions", () => {
  it("allows the two tiers that police the panel", () => {
    for (const actor of ["super_admin", "head_admin"] as const) {
      expect(canEditRolePermissions(actor, "admin").allowed).toBe(true);
    }
  });

  it("refuses everybody else", () => {
    for (const actor of ["admin", "teacher", "writer", "learner"] as const) {
      expect(canEditRolePermissions(actor, "admin")).toEqual({
        allowed: false,
        reason: USER_GUARD_MESSAGES.permissionsForbidden,
      });
    }
  });

  it("refuses a role that is not editable", () => {
    expect(canEditRolePermissions("super_admin", "teacher")).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.roleNotEditable,
    });
  });

  it("only lists roles that exist", () => {
    for (const slug of EDITABLE_ROLE_SLUGS) {
      expect(ROLE_SLUGS).toContain(slug);
    }
  });
});

describe("coversLanguage", () => {
  it("lets an unscoped role through for any language", () => {
    expect(coversLanguage("admin", [], "italian")).toBe(true);
    expect(coversLanguage("super_admin", null, "german")).toBe(true);
  });

  it("holds a scoped role to its assignment", () => {
    expect(coversLanguage("teacher", ["italian"], "italian")).toBe(true);
    expect(coversLanguage("teacher", ["italian"], "german")).toBe(false);
  });

  it("treats an empty assignment as no languages, not all of them", () => {
    expect(coversLanguage("teacher", [], "italian")).toBe(false);
    expect(coversLanguage("teacher", null, "italian")).toBe(false);
  });

  it("denies an unknown language, which is what a missing row resolves to", () => {
    expect(coversLanguage("teacher", ["italian"], "")).toBe(false);
  });
});

describe("normalizeAssignedLanguages", () => {
  const known = ["italian", "english", "german", "turkish"] as const;

  it("drops unknown slugs and duplicates", () => {
    expect(
      normalizeAssignedLanguages(
        ["italian", "italian", "klingon", "german"],
        known
      )
    ).toEqual(["italian", "german"]);
  });

  it("allows an empty assignment", () => {
    expect(normalizeAssignedLanguages([], known)).toEqual([]);
  });
});

describe("scopeLanguageList", () => {
  const languages = [
    { slug: "italian" },
    { slug: "german" },
    { slug: "english" },
  ];

  it("returns everything for an unscoped role", () => {
    expect(scopeLanguageList(languages, "super_admin", [])).toHaveLength(3);
  });

  it("narrows a scoped role to its own languages", () => {
    expect(scopeLanguageList(languages, "teacher", ["german"])).toEqual([
      { slug: "german" },
    ]);
  });

  it("gives a scoped role with no assignment nothing", () => {
    expect(scopeLanguageList(languages, "teacher", [])).toEqual([]);
  });
});

const superAdmin = { id: "super-1", role: "super_admin" } as const;
const otherSuperAdmin = { id: "super-2", role: "super_admin" } as const;
const headAdmin = { id: "head-1", role: "head_admin" } as const;
const otherHeadAdmin = { id: "head-2", role: "head_admin" } as const;
const admin = { id: "admin-1", role: "admin" } as const;
const otherAdmin = { id: "admin-2", role: "admin" } as const;
const teacher = { id: "teacher-1", role: "teacher" } as const;
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

  it("refuses a head admin re-ranking anybody", () => {
    // The head admin's whole limit: it watches the admin tier and can take an
    // account out of service, but it can never move one between roles.
    expect(canChangeUserRole(headAdmin, admin, "teacher", 1)).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.superAdminOnly,
    });
    expect(canChangeUserRole(headAdmin, learner, "admin", 1).allowed).toBe(
      false
    );
  });

  it("lets a super admin change a non-super account", () => {
    expect(canChangeUserRole(superAdmin, otherAdmin, "learner", 1).allowed).toBe(
      true
    );
    expect(canChangeUserRole(superAdmin, headAdmin, "admin", 1).allowed).toBe(
      true
    );
  });

  it("protects a super admin from every other account", () => {
    for (const actor of [admin, headAdmin, otherSuperAdmin]) {
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
  it("refuses an admin suspending anybody at all", () => {
    for (const target of [learner, teacher, otherAdmin]) {
      expect(canChangeUserStatus(admin, target, "suspended")).toEqual({
        allowed: false,
        reason: USER_GUARD_MESSAGES.suspendForbidden,
      });
    }
  });

  it("refuses an admin reactivating an account either", () => {
    expect(canChangeUserStatus(admin, learner, "active").allowed).toBe(false);
  });

  it("lets a head admin suspend the tiers it watches", () => {
    for (const target of [learner, teacher, admin]) {
      expect(canChangeUserStatus(headAdmin, target, "suspended").allowed).toBe(
        true
      );
      expect(canChangeUserStatus(headAdmin, target, "active").allowed).toBe(
        true
      );
    }
  });

  it("keeps head admins from suspending each other", () => {
    expect(canChangeUserStatus(headAdmin, otherHeadAdmin, "suspended")).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.headAdminPeer,
    });
  });

  it("never suspends a super admin", () => {
    for (const actor of [admin, headAdmin, otherSuperAdmin]) {
      expect(canChangeUserStatus(actor, superAdmin, "suspended")).toEqual({
        allowed: false,
        reason: USER_GUARD_MESSAGES.superAdminProtected,
      });
    }
  });

  it("keeps reactivating a super admin possible for a super admin only", () => {
    expect(
      canChangeUserStatus(otherSuperAdmin, superAdmin, "active").allowed
    ).toBe(true);
    expect(canChangeUserStatus(headAdmin, superAdmin, "active")).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.headAdminPeer,
    });
    expect(canChangeUserStatus(admin, superAdmin, "active").allowed).toBe(false);
  });

  it("refuses suspending yourself", () => {
    expect(canChangeUserStatus(superAdmin, superAdmin, "suspended")).toEqual({
      allowed: false,
      reason: USER_GUARD_MESSAGES.self,
    });
  });
});

describe("resolveAdminToggleRole", () => {
  it("promotes a learner to admin and keeps a finer tier intact", () => {
    expect(resolveAdminToggleRole("learner", true)).toBe("admin");
    expect(resolveAdminToggleRole("teacher", true)).toBe("teacher");
    expect(resolveAdminToggleRole("head_admin", true)).toBe("head_admin");
  });

  it("demotes everything to learner", () => {
    expect(resolveAdminToggleRole("admin", false)).toBe("learner");
    expect(resolveAdminToggleRole("head_admin", false)).toBe("learner");
  });
});
