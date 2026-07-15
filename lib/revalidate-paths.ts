import { revalidatePath } from "next/cache";

/** Revalidate learner-facing pages after admin content mutations. */
export function revalidateAppContent(lessonId?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/quizzes");
  revalidatePath("/menu");
  revalidatePath("/dashboard");
  revalidatePath("/profile");
  revalidatePath("/quizzes");
  revalidatePath("/quizzes/browse", "layout");
  revalidatePath("/learn", "layout");

  if (lessonId) {
    revalidatePath(`/lesson/${lessonId}`);
  } else {
    revalidatePath("/lesson", "layout");
  }
}
