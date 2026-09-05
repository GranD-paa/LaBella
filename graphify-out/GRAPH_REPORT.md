# Graph Report - cursor P  (2026-09-05)

## Corpus Check
- 433 files · ~322,111 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2169 nodes · 6216 edges · 158 communities (101 shown, 57 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d13b9a38`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- blog.ts
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- app/layout.tsx
- Lesson
- button.tsx
- revalidateAppContent
- types/index.ts
- quiz-form.tsx
- supabase/repository.ts
- subscription-view.tsx
- user-management-panel.tsx
- pricing.ts
- 001_app_schema.sql
- LanguageSlug
- actions/content.ts
- providers/index.ts
- [category]/page.tsx
- billing-settings-form.tsx
- content-form-panels.tsx
- learn-category-view.tsx
- schema.sql
- compilerOptions
- [provider]/route.ts
- devDependencies
- dependencies
- getDataRepository
- i18n/types.ts
- components.json
- locale-provider.tsx
- curriculum/types.ts
- isLocalDataMode
- data-source.ts
- stripe/route.ts
- admin-schemas.ts
- AdminDashboard
- page-skeletons.tsx
- grammar-form.tsx
- level-category-grid.tsx
- resolveMessage
- admin.ts
- landing/content.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- reconcile.ts
- [slug]/page.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- seed.ts
- vocabulary-form.tsx
- final-deployment/manifest.json
- billing/format.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- useTranslations
- video-lessons-grid.tsx
- sync-local-content.mjs
- cn
- edit-curriculum-level-dialog.tsx
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
- banner-image.ts
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
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
- action-guards.ts
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
- local/repository.ts
- period.ts
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- getServerTranslator
- Search engine visibility
- app/page.tsx
- utils.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 201 edges
2. `cn()` - 173 edges
3. `getDataRepository()` - 133 edges
4. `DataRepository` - 110 edges
5. `Button` - 62 edges
6. `resolveMessage()` - 52 edges
7. `revalidateAppContent()` - 46 edges
8. `Badge()` - 40 edges
9. `Lesson` - 38 edges
10. `getServerTranslator()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/sign-up/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/banners/page.tsx → lib/i18n/metadata.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/subscription/page.tsx → lib/i18n/metadata.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (158 total, 57 thin omitted)

### Community 0 - "blog.ts"
Cohesion: 0.22
Nodes (10): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogPostEditor(), BlogPostList() (+2 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.20
Nodes (17): dynamic, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne() (+9 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (19): BlogPost, BlogPostInput, AuthUser, DataRepository, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle (+11 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (21): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+13 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.06
Nodes (47): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+39 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.12
Nodes (19): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie() (+11 more)

### Community 7 - "Lesson"
Cohesion: 0.10
Nodes (24): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+16 more)

### Community 8 - "button.tsx"
Cohesion: 0.17
Nodes (18): ACCEPTED_TYPES, AdminLanguagesPageView(), LanguageManagementPanel(), ConfirmActionDialog(), handleConfirm(), ContactViewProps, AlertDialogAction, AlertDialogCancel (+10 more)

### Community 9 - "revalidateAppContent"
Cohesion: 0.13
Nodes (28): createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), setLandingLanguageVisibilityAction(), createLesson(), deleteLesson() (+20 more)

### Community 10 - "types/index.ts"
Cohesion: 0.08
Nodes (33): LessonsTable(), AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build() (+25 more)

### Community 11 - "quiz-form.tsx"
Cohesion: 0.07
Nodes (42): submitQuizAction(), PageProps, QuizPage(), buildInitialFeedback(), OPTION_LABELS, QuestionFeedback, QuizForm(), lockAnswer() (+34 more)

### Community 12 - "supabase/repository.ts"
Cohesion: 0.21
Nodes (8): DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS, PLAN_TEMPLATES, PlanTemplate, createClient(), Database, SubscriptionPageContentRow

### Community 13 - "subscription-view.tsx"
Cohesion: 0.11
Nodes (19): BandExamCard, BandExamsSection(), ComingSoonLanguage(), CourseLevelAccordion(), LearnLanguageView(), BannerCarousel(), FlagIcon(), FLAGS (+11 more)

### Community 14 - "user-management-panel.tsx"
Cohesion: 0.14
Nodes (29): LANDMARK_LABELS, LANGUAGE_LABELS, Draft, ToggleRow(), PERMISSION_ROWS, getInitials(), UserManagementPanel(), LANGUAGE_LABEL_KEYS (+21 more)

### Community 15 - "pricing.ts"
Cohesion: 0.16
Nodes (20): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+12 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "LanguageSlug"
Cohesion: 0.16
Nodes (11): LandingCourse, LOCALES, LanguageSlug, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS (+3 more)

### Community 18 - "actions/content.ts"
Cohesion: 0.19
Nodes (19): createContentGrammar(), LessonPage(), attachGrammarPages(), deleteObject(), deleteObjects(), getBucket(), getClient(), isObjectStorageConfigured() (+11 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.15
Nodes (16): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+8 more)

### Community 20 - "[category]/page.tsx"
Cohesion: 0.08
Nodes (28): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, LanguageCoursePage(), getLanguageWithAvailability() (+20 more)

### Community 21 - "billing-settings-form.tsx"
Cohesion: 0.28
Nodes (8): ManagedUser, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 22 - "content-form-panels.tsx"
Cohesion: 0.13
Nodes (26): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), submit(), GrammarEntry, GrammarEntryFields() (+18 more)

### Community 23 - "learn-category-view.tsx"
Cohesion: 0.13
Nodes (12): VocabularyManager(), LearnCategoryView(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonViewProps, QuizTabContent() (+4 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "[provider]/route.ts"
Cohesion: 0.36
Nodes (9): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), failLocalPayment(), settleLocalPayment() (+1 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+17 more)

### Community 29 - "getDataRepository"
Cohesion: 0.13
Nodes (27): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), saveGrammarReadingProgress() (+19 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.24
Nodes (12): messages, createTranslator(), getNestedValue(), interpolate(), AppLocale, DeepStringRecord, Join, MessageKey (+4 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "locale-provider.tsx"
Cohesion: 0.14
Nodes (16): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), QuizSubmittedBanner(), StatCard(), UserDashboard(), LocaleContext (+8 more)

### Community 33 - "curriculum/types.ts"
Cohesion: 0.09
Nodes (36): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), AddCurriculumLevelDialog(), onSubmit() (+28 more)

### Community 34 - "isLocalDataMode"
Cohesion: 0.34
Nodes (10): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), isLocalDataMode() (+2 more)

### Community 35 - "data-source.ts"
Cohesion: 0.32
Nodes (6): DataSource, getDataSource(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 36 - "stripe/route.ts"
Cohesion: 0.33
Nodes (4): dynamic, POST(), BODY, verifyStripeWebhook()

### Community 37 - "admin-schemas.ts"
Cohesion: 0.10
Nodes (26): QuizContentPanel(), submit(), VideoContentPanel(), submit(), VocabularyContentPanel(), submit(), VocabularyEditDialog(), onSubmit() (+18 more)

### Community 38 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "grammar-form.tsx"
Cohesion: 0.33
Nodes (6): GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), createGrammarRuleSchema(), GrammarRuleValues

### Community 41 - "level-category-grid.tsx"
Cohesion: 0.14
Nodes (21): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnLevelView() (+13 more)

### Community 42 - "resolveMessage"
Cohesion: 0.10
Nodes (20): BillingSettingsForm(), handleRefreshRate(), onSubmit(), runAction(), EditCurriculumLevelDialog(), onSubmit(), LessonEditDialog(), onSubmit() (+12 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (46): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+38 more)

### Community 44 - "landing/content.ts"
Cohesion: 0.33
Nodes (5): en, fa, it, LANDING_COPY, LandingCopy

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.09
Nodes (25): fetchAdminDashboardData(), EnrichedQuiz, fetchEnrichedQuizzes(), fetchQuizManagementStats(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel() (+17 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "reconcile.ts"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 49 - "[slug]/page.tsx"
Cohesion: 0.06
Nodes (39): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+31 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "seed.ts"
Cohesion: 0.14
Nodes (19): DevModeBanner(), DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, commitStore(), lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase (+11 more)

### Community 52 - "vocabulary-form.tsx"
Cohesion: 0.40
Nodes (4): LessonPicker(), VocabularyForm(), onSubmit(), VocabularyValues

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "billing/format.ts"
Cohesion: 0.60
Nodes (4): formatPaidAmount(), formatRialAsToman(), LOCALE_TAGS, rialToToman()

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "useTranslations"
Cohesion: 0.07
Nodes (29): AdminAccountingPageView(), AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), DeleteConfirmDialog(), handleConfirm(), GrammarManager(), GrammarTable() (+21 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "cn"
Cohesion: 0.13
Nodes (22): AccountingKpis(), Tile(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv(), RevenueChart() (+14 more)

### Community 63 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.28
Nodes (15): LOCALES, PERMISSION_ROWS, UserProfileDialog(), PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter() (+7 more)

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
Nodes (32): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+24 more)

### Community 84 - "banner-image.ts"
Cohesion: 0.24
Nodes (8): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature(), SIGNATURE_CHECKS

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

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
Cohesion: 0.08
Nodes (26): LessonsMonitor(), LevelRow(), LessonsMonitorPageView(), SLOT_META, SlotSquare(), STATE_KEY, CONTENT_CATEGORIES, ContentCategorySlug (+18 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "action-guards.ts"
Cohesion: 0.16
Nodes (13): GuardFail, GuardOk, requireAdminAction(), getAuthUser, getProfileById, ADMIN_ROLE_SLUGS, isRoleSlug(), ROLE_DEFINITIONS (+5 more)

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

### Community 154 - "local/repository.ts"
Cohesion: 0.29
Nodes (10): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+2 more)

### Community 155 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 160 - "getServerTranslator"
Cohesion: 0.10
Nodes (34): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminPage(), generateMetadata(), AdminLessonsMonitorPage() (+26 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 163 - "app/page.tsx"
Cohesion: 0.17
Nodes (14): FLAG_CODE, generateMetadata(), Home(), Landing(), useLocale(), getServerLocale(), getLandingCopy(), getCourseDecks() (+6 more)

### Community 165 - "utils.ts"
Cohesion: 0.17
Nodes (10): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminQuizzesPageView(), CONTENT_TYPES, CreateContentSection(), stepForJump(), Badge() (+2 more)

## Knowledge Gaps
- **495 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+490 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **57 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `actions/auth.ts`, `button.tsx`, `revalidateAppContent`, `types/index.ts`, `quiz-form.tsx`, `subscription-view.tsx`, `user-management-panel.tsx`, `billing-settings-form.tsx`, `content-form-panels.tsx`, `learn-category-view.tsx`, `locale-provider.tsx`, `curriculum/types.ts`, `app/page.tsx`, `utils.ts`, `admin-schemas.ts`, `AdminDashboard`, `grammar-form.tsx`, `level-category-grid.tsx`, `resolveMessage`, `admin.ts`, `vocabulary-form.tsx`, `video-lessons-grid.tsx`, `cn`, `edit-curriculum-level-dialog.tsx`, `BannerUploadForm`, `lessons-monitor.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `getServerTranslator`, `blog.ts`, `curriculum/types.ts`, `isLocalDataMode`, `app-shell.tsx`, `actions/auth.ts`, `app/page.tsx`, `data-source.ts`, `postgres/repository.ts`, `revalidateAppContent`, `quiz-form.tsx`, `admin.ts`, `[slug]/page.tsx`, `actions/content.ts`, `[category]/page.tsx`, `[provider]/route.ts`, `action-guards.ts`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `blog.ts`, `app-shell.tsx`, `app/layout.tsx`, `button.tsx`, `quiz-form.tsx`, `subscription-view.tsx`, `user-management-panel.tsx`, `billing-settings-form.tsx`, `content-form-panels.tsx`, `locale-provider.tsx`, `curriculum/types.ts`, `utils.ts`, `level-category-grid.tsx`, `[slug]/page.tsx`, `useTranslations`, `edit-curriculum-level-dialog.tsx`, `BannerUploadForm`, `sections.tsx`, `lessons-monitor.tsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _495 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03081232492997199 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._
- **Should `app-shell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06588235294117648 - nodes in this community are weakly interconnected._