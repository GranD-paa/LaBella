import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AboutView } from "@/components/about/about-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.about", "meta.aboutDescription");
}

export default async function AboutPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  return <AboutView />;
}
