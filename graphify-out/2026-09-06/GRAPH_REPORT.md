# Graph Report - cursor P  (2026-09-06)

## Corpus Check
- 434 files · ~323,499 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2178 nodes · 6254 edges · 161 communities (102 shown, 59 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `96add254`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- app/layout.tsx
- Lesson
- edit-curriculum-level-dialog.tsx
- getDataRepository
- billing/accounting.ts
- [quiz_id]/page.tsx
- seed.ts
- types/index.ts
- button.tsx
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- content-form-panels.tsx
- providers/index.ts
- [language]/page.tsx
- add-curriculum-level-dialog.tsx
- quiz-form.tsx
- useTranslations
- schema.sql
- compilerOptions
- data/repository.ts
- devDependencies
- dependencies
- visibility.ts
- server-locale.ts
- components.json
- my-subscriptions-card.tsx
- curriculum/languages.ts
- isLocalDataMode
- lessons-monitor.tsx
- requireSuperAdminAction
- admin-schemas.ts
- AdminDashboard
- page-skeletons.tsx
- middleware.ts
- curriculum/types.ts
- resolveMessage
- admin.ts
- send-limit.ts
- [category]/page.tsx
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- reconcile.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- local/repository.ts
- user-nav.tsx
- final-deployment/manifest.json
- refresh.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- TierCapabilitiesPanel
- video-embed.ts
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- quiz-management/types.ts
- subscription-plan-edit-dialog.tsx
- billing/schema.test.ts
- vercel.json
- banner-upload-form.tsx
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
- QuizQuestion
- What You Must Do When Invoked
- 005_send_limits.sql
- admin-password.mjs
- band-exams.test.ts
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
- Profile
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
- getServerTranslator
- Search engine visibility
- app/page.tsx
- badge.tsx

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 201 edges
2. `cn()` - 173 edges
3. `getDataRepository()` - 136 edges
4. `DataRepository` - 110 edges
5. `Button` - 62 edges
6. `resolveMessage()` - 52 edges
7. `revalidateAppContent()` - 46 edges
8. `Badge()` - 40 edges
9. `Lesson` - 38 edges
10. `getServerTranslator()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts
- `ProfilePage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/profile/page.tsx → lib/data/index.ts
- `Tile()` --calls--> `cn()`  [EXTRACTED]
  components/admin/accounting/accounting-kpis.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (161 total, 59 thin omitted)

### Community 0 - "cn"
Cohesion: 0.14
Nodes (28): STATUS_STYLES, DeleteConfirmDialog(), ConfirmActionDialog(), RoleBadge(), getInitials(), UserManagementPanel(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps (+20 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.21
Nodes (17): dynamic, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne() (+9 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (5): DataRepository, GrammarRule, Payment, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (10): AdminLayout(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo() (+2 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.09
Nodes (34): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, SignInForm() (+26 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.14
Nodes (14): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie() (+6 more)

### Community 7 - "Lesson"
Cohesion: 0.14
Nodes (19): LessonPage(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+11 more)

### Community 8 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.37
Nodes (10): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+2 more)

### Community 9 - "getDataRepository"
Cohesion: 0.14
Nodes (28): cancelSubscriptionAction(), saveGrammarReadingProgress(), submitQuizAction(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), setLanguageAvailabilityAction(), createLesson() (+20 more)

### Community 10 - "billing/accounting.ts"
Cohesion: 0.16
Nodes (15): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+7 more)

### Community 11 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (34): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), buildQuizAttemptAnswersJson() (+26 more)

### Community 12 - "seed.ts"
Cohesion: 0.10
Nodes (16): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+8 more)

### Community 13 - "types/index.ts"
Cohesion: 0.10
Nodes (18): AdminSubscriptionPageView(), EntitlementSettingsPanel(), PlanActiveToggle(), discountedPrice(), SubscriptionPlanList(), BannerCarousel(), MainMenu(), SubscriptionView() (+10 more)

### Community 14 - "button.tsx"
Cohesion: 0.21
Nodes (17): LANDMARK_LABELS, LANGUAGE_LABELS, Draft, ToggleRow(), PERMISSION_ROWS, LANGUAGE_LABEL_KEYS, LevelQuizRow, ProfileViewProps (+9 more)

### Community 15 - "pricing.ts"
Cohesion: 0.12
Nodes (28): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial() (+20 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.18
Nodes (9): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+1 more)

### Community 18 - "content-form-panels.tsx"
Cohesion: 0.08
Nodes (44): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), ContentActionBar(), ContentFormPanel() (+36 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.17
Nodes (13): LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), ALL_UNLOCKED, cefrBandOf(), cheapestTierUnlocking(), Entitlement (+5 more)

### Community 21 - "add-curriculum-level-dialog.tsx"
Cohesion: 0.22
Nodes (11): AddCurriculumLevelDialog(), ManagedUser, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator (+3 more)

### Community 22 - "quiz-form.tsx"
Cohesion: 0.21
Nodes (18): OPTION_KEYS, OPTION_LABELS, QuestionFeedback, FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue (+10 more)

### Community 23 - "useTranslations"
Cohesion: 0.09
Nodes (34): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarManager(), GrammarTable(), RolesPermissionsPanel(), VocabularyManager(), VocabularyTable() (+26 more)

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

### Community 29 - "visibility.ts"
Cohesion: 0.19
Nodes (10): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), LANDING_LANGUAGES, LandingLanguageDefinition, LandingLanguageSlug, LandmarkId (+2 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.19
Nodes (18): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, messages, createTranslator() (+10 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "my-subscriptions-card.tsx"
Cohesion: 0.17
Nodes (12): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), StatCard(), UserDashboard(), daysRemaining(), MySubscriptionEntry, MySubscriptionsCard() (+4 more)

### Community 33 - "curriculum/languages.ts"
Cohesion: 0.08
Nodes (31): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), handleConfirm(), ENGLISH_LEVELS (+23 more)

### Community 34 - "isLocalDataMode"
Cohesion: 0.15
Nodes (23): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+15 more)

### Community 35 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (16): LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, LessonForm(), LessonsTable(), AdminQuizzesPageView() (+8 more)

### Community 36 - "requireSuperAdminAction"
Cohesion: 0.16
Nodes (20): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+12 more)

### Community 37 - "admin-schemas.ts"
Cohesion: 0.10
Nodes (26): EditCurriculumLevelDialog(), onSubmit(), LessonEditDialog(), onSubmit(), VocabularyEditDialog(), onSubmit(), ContentVocabularyValues, createContentVocabularySchema() (+18 more)

### Community 38 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.16
Nodes (14): generateMetadata(), dynamic, robots(), updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), isSiteIndexable(), PUBLIC_ROUTES (+6 more)

### Community 41 - "curriculum/types.ts"
Cohesion: 0.12
Nodes (32): ContinueLearningCard(), BandExamCard, BandExamsSection(), CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryHero() (+24 more)

### Community 42 - "resolveMessage"
Cohesion: 0.13
Nodes (15): handleConfirm(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), onSubmit(), SubscriptionPlanEditDialog(), onSubmit() (+7 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (30): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), bannerSchema, BannerValues, BillingSettingsValues (+22 more)

### Community 44 - "send-limit.ts"
Cohesion: 0.21
Nodes (12): getTransport(), sendEmail(), claimSend(), countAndClaim(), EMAIL_RULES, prune(), Rule, RULES (+4 more)

### Community 45 - "[category]/page.tsx"
Cohesion: 0.18
Nodes (16): CategoryPage(), PageProps, isCategorySlug(), gateForCategory(), EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz() (+8 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "reconcile.ts"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 49 - "blog.ts"
Cohesion: 0.08
Nodes (33): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata (+25 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "local/repository.ts"
Cohesion: 0.14
Nodes (24): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), DevModeBanner(), handlePay(), BANNER_UPLOAD_DIR (+16 more)

### Community 52 - "user-nav.tsx"
Cohesion: 0.22
Nodes (11): signOutAction(), UserNav(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator (+3 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "refresh.ts"
Cohesion: 0.18
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.15
Nodes (20): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+12 more)

### Community 62 - "quiz-management/types.ts"
Cohesion: 0.21
Nodes (10): LevelSlug, ExtendedQuiz, ExtendedQuizQuestion, normalizeAnswer(), QuestionType, QUIZ_SECTIONS, QuizMetadata, QuizStatus (+2 more)

### Community 63 - "subscription-plan-edit-dialog.tsx"
Cohesion: 0.25
Nodes (13): LessonPicker(), LOCALES, PERMISSION_ROWS, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter() (+5 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "banner-upload-form.tsx"
Cohesion: 0.24
Nodes (9): ACCEPTED_TYPES, BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset(), ContactViewProps, Label (+1 more)

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

### Community 90 - "QuizQuestion"
Cohesion: 0.22
Nodes (3): fetchAdminDashboardData(), fetchQuizManagementStats(), QuizQuestion

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "admin-password.mjs"
Cohesion: 0.40
Nodes (3): [mode, email, password], names, pool

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
Cohesion: 0.11
Nodes (21): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), UserProfileDialog(), PendingActionType, UserRowActions(), GuardFail (+13 more)

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
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 155 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 160 - "getServerTranslator"
Cohesion: 0.05
Nodes (61): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogPage() (+53 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 163 - "app/page.tsx"
Cohesion: 0.18
Nodes (15): FLAG_CODE, generateMetadata(), Home(), Landing(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck (+7 more)

### Community 165 - "badge.tsx"
Cohesion: 0.15
Nodes (12): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), StatusBadge(), UserQuizAttemptsPanel() (+4 more)

## Knowledge Gaps
- **496 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+491 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **59 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `cn`, `app-shell.tsx`, `actions/auth.ts`, `edit-curriculum-level-dialog.tsx`, `[quiz_id]/page.tsx`, `types/index.ts`, `button.tsx`, `pricing.ts`, `content-form-panels.tsx`, `add-curriculum-level-dialog.tsx`, `quiz-form.tsx`, `server-locale.ts`, `getServerTranslator`, `my-subscriptions-card.tsx`, `lessons-monitor.tsx`, `requireSuperAdminAction`, `badge.tsx`, `admin-schemas.ts`, `AdminDashboard`, `curriculum/types.ts`, `resolveMessage`, `user-nav.tsx`, `TierCapabilitiesPanel`, `admin-accounting-page-view.tsx`, `subscription-plan-edit-dialog.tsx`, `banner-upload-form.tsx`, `action-guards.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/repository.ts`, `app-shell.tsx`, `actions/auth.ts`, `Lesson`, `[quiz_id]/page.tsx`, `content-form-panels.tsx`, `[language]/page.tsx`, `visibility.ts`, `getServerTranslator`, `curriculum/languages.ts`, `isLocalDataMode`, `app/page.tsx`, `requireSuperAdminAction`, `admin.ts`, `[category]/page.tsx`, `blog.ts`, `local/repository.ts`, `user-nav.tsx`, `action-guards.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `app/layout.tsx`, `edit-curriculum-level-dialog.tsx`, `[quiz_id]/page.tsx`, `types/index.ts`, `button.tsx`, `pricing.ts`, `add-curriculum-level-dialog.tsx`, `quiz-form.tsx`, `useTranslations`, `server-locale.ts`, `my-subscriptions-card.tsx`, `lessons-monitor.tsx`, `badge.tsx`, `curriculum/types.ts`, `blog.ts`, `user-nav.tsx`, `admin-accounting-page-view.tsx`, `subscription-plan-edit-dialog.tsx`, `banner-upload-form.tsx`, `sections.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _496 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.1423076923076923 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.0375462718138551 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._