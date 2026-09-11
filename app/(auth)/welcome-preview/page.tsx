import { notFound } from "next/navigation";

import { CompleteProfileForm } from "@/components/auth/complete-profile-form";
import { isLocalDataMode } from "@/lib/config/data-source";

/**
 * TEMPORARY — a way to look at the profile form on the dev server.
 *
 * `/welcome` redirects straight past the form in local data mode, because
 * there is no database to ask whether the profile is finished. This renders
 * the same form under the same layout so it can be reviewed. Delete once it
 * has been.
 */
export default function WelcomePreviewPage() {
  if (!isLocalDataMode()) {
    notFound();
  }

  return <CompleteProfileForm />;
}
