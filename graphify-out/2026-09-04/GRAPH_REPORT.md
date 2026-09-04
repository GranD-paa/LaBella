# Graph Report - cursor P  (2026-09-04)

## Corpus Check
- 423 files · ~317,746 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2112 nodes · 6238 edges · 162 communities (109 shown, 53 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22b54fdd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- requireSuperAdminAction
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- action-guards.ts
- Lesson
- cn
- admin.ts
- types/index.ts
- attempt-payload.ts
- isLocalDataMode
- quiz-form.tsx
- [category]/page.tsx
- money.ts
- 001_app_schema.sql
- hero.tsx
- app/layout.tsx
- providers/index.ts
- [language]/page.tsx
- about/page.tsx
- requireAdmin
- useTranslations
- schema.sql
- compilerOptions
- user-row-actions.tsx
- devDependencies
- dependencies
- availability.ts
- locale-provider.tsx
- components.json
- QuizQuestion
- data/repository.ts
- local/repository.ts
- middleware.ts
- content-form-panels.tsx
- quiz-edit-dialog.tsx
- resolve-navigation.ts
- page-skeletons.tsx
- getServerTranslator
- button.tsx
- quiz-form-dialog.tsx
- resolveMessage
- user-management-panel.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- checkout.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- seed.ts
- my-subscriptions-card.tsx
- final-deployment/manifest.json
- learn-category-view.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- subscription-plan-cards.tsx
- data/index.ts
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
- lesson-form.tsx
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- better-auth.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- login/page.tsx
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
- billing-settings-form.tsx
- send-limit.ts
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
- entitlement-settings-panel.tsx
- actions/quiz.ts
- pricing.ts
- local-session.ts
- period.ts
- [quiz_id]/page.tsx
- data-source.ts
- grading.ts
- quiz-sections.ts
- grammar-manager.tsx
- Search engine visibility

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 172 edges
3. `getDataRepository()` - 138 edges
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
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/about/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/accounting/page.tsx → lib/i18n/metadata.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts

## Import Cycles
- None detected.

## Communities (162 total, 53 thin omitted)

### Community 0 - "requireSuperAdminAction"
Cohesion: 0.13
Nodes (27): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+19 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.31
Nodes (12): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, POOL_OPTIONS, query(), queryOne() (+4 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): BlogPost, DataRepository, getLandingPricing(), LocalizedText, Payment, VideoLesson

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.06
Nodes (21): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+13 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.17
Nodes (18): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), buckets, buildAuthRateLimitKey() (+10 more)

### Community 6 - "action-guards.ts"
Cohesion: 0.16
Nodes (13): GuardFail, GuardOk, requireAdminAction(), getAuthUser, getProfileById, ADMIN_ROLE_SLUGS, isRoleSlug(), ROLE_DEFINITIONS (+5 more)

### Community 7 - "Lesson"
Cohesion: 0.10
Nodes (20): QuizManager(), BandExam, LESSONS, TEN_A1_LEVELS, ContinueLearningProgress, resolveContinueLearningPath(), italian, languages (+12 more)

### Community 8 - "cn"
Cohesion: 0.20
Nodes (18): ConfirmActionDialog(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay (+10 more)

### Community 9 - "admin.ts"
Cohesion: 0.07
Nodes (30): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), onSubmit(), bannerSchema, BannerValues (+22 more)

### Community 10 - "types/index.ts"
Cohesion: 0.15
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 11 - "attempt-payload.ts"
Cohesion: 0.18
Nodes (12): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), UserQuizAttemptsPanel(), buildQuizAttemptAnswersJson(), formatUserAnswerLabel(), OPTION_FIELDS, parseAttemptBreakdown(), QUIZ_ATTEMPT_BREAKDOWN_KEY (+4 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.17
Nodes (20): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+12 more)

### Community 13 - "quiz-form.tsx"
Cohesion: 0.20
Nodes (13): submitQuizAction(), buildInitialFeedback(), OPTION_LABELS, QuestionFeedback, QuizForm(), lockAnswer(), onSubmit(), useReducedMotion() (+5 more)

### Community 14 - "[category]/page.tsx"
Cohesion: 0.26
Nodes (12): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, getLanguageWithAvailability(), getLanguage() (+4 more)

### Community 15 - "money.ts"
Cohesion: 0.09
Nodes (27): pricingFor(), rialFor(), FxFetchResult, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider (+19 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LOCALES, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS, en (+2 more)

### Community 18 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.14
Nodes (16): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, CheckoutRequest, CheckoutResponse, PaymentProvider (+8 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.18
Nodes (12): generateMetadata(), LanguageCoursePage(), PageProps, groupLevelExamsByBand(), ALL_UNLOCKED, cefrBandOf(), cheapestTierUnlocking(), Entitlement (+4 more)

### Community 21 - "about/page.tsx"
Cohesion: 0.33
Nodes (4): generateMetadata(), AboutView(), TIMELINE_KEYS, VALUE_ICONS

### Community 22 - "requireAdmin"
Cohesion: 0.15
Nodes (14): AdminAccountingPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata, AdminLandingPage(), metadata (+6 more)

### Community 23 - "useTranslations"
Cohesion: 0.07
Nodes (32): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), LessonsTable(), AdminQuizzesPageView() (+24 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "user-row-actions.tsx"
Cohesion: 0.22
Nodes (9): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), UserProfileDialog(), PendingActionType (+1 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, lucide-react, dependencies, better-auth, lucide-react, @radix-ui/react-avatar, @radix-ui/react-dropdown-menu, @radix-ui/react-select (+17 more)

### Community 29 - "availability.ts"
Cohesion: 0.32
Nodes (8): AdminLanguagesPage(), generateMetadata(), getLanguageToggles(), getAdminCurriculumLevelsByLanguage(), getBandFromCode(), getCurriculumLevelsForLanguage(), groupLevelsByBand(), mergeLevelOverrides()

### Community 30 - "locale-provider.tsx"
Cohesion: 0.16
Nodes (25): applyDocumentLocale(), LocaleContext, LocaleContextValue, LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE (+17 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "QuizQuestion"
Cohesion: 0.17
Nodes (5): buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats(), QuizQuestion

### Community 33 - "data/repository.ts"
Cohesion: 0.08
Nodes (20): BlogCategory, BlogPostInput, BlogPostStatus, CurriculumLevelOverrideRow, BlogPostRow, failure(), mapBlogPost(), mutate() (+12 more)

### Community 34 - "local/repository.ts"
Cohesion: 0.16
Nodes (21): DevModeBanner(), computeRenewalPeriod(), isEntitled(), ALLOWED_IMAGE_EXTENSIONS, BANNER_UPLOAD_DIR, commitStore(), failLocalPayment(), settleLocalPayment() (+13 more)

### Community 35 - "middleware.ts"
Cohesion: 0.19
Nodes (12): generateMetadata(), updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), isSiteIndexable(), PUBLIC_ROUTES, IMPORTANT: You *must* return the supabaseResponse object as it is., IMPORTANT: Avoid writing any logic between createServerClient and (+4 more)

### Community 36 - "content-form-panels.tsx"
Cohesion: 0.10
Nodes (31): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel() (+23 more)

### Community 37 - "quiz-edit-dialog.tsx"
Cohesion: 0.21
Nodes (23): emptyQuestion, LOCALES, PERMISSION_ROWS, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter() (+15 more)

### Community 38 - "resolve-navigation.ts"
Cohesion: 0.36
Nodes (7): generateMetadata(), LessonPage(), PageProps, findLevelByOrderNumber(), findLevelInLanguages(), resolveLessonNavigation(), resolveLevelContext()

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "getServerTranslator"
Cohesion: 0.14
Nodes (21): AdminBannersPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), AdminSubscriptionPage(), generateMetadata(), ContactPage(), generateMetadata() (+13 more)

### Community 41 - "button.tsx"
Cohesion: 0.09
Nodes (42): CONTENT_TYPES, DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, BandExamsSection(), CategoryWatermark(), ComingSoonLanguage() (+34 more)

### Community 42 - "quiz-form-dialog.tsx"
Cohesion: 0.12
Nodes (22): ACCEPTED_TYPES, LessonPicker(), emptyQuestion, QuizFormDialog(), onSubmit(), OPTION_KEYS, QuizQuestionFields(), OPTION_KEYS (+14 more)

### Community 43 - "resolveMessage"
Cohesion: 0.12
Nodes (22): BillingSettingsForm(), handleRefreshRate(), onSubmit(), GrammarEditDialog(), onSubmit(), AddCurriculumLevelDialog(), onSubmit(), EditCurriculumLevelDialog() (+14 more)

### Community 44 - "user-management-panel.tsx"
Cohesion: 0.14
Nodes (31): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LANDMARK_LABELS, LANGUAGE_LABELS, pluralize(), QuizzesTable(), PERMISSION_ROWS (+23 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.16
Nodes (20): fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults() (+12 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "checkout.ts"
Cohesion: 0.15
Nodes (16): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), requireAuthenticatedAction() (+8 more)

### Community 49 - "blog.ts"
Cohesion: 0.13
Nodes (19): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), dynamic, GET() (+11 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "seed.ts"
Cohesion: 0.10
Nodes (19): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, FxRateProvider, matchesImageSignature(), SIGNATURE_CHECKS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds (+11 more)

### Community 52 - "my-subscriptions-card.tsx"
Cohesion: 0.12
Nodes (17): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining() (+9 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "learn-category-view.tsx"
Cohesion: 0.13
Nodes (10): LearnCategoryView(), GrammarRulesList(), LessonDetailTabs(), LessonView(), LessonViewProps, QuizTabContent(), VocabularyFlashcards(), GrammarRule (+2 more)

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
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), en, fa, getLandingCopy(), it (+10 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "subscription-plan-cards.tsx"
Cohesion: 0.12
Nodes (23): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+15 more)

### Community 62 - "data/index.ts"
Cohesion: 0.13
Nodes (18): BlogIndexPage(), metadata, BlogPostPage(), generateMetadata(), Props, dynamic, robots(), dynamic (+10 more)

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
Nodes (32): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+24 more)

### Community 84 - "lesson-form.tsx"
Cohesion: 0.28
Nodes (6): LessonEditDialog(), onSubmit(), LessonForm(), onSubmit(), createLessonSchema(), LessonValues

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "better-auth.ts"
Cohesion: 0.24
Nodes (10): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, isIranianPhone(), normalizePhone(), sendSms(), isVerifiablePhone() (+2 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "login/page.tsx"
Cohesion: 0.19
Nodes (12): generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), parseSignUpRedirect(), SignUpPage(), SignInForm(), onSubmit() (+4 more)

### Community 94 - "curriculum/languages.ts"
Cohesion: 0.12
Nodes (13): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, CATEGORY_DEFINITIONS (+5 more)

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "billing-settings-form.tsx"
Cohesion: 0.26
Nodes (9): OPTION_KEYS, ManagedUser, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator (+1 more)

### Community 125 - "send-limit.ts"
Cohesion: 0.21
Nodes (12): getTransport(), sendEmail(), claimSend(), countAndClaim(), EMAIL_RULES, prune(), Rule, RULES (+4 more)

### Community 126 - "getDataRepository"
Cohesion: 0.15
Nodes (36): createContentGrammar(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson() (+28 more)

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

### Community 151 - "entitlement-settings-panel.tsx"
Cohesion: 0.19
Nodes (7): EntitlementSettingsPanel(), Draft, draftFrom(), TierCapabilitiesPanel(), save(), ToggleRow(), CEFR_BANDS

### Community 152 - "actions/quiz.ts"
Cohesion: 0.24
Nodes (9): LEVEL_EXAM_SECTION, entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), answerOptionSchema, createSubmitQuizSchema(), submitQuizSchema (+1 more)

### Community 153 - "pricing.ts"
Cohesion: 0.24
Nodes (8): getLanguagesMissingCodes(), LANGUAGE_CODES, LANGUAGES, LanguageSlug, LandingPriceCell, LandingPricingData, LandingPricingLanguage, LandingPricingPlan

### Community 154 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 155 - "period.ts"
Cohesion: 0.29
Nodes (8): addBillingMonths(), BillingPeriod, computeGraceDeadline(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, resolveStatusFromDates(), SubscriptionStatus

### Community 156 - "[quiz_id]/page.tsx"
Cohesion: 0.31
Nodes (8): generateMetadata(), PageProps, QuizPage(), NoQuestionsMessage(), QuizPageIntro(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 157 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 158 - "grading.ts"
Cohesion: 0.38
Nodes (4): GradedQuizQuestion, OPTION_FIELDS, multipleChoiceQuestion, writtenQuestion

### Community 159 - "quiz-sections.ts"
Cohesion: 0.47
Nodes (5): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, QuizSectionSlug

### Community 160 - "grammar-manager.tsx"
Cohesion: 0.40
Nodes (4): GrammarForm(), onSubmit(), GrammarManager(), GrammarTable()

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

## Knowledge Gaps
- **474 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+469 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **53 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `requireSuperAdminAction`, `app-shell.tsx`, `Lesson`, `cn`, `attempt-payload.ts`, `quiz-form.tsx`, `QuizManagementTable`, `about/page.tsx`, `entitlement-settings-panel.tsx`, `user-row-actions.tsx`, `[quiz_id]/page.tsx`, `locale-provider.tsx`, `grammar-manager.tsx`, `content-form-panels.tsx`, `quiz-edit-dialog.tsx`, `getServerTranslator`, `button.tsx`, `quiz-form-dialog.tsx`, `resolveMessage`, `user-management-panel.tsx`, `my-subscriptions-card.tsx`, `learn-category-view.tsx`, `video-lessons-grid.tsx`, `subscription-plan-cards.tsx`, `AdminDashboard`, `BannerUploadForm`, `sections.tsx`, `lesson-form.tsx`, `login/page.tsx`, `billing-settings-form.tsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `requireSuperAdminAction`, `postgres/client.ts`, `app-shell.tsx`, `actions/auth.ts`, `action-guards.ts`, `admin.ts`, `attempt-payload.ts`, `isLocalDataMode`, `quiz-form.tsx`, `[category]/page.tsx`, `[language]/page.tsx`, `requireAdmin`, `actions/quiz.ts`, `user-row-actions.tsx`, `[quiz_id]/page.tsx`, `availability.ts`, `data-source.ts`, `resolve-navigation.ts`, `getServerTranslator`, `checkout.ts`, `blog.ts`, `app/page.tsx`, `data/index.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `attempt-payload.ts`, `quiz-form.tsx`, `app/layout.tsx`, `QuizManagementTable`, `useTranslations`, `entitlement-settings-panel.tsx`, `locale-provider.tsx`, `quiz-edit-dialog.tsx`, `button.tsx`, `quiz-form-dialog.tsx`, `user-management-panel.tsx`, `blog.ts`, `my-subscriptions-card.tsx`, `subscription-plan-cards.tsx`, `data/index.ts`, `BannerUploadForm`, `sections.tsx`, `billing-settings-form.tsx`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _474 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `requireSuperAdminAction` be split into smaller, more focused modules?**
  _Cohesion score 0.13368983957219252 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.0430976430976431 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._