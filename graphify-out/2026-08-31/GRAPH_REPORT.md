# Graph Report - cursor P  (2026-08-31)

## Corpus Check
- 414 files · ~208,999 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2018 nodes · 5992 edges · 146 communities (95 shown, 51 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28846b0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- button.tsx
- curriculum/types.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- quizzes-table.tsx
- types/index.ts
- useTranslations
- admin.ts
- billing/accounting.ts
- getDataRepository
- fx-rate/route.ts
- [quiz_id]/page.tsx
- seed.ts
- subscription-plan-cards.tsx
- 001_app_schema.sql
- quiz-management/types.ts
- server-locale.ts
- providers/index.ts
- [language]/page.tsx
- user-management-panel.tsx
- landing-page.tsx
- my-subscriptions-card.tsx
- schema.sql
- compilerOptions
- requireSuperAdminAction
- devDependencies
- dependencies
- createPageMetadata
- subscription-view.tsx
- components.json
- delete-confirm-dialog.tsx
- checkout-dialog.tsx
- admin-subscription-page-view.tsx
- data-source.ts
- [category]/page.tsx
- getServerTranslator
- data/repository.ts
- page-skeletons.tsx
- requireAdmin
- local-session.ts
- postgres/repository.ts
- user-row-actions.tsx
- badge.tsx
- quiz-management-table.tsx
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- local/repository.ts
- curriculum-levels.ts
- action-guards.ts
- actions/quiz.ts
- app/layout.tsx
- final-deployment/manifest.json
- reconcile.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- cn
- video-embed.ts
- sync-local-content.mjs
- PaymentSettings
- blog.ts
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
- data/index.ts
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
- store.ts
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
- admin-accounting-page-view.tsx
- entitlements/schema.test.ts
- user-quiz-attempts-panel.tsx
- graphify reference: query, path, explain
- 004_landing_and_blog.sql
- categories.ts
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

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 209 edges
2. `cn()` - 161 edges
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
- `AboutPage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/about/page.tsx → lib/data/index.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/accounting/page.tsx → lib/i18n/metadata.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/banners/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (146 total, 51 thin omitted)

### Community 0 - "button.tsx"
Cohesion: 0.06
Nodes (113): BillingSettingsForm(), handleRefreshRate(), onSubmit(), ACCEPTED_TYPES, emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel() (+105 more)

### Community 1 - "curriculum/types.ts"
Cohesion: 0.12
Nodes (33): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS (+25 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): BlogPost, DataRepository, GrammarRule, QuizQuestion, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (11): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+3 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.08
Nodes (34): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+26 more)

### Community 6 - "quizzes-table.tsx"
Cohesion: 0.27
Nodes (15): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), pluralize(), QuizzesTable(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable() (+7 more)

### Community 7 - "types/index.ts"
Cohesion: 0.11
Nodes (23): LessonPage(), PageProps, LessonView(), LessonViewProps, ContinueLearningProgress, resolveContinueLearningPath(), italian, languages (+15 more)

### Community 8 - "useTranslations"
Cohesion: 0.11
Nodes (27): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), ContentActionBar(), GrammarForm(), onSubmit(), GrammarManager() (+19 more)

### Community 9 - "admin.ts"
Cohesion: 0.07
Nodes (29): bannerSchema, BannerValues, BillingSettingsValues, contentGrammarSchema, contentVocabularySchema, ContentVocabularyValues, EntitlementSettingsValues, grammarRuleSchema (+21 more)

### Community 10 - "billing/accounting.ts"
Cohesion: 0.14
Nodes (15): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+7 more)

### Community 11 - "getDataRepository"
Cohesion: 0.21
Nodes (29): uploadBannerAction(), createContentGrammar(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson() (+21 more)

### Community 12 - "fx-rate/route.ts"
Cohesion: 0.22
Nodes (13): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+5 more)

### Community 13 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (34): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+26 more)

### Community 14 - "seed.ts"
Cohesion: 0.09
Nodes (18): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, CurriculumLevelOverrideRow, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+10 more)

### Community 15 - "subscription-plan-cards.tsx"
Cohesion: 0.16
Nodes (20): PLAN_ICONS, SubscriptionPlanCards(), pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial() (+12 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "quiz-management/types.ts"
Cohesion: 0.15
Nodes (21): fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults() (+13 more)

### Community 18 - "server-locale.ts"
Cohesion: 0.21
Nodes (15): isAppLocale(), LOCALES, messages, getServerLocale(), createTranslator(), getNestedValue(), interpolate(), AppLocale (+7 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.14
Nodes (16): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, CheckoutRequest, CheckoutResponse, PaymentProvider (+8 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.12
Nodes (16): LanguageCoursePage(), PageProps, BandExamCard, LearnLanguageView(), BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS (+8 more)

### Community 21 - "user-management-panel.tsx"
Cohesion: 0.17
Nodes (16): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), ADMIN_ROLE_SLUGS (+8 more)

### Community 22 - "landing-page.tsx"
Cohesion: 0.08
Nodes (33): AdminLandingPage(), metadata, Home(), LandingLanguagePanel(), toggle(), LandingPage(), box(), buildBrandenburg() (+25 more)

### Community 23 - "my-subscriptions-card.tsx"
Cohesion: 0.13
Nodes (15): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), LANGUAGE_LABEL_KEYS, LevelQuizRow, QuizSubmittedBanner(), StatCard(), UserDashboard() (+7 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "requireSuperAdminAction"
Cohesion: 0.14
Nodes (22): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), setLandingLanguageVisibilityAction() (+14 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, clsx, marked, dependencies, better-auth, clsx, marked, @radix-ui/react-dropdown-menu (+17 more)

### Community 29 - "createPageMetadata"
Cohesion: 0.13
Nodes (14): AboutPage(), generateMetadata(), generateMetadata(), generateMetadata(), ContactPage(), generateMetadata(), generateMetadata(), generateMetadata() (+6 more)

### Community 30 - "subscription-view.tsx"
Cohesion: 0.19
Nodes (16): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), SubscriptionView(), SubscriptionViewProps (+8 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "delete-confirm-dialog.tsx"
Cohesion: 0.32
Nodes (11): ConfirmActionDialog(), handleConfirm(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 33 - "checkout-dialog.tsx"
Cohesion: 0.17
Nodes (17): BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart(), CheckoutDialog(), handlePay(), PROVIDER_ICONS (+9 more)

### Community 34 - "admin-subscription-page-view.tsx"
Cohesion: 0.17
Nodes (8): AdminSubscriptionPageView(), EntitlementSettingsPanel(), onSubmit(), discountedPrice(), SubscriptionPlanList(), draftFrom(), TierCapabilitiesPanel(), save()

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (16): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+8 more)

### Community 36 - "[category]/page.tsx"
Cohesion: 0.22
Nodes (14): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, getLanguageWithAvailability(), getLanguage() (+6 more)

### Community 37 - "getServerTranslator"
Cohesion: 0.09
Nodes (23): AdminPage(), AdminQuizzesPage(), generateMetadata(), DashboardPage(), generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata() (+15 more)

### Community 38 - "data/repository.ts"
Cohesion: 0.11
Nodes (10): BlogPostInput, AuthUser, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, Banner, Profile (+2 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "requireAdmin"
Cohesion: 0.13
Nodes (17): AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata (+9 more)

### Community 41 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 42 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 43 - "user-row-actions.tsx"
Cohesion: 0.26
Nodes (7): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserStatus(), ChangeRoleDialog(), handleSave(), PendingActionType, UserRowActions()

### Community 44 - "badge.tsx"
Cohesion: 0.14
Nodes (23): BannerManagementPanel(), ContentFormPanel(), LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), CONTENT_TYPES, Draft (+15 more)

### Community 45 - "quiz-management-table.tsx"
Cohesion: 0.17
Nodes (8): LessonsTable(), CreateContentSection(), QuizManagementTable(), renderStats(), toggleStatus(), EnrichedQuiz, getQuizAttemptStats(), UserQuizAttempt

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "local/repository.ts"
Cohesion: 0.13
Nodes (23): dynamic, GET(), markFailed(), redirectToResult(), settle(), SubscriptionsTable(), addBillingMonths(), BillingPeriod (+15 more)

### Community 49 - "curriculum-levels.ts"
Cohesion: 0.31
Nodes (12): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+4 more)

### Community 50 - "action-guards.ts"
Cohesion: 0.25
Nodes (6): GuardFail, GuardOk, requireAdminAction(), getAuthUser, getProfileById, RoleSlug

### Community 51 - "actions/quiz.ts"
Cohesion: 1.00
Nodes (3): submitQuizAction(), buildQuizAttemptAnswersJson(), gradeAnswer()

### Community 52 - "app/layout.tsx"
Cohesion: 0.14
Nodes (16): inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readStoredLocale() (+8 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "reconcile.ts"
Cohesion: 0.27
Nodes (6): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "cn"
Cohesion: 0.08
Nodes (30): PlanActiveToggle(), toggle(), LaparliLogo(), LandingHeader(), LanguageSwitcher(), BandExamsSection(), QuizCard(), BannerCarousel() (+22 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "PaymentSettings"
Cohesion: 0.11
Nodes (14): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+6 more)

### Community 62 - "blog.ts"
Cohesion: 0.12
Nodes (20): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), dynamic, GET() (+12 more)

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

### Community 79 - "data/index.ts"
Cohesion: 0.14
Nodes (17): BlogIndexPage(), metadata, BlogPostPage(), generateMetadata(), Props, robots(), dynamic, revalidate (+9 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "curriculum/languages.ts"
Cohesion: 0.15
Nodes (13): ENGLISH_LEVELS, GERMAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES, CATEGORY_DEFINITIONS, LANGUAGES, getBandFromCode(), groupLevelsByBand() (+5 more)

### Community 94 - "store.ts"
Cohesion: 0.21
Nodes (14): DevModeBanner(), commitStore(), LOCAL_SEED, LocalDatabase, backfillMissingCollections(), backfillNewRowFields(), cloneSeed(), DATA_DIR (+6 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "admin-accounting-page-view.tsx"
Cohesion: 0.36
Nodes (6): AccountingKpis(), Tile(), TabsContent, TabsList, TabsTrigger, AccountingSnapshot

### Community 126 - "user-quiz-attempts-panel.tsx"
Cohesion: 0.60
Nodes (4): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), UserQuizAttemptsPanel(), parseAttemptBreakdown()

### Community 127 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 128 - "004_landing_and_blog.sql"
Cohesion: 0.47
Nodes (5): public.blog_categories, public.blog_post_categories, public.blog_posts, public.landing_language_settings, public.profiles

### Community 129 - "categories.ts"
Cohesion: 0.33
Nodes (5): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, LevelSlug

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

## Knowledge Gaps
- **435 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+430 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `button.tsx`, `curriculum/types.ts`, `app-shell.tsx`, `actions/auth.ts`, `quizzes-table.tsx`, `types/index.ts`, `[quiz_id]/page.tsx`, `subscription-plan-cards.tsx`, `[language]/page.tsx`, `user-management-panel.tsx`, `landing-page.tsx`, `my-subscriptions-card.tsx`, `requireSuperAdminAction`, `createPageMetadata`, `subscription-view.tsx`, `delete-confirm-dialog.tsx`, `checkout-dialog.tsx`, `admin-subscription-page-view.tsx`, `getServerTranslator`, `requireAdmin`, `user-row-actions.tsx`, `badge.tsx`, `quiz-management-table.tsx`, `local/repository.ts`, `cn`, `AdminDashboard`, `BannerUploadForm`, `admin-accounting-page-view.tsx`, `user-quiz-attempts-panel.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `button.tsx`, `curriculum/types.ts`, `app-shell.tsx`, `quizzes-table.tsx`, `[quiz_id]/page.tsx`, `subscription-plan-cards.tsx`, `user-management-panel.tsx`, `landing-page.tsx`, `my-subscriptions-card.tsx`, `subscription-view.tsx`, `delete-confirm-dialog.tsx`, `checkout-dialog.tsx`, `admin-subscription-page-view.tsx`, `badge.tsx`, `quiz-management-table.tsx`, `local/repository.ts`, `app/layout.tsx`, `blog.ts`, `BannerUploadForm`, `data/index.ts`, `admin-accounting-page-view.tsx`, `user-quiz-attempts-panel.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `app-shell.tsx`, `actions/auth.ts`, `types/index.ts`, `admin.ts`, `fx-rate/route.ts`, `[quiz_id]/page.tsx`, `[language]/page.tsx`, `landing-page.tsx`, `requireSuperAdminAction`, `createPageMetadata`, `subscription-view.tsx`, `data-source.ts`, `[category]/page.tsx`, `getServerTranslator`, `requireAdmin`, `postgres/repository.ts`, `user-row-actions.tsx`, `local/repository.ts`, `curriculum-levels.ts`, `action-guards.ts`, `actions/quiz.ts`, `blog.ts`, `data/index.ts`, `user-quiz-attempts-panel.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _435 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.055595864320696534 - nodes in this community are weakly interconnected._
- **Should `curriculum/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11649659863945579 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03989071038251366 - nodes in this community are weakly interconnected._