import { redirect } from "next/navigation";

import { getDataRepository } from "@/lib/data";

export async function requireAdmin() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login?redirectedFrom=/admin");
  }

  const profile = await repo.getProfileById(user.id);

  if (!profile?.is_admin) {
    redirect("/dashboard");
  }

  return {
    user: { id: user.id, email: user.email },
    profile,
  };
}
