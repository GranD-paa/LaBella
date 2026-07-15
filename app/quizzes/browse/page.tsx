import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { QuizBrowseHome } from "@/components/quizzes/quiz-browse-home";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.quizBrowse");
}

export default async function QuizBrowsePage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login?redirectedFrom=/quizzes/browse");
  }

  const profile = await repo.getProfileById(user.id);

  if (profile?.is_admin) {
    redirect("/admin/quizzes");
  }

  return <QuizBrowseHome />;
}
