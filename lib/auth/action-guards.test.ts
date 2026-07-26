import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@/types";
import {
  requireAuthenticatedAction,
  requireAdminAction,
  requireAdminPermission,
  requireSuperAdminAction,
} from "./action-guards";

const getAuthUser = vi.fn();
const getProfileById = vi.fn();

vi.mock("@/lib/data", () => ({
  getDataRepository: () => ({ getAuthUser, getProfileById }),
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
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

beforeEach(() => {
  getAuthUser.mockReset();
  getProfileById.mockReset();
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

  it("succeeds and returns the user + profile", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    const profile = buildProfile();
    getProfileById.mockResolvedValue(profile);
    const result = await requireAuthenticatedAction();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.profile).toEqual(profile);
    }
  });
});

describe("requireAdminAction", () => {
  it("fails with forbidden for a non-admin profile", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(buildProfile({ is_admin: false }));
    const result = await requireAdminAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("succeeds for an admin profile", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(
      buildProfile({ is_admin: true, role: "admin" })
    );
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
  it("allows a content_manager to manageContent", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(
      buildProfile({ is_admin: true, role: "content_manager" })
    );
    const result = await requireAdminPermission("manageContent");
    expect(result.ok).toBe(true);
  });

  it("denies a content_manager from manageUsers", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(
      buildProfile({ is_admin: true, role: "content_manager" })
    );
    const result = await requireAdminPermission("manageUsers");
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("denies a non-admin regardless of permission requested", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(buildProfile({ is_admin: false }));
    const result = await requireAdminPermission("manageContent");
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });
});

describe("requireSuperAdminAction", () => {
  it("denies a regular admin", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(
      buildProfile({ is_admin: true, role: "admin" })
    );
    const result = await requireSuperAdminAction();
    expect(result).toEqual({ ok: false, error: "actions.errors.forbidden" });
  });

  it("allows a super_admin", async () => {
    getAuthUser.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    getProfileById.mockResolvedValue(
      buildProfile({ is_admin: true, role: "super_admin" })
    );
    const result = await requireSuperAdminAction();
    expect(result.ok).toBe(true);
  });
});
