"use client";

import { AdminHeaderBadge } from "@/components/layout/admin-header-badge";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function AppHeaderLeft({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-1 sm:gap-2">
      <LanguageSwitcher />
      {isAdmin ? <AdminHeaderBadge /> : null}
    </div>
  );
}
