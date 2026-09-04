import type { Metadata } from "next";

import { ContactView } from "@/components/contact/contact-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.contact", "meta.contactDescription");
}

/**
 * Public, because someone who cannot reach us has no reason to make an
 * account first. A signed-in learner still gets the form filled in for them;
 * a visitor gets it blank and types their own name and address.
 */
export default async function ContactPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser().catch(() => null);

  if (!user) {
    return <ContactView defaultName="" defaultEmail="" />;
  }

  const { t } = await getServerTranslator();
  const profile = await repo.getProfileById(user.id);
  const defaultName =
    profile?.full_name || user.email?.split("@")[0] || t("common.guestName");

  return (
    <ContactView defaultName={defaultName} defaultEmail={user.email ?? ""} />
  );
}
