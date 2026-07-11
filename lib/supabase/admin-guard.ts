import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Server-side guard for the /admin route group. Verifies the current user
 * is signed in AND has `profiles.is_admin = true`. Non-admins are redirected
 * to /dashboard; signed-out users are redirected to /login.
 *
 * This is defense in depth on top of the database's Row Level Security
 * policies (see supabase/schema.sql), which are the ultimate source of
 * truth — a mutation from a non-admin will be rejected by Postgres even if
 * this check were somehow bypassed.
 */
export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectedFrom=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/dashboard");
  }

  return { user, profile };
}
