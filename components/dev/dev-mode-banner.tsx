import { isLocalDataMode } from "@/lib/config/data-source";
import { getLocalStore } from "@/lib/data/local/store";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { LOCAL_DEV_CODE } from "@/lib/auth/local-phone-auth";

/**
 * Server Component so it reads whichever accounts actually exist in the local
 * store right now, rather than the seed file's hardcoded placeholder numbers.
 *
 * The two are easy to let drift apart: the store is a JSON file the user
 * edits directly (signing up, running the content-sync script, swapping in
 * real accounts), while the seed only describes what a *fresh* store starts
 * with. A banner reading the seed keeps advertising numbers nobody can
 * actually use the moment the store diverges from it.
 */
export async function DevModeBanner() {
  if (!isLocalDataMode()) {
    return null;
  }

  const { t } = await getServerTranslator();
  const store = getLocalStore();
  const profileById = new Map(store.profiles.map((profile) => [profile.id, profile]));

  const admin = store.users.find((user) => profileById.get(user.id)?.is_admin);
  const learner = store.users.find((user) => !profileById.get(user.id)?.is_admin);

  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-100">
      {t("dev.banner", {
        adminPhone: localFormat(admin?.phone),
        userPhone: localFormat(learner?.phone),
        code: LOCAL_DEV_CODE,
      })}
    </div>
  );
}

/** The number as it is typed into the sign-in field, not as it is stored. */
function localFormat(e164: string | undefined): string {
  return e164?.startsWith("+98") ? `0${e164.slice(3)}` : "—";
}
