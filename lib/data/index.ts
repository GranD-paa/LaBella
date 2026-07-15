import { isLocalDataMode } from "@/lib/config/data-source";
import { createLocalRepository } from "@/lib/data/local/repository";
import type { DataRepository } from "@/lib/data/repository";
import { createSupabaseRepository } from "@/lib/data/supabase/repository";

let repository: DataRepository | null = null;

export function getDataRepository(): DataRepository {
  if (!repository) {
    repository = isLocalDataMode()
      ? createLocalRepository()
      : createSupabaseRepository();
  }
  return repository;
}

export function getActiveDataSourceLabel(): "local" | "supabase" {
  return isLocalDataMode() ? "local" : "supabase";
}
