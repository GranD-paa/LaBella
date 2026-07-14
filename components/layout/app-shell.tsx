import Link from "next/link";
import { GraduationCap, ShieldCheck } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/user-nav";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let fullName: string | null = null;
  let avatarUrl: string | null = null;
  let isAdmin = false;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, is_admin")
      .eq("id", user.id)
      .single();
    fullName = profile?.full_name ?? null;
    avatarUrl = profile?.avatar_url ?? null;
    isAdmin = profile?.is_admin ?? false;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="brand-header">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="brand-header-link">
            <GraduationCap className="h-5 w-5 text-brand-accent" />
            LaBella
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <Button
                variant="ghost"
                size="sm"
                className="brand-header-btn"
                asChild
              >
                <Link href="/admin">
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            ) : null}
            <UserNav
              fullName={fullName}
              email={user?.email ?? null}
              avatarUrl={avatarUrl}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
