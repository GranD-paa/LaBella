"use server";

import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function updateUserAdminStatus(
  userId: string,
  isAdmin: boolean
): Promise<ActionResult> {
  const repo = getDataRepository();
  const result = await repo.updateUserAdminStatus(userId, isAdmin);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
