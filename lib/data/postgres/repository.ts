import { headers } from "next/headers";

import { auth } from "@/lib/auth/better-auth";
import { getAccountingSnapshot } from "@/lib/data/postgres/accounting";
import {
  buildUpdate,
  execute,
  query,
  queryOne,
  withTransaction,
} from "@/lib/data/postgres/client";
import type {
  AuthUser,
  DataRepository,
  ProfileSummary,
} from "@/lib/data/repository";
import type { CurriculumLevelOverrideRow } from "@/lib/curriculum/level-overrides";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";
import type {
  Banner,
  FxRate,
  GrammarRule,
  Lesson,
  Payment,
  PaymentSettings,
  Profile,
  Quiz,
  QuizQuestion,
  Subscription,
  SubscriptionEvent,
  SubscriptionPageContentRow,
  SubscriptionPlanRow,
  SubscriptionTier,
  UserLearningState,
  UserQuizAttempt,
  VideoLesson,
  Vocabulary,
} from "@/types";

const PROFILE_COLUMNS =
  "id, full_name, avatar_url, email, is_admin, role, status, created_at";

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  status: string;
  publishedAt: Date | string | null;
  authorId: string | null;
  authorName: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  noindex: boolean;
  readingMinutes: number | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  categorySlugs: string[] | null;
};

/**
 * One select for every blog read, so the public list, the single post and the
 * admin table can never drift into returning different shapes. Categories come
 * back aggregated rather than joined, which keeps one post as exactly one row
 * however many categories it carries.
 */
const BLOG_POST_SELECT = `
  select p.id, p.slug, p.title, p.excerpt, p.content,
         p.cover_image_url as "coverImageUrl", p.status,
         p.published_at as "publishedAt", p.author_id as "authorId",
         pr.full_name as "authorName",
         p.meta_title as "metaTitle", p.meta_description as "metaDescription",
         p.canonical_url as "canonicalUrl", p.og_image_url as "ogImageUrl",
         p.noindex, p.reading_minutes as "readingMinutes",
         p.created_at as "createdAt", p.updated_at as "updatedAt",
         coalesce(
           array(select pc.category_slug from blog_post_categories pc
                 where pc.post_id = p.id order by pc.category_slug),
           '{}'
         ) as "categorySlugs"
  from blog_posts p
  left join profiles pr on pr.id = p.author_id`;

function toIso(value: Date | string | null): string | null {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : value;
}

function mapBlogPost(row: BlogPostRow): BlogPost {
  return {
    ...row,
    status: row.status === "published" ? "published" : "draft",
    publishedAt: toIso(row.publishedAt),
    createdAt: toIso(row.createdAt) ?? new Date().toISOString(),
    updatedAt: toIso(row.updatedAt) ?? new Date().toISOString(),
    categorySlugs: row.categorySlugs ?? [],
  };
}


/** Turns a thrown database error into the `{ error }` shape callers expect. */
function failure(error: unknown): { error: string } {
  return {
    error: error instanceof Error ? error.message : "Unexpected database error",
  };
}

async function mutate(
  run: () => Promise<unknown>
): Promise<{ error?: string }> {
  try {
    await run();
    return {};
  } catch (error) {
    return failure(error);
  }
}

/**
 * Reads and writes go through Better Auth for identity and plain SQL for
 * everything else.
 *
 * Unlike the Supabase repository there is no per-request database identity to
 * lean on — the app connects as a single role — so the security-definer
 * functions that used to read `auth.uid()` now take the user id as their first
 * argument, and this file is responsible for passing the *session's* id rather
 * than anything a caller supplied. Broader authorization still lives in
 * `lib/permissions` and `lib/auth/action-guards.ts`.
 */
export function createPostgresRepository(): DataRepository {
  /** The signed-in user's id, or a thrown error — never a caller-supplied id. */
  async function requireUserId(): Promise<string> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      throw new Error("not authenticated");
    }
    return session.user.id;
  }

  const repository: DataRepository = {
    // ---------------------------------------------------------------- auth
    async getAuthUser(): Promise<AuthUser | null> {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user?.email) {
        return null;
      }
      return { id: session.user.id, email: session.user.email };
    },

    async signInWithPassword(email: string, password: string) {
      try {
        await auth.api.signInEmail({
          body: { email, password },
          headers: await headers(),
        });
      } catch {
        // Better Auth distinguishes unknown-email from wrong-password; we
        // deliberately do not, so the form cannot be used to discover which
        // addresses have accounts.
        return { error: "Invalid login credentials" };
      }

      const profile = await queryOne<{ status: Profile["status"] }>(
        "select status from profiles where email = $1",
        [email]
      );
      if (profile?.status === "suspended") {
        await repository.signOut();
        return {
          error: "Your account has been suspended. Contact an administrator.",
        };
      }

      return {};
    },

    async signOut(): Promise<void> {
      await auth.api.signOut({ headers: await headers() });
    },

    // ------------------------------------------------------------ profiles
    getProfileById: (userId) =>
      queryOne<ProfileSummary>(
        `select ${PROFILE_COLUMNS} from profiles where id = $1`,
        [userId]
      ),

    getAllProfiles: () =>
      query<ProfileSummary>(
        `select ${PROFILE_COLUMNS} from profiles order by created_at desc`
      ),

    updateUserAdminStatus: (userId, isAdmin) =>
      mutate(() =>
        execute("update profiles set is_admin = $2 where id = $1", [
          userId,
          isAdmin,
        ])
      ),

    updateUserRole: (userId, role) =>
      mutate(() =>
        execute("update profiles set role = $2 where id = $1", [userId, role])
      ),

    updateUserStatus: (userId, status) =>
      mutate(() =>
        execute("update profiles set status = $2 where id = $1", [
          userId,
          status,
        ])
      ),

    sendPasswordResetEmail: (email) =>
      mutate(async () => {
        await auth.api.requestPasswordReset({
          body: { email, redirectTo: "/login" },
          headers: await headers(),
        });
      }),

    // ------------------------------------------------- language & curriculum
    async getLanguageAvailability() {
      const rows = await query<{ language_slug: string; enabled: boolean }>(
        "select language_slug, enabled from language_settings"
      );
      return Object.fromEntries(
        rows.map((row) => [row.language_slug, row.enabled])
      );
    },

    setLanguageAvailability: (languageSlug, enabled) =>
      mutate(() =>
        execute(
          `insert into language_settings (language_slug, enabled, updated_at)
           values ($1, $2, now())
           on conflict (language_slug)
           do update set enabled = excluded.enabled, updated_at = now()`,
          [languageSlug, enabled]
        )
      ),

    async getLandingLanguageVisibility() {
      // The landing page must render even on a database that predates
      // db/004_landing_and_blog.sql, so a missing table falls back to the
      // static defaults rather than taking down `/`.
      try {
        const rows = await query<{ language_slug: string; visible: boolean }>(
          "select language_slug, visible from landing_language_settings"
        );
        return Object.fromEntries(
          rows.map((row) => [row.language_slug, row.visible])
        );
      } catch {
        return {};
      }
    },

    setLandingLanguageVisibility: (languageSlug, visible) =>
      mutate(() =>
        execute(
          `insert into landing_language_settings (language_slug, visible, updated_at)
           values ($1, $2, now())
           on conflict (language_slug)
           do update set visible = excluded.visible, updated_at = now()`,
          [languageSlug, visible]
        )
      ),

    // ------------------------------------------------------------------ blog
    getBlogCategories: () =>
      query<BlogCategory>(
        `select slug, name, description, order_number as "orderNumber"
         from blog_categories
         order by order_number, name`
      ),

    async getPublishedBlogPosts(options) {
      const { categorySlug, limit = 12, offset = 0 } = options ?? {};

      // The category filter is an EXISTS rather than a join: joining the
      // category table would return one row per category per post, so a post
      // in three categories would appear three times in the list.
      const filters = ["p.status = 'published'", "p.published_at is not null"];
      const values: unknown[] = [];

      if (categorySlug) {
        values.push(categorySlug);
        filters.push(
          `exists (select 1 from blog_post_categories pc
                   where pc.post_id = p.id and pc.category_slug = $${values.length})`
        );
      }

      const where = filters.join(" and ");

      const totalRow = await queryOne<{ total: string }>(
        `select count(*)::text as total from blog_posts p where ${where}`,
        values
      );

      values.push(limit, offset);
      const posts = await query<BlogPostRow>(
        `${BLOG_POST_SELECT}
         where ${where}
         order by p.published_at desc
         limit $${values.length - 1} offset $${values.length}`,
        values
      );

      return {
        posts: posts.map(mapBlogPost),
        total: Number(totalRow?.total ?? 0),
      };
    },

    async getPublishedBlogPostBySlug(slug) {
      const row = await queryOne<BlogPostRow>(
        `${BLOG_POST_SELECT}
         where p.slug = $1 and p.status = 'published' and p.published_at is not null`,
        [slug]
      );
      return row ? mapBlogPost(row) : null;
    },

    async getBlogPostsForAdmin() {
      const rows = await query<BlogPostRow>(
        `${BLOG_POST_SELECT}
         order by coalesce(p.published_at, p.updated_at) desc`
      );
      return rows.map(mapBlogPost);
    },

    async getBlogPostById(id) {
      const row = await queryOne<BlogPostRow>(
        `${BLOG_POST_SELECT} where p.id = $1`,
        [id]
      );
      return row ? mapBlogPost(row) : null;
    },

    async upsertBlogPost(input) {
      try {
        const id = await withTransaction(async (run) => {
          // `published_at` is stamped the first time a post goes live and then
          // left alone: re-editing a published post must not reorder the index
          // or change the date shown in search results. Unpublishing clears it.
          const rows = (await run(
            `insert into blog_posts
               (id, slug, title, excerpt, content, cover_image_url, status,
                published_at, author_id, meta_title, meta_description,
                canonical_url, og_image_url, noindex, reading_minutes, updated_at)
             values
               (coalesce($1::uuid, gen_random_uuid()), $2, $3, $4, $5, $6, $7,
                case when $7 = 'published' then now() else null end,
                $8, $9, $10, $11, $12, $13, $14, now())
             on conflict (id) do update set
               slug = excluded.slug,
               title = excluded.title,
               excerpt = excluded.excerpt,
               content = excluded.content,
               cover_image_url = excluded.cover_image_url,
               status = excluded.status,
               published_at = case
                 when excluded.status <> 'published' then null
                 else coalesce(blog_posts.published_at, now())
               end,
               meta_title = excluded.meta_title,
               meta_description = excluded.meta_description,
               canonical_url = excluded.canonical_url,
               og_image_url = excluded.og_image_url,
               noindex = excluded.noindex,
               reading_minutes = excluded.reading_minutes,
               updated_at = now()
             returning id`,
            [
              input.id ?? null,
              input.slug,
              input.title,
              input.excerpt,
              input.content,
              input.coverImageUrl,
              input.status,
              input.authorId ?? null,
              input.metaTitle,
              input.metaDescription,
              input.canonicalUrl,
              input.ogImageUrl,
              input.noindex,
              input.readingMinutes ?? null,
            ]
          )) as Array<{ id: string }>;

          const postId = rows[0].id;

          await run("delete from blog_post_categories where post_id = $1", [
            postId,
          ]);

          for (const categorySlug of input.categorySlugs) {
            await run(
              `insert into blog_post_categories (post_id, category_slug)
               values ($1, $2) on conflict do nothing`,
              [postId, categorySlug]
            );
          }

          return postId;
        });

        return { id };
      } catch (error) {
        return failure(error);
      }
    },

    deleteBlogPost: (id) =>
      mutate(() => execute("delete from blog_posts where id = $1", [id])),

    getCurriculumLevelOverrides: () =>
      query<CurriculumLevelOverrideRow>(
        `select language_slug as "languageSlug", slug, code, title, description,
                order_number as "orderNumber", is_custom as "isCustom"
         from curriculum_level_overrides
         order by language_slug, order_number nulls last, slug`
      ),

    upsertCurriculumLevelOverride: (row) =>
      mutate(() =>
        execute(
          `insert into curriculum_level_overrides
             (language_slug, slug, code, title, description, order_number, is_custom, updated_at)
           values ($1, $2, $3, $4, $5, $6, $7, now())
           on conflict (language_slug, slug) do update set
             code = excluded.code,
             title = excluded.title,
             description = excluded.description,
             order_number = excluded.order_number,
             is_custom = excluded.is_custom,
             updated_at = now()`,
          [
            row.languageSlug,
            row.slug,
            row.code,
            row.title,
            row.description,
            row.orderNumber,
            row.isCustom,
          ]
        )
      ),

    deleteCurriculumLevelOverride: (languageSlug, slug) =>
      mutate(() =>
        execute(
          "delete from curriculum_level_overrides where language_slug = $1 and slug = $2",
          [languageSlug, slug]
        )
      ),

    getLearningState: (userId) =>
      queryOne<UserLearningState>(
        "select * from user_learning_state where user_id = $1",
        [userId]
      ),

    upsertLearningState: (userId, input) =>
      mutate(() =>
        execute(
          `insert into user_learning_state
             (user_id, language_slug, level_slug, lesson_id, section_slug, updated_at)
           values ($1, $2, $3, $4, $5, now())
           on conflict (user_id) do update set
             language_slug = excluded.language_slug,
             level_slug = excluded.level_slug,
             lesson_id = excluded.lesson_id,
             section_slug = excluded.section_slug,
             updated_at = now()`,
          [
            userId,
            input.languageSlug,
            input.levelSlug,
            input.lessonId ?? null,
            input.sectionSlug ?? null,
          ]
        )
      ),

    // ------------------------------------------------------- content reads
    getLessons: () =>
      query<Lesson>("select * from lessons order by order_number"),

    getLessonById: (id) =>
      queryOne<Lesson>("select * from lessons where id = $1", [id]),

    getLessonByOrderNumber: (orderNumber) =>
      queryOne<Lesson>("select * from lessons where order_number = $1", [
        orderNumber,
      ]),

    getVocabularyByLessonId: (lessonId) =>
      query<Vocabulary>(
        "select * from vocabulary where lesson_id = $1 order by created_at",
        [lessonId]
      ),

    getAllVocabulary: () =>
      query<Vocabulary>("select * from vocabulary order by created_at"),

    getGrammarRulesByLessonId: (lessonId) =>
      query<GrammarRule>(
        "select * from grammar_rules where lesson_id = $1 order by created_at",
        [lessonId]
      ),

    getAllGrammarRules: () =>
      query<GrammarRule>("select * from grammar_rules order by created_at"),

    getVideoLessonsByLessonId: (lessonId) =>
      query<VideoLesson>(
        "select * from video_lessons where lesson_id = $1 order by created_at",
        [lessonId]
      ),

    getAllVideoLessons: () =>
      query<VideoLesson>("select * from video_lessons order by created_at"),

    getQuizzes: () =>
      query<Quiz>("select * from quizzes order by created_at"),

    getQuizById: (id) =>
      queryOne<Quiz>("select * from quizzes where id = $1", [id]),

    getQuizQuestionsByQuizId: (quizId) =>
      query<QuizQuestion>(
        "select * from quiz_questions where quiz_id = $1 order by created_at",
        [quizId]
      ),

    getAllQuizQuestions: () =>
      query<QuizQuestion>("select * from quiz_questions order by created_at"),

    // Answers are fetched separately from the questions so the grading data
    // never rides along with what gets rendered to the learner.
    getQuizQuestionAnswers: (quizId) =>
      query<{
        id: string;
        correct_option: string;
        question_type: "multiple_choice" | "written";
        expected_answer: string | null;
      }>(
        `select id, correct_option, question_type, expected_answer
         from quiz_questions where quiz_id = $1`,
        [quizId]
      ),

    // ------------------------------------------------------- quiz attempts
    getAttemptsByUserId: (userId) =>
      query<UserQuizAttempt>(
        "select * from user_quiz_attempts where user_id = $1 order by created_at desc",
        [userId]
      ),

    getAttemptByUserAndQuiz: (userId, quizId) =>
      queryOne<UserQuizAttempt>(
        `select * from user_quiz_attempts
         where user_id = $1 and quiz_id = $2
         order by created_at desc limit 1`,
        [userId, quizId]
      ),

    getAllAttempts: () =>
      query<UserQuizAttempt>(
        "select * from user_quiz_attempts order by created_at desc"
      ),

    async createQuizAttempt(input) {
      try {
        const row = await queryOne<{
          result: {
            ok: boolean;
            reason?: string;
            attempt_number?: number;
            retake_limit?: number | null;
          };
        }>("select public.record_quiz_attempt($1, $2, $3, $4) as result", [
          input.userId,
          input.quizId,
          input.score,
          input.answersJson,
        ]);

        const result = row?.result;
        if (!result?.ok) {
          // The retake allowance is a paid entitlement enforced in the
          // database; 403 is what the callers already branch on.
          return {
            error: result?.reason ?? "Could not record attempt",
            code: 403,
            retakeLimit: result?.retake_limit ?? null,
          };
        }

        return {
          attemptNumber: result.attempt_number,
          retakeLimit: result.retake_limit ?? null,
        };
      } catch (error) {
        return failure(error);
      }
    },

    // --------------------------------------------------- content mutations
    createLesson: (input) =>
      mutate(() =>
        execute(
          "insert into lessons (title, description, order_number) values ($1, $2, $3)",
          [input.title, input.description, input.orderNumber]
        )
      ),

    updateLesson: (id, input) =>
      mutate(() =>
        execute(
          "update lessons set title = $2, description = $3, order_number = $4 where id = $1",
          [id, input.title, input.description, input.orderNumber]
        )
      ),

    deleteLesson: (id) =>
      mutate(() => execute("delete from lessons where id = $1", [id])),

    createVocabulary: (input) =>
      mutate(() =>
        execute(
          `insert into vocabulary
             (lesson_id, word, translation, image_url, example_sentence, pronunciation, status)
           values ($1, $2, $3, $4, $5, $6, $7)`,
          [
            input.lesson_id,
            input.word,
            input.translation,
            input.image_url,
            input.example_sentence,
            input.pronunciation,
            input.status,
          ]
        )
      ),

    updateVocabulary: (id, input) =>
      mutate(() => {
        const update = buildUpdate(input, {
          lesson_id: "lesson_id",
          word: "word",
          translation: "translation",
          image_url: "image_url",
          example_sentence: "example_sentence",
          pronunciation: "pronunciation",
          status: "status",
        });
        if (!update) return Promise.resolve(0);
        return execute(
          `update vocabulary set ${update.sql} where id = $${update.values.length + 1}`,
          [...update.values, id]
        );
      }),

    deleteVocabulary: (id) =>
      mutate(() => execute("delete from vocabulary where id = $1", [id])),

    createGrammarRule: (input) =>
      mutate(() =>
        execute(
          `insert into grammar_rules (lesson_id, title, description, example, status)
           values ($1, $2, $3, $4, $5)`,
          [
            input.lesson_id,
            input.title,
            input.description,
            input.example,
            input.status,
          ]
        )
      ),

    updateGrammarRule: (id, input) =>
      mutate(() => {
        const update = buildUpdate(input, {
          lesson_id: "lesson_id",
          title: "title",
          description: "description",
          example: "example",
          status: "status",
        });
        if (!update) return Promise.resolve(0);
        return execute(
          `update grammar_rules set ${update.sql} where id = $${update.values.length + 1}`,
          [...update.values, id]
        );
      }),

    deleteGrammarRule: (id) =>
      mutate(() => execute("delete from grammar_rules where id = $1", [id])),

    createVideoLesson: (input) =>
      mutate(() =>
        execute(
          `insert into video_lessons
             (lesson_id, language_slug, level_slug, title, description, video_url, thumbnail_url, status)
           values ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            input.lesson_id,
            input.language_slug,
            input.level_slug,
            input.title,
            input.description,
            input.video_url,
            input.thumbnail_url,
            input.status,
          ]
        )
      ),

    // A quiz with no questions is useless and a half-written one is worse, so
    // the quiz and its questions are written in a single transaction.
    createQuizWithQuestions: (input) =>
      mutate(async () => {
        const { getPool } = await import("@/lib/data/postgres/client");
        const client = await getPool().connect();
        try {
          await client.query("begin");
          const quiz = await client.query<{ id: string }>(
            `insert into quizzes
               (lesson_id, title, language_slug, level_slug, section_slug, status)
             values ($1, $2, $3, $4, $5, coalesce($6, 'draft'))
             returning id`,
            [
              input.lessonId,
              input.title,
              input.languageSlug ?? null,
              input.levelSlug ?? null,
              input.sectionSlug ?? null,
              input.status ?? null,
            ]
          );
          const quizId = quiz.rows[0].id;

          for (const question of input.questions) {
            await client.query(
              `insert into quiz_questions
                 (quiz_id, question_text, option_a, option_b, option_c, option_d,
                  correct_option, question_type, expected_answer, explanation)
               values ($1, $2, $3, $4, $5, $6, $7, coalesce($8, 'multiple_choice'), $9, $10)`,
              [
                quizId,
                question.questionText,
                question.optionA ?? null,
                question.optionB ?? null,
                question.optionC ?? null,
                question.optionD ?? null,
                question.correctOption ?? null,
                question.questionType ?? null,
                question.expectedAnswer ?? null,
                question.explanation ?? null,
              ]
            );
          }

          await client.query("commit");
        } catch (error) {
          await client.query("rollback");
          throw error;
        } finally {
          client.release();
        }
      }),

    updateQuizStatus: (id, status) =>
      mutate(() =>
        execute("update quizzes set status = $2 where id = $1", [id, status])
      ),

    updateQuizTitle: (id, title) =>
      mutate(() =>
        execute("update quizzes set title = $2 where id = $1", [id, title])
      ),

    deleteQuiz: (id) =>
      mutate(() => execute("delete from quizzes where id = $1", [id])),

    addQuizQuestion: (quizId, input) =>
      mutate(() =>
        execute(
          `insert into quiz_questions
             (quiz_id, question_text, option_a, option_b, option_c, option_d,
              correct_option, question_type, expected_answer, explanation)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            quizId,
            input.question_text,
            input.option_a,
            input.option_b,
            input.option_c,
            input.option_d,
            input.correct_option,
            input.question_type,
            input.expected_answer,
            input.explanation,
          ]
        )
      ),

    updateQuizQuestion: (id, input) =>
      mutate(() => {
        const update = buildUpdate(input, {
          question_text: "question_text",
          option_a: "option_a",
          option_b: "option_b",
          option_c: "option_c",
          option_d: "option_d",
          correct_option: "correct_option",
          question_type: "question_type",
          expected_answer: "expected_answer",
          explanation: "explanation",
        });
        if (!update) return Promise.resolve(0);
        return execute(
          `update quiz_questions set ${update.sql} where id = $${update.values.length + 1}`,
          [...update.values, id]
        );
      }),

    deleteQuizQuestion: (id) =>
      mutate(() => execute("delete from quiz_questions where id = $1", [id])),

    // -------------------------------------------------------------- banners
    getActiveBanners: () =>
      query<Banner>(
        "select * from banners where status = 'published' order by order_number"
      ),

    getAllBanners: () =>
      query<Banner>("select * from banners order by order_number"),

    async uploadBannerImage() {
      // Supabase Storage held these. ArvanCloud object storage is provisioned
      // later in the migration (nothing to migrate yet), so this fails plainly
      // instead of pretending to have stored the file.
      return {
        error:
          "Image upload is not available yet — object storage is not configured.",
      };
    },

    createBanner: (input) =>
      mutate(() =>
        execute(
          `insert into banners (image_url, title, link_href, status, order_number)
           values ($1, $2, $3, $4,
             coalesce((select max(order_number) + 1 from banners), 1))`,
          [input.imageUrl, input.title, input.linkHref, input.status]
        )
      ),

    updateBanner: (id, input) =>
      mutate(() => {
        const update = buildUpdate(input, {
          imageUrl: "image_url",
          title: "title",
          linkHref: "link_href",
          status: "status",
        });
        if (!update) return Promise.resolve(0);
        return execute(
          `update banners set ${update.sql} where id = $${update.values.length + 1}`,
          [...update.values, id]
        );
      }),

    deleteBanner: (id) =>
      mutate(() => execute("delete from banners where id = $1", [id])),

    // Swaps places with the adjacent banner rather than renumbering the list,
    // so concurrent reorders cannot collapse two slides onto one position.
    reorderBanner: (id, direction) =>
      mutate(async () => {
        const neighbour = await queryOne<{ id: string }>(
          `select b.id from banners b, banners current
           where current.id = $1
             and b.order_number ${direction === "up" ? "<" : ">"} current.order_number
           order by b.order_number ${direction === "up" ? "desc" : "asc"}
           limit 1`,
          [id]
        );
        if (!neighbour) {
          return;
        }
        await execute("select public.swap_banner_order($1::uuid, $2::uuid)", [
          id,
          neighbour.id,
        ]);
      }),

    // ------------------------------------------------- plans, tiers, copy
    getSubscriptionPlans: () =>
      query<SubscriptionPlanRow>(
        "select * from subscription_plans order by order_number, plan_slug"
      ),

    updateSubscriptionPlan: (planSlug, languageSlug, input) =>
      mutate(() => {
        const update = buildUpdate(
          {
            ...input,
            features: input.features ? JSON.stringify(input.features) : undefined,
            title: input.title ? JSON.stringify(input.title) : undefined,
            description: input.description
              ? JSON.stringify(input.description)
              : undefined,
          },
          {
            priceEur: "price_eur",
            discountPercent: "discount_percent",
            title: "title",
            description: "description",
            features: "features",
            isActive: "is_active",
            quarterlyEnabled: "quarterly_enabled",
            quarterlyDiscountPercent: "quarterly_discount_percent",
          }
        );
        if (!update) return Promise.resolve(0);
        return execute(
          `update subscription_plans set ${update.sql}, updated_at = now()
           where plan_slug = $${update.values.length + 1}
             and language_slug = $${update.values.length + 2}`,
          [...update.values, planSlug, languageSlug]
        );
      }),

    getSubscriptionTiers: () =>
      query<SubscriptionTier>(
        "select * from subscription_tiers order by tier_rank"
      ),

    updateSubscriptionTier: (planSlug, input) =>
      mutate(() => {
        const update = buildUpdate(input, {
          tierRank: "tier_rank",
          unlocksVocabulary: "unlocks_vocabulary",
          unlocksGrammar: "unlocks_grammar",
          unlocksVideo: "unlocks_video",
          unlocksLevelExam: "unlocks_level_exam",
          quizRetakeLimit: "quiz_retake_limit",
        });
        if (!update) return Promise.resolve(0);
        return execute(
          `update subscription_tiers set ${update.sql}, updated_at = now()
           where plan_slug = $${update.values.length + 1}`,
          [...update.values, planSlug]
        );
      }),

    async getSubscriptionPageContent() {
      const row = await queryOne<SubscriptionPageContentRow>(
        "select * from subscription_page_content where id = 'default'"
      );
      return row as SubscriptionPageContentRow;
    },

    updateSubscriptionPageContent: (input) =>
      mutate(() => {
        const update = buildUpdate(
          {
            heroTitle: input.heroTitle ? JSON.stringify(input.heroTitle) : undefined,
            heroSubtitle: input.heroSubtitle
              ? JSON.stringify(input.heroSubtitle)
              : undefined,
            footerNote: input.footerNote
              ? JSON.stringify(input.footerNote)
              : undefined,
          },
          {
            heroTitle: "hero_title",
            heroSubtitle: "hero_subtitle",
            footerNote: "footer_note",
          }
        );
        if (!update) return Promise.resolve(0);
        return execute(
          `update subscription_page_content set ${update.sql}, updated_at = now()
           where id = 'default'`,
          update.values
        );
      }),

    // ------------------------------------------------------------- billing
    async getPaymentSettings() {
      const row = await queryOne<PaymentSettings>(
        "select * from payment_settings where id = 'default'"
      );
      return row as PaymentSettings;
    },

    updatePaymentSettings: (input) =>
      mutate(() => {
        const update = buildUpdate(
          {
            ...input,
            freeCefrBands: input.freeCefrBands
              ? JSON.stringify(input.freeCefrBands)
              : undefined,
          },
          {
            irrEnabled: "irr_enabled",
            fxSource: "fx_source",
            fxMarginPercent: "fx_margin_percent",
            irrRounding: "irr_rounding",
            fxManualRate: "fx_manual_rate",
            fxMaxDeviationPercent: "fx_max_deviation_percent",
            stripeEnabled: "stripe_enabled",
            zarinpalEnabled: "zarinpal_enabled",
            manualEnabled: "manual_enabled",
            gracePeriodDays: "grace_period_days",
            enforceEntitlements: "enforce_entitlements",
            freeCefrBands: "free_cefr_bands",
            freeQuizRetakeLimit: "free_quiz_retake_limit",
            pendingPaymentTimeoutMinutes: "pending_payment_timeout_minutes",
          }
        );
        if (!update) return Promise.resolve(0);
        return execute(
          `update payment_settings set ${update.sql}, updated_at = now()
           where id = 'default'`,
          update.values
        );
      }),

    getLatestFxRate: () =>
      queryOne<FxRate>(
        "select * from fx_rates where accepted order by fetched_at desc limit 1"
      ),

    getFxRateHistory: (limit = 50) =>
      query<FxRate>(
        "select * from fx_rates order by fetched_at desc limit $1",
        [limit]
      ),

    recordFxRate: (input) =>
      mutate(() =>
        execute(
          `insert into fx_rates (rate, source, accepted, rejection_reason)
           values ($1, $2, $3, $4)`,
          [
            input.rate,
            input.source,
            input.accepted,
            input.rejectionReason ?? null,
          ]
        )
      ),

    // ------------------------------------------------------- subscriptions
    getSubscriptionsForUser: (userId) =>
      query<Subscription>(
        "select * from subscriptions where user_id = $1 order by created_at desc",
        [userId]
      ),

    // "Entitling" means live *now*: active, covering today, and for this
    // language. A cancel-at-period-end subscription still entitles until the
    // period actually ends, which is what the customer paid for.
    getEntitlingSubscription: (userId, languageSlug) =>
      queryOne<Subscription>(
        `select * from subscriptions
         where user_id = $1
           and language_slug = $2
           and status = 'active'
           and current_period_end >= now()
         order by current_period_end desc
         limit 1`,
        [userId, languageSlug]
      ),

    cancelSubscription: (subscriptionId) =>
      mutate(async () =>
        execute("select public.cancel_my_subscription($1, $2)", [
          await requireUserId(),
          subscriptionId,
        ])
      ),

    // ------------------------------------------------------------ payments
    async createPendingPayment(input) {
      try {
        const row = await queryOne<{ id: string }>(
          "select public.create_pending_payment($1, $2, $3, $4, $5, $6) as id",
          [
            await requireUserId(),
            input.planSlug,
            input.languageSlug,
            input.provider,
            input.currency,
            input.periodMonths ?? 1,
          ]
        );
        return { paymentId: row?.id };
      } catch (error) {
        return failure(error);
      }
    },

    getPaymentById: (paymentId) =>
      queryOne<Payment>("select * from payments where id = $1", [paymentId]),

    getPaymentsForUser: (userId) =>
      query<Payment>(
        "select * from payments where user_id = $1 order by created_at desc",
        [userId]
      ),

    async getMyPendingPayments() {
      return query<Payment>(
        "select * from public.list_my_pending_payments($1)",
        [await requireUserId()]
      );
    },

    // Best-effort by contract: the customer is mid-handoff to the gateway and
    // must not be interrupted by a bookkeeping failure.
    async attachCheckoutReference(paymentId, reference) {
      try {
        await execute("select public.attach_checkout_reference($1, $2, $3)", [
          await requireUserId(),
          paymentId,
          reference,
        ]);
        return {};
      } catch (error) {
        return failure(error);
      }
    },

    getSubscriptionEvents: (subscriptionId) =>
      query<SubscriptionEvent>(
        `select * from subscription_events
         where subscription_id = $1 order by created_at desc`,
        [subscriptionId]
      ),

    getAccountingSnapshot,

    // A payment taken outside any gateway still has to travel the same road as
    // a card payment: priced by `create_pending_payment` from the plan (never
    // from a number an admin typed) and then settled, which is what actually
    // starts the subscription. Both in one transaction so a crash between them
    // cannot leave a pending row nobody will ever settle.
    recordManualPayment: (input) =>
      mutate(async () => {
        const { getPool } = await import("@/lib/data/postgres/client");
        const client = await getPool().connect();
        try {
          await client.query("begin");
          const created = await client.query<{ id: string }>(
            "select public.create_pending_payment($1, $2, $3, 'manual', $4, 1) as id",
            [input.userId, input.planSlug, input.languageSlug, input.currency]
          );
          await client.query(
            "select public.settle_payment($1, null, $2)",
            [created.rows[0].id, input.reference ?? null]
          );
          await client.query("commit");
        } catch (error) {
          await client.query("rollback");
          throw error;
        } finally {
          client.release();
        }
      }),

    // The payment row is flagged but never edited to remove the money — the
    // refund is its own ledger entry, so a partial refund stays visible as
    // both the original sale and the amount handed back. Both writes go in one
    // transaction: a refund recorded without flagging the payment would keep
    // counting as revenue.
    refundPayment: (input) =>
      mutate(async () => {
        const issuedBy = await requireUserId();
        return withTransaction(async (run) => {
          await run(
            `insert into refunds (payment_id, amount_eur_cents, reason, created_by)
             values ($1, $2, $3, $4)`,
            [
              input.paymentId,
              input.amountEurCents,
              input.reason ?? null,
              issuedBy,
            ]
          );
          await run(
            "update payments set status = 'refunded', updated_at = now() where id = $1",
            [input.paymentId]
          );
        });
      }),
  };

  return repository;
}
