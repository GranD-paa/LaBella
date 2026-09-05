# Graph Report - cursor P  (2026-09-05)

## Corpus Check
- 435 files · ~324,672 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2174 nodes · 6386 edges · 155 communities (98 shown, 57 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ffd20c31`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- action-guards.ts
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- app/layout.tsx
- Lesson
- cn
- getDataRepository
- types/index.ts
- actions/quiz.ts
- fx-rate/route.ts
- utils.ts
- user-management-panel.tsx
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- actions/content.ts
- providers/index.ts
- [language]/page.tsx
- curriculum-levels.ts
- isLocalDataMode
- useTranslations
- schema.sql
- compilerOptions
- PaymentSettings
- devDependencies
- dependencies
- data/index.ts
- i18n/types.ts
- components.json
- user-dashboard.tsx
- curriculum/languages.ts
- local/repository.ts
- middleware.ts
- validations/quiz.ts
- resolveMessage
- quiz-management/types.ts
- page-skeletons.tsx
- data/repository.ts
- curriculum/types.ts
- TierCapabilitiesPanel
- admin.ts
- button.tsx
- [category]/page.tsx
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- Payment
- blog-post-editor.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- seed.ts
- dashboard-data.ts
- final-deployment/manifest.json
- roles.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-embed.ts
- sync-local-content.mjs
- subscription-plan-cards.tsx
- QuizManagementTable
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
- entitlements/schema.test.ts
- landing/page.tsx
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- admin-quiz-attempts.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- admin-password.mjs
- plans.ts
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
- react-hook-form
- @radix-ui/react-avatar
- tailwind-merge
- @types/nodemailer
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
1. `useTranslations()` - 210 edges
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
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (155 total, 57 thin omitted)

### Community 0 - "action-guards.ts"
Cohesion: 0.11
Nodes (28): cancelSubscriptionAction(), recoverMyPendingPaymentsAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction() (+20 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.12
Nodes (25): dynamic, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature() (+17 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (7): BlogPost, DataRepository, GrammarRule, LocalizedText, Profile, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.06
Nodes (21): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+13 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.05
Nodes (53): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+45 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.16
Nodes (12): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, dynamic, robots() (+4 more)

### Community 7 - "Lesson"
Cohesion: 0.14
Nodes (18): QuizManager(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+10 more)

### Community 8 - "cn"
Cohesion: 0.15
Nodes (20): CreateContentSection(), EntitlementSettingsPanel(), ConfirmActionDialog(), handleConfirm(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription (+12 more)

### Community 9 - "getDataRepository"
Cohesion: 0.12
Nodes (40): createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson() (+32 more)

### Community 10 - "types/index.ts"
Cohesion: 0.15
Nodes (19): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+11 more)

### Community 11 - "actions/quiz.ts"
Cohesion: 0.10
Nodes (27): submitQuizAction(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+19 more)

### Community 12 - "fx-rate/route.ts"
Cohesion: 0.15
Nodes (17): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+9 more)

### Community 13 - "utils.ts"
Cohesion: 0.11
Nodes (20): AdminQuizzesPageView(), AdminSubscriptionPageView(), PlanActiveToggle(), SubscriptionPlanEditDialog(), discountedPrice(), SubscriptionPlanList(), RoleBadge(), StatusBadge() (+12 more)

### Community 14 - "user-management-panel.tsx"
Cohesion: 0.20
Nodes (19): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), pluralize(), QuizzesTable(), ManagedUser, getInitials(), UserManagementPanel() (+11 more)

### Community 15 - "pricing.ts"
Cohesion: 0.17
Nodes (20): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+12 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LOCALES, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS, en (+2 more)

### Community 18 - "actions/content.ts"
Cohesion: 0.19
Nodes (17): createContentGrammar(), attachGrammarPages(), deleteObject(), deleteObjects(), getBucket(), getClient(), isObjectStorageConfigured(), putObject() (+9 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.13
Nodes (18): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+10 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.12
Nodes (15): LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED, cefrBandOf() (+7 more)

### Community 21 - "curriculum-levels.ts"
Cohesion: 0.19
Nodes (18): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+10 more)

### Community 22 - "isLocalDataMode"
Cohesion: 0.19
Nodes (14): dynamic, GET(), markFailed(), redirectToResult(), settle(), DevModeBanner(), getPaymentProvider(), DataSource (+6 more)

### Community 23 - "useTranslations"
Cohesion: 0.07
Nodes (40): saveGrammarReadingProgress(), AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarManager() (+32 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "PaymentSettings"
Cohesion: 0.14
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+17 more)

### Community 29 - "data/index.ts"
Cohesion: 0.09
Nodes (41): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage() (+33 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.13
Nodes (24): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+16 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "user-dashboard.tsx"
Cohesion: 0.17
Nodes (11): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining(), MySubscriptionEntry (+3 more)

### Community 33 - "curriculum/languages.ts"
Cohesion: 0.20
Nodes (8): ENGLISH_LEVELS, GERMAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES, CATEGORY_DEFINITIONS, LANGUAGES, TURKISH_LEVELS, CategoryDefinition

### Community 34 - "local/repository.ts"
Cohesion: 0.17
Nodes (19): buildRecoveryDeps(), CheckoutResult, resolveOrigin(), startCheckoutAction(), handlePay(), computeRenewalPeriod(), isEntitled(), getAvailableProviders() (+11 more)

### Community 35 - "middleware.ts"
Cohesion: 0.23
Nodes (10): PUBLIC_ROUTES, updatePostgresSession(), isPostgresDataMode(), PUBLIC_ROUTES, IMPORTANT: You *must* return the supabaseResponse object as it is., IMPORTANT: Avoid writing any logic between createServerClient and, updateSession(), config (+2 more)

### Community 36 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 37 - "resolveMessage"
Cohesion: 0.05
Nodes (113): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), submit(), GrammarEntry, GrammarEntryFields() (+105 more)

### Community 38 - "quiz-management/types.ts"
Cohesion: 0.24
Nodes (9): ExtendedQuiz, ExtendedQuizQuestion, normalizeAnswer(), QuestionType, QUIZ_SECTIONS, QuizMetadata, QuizStatus, scoreWrittenAnswer() (+1 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "data/repository.ts"
Cohesion: 0.09
Nodes (13): BlogPostInput, CurriculumLevelOverrideRow, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, GrammarPage, GrammarPageSummary (+5 more)

### Community 41 - "curriculum/types.ts"
Cohesion: 0.09
Nodes (41): CONTENT_TYPES, ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, CategoryWatermark(), ComingSoonLanguage() (+33 more)

### Community 42 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (32): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), onSubmit(), bannerSchema, BannerValues (+24 more)

### Community 44 - "button.tsx"
Cohesion: 0.17
Nodes (21): ACCEPTED_TYPES, LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), Draft, ToggleRow(), PERMISSION_ROWS (+13 more)

### Community 45 - "[category]/page.tsx"
Cohesion: 0.17
Nodes (18): CategoryPage(), PageProps, getLanguage(), getLevel(), isCategorySlug(), resolveLessonForLevel(), gateForCategory(), fetchEnrichedQuizzes() (+10 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "Payment"
Cohesion: 0.19
Nodes (6): ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference, Payment

### Community 49 - "blog-post-editor.tsx"
Cohesion: 0.07
Nodes (35): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata (+27 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "seed.ts"
Cohesion: 0.09
Nodes (25): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+17 more)

### Community 52 - "dashboard-data.ts"
Cohesion: 0.16
Nodes (7): ITALIAN_LEVELS, buildLearnerEngagementMetrics(), LearnerEngagementMetrics, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats()

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "roles.ts"
Cohesion: 0.31
Nodes (7): ADMIN_ROLE_SLUGS, isRoleSlug(), RoleDefinition, roleImpliesAdmin(), RolePermissions, USER_STATUSES, UserStatus

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
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), en, fa, getLandingCopy(), it (+10 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "subscription-plan-cards.tsx"
Cohesion: 0.12
Nodes (25): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), toCsv() (+17 more)

### Community 62 - "QuizManagementTable"
Cohesion: 0.29
Nodes (4): QuizManagementTable(), renderStats(), toggleStatus(), getQuizAttemptStats()

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
Cohesion: 0.10
Nodes (34): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+26 more)

### Community 84 - "landing/page.tsx"
Cohesion: 0.40
Nodes (5): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), getLandingLanguageToggles()

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "admin-quiz-attempts.ts"
Cohesion: 0.67
Nodes (3): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), parseAttemptBreakdown()

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "admin-password.mjs"
Cohesion: 0.40
Nodes (3): [mode, email, password], names, pool

### Community 94 - "plans.ts"
Cohesion: 0.50
Nodes (3): SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

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

### Community 154 - "local-session.ts"
Cohesion: 0.30
Nodes (10): PUBLIC_ROUTES, updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession() (+2 more)

### Community 155 - "period.ts"
Cohesion: 0.29
Nodes (8): addBillingMonths(), BillingPeriod, computeGraceDeadline(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, resolveStatusFromDates(), SubscriptionStatus

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

## Knowledge Gaps
- **484 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+479 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **57 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `action-guards.ts`, `app-shell.tsx`, `actions/auth.ts`, `Lesson`, `cn`, `getDataRepository`, `actions/quiz.ts`, `utils.ts`, `user-management-panel.tsx`, `i18n/types.ts`, `user-dashboard.tsx`, `resolveMessage`, `curriculum/types.ts`, `TierCapabilitiesPanel`, `button.tsx`, `subscription-plan-cards.tsx`, `QuizManagementTable`, `AdminDashboard`, `BannerUploadForm`, `sections.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `action-guards.ts`, `postgres/repository.ts`, `app-shell.tsx`, `actions/auth.ts`, `actions/quiz.ts`, `fx-rate/route.ts`, `actions/content.ts`, `[language]/page.tsx`, `curriculum-levels.ts`, `isLocalDataMode`, `useTranslations`, `data/index.ts`, `local/repository.ts`, `admin.ts`, `[category]/page.tsx`, `blog-post-editor.tsx`, `app/page.tsx`, `landing/page.tsx`, `admin-quiz-attempts.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `user-dashboard.tsx`, `BannerUploadForm`, `app-shell.tsx`, `resolveMessage`, `app/layout.tsx`, `curriculum/types.ts`, `actions/quiz.ts`, `button.tsx`, `utils.ts`, `user-management-panel.tsx`, `sections.tsx`, `blog-post-editor.tsx`, `useTranslations`, `i18n/types.ts`, `subscription-plan-cards.tsx`, `QuizManagementTable`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _484 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `action-guards.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10510510510510511 - nodes in this community are weakly interconnected._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03840245775729647 - nodes in this community are weakly interconnected._