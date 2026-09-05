# Graph Report - cursor P  (2026-09-05)

## Corpus Check
- 440 files · ~328,234 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2211 nodes · 6520 edges · 166 communities (108 shown, 58 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d13b9a38`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- blog.ts
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- app/layout.tsx
- Lesson
- edit-curriculum-level-dialog.tsx
- revalidateAppContent
- types/index.ts
- [quiz_id]/page.tsx
- getDataRepository
- subscription-plan-cards.tsx
- card.tsx
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- actions/content.ts
- providers/index.ts
- [category]/page.tsx
- curriculum-levels.ts
- billing-settings-form.tsx
- learn-category-view.tsx
- schema.sql
- compilerOptions
- fx-rate/route.ts
- devDependencies
- dependencies
- data/index.ts
- server-locale.ts
- components.json
- useTranslations
- curriculum/languages.ts
- checkout.ts
- data-source.ts
- send-limit.ts
- content-form-panels.tsx
- AdminDashboard
- page-skeletons.tsx
- better-auth.ts
- curriculum/types.ts
- resolveMessage
- admin.ts
- quizzes/page.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- reconcile.ts
- [slug]/page.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- seed.ts
- quiz-form.tsx
- final-deployment/manifest.json
- quiz-edit-dialog.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- button.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- QuizManagementTable
- add-curriculum-level-dialog.tsx
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
- entitlements/schema.test.ts
- data/repository.ts
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- advance-learning.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- admin-password.mjs
- plans.ts
- lessons-monitor.tsx
- 20260730120000_banners.sql
- tailwind.config.ts
- "account"
- public.user_quiz_attempts
- "user"
- public.grammar_pages
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
- cn
- action-guards.ts
- pages.ts
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
- @aws-sdk/s3-request-presigner
- marked
- better-auth
- next
- nodemailer
- lucide-react
- login/page.tsx
- react-hook-form
- @radix-ui/react-avatar
- tailwind-merge
- @types/nodemailer
- dashboard-welcome-header.tsx
- @radix-ui/react-dropdown-menu
- @radix-ui/react-tabs
- local/repository.ts
- period.ts
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- getServerTranslator
- Search engine visibility
- auth-schemas.ts
- app/page.tsx
- getLocaleDefinition
- CreateContentSection

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 215 edges
2. `cn()` - 175 edges
3. `getDataRepository()` - 142 edges
4. `DataRepository` - 110 edges
5. `Button` - 66 edges
6. `resolveMessage()` - 60 edges
7. `revalidateAppContent()` - 53 edges
8. `Badge()` - 43 edges
9. `Lesson` - 41 edges
10. `Card` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/sign-up/page.tsx → lib/i18n/metadata.ts
- `QuizRowActions()` --calls--> `deleteQuiz()`  [EXTRACTED]
  components/admin/quizzes/quiz-management-table.tsx → app/admin/actions/quizzes.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/dashboard/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (166 total, 58 thin omitted)

### Community 0 - "blog.ts"
Cohesion: 0.22
Nodes (10): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogPostEditor(), BlogPostList() (+2 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.26
Nodes (12): dynamic, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne() (+4 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (9): BlogPost, fetchAdminDashboardData(), DataRepository, fetchQuizManagementStats(), GrammarRule, Payment, QuizQuestion, Subscription (+1 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.11
Nodes (6): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell()

### Community 5 - "actions/auth.ts"
Cohesion: 0.18
Nodes (18): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), buckets, buildAuthRateLimitKey() (+10 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.22
Nodes (8): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps

### Community 7 - "Lesson"
Cohesion: 0.09
Nodes (25): QuizManager(), BandExam, LESSONS, TEN_A1_LEVELS, ContinueLearningProgress, resolveContinueLearningPath(), italian, languages (+17 more)

### Community 8 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.40
Nodes (10): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+2 more)

### Community 9 - "revalidateAppContent"
Cohesion: 0.14
Nodes (25): submitQuizAction(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), sendPasswordResetEmail() (+17 more)

### Community 10 - "types/index.ts"
Cohesion: 0.10
Nodes (21): GrammarManager(), GrammarTable(), LessonsTable(), AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy() (+13 more)

### Community 11 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (36): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+28 more)

### Community 12 - "getDataRepository"
Cohesion: 0.26
Nodes (16): addQuizQuestion(), createQuizWithQuestions(), createStructuredQuiz(), deleteQuiz(), deleteQuizQuestion(), getQuestionLessonId(), getQuizLessonId(), revalidateQuizPaths() (+8 more)

### Community 13 - "subscription-plan-cards.tsx"
Cohesion: 0.16
Nodes (13): PlanActiveToggle(), SubscriptionPlanEditDialog(), discountedPrice(), SubscriptionPlanList(), PLAN_ICONS, SubscriptionPlanCards(), SubscriptionView(), SubscriptionViewProps (+5 more)

### Community 14 - "card.tsx"
Cohesion: 0.15
Nodes (31): DeleteConfirmDialog(), handleConfirm(), LANDMARK_LABELS, LANGUAGE_LABELS, QuizRowActions(), pluralize(), QuizzesTable(), PERMISSION_ROWS (+23 more)

### Community 15 - "pricing.ts"
Cohesion: 0.16
Nodes (22): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+14 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LandingHero(), LOCALES, BRAND_MARK, BrandMark, en, fa, it (+2 more)

### Community 18 - "actions/content.ts"
Cohesion: 0.23
Nodes (13): createContentGrammar(), createContentVideo(), createContentVocabulary(), MAX_PDF_BYTES, MAX_PDF_PAGES, countPdfPages(), isPdf(), readWebpDimensions() (+5 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "[category]/page.tsx"
Cohesion: 0.13
Nodes (23): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+15 more)

### Community 21 - "curriculum-levels.ts"
Cohesion: 0.22
Nodes (16): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), AddCurriculumLevelDialog() (+8 more)

### Community 22 - "billing-settings-form.tsx"
Cohesion: 0.23
Nodes (20): LessonPicker(), emptyQuestion, OPTION_KEYS, QuizQuestionFields(), FormControl, FormDescription, FormField(), FormFieldContext (+12 more)

### Community 23 - "learn-category-view.tsx"
Cohesion: 0.11
Nodes (15): VocabularyManager(), VocabularyTable(), LockedContentNotice(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonViewProps (+7 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "fx-rate/route.ts"
Cohesion: 0.15
Nodes (14): dynamic, GET(), supabaseFxStore(), FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS (+6 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+17 more)

### Community 29 - "data/index.ts"
Cohesion: 0.06
Nodes (42): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage() (+34 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.19
Nodes (18): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, messages, createTranslator() (+10 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "useTranslations"
Cohesion: 0.08
Nodes (32): AdminContentHeader(), LessonsMonitor(), LessonsMonitorPageView(), AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), EntitlementSettingsPanel(), ConfirmActionDialog() (+24 more)

### Community 33 - "curriculum/languages.ts"
Cohesion: 0.13
Nodes (13): ENGLISH_LEVELS, GERMAN_LEVELS, getLanguagesMissingCodes(), CATEGORY_DEFINITIONS, getLanguage(), LANGUAGES, CurriculumLevelOverrideRow, getBandFromCode() (+5 more)

### Community 34 - "checkout.ts"
Cohesion: 0.12
Nodes (30): buildRecoveryDeps(), CheckoutResult, resolveOrigin(), startCheckoutAction(), dynamic, GET(), dynamic, GET() (+22 more)

### Community 35 - "data-source.ts"
Cohesion: 0.11
Nodes (21): generateMetadata(), dynamic, robots(), updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource() (+13 more)

### Community 36 - "send-limit.ts"
Cohesion: 0.21
Nodes (12): getTransport(), sendEmail(), claimSend(), countAndClaim(), EMAIL_RULES, prune(), Rule, RULES (+4 more)

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.10
Nodes (30): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), submit(), GrammarEntry, GrammarEntryFields() (+22 more)

### Community 38 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "better-auth.ts"
Cohesion: 0.28
Nodes (8): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, isIranianPhone(), normalizePhone(), sendSms()

### Community 41 - "curriculum/types.ts"
Cohesion: 0.11
Nodes (36): CONTENT_TYPES, BandExamCard, CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView() (+28 more)

### Community 42 - "resolveMessage"
Cohesion: 0.11
Nodes (24): BillingSettingsForm(), handleRefreshRate(), onSubmit(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), LessonEditDialog() (+16 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (43): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+35 more)

### Community 44 - "quizzes/page.tsx"
Cohesion: 0.24
Nodes (10): AdminQuizzesPage(), PageProps, resolveRequestedSlot(), AdminQuizzesPageView(), CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext (+2 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.13
Nodes (22): EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+14 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "reconcile.ts"
Cohesion: 0.27
Nodes (6): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 49 - "[slug]/page.tsx"
Cohesion: 0.11
Nodes (22): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+14 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "seed.ts"
Cohesion: 0.09
Nodes (22): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+14 more)

### Community 52 - "quiz-form.tsx"
Cohesion: 0.24
Nodes (8): OPTION_KEYS, WizardQuestionFields(), OPTION_LABELS, QuestionFeedback, RadioGroup, RadioGroupItem, useReducedMotion(), StructuredQuizValues

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "quiz-edit-dialog.tsx"
Cohesion: 0.22
Nodes (9): emptyQuestion, pluralize(), startEditingQuestion(), toQuestionValues(), OPTION_KEYS, SingleQuizQuestionForm(), createQuizTitleSchema(), QuizQuestionValues (+1 more)

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "button.tsx"
Cohesion: 0.15
Nodes (14): ACCEPTED_TYPES, LOCALES, Draft, draftFrom(), TierCapabilitiesPanel(), save(), ToggleRow(), ContactViewProps (+6 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.13
Nodes (23): AccountingKpis(), Tile(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv(), RevenueChart() (+15 more)

### Community 62 - "QuizManagementTable"
Cohesion: 0.29
Nodes (4): QuizManagementTable(), renderStats(), toggleStatus(), getQuizAttemptStats()

### Community 63 - "add-curriculum-level-dialog.tsx"
Cohesion: 0.22
Nodes (15): PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay, DialogTitle (+7 more)

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
Cohesion: 0.11
Nodes (31): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+23 more)

### Community 84 - "data/repository.ts"
Cohesion: 0.07
Nodes (25): BlogCategory, BlogPostInput, BlogPostStatus, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage() (+17 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "advance-learning.ts"
Cohesion: 0.47
Nodes (3): ITALIAN_LEVELS, advanceLearningAfterQuiz(), getNextLevelSlug()

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "admin-password.mjs"
Cohesion: 0.40
Nodes (3): [mode, email, password], names, pool

### Community 94 - "plans.ts"
Cohesion: 0.50
Nodes (3): SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (19): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage(), ContentCoverageInput (+11 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "cn"
Cohesion: 0.08
Nodes (33): AdminSubscriptionPageView(), RoleBadge(), StatusBadge(), PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel(), LaparliLogo(), StatCard() (+25 more)

### Community 125 - "action-guards.ts"
Cohesion: 0.15
Nodes (13): cancelSubscriptionAction(), recoverMyPendingPaymentsAction(), saveGrammarReadingProgress(), setLandingLanguageVisibilityAction(), LandingLanguagePanel(), toggle(), GuardFail, GuardOk (+5 more)

### Community 126 - "pages.ts"
Cohesion: 0.36
Nodes (7): attachGrammarPages(), deleteObject(), getBucket(), getClient(), isObjectStorageConfigured(), putObject(), signedReadUrl()

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

### Community 146 - "login/page.tsx"
Cohesion: 0.33
Nodes (7): generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), parseSignUpRedirect(), SignUpPage(), getSafeRedirectPath()

### Community 151 - "dashboard-welcome-header.tsx"
Cohesion: 0.17
Nodes (10): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark(), Avatar (+2 more)

### Community 154 - "local/repository.ts"
Cohesion: 0.29
Nodes (10): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+2 more)

### Community 155 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 160 - "getServerTranslator"
Cohesion: 0.19
Nodes (14): DashboardPage(), generateMetadata(), generateMetadata(), LessonPage(), PageProps, generateMetadata(), MenuPage(), generateMetadata() (+6 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "auth-schemas.ts"
Cohesion: 0.25
Nodes (8): SignInForm(), onSubmit(), SignUpForm(), onSubmit(), isVerifiablePhone(), createSignInSchema(), createSignUpSchema(), Translator

### Community 163 - "app/page.tsx"
Cohesion: 0.14
Nodes (19): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck, DECKS (+11 more)

### Community 164 - "getLocaleDefinition"
Cohesion: 0.40
Nodes (6): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition()

## Knowledge Gaps
- **492 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+487 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `Lesson`, `edit-curriculum-level-dialog.tsx`, `revalidateAppContent`, `types/index.ts`, `[quiz_id]/page.tsx`, `subscription-plan-cards.tsx`, `card.tsx`, `[category]/page.tsx`, `curriculum-levels.ts`, `billing-settings-form.tsx`, `learn-category-view.tsx`, `dashboard-welcome-header.tsx`, `data/index.ts`, `auth-schemas.ts`, `content-form-panels.tsx`, `CreateContentSection`, `AdminDashboard`, `curriculum/types.ts`, `resolveMessage`, `admin.ts`, `quizzes/page.tsx`, `quiz-form.tsx`, `quiz-edit-dialog.tsx`, `button.tsx`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `QuizManagementTable`, `add-curriculum-level-dialog.tsx`, `BannerUploadForm`, `lessons-monitor.tsx`, `cn`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `blog.ts`, `postgres/client.ts`, `app-shell.tsx`, `actions/auth.ts`, `revalidateAppContent`, `[quiz_id]/page.tsx`, `actions/content.ts`, `[category]/page.tsx`, `curriculum-levels.ts`, `fx-rate/route.ts`, `data/index.ts`, `getServerTranslator`, `checkout.ts`, `app/page.tsx`, `data-source.ts`, `admin.ts`, `quizzes/page.tsx`, `[slug]/page.tsx`, `action-guards.ts`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `blog.ts`, `app/layout.tsx`, `edit-curriculum-level-dialog.tsx`, `[quiz_id]/page.tsx`, `subscription-plan-cards.tsx`, `card.tsx`, `billing-settings-form.tsx`, `learn-category-view.tsx`, `dashboard-welcome-header.tsx`, `useTranslations`, `CreateContentSection`, `curriculum/types.ts`, `[slug]/page.tsx`, `quiz-form.tsx`, `button.tsx`, `admin-accounting-page-view.tsx`, `QuizManagementTable`, `add-curriculum-level-dialog.tsx`, `BannerUploadForm`, `sections.tsx`, `lessons-monitor.tsx`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _492 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03643892339544513 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._
- **Should `app-shell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._