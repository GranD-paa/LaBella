import type { Metadata } from "next";

import { requireAdmin } from "@/lib/supabase/admin-guard";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { AdminContentHeader } from "@/components/admin/admin-content-header";
import { ADMIN_TAB_VALUES } from "@/lib/admin-constants";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { getDataRepository } from "@/lib/data";
import { fetchAdminDashboardData } from "@/lib/dashboard-data";

import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

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
  const repo = getDataRepository();

  const [
    adminData,
    lessons,
    vocabulary,
    grammarRules,
    quizzes,
    quizQuestions,
  ] = await Promise.all([
    fetchAdminDashboardData(repo),
    repo.getLessons(),
    repo.getAllVocabulary(),
    repo.getAllGrammarRules(),
    repo.getQuizzes(),
    repo.getAllQuizQuestions(),
  ]);

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

      <div className="space-y-4">
        <AdminContentHeader />

        <AdminTabs
          defaultTab={defaultTab}
          lessons={lessons}
          vocabulary={vocabulary}
          grammarRules={grammarRules}
          quizzes={quizzes}
          quizQuestions={quizQuestions}
          users={adminData.users}
          currentUserId={user.id}
        />
      </div>
    </div>
  );
}
