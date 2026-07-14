import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import { createClient } from "@/lib/supabase/server";
import {
  fetchAdminDashboardData,
  fetchUserDashboardData,
} from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Dashboard — LaBella",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, is_admin")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || user.email || "there";

  if (profile?.is_admin) {
    const adminData = await fetchAdminDashboardData(supabase);
    return (
      <AdminDashboard
        data={adminData}
        displayName={displayName}
        currentUserId={user.id}
      />
    );
  }

  const userData = await fetchUserDashboardData(
    supabase,
    user.id,
    user.email ?? null
  );

  return <UserDashboard data={userData} displayName={displayName} />;
}
