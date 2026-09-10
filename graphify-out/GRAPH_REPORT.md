# Graph Report - cursor P  (2026-09-10)

## Corpus Check
- 460 files · ~345,172 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2343 nodes · 6676 edges · 172 communities (112 shown, 60 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5038754b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useTranslations
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- getDataRepository
- Quiz
- edit-curriculum-level-dialog.tsx
- revalidateAppContent
- billing/accounting.ts
- isLocalDataMode
- curriculum/types.ts
- store.ts
- card.tsx
- subscription-plan-cards.tsx
- 001_app_schema.sql
- app/page.tsx
- user-management-panel.tsx
- providers/index.ts
- advance-learning.ts
- [slug]/page.tsx
- jalali.ts
- lesson-view.tsx
- schema.sql
- compilerOptions
- supabase/repository.ts
- devDependencies
- dependencies
- fetchUserDashboardData
- locale-provider.tsx
- components.json
- subscription-plan-edit-dialog.tsx
- utils.ts
- local/repository.ts
- PaymentSettings
- blog-post-list.tsx
- content-form-panels.tsx
- Lesson
- page-skeletons.tsx
- middleware.ts
- dashboard-welcome-header.tsx
- validations/auth.ts
- admin.ts
- requireSuperAdminAction
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- money.ts
- sms.ts
- final-deployment/manifest.json
- otp-challenge.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- phone-accounts.ts
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- lesson-form.tsx
- billing/schema.test.ts
- vercel.json
- actions/auth.ts
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
- cn
- button.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- PhoneAuthForm
- What You Must Do When Invoked
- 005_send_limits.sql
- billing-settings-form.tsx
- subscription-view.tsx
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
- visibility.ts
- actions/content.ts
- [category]/page.tsx
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
- banner-image.ts
- react-hook-form
- @radix-ui/react-avatar
- BannerUploadForm
- quiz-form.tsx
- resolveMessage
- data-source.ts
- @radix-ui/react-tabs
- entitlements/schema.test.ts
- AdminDashboard
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- getServerTranslator
- Search engine visibility
- 008_phone_auth.sql
- sms-test.mjs
- @radix-ui/react-label
- @radix-ui/react-slot
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- band-exams.test.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 205 edges
2. `cn()` - 177 edges
3. `getDataRepository()` - 143 edges
4. `DataRepository` - 109 edges
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
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts

## Import Cycles
- None detected.

## Communities (172 total, 60 thin omitted)

### Community 0 - "useTranslations"
Cohesion: 0.10
Nodes (26): PageProps, GrammarManager(), GrammarTable(), PlanActiveToggle(), toggle(), VocabularyManager(), VocabularyTable(), BandExamCard (+18 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.16
Nodes (21): dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool (+13 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (5): DataRepository, GrammarRule, Payment, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (13): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+5 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.17
Nodes (14): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+6 more)

### Community 6 - "getDataRepository"
Cohesion: 0.18
Nodes (14): cancelSubscriptionAction(), saveGrammarReadingProgress(), setLandingLanguageVisibilityAction(), AdminBlogEditorPage(), metadata, GuardFail, GuardOk, requireAdminAction() (+6 more)

### Community 7 - "Quiz"
Cohesion: 0.14
Nodes (17): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+9 more)

### Community 8 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.37
Nodes (10): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+2 more)

### Community 9 - "revalidateAppContent"
Cohesion: 0.13
Nodes (28): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson() (+20 more)

### Community 10 - "billing/accounting.ts"
Cohesion: 0.19
Nodes (14): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+6 more)

### Community 11 - "isLocalDataMode"
Cohesion: 0.14
Nodes (22): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+14 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.12
Nodes (23): AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), LanguageToggle, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes() (+15 more)

### Community 13 - "store.ts"
Cohesion: 0.20
Nodes (16): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), LOCAL_SEED, backfillMissingCollections() (+8 more)

### Community 14 - "card.tsx"
Cohesion: 0.21
Nodes (17): LANDMARK_LABELS, LANGUAGE_LABELS, discountedPrice(), SubscriptionPlanList(), PERMISSION_ROWS, LANGUAGE_LABEL_KEYS, LevelQuizRow, ProfileViewProps (+9 more)

### Community 15 - "subscription-plan-cards.tsx"
Cohesion: 0.12
Nodes (20): CheckoutDialog(), PLAN_ICONS, SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), LOCALE_TAGS, centsToEur() (+12 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "app/page.tsx"
Cohesion: 0.10
Nodes (24): FLAG_CODE, generateMetadata(), Home(), LandingCourse, LOCALES, Landing(), useLocale(), getServerLocale() (+16 more)

### Community 18 - "user-management-panel.tsx"
Cohesion: 0.24
Nodes (15): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LessonsTable(), getInitials(), UserManagementPanel(), getScoreBadgeClass(), QuizAttemptHistoryRow (+7 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "advance-learning.ts"
Cohesion: 0.43
Nodes (3): resolveLessonForLevel(), advanceLearningAfterQuiz(), getNextLevelSlug()

### Community 21 - "[slug]/page.tsx"
Cohesion: 0.14
Nodes (16): BlogIndexPage(), metadata, BlogPostPage(), generateMetadata(), Props, generateMetadata(), dynamic, robots() (+8 more)

### Community 22 - "jalali.ts"
Cohesion: 0.18
Nodes (19): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+11 more)

### Community 23 - "lesson-view.tsx"
Cohesion: 0.18
Nodes (11): generateMetadata(), LessonPage(), PageProps, GrammarReader(), GrammarRuleWithPages, LessonDetailTabs(), LessonView(), LessonViewProps (+3 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "supabase/repository.ts"
Cohesion: 0.20
Nodes (9): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS, PLAN_TEMPLATES, PlanTemplate, createClient() (+1 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "fetchUserDashboardData"
Cohesion: 0.15
Nodes (7): DashboardPage(), buildLearnerEngagementMetrics(), buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats(), QuizQuestion

### Community 30 - "locale-provider.tsx"
Cohesion: 0.13
Nodes (28): AdminContentHeader(), applyDocumentLocale(), LocaleContext, LocaleContextValue, LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale() (+20 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "subscription-plan-edit-dialog.tsx"
Cohesion: 0.24
Nodes (21): LessonPicker(), LOCALES, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader() (+13 more)

### Community 33 - "utils.ts"
Cohesion: 0.10
Nodes (33): Achievement, ACHIEVEMENT_ICONS, ContinueLearningCard(), CategoryWatermark(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView() (+25 more)

### Community 34 - "local/repository.ts"
Cohesion: 0.13
Nodes (23): buildRecoveryDeps(), CheckoutResult, resolveOrigin(), startCheckoutAction(), handlePay(), addBillingMonths(), BillingPeriod, computeGraceDeadline() (+15 more)

### Community 35 - "PaymentSettings"
Cohesion: 0.13
Nodes (13): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+5 more)

### Community 36 - "blog-post-list.tsx"
Cohesion: 0.17
Nodes (8): BlogPostList(), remove(), BlogPostCard(), formatBlogDate(), BlogCategory, BlogPost, BlogPostInput, BlogPostStatus

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.09
Nodes (31): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+23 more)

### Community 38 - "Lesson"
Cohesion: 0.11
Nodes (22): PageProps, LessonsMonitor(), LevelRow(), LessonsMonitorPageView(), SLOT_META, SlotSquare(), STATE_KEY, AdminQuizzesPageView() (+14 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.14
Nodes (6): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton(), Skeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (24): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+16 more)

### Community 41 - "dashboard-welcome-header.tsx"
Cohesion: 0.16
Nodes (13): AchievementsSection(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), QuizSubmittedBanner(), StatCard(), UserDashboard(), MySubscriptionEntry (+5 more)

### Community 42 - "validations/auth.ts"
Cohesion: 0.18
Nodes (14): isValidJalaliDate(), todayJalali(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema (+6 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (31): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues (+23 more)

### Community 44 - "requireSuperAdminAction"
Cohesion: 0.16
Nodes (23): deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction(), addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand() (+15 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.13
Nodes (21): EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+13 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.08
Nodes (17): CurriculumLevelOverrideRow, lessonIds, LOCAL_DEV_CREDENTIALS, LocalDatabase, quizIds, AuthUser, LocalAuthUser, ProfileSummary (+9 more)

### Community 49 - "blog.ts"
Cohesion: 0.14
Nodes (17): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), dynamic, GET() (+9 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "money.ts"
Cohesion: 0.29
Nodes (12): BillingCurrency, computePrice(), divRoundHalfUp(), eurToCents(), IrrConversionInput, isRateAcceptable(), parseRateString(), PriceBreakdown (+4 more)

### Community 52 - "sms.ts"
Cohesion: 0.29
Nodes (12): assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode(), RestResult (+4 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "otp-challenge.ts"
Cohesion: 0.12
Nodes (26): getAuthChallenge(), useSolvedChallenge(), CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret() (+18 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, lint, messages:export, start (+3 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "phone-accounts.ts"
Cohesion: 0.16
Nodes (12): GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), WelcomePage(), ProfileDetails, ProfileState (+4 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.29
Nodes (9): VideoCard(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed (+1 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.16
Nodes (16): AccountingKpis(), Tile(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart(), SubscriptionsTable() (+8 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.24
Nodes (7): instrumentSerif, inter, vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps

### Community 63 - "lesson-form.tsx"
Cohesion: 0.33
Nodes (6): LessonEditDialog(), onSubmit(), LessonForm(), onSubmit(), createLessonSchema(), LessonValues

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "actions/auth.ts"
Cohesion: 0.18
Nodes (18): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getClientIpForRateLimit(), padTiming(), refusalKey() (+10 more)

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

### Community 83 - "cn"
Cohesion: 0.07
Nodes (40): RootLayout(), AdminSubscriptionPageView(), ConfirmActionDialog(), handleConfirm(), RoleBadge(), StatusBadge(), ManagedUser, PERMISSION_ROWS (+32 more)

### Community 84 - "button.tsx"
Cohesion: 0.19
Nodes (13): ACCEPTED_TYPES, Draft, ToggleRow(), Values, localFormat(), ltr(), ContactViewProps, Button (+5 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "PhoneAuthForm"
Cohesion: 0.25
Nodes (9): PhoneAuthForm(), fail(), submitPhone(), countdownTickMs(), formatCountdown(), fa, t, Translator (+1 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "billing-settings-form.tsx"
Cohesion: 0.23
Nodes (9): OPTION_KEYS, WizardQuestionFields(), ChangeRoleDialog(), handleSave(), JalaliParts, SelectContent, SelectItem, SelectTrigger (+1 more)

### Community 94 - "subscription-view.tsx"
Cohesion: 0.27
Nodes (7): recoverMyPendingPaymentsAction(), SubscriptionView(), SubscriptionViewProps, interpolateText(), BillingCurrency, BillingPeriodMonths, PaymentProviderSlug

### Community 95 - "content-coverage.ts"
Cohesion: 0.18
Nodes (11): add(), BandCoverage, buildContentCoverage(), ContentCoverageInput, CoverageSlot, emptyTally(), StatusRow, Tally (+3 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "visibility.ts"
Cohesion: 0.18
Nodes (11): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), LANDING_LANGUAGES, LandingLanguageDefinition, LandingLanguageSlug, LandmarkId (+3 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.10
Nodes (35): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), finishGrammarUpload(), loadLessonContent(), renderGrammarPages() (+27 more)

### Community 126 - "[category]/page.tsx"
Cohesion: 0.14
Nodes (16): CategoryPage(), PageProps, LanguageCoursePage(), BandExam, groupLevelExamsByBand(), isCategorySlug(), ALL_UNLOCKED, cefrBandOf() (+8 more)

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

### Community 146 - "banner-image.ts"
Cohesion: 0.24
Nodes (8): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature(), SIGNATURE_CHECKS

### Community 149 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 150 - "quiz-form.tsx"
Cohesion: 0.06
Nodes (43): submitQuizAction(), generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), OPTION_LABELS, QuestionFeedback, QuizForm() (+35 more)

### Community 151 - "resolveMessage"
Cohesion: 0.09
Nodes (22): BillingSettingsForm(), handleRefreshRate(), onSubmit(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), EntitlementSettingsPanel() (+14 more)

### Community 152 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 155 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 160 - "getServerTranslator"
Cohesion: 0.06
Nodes (52): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogPage() (+44 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

## Knowledge Gaps
- **529 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+524 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `useTranslations`, `app-shell.tsx`, `better-auth.ts`, `edit-curriculum-level-dialog.tsx`, `curriculum/types.ts`, `card.tsx`, `subscription-plan-cards.tsx`, `user-management-panel.tsx`, `[slug]/page.tsx`, `BannerUploadForm`, `resolveMessage`, `quiz-form.tsx`, `subscription-plan-edit-dialog.tsx`, `utils.ts`, `Lesson`, `page-skeletons.tsx`, `dashboard-welcome-header.tsx`, `blog.ts`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `sections.tsx`, `button.tsx`, `PhoneAuthForm`, `billing-settings-form.tsx`, `subscription-view.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `edit-curriculum-level-dialog.tsx`, `revalidateAppContent`, `curriculum/types.ts`, `card.tsx`, `subscription-plan-cards.tsx`, `app/page.tsx`, `user-management-panel.tsx`, `BannerUploadForm`, `quiz-form.tsx`, `resolveMessage`, `lesson-view.tsx`, `jalali.ts`, `AdminDashboard`, `locale-provider.tsx`, `getServerTranslator`, `subscription-plan-edit-dialog.tsx`, `utils.ts`, `content-form-panels.tsx`, `Lesson`, `middleware.ts`, `dashboard-welcome-header.tsx`, `requireSuperAdminAction`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `lesson-form.tsx`, `cn`, `button.tsx`, `PhoneAuthForm`, `billing-settings-form.tsx`, `subscription-view.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `useTranslations`, `postgres/repository.ts`, `app-shell.tsx`, `revalidateAppContent`, `isLocalDataMode`, `app/page.tsx`, `[slug]/page.tsx`, `quiz-form.tsx`, `lesson-view.tsx`, `data-source.ts`, `fetchUserDashboardData`, `getServerTranslator`, `local/repository.ts`, `Lesson`, `dashboard-welcome-header.tsx`, `admin.ts`, `requireSuperAdminAction`, `blog.ts`, `phone-accounts.ts`, `actions/auth.ts`, `subscription-view.tsx`, `visibility.ts`, `actions/content.ts`, `[category]/page.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _529 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useTranslations` be split into smaller, more focused modules?**
  _Cohesion score 0.10409745293466224 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04220779220779221 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._