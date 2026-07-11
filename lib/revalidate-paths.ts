import { revalidatePath } from "next/cache";

/** Revalidate learner-facing pages after admin content mutations. */
export function revalidateAppContent(lessonId?: string) {
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/profile");

  if (lessonId) {
    revalidatePath(`/lesson/${lessonId}`);
  } else {
    revalidatePath("/lesson", "layout");
  }
}
