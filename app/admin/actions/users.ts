"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function updateUserAdminStatus(
  userId: string,
  isAdmin: boolean
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!currentProfile?.is_admin) {
    return { error: "Only admins can manage user roles." };
  }

  if (userId === user.id && !isAdmin) {
    return { error: "You cannot remove your own admin access." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ is_admin: isAdmin })
    .eq("id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent();
  return { success: true };
}
