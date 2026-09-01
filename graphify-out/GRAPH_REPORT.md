# Graph Report - cursor P  (2026-09-01)

## Corpus Check
- 418 files · ~213,032 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2065 nodes · 6083 edges · 153 communities (100 shown, 53 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28846b0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- quiz-form.tsx
- utils.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- quiz-edit-dialog.tsx
- Quiz
- cn
- admin.ts
- billing/accounting.ts
- resolveMessage
- isLocalDataMode
- actions/quiz.ts
- seed.ts
- local/repository.ts
- 001_app_schema.sql
- quiz-management/types.ts
- server-locale.ts
- providers/index.ts
- [language]/page.tsx
- dashboard-data.ts
- content-form-panels.tsx
- useTranslations
- schema.sql
- compilerOptions
- revalidateAppContent
- devDependencies
- dependencies
- curriculum-levels.ts
- TierCapabilitiesPanel
- components.json
- add-curriculum-level-dialog.tsx
- admin-accounting-page-view.tsx
- QuizEditDialog
- middleware.ts
- action-guards.ts
- language-switcher.tsx
- edit-curriculum-level-dialog.tsx
- page-skeletons.tsx
- getServerTranslator
- [category]/page.tsx
- postgres/repository.ts
- supabase/repository.ts
- button.tsx
- types/index.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- getLocalStore
- landing/content.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- rss.xml/route.ts
- final-deployment/manifest.json
- checkout.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- about/page.tsx
- video-embed.ts
- sync-local-content.mjs
- PaymentSettings
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
- validations/quiz.ts
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
- curriculum/languages.ts
- availability.ts
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
- grammar-edit-dialog.tsx
- period.ts
- getDataRepository
- graphify reference: query, path, explain
- 004_landing_and_blog.sql
- HeroScene
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
- blog-post-editor.tsx
- app/page.tsx
- entitlements/schema.test.ts
- blog.ts
- VideoLesson
- data/index.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 174 edges
3. `getDataRepository()` - 140 edges
4. `DataRepository` - 103 edges
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
  app/about/page.tsx → lib/i18n/metadata.ts
- `AboutPage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/about/page.tsx → lib/data/index.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts

## Import Cycles
- None detected.

## Communities (153 total, 53 thin omitted)

### Community 0 - "quiz-form.tsx"
Cohesion: 0.12
Nodes (31): emptyQuestion, OPTION_KEYS, QuizQuestionFields(), OPTION_KEYS, SignInForm(), onSubmit(), SignUpForm(), onSubmit() (+23 more)

### Community 1 - "utils.ts"
Cohesion: 0.08
Nodes (46): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, BandExamsSection(), CategoryWatermark(), ComingSoonLanguage() (+38 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (5): BlogPost, DataRepository, GrammarRule, QuizQuestion, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.08
Nodes (32): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+24 more)

### Community 6 - "quiz-edit-dialog.tsx"
Cohesion: 0.27
Nodes (16): DeleteConfirmDialog(), handleConfirm(), emptyQuestion, pluralize(), QuizzesTable(), getInitials(), UserManagementPanel(), getScoreBadgeClass() (+8 more)

### Community 7 - "Quiz"
Cohesion: 0.14
Nodes (18): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+10 more)

### Community 8 - "cn"
Cohesion: 0.07
Nodes (41): signOutAction(), CreateContentSection(), AdminSubscriptionPageView(), ConfirmActionDialog(), RoleBadge(), StatusBadge(), ManagedUser, PERMISSION_ROWS (+33 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (32): createContentGrammar(), createContentVideo(), createContentVocabulary(), bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, contentGrammarSchema (+24 more)

### Community 10 - "billing/accounting.ts"
Cohesion: 0.16
Nodes (15): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+7 more)

### Community 11 - "resolveMessage"
Cohesion: 0.11
Nodes (17): runAction(), EditCurriculumLevelDialog(), onSubmit(), LessonEditDialog(), onSubmit(), QuizFormDialog(), onSubmit(), onSubmit() (+9 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.14
Nodes (25): buildRecoveryDeps(), dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET() (+17 more)

### Community 13 - "actions/quiz.ts"
Cohesion: 0.11
Nodes (24): submitQuizAction(), generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit() (+16 more)

### Community 14 - "seed.ts"
Cohesion: 0.12
Nodes (19): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+11 more)

### Community 15 - "local/repository.ts"
Cohesion: 0.15
Nodes (20): SubscriptionPlanCards(), pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp() (+12 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "quiz-management/types.ts"
Cohesion: 0.11
Nodes (25): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, LevelSlug, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson() (+17 more)

### Community 18 - "server-locale.ts"
Cohesion: 0.10
Nodes (32): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider() (+24 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.11
Nodes (20): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+12 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.12
Nodes (16): generateMetadata(), LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED (+8 more)

### Community 21 - "dashboard-data.ts"
Cohesion: 0.18
Nodes (9): AdminPage(), DashboardPage(), generateMetadata(), buildLearnerEngagementMetrics(), AdminDashboardData, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData() (+1 more)

### Community 22 - "content-form-panels.tsx"
Cohesion: 0.10
Nodes (30): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel() (+22 more)

### Community 23 - "useTranslations"
Cohesion: 0.07
Nodes (38): AdminContentHeader(), AdminBannersPageView(), GrammarTable(), AdminLanguagesPageView(), LessonsTable(), AdminQuizzesPageView(), SingleQuizQuestionForm(), PlanActiveToggle() (+30 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "revalidateAppContent"
Cohesion: 0.23
Nodes (18): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+10 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, clsx, marked, dependencies, better-auth, clsx, marked, @radix-ui/react-dropdown-menu (+17 more)

### Community 29 - "curriculum-levels.ts"
Cohesion: 0.17
Nodes (19): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), AddCurriculumLevelDialog(), onSubmit() (+11 more)

### Community 30 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "add-curriculum-level-dialog.tsx"
Cohesion: 0.22
Nodes (11): OPTION_KEYS, WizardQuestionFields(), SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator (+3 more)

### Community 33 - "admin-accounting-page-view.tsx"
Cohesion: 0.11
Nodes (27): AccountingKpis(), Tile(), BreakdownList(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger(), handleExport() (+19 more)

### Community 34 - "QuizEditDialog"
Cohesion: 0.31
Nodes (9): pluralize(), QuizEditDialog(), handleAddQuestion(), handleEditQuestion(), handleTitleSave(), refreshAfterMutation(), startEditingQuestion(), toQuestionValues() (+1 more)

### Community 35 - "middleware.ts"
Cohesion: 0.14
Nodes (19): PUBLIC_ROUTES, updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession() (+11 more)

### Community 36 - "action-guards.ts"
Cohesion: 0.14
Nodes (16): cancelSubscriptionAction(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser, getProfileById, ADMIN_ROLE_SLUGS (+8 more)

### Community 37 - "language-switcher.tsx"
Cohesion: 0.21
Nodes (7): AdminHeaderBadge(), AppHeader(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark(), LanguageSwitcher()

### Community 38 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.33
Nodes (10): LOCALES, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay (+2 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "getServerTranslator"
Cohesion: 0.14
Nodes (18): AdminAccountingPage(), generateMetadata(), AdminSubscriptionPage(), generateMetadata(), generateMetadata(), ContactPage(), generateMetadata(), generateMetadata() (+10 more)

### Community 41 - "[category]/page.tsx"
Cohesion: 0.24
Nodes (13): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, getLanguageWithAvailability(), getLanguage() (+5 more)

### Community 42 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 43 - "supabase/repository.ts"
Cohesion: 0.20
Nodes (5): createSupabaseRepository(), createClient(), Database, Json, Payment

### Community 44 - "button.tsx"
Cohesion: 0.13
Nodes (32): BannerManagementPanel(), ACCEPTED_TYPES, LANDMARK_LABELS, LANGUAGE_LABELS, LanguageManagementPanel(), CONTENT_TYPES, QuizRowActions(), EntitlementSettingsPanel() (+24 more)

### Community 45 - "types/index.ts"
Cohesion: 0.13
Nodes (12): GrammarManager(), LessonForm(), onSubmit(), QuizManager(), VocabularyForm(), onSubmit(), VocabularyManager(), VocabularyTable() (+4 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "getLocalStore"
Cohesion: 0.28
Nodes (8): DevModeBanner(), createLocalRepository(), commitStore(), cloneSeed(), getFileMtimeMs(), getLocalStore(), persistLocalStore(), resetLocalStore()

### Community 49 - "landing/content.ts"
Cohesion: 0.15
Nodes (12): en, fa, LANDING_COPY, LANDING_LANGUAGE_COPY, LandingCopy, LandingLanguageCopy, LANDING_LANGUAGES, LandingLanguageDefinition (+4 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.11
Nodes (10): BlogPostInput, AuthUser, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, Banner, Profile (+2 more)

### Community 52 - "rss.xml/route.ts"
Cohesion: 0.17
Nodes (13): dynamic, GET(), xmlEscape(), generateMetadata(), Home(), getServerLocale(), getLandingCopy(), getLandingLanguageCopy() (+5 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "checkout.ts"
Cohesion: 0.16
Nodes (14): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), getAvailableProviders(), getPaymentProvider(), ReconcileDeps (+6 more)

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "about/page.tsx"
Cohesion: 0.33
Nodes (5): AboutPage(), generateMetadata(), AboutView(), TIMELINE_KEYS, VALUE_ICONS

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "PaymentSettings"
Cohesion: 0.13
Nodes (13): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+5 more)

### Community 62 - "[slug]/page.tsx"
Cohesion: 0.15
Nodes (15): BlogIndexPage(), metadata, BlogPostPage(), generateMetadata(), Props, robots(), dynamic, revalidate (+7 more)

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

### Community 79 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "curriculum/languages.ts"
Cohesion: 0.14
Nodes (11): ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES, CATEGORY_DEFINITIONS, LANGUAGES, TURKISH_LEVELS (+3 more)

### Community 94 - "availability.ts"
Cohesion: 0.24
Nodes (9): AdminLanguagesPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), generateMetadata(), LessonPage(), PageProps, getLanguagesWithAvailability() (+1 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "grammar-edit-dialog.tsx"
Cohesion: 0.27
Nodes (10): GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), LessonPicker(), ContactViewProps, Input, Textarea (+2 more)

### Community 125 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 126 - "getDataRepository"
Cohesion: 0.13
Nodes (33): createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), addQuizQuestion(), createQuizWithQuestions() (+25 more)

### Community 127 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 128 - "004_landing_and_blog.sql"
Cohesion: 0.47
Nodes (5): public.blog_categories, public.blog_post_categories, public.blog_posts, public.landing_language_settings, public.profiles

### Community 129 - "HeroScene"
Cohesion: 0.36
Nodes (8): compile(), HeroScene(), draw(), resize(), tick(), perspective(), readColor(), translation()

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

### Community 147 - "blog-post-editor.tsx"
Cohesion: 0.16
Nodes (12): saveBlogPostAction(), BlogPostEditor(), BlogRenderer, escapeHtml(), estimateReadingMinutes(), isSafeUrl(), markdownToPlainText(), marked (+4 more)

### Community 148 - "app/page.tsx"
Cohesion: 0.12
Nodes (25): GoldCorners(), GoldDivider(), GoldRosette(), Arrow(), Check(), Cross(), Eyebrow(), LESSON_ICONS (+17 more)

### Community 150 - "blog.ts"
Cohesion: 0.33
Nodes (5): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema

### Community 152 - "data/index.ts"
Cohesion: 0.14
Nodes (18): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata (+10 more)

## Knowledge Gaps
- **452 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+447 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `quiz-form.tsx`, `utils.ts`, `quiz-edit-dialog.tsx`, `cn`, `resolveMessage`, `actions/quiz.ts`, `local/repository.ts`, `QuizManagementTable`, `content-form-panels.tsx`, `data/index.ts`, `revalidateAppContent`, `curriculum-levels.ts`, `TierCapabilitiesPanel`, `add-curriculum-level-dialog.tsx`, `admin-accounting-page-view.tsx`, `QuizEditDialog`, `language-switcher.tsx`, `edit-curriculum-level-dialog.tsx`, `getServerTranslator`, `button.tsx`, `types/index.ts`, `about/page.tsx`, `AdminDashboard`, `BannerUploadForm`, `grammar-edit-dialog.tsx`, `getDataRepository`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `app-shell.tsx`, `actions/auth.ts`, `cn`, `admin.ts`, `isLocalDataMode`, `actions/quiz.ts`, `blog-post-editor.tsx`, `[language]/page.tsx`, `dashboard-data.ts`, `blog.ts`, `app/page.tsx`, `data/index.ts`, `revalidateAppContent`, `curriculum-levels.ts`, `action-guards.ts`, `getServerTranslator`, `[category]/page.tsx`, `postgres/repository.ts`, `supabase/repository.ts`, `getLocalStore`, `rss.xml/route.ts`, `checkout.ts`, `about/page.tsx`, `[slug]/page.tsx`, `availability.ts`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `quiz-form.tsx`, `admin-accounting-page-view.tsx`, `BannerUploadForm`, `utils.ts`, `add-curriculum-level-dialog.tsx`, `language-switcher.tsx`, `quiz-edit-dialog.tsx`, `edit-curriculum-level-dialog.tsx`, `button.tsx`, `actions/quiz.ts`, `local/repository.ts`, `server-locale.ts`, `blog-post-editor.tsx`, `QuizManagementTable`, `app/page.tsx`, `useTranslations`, `grammar-edit-dialog.tsx`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _452 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `quiz-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12292358803986711 - nodes in this community are weakly interconnected._
- **Should `utils.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08158508158508158 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04032729398012858 - nodes in this community are weakly interconnected._