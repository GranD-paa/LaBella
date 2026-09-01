# Graph Report - cursor P  (2026-09-01)

## Corpus Check
- 418 files · ~213,346 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2068 nodes · 6088 edges · 148 communities (97 shown, 51 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 48 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6099f7c6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- quiz-form.tsx
- utils.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- quizzes-table.tsx
- Lesson
- cn
- admin.ts
- types/index.ts
- local/repository.ts
- isLocalDataMode
- [quiz_id]/page.tsx
- seed.ts
- money.ts
- 001_app_schema.sql
- quiz-management/types.ts
- server-locale.ts
- providers/index.ts
- [category]/page.tsx
- user-management-panel.tsx
- content-form-panels.tsx
- useTranslations
- schema.sql
- compilerOptions
- requireSuperAdminAction
- devDependencies
- dependencies
- curriculum-levels.ts
- TierCapabilitiesPanel
- components.json
- wizard-question-fields.tsx
- admin-accounting-page-view.tsx
- resolveMessage
- data-source.ts
- action-guards.ts
- app/layout.tsx
- edit-curriculum-level-dialog.tsx
- page-skeletons.tsx
- getServerTranslator
- advance-learning.ts
- postgres/repository.ts
- SignInForm
- button.tsx
- GrammarRule
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- checkout.ts
- subscription-view.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- my-subscriptions-card.tsx
- final-deployment/manifest.json
- reconcile.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- video-lessons-grid.tsx
- sync-local-content.mjs
- refresh.ts
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
- actions/quiz.ts
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
- label.tsx
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
- QuizManagementTable
- blog.ts
- app/page.tsx
- data/index.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 173 edges
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
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/banners/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/languages/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (148 total, 51 thin omitted)

### Community 0 - "quiz-form.tsx"
Cohesion: 0.19
Nodes (23): LessonPicker(), emptyQuestion, OPTION_KEYS, QuizQuestionFields(), OPTION_KEYS, OPTION_LABELS, QuestionFeedback, FormControl (+15 more)

### Community 1 - "utils.ts"
Cohesion: 0.10
Nodes (37): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, BandExamsSection(), CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion() (+29 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (8): BlogPost, DataRepository, fetchQuizManagementStats(), LocalizedText, QuizQuestion, UserQuizAttempt, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (10): signOutAction(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo() (+2 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.08
Nodes (32): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+24 more)

### Community 6 - "quizzes-table.tsx"
Cohesion: 0.32
Nodes (13): STATUS_STYLES, DeleteConfirmDialog(), pluralize(), QuizzesTable(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable(), Table (+5 more)

### Community 7 - "Lesson"
Cohesion: 0.09
Nodes (26): QuizManager(), LESSONS, TEN_A1_LEVELS, ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes() (+18 more)

### Community 8 - "cn"
Cohesion: 0.09
Nodes (32): CurriculumLevelManager(), CreateContentSection(), EntitlementSettingsPanel(), ConfirmActionDialog(), PendingActionType, AXES, Diamond, FIELD (+24 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (33): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), onSubmit(), bannerSchema, BannerValues (+25 more)

### Community 10 - "types/index.ts"
Cohesion: 0.13
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 11 - "local/repository.ts"
Cohesion: 0.18
Nodes (15): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+7 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.23
Nodes (16): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+8 more)

### Community 13 - "[quiz_id]/page.tsx"
Cohesion: 0.11
Nodes (24): submitQuizAction(), generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit() (+16 more)

### Community 14 - "seed.ts"
Cohesion: 0.09
Nodes (19): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, LocalAuthUser (+11 more)

### Community 15 - "money.ts"
Cohesion: 0.13
Nodes (18): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+10 more)

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
Cohesion: 0.14
Nodes (22): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+14 more)

### Community 21 - "user-management-panel.tsx"
Cohesion: 0.14
Nodes (18): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel() (+10 more)

### Community 22 - "content-form-panels.tsx"
Cohesion: 0.07
Nodes (41): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel() (+33 more)

### Community 23 - "useTranslations"
Cohesion: 0.07
Nodes (35): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), GrammarTable(), AdminLanguagesPageView(), AdminSubscriptionPageView() (+27 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "requireSuperAdminAction"
Cohesion: 0.17
Nodes (19): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+11 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, clsx, marked, dependencies, better-auth, clsx, marked, @radix-ui/react-dropdown-menu (+17 more)

### Community 29 - "curriculum-levels.ts"
Cohesion: 0.29
Nodes (12): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+4 more)

### Community 30 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "wizard-question-fields.tsx"
Cohesion: 0.29
Nodes (8): OPTION_KEYS, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 33 - "admin-accounting-page-view.tsx"
Cohesion: 0.15
Nodes (20): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), toCsv() (+12 more)

### Community 34 - "resolveMessage"
Cohesion: 0.09
Nodes (29): handleConfirm(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), LessonEditDialog(), onSubmit(), LessonForm() (+21 more)

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (16): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+8 more)

### Community 36 - "action-guards.ts"
Cohesion: 0.22
Nodes (7): GuardFail, GuardOk, requireAdminAction(), getAuthUser, getProfileById, RolePermissions, RoleSlug

### Community 37 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+2 more)

### Community 38 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.34
Nodes (11): LOCALES, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay (+3 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "getServerTranslator"
Cohesion: 0.14
Nodes (19): AboutPage(), generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminPage(), generateMetadata(), generateMetadata(), ContactPage() (+11 more)

### Community 41 - "advance-learning.ts"
Cohesion: 0.39
Nodes (4): getLanguage(), resolveLessonForLevel(), advanceLearningAfterQuiz(), getNextLevelSlug()

### Community 42 - "postgres/repository.ts"
Cohesion: 0.25
Nodes (16): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+8 more)

### Community 43 - "SignInForm"
Cohesion: 0.25
Nodes (7): SignInForm(), onSubmit(), SignUpForm(), onSubmit(), createSignInSchema(), createSignUpSchema(), Translator

### Community 44 - "button.tsx"
Cohesion: 0.14
Nodes (30): BannerManagementPanel(), LANDMARK_LABELS, LANGUAGE_LABELS, LanguageManagementPanel(), LessonsTable(), AdminQuizzesPageView(), CONTENT_TYPES, discountedPrice() (+22 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "checkout.ts"
Cohesion: 0.14
Nodes (24): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), DevModeBanner(), handlePay() (+16 more)

### Community 49 - "subscription-view.tsx"
Cohesion: 0.38
Nodes (4): SubscriptionPlanCards(), SubscriptionView(), SubscriptionViewProps, interpolateText()

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.08
Nodes (14): BlogCategory, BlogPostInput, BlogPostStatus, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, Json (+6 more)

### Community 52 - "my-subscriptions-card.tsx"
Cohesion: 0.17
Nodes (13): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), StatCard(), UserDashboard(), daysRemaining(), MySubscriptionEntry (+5 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "reconcile.ts"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "refresh.ts"
Cohesion: 0.16
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

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

### Community 79 - "actions/quiz.ts"
Cohesion: 0.21
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "curriculum/types.ts"
Cohesion: 0.10
Nodes (22): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes() (+14 more)

### Community 94 - "availability.ts"
Cohesion: 0.20
Nodes (11): AdminLanguagesPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), generateMetadata(), LessonPage(), PageProps, generateMetadata() (+3 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "label.tsx"
Cohesion: 0.43
Nodes (4): ACCEPTED_TYPES, ContactViewProps, Label, labelVariants

### Community 125 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 126 - "getDataRepository"
Cohesion: 0.14
Nodes (37): createContentGrammar(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson() (+29 more)

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

### Community 146 - "QuizManagementTable"
Cohesion: 0.29
Nodes (4): QuizManagementTable(), renderStats(), toggleStatus(), getQuizAttemptStats()

### Community 147 - "blog.ts"
Cohesion: 0.12
Nodes (20): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), dynamic, GET() (+12 more)

### Community 148 - "app/page.tsx"
Cohesion: 0.06
Nodes (53): generateMetadata(), Home(), compile(), HeroScene(), draw(), resize(), tick(), perspective() (+45 more)

### Community 152 - "data/index.ts"
Cohesion: 0.14
Nodes (18): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata (+10 more)

## Knowledge Gaps
- **456 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+451 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `quiz-form.tsx`, `utils.ts`, `app-shell.tsx`, `quizzes-table.tsx`, `Lesson`, `cn`, `[quiz_id]/page.tsx`, `QuizManagementTable`, `server-locale.ts`, `user-management-panel.tsx`, `content-form-panels.tsx`, `requireSuperAdminAction`, `TierCapabilitiesPanel`, `wizard-question-fields.tsx`, `admin-accounting-page-view.tsx`, `resolveMessage`, `edit-curriculum-level-dialog.tsx`, `getServerTranslator`, `SignInForm`, `button.tsx`, `GrammarRule`, `subscription-view.tsx`, `my-subscriptions-card.tsx`, `video-lessons-grid.tsx`, `AdminDashboard`, `BannerUploadForm`, `label.tsx`, `getDataRepository`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `app-shell.tsx`, `actions/auth.ts`, `admin.ts`, `local/repository.ts`, `isLocalDataMode`, `[quiz_id]/page.tsx`, `seed.ts`, `blog.ts`, `[category]/page.tsx`, `app/page.tsx`, `data/index.ts`, `requireSuperAdminAction`, `curriculum-levels.ts`, `data-source.ts`, `action-guards.ts`, `getServerTranslator`, `postgres/repository.ts`, `checkout.ts`, `[slug]/page.tsx`, `actions/quiz.ts`, `availability.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `quiz-form.tsx`, `utils.ts`, `app-shell.tsx`, `quizzes-table.tsx`, `[quiz_id]/page.tsx`, `QuizManagementTable`, `blog.ts`, `app/page.tsx`, `user-management-panel.tsx`, `server-locale.ts`, `useTranslations`, `wizard-question-fields.tsx`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `edit-curriculum-level-dialog.tsx`, `button.tsx`, `subscription-view.tsx`, `my-subscriptions-card.tsx`, `[slug]/page.tsx`, `BannerUploadForm`, `label.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _456 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `utils.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09506531204644413 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03776223776223776 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._