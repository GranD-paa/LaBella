# Graph Report - cursor P  (2026-09-02)

## Corpus Check
- 420 files · ~215,667 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2082 nodes · 6158 edges · 150 communities (97 shown, 53 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `288eeca9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- resolveMessage
- level-category-grid.tsx
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- user-management-panel.tsx
- Lesson
- cn
- admin.ts
- types/index.ts
- local/repository.ts
- isLocalDataMode
- actions/quiz.ts
- seed.ts
- pricing.ts
- 001_app_schema.sql
- quiz-management/types.ts
- server-locale.ts
- providers/index.ts
- entitlements/index.ts
- billing-settings-form.tsx
- content-form-panels.tsx
- useTranslations
- schema.sql
- compilerOptions
- banner-list.tsx
- devDependencies
- dependencies
- revalidateAppContent
- curriculum-level-manager.tsx
- components.json
- QuizQuestion
- user-row-actions.tsx
- quizzes.ts
- middleware.ts
- action-guards.ts
- [language]/page.tsx
- index.test.ts
- page-skeletons.tsx
- createPageMetadata
- curriculum/languages.ts
- postgres/repository.ts
- HeroScene
- locale-provider.tsx
- roles.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- [provider]/route.ts
- subscription-view.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- dashboard-data.ts
- final-deployment/manifest.json
- checkout.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- stripe/route.ts
- video-lessons-grid.tsx
- sync-local-content.mjs
- refresh.ts
- blog-post-editor.tsx
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
- plans.ts
- @hookform/resolvers
- pg
- @radix-ui/react-alert-dialog
- @radix-ui/react-avatar
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- sonner
- What You Must Do When Invoked
- @supabase/supabase-js
- curriculum/types.ts
- getServerTranslator
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
- entitlements/schema.test.ts
- period.ts
- getDataRepository
- graphify reference: query, path, explain
- 004_landing_and_blog.sql
- BannerCarousel
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
- lucide-react
- next-themes
- next
- @radix-ui/react-select
- @radix-ui/react-separator
- QuizManagementTable
- Payment
- app/page.tsx
- visibility.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 175 edges
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
- `AboutPage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/about/page.tsx → lib/data/index.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts

## Import Cycles
- None detected.

## Communities (150 total, 53 thin omitted)

### Community 0 - "resolveMessage"
Cohesion: 0.14
Nodes (43): ACCEPTED_TYPES, LessonPicker(), emptyQuestion, emptyQuestion, OPTION_KEYS, QuizQuestionFields(), OPTION_KEYS, SingleQuizQuestionForm() (+35 more)

### Community 1 - "level-category-grid.tsx"
Cohesion: 0.14
Nodes (21): CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnLevelView(), LearnLevelViewProps, LevelCategoryGrid(), LevelCategoryGridProps (+13 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (5): BlogPost, DataRepository, GrammarRule, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (11): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+3 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.06
Nodes (42): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+34 more)

### Community 6 - "user-management-panel.tsx"
Cohesion: 0.19
Nodes (19): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LessonsTable(), pluralize(), QuizzesTable(), StatusBadge(), getInitials() (+11 more)

### Community 7 - "Lesson"
Cohesion: 0.14
Nodes (17): QuizManager(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+9 more)

### Community 8 - "cn"
Cohesion: 0.12
Nodes (29): EntitlementSettingsPanel(), onSubmit(), ConfirmActionDialog(), handleConfirm(), StatCard(), LanguageSwitcher(), QuizCard(), AlertDialogAction (+21 more)

### Community 9 - "admin.ts"
Cohesion: 0.08
Nodes (26): createContentGrammar(), createContentVideo(), createContentVocabulary(), bannerSchema, BannerValues, BillingSettingsValues, contentGrammarSchema, contentVocabularySchema (+18 more)

### Community 10 - "types/index.ts"
Cohesion: 0.14
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 11 - "local/repository.ts"
Cohesion: 0.18
Nodes (15): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+7 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.19
Nodes (16): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), DataSource (+8 more)

### Community 13 - "actions/quiz.ts"
Cohesion: 0.06
Nodes (40): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), submitQuizAction(), generateMetadata(), PageProps, QuizPage(), UserQuizAttemptsPanel(), buildInitialFeedback() (+32 more)

### Community 14 - "seed.ts"
Cohesion: 0.10
Nodes (23): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+15 more)

### Community 15 - "pricing.ts"
Cohesion: 0.12
Nodes (28): RevenueChart(), SubscriptionPlanCards(), pricingFor(), rialFor(), formatMonthLabel(), formatPaidAmount(), formatRialAsToman(), LOCALE_TAGS (+20 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "quiz-management/types.ts"
Cohesion: 0.14
Nodes (21): EnrichedQuiz, deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults() (+13 more)

### Community 18 - "server-locale.ts"
Cohesion: 0.10
Nodes (31): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie() (+23 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.16
Nodes (16): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+8 more)

### Community 20 - "entitlements/index.ts"
Cohesion: 0.16
Nodes (11): LanguageCoursePage(), BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED, cefrBandOf(), Entitlement (+3 more)

### Community 21 - "billing-settings-form.tsx"
Cohesion: 0.15
Nodes (15): RoleBadge(), ManagedUser, PERMISSION_ROWS, UserProfileDialog(), SelectContent, SelectItem, SelectLabel, SelectScrollDownButton (+7 more)

### Community 22 - "content-form-panels.tsx"
Cohesion: 0.06
Nodes (44): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel() (+36 more)

### Community 23 - "useTranslations"
Cohesion: 0.04
Nodes (54): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger() (+46 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "banner-list.tsx"
Cohesion: 0.33
Nodes (8): deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), setLandingLanguageVisibilityAction(), BannerList(), runAction(), ActionResult, isLandingLanguageSlug()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, clsx, marked, dependencies, better-auth, clsx, marked, @radix-ui/react-dropdown-menu (+17 more)

### Community 29 - "revalidateAppContent"
Cohesion: 0.17
Nodes (23): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), uploadBannerAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), renameCurriculumLevelAction() (+15 more)

### Community 30 - "curriculum-level-manager.tsx"
Cohesion: 0.16
Nodes (19): addCurriculumLevelAction(), isCefrBand(), AdminLanguagesPage(), AddCurriculumLevelDialog(), onSubmit(), AdminLanguagesPageView(), CurriculumLevelManager(), getLanguageToggles() (+11 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "QuizQuestion"
Cohesion: 0.16
Nodes (5): buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats(), QuizQuestion

### Community 33 - "user-row-actions.tsx"
Cohesion: 0.24
Nodes (8): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), PendingActionType, UserRowActions()

### Community 34 - "quizzes.ts"
Cohesion: 0.15
Nodes (22): addQuizQuestion(), createQuizWithQuestions(), createStructuredQuiz(), deleteQuizQuestion(), getQuestionLessonId(), getQuizLessonId(), revalidateQuizPaths(), updateQuizQuestion() (+14 more)

### Community 35 - "middleware.ts"
Cohesion: 0.23
Nodes (10): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), isPostgresDataMode(), PUBLIC_ROUTES, IMPORTANT: You *must* return the supabaseResponse object as it is., IMPORTANT: Avoid writing any logic between createServerClient and, updateSession() (+2 more)

### Community 36 - "action-guards.ts"
Cohesion: 0.27
Nodes (7): cancelSubscriptionAction(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser, getProfileById

### Community 37 - "[language]/page.tsx"
Cohesion: 0.33
Nodes (8): PageProps, BandExamCard, ComingSoonLanguage(), CourseLevelAccordion(), LearnLanguageView(), getLocalizedLevel(), CURRICULUM_MESSAGE_KEYS, UserQuizAttempt

### Community 38 - "index.test.ts"
Cohesion: 0.20
Nodes (3): TIERS, Subscription, SubscriptionTier

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.14
Nodes (6): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton(), Skeleton()

### Community 40 - "createPageMetadata"
Cohesion: 0.10
Nodes (27): AboutPage(), generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata (+19 more)

### Community 41 - "curriculum/languages.ts"
Cohesion: 0.15
Nodes (15): CategoryPage(), PageProps, LearnCategoryView(), ENGLISH_LEVELS, GERMAN_LEVELS, getLanguage(), getLevel(), isCategorySlug() (+7 more)

### Community 42 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 43 - "HeroScene"
Cohesion: 0.36
Nodes (8): compile(), HeroScene(), draw(), resize(), tick(), perspective(), readColor(), translation()

### Community 44 - "locale-provider.tsx"
Cohesion: 0.16
Nodes (27): BannerManagementPanel(), LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES, discountedPrice(), SubscriptionPlanList(), Draft, ToggleRow() (+19 more)

### Community 45 - "roles.ts"
Cohesion: 0.36
Nodes (6): ADMIN_ROLE_SLUGS, isRoleSlug(), RoleDefinition, roleImpliesAdmin(), RolePermissions, USER_STATUSES

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "[provider]/route.ts"
Cohesion: 0.21
Nodes (15): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), DevModeBanner(), failLocalPayment() (+7 more)

### Community 49 - "subscription-view.tsx"
Cohesion: 0.13
Nodes (18): Arrow(), Check(), Cross(), Eyebrow(), LESSON_ICONS, SectionHead(), LandingHero(), LandingTicker() (+10 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.08
Nodes (12): BlogPostInput, CurriculumLevelOverrideRow, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, Json, Banner (+4 more)

### Community 52 - "dashboard-data.ts"
Cohesion: 0.12
Nodes (19): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), QuizSubmittedBanner() (+11 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "checkout.ts"
Cohesion: 0.18
Nodes (12): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), getAvailableProviders(), getPaymentProvider(), ReconcileDeps, ReconcileOutcome (+4 more)

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "stripe/route.ts"
Cohesion: 0.33
Nodes (4): dynamic, POST(), BODY, verifyStripeWebhook()

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "refresh.ts"
Cohesion: 0.15
Nodes (12): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+4 more)

### Community 62 - "blog-post-editor.tsx"
Cohesion: 0.07
Nodes (33): BlogFormState, optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata, dynamic (+25 more)

### Community 63 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

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

### Community 79 - "plans.ts"
Cohesion: 0.29
Nodes (6): daysRemaining(), MySubscriptionsCard(), getSubscriptionPlanMeta(), SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "curriculum/types.ts"
Cohesion: 0.19
Nodes (14): FlagIcon(), FLAGS, US_STARS, LanguageCard(), SubscriptionLanguageTabs(), CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus (+6 more)

### Community 94 - "getServerTranslator"
Cohesion: 0.13
Nodes (21): DashboardPage(), generateMetadata(), generateMetadata(), generateMetadata(), LevelPage(), PageProps, generateMetadata(), generateMetadata() (+13 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 125 - "period.ts"
Cohesion: 0.24
Nodes (11): SubscriptionsTable(), addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES (+3 more)

### Community 126 - "getDataRepository"
Cohesion: 0.16
Nodes (21): deleteBlogPostAction(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), deleteQuiz() (+13 more)

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

### Community 146 - "QuizManagementTable"
Cohesion: 0.29
Nodes (4): QuizManagementTable(), renderStats(), toggleStatus(), getQuizAttemptStats()

### Community 148 - "app/page.tsx"
Cohesion: 0.09
Nodes (32): generateMetadata(), Home(), LandingDay(), LandingFaq(), LandingFinal(), LandingFooter(), LogoSlot(), LandingHeader() (+24 more)

### Community 152 - "visibility.ts"
Cohesion: 0.18
Nodes (11): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), LANDING_LANGUAGES, LandingLanguageDefinition, LandingLanguageSlug, LandmarkId (+3 more)

## Knowledge Gaps
- **458 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+453 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `resolveMessage`, `level-category-grid.tsx`, `BannerCarousel`, `app-shell.tsx`, `actions/auth.ts`, `user-management-panel.tsx`, `Lesson`, `cn`, `actions/quiz.ts`, `pricing.ts`, `QuizManagementTable`, `billing-settings-form.tsx`, `content-form-panels.tsx`, `banner-list.tsx`, `curriculum-level-manager.tsx`, `user-row-actions.tsx`, `quizzes.ts`, `[language]/page.tsx`, `createPageMetadata`, `curriculum/languages.ts`, `locale-provider.tsx`, `subscription-view.tsx`, `dashboard-data.ts`, `video-lessons-grid.tsx`, `AdminDashboard`, `BannerUploadForm`, `plans.ts`, `curriculum/types.ts`, `getServerTranslator`, `period.ts`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `app-shell.tsx`, `actions/auth.ts`, `admin.ts`, `local/repository.ts`, `isLocalDataMode`, `actions/quiz.ts`, `entitlements/index.ts`, `app/page.tsx`, `visibility.ts`, `banner-list.tsx`, `revalidateAppContent`, `curriculum-level-manager.tsx`, `user-row-actions.tsx`, `quizzes.ts`, `action-guards.ts`, `[language]/page.tsx`, `createPageMetadata`, `curriculum/languages.ts`, `postgres/repository.ts`, `[provider]/route.ts`, `checkout.ts`, `blog-post-editor.tsx`, `getServerTranslator`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `resolveMessage`, `level-category-grid.tsx`, `BannerCarousel`, `app-shell.tsx`, `user-management-panel.tsx`, `actions/quiz.ts`, `pricing.ts`, `server-locale.ts`, `QuizManagementTable`, `app/page.tsx`, `billing-settings-form.tsx`, `useTranslations`, `curriculum-level-manager.tsx`, `[language]/page.tsx`, `page-skeletons.tsx`, `locale-provider.tsx`, `subscription-view.tsx`, `dashboard-data.ts`, `blog-post-editor.tsx`, `BannerUploadForm`, `plans.ts`, `curriculum/types.ts`, `period.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _458 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `resolveMessage` be split into smaller, more focused modules?**
  _Cohesion score 0.14244306418219463 - nodes in this community are weakly interconnected._
- **Should `level-category-grid.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04285714285714286 - nodes in this community are weakly interconnected._