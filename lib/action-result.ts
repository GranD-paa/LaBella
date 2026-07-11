export type ActionResult =
  | { error: string; code?: number }
  | { success: true };
