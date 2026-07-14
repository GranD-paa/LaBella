import type { Metadata } from "next";

import { requireAdmin } from "@/lib/supabase/admin-guard";
import { AdminTabs, ADMIN_TAB_VALUES } from "@/components/admin/admin-tabs";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { createClient } from "@/lib/supabase/server";
import { fetchAdminDashboardData } from "@/lib/dashboard-data";

export const metadata: Metadata = {
  title: "Admin Panel — LaBella",
};

const ADMIN_TABS = ADMIN_TAB_VALUES;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const defaultTab = ADMIN_TABS.includes(tab as (typeof ADMIN_TABS)[number])
    ? (tab as (typeof ADMIN_TABS)[number])
    : "quizzes";

  const { user, profile } = await requireAdmin();
  const supabase = await createClient();

  const [
    adminData,
    { data: lessons },
    { data: vocabulary },
    { data: grammarRules },
    { data: quizzes },
    { data: quizQuestions },
  ] = await Promise.all([
    fetchAdminDashboardData(supabase),
    supabase.from("lessons").select("*").order("order_number"),
    supabase.from("vocabulary").select("*").order("created_at", { ascending: false }),
    supabase
      .from("grammar_rules")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("quizzes").select("*").order("created_at", { ascending: false }),
    supabase.from("quiz_questions").select("*").order("created_at"),
  ]);

  const displayName = profile.full_name || user.email || "Admin";

  return (
    <div className="space-y-8">
      <AdminDashboard
        data={adminData}
        displayName={displayName}
        currentUserId={user.id}
        showFullManagement
      />

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Content management
          </h2>
          <p className="text-muted-foreground">
            Create, edit, and publish lessons, vocabulary, grammar, and quizzes.
          </p>
        </div>

        <AdminTabs
          defaultTab={defaultTab}
          lessons={lessons ?? []}
          vocabulary={vocabulary ?? []}
          grammarRules={grammarRules ?? []}
          quizzes={quizzes ?? []}
          quizQuestions={quizQuestions ?? []}
          users={adminData.users}
          currentUserId={user.id}
        />
      </div>
    </div>
  );
}
