import { revalidatePath } from "next/cache";

/** Revalidate learner-facing routes after admin content mutations. */
export function revalidateLearnerContent(lessonId?: string) {
  revalidatePath("/dashboard");
  revalidatePath("/admin");

  if (lessonId) {
    revalidatePath(`/lesson/${lessonId}`);
  } else {
    revalidatePath("/lesson", "layout");
  }
}
