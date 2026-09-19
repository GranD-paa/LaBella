"use client";

import { LanguageSwitcher } from "@/components/layout/language-switcher";

/**
 * What sits beside the logo on the sign-in header.
 *
 * It used to be the mobile half of a two-column sign-in, with a purple panel
 * carrying the logo and a quote on wide screens. The panel is gone and the
 * form is centred on its own, so this is now the header at every width.
 */
export function AuthHeaderControls() {
  return (
    <div className="flex items-center justify-start">
      <LanguageSwitcher />
    </div>
  );
}
