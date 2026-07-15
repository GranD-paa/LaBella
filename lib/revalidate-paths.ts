import { revalidatePath } from "next/cache";

/** Revalidate learner-facing pages after admin content mutations. */
export function revalidateAppContent(lessonId?: string) {
  revalidatePath("/admin");
  revalidatePath("/menu");
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  revalidatePath("/learn", "layout");

  if (lessonId) {
    revalidatePath(`/lesson/${lessonId}`);
  } else {
    revalidatePath("/lesson", "layout");
  }
}
