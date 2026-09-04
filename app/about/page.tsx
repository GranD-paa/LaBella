import type { Metadata } from "next";

import { AboutView } from "@/components/about/about-view";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.about", "meta.aboutDescription");
}

/** Public: it says who we are, and reads the same either way. */
export default function AboutPage() {
  return <AboutView />;
}
