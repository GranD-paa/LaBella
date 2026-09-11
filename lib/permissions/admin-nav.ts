// The admin panel's map, in one place.
//
// Both the dashboard tiles and the page guards read this list, so a page can
// never be reachable by a role the dashboard hides it from — or, worse, hidden
// from a role that is in fact allowed to open it. Adding an admin page means
// adding one row here.

import type { PermissionKey, RolePermissions } from "@/lib/permissions/roles";

export type AdminNavItem = {
  href: string;
  permission: PermissionKey;
  /** Translation key, or `null` for the Persian-only surfaces. */
  labelKey: string | null;
  /** Literal label, used only where `labelKey` is null. */
  label?: string;
  /** Name of the lucide icon the dashboard renders for this entry. */
  icon:
    | "ListChecks"
    | "Users"
    | "Languages"
    | "ImageIcon"
    | "CreditCard"
    | "Receipt"
    | "FileText"
    | "Landmark";
};

export const ADMIN_NAV: AdminNavItem[] = [
  {
    href: "/admin/quizzes",
    permission: "manageContent",
    labelKey: "dashboard.admin.manageQuizzes",
    icon: "ListChecks",
  },
  {
    href: "/admin",
    permission: "viewUsers",
    labelKey: "dashboard.admin.manageUsers",
    icon: "Users",
  },
  {
    href: "/admin/languages",
    permission: "manageLanguages",
    labelKey: "dashboard.admin.manageLanguages",
    icon: "Languages",
  },
  {
    href: "/admin/banners",
    permission: "manageBanners",
    labelKey: "dashboard.admin.manageBanners",
    icon: "ImageIcon",
  },
  {
    href: "/admin/subscription",
    permission: "manageSubscriptions",
    labelKey: "dashboard.admin.manageSubscription",
    icon: "CreditCard",
  },
  {
    href: "/admin/accounting",
    permission: "manageBilling",
    labelKey: "dashboard.admin.manageAccounting",
    icon: "Receipt",
  },
  // The blog and the landing showcase are Persian-only surfaces (see
  // components/admin/blog), so their labels are literal rather than keys.
  {
    href: "/admin/blog",
    permission: "manageBlog",
    labelKey: null,
    label: "مدیریت وبلاگ",
    icon: "FileText",
  },
  {
    href: "/admin/landing",
    permission: "manageLanding",
    labelKey: null,
    label: "صفحهٔ اصلی",
    icon: "Landmark",
  },
];

export function hasPermission(
  permissions: RolePermissions,
  permission: PermissionKey
): boolean {
  return Boolean(permissions.fullAccess || permissions[permission]);
}

/** The entries a role may actually open, in panel order. */
export function visibleAdminNav(permissions: RolePermissions): AdminNavItem[] {
  return ADMIN_NAV.filter((item) => hasPermission(permissions, item.permission));
}

/**
 * Where to send an admin who asked for a page their role cannot open.
 *
 * The first page they *can* open, so a teacher landing on /admin ends up in
 * content management rather than bouncing to a dashboard that would only offer
 * them the same one link. Falls back to the learner dashboard, which every
 * signed-in account can see.
 */
export function adminLandingPath(permissions: RolePermissions): string {
  return visibleAdminNav(permissions)[0]?.href ?? "/dashboard";
}
