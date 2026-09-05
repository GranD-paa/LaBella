/**
 * Grammar is read, not written: a title holds an ordered run of pages that came
 * from one or more uploaded PDFs. These tables arrived after the move to
 * self-hosted Postgres, so they are typed by hand rather than generated from
 * the old Supabase schema.
 */

export type GrammarPage = {
  id: string;
  ruleId: string;
  /** Position within the title, across every document uploaded into it. */
  pageNumber: number;
  /** Object storage key. Never a URL — reads are signed at request time. */
  objectKey: string;
  width: number | null;
  height: number | null;
  /** Original filename, so one document's pages can be removed together. */
  sourceDocument: string | null;
  sourcePage: number | null;
};

/** A page with a link that works, minted for one learner for a few minutes. */
export type SignedGrammarPage = Omit<GrammarPage, "objectKey"> & {
  url: string;
};

export type GrammarPageSummary = {
  ruleId: string;
  pageCount: number;
  /** The page this learner last read, absent if they have not opened it. */
  lastReadPage: number | null;
};
