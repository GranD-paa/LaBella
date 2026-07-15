import { AppHeader } from "@/components/layout/app-header";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AdminHeaderBadge } from "@/components/layout/admin-header-badge";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { UserNav } from "@/components/dashboard/user-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await requireAdmin();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        left={
          <div className="flex min-w-0 items-center gap-2">
            <LanguageSwitcher />
            <AdminHeaderBadge />
          </div>
        }
        right={
          <UserNav
            fullName={profile.full_name}
            email={user.email ?? null}
            avatarUrl={profile.avatar_url}
            isAdmin={profile.is_admin}
          />
        }
      />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
