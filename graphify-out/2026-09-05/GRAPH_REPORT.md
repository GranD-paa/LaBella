# Graph Report - cursor P  (2026-09-05)

## Corpus Check
- 435 files · ~324,141 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2170 nodes · 6379 edges · 161 communities (99 shown, 62 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d98b0784`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- action-guards.ts
- postgres/repository.ts
- DataRepository
- en.ts
- app-shell.tsx
- actions/auth.ts
- app/layout.tsx
- Lesson
- cn
- revalidateAppContent
- types/index.ts
- actions/quiz.ts
- isLocalDataMode
- badge.tsx
- fa.ts
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- actions/content.ts
- providers/index.ts
- [category]/page.tsx
- curriculum-levels.ts
- it.ts
- useTranslations
- schema.sql
- compilerOptions
- refresh.ts
- devDependencies
- dependencies
- getDataRepository
- i18n/types.ts
- components.json
- send-limit.ts
- curriculum/types.ts
- local/repository.ts
- data-source.ts
- content-form-panels.tsx
- quiz-edit-dialog.tsx
- flag-icon.tsx
- page-skeletons.tsx
- QuizQuestion
- level-category-grid.tsx
- button.tsx
- resolveMessage
- card.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- checkout.ts
- blog-post-list.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- dashboard-data.ts
- final-deployment/manifest.json
- banner-image.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- stripe/route.ts
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
- [quiz_id]/page.tsx
- lesson-manager.tsx
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- getLocaleDefinition
- What You Must Do When Invoked
- 005_send_limits.sql
- admin-password.mjs
- my-subscriptions-card.tsx
- BlogPost
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
- GrammarRule
- Vocabulary
- learn-category-view.tsx
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
- VideoLesson
- react-hook-form
- @radix-ui/react-avatar
- tailwind-merge
- @types/nodemailer
- subscription-plan-cards.tsx
- @radix-ui/react-dropdown-menu
- @radix-ui/react-tabs
- local-session.ts
- period.ts
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- Search engine visibility

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 209 edges
2. `cn()` - 172 edges
3. `getDataRepository()` - 140 edges
4. `DataRepository` - 110 edges
5. `Button` - 65 edges
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
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `Tile()` --calls--> `cn()`  [EXTRACTED]
  components/admin/accounting/accounting-kpis.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (161 total, 62 thin omitted)

### Community 0 - "action-guards.ts"
Cohesion: 0.08
Nodes (34): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+26 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.18
Nodes (19): dynamic, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne() (+11 more)

### Community 3 - "en.ts"
Cohesion: 0.14
Nodes (11): adminAccountingEn, adminBannersEn, adminContentEn, adminLanguagesEn, adminQuizzesEn, adminSubscriptionEn, adminUsersEn, en (+3 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (10): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+2 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.07
Nodes (41): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+33 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.15
Nodes (13): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, dynamic, robots() (+5 more)

### Community 7 - "Lesson"
Cohesion: 0.11
Nodes (22): QuizManager(), LESSONS, TEN_A1_LEVELS, ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes() (+14 more)

### Community 8 - "cn"
Cohesion: 0.07
Nodes (41): AdminQuizzesPageView(), CreateContentSection(), QuizManagementTable(), renderStats(), toggleStatus(), AdminSubscriptionPageView(), PendingActionType, QuizCard() (+33 more)

### Community 9 - "revalidateAppContent"
Cohesion: 0.07
Nodes (55): createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), addQuizQuestion(), createQuizWithQuestions() (+47 more)

### Community 10 - "types/index.ts"
Cohesion: 0.17
Nodes (19): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+11 more)

### Community 11 - "actions/quiz.ts"
Cohesion: 0.08
Nodes (32): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), useReducedMotion(), advanceLearningAfterQuiz(), getNextLevelSlug() (+24 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.31
Nodes (11): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), refreshFxRate() (+3 more)

### Community 13 - "badge.tsx"
Cohesion: 0.13
Nodes (22): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel() (+14 more)

### Community 14 - "fa.ts"
Cohesion: 0.20
Nodes (7): adminAccountingFa, adminBannersFa, adminContentFa, adminLanguagesFa, adminQuizzesFa, adminSubscriptionFa, adminUsersFa

### Community 15 - "pricing.ts"
Cohesion: 0.09
Nodes (25): SubscriptionPlanCards(), pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp() (+17 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.16
Nodes (11): LandingCourse, LandingHero(), LOCALES, AppLocale, BRAND_MARK, BrandMark, en, fa (+3 more)

### Community 18 - "actions/content.ts"
Cohesion: 0.20
Nodes (18): createContentGrammar(), createContentVideo(), createContentVocabulary(), deleteObject(), deleteObjects(), getBucket(), getClient(), isObjectStorageConfigured() (+10 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.17
Nodes (15): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+7 more)

### Community 20 - "[category]/page.tsx"
Cohesion: 0.15
Nodes (17): CategoryPage(), PageProps, getLanguage(), getLevel(), isCategorySlug(), resolveLessonForLevel(), ALL_UNLOCKED, cefrBandOf() (+9 more)

### Community 21 - "curriculum-levels.ts"
Cohesion: 0.17
Nodes (19): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+11 more)

### Community 22 - "it.ts"
Cohesion: 0.20
Nodes (7): adminAccountingIt, adminBannersIt, adminContentIt, adminLanguagesIt, adminQuizzesIt, adminSubscriptionIt, adminUsersIt

### Community 23 - "useTranslations"
Cohesion: 0.06
Nodes (44): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarForm(), onSubmit() (+36 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "refresh.ts"
Cohesion: 0.15
Nodes (12): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+4 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+17 more)

### Community 29 - "getDataRepository"
Cohesion: 0.08
Nodes (57): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage() (+49 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.18
Nodes (16): DEFAULT_LOCALE, isAppLocale(), LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, messages, createTranslator(), getNestedValue() (+8 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "send-limit.ts"
Cohesion: 0.21
Nodes (12): getTransport(), sendEmail(), claimSend(), countAndClaim(), EMAIL_RULES, prune(), Rule, RULES (+4 more)

### Community 33 - "curriculum/types.ts"
Cohesion: 0.19
Nodes (11): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, TURKISH_LEVELS (+3 more)

### Community 34 - "local/repository.ts"
Cohesion: 0.17
Nodes (19): dynamic, GET(), markFailed(), redirectToResult(), settle(), DevModeBanner(), computeRenewalPeriod(), isEntitled() (+11 more)

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (17): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+9 more)

### Community 36 - "content-form-panels.tsx"
Cohesion: 0.07
Nodes (39): ContentActionBar(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel(), submit() (+31 more)

### Community 37 - "quiz-edit-dialog.tsx"
Cohesion: 0.18
Nodes (34): LessonPicker(), emptyQuestion, emptyQuestion, OPTION_KEYS, QuizQuestionFields(), OPTION_KEYS, SingleQuizQuestionForm(), LOCALES (+26 more)

### Community 38 - "flag-icon.tsx"
Cohesion: 0.29
Nodes (8): FLAGS, US_STARS, SubscriptionLanguageTabs(), getLanguageCode(), getLanguagesMissingCodes(), LANGUAGE_CODES, LANGUAGES, LanguageSlug

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 41 - "level-category-grid.tsx"
Cohesion: 0.15
Nodes (20): CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnLevelView(), LearnLevelViewProps, LevelCategoryGrid(), LevelCategoryGridProps (+12 more)

### Community 42 - "button.tsx"
Cohesion: 0.11
Nodes (18): ACCEPTED_TYPES, EntitlementSettingsPanel(), onSubmit(), Draft, draftFrom(), TierCapabilitiesPanel(), save(), ToggleRow() (+10 more)

### Community 43 - "resolveMessage"
Cohesion: 0.12
Nodes (22): updateSubscriptionPlanAction(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), onSubmit(), onSubmit(), pluralize(), QuizEditDialog() (+14 more)

### Community 44 - "card.tsx"
Cohesion: 0.14
Nodes (32): ContentFormPanel(), DeleteConfirmDialog(), handleConfirm(), LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES, pluralize(), QuizzesTable() (+24 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.13
Nodes (21): BandExam, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults() (+13 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "checkout.ts"
Cohesion: 0.16
Nodes (16): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), requireAuthenticatedAction() (+8 more)

### Community 49 - "blog-post-list.tsx"
Cohesion: 0.07
Nodes (33): deleteBlogPostAction(), saveBlogPostAction(), BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage() (+25 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.09
Nodes (29): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+21 more)

### Community 52 - "dashboard-data.ts"
Cohesion: 0.12
Nodes (17): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), StatCard(), UserDashboard(), MySubscriptionEntry, Avatar (+9 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "banner-image.ts"
Cohesion: 0.24
Nodes (8): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature(), SIGNATURE_CHECKS

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
Cohesion: 0.13
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck, DECKS (+10 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.23
Nodes (15): AccountingKpis(), Tile(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv(), RevenueChart() (+7 more)

### Community 62 - "stripe/route.ts"
Cohesion: 0.25
Nodes (5): dynamic, POST(), BODY, verifyStripeWebhook(), Json

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

### Community 79 - "sections.tsx"
Cohesion: 0.11
Nodes (30): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+22 more)

### Community 83 - "[quiz_id]/page.tsx"
Cohesion: 0.39
Nodes (6): generateMetadata(), PageProps, QuizPage(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 84 - "lesson-manager.tsx"
Cohesion: 0.40
Nodes (3): LessonForm(), onSubmit(), LessonsTable()

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "getLocaleDefinition"
Cohesion: 0.40
Nodes (6): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition()

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "admin-password.mjs"
Cohesion: 0.40
Nodes (3): [mode, email, password], names, pool

### Community 94 - "my-subscriptions-card.tsx"
Cohesion: 0.21
Nodes (10): daysRemaining(), MySubscriptionsCard(), PLAN_ICONS, getSubscriptionPlanMeta(), SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta, LocalizedText (+2 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 126 - "learn-category-view.tsx"
Cohesion: 0.15
Nodes (12): saveGrammarReadingProgress(), LearnCategoryView(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonViewProps, QuizTabContent() (+4 more)

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

### Community 151 - "subscription-plan-cards.tsx"
Cohesion: 0.26
Nodes (9): PLAN_ICONS, SubscriptionView(), SubscriptionViewProps, interpolateText(), BILLING_PERIOD_MONTHS, BillingCurrency, BillingPeriodMonths, PaymentProviderSlug (+1 more)

### Community 154 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 155 - "period.ts"
Cohesion: 0.26
Nodes (9): SubscriptionsTable(), addBillingMonths(), BillingPeriod, computeGraceDeadline(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, resolveStatusFromDates() (+1 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

## Knowledge Gaps
- **483 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+478 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **62 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `action-guards.ts`, `app-shell.tsx`, `actions/auth.ts`, `Lesson`, `cn`, `revalidateAppContent`, `actions/quiz.ts`, `badge.tsx`, `pricing.ts`, `subscription-plan-cards.tsx`, `period.ts`, `getDataRepository`, `content-form-panels.tsx`, `quiz-edit-dialog.tsx`, `flag-icon.tsx`, `level-category-grid.tsx`, `button.tsx`, `resolveMessage`, `card.tsx`, `dashboard-data.ts`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `AdminDashboard`, `BannerUploadForm`, `lesson-manager.tsx`, `my-subscriptions-card.tsx`, `learn-category-view.tsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `action-guards.ts`, `postgres/repository.ts`, `local/repository.ts`, `data-source.ts`, `app-shell.tsx`, `actions/auth.ts`, `revalidateAppContent`, `actions/quiz.ts`, `resolveMessage`, `isLocalDataMode`, `checkout.ts`, `blog-post-list.tsx`, `actions/content.ts`, `[quiz_id]/page.tsx`, `[category]/page.tsx`, `curriculum-levels.ts`, `app/page.tsx`, `learn-category-view.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `app/layout.tsx`, `actions/quiz.ts`, `badge.tsx`, `pricing.ts`, `useTranslations`, `subscription-plan-cards.tsx`, `period.ts`, `quiz-edit-dialog.tsx`, `flag-icon.tsx`, `level-category-grid.tsx`, `button.tsx`, `resolveMessage`, `card.tsx`, `blog-post-list.tsx`, `dashboard-data.ts`, `admin-accounting-page-view.tsx`, `BannerUploadForm`, `sections.tsx`, `my-subscriptions-card.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _483 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `action-guards.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08383838383838384 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03508771929824561 - nodes in this community are weakly interconnected._
- **Should `en.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14210526315789473 - nodes in this community are weakly interconnected._