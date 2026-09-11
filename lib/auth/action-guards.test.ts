import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@/types";
import {
  enforceLanguageScope,
  requireAuthenticatedAction,
  requireAdminAction,
  requireAdminPermission,
  requireContentScope,
  requireSuperAdminAction,
} from "./action-guards";

const getAuthUser = vi.fn();
const getProfileById = vi.fn();
const getRolePermissionOverrides = vi.fn();

vi.mock("@/lib/data", () => ({
  getDataRepository: () => ({
    getAuthUser,
    getProfileById,
    getRolePermissionOverrides,
  }),
}));

function buildProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "user-1",
    full_name: "Test User",
    avatar_url: null,
    email: "user@example.com",
    is_admin: false,
    role: "learner",
    status: "active",
    assigned_languages: [],
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

function signedInAs(profile: Profile) {
  getAuthUser.mockResolvedValue({ id: profile.id, email: profile.email });
  getProfileById.mockResolvedValue(profile);
}

beforeEach(() => {
  getAuthUser.mockReset();
  getProfileById.mockReset();
  getRolePermissionOverrides.mockReset();
  getRolePermissionOverrides.mockResolvedValue({});
});

describe("requireAuthenticatedAction", () => {
  it("fails with mustSignIn when there is no auth user", async () => {
    getAuthUser.mockResolvedValue(null);
    const result = await requireAuthenticatedAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.mustSignIn" });
  });

  it("fails with forbidden when the auth user has no profile row", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(null);
    const result = await requireAuthenticatedAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("succeeds and returns the user, profile and role", async () => {
    const profile = buildProfile();
    signedInAs(profile);
    const result = await requireAuthenticatedAction();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.profile).toEqual(profile);
      expect(result.role).toBe("learner");
      expect(result.assignedLanguages).toEqual([]);
    }
  });
});

describe("requireAdminAction", () => {
  it("fails with forbidden for a non-admin profile", async () => {
    signedInAs(buildProfile({ is_admin: false }));
    const result = await requireAdminAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("succeeds for an admin profile", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "admin" }));
    const result = await requireAdminAction();
    expect(result.ok).toBe(true);
  });

  it("propagates the mustSignIn failure from the auth check", async () => {
    getAuthUser.mockResolvedValue(null);
    const result = await requireAdminAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.mustSignIn" });
  });
});

describe("requireAdminPermission", () => {
  it("allows a teacher to manageContent", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "teacher" }));
    const result = await requireAdminPermission("manageContent");
    expect(result.ok).toBe(true);
  });

  it("denies a teacher from viewUsers", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "teacher" }));
    const result = await requireAdminPermission("viewUsers");
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("denies an admin from suspending, which is the tier's whole limit", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "admin" }));
    const result = await requireAdminPermission("suspendUsers");
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("lets a super admin through on fullAccess alone", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "super_admin" }));
    for (const permission of ["manageBlog", "manageBilling"] as const) {
      expect((await requireAdminPermission(permission)).ok).toBe(true);
    }
  });

  it("denies a non-admin regardless of permission requested", async () => {
    signedInAs(buildProfile({ is_admin: false }));
    const result = await requireAdminPermission("manageContent");
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("honours a stored override granting the admin tier content", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "admin" }));
    getRolePermissionOverrides.mockResolvedValue({
      admin: { manageContent: true },
    });
    expect((await requireAdminPermission("manageContent")).ok).toBe(true);
  });

  it("refuses a stored override that tries to grant a locked permission", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "admin" }));
    getRolePermissionOverrides.mockResolvedValue({
      admin: { suspendUsers: true, fullAccess: true },
    });
    expect(await requireAdminPermission("suspendUsers")).toEqual({
      ok: false,
      error: "actions.errors.forbidden",
    });
  });
});

describe("requireContentScope", () => {
  it("lets a teacher work in an assigned language", async () => {
    signedInAs(
      buildProfile({
        is_admin: true,
        role: "teacher",
        assigned_languages: ["italian"],
      })
    );
    expect((await requireContentScope("manageContent", "italian")).ok).toBe(
      true
    );
  });

  it("refuses a teacher outside their languages", async () => {
    signedInAs(
      buildProfile({
        is_admin: true,
        role: "teacher",
        assigned_languages: ["italian"],
      })
    );
    expect(await requireContentScope("manageContent", "german")).toEqual({
      ok: false,
      error: "admin.users.guard.languageForbidden",
    });
  });

  it("refuses a teacher when the language is unknown", async () => {
    signedInAs(
      buildProfile({
        is_admin: true,
        role: "teacher",
        assigned_languages: ["italian"],
      })
    );
    expect((await requireContentScope("manageContent", null)).ok).toBe(false);
  });

  it("ignores the language for a role that is not scoped", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "super_admin" }));
    expect((await requireContentScope("manageContent", "german")).ok).toBe(true);
  });
});

describe("enforceLanguageScope", () => {
  it("never looks the language up for an unscoped role", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "super_admin" }));
    const guard = await requireAdminPermission("manageContent");
    if (!guard.ok) throw new Error("expected the guard to pass");

    const resolve = vi.fn();
    expect(await enforceLanguageScope(guard, resolve)).toBeNull();
    expect(resolve).not.toHaveBeenCalled();
  });

  it("denies a scoped role when the row is gone", async () => {
    signedInAs(
      buildProfile({
        is_admin: true,
        role: "teacher",
        assigned_languages: ["italian"],
      })
    );
    const guard = await requireAdminPermission("manageContent");
    if (!guard.ok) throw new Error("expected the guard to pass");

    // A deleted row resolves to null, and reading that as "no restriction"
    // would make deleting twice a way around the scope.
    expect(await enforceLanguageScope(guard, async () => null)).toBe(
      "admin.users.guard.languageForbidden"
    );
  });

  it("allows a scoped role on its own language", async () => {
    signedInAs(
      buildProfile({
        is_admin: true,
        role: "teacher",
        assigned_languages: ["italian", "german"],
      })
    );
    const guard = await requireAdminPermission("manageContent");
    if (!guard.ok) throw new Error("expected the guard to pass");

    expect(await enforceLanguageScope(guard, async () => "german")).toBeNull();
  });
});

describe("requireSuperAdminAction", () => {
  it("denies a regular admin", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "admin" }));
    const result = await requireSuperAdminAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("denies a head admin", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "head_admin" }));
    const result = await requireSuperAdminAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("allows a super_admin", async () => {
    signedInAs(buildProfile({ is_admin: true, role: "super_admin" }));
    const result = await requireSuperAdminAction();
    expect(result.ok).toBe(true);
  });
});
