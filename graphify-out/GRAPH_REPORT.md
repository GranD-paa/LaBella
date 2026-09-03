# Graph Report - cursor P  (2026-09-03)

## Corpus Check
- 421 files · ~314,701 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2103 nodes · 6220 edges · 155 communities (100 shown, 55 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `123a71ce`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- requireSuperAdminAction
- content-form-panels.tsx
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- quizzes-table.tsx
- Lesson
- cn
- admin.ts
- types/index.ts
- local-session.ts
- isLocalDataMode
- [quiz_id]/page.tsx
- getServerTranslator
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- app/layout.tsx
- providers/index.ts
- entitlements/index.ts
- lesson-edit-dialog.tsx
- billing-settings-form.tsx
- useTranslations
- schema.sql
- compilerOptions
- action-guards.ts
- devDependencies
- dependencies
- curriculum-levels.ts
- server-locale.ts
- components.json
- QuizQuestion
- data/repository.ts
- local/repository.ts
- middleware.ts
- checkout.ts
- edit-curriculum-level-dialog.tsx
- subscription-plan-edit-dialog.tsx
- page-skeletons.tsx
- data/index.ts
- level-category-grid.tsx
- postgres/repository.ts
- refresh.ts
- button.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- user-management-panel.tsx
- actions/quiz.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- seed.ts
- locale-provider.tsx
- final-deployment/manifest.json
- learn-category-view.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
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
- level-overrides.ts
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- getLocaleDefinition
- What You Must Do When Invoked
- 005_send_limits.sql
- helpers.ts
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
- email.ts
- period.ts
- getDataRepository
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
- gsap
- marked
- next-themes
- next
- nodemailer
- @radix-ui/react-label
- QuizManagementTable
- react-hook-form
- @supabase/ssr
- tailwind-merge
- @types/nodemailer
- resolveMessage
- public."user"
- TierCapabilitiesPanel
- badge.tsx

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
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/sign-up/page.tsx → lib/i18n/metadata.ts
- `AboutPage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/about/page.tsx → lib/data/index.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts

## Import Cycles
- None detected.

## Communities (155 total, 55 thin omitted)

### Community 0 - "requireSuperAdminAction"
Cohesion: 0.12
Nodes (27): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+19 more)

### Community 1 - "content-form-panels.tsx"
Cohesion: 0.17
Nodes (16): ContentActionBar(), ContentFormPanel(), emptyQuestion, OPTION_KEYS, OPTION_KEYS, WizardQuestionFields(), ContactViewProps, OPTION_LABELS (+8 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (7): BlogPost, DataRepository, Banner, LocalizedText, Payment, Subscription, VideoLesson

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.11
Nodes (6): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell()

### Community 5 - "actions/auth.ts"
Cohesion: 0.06
Nodes (50): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+42 more)

### Community 6 - "quizzes-table.tsx"
Cohesion: 0.24
Nodes (17): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), pluralize(), QuizzesTable(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable() (+9 more)

### Community 7 - "Lesson"
Cohesion: 0.10
Nodes (22): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+14 more)

### Community 8 - "cn"
Cohesion: 0.14
Nodes (25): ConfirmActionDialog(), UserQuizAttemptsPanel(), ContinueLearningCard(), StatCard(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription (+17 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (32): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), onSubmit(), BannerValues, BillingSettingsValues (+24 more)

### Community 10 - "types/index.ts"
Cohesion: 0.16
Nodes (17): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+9 more)

### Community 11 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.19
Nodes (16): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), DataSource (+8 more)

### Community 13 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (34): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+26 more)

### Community 14 - "getServerTranslator"
Cohesion: 0.20
Nodes (19): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+11 more)

### Community 15 - "pricing.ts"
Cohesion: 0.06
Nodes (42): BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart(), CheckoutDialog() (+34 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.18
Nodes (9): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+1 more)

### Community 18 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+1 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "entitlements/index.ts"
Cohesion: 0.13
Nodes (10): BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED, cefrBandOf(), Entitlement, EntitlementGate (+2 more)

### Community 21 - "lesson-edit-dialog.tsx"
Cohesion: 0.22
Nodes (7): LessonEditDialog(), onSubmit(), LessonForm(), onSubmit(), LessonsTable(), createLessonSchema(), LessonValues

### Community 22 - "billing-settings-form.tsx"
Cohesion: 0.23
Nodes (18): ACCEPTED_TYPES, emptyQuestion, OPTION_KEYS, QuizQuestionFields(), FormControl, FormDescription, FormField(), FormFieldContext (+10 more)

### Community 23 - "useTranslations"
Cohesion: 0.08
Nodes (26): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarTable(), AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), EntitlementSettingsPanel() (+18 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "action-guards.ts"
Cohesion: 0.12
Nodes (17): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserStatus(), UserRowActions(), GuardFail, GuardOk, requireAdminAction(), getAuthUser (+9 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, lucide-react, dependencies, better-auth, lucide-react, @radix-ui/react-avatar, @radix-ui/react-dropdown-menu, @radix-ui/react-select (+17 more)

### Community 29 - "curriculum-levels.ts"
Cohesion: 0.20
Nodes (16): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), generateMetadata(), LessonPage() (+8 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.19
Nodes (18): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, messages, createTranslator() (+10 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "QuizQuestion"
Cohesion: 0.18
Nodes (4): QuizManager(), fetchAdminDashboardData(), fetchQuizManagementStats(), QuizQuestion

### Community 33 - "data/repository.ts"
Cohesion: 0.11
Nodes (13): BlogCategory, BlogPostInput, BlogPostStatus, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, advanceLearningAfterQuiz() (+5 more)

### Community 34 - "local/repository.ts"
Cohesion: 0.12
Nodes (27): dynamic, GET(), markFailed(), redirectToResult(), settle(), DevModeBanner(), matchesImageSignature(), SIGNATURE_CHECKS (+19 more)

### Community 35 - "middleware.ts"
Cohesion: 0.23
Nodes (10): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), isPostgresDataMode(), PUBLIC_ROUTES, IMPORTANT: You *must* return the supabaseResponse object as it is., IMPORTANT: Avoid writing any logic between createServerClient and, updateSession() (+2 more)

### Community 36 - "checkout.ts"
Cohesion: 0.15
Nodes (16): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), requireAuthenticatedAction() (+8 more)

### Community 37 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.09
Nodes (32): GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel(), submit(), VocabularyContentPanel(), submit() (+24 more)

### Community 38 - "subscription-plan-edit-dialog.tsx"
Cohesion: 0.20
Nodes (18): LessonPicker(), LOCALES, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader() (+10 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "data/index.ts"
Cohesion: 0.07
Nodes (43): AboutPage(), generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata() (+35 more)

### Community 41 - "level-category-grid.tsx"
Cohesion: 0.09
Nodes (35): AdminSubscriptionPageView(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, BandExamsSection(), CategoryWatermark(), ComingSoonLanguage() (+27 more)

### Community 42 - "postgres/repository.ts"
Cohesion: 0.20
Nodes (18): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+10 more)

### Community 43 - "refresh.ts"
Cohesion: 0.16
Nodes (12): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+4 more)

### Community 44 - "button.tsx"
Cohesion: 0.20
Nodes (18): LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES, Draft, ToggleRow(), PERMISSION_ROWS, LANGUAGE_LABEL_KEYS, LevelQuizRow (+10 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.15
Nodes (16): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, ExtendedQuiz, ExtendedQuizQuestion, getSectionLabel(), LEVEL_EXAM_SECTION (+8 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "user-management-panel.tsx"
Cohesion: 0.23
Nodes (11): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), PendingActionType (+3 more)

### Community 49 - "actions/quiz.ts"
Cohesion: 1.00
Nodes (3): submitQuizAction(), buildQuizAttemptAnswersJson(), gradeAnswer()

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "seed.ts"
Cohesion: 0.09
Nodes (19): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, CurriculumLevelOverrideRow, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT (+11 more)

### Community 52 - "locale-provider.tsx"
Cohesion: 0.17
Nodes (13): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), QuizSubmittedBanner(), UserDashboard(), LocaleContext, LocaleContextValue, daysRemaining() (+5 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "learn-category-view.tsx"
Cohesion: 0.12
Nodes (10): GrammarManager(), VocabularyManager(), GrammarRulesList(), LessonDetailTabs(), LessonViewProps, QuizTabContent(), VocabularyFlashcards(), GrammarRule (+2 more)

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
Cohesion: 0.15
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, DECKS, en (+10 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.26
Nodes (8): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), SubscriptionsTable(), TabsContent, TabsList, TabsTrigger

### Community 62 - "[slug]/page.tsx"
Cohesion: 0.09
Nodes (26): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+18 more)

### Community 63 - "AdminDashboard"
Cohesion: 0.38
Nodes (7): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName()

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
Nodes (35): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+27 more)

### Community 84 - "level-overrides.ts"
Cohesion: 0.38
Nodes (6): getBandFromCode(), getCurriculumLevelsForLanguage(), groupLevelsByBand(), mergeLevelOverrides(), CEFR_BANDS, CefrBand

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "getLocaleDefinition"
Cohesion: 0.50
Nodes (5): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readStoredLocale(), getLocaleDefinition()

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "helpers.ts"
Cohesion: 0.33
Nodes (9): fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults(), orderNumberToLevelSlug() (+1 more)

### Community 94 - "curriculum/types.ts"
Cohesion: 0.12
Nodes (20): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, CATEGORY_ICON_BG, CATEGORY_ICON_TINT, CATEGORY_ICONS, ENGLISH_LEVELS (+12 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 125 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 126 - "getDataRepository"
Cohesion: 0.17
Nodes (33): createContentGrammar(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson() (+25 more)

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

### Community 151 - "resolveMessage"
Cohesion: 0.10
Nodes (25): GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), emptyQuestion, pluralize(), QuizEditDialog(), handleAddQuestion() (+17 more)

### Community 153 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 155 - "badge.tsx"
Cohesion: 0.10
Nodes (14): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminQuizzesPageView(), CreateContentSection(), BannerCarousel(), MainMenu(), SubscriptionView() (+6 more)

## Knowledge Gaps
- **470 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+465 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **55 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `requireSuperAdminAction`, `content-form-panels.tsx`, `app-shell.tsx`, `actions/auth.ts`, `quizzes-table.tsx`, `cn`, `[quiz_id]/page.tsx`, `getServerTranslator`, `pricing.ts`, `QuizManagementTable`, `lesson-edit-dialog.tsx`, `billing-settings-form.tsx`, `resolveMessage`, `TierCapabilitiesPanel`, `action-guards.ts`, `badge.tsx`, `QuizQuestion`, `edit-curriculum-level-dialog.tsx`, `subscription-plan-edit-dialog.tsx`, `data/index.ts`, `level-category-grid.tsx`, `button.tsx`, `user-management-panel.tsx`, `locale-provider.tsx`, `learn-category-view.tsx`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `AdminDashboard`, `BannerUploadForm`, `sections.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `requireSuperAdminAction`, `local/repository.ts`, `app-shell.tsx`, `actions/auth.ts`, `checkout.ts`, `app/page.tsx`, `data/index.ts`, `admin.ts`, `postgres/repository.ts`, `isLocalDataMode`, `[quiz_id]/page.tsx`, `getServerTranslator`, `actions/quiz.ts`, `action-guards.ts`, `curriculum-levels.ts`, `[slug]/page.tsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `requireSuperAdminAction`, `content-form-panels.tsx`, `quizzes-table.tsx`, `[quiz_id]/page.tsx`, `pricing.ts`, `app/layout.tsx`, `QuizManagementTable`, `billing-settings-form.tsx`, `useTranslations`, `badge.tsx`, `subscription-plan-edit-dialog.tsx`, `level-category-grid.tsx`, `button.tsx`, `user-management-panel.tsx`, `locale-provider.tsx`, `admin-accounting-page-view.tsx`, `[slug]/page.tsx`, `BannerUploadForm`, `sections.tsx`, `curriculum/types.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _470 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `requireSuperAdminAction` be split into smaller, more focused modules?**
  _Cohesion score 0.11586452762923351 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04499274310595065 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._