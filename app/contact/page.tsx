import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ContactView } from "@/components/contact/contact-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.contact", "meta.contactDescription");
}

export default async function ContactPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { t } = await getServerTranslator();
  const profile = await repo.getProfileById(user.id);
  const defaultName =
    profile?.full_name || user.email?.split("@")[0] || t("common.guestName");

  return (
    <ContactView defaultName={defaultName} defaultEmail={user.email ?? ""} />
  );
}
