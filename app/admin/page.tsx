import type { Metadata } from "next";

import { requireAdmin } from "@/lib/supabase/admin-guard";
import { RolesPermissionsPanel } from "@/components/admin/users/roles-permissions-panel";
import { UserManagementPanel } from "@/components/admin/users/user-management-panel";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { getDataRepository } from "@/lib/data";
import { fetchAdminDashboardData } from "@/lib/dashboard-data";

import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminPage() {
  const { user, profile } = await requireAdmin();
  const repo = getDataRepository();
  const adminData = await fetchAdminDashboardData(repo);

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return (
    <div className="space-y-8">
      <AdminDashboard
        data={adminData}
        displayName={displayName}
        currentUserId={user.id}
        showFullManagement
      />

      <div className="space-y-6">
        <UserManagementPanel users={adminData.users} currentUserId={user.id} />
        <RolesPermissionsPanel />
      </div>
    </div>
  );
}
