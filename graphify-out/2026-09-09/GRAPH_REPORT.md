# Graph Report - cursor P  (2026-09-09)

## Corpus Check
- 458 files · ~344,578 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2341 nodes · 6662 edges · 176 communities (112 shown, 64 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f9385d80`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useTranslations
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- getDataRepository
- Quiz
- cn
- requireAdminPermission
- types/index.ts
- isLocalDataMode
- database.types.ts
- local-phone-auth.ts
- button.tsx
- pricing.ts
- 001_app_schema.sql
- app/page.tsx
- pages.ts
- providers/index.ts
- availability.ts
- language-switcher.tsx
- jalali.ts
- learn-category-view.tsx
- schema.sql
- compilerOptions
- seed.ts
- devDependencies
- dependencies
- UserQuizAttempt
- i18n/types.ts
- components.json
- landing.tsx
- curriculum/types.ts
- [provider]/route.ts
- refresh.ts
- revalidateAppContent
- content-form-panels.tsx
- pricing-section.tsx
- page-skeletons.tsx
- middleware.ts
- level-category-grid.tsx
- validations/quiz.ts
- admin.ts
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- local/repository.ts
- translate.ts
- final-deployment/manifest.json
- otp-challenge.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- phone-auth-form.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- resolveMessage
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
- user-management-panel.tsx
- banner-image.ts
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- auth-layout-panel.tsx
- What You Must Do When Invoked
- 005_send_limits.sql
- action-guards.ts
- subscription-view.tsx
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
- Home
- actions/content.ts
- index.test.ts
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
- getLocaleDefinition
- react-hook-form
- @radix-ui/react-avatar
- BannerUploadForm
- actions/quiz.ts
- user-row-actions.tsx
- data-source.ts
- @radix-ui/react-tabs
- [quiz_id]/page.tsx
- AdminDashboard
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- getServerTranslator
- Search engine visibility
- 008_phone_auth.sql
- category-watermark.tsx
- sms-test.mjs
- @radix-ui/react-label
- @radix-ui/react-slot
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- entitlements/schema.test.ts
- band-exams.test.ts
- learning-state.test.ts
- Payment

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 203 edges
2. `cn()` - 177 edges
3. `getDataRepository()` - 143 edges
4. `DataRepository` - 109 edges
5. `Button` - 62 edges
6. `resolveMessage()` - 53 edges
7. `revalidateAppContent()` - 48 edges
8. `Badge()` - 41 edges
9. `Lesson` - 38 edges
10. `getServerTranslator()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/languages/page.tsx → lib/i18n/metadata.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (176 total, 64 thin omitted)

### Community 0 - "useTranslations"
Cohesion: 0.04
Nodes (67): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), LessonsMonitor(), LessonsMonitorPageView() (+59 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.16
Nodes (18): dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool (+10 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (7): BlogPost, DataRepository, getLandingPricing(), GrammarRule, LocalizedText, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.14
Nodes (22): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, isIranianMobile(), isIranianPhone(), looksGenerated() (+14 more)

### Community 6 - "getDataRepository"
Cohesion: 0.14
Nodes (23): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), deleteBlogPostAction(), AdminBannersPage(), AdminBlogEditorPage(), metadata, AdminBlogPage() (+15 more)

### Community 7 - "Quiz"
Cohesion: 0.18
Nodes (15): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber(), findLevelInLanguages() (+7 more)

### Community 8 - "cn"
Cohesion: 0.10
Nodes (30): CreateContentSection(), stepForJump(), ConfirmActionDialog(), handleConfirm(), StatCard(), BrandLogo(), BrandMark(), QuizCard() (+22 more)

### Community 9 - "requireAdminPermission"
Cohesion: 0.19
Nodes (17): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createVocabulary() (+9 more)

### Community 10 - "types/index.ts"
Cohesion: 0.14
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 11 - "isLocalDataMode"
Cohesion: 0.22
Nodes (15): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+7 more)

### Community 12 - "database.types.ts"
Cohesion: 0.32
Nodes (3): createClient(), Database, Json

### Community 13 - "local-phone-auth.ts"
Cohesion: 0.36
Nodes (8): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), getFileMtimeMs(), getLocalStore()

### Community 14 - "button.tsx"
Cohesion: 0.14
Nodes (27): LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES, Draft, ToggleRow(), PERMISSION_ROWS, LANGUAGE_LABEL_KEYS, LevelQuizRow (+19 more)

### Community 15 - "pricing.ts"
Cohesion: 0.15
Nodes (23): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+15 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "app/page.tsx"
Cohesion: 0.11
Nodes (20): FLAG_CODE, generateMetadata(), LandingCourse, LOCALES, LanguageSlug, BRAND_MARK, BrandMark, en (+12 more)

### Community 18 - "pages.ts"
Cohesion: 0.35
Nodes (8): attachGrammarPages(), deleteObject(), getBucket(), getClient(), getObject(), isObjectStorageConfigured(), putObject(), signedReadUrl()

### Community 19 - "providers/index.ts"
Cohesion: 0.13
Nodes (17): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, CheckoutRequest, CheckoutResponse, PaymentProvider (+9 more)

### Community 20 - "availability.ts"
Cohesion: 0.15
Nodes (24): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+16 more)

### Community 21 - "language-switcher.tsx"
Cohesion: 0.19
Nodes (12): AdminLayout(), AppHeader(), LanguageSwitcher(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+4 more)

### Community 22 - "jalali.ts"
Cohesion: 0.11
Nodes (30): DateOfBirthField(), clampDay(), JalaliParts, toPersianDigits(), BREAKS, div(), GregorianDate, gregorianToJalali() (+22 more)

### Community 23 - "learn-category-view.tsx"
Cohesion: 0.22
Nodes (8): saveGrammarReadingProgress(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonView(), LessonViewProps, SignedGrammarPage

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "seed.ts"
Cohesion: 0.13
Nodes (21): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+13 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "UserQuizAttempt"
Cohesion: 0.15
Nodes (6): buildLearnerEngagementMetrics(), buildAchievements(), fetchUserDashboardData(), fetchQuizManagementStats(), QuizQuestion, UserQuizAttempt

### Community 30 - "i18n/types.ts"
Cohesion: 0.23
Nodes (12): DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, messages, AppLocale, DeepStringRecord, Join (+4 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "landing.tsx"
Cohesion: 0.27
Nodes (12): LandingHero(), Landing(), PricingFallback(), PricingSection(), LandingDay(), LandingFeatures(), LandingHurdles(), LandingLesson() (+4 more)

### Community 33 - "curriculum/types.ts"
Cohesion: 0.16
Nodes (14): CONTENT_CATEGORIES, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES (+6 more)

### Community 34 - "[provider]/route.ts"
Cohesion: 0.18
Nodes (12): dynamic, GET(), markFailed(), redirectToResult(), settle(), getPaymentProvider(), ReconcileDeps, ReconcileOutcome (+4 more)

### Community 35 - "refresh.ts"
Cohesion: 0.17
Nodes (9): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+1 more)

### Community 36 - "revalidateAppContent"
Cohesion: 0.13
Nodes (28): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+20 more)

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.06
Nodes (44): createContentVideo(), createContentVocabulary(), ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry (+36 more)

### Community 38 - "pricing-section.tsx"
Cohesion: 0.18
Nodes (9): Arrow(), Check(), Cross(), DAY_ICONS, LESSON_ICONS, SectionHead(), Price(), SegmentButton() (+1 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.11
Nodes (25): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+17 more)

### Community 41 - "level-category-grid.tsx"
Cohesion: 0.15
Nodes (21): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnLevelView(), LearnLevelViewProps (+13 more)

### Community 42 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (30): updateSubscriptionPlanAction(), updateSubscriptionTierAction(), toggle(), onSubmit(), bannerSchema, BannerValues, BillingSettingsValues, ContentVocabularyValues (+22 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.19
Nodes (19): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), AddCurriculumLevelDialog(), onSubmit() (+11 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.12
Nodes (22): BandExam, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+14 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.11
Nodes (18): BlogCategory, BlogPostInput, BlogPostStatus, CurriculumLevelOverrideRow, BlogPostRow, mapBlogPost(), toIso(), AuthUser (+10 more)

### Community 49 - "blog.ts"
Cohesion: 0.07
Nodes (35): BlogFormState, optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata, dynamic (+27 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "local/repository.ts"
Cohesion: 0.17
Nodes (18): buildRecoveryDeps(), addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES (+10 more)

### Community 52 - "translate.ts"
Cohesion: 0.23
Nodes (10): countdownTickMs(), formatCountdown(), fa, t, Translator, Unit, createTranslator(), getNestedValue() (+2 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (24): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+16 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, lint, messages:export, start (+3 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "phone-auth-form.tsx"
Cohesion: 0.20
Nodes (14): getAuthChallenge(), generateMetadata(), LoginPage(), parseLoginRedirect(), OtpInput(), absorb(), focusBox(), localFormat() (+6 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.13
Nodes (24): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), STATUS_STYLES (+16 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 63 - "resolveMessage"
Cohesion: 0.14
Nodes (38): ACCEPTED_TYPES, LessonPicker(), OPTION_KEYS, LOCALES, ManagedUser, PERMISSION_ROWS, Values, ContactViewProps (+30 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "actions/auth.ts"
Cohesion: 0.09
Nodes (33): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getClientIpForRateLimit(), padTiming(), refusalKey() (+25 more)

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
Cohesion: 0.21
Nodes (12): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+4 more)

### Community 83 - "user-management-panel.tsx"
Cohesion: 0.11
Nodes (30): DeleteConfirmDialog(), handleConfirm(), LessonsTable(), RoleBadge(), StatusBadge(), getInitials(), UserManagementPanel(), VocabularyForm() (+22 more)

### Community 84 - "banner-image.ts"
Cohesion: 0.24
Nodes (8): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature(), SIGNATURE_CHECKS

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "action-guards.ts"
Cohesion: 0.22
Nodes (6): GuardFail, GuardOk, requireAdminAction(), getAuthUser, getProfileById, Profile

### Community 94 - "subscription-view.tsx"
Cohesion: 0.23
Nodes (12): cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), SubscriptionView(), SubscriptionViewProps (+4 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (19): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage(), ContentCoverageInput (+11 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "Home"
Cohesion: 0.15
Nodes (14): setLandingLanguageVisibilityAction(), AdminLandingPage(), metadata, Home(), LandingLanguagePanel(), toggle(), isLandingLanguageSlug(), LANDING_LANGUAGES (+6 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.13
Nodes (22): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, ContentCategorySlug, GRAMMAR_PAGES_PER_REQUEST, RenderGrammarPagesResult (+14 more)

### Community 126 - "index.test.ts"
Cohesion: 0.20
Nodes (3): TIERS, Subscription, SubscriptionTier

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

### Community 146 - "getLocaleDefinition"
Cohesion: 0.33
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), isAppLocale()

### Community 149 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 150 - "actions/quiz.ts"
Cohesion: 0.14
Nodes (20): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), advanceLearningAfterQuiz(), getNextLevelSlug(), buildQuizAttemptAnswersJson() (+12 more)

### Community 151 - "user-row-actions.tsx"
Cohesion: 0.22
Nodes (8): updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), UserProfileDialog(), PendingActionType, UserRowActions()

### Community 152 - "data-source.ts"
Cohesion: 0.32
Nodes (6): DataSource, getDataSource(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 154 - "[quiz_id]/page.tsx"
Cohesion: 0.39
Nodes (6): generateMetadata(), PageProps, QuizPage(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 155 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 160 - "getServerTranslator"
Cohesion: 0.12
Nodes (28): generateMetadata(), generateMetadata(), generateMetadata(), AdminPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage() (+20 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 163 - "category-watermark.tsx"
Cohesion: 0.36
Nodes (6): CategoryWatermark(), CATEGORY_ACCENTS, CATEGORY_ICON_BG, CATEGORY_ICON_TINT, CATEGORY_ICONS, CategorySlug

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

## Knowledge Gaps
- **529 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+524 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **64 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `useTranslations`, `landing.tsx`, `category-watermark.tsx`, `pricing-section.tsx`, `level-category-grid.tsx`, `button.tsx`, `sections.tsx`, `blog.ts`, `user-management-panel.tsx`, `BannerUploadForm`, `language-switcher.tsx`, `lessons-monitor.tsx`, `actions/quiz.ts`, `subscription-view.tsx`, `phone-auth-form.tsx`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `resolveMessage`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `app-shell.tsx`, `requireAdminPermission`, `isLocalDataMode`, `app/page.tsx`, `availability.ts`, `actions/quiz.ts`, `learn-category-view.tsx`, `user-row-actions.tsx`, `data-source.ts`, `[quiz_id]/page.tsx`, `getServerTranslator`, `[provider]/route.ts`, `revalidateAppContent`, `content-form-panels.tsx`, `admin.ts`, `curriculum-levels.ts`, `blog.ts`, `local/repository.ts`, `actions/auth.ts`, `action-guards.ts`, `subscription-view.tsx`, `Home`, `actions/content.ts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `cn`, `button.tsx`, `availability.ts`, `BannerUploadForm`, `language-switcher.tsx`, `user-row-actions.tsx`, `learn-category-view.tsx`, `actions/quiz.ts`, `AdminDashboard`, `landing.tsx`, `revalidateAppContent`, `content-form-panels.tsx`, `middleware.ts`, `level-category-grid.tsx`, `curriculum-levels.ts`, `phone-auth-form.tsx`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `resolveMessage`, `actions/auth.ts`, `user-management-panel.tsx`, `auth-layout-panel.tsx`, `subscription-view.tsx`, `lessons-monitor.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _529 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useTranslations` be split into smaller, more focused modules?**
  _Cohesion score 0.04430598823122188 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03819444444444445 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._