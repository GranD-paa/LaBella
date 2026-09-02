# Graph Report - cursor P  (2026-09-02)

## Corpus Check
- 419 files · ~313,138 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2084 nodes · 6190 edges · 160 communities (107 shown, 53 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `06e88b92`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- requireSuperAdminAction
- curriculum/types.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- Lesson
- dashboard-data.ts
- language-switcher.tsx
- admin.ts
- types/index.ts
- local/repository.ts
- fx-rate/route.ts
- attempt-payload.ts
- supabase/repository.ts
- subscription-plan-cards.tsx
- 001_app_schema.sql
- hero.tsx
- app/layout.tsx
- providers/index.ts
- entitlements/index.ts
- resolveMessage
- quiz-form.tsx
- useTranslations
- schema.sql
- compilerOptions
- action-guards.ts
- devDependencies
- dependencies
- curriculum-levels.ts
- locale-provider.tsx
- components.json
- UserQuizAttempt
- user-row-actions.tsx
- store.ts
- data-source.ts
- checkout.ts
- content-form-panels.tsx
- button.tsx
- page-skeletons.tsx
- data/index.ts
- cn
- postgres/repository.ts
- PaymentSettings
- badge.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- user-management-panel.tsx
- actions/quiz.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- my-subscriptions-card.tsx
- final-deployment/manifest.json
- lesson-view.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- edit-curriculum-level-dialog.tsx
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
- @radix-ui/react-avatar
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- sonner
- What You Must Do When Invoked
- @supabase/supabase-js
- helpers.ts
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
- isLocalDataMode
- period.ts
- getDataRepository
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
- admin-quizzes-page-view.tsx
- billing-settings-form.tsx
- pricing-section.tsx
- [quiz_id]/page.tsx
- blog.ts
- quiz-edit-dialog.tsx
- landing/page.tsx
- tier-capabilities-panel.tsx
- CurriculumLanguage
- subscription-view.tsx
- decks.ts
- band-exams.test.ts
- resolve-navigation.ts
- auth-layout-panel.tsx

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
- `AboutPage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/about/page.tsx → lib/data/index.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/layout.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (160 total, 53 thin omitted)

### Community 0 - "requireSuperAdminAction"
Cohesion: 0.18
Nodes (18): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+10 more)

### Community 1 - "curriculum/types.ts"
Cohesion: 0.22
Nodes (13): CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LevelCategoryGridProps, CATEGORY_ACCENTS, CATEGORY_ICON_BG, CATEGORY_ICON_TINT (+5 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): BlogPost, DataRepository, GrammarRule, Payment, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.09
Nodes (29): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signOutAction(), signUpAction(), signUpWithPostgres(), { GET, POST } (+21 more)

### Community 6 - "Lesson"
Cohesion: 0.21
Nodes (17): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LessonsTable(), pluralize(), QuizzesTable(), getScoreBadgeClass(), QuizAttemptHistoryRow (+9 more)

### Community 7 - "dashboard-data.ts"
Cohesion: 0.14
Nodes (14): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), BuildContinueLearningInput (+6 more)

### Community 8 - "language-switcher.tsx"
Cohesion: 0.17
Nodes (14): AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeaderLeft(), LanguageSwitcher(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem (+6 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (32): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), onSubmit(), BannerValues, BillingSettingsValues (+24 more)

### Community 10 - "types/index.ts"
Cohesion: 0.16
Nodes (17): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+9 more)

### Community 11 - "local/repository.ts"
Cohesion: 0.21
Nodes (13): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+5 more)

### Community 12 - "fx-rate/route.ts"
Cohesion: 0.18
Nodes (13): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, POST(), FxRateStore (+5 more)

### Community 13 - "attempt-payload.ts"
Cohesion: 0.12
Nodes (20): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), advanceLearningAfterQuiz(), getNextLevelSlug(), buildQuizAttemptAnswersJson() (+12 more)

### Community 14 - "supabase/repository.ts"
Cohesion: 0.20
Nodes (6): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, createClient(), Database, Json, LocalizedText

### Community 15 - "subscription-plan-cards.tsx"
Cohesion: 0.07
Nodes (43): PaymentsLedger(), handleExport(), toCsv(), RevenueChart(), CheckoutDialog(), handlePay(), PLAN_ICONS, SubscriptionPlanCards() (+35 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.18
Nodes (9): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+1 more)

### Community 18 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+2 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.17
Nodes (15): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+7 more)

### Community 20 - "entitlements/index.ts"
Cohesion: 0.15
Nodes (10): BandExam, ALL_UNLOCKED, cefrBandOf(), Entitlement, EntitlementGate, isFreeBand(), resolveEntitlement(), TIERS (+2 more)

### Community 21 - "resolveMessage"
Cohesion: 0.09
Nodes (24): BillingSettingsForm(), handleRefreshRate(), onSubmit(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), LessonEditDialog() (+16 more)

### Community 22 - "quiz-form.tsx"
Cohesion: 0.18
Nodes (25): ACCEPTED_TYPES, OPTION_KEYS, OPTION_KEYS, OPTION_KEYS, ContactViewProps, OPTION_LABELS, QuestionFeedback, FormControl (+17 more)

### Community 23 - "useTranslations"
Cohesion: 0.10
Nodes (27): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), SubscriptionsTable(), AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel() (+19 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "action-guards.ts"
Cohesion: 0.24
Nodes (8): cancelSubscriptionAction(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser, getProfileById, RoleSlug

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, clsx, marked, dependencies, better-auth, clsx, marked, @radix-ui/react-dropdown-menu (+17 more)

### Community 29 - "curriculum-levels.ts"
Cohesion: 0.15
Nodes (22): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), AddCurriculumLevelDialog() (+14 more)

### Community 30 - "locale-provider.tsx"
Cohesion: 0.16
Nodes (24): applyDocumentLocale(), LocaleContext, LocaleContextValue, LocaleProvider(), persistLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition() (+16 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "UserQuizAttempt"
Cohesion: 0.13
Nodes (7): buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats(), QuizQuestion, UserLearningState, UserQuizAttempt

### Community 33 - "user-row-actions.tsx"
Cohesion: 0.24
Nodes (8): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), PendingActionType, UserRowActions()

### Community 34 - "store.ts"
Cohesion: 0.19
Nodes (15): DevModeBanner(), createLocalRepository(), commitStore(), LOCAL_SEED, LocalDatabase, backfillMissingCollections(), backfillNewRowFields(), cloneSeed() (+7 more)

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (16): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+8 more)

### Community 36 - "checkout.ts"
Cohesion: 0.16
Nodes (13): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), dynamic, GET(), getAvailableProviders(), ReconcileDeps (+5 more)

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.10
Nodes (32): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel() (+24 more)

### Community 38 - "button.tsx"
Cohesion: 0.22
Nodes (18): LessonPicker(), emptyQuestion, QuizFormDialog(), onSubmit(), QuizQuestionFields(), LOCALES, PROVIDER_ICONS, PROVIDER_LABELS (+10 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "data/index.ts"
Cohesion: 0.05
Nodes (70): AboutPage(), generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata() (+62 more)

### Community 41 - "cn"
Cohesion: 0.09
Nodes (27): AdminSubscriptionPageView(), EntitlementSettingsPanel(), PlanActiveToggle(), ConfirmActionDialog(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BrandLogo() (+19 more)

### Community 42 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 43 - "PaymentSettings"
Cohesion: 0.12
Nodes (11): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+3 more)

### Community 44 - "badge.tsx"
Cohesion: 0.17
Nodes (20): LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), CONTENT_TYPES, discountedPrice(), SubscriptionPlanList(), PERMISSION_ROWS (+12 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.24
Nodes (9): ExtendedQuiz, ExtendedQuizQuestion, normalizeAnswer(), QuestionType, QUIZ_SECTIONS, QuizMetadata, QuizStatus, scoreWrittenAnswer() (+1 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "user-management-panel.tsx"
Cohesion: 0.16
Nodes (17): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel() (+9 more)

### Community 49 - "actions/quiz.ts"
Cohesion: 0.19
Nodes (12): LEVEL_EXAM_SECTION, entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator (+4 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.08
Nodes (22): BlogCategory, BlogPostInput, BlogPostStatus, CurriculumLevelOverrideRow, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, AuthUser (+14 more)

### Community 52 - "my-subscriptions-card.tsx"
Cohesion: 0.13
Nodes (15): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), LANGUAGE_LABEL_KEYS, LevelQuizRow, QuizSubmittedBanner(), StatCard(), UserDashboard() (+7 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "lesson-view.tsx"
Cohesion: 0.25
Nodes (10): ContinueLearningCard(), LearnLevelView(), LearnLevelViewProps, LevelCategoryGrid(), LessonView(), LessonViewProps, getLocalizedLanguageName(), getLocalizedLevel() (+2 more)

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
Cohesion: 0.21
Nodes (13): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), getCourseDecks(), LANDING_LANGUAGES, LandingLanguageDefinition (+5 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.37
Nodes (10): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+2 more)

### Community 62 - "[slug]/page.tsx"
Cohesion: 0.09
Nodes (26): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+18 more)

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
Cohesion: 0.23
Nodes (11): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+3 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "helpers.ts"
Cohesion: 0.30
Nodes (11): fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults() (+3 more)

### Community 94 - "curriculum/languages.ts"
Cohesion: 0.12
Nodes (14): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes() (+6 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "isLocalDataMode"
Cohesion: 0.33
Nodes (11): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), getPaymentProvider(), isLocalDataMode() (+3 more)

### Community 125 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 126 - "getDataRepository"
Cohesion: 0.17
Nodes (32): createContentGrammar(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson() (+24 more)

### Community 127 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 128 - "004_landing_and_blog.sql"
Cohesion: 0.47
Nodes (5): public.blog_categories, public.blog_post_categories, public.blog_posts, public.landing_language_settings, public.profiles

### Community 129 - "landing.tsx"
Cohesion: 0.24
Nodes (13): LandingHero(), Landing(), PricingFallback(), PricingSection(), LandingDay(), LandingFeatures(), LandingFinal(), LandingHurdles() (+5 more)

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

### Community 146 - "admin-quizzes-page-view.tsx"
Cohesion: 0.15
Nodes (7): AdminQuizzesPageView(), CreateContentSection(), QuizManagementTable(), renderStats(), toggleStatus(), EnrichedQuiz, getQuizAttemptStats()

### Community 147 - "billing-settings-form.tsx"
Cohesion: 0.30
Nodes (8): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, AddCurriculumLevelValues

### Community 148 - "pricing-section.tsx"
Cohesion: 0.18
Nodes (10): Arrow(), Check(), Cross(), DAY_ICONS, LESSON_ICONS, SectionHead(), Price(), SegmentButton() (+2 more)

### Community 149 - "[quiz_id]/page.tsx"
Cohesion: 0.29
Nodes (8): generateMetadata(), PageProps, QuizPage(), NoQuestionsMessage(), QuizPageIntro(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 150 - "blog.ts"
Cohesion: 0.28
Nodes (8): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogPostEditor(), slugifyTitle()

### Community 151 - "quiz-edit-dialog.tsx"
Cohesion: 0.21
Nodes (13): emptyQuestion, pluralize(), QuizEditDialog(), handleAddQuestion(), handleEditQuestion(), handleTitleSave(), refreshAfterMutation(), startEditingQuestion() (+5 more)

### Community 152 - "landing/page.tsx"
Cohesion: 0.33
Nodes (5): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), getLandingLanguageToggles()

### Community 153 - "tier-capabilities-panel.tsx"
Cohesion: 0.28
Nodes (5): Draft, draftFrom(), TierCapabilitiesPanel(), save(), ToggleRow()

### Community 154 - "CurriculumLanguage"
Cohesion: 0.57
Nodes (4): ComingSoonLanguage(), CourseLevelAccordion(), CurriculumLanguage, CURRICULUM_MESSAGE_KEYS

### Community 155 - "subscription-view.tsx"
Cohesion: 0.27
Nodes (6): SubscriptionView(), SubscriptionViewProps, interpolateText(), BILLING_PERIOD_MONTHS, BillingCurrency, PaymentProviderSlug

### Community 156 - "decks.ts"
Cohesion: 0.29
Nodes (6): COURSE_ORDER, CourseDeck, DECKS, en, fa, it

### Community 158 - "resolve-navigation.ts"
Cohesion: 0.53
Nodes (5): findLevelByOrderNumber(), findLevelInLanguages(), getDefaultLanguageContext(), resolveLessonNavigation(), resolveLevelContext()

## Knowledge Gaps
- **462 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+457 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `requireSuperAdminAction`, `curriculum/types.ts`, `landing.tsx`, `Lesson`, `language-switcher.tsx`, `attempt-payload.ts`, `subscription-plan-cards.tsx`, `admin-quizzes-page-view.tsx`, `billing-settings-form.tsx`, `resolveMessage`, `quiz-form.tsx`, `quiz-edit-dialog.tsx`, `[quiz_id]/page.tsx`, `tier-capabilities-panel.tsx`, `CurriculumLanguage`, `subscription-view.tsx`, `curriculum-levels.ts`, `locale-provider.tsx`, `auth-layout-panel.tsx`, `user-row-actions.tsx`, `content-form-panels.tsx`, `button.tsx`, `data/index.ts`, `cn`, `badge.tsx`, `user-management-panel.tsx`, `my-subscriptions-card.tsx`, `lesson-view.tsx`, `video-lessons-grid.tsx`, `edit-curriculum-level-dialog.tsx`, `AdminDashboard`, `BannerUploadForm`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `requireSuperAdminAction`, `app-shell.tsx`, `actions/auth.ts`, `admin.ts`, `fx-rate/route.ts`, `attempt-payload.ts`, `[quiz_id]/page.tsx`, `blog.ts`, `landing/page.tsx`, `action-guards.ts`, `curriculum-levels.ts`, `user-row-actions.tsx`, `store.ts`, `data-source.ts`, `checkout.ts`, `data/index.ts`, `postgres/repository.ts`, `actions/quiz.ts`, `app/page.tsx`, `[slug]/page.tsx`, `isLocalDataMode`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `landing.tsx`, `curriculum/types.ts`, `Lesson`, `language-switcher.tsx`, `attempt-payload.ts`, `subscription-plan-cards.tsx`, `app/layout.tsx`, `admin-quizzes-page-view.tsx`, `pricing-section.tsx`, `billing-settings-form.tsx`, `quiz-form.tsx`, `useTranslations`, `blog.ts`, `tier-capabilities-panel.tsx`, `CurriculumLanguage`, `subscription-view.tsx`, `button.tsx`, `badge.tsx`, `user-management-panel.tsx`, `my-subscriptions-card.tsx`, `lesson-view.tsx`, `edit-curriculum-level-dialog.tsx`, `[slug]/page.tsx`, `BannerUploadForm`, `sections.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _462 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04415584415584416 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._
- **Should `app-shell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._