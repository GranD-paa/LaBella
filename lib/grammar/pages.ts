import type { GrammarRuleWithPages } from "@/components/lessons/grammar-rules-list";
import type { DataRepository } from "@/lib/data/repository";
import { isObjectStorageConfigured, signedReadUrl } from "@/lib/storage";
import type { GrammarRule } from "@/types";

/**
 * Turns the grammar titles of a lesson into something the reader can display:
 * every page, in order, behind a link that works for a few minutes.
 *
 * Signing happens here rather than in the component because it needs the
 * server's credentials and the caller's identity together. A learner receives
 * links, never keys and never object names, so there is nothing in the page
 * source that outlives the visit.
 *
 * The links are minted for the whole title at once. A long document therefore
 * costs one round of signing on open rather than one per page turn, which is
 * what keeps flipping instant; the cost is that a reader who lingers past the
 * expiry has to reopen the title.
 */
export async function attachGrammarPages(
  repo: DataRepository,
  lessonId: string,
  userId: string | null,
  rules: GrammarRule[]
): Promise<GrammarRuleWithPages[]> {
  if (rules.length === 0 || !isObjectStorageConfigured()) {
    return rules.map((rule) => ({ ...rule, pages: [], lastReadPage: null }));
  }

  const summaries = await repo.getGrammarPageSummaries(lessonId, userId);
  const lastReadByRule = new Map(
    summaries.map((summary) => [summary.ruleId, summary.lastReadPage])
  );

  return Promise.all(
    rules.map(async (rule) => {
      const pages = await repo.getGrammarPages(rule.id);
      return {
        ...rule,
        lastReadPage: lastReadByRule.get(rule.id) ?? null,
        pages: await Promise.all(
          pages.map(async ({ objectKey, ...page }) => ({
            ...page,
            url: await signedReadUrl(objectKey),
          }))
        ),
      };
    })
  );
}
