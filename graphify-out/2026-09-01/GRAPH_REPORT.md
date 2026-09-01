# Graph Report - cursor P  (2026-09-01)

## Corpus Check
- 417 files · ~212,267 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2061 nodes · 6070 edges · 146 communities (95 shown, 51 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `28846b0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- quiz-form.tsx
- level-category-grid.tsx
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- user-management-panel.tsx
- Lesson
- edit-curriculum-level-dialog.tsx
- admin.ts
- types/index.ts
- user-row-actions.tsx
- isLocalDataMode
- actions/quiz.ts
- seed.ts
- subscription-plan-cards.tsx
- 001_app_schema.sql
- quiz-management/types.ts
- server-locale.ts
- providers/index.ts
- [category]/page.tsx
- user-profile-dialog.tsx
- content-form-panels.tsx
- useTranslations
- schema.sql
- compilerOptions
- revalidateAppContent
- devDependencies
- dependencies
- curriculum-level-manager.tsx
- admin-subscription-page-view.tsx
- components.json
- cn
- admin-accounting-page-view.tsx
- resolveMessage
- data-source.ts
- action-guards.ts
- contact/page.tsx
- button.tsx
- page-skeletons.tsx
- getServerTranslator
- local-session.ts
- postgres/repository.ts
- Payment
- card.tsx
- lesson-form.tsx
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- local/repository.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- app/layout.tsx
- final-deployment/manifest.json
- subscription-view.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- badge.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- refresh.ts
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
- input.tsx
- period.ts
- getDataRepository
- graphify reference: query, path, explain
- 004_landing_and_blog.sql
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
- blog-post-list.tsx
- app/page.tsx
- [quiz_id]/page.tsx
- data/index.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 170 edges
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
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts

## Import Cycles
- None detected.

## Communities (146 total, 51 thin omitted)

### Community 0 - "quiz-form.tsx"
Cohesion: 0.20
Nodes (20): OPTION_KEYS, OPTION_KEYS, OPTION_KEYS, OPTION_LABELS, QuestionFeedback, FormControl, FormDescription, FormField() (+12 more)

### Community 1 - "level-category-grid.tsx"
Cohesion: 0.11
Nodes (28): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryHero() (+20 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (9): buildAchievements(), fetchUserDashboardData(), DataRepository, fetchQuizManagementStats(), GrammarRule, QuizQuestion, UserQuizAttempt, VideoLesson (+1 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (19): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+11 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.08
Nodes (32): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+24 more)

### Community 6 - "user-management-panel.tsx"
Cohesion: 0.32
Nodes (13): SubscriptionsTable(), DeleteConfirmDialog(), pluralize(), QuizzesTable(), getInitials(), UserManagementPanel(), Table, TableBody (+5 more)

### Community 7 - "Lesson"
Cohesion: 0.10
Nodes (24): QuizManager(), LESSONS, TEN_A1_LEVELS, ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes() (+16 more)

### Community 8 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.35
Nodes (11): EditCurriculumLevelDialog(), onSubmit(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (31): createContentGrammar(), createContentVideo(), createContentVocabulary(), BannerValues, billingSettingsSchema, BillingSettingsValues, contentGrammarSchema, contentVocabularySchema (+23 more)

### Community 10 - "types/index.ts"
Cohesion: 0.13
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 11 - "user-row-actions.tsx"
Cohesion: 0.24
Nodes (8): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), PendingActionType, UserRowActions()

### Community 12 - "isLocalDataMode"
Cohesion: 0.13
Nodes (23): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+15 more)

### Community 13 - "actions/quiz.ts"
Cohesion: 0.08
Nodes (31): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), advanceLearningAfterQuiz(), getNextLevelSlug(), buildQuizAttemptAnswersJson() (+23 more)

### Community 14 - "seed.ts"
Cohesion: 0.12
Nodes (17): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, createSupabaseRepository(), DEFAULT_SUBSCRIPTION_PAGE_CONTENT (+9 more)

### Community 15 - "subscription-plan-cards.tsx"
Cohesion: 0.10
Nodes (25): CheckoutDialog(), PLAN_ICONS, SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), BillingCurrency, centsToEur() (+17 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "quiz-management/types.ts"
Cohesion: 0.14
Nodes (22): BandExam, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+14 more)

### Community 18 - "server-locale.ts"
Cohesion: 0.15
Nodes (23): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale(), LOCALE_COOKIE_KEY (+15 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.11
Nodes (20): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+12 more)

### Community 20 - "[category]/page.tsx"
Cohesion: 0.09
Nodes (29): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+21 more)

### Community 21 - "user-profile-dialog.tsx"
Cohesion: 0.14
Nodes (16): RoleBadge(), StatusBadge(), ManagedUser, PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel(), AdminDashboardData, ADMIN_ROLE_SLUGS (+8 more)

### Community 22 - "content-form-panels.tsx"
Cohesion: 0.07
Nodes (40): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel() (+32 more)

### Community 23 - "useTranslations"
Cohesion: 0.07
Nodes (40): AdminContentHeader(), GrammarManager(), GrammarTable(), LanguageManagementPanel(), LessonsTable(), AdminQuizzesPageView(), CreateContentSection(), SubscriptionPlanEditDialog() (+32 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "revalidateAppContent"
Cohesion: 0.13
Nodes (28): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+20 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, clsx, marked, dependencies, better-auth, clsx, marked, @radix-ui/react-dropdown-menu (+17 more)

### Community 29 - "curriculum-level-manager.tsx"
Cohesion: 0.15
Nodes (22): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), AddCurriculumLevelDialog(), onSubmit() (+14 more)

### Community 30 - "admin-subscription-page-view.tsx"
Cohesion: 0.18
Nodes (7): AdminSubscriptionPageView(), EntitlementSettingsPanel(), discountedPrice(), SubscriptionPlanList(), draftFrom(), TierCapabilitiesPanel(), save()

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "cn"
Cohesion: 0.10
Nodes (23): QuizManagementTable(), renderStats(), toggleStatus(), PlanActiveToggle(), StatCard(), BrandLogo(), BrandMark(), Avatar (+15 more)

### Community 33 - "admin-accounting-page-view.tsx"
Cohesion: 0.18
Nodes (18): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), STATUS_STYLES (+10 more)

### Community 34 - "resolveMessage"
Cohesion: 0.13
Nodes (21): handleConfirm(), emptyQuestion, pluralize(), QuizEditDialog(), handleAddQuestion(), handleEditQuestion(), handleTitleSave(), refreshAfterMutation() (+13 more)

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (16): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+8 more)

### Community 36 - "action-guards.ts"
Cohesion: 0.24
Nodes (8): cancelSubscriptionAction(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser, getProfileById, RolePermissions

### Community 37 - "contact/page.tsx"
Cohesion: 0.40
Nodes (3): ContactPage(), generateMetadata(), ContactView()

### Community 38 - "button.tsx"
Cohesion: 0.25
Nodes (16): LessonPicker(), emptyQuestion, QuizQuestionFields(), LOCALES, PROVIDER_ICONS, PROVIDER_LABELS, Button, ButtonProps (+8 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "getServerTranslator"
Cohesion: 0.13
Nodes (23): AboutPage(), generateMetadata(), generateMetadata(), AdminPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), generateMetadata() (+15 more)

### Community 41 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 42 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 44 - "card.tsx"
Cohesion: 0.17
Nodes (19): LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES, Draft, ToggleRow(), PERMISSION_ROWS, LANGUAGE_LABEL_KEYS, LevelQuizRow (+11 more)

### Community 45 - "lesson-form.tsx"
Cohesion: 0.28
Nodes (6): LessonEditDialog(), onSubmit(), LessonForm(), onSubmit(), createLessonSchema(), LessonValues

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "local/repository.ts"
Cohesion: 0.14
Nodes (23): buildRecoveryDeps(), DevModeBanner(), matchesImageSignature(), SIGNATURE_CHECKS, ALLOWED_IMAGE_EXTENSIONS, BANNER_UPLOAD_DIR, createLocalRepository(), commitStore() (+15 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.09
Nodes (11): CurriculumLevelOverrideRow, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, Json, Banner, Profile (+3 more)

### Community 52 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+2 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "subscription-view.tsx"
Cohesion: 0.21
Nodes (12): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), SubscriptionView(), SubscriptionViewProps, getAvailableProviders() (+4 more)

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "badge.tsx"
Cohesion: 0.13
Nodes (11): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminBannersPageView(), BannerManagementPanel(), BannerCarousel(), LanguageCard(), MainMenu() (+3 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "refresh.ts"
Cohesion: 0.16
Nodes (11): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+3 more)

### Community 62 - "blog.ts"
Cohesion: 0.08
Nodes (32): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata (+24 more)

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

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "curriculum/types.ts"
Cohesion: 0.16
Nodes (15): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes() (+7 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "input.tsx"
Cohesion: 0.24
Nodes (9): ACCEPTED_TYPES, SignInForm(), onSubmit(), ContactViewProps, Input, Label, labelVariants, createSignInSchema() (+1 more)

### Community 125 - "period.ts"
Cohesion: 0.29
Nodes (9): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+1 more)

### Community 126 - "getDataRepository"
Cohesion: 0.18
Nodes (26): createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), addQuizQuestion(), createQuizWithQuestions() (+18 more)

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

### Community 147 - "blog-post-list.tsx"
Cohesion: 0.17
Nodes (8): BlogPostList(), remove(), BlogPostCard(), formatBlogDate(), BlogCategory, BlogPost, BlogPostInput, BlogPostStatus

### Community 148 - "app/page.tsx"
Cohesion: 0.06
Nodes (49): generateMetadata(), Home(), compile(), HeroScene(), draw(), resize(), tick(), perspective() (+41 more)

### Community 151 - "[quiz_id]/page.tsx"
Cohesion: 0.29
Nodes (8): generateMetadata(), PageProps, QuizPage(), NoQuestionsMessage(), QuizPageIntro(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 152 - "data/index.ts"
Cohesion: 0.13
Nodes (20): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), AdminBlogEditorPage(), metadata, AdminBlogPage() (+12 more)

## Knowledge Gaps
- **452 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+447 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `quiz-form.tsx`, `level-category-grid.tsx`, `app-shell.tsx`, `user-management-panel.tsx`, `Lesson`, `edit-curriculum-level-dialog.tsx`, `user-row-actions.tsx`, `actions/quiz.ts`, `subscription-plan-cards.tsx`, `[category]/page.tsx`, `user-profile-dialog.tsx`, `content-form-panels.tsx`, `[quiz_id]/page.tsx`, `revalidateAppContent`, `curriculum-level-manager.tsx`, `admin-subscription-page-view.tsx`, `cn`, `admin-accounting-page-view.tsx`, `resolveMessage`, `contact/page.tsx`, `button.tsx`, `card.tsx`, `lesson-form.tsx`, `subscription-view.tsx`, `badge.tsx`, `video-lessons-grid.tsx`, `AdminDashboard`, `BannerUploadForm`, `input.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `app-shell.tsx`, `actions/auth.ts`, `admin.ts`, `user-row-actions.tsx`, `isLocalDataMode`, `actions/quiz.ts`, `seed.ts`, `[category]/page.tsx`, `app/page.tsx`, `[quiz_id]/page.tsx`, `data/index.ts`, `revalidateAppContent`, `curriculum-level-manager.tsx`, `data-source.ts`, `action-guards.ts`, `contact/page.tsx`, `getServerTranslator`, `postgres/repository.ts`, `local/repository.ts`, `subscription-view.tsx`, `blog.ts`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `quiz-form.tsx`, `level-category-grid.tsx`, `app-shell.tsx`, `user-management-panel.tsx`, `edit-curriculum-level-dialog.tsx`, `actions/quiz.ts`, `subscription-plan-cards.tsx`, `app/page.tsx`, `user-profile-dialog.tsx`, `useTranslations`, `curriculum-level-manager.tsx`, `admin-subscription-page-view.tsx`, `admin-accounting-page-view.tsx`, `button.tsx`, `card.tsx`, `app/layout.tsx`, `subscription-view.tsx`, `badge.tsx`, `blog.ts`, `BannerUploadForm`, `input.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _452 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `level-category-grid.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11336032388663968 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.040674603174603176 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._