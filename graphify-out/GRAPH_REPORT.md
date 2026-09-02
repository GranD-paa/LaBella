# Graph Report - cursor P  (2026-09-02)

## Corpus Check
- 418 files · ~312,166 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2073 nodes · 6162 edges · 150 communities (97 shown, 53 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b2513b5c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- actions/quiz.ts
- level-category-grid.tsx
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- user-management-panel.tsx
- types/index.ts
- cn
- admin.ts
- PaymentSettings
- local-session.ts
- isLocalDataMode
- [quiz_id]/page.tsx
- supabase/repository.ts
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- app/layout.tsx
- providers/index.ts
- [category]/page.tsx
- vocabulary-manager.tsx
- resolveMessage
- useTranslations
- schema.sql
- compilerOptions
- action-guards.ts
- devDependencies
- dependencies
- curriculum-level-manager.tsx
- i18n/types.ts
- components.json
- data.ts
- user-row-actions.tsx
- local/repository.ts
- data-source.ts
- reconcile.ts
- visibility.ts
- admin-accounting-page-view.tsx
- page-skeletons.tsx
- data/index.ts
- curriculum/types.ts
- postgres/repository.ts
- getLocaleDefinition
- locale-provider.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- billing-settings-form.tsx
- CurriculumLevelOverrideRow
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- my-subscriptions-card.tsx
- final-deployment/manifest.json
- learn-category-view.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- VideoLesson
- blog.ts
- admin-dashboard.tsx
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
- Payment
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
- period.ts
- revalidateAppContent
- graphify reference: query, path, explain
- 004_landing_and_blog.sql
- landing.tsx
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
- pricing-section.tsx
- QuizEditDialog
- getDataRepository
- subscription-view.tsx
- BlogRenderer

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 168 edges
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
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/layout.tsx → lib/i18n/metadata.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (150 total, 53 thin omitted)

### Community 0 - "actions/quiz.ts"
Cohesion: 0.28
Nodes (8): deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), BannerList(), runAction(), ActionResult, bannerSchema, vocabularySchema

### Community 1 - "level-category-grid.tsx"
Cohesion: 0.18
Nodes (18): CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView(), LearnLevelViewProps, LevelCategoryGrid(), LevelCategoryGridProps, CATEGORY_ACCENTS (+10 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (4): BlogPost, DataRepository, GrammarRule, Vocabulary

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
Cohesion: 0.20
Nodes (19): deleteLesson(), STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LessonsTable(), pluralize(), QuizzesTable(), getInitials() (+11 more)

### Community 7 - "types/index.ts"
Cohesion: 0.13
Nodes (20): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+12 more)

### Community 8 - "cn"
Cohesion: 0.14
Nodes (28): ConfirmActionDialog(), handleConfirm(), LanguageSwitcher(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter() (+20 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (33): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), handleRefreshRate(), onSubmit(), BannerValues, billingSettingsSchema (+25 more)

### Community 10 - "PaymentSettings"
Cohesion: 0.12
Nodes (18): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+10 more)

### Community 11 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.20
Nodes (18): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+10 more)

### Community 13 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (36): PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage(), QuizPageIntro() (+28 more)

### Community 14 - "supabase/repository.ts"
Cohesion: 0.17
Nodes (10): matchesImageSignature(), SIGNATURE_CHECKS, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS, PLAN_TEMPLATES, PlanTemplate, createClient() (+2 more)

### Community 15 - "pricing.ts"
Cohesion: 0.07
Nodes (37): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), FxFetchResult, getFxProvider(), navasanProvider, PROVIDERS (+29 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.29
Nodes (5): LandingCourse, LandingHero(), LOCALES, BRAND_MARK, BrandMark

### Community 18 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+2 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "[category]/page.tsx"
Cohesion: 0.12
Nodes (21): submitQuizAction(), CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata() (+13 more)

### Community 21 - "vocabulary-manager.tsx"
Cohesion: 0.29
Nodes (6): createVocabulary(), deleteVocabulary(), VocabularyForm(), onSubmit(), VocabularyManager(), VocabularyTable()

### Community 22 - "resolveMessage"
Cohesion: 0.09
Nodes (68): ACCEPTED_TYPES, emptyQuestion, VideoContentPanel(), submit(), LessonPicker(), LessonEditDialog(), onSubmit(), emptyQuestion (+60 more)

### Community 23 - "useTranslations"
Cohesion: 0.04
Nodes (42): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), ContentActionBar(), GrammarContentPanel(), submit() (+34 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "action-guards.ts"
Cohesion: 0.13
Nodes (17): setLandingLanguageVisibilityAction(), setLanguageAvailabilityAction(), updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), LandingLanguagePanel(), toggle(), GuardFail (+9 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, clsx, marked, dependencies, better-auth, clsx, marked, @radix-ui/react-dropdown-menu (+17 more)

### Community 29 - "curriculum-level-manager.tsx"
Cohesion: 0.18
Nodes (20): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), AddCurriculumLevelDialog(), onSubmit() (+12 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.18
Nodes (17): DEFAULT_LOCALE, isAppLocale(), LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, messages, createTranslator(), getNestedValue() (+9 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "data.ts"
Cohesion: 0.12
Nodes (8): buildAchievements(), fetchUserDashboardData(), EnrichedQuiz, fetchEnrichedQuizzes(), fetchQuizManagementStats(), filterQuizzes(), QuizPathFilter, QuizQuestion

### Community 33 - "user-row-actions.tsx"
Cohesion: 0.22
Nodes (9): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), UserProfileDialog(), PendingActionType (+1 more)

### Community 34 - "local/repository.ts"
Cohesion: 0.19
Nodes (18): DevModeBanner(), ALLOWED_IMAGE_EXTENSIONS, BANNER_UPLOAD_DIR, createLocalRepository(), commitStore(), failLocalPayment(), settleLocalPayment(), backfillMissingCollections() (+10 more)

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (16): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+8 more)

### Community 36 - "reconcile.ts"
Cohesion: 0.28
Nodes (5): ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 37 - "visibility.ts"
Cohesion: 0.24
Nodes (8): dynamic, revalidate, sitemap(), LANDING_LANGUAGES, LandingLanguageDefinition, LandingLanguageSlug, LandmarkId, LandingLanguageToggle

### Community 38 - "admin-accounting-page-view.tsx"
Cohesion: 0.13
Nodes (22): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), toCsv() (+14 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.14
Nodes (6): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton(), Skeleton()

### Community 40 - "data/index.ts"
Cohesion: 0.12
Nodes (31): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminPage() (+23 more)

### Community 41 - "curriculum/types.ts"
Cohesion: 0.20
Nodes (14): ComingSoonLanguage(), CourseLevelAccordion(), FlagIcon(), FLAGS, US_STARS, LanguageCard(), SubscriptionLanguageTabs(), getLanguageCode() (+6 more)

### Community 42 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 43 - "getLocaleDefinition"
Cohesion: 0.50
Nodes (5): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readStoredLocale(), getLocaleDefinition()

### Community 44 - "locale-provider.tsx"
Cohesion: 0.13
Nodes (33): BannerManagementPanel(), ContentFormPanel(), LANDMARK_LABELS, LANGUAGE_LABELS, AdminLanguagesPageView(), LanguageManagementPanel(), CONTENT_TYPES, AdminSubscriptionPageView() (+25 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.09
Nodes (25): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, LevelSlug (+17 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "billing-settings-form.tsx"
Cohesion: 0.11
Nodes (23): RoleBadge(), StatusBadge(), ManagedUser, PERMISSION_ROWS, FormDescription, SelectContent, SelectItem, SelectLabel (+15 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.07
Nodes (21): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, FxRateProvider, BlogCategory, BlogPostInput, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED (+13 more)

### Community 52 - "my-subscriptions-card.tsx"
Cohesion: 0.11
Nodes (21): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), QuizSubmittedBanner() (+13 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "learn-category-view.tsx"
Cohesion: 0.27
Nodes (8): LearnCategoryBackLink(), GrammarRulesList(), LessonDetailTabs(), LessonView(), LessonViewProps, QuizTabContent(), VocabularyFlashcards(), UserQuizAttempt

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
Cohesion: 0.18
Nodes (14): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck, DECKS (+6 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 62 - "blog.ts"
Cohesion: 0.09
Nodes (29): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata (+21 more)

### Community 63 - "admin-dashboard.tsx"
Cohesion: 0.16
Nodes (16): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LANGUAGE_LABEL_KEYS, LevelQuizRow, LevelQuizRowDetails() (+8 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "BannerUploadForm"
Cohesion: 0.47
Nodes (6): uploadBannerAction(), BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 67 - "final-deployment/vercel.json"
Cohesion: 0.40
Nodes (4): buildCommand, framework, headers, installCommand

### Community 69 - "extends"
Cohesion: 0.50
Nodes (3): extends, next/core-web-vitals, next/typescript

### Community 70 - "public.user_learning_state"
Cohesion: 0.50
Nodes (3): public.user_learning_state, public.lessons, public.profiles

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 94 - "curriculum/languages.ts"
Cohesion: 0.16
Nodes (11): ENGLISH_LEVELS, GERMAN_LEVELS, CATEGORY_DEFINITIONS, getLanguage(), getLevel(), resolveLessonForLevel(), TURKISH_LEVELS, CategoryDefinition (+3 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 125 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 126 - "revalidateAppContent"
Cohesion: 0.15
Nodes (29): createContentGrammar(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), updateLesson() (+21 more)

### Community 127 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 128 - "004_landing_and_blog.sql"
Cohesion: 0.47
Nodes (5): public.blog_categories, public.blog_post_categories, public.blog_posts, public.landing_language_settings, public.profiles

### Community 129 - "landing.tsx"
Cohesion: 0.23
Nodes (16): Landing(), PricingFallback(), PricingSection(), LandingDay(), LandingFaq(), LandingFeatures(), LandingFinal(), LandingFooter() (+8 more)

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

### Community 148 - "pricing-section.tsx"
Cohesion: 0.14
Nodes (13): Arrow(), Check(), Cross(), LESSON_ICONS, SectionHead(), Price(), SegmentButton(), en (+5 more)

### Community 151 - "QuizEditDialog"
Cohesion: 0.36
Nodes (8): pluralize(), QuizEditDialog(), handleAddQuestion(), handleEditQuestion(), handleTitleSave(), refreshAfterMutation(), startEditingQuestion(), toQuestionValues()

### Community 152 - "getDataRepository"
Cohesion: 0.16
Nodes (18): AboutPage(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata, AdminLandingPage() (+10 more)

### Community 155 - "subscription-view.tsx"
Cohesion: 0.17
Nodes (16): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), SubscriptionView() (+8 more)

### Community 158 - "BlogRenderer"
Cohesion: 0.47
Nodes (3): BlogRenderer, escapeHtml(), isSafeUrl()

## Knowledge Gaps
- **462 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+457 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `actions/quiz.ts`, `level-category-grid.tsx`, `landing.tsx`, `app-shell.tsx`, `actions/auth.ts`, `user-management-panel.tsx`, `types/index.ts`, `cn`, `[quiz_id]/page.tsx`, `pricing.ts`, `QuizManagementTable`, `vocabulary-manager.tsx`, `resolveMessage`, `QuizEditDialog`, `getDataRepository`, `subscription-view.tsx`, `curriculum-level-manager.tsx`, `user-row-actions.tsx`, `admin-accounting-page-view.tsx`, `data/index.ts`, `curriculum/types.ts`, `locale-provider.tsx`, `billing-settings-form.tsx`, `my-subscriptions-card.tsx`, `learn-category-view.tsx`, `video-lessons-grid.tsx`, `admin-dashboard.tsx`, `BannerUploadForm`, `revalidateAppContent`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `actions/quiz.ts`, `app-shell.tsx`, `actions/auth.ts`, `user-management-panel.tsx`, `admin.ts`, `isLocalDataMode`, `[quiz_id]/page.tsx`, `[category]/page.tsx`, `vocabulary-manager.tsx`, `action-guards.ts`, `subscription-view.tsx`, `curriculum-level-manager.tsx`, `user-row-actions.tsx`, `local/repository.ts`, `data-source.ts`, `visibility.ts`, `data/index.ts`, `postgres/repository.ts`, `app/page.tsx`, `blog.ts`, `BannerUploadForm`, `revalidateAppContent`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `DataRepository` connect `DataRepository` to `data.ts`, `local/repository.ts`, `visibility.ts`, `data/index.ts`, `postgres/repository.ts`, `PaymentSettings`, `supabase/repository.ts`, `Payment`, `pricing.ts`, `CurriculumLevelOverrideRow`, `data/repository.ts`, `my-subscriptions-card.tsx`, `VideoLesson`, `app/page.tsx`, `subscription-view.tsx`, `curriculum-level-manager.tsx`, `curriculum/languages.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _462 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04332634521313766 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._
- **Should `app-shell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0796221322537112 - nodes in this community are weakly interconnected._