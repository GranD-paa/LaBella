import { describe, expect, it } from "vitest";

import { ADMIN_NAV, adminLandingPath, visibleAdminNav } from "./admin-nav";
import {
  PERMISSION_KEYS,
  ROLE_SLUGS,
  resolveRolePermissions,
} from "./roles";

describe("ADMIN_NAV", () => {
  it("gates every entry on a permission that exists", () => {
    for (const item of ADMIN_NAV) {
      expect(PERMISSION_KEYS).toContain(item.permission);
    }
  });

  it("gives every entry something to render", () => {
    for (const item of ADMIN_NAV) {
      expect(Boolean(item.labelKey) || Boolean(item.label)).toBe(true);
    }
  });

  it("lists each page once", () => {
    const hrefs = ADMIN_NAV.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("visibleAdminNav", () => {
  it("shows a super admin the whole panel", () => {
    const permissions = resolveRolePermissions("super_admin");
    expect(visibleAdminNav(permissions)).toHaveLength(ADMIN_NAV.length);
  });

  it("shows a writer the blog and nothing else", () => {
    const visible = visibleAdminNav(resolveRolePermissions("writer"));
    expect(visible.map((item) => item.href)).toEqual(["/admin/blog"]);
  });

  it("shows a teacher content management and nothing else", () => {
    const visible = visibleAdminNav(resolveRolePermissions("teacher"));
    expect(visible.map((item) => item.href)).toEqual(["/admin/quizzes"]);
  });

  it("shows support staff the user list only", () => {
    const visible = visibleAdminNav(resolveRolePermissions("admin"));
    expect(visible.map((item) => item.href)).toEqual(["/admin"]);
  });

  it("follows an override, so the tiles and the guards cannot disagree", () => {
    const permissions = resolveRolePermissions("admin", {
      admin: { manageBlog: true },
    });
    expect(visibleAdminNav(permissions).map((item) => item.href)).toContain(
      "/admin/blog"
    );
  });
});

describe("adminLandingPath", () => {
  it("sends each role to a page it can actually open", () => {
    for (const slug of ROLE_SLUGS) {
      const permissions = resolveRolePermissions(slug);
      const landing = adminLandingPath(permissions);
      const entry = ADMIN_NAV.find((item) => item.href === landing);

      if (!entry) {
        // Only a role with no admin page at all may fall through, and only to
        // the dashboard every signed-in account can see.
        expect(landing).toBe("/dashboard");
        expect(visibleAdminNav(permissions)).toHaveLength(0);
        continue;
      }

      expect(permissions[entry.permission] || permissions.fullAccess).toBe(true);
    }
  });

  it("falls back to the learner dashboard when nothing is open", () => {
    expect(adminLandingPath(resolveRolePermissions("learner"))).toBe(
      "/dashboard"
    );
  });
});
