import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

import { requireAdmin } from "@/lib/supabase/admin-guard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await requireAdmin();

  return (
    <div className="min-h-screen bg-background">
      <header className="brand-header">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/menu" className="brand-header-link">
              <LayoutDashboard className="h-5 w-5 text-brand-accent" />
              LaBella
            </Link>
            <Link href="/admin" className="text-sm font-medium text-white/80 hover:text-white">
              Admin Panel
            </Link>
            <Badge className="border-brand-accent/30 bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/20">
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="brand-header-btn"
              asChild
            >
              <Link href="/menu">
                <LayoutDashboard className="h-4 w-4" />
                Main Menu
              </Link>
            </Button>
            <UserNav
              fullName={profile.full_name}
              email={user.email ?? null}
              avatarUrl={profile.avatar_url}
              isAdmin={profile.is_admin}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
