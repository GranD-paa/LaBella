import type { Metadata } from "next";

import { LandingLanguagePanel } from "@/components/admin/landing/landing-language-panel";
import { getDataRepository } from "@/lib/data";
import { getLandingLanguageToggles } from "@/lib/landing/visibility";
import { requireAdminPage } from "@/lib/supabase/admin-guard";

export const metadata: Metadata = { title: "صفحهٔ اصلی — مدیریت" };

/**
 * Controls which languages appear in the landing page's 3D showcase.
 *
 * All six landmarks are built and ready; this page decides which of them the
 * public sees. Super admins only, like the other platform-wide switches.
 */
export default async function AdminLandingPage() {
  await requireAdminPage("manageLanding");

  const languages = await getLandingLanguageToggles(getDataRepository());

  return <LandingLanguagePanel languages={languages} />;
}
