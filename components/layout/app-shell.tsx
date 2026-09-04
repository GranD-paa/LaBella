import { AppHeader } from "@/components/layout/app-header";
import { AppHeaderLeft } from "@/components/layout/app-header-left";
import { UserNav } from "@/components/dashboard/user-nav";
import { getDataRepository } from "@/lib/data";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const repo = getDataRepository();
  // `/about`, `/contact` and `/subscription` render under this shell without a
  // session now, so an unreachable session store must not take the header down
  // with it.
  const user = await repo.getAuthUser().catch(() => null);

  let fullName: string | null = null;
  let isAdmin = false;

  if (user) {
    const profile = await repo.getProfileById(user.id);
    fullName = profile?.full_name ?? null;
    isAdmin = profile?.is_admin ?? false;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        left={<AppHeaderLeft isAdmin={isAdmin} />}
        right={
          <UserNav
            fullName={fullName}
            email={user?.email ?? null}
            isAdmin={isAdmin}
            isSignedIn={Boolean(user)}
          />
        }
      />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
