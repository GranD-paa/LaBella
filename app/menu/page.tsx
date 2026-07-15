import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MainMenu } from "@/components/menu/main-menu";
import { getDataRepository } from "@/lib/data";

export const metadata: Metadata = {
  title: "Main Menu — LaBella",
};

export default async function MenuPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await repo.getProfileById(user.id);
  const displayName = profile?.full_name || user.email?.split("@")[0] || "there";

  return <MainMenu displayName={displayName} />;
}
