import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { MainMenu } from "@/components/menu/main-menu";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.menu");
}

export default async function MenuPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { t } = await getServerTranslator();
  const profile = await repo.getProfileById(user.id);
  const displayName =
    profile?.full_name || user.email?.split("@")[0] || t("common.guestName");
  const languages = await getLanguagesWithAvailability(repo);

  return <MainMenu displayName={displayName} languages={languages} />;
}
