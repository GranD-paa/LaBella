import { getDataSource, type DataSource } from "@/lib/config/data-source";
import { createLocalRepository } from "@/lib/data/local/repository";
import { createPostgresRepository } from "@/lib/data/postgres/repository";
import type { DataRepository } from "@/lib/data/repository";
import { createSupabaseRepository } from "@/lib/data/supabase/repository";

let repository: DataRepository | null = null;

export function getDataRepository(): DataRepository {
  if (!repository) {
    const source = getDataSource();
    repository =
      source === "local"
        ? createLocalRepository()
        : source === "postgres"
          ? createPostgresRepository()
          : createSupabaseRepository();
  }
  return repository;
}

export function getActiveDataSourceLabel(): DataSource {
  return getDataSource();
}
