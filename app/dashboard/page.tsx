import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { getDataRepository } from "@/lib/data";
import {
  fetchAdminDashboardData,
  fetchUserDashboardData,
} from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Dashboard — LaBella",
};

export default async function DashboardPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await repo.getProfileById(user.id);
  const displayName = profile?.full_name || user.email || "there";

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
