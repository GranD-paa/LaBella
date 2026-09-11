import type { Metadata } from "next";

import { AdminQuizzesPageView } from "@/components/admin/quizzes/admin-quizzes-page-view";
import {
  CONTENT_CATEGORIES,
  type ContentCategorySlug,
  type ContentWizardTarget,
} from "@/lib/content-management/categories";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdminPage } from "@/lib/supabase/admin-guard";
import { scopeLanguageList } from "@/lib/permissions/roles";

type PageProps = {
  searchParams: Promise<{ language?: string; level?: string; type?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.adminQuizzes");
}

/**
 * The slot the lesson monitor asked to open, or null.
 *
 * Everything is checked against the live curriculum rather than trusted from
 * the URL, so a hand-edited link cannot push the wizard onto a language or
 * level that does not exist.
 */
function resolveRequestedSlot(
  languages: CurriculumLanguage[],
  params: { language?: string; level?: string; type?: string }
): Omit<ContentWizardTarget, "nonce"> | null {
  const language = languages.find(
    (entry) => entry.slug === params.language && entry.available
  );
  const level = language?.levels.find((entry) => entry.slug === params.level);
  const category = CONTENT_CATEGORIES.find(
    (entry) => entry.slug === params.type
  );

  if (!language || !level || !category) return null;

  return {
    languageSlug: language.slug,
    levelSlug: level.slug,
    category: category.slug as ContentCategorySlug,
  };
}

export default async function AdminQuizzesPage({ searchParams }: PageProps) {
  const { profile, user, role, assignedLanguages } =
    await requireAdminPage("manageContent");
  const repo = getDataRepository();

  const [params, lessons, allLanguages] = await Promise.all([
    searchParams,
    repo.getLessons(),
    getLanguagesWithAvailability(repo),
  ]);

  // A language-scoped role is shown its own curricula and nothing else, so the
  // wizard never opens on a language whose save would be refused.
  const languages = scopeLanguageList(allLanguages, role, assignedLanguages);

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return (
    <AdminQuizzesPageView
      displayName={displayName}
      lessons={lessons}
      languages={languages}
      requestedSlot={resolveRequestedSlot(languages, params)}
    />
  );
}
