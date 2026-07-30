"use server";

import { requireSuperAdminAction } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import { bannerSchema } from "@/lib/validations/admin";

/**
 * Banners are a platform-wide, first-impression surface — like curriculum
 * levels and language availability, only super admins may manage them.
 */
export async function uploadBannerAction(formData: FormData): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "admin.banners.errors.imageRequired" };
  }

  const parsed = bannerSchema.safeParse({
    title: formData.get("title") ?? "",
    linkHref: formData.get("linkHref") ?? "",
    status: formData.get("status") ?? "draft",
  });
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const uploaded = await repo.uploadBannerImage(file);
  if (uploaded.error || !uploaded.url) {
    return { error: uploaded.error ?? "actions.errors.generic" };
  }

  const result = await repo.createBanner({
    imageUrl: uploaded.url,
    title: parsed.data.title || null,
    linkHref: parsed.data.linkHref || null,
    status: parsed.data.status,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}

export async function updateBannerStatusAction(
  id: string,
  status: "draft" | "published"
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const result = await getDataRepository().updateBanner(id, { status });
  if (result.error) return { error: "actions.errors.generic" };

  revalidateAppContent();
  return { success: true };
}

export async function deleteBannerAction(id: string): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const result = await getDataRepository().deleteBanner(id);
  if (result.error) return { error: "actions.errors.generic" };

  revalidateAppContent();
  return { success: true };
}

export async function reorderBannerAction(
  id: string,
  direction: "up" | "down"
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const result = await getDataRepository().reorderBanner(id, direction);
  if (result.error) return { error: "actions.errors.generic" };

  revalidateAppContent();
  return { success: true };
}
