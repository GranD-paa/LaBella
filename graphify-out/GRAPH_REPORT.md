# Graph Report - cursor P  (2026-09-06)

## Corpus Check
- 436 files · ~325,108 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2190 nodes · 6306 edges · 158 communities (100 shown, 58 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0df4e6e9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [category]/page.tsx
- postgres/repository.ts
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
- seed.ts
- entitlement-settings-panel.tsx
- badge.tsx
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- actions/content.ts
- providers/index.ts
- [language]/page.tsx
- quiz-form.tsx
- billing-settings-form.tsx
- useTranslations
- schema.sql
- compilerOptions
- data/repository.ts
- devDependencies
- dependencies
- app/page.tsx
- i18n/types.ts
- components.json
- cn
- curriculum/languages.ts
- isLocalDataMode
- curriculum/types.ts
- getDataRepository
- content-form-panels.tsx
- AdminDashboard
- page-skeletons.tsx
- data-source.ts
- level-category-grid.tsx
- resolveMessage
- admin.ts
- requireSuperAdminAction
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- checkout.ts
- [slug]/page.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- store.ts
- storage/index.ts
- final-deployment/manifest.json
- refresh.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- index.test.ts
- video-embed.ts
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- landing/content.ts
- subscription-plan-edit-dialog.tsx
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
- dashboard-data.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- admin-password.mjs
- plans.ts
- content-coverage.ts
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

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 203 edges
2. `cn()` - 173 edges
3. `getDataRepository()` - 139 edges
4. `DataRepository` - 111 edges
5. `Button` - 62 edges
6. `resolveMessage()` - 52 edges
7. `revalidateAppContent()` - 48 edges
8. `Badge()` - 41 edges
9. `Lesson` - 38 edges
10. `getServerTranslator()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/sign-up/page.tsx → lib/i18n/metadata.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts

## Import Cycles
- None detected.

## Communities (158 total, 58 thin omitted)

### Community 0 - "[category]/page.tsx"
Cohesion: 0.14
Nodes (19): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LessonPage() (+11 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.20
Nodes (17): dynamic, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne() (+9 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): DataRepository, getLandingPricing(), GrammarRule, QuizQuestion, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (20): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+12 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.05
Nodes (53): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+45 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.19
Nodes (10): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+2 more)

### Community 7 - "Lesson"
Cohesion: 0.13
Nodes (19): LessonsTable(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+11 more)

### Community 8 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.37
Nodes (10): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+2 more)

### Community 9 - "revalidateAppContent"
Cohesion: 0.21
Nodes (18): createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson() (+10 more)

### Community 10 - "types/index.ts"
Cohesion: 0.16
Nodes (18): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+10 more)

### Community 11 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (38): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), generateMetadata(), PageProps, QuizPage(), UserQuizAttemptsPanel(), buildInitialFeedback(), QuizForm() (+30 more)

### Community 12 - "seed.ts"
Cohesion: 0.09
Nodes (18): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+10 more)

### Community 13 - "entitlement-settings-panel.tsx"
Cohesion: 0.16
Nodes (11): AdminSubscriptionPageView(), EntitlementSettingsPanel(), discountedPrice(), SubscriptionPlanList(), Draft, draftFrom(), TierCapabilitiesPanel(), save() (+3 more)

### Community 14 - "badge.tsx"
Cohesion: 0.14
Nodes (32): DeleteConfirmDialog(), handleConfirm(), LANDMARK_LABELS, LANGUAGE_LABELS, RoleBadge(), PERMISSION_ROWS, StatusBadge(), getInitials() (+24 more)

### Community 15 - "pricing.ts"
Cohesion: 0.16
Nodes (21): SubscriptionPlanCards(), pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp() (+13 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LOCALES, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS, en (+2 more)

### Community 18 - "actions/content.ts"
Cohesion: 0.15
Nodes (20): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, ContentCategorySlug, GRAMMAR_PAGES_PER_REQUEST, RenderGrammarPagesResult (+12 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.15
Nodes (14): generateMetadata(), LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED (+6 more)

### Community 21 - "quiz-form.tsx"
Cohesion: 0.13
Nodes (18): OPTION_KEYS, WizardQuestionFields(), ManagedUser, OPTION_LABELS, QuestionFeedback, Label, labelVariants, RadioGroup (+10 more)

### Community 22 - "billing-settings-form.tsx"
Cohesion: 0.34
Nodes (11): FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue (+3 more)

### Community 23 - "useTranslations"
Cohesion: 0.06
Nodes (47): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), ACCEPTED_TYPES, GrammarManager() (+39 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "data/repository.ts"
Cohesion: 0.08
Nodes (13): BlogCategory, BlogPost, BlogPostInput, BlogPostStatus, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle (+5 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+17 more)

### Community 29 - "app/page.tsx"
Cohesion: 0.13
Nodes (20): AdminLandingPage(), metadata, FLAG_CODE, generateMetadata(), Home(), LandingLanguagePanel(), toggle(), Landing() (+12 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.13
Nodes (24): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+16 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "cn"
Cohesion: 0.08
Nodes (38): SlotSquare(), PlanActiveToggle(), Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), QuizSubmittedBanner(), StatCard() (+30 more)

### Community 33 - "curriculum/languages.ts"
Cohesion: 0.14
Nodes (12): ENGLISH_LEVELS, GERMAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES, CATEGORY_DEFINITIONS, LANGUAGES, CurriculumLevelOverrideRow, getBandFromCode() (+4 more)

### Community 34 - "isLocalDataMode"
Cohesion: 0.21
Nodes (17): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+9 more)

### Community 35 - "curriculum/types.ts"
Cohesion: 0.14
Nodes (15): LessonsMonitor(), LevelRow(), LessonsMonitorPageView(), SLOT_META, STATE_KEY, AdminQuizzesPageView(), CONTENT_TYPES, CreateContentSection() (+7 more)

### Community 36 - "getDataRepository"
Cohesion: 0.11
Nodes (29): cancelSubscriptionAction(), recoverMyPendingPaymentsAction(), saveGrammarReadingProgress(), submitQuizAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+21 more)

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.08
Nodes (34): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+26 more)

### Community 38 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "data-source.ts"
Cohesion: 0.14
Nodes (17): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+9 more)

### Community 41 - "level-category-grid.tsx"
Cohesion: 0.13
Nodes (25): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView(), LearnLevelViewProps (+17 more)

### Community 42 - "resolveMessage"
Cohesion: 0.09
Nodes (24): BillingSettingsForm(), handleRefreshRate(), onSubmit(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), AddCurriculumLevelDialog() (+16 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (33): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), onSubmit(), BannerValues, BillingSettingsValues (+25 more)

### Community 44 - "requireSuperAdminAction"
Cohesion: 0.17
Nodes (19): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand() (+11 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.14
Nodes (21): EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+13 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "checkout.ts"
Cohesion: 0.13
Nodes (16): CheckoutResult, resolveOrigin(), startCheckoutAction(), handlePay(), getAvailableProviders(), getPaymentProvider(), ReconcileDeps, ReconcileOutcome (+8 more)

### Community 49 - "[slug]/page.tsx"
Cohesion: 0.09
Nodes (27): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+19 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "store.ts"
Cohesion: 0.18
Nodes (18): buildRecoveryDeps(), DevModeBanner(), commitStore(), failLocalPayment(), settleLocalPayment(), LOCAL_SEED, LocalDatabase, backfillMissingCollections() (+10 more)

### Community 52 - "storage/index.ts"
Cohesion: 0.36
Nodes (12): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), deleteObject(), deleteObjects(), getBucket() (+4 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "refresh.ts"
Cohesion: 0.17
Nodes (9): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+1 more)

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.13
Nodes (23): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv() (+15 more)

### Community 62 - "landing/content.ts"
Cohesion: 0.33
Nodes (5): en, fa, it, LANDING_COPY, LandingCopy

### Community 63 - "subscription-plan-edit-dialog.tsx"
Cohesion: 0.31
Nodes (12): LOCALES, PERMISSION_ROWS, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader() (+4 more)

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

### Community 90 - "dashboard-data.ts"
Cohesion: 0.16
Nodes (9): ITALIAN_LEVELS, buildLearnerEngagementMetrics(), LearnerEngagementMetrics, AdminDashboardData, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats() (+1 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "admin-password.mjs"
Cohesion: 0.40
Nodes (3): [mode, email, password], names, pool

### Community 94 - "plans.ts"
Cohesion: 0.50
Nodes (3): SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

### Community 95 - "content-coverage.ts"
Cohesion: 0.14
Nodes (15): add(), BandCoverage, buildContentCoverage(), ContentCoverageInput, COVERAGE_SLOTS, CoverageSlot, CoverageState, emptyTally() (+7 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "action-guards.ts"
Cohesion: 0.09
Nodes (23): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), UserProfileDialog(), PendingActionType (+15 more)

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
Cohesion: 0.24
Nodes (11): SubscriptionsTable(), addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES (+3 more)

### Community 160 - "getServerTranslator"
Cohesion: 0.11
Nodes (36): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogPage(), metadata, AdminLanguagesPage() (+28 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

## Knowledge Gaps
- **497 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+492 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `actions/auth.ts`, `Lesson`, `edit-curriculum-level-dialog.tsx`, `[quiz_id]/page.tsx`, `entitlement-settings-panel.tsx`, `badge.tsx`, `pricing.ts`, `actions/content.ts`, `quiz-form.tsx`, `billing-settings-form.tsx`, `period.ts`, `app/page.tsx`, `cn`, `curriculum/types.ts`, `getDataRepository`, `content-form-panels.tsx`, `AdminDashboard`, `level-category-grid.tsx`, `resolveMessage`, `admin-accounting-page-view.tsx`, `subscription-plan-edit-dialog.tsx`, `BannerUploadForm`, `action-guards.ts`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `app/layout.tsx`, `edit-curriculum-level-dialog.tsx`, `[quiz_id]/page.tsx`, `entitlement-settings-panel.tsx`, `badge.tsx`, `pricing.ts`, `quiz-form.tsx`, `billing-settings-form.tsx`, `useTranslations`, `period.ts`, `curriculum/types.ts`, `getDataRepository`, `level-category-grid.tsx`, `[slug]/page.tsx`, `admin-accounting-page-view.tsx`, `subscription-plan-edit-dialog.tsx`, `BannerUploadForm`, `sections.tsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `getServerTranslator`, `[category]/page.tsx`, `isLocalDataMode`, `postgres/repository.ts`, `app-shell.tsx`, `actions/auth.ts`, `data-source.ts`, `revalidateAppContent`, `[quiz_id]/page.tsx`, `requireSuperAdminAction`, `admin.ts`, `checkout.ts`, `[slug]/page.tsx`, `actions/content.ts`, `storage/index.ts`, `[language]/page.tsx`, `action-guards.ts`, `app/page.tsx`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _497 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `[category]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03860391327340032 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._