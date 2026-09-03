# Graph Report - cursor P  (2026-09-03)

## Corpus Check
- 421 files · ~315,194 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2102 nodes · 6224 edges · 148 communities (95 shown, 53 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c36826b4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- revalidateAppContent
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- user-management-panel.tsx
- Lesson
- cn
- admin.ts
- types/index.ts
- database.types.ts
- isLocalDataMode
- [quiz_id]/page.tsx
- getServerTranslator
- local/repository.ts
- 001_app_schema.sql
- hero.tsx
- app/layout.tsx
- providers/index.ts
- [language]/page.tsx
- about/page.tsx
- landing.ts
- utils.ts
- schema.sql
- compilerOptions
- user-row-actions.tsx
- devDependencies
- dependencies
- curriculum-level-manager.tsx
- server-locale.ts
- components.json
- dashboard-data.ts
- data/repository.ts
- [provider]/route.ts
- data-source.ts
- requireAdminPermission
- locale-provider.tsx
- resolve-navigation.ts
- page-skeletons.tsx
- data/index.ts
- level-category-grid.tsx
- blog-post-editor.tsx
- refresh.ts
- card.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- reconcile.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- seed.ts
- my-subscriptions-card.tsx
- final-deployment/manifest.json
- useTranslations
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-embed.ts
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- [slug]/page.tsx
- AdminDashboard
- billing/schema.test.ts
- vercel.json
- BannerUploadForm
- final-deployment/vercel.json
- 20260718130000_user_roles.sql
- extends
- public.user_learning_state
- public.swap_banner_order
- locale-parity.test.ts
- next.config.mjs
- postcss.config.mjs
- service-worker.js
- public.video_lessons
- public.custom_access_token_hook
- 20260801090000_subscription_management.sql
- sections.tsx
- @hookform/resolvers
- pg
- @radix-ui/react-alert-dialog
- lesson-manager.tsx
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- What You Must Do When Invoked
- 005_send_limits.sql
- curriculum/types.ts
- zod
- 20260730120000_banners.sql
- tailwind.config.ts
- "account"
- public.user_quiz_attempts
- "user"
- public.grammar_rules
- public.quiz_questions
- public.video_lessons
- public.vocabulary
- "session"
- public.quizzes
- public.profiles
- public.subscription_plans
- public.payment_settings
- public.subscription_plans
- public.user_quiz_attempts
- "verification"
- graphify reference: extra exports and benchmark
- getDataRepository
- graphify reference: query, path, explain
- 004_landing_and_blog.sql
- clsx
- Local development without Supabase
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- class-variance-authority
- CLAUDE.md
- .claude/CLAUDE.md
- extraction-spec.md
- gsap
- marked
- next-themes
- next
- nodemailer
- @radix-ui/react-label
- quiz-management-table.tsx
- react-hook-form
- @supabase/ssr
- tailwind-merge
- @types/nodemailer
- subscription-view.tsx

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 172 edges
3. `getDataRepository()` - 140 edges
4. `DataRepository` - 104 edges
5. `Button` - 63 edges
6. `resolveMessage()` - 60 edges
7. `revalidateAppContent()` - 53 edges
8. `Badge()` - 42 edges
9. `getServerTranslator()` - 37 edges
10. `Lesson` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/sign-up/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/about/page.tsx → lib/i18n/metadata.ts
- `AboutPage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/about/page.tsx → lib/data/index.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (148 total, 53 thin omitted)

### Community 0 - "revalidateAppContent"
Cohesion: 0.22
Nodes (19): submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction() (+11 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): BlogPost, DataRepository, getLandingPricing(), LocalizedText, Payment, VideoLesson

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (21): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+13 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.05
Nodes (53): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+45 more)

### Community 6 - "user-management-panel.tsx"
Cohesion: 0.15
Nodes (19): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel() (+11 more)

### Community 7 - "Lesson"
Cohesion: 0.15
Nodes (15): QuizManager(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+7 more)

### Community 8 - "cn"
Cohesion: 0.15
Nodes (23): AdminSubscriptionPageView(), EntitlementSettingsPanel(), onSubmit(), ConfirmActionDialog(), handleConfirm(), AlertDialogAction, AlertDialogCancel, AlertDialogContent (+15 more)

### Community 9 - "admin.ts"
Cohesion: 0.07
Nodes (30): createContentGrammar(), createContentVideo(), createContentVocabulary(), BannerValues, billingSettingsSchema, BillingSettingsValues, contentGrammarSchema, contentVocabularySchema (+22 more)

### Community 10 - "types/index.ts"
Cohesion: 0.15
Nodes (19): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+11 more)

### Community 11 - "database.types.ts"
Cohesion: 0.17
Nodes (7): dynamic, POST(), BODY, verifyStripeWebhook(), createClient(), Database, Json

### Community 12 - "isLocalDataMode"
Cohesion: 0.26
Nodes (13): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), FxRateStore (+5 more)

### Community 13 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (36): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+28 more)

### Community 14 - "getServerTranslator"
Cohesion: 0.20
Nodes (16): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), getLanguageWithAvailability() (+8 more)

### Community 15 - "local/repository.ts"
Cohesion: 0.06
Nodes (48): SubscriptionPlanCards(), pricingFor(), rialFor(), PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE (+40 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.18
Nodes (9): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+1 more)

### Community 18 - "app/layout.tsx"
Cohesion: 0.14
Nodes (14): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider() (+6 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.17
Nodes (15): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+7 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.12
Nodes (15): LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED, cefrBandOf() (+7 more)

### Community 21 - "about/page.tsx"
Cohesion: 0.33
Nodes (5): AboutPage(), generateMetadata(), AboutView(), TIMELINE_KEYS, VALUE_ICONS

### Community 22 - "landing.ts"
Cohesion: 0.50
Nodes (4): setLandingLanguageVisibilityAction(), LandingLanguagePanel(), toggle(), isLandingLanguageSlug()

### Community 23 - "utils.ts"
Cohesion: 0.11
Nodes (21): ContentFormPanel(), CONTENT_TYPES, PlanActiveToggle(), toggle(), discountedPrice(), SubscriptionPlanList(), BandExamCard, BandExamsSection() (+13 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "user-row-actions.tsx"
Cohesion: 0.24
Nodes (8): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), PendingActionType, UserRowActions()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, lucide-react, dependencies, better-auth, lucide-react, @radix-ui/react-avatar, @radix-ui/react-dropdown-menu, @radix-ui/react-select (+17 more)

### Community 29 - "curriculum-level-manager.tsx"
Cohesion: 0.13
Nodes (28): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), AdminLanguagesPage(), AddCurriculumLevelDialog() (+20 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.19
Nodes (18): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, messages, createTranslator() (+10 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "dashboard-data.ts"
Cohesion: 0.17
Nodes (9): DashboardPage(), getLanguagesWithAvailability(), buildLearnerEngagementMetrics(), AdminDashboardData, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats() (+1 more)

### Community 33 - "data/repository.ts"
Cohesion: 0.11
Nodes (10): BlogPostInput, AuthUser, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, Banner, Profile (+2 more)

### Community 34 - "[provider]/route.ts"
Cohesion: 0.18
Nodes (17): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), DevModeBanner(), getPaymentProvider() (+9 more)

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (16): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+8 more)

### Community 36 - "requireAdminPermission"
Cohesion: 0.17
Nodes (16): createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), createVocabulary(), deleteVocabulary() (+8 more)

### Community 37 - "locale-provider.tsx"
Cohesion: 0.06
Nodes (110): ACCEPTED_TYPES, emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel(), submit() (+102 more)

### Community 38 - "resolve-navigation.ts"
Cohesion: 0.31
Nodes (8): generateMetadata(), LessonPage(), PageProps, LessonView(), findLevelByOrderNumber(), findLevelInLanguages(), resolveLessonNavigation(), resolveLevelContext()

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "data/index.ts"
Cohesion: 0.08
Nodes (34): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata (+26 more)

### Community 41 - "level-category-grid.tsx"
Cohesion: 0.12
Nodes (24): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), CourseLevelAccordion(), LearnLevelView(), LearnLevelViewProps (+16 more)

### Community 42 - "blog-post-editor.tsx"
Cohesion: 0.36
Nodes (5): saveBlogPostAction(), BlogPostEditor(), BlogCategory, BlogPostStatus, slugifyTitle()

### Community 43 - "refresh.ts"
Cohesion: 0.20
Nodes (9): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+1 more)

### Community 44 - "card.tsx"
Cohesion: 0.18
Nodes (26): DeleteConfirmDialog(), handleConfirm(), LANDMARK_LABELS, LANGUAGE_LABELS, pluralize(), QuizzesTable(), PERMISSION_ROWS, LANGUAGE_LABEL_KEYS (+18 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.13
Nodes (23): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, deriveQuizMetadataFromLesson(), enrichQuiz(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel() (+15 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "reconcile.ts"
Cohesion: 0.28
Nodes (5): ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 49 - "blog.ts"
Cohesion: 0.33
Nodes (5): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "seed.ts"
Cohesion: 0.11
Nodes (21): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+13 more)

### Community 52 - "my-subscriptions-card.tsx"
Cohesion: 0.14
Nodes (15): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining(), MySubscriptionEntry (+7 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "useTranslations"
Cohesion: 0.09
Nodes (24): AdminContentHeader(), ContentActionBar(), GrammarManager(), GrammarTable(), LanguageManagementPanel(), VocabularyManager(), VocabularyTable(), COUNT_MESSAGE_KEYS (+16 more)

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "app/page.tsx"
Cohesion: 0.14
Nodes (17): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, DECKS, en (+9 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.33
Nodes (8): VideoCard(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.14
Nodes (22): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger() (+14 more)

### Community 62 - "[slug]/page.tsx"
Cohesion: 0.09
Nodes (27): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+19 more)

### Community 63 - "AdminDashboard"
Cohesion: 0.38
Nodes (7): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName()

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 67 - "final-deployment/vercel.json"
Cohesion: 0.40
Nodes (4): buildCommand, framework, headers, installCommand

### Community 69 - "extends"
Cohesion: 0.50
Nodes (3): extends, next/core-web-vitals, next/typescript

### Community 70 - "public.user_learning_state"
Cohesion: 0.50
Nodes (3): public.user_learning_state, public.lessons, public.profiles

### Community 79 - "sections.tsx"
Cohesion: 0.10
Nodes (35): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+27 more)

### Community 84 - "lesson-manager.tsx"
Cohesion: 0.40
Nodes (3): LessonForm(), onSubmit(), LessonsTable()

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 94 - "curriculum/types.ts"
Cohesion: 0.13
Nodes (18): SubscriptionLanguageTabs(), CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS (+10 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 126 - "getDataRepository"
Cohesion: 0.22
Nodes (18): addQuizQuestion(), createQuizWithQuestions(), createStructuredQuiz(), deleteQuiz(), deleteQuizQuestion(), getQuestionLessonId(), getQuizLessonId(), revalidateQuizPaths() (+10 more)

### Community 127 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 128 - "004_landing_and_blog.sql"
Cohesion: 0.47
Nodes (5): public.blog_categories, public.blog_post_categories, public.blog_posts, public.landing_language_settings, public.profiles

### Community 130 - "Local development without Supabase"
Cohesion: 0.40
Nodes (4): Local development without Supabase, Production mode, Sample accounts, What changes

### Community 131 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 132 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 133 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 146 - "quiz-management-table.tsx"
Cohesion: 0.11
Nodes (13): AdminQuizzesPage(), generateMetadata(), AdminQuizzesPageView(), CreateContentSection(), QuizManagementTable(), renderStats(), toggleStatus(), QuizRowActions() (+5 more)

### Community 155 - "subscription-view.tsx"
Cohesion: 0.13
Nodes (19): cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), generateMetadata(), SubscriptionPage(), handlePay() (+11 more)

## Knowledge Gaps
- **470 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+465 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `revalidateAppContent`, `app-shell.tsx`, `actions/auth.ts`, `user-management-panel.tsx`, `Lesson`, `cn`, `[quiz_id]/page.tsx`, `local/repository.ts`, `quiz-management-table.tsx`, `about/page.tsx`, `utils.ts`, `user-row-actions.tsx`, `subscription-view.tsx`, `curriculum-level-manager.tsx`, `locale-provider.tsx`, `resolve-navigation.ts`, `data/index.ts`, `level-category-grid.tsx`, `card.tsx`, `my-subscriptions-card.tsx`, `video-embed.ts`, `admin-accounting-page-view.tsx`, `AdminDashboard`, `BannerUploadForm`, `sections.tsx`, `lesson-manager.tsx`, `curriculum/types.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `revalidateAppContent`, `postgres/repository.ts`, `app-shell.tsx`, `actions/auth.ts`, `admin.ts`, `isLocalDataMode`, `[quiz_id]/page.tsx`, `getServerTranslator`, `quiz-management-table.tsx`, `[language]/page.tsx`, `about/page.tsx`, `landing.ts`, `user-row-actions.tsx`, `subscription-view.tsx`, `curriculum-level-manager.tsx`, `dashboard-data.ts`, `[provider]/route.ts`, `data-source.ts`, `requireAdminPermission`, `resolve-navigation.ts`, `data/index.ts`, `blog-post-editor.tsx`, `blog.ts`, `app/page.tsx`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `user-management-panel.tsx`, `[quiz_id]/page.tsx`, `local/repository.ts`, `app/layout.tsx`, `quiz-management-table.tsx`, `utils.ts`, `subscription-view.tsx`, `curriculum-level-manager.tsx`, `locale-provider.tsx`, `level-category-grid.tsx`, `blog-post-editor.tsx`, `card.tsx`, `my-subscriptions-card.tsx`, `useTranslations`, `admin-accounting-page-view.tsx`, `[slug]/page.tsx`, `BannerUploadForm`, `sections.tsx`, `curriculum/types.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _470 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04220779220779221 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._
- **Should `app-shell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06636500754147813 - nodes in this community are weakly interconnected._