import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { getDataRepository } from "@/lib/data";
import {
  fetchAdminDashboardData,
  fetchUserDashboardData,
} from "@/lib/dashboard-data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.dashboard");
}

export default async function DashboardPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { t } = await getServerTranslator();
  const profile = await repo.getProfileById(user.id);
  const displayName =
    profile?.full_name || user.email || t("common.guestName");

  if (profile?.is_admin) {
    const adminData = await fetchAdminDashboardData(repo);
    return (
      <AdminDashboard
        data={adminData}
        displayName={displayName}
        currentUserId={user.id}
      />
    );
  }

  const userData = await fetchUserDashboardData(repo, user.id, user.email);

  return <UserDashboard data={userData} displayName={displayName} />;
}
