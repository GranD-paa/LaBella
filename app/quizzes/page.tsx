import { redirect } from "next/navigation";

import { getDataRepository } from "@/lib/data";

export default async function QuizzesEntryPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login?redirectedFrom=/quizzes");
  }

  const profile = await repo.getProfileById(user.id);

  if (profile?.is_admin) {
    redirect("/admin/quizzes");
  }

  redirect("/quizzes/browse");
}
