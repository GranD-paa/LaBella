-- =========================================================================
-- Grammar as pages, not prose
-- =========================================================================
-- Grammar stops being a written card and becomes a document the learner
-- reads: each grammar_rules row keeps its title and gains an ordered run of
-- pages. An admin uploads a PDF, the server renders every page to an image,
-- and those images are what the learner sees.
--
-- Pages, not files, are the unit. Uploading a second PDF into the same title
-- appends its pages after the first, so a title can be assembled from several
-- documents while the reader still shows one continuous run to flip through.
-- `source_document` records which upload a page came from, which is what makes
-- removing one document's pages later possible.
create table if not exists public.grammar_pages (
  id uuid primary key default gen_random_uuid(),
  rule_id uuid not null references public.grammar_rules (id) on delete cascade,
  page_number integer not null,
  object_key text not null,
  width integer,
  height integer,
  source_document text,
  source_page integer,
  created_at timestamptz not null default now(),
  constraint grammar_pages_page_number_check check (page_number > 0),
  constraint grammar_pages_unique_order unique (rule_id, page_number)
);

create index if not exists grammar_pages_rule_idx
  on public.grammar_pages (rule_id, page_number);

comment on table public.grammar_pages is
  'Rendered pages of the grammar documents uploaded for a grammar_rules row.';

-- Where each learner stopped reading. One row per learner per title, so
-- reopening a title returns to the page they left rather than to page one.
create table if not exists public.grammar_reading_progress (
  user_id text not null references public.profiles (id) on delete cascade,
  rule_id uuid not null references public.grammar_rules (id) on delete cascade,
  page_number integer not null default 1,
  updated_at timestamptz not null default now(),
  primary key (user_id, rule_id),
  constraint grammar_reading_progress_page_check check (page_number > 0)
);

comment on table public.grammar_reading_progress is
  'The page each learner last read in a grammar title.';
