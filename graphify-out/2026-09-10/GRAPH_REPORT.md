# Graph Report - cursor P  (2026-09-10)

## Corpus Check
- 458 files · ~344,862 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2342 nodes · 6663 edges · 176 communities (114 shown, 62 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5038754b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useTranslations
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- data/index.ts
- continue-learning.ts
- cn
- requireAdminPermission
- types/index.ts
- fx-rate/route.ts
- CurriculumLanguage
- store.ts
- button.tsx
- local/repository.ts
- 001_app_schema.sql
- hero.tsx
- payments-ledger.tsx
- providers/index.ts
- getDataRepository
- admin/layout.tsx
- jalali.ts
- learn-category-view.tsx
- schema.sql
- compilerOptions
- seed.ts
- devDependencies
- dependencies
- Lesson
- i18n/types.ts
- components.json
- edit-curriculum-level-dialog.tsx
- curriculum/types.ts
- checkout.ts
- PaymentSettings
- revalidateAppContent
- content-form-panels.tsx
- existing-content-list.tsx
- page-skeletons.tsx
- middleware.ts
- dashboard-welcome-header.tsx
- quiz-form.tsx
- admin.ts
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- isLocalDataMode
- lessons-monitor-page-view.tsx
- final-deployment/manifest.json
- phone-auth-form.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- phone-accounts.ts
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- billing-settings-form.tsx
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
- locale-provider.tsx
- subscription-plan-edit-dialog.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- sha256.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- add-curriculum-level-dialog.tsx
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
- app/page.tsx
- actions/content.ts
- [language]/page.tsx
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
- local-session.ts
- react-hook-form
- @radix-ui/react-avatar
- BannerUploadForm
- actions/quiz.ts
- resolveMessage
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
- Vocabulary
- sms-test.mjs
- @radix-ui/react-label
- @radix-ui/react-slot
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- landing/content.ts
- band-exams.test.ts
- learning-state.test.ts
- TierCapabilitiesPanel

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 203 edges
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
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/banners/page.tsx → lib/i18n/metadata.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (176 total, 62 thin omitted)

### Community 0 - "useTranslations"
Cohesion: 0.05
Nodes (39): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), LessonsMonitor(), GrammarTable(), AdminLanguagesPageView() (+31 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.18
Nodes (16): dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool (+8 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): BlogPost, DataRepository, LocalizedText, Payment, Profile, Subscription

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.11
Nodes (26): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+18 more)

### Community 6 - "data/index.ts"
Cohesion: 0.13
Nodes (19): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata (+11 more)

### Community 7 - "continue-learning.ts"
Cohesion: 0.19
Nodes (14): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber(), findLevelInLanguages() (+6 more)

### Community 8 - "cn"
Cohesion: 0.12
Nodes (30): AdminSubscriptionPageView(), ConfirmActionDialog(), BandExamsSection(), QuizCard(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription (+22 more)

### Community 9 - "requireAdminPermission"
Cohesion: 0.09
Nodes (32): createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), setLandingLanguageVisibilityAction(), createLesson(), deleteLesson() (+24 more)

### Community 10 - "types/index.ts"
Cohesion: 0.16
Nodes (18): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+10 more)

### Community 11 - "fx-rate/route.ts"
Cohesion: 0.20
Nodes (14): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+6 more)

### Community 12 - "CurriculumLanguage"
Cohesion: 0.17
Nodes (16): BandExamCard, ComingSoonLanguage(), CourseLevelAccordion(), LearnLanguageView(), FlagIcon(), FLAGS, US_STARS, SubscriptionLanguageTabs() (+8 more)

### Community 13 - "store.ts"
Cohesion: 0.17
Nodes (19): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+11 more)

### Community 14 - "button.tsx"
Cohesion: 0.16
Nodes (25): BannerManagementPanel(), LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), CONTENT_TYPES, discountedPrice(), SubscriptionPlanList() (+17 more)

### Community 15 - "local/repository.ts"
Cohesion: 0.07
Nodes (38): SubscriptionPlanCards(), pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp() (+30 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LOCALES, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS, en (+2 more)

### Community 18 - "payments-ledger.tsx"
Cohesion: 0.31
Nodes (13): STATUS_STYLES, SubscriptionsTable(), DeleteConfirmDialog(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable(), Table, TableBody (+5 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.14
Nodes (16): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, CheckoutRequest, CheckoutResponse, PaymentProvider (+8 more)

### Community 20 - "getDataRepository"
Cohesion: 0.19
Nodes (19): completeProfile(), destinationFor(), CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps (+11 more)

### Community 21 - "admin/layout.tsx"
Cohesion: 0.19
Nodes (8): AdminLayout(), AdminHeaderBadge(), AppHeader(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark(), LanguageSwitcher()

### Community 22 - "jalali.ts"
Cohesion: 0.11
Nodes (30): DateOfBirthField(), clampDay(), JalaliParts, toPersianDigits(), BREAKS, div(), GregorianDate, gregorianToJalali() (+22 more)

### Community 23 - "learn-category-view.tsx"
Cohesion: 0.17
Nodes (13): saveGrammarReadingProgress(), LearnCategoryBackLink(), LearnCategoryView(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonView() (+5 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "seed.ts"
Cohesion: 0.13
Nodes (16): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+8 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "Lesson"
Cohesion: 0.15
Nodes (7): buildLearnerEngagementMetrics(), buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats(), Lesson, UserQuizAttempt

### Community 30 - "i18n/types.ts"
Cohesion: 0.10
Nodes (29): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+21 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.34
Nodes (10): LessonPicker(), PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay (+2 more)

### Community 33 - "curriculum/types.ts"
Cohesion: 0.13
Nodes (24): CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView(), LearnLevelViewProps, LevelCategoryGrid(), LevelCategoryGridProps, CATEGORY_ACCENTS (+16 more)

### Community 34 - "checkout.ts"
Cohesion: 0.16
Nodes (14): cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), getAvailableProviders(), getPaymentProvider() (+6 more)

### Community 35 - "PaymentSettings"
Cohesion: 0.14
Nodes (11): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+3 more)

### Community 36 - "revalidateAppContent"
Cohesion: 0.21
Nodes (18): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+10 more)

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.08
Nodes (33): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarEntry, GrammarEntryFields(), GrammarProgress, QuizContentPanel(), submit() (+25 more)

### Community 38 - "existing-content-list.tsx"
Cohesion: 0.18
Nodes (13): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus (+5 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (21): dynamic, robots(), CompleteProfileForm(), onSubmit(), updateLocalSession(), updatePostgresSession(), AUTH_PATHS, isPublicRoute() (+13 more)

### Community 41 - "dashboard-welcome-header.tsx"
Cohesion: 0.24
Nodes (9): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), Avatar, AvatarFallback, AvatarImage, LanguageSlug, ContinueLearningSnapshot (+1 more)

### Community 42 - "quiz-form.tsx"
Cohesion: 0.14
Nodes (16): OPTION_LABELS, QuestionFeedback, RadioGroup, RadioGroupItem, useReducedMotion(), entityIdRecordSchema(), entityIdSchema(), isEntityId() (+8 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (30): bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, contentVocabularySchema, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues (+22 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.15
Nodes (22): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), AddCurriculumLevelDialog() (+14 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.11
Nodes (27): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz() (+19 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.07
Nodes (27): BlogCategory, BlogPostInput, BlogPostStatus, CurriculumLevelOverrideRow, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES (+19 more)

### Community 49 - "blog.ts"
Cohesion: 0.08
Nodes (33): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata (+25 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "isLocalDataMode"
Cohesion: 0.36
Nodes (10): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), isLocalDataMode(), failLocalPayment() (+2 more)

### Community 52 - "lessons-monitor-page-view.tsx"
Cohesion: 0.12
Nodes (4): GrammarManager(), GrammarRule, QuizQuestion, VideoLesson

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "phone-auth-form.tsx"
Cohesion: 0.15
Nodes (24): getAuthChallenge(), localFormat(), ltr(), PhoneAuthForm(), fail(), submitPhone(), toPersianDigits(), useSolvedChallenge() (+16 more)

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
Cohesion: 0.14
Nodes (14): describeVerifyFailure(), verifyPhoneCode(), welcomeHref(), GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), ProfileDetails (+6 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.20
Nodes (16): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+8 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+2 more)

### Community 63 - "billing-settings-form.tsx"
Cohesion: 0.31
Nodes (12): Values, FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+4 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "actions/auth.ts"
Cohesion: 0.14
Nodes (20): ActionResult, decideAndSend(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode(), signOutAction(), UserNav() (+12 more)

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
Nodes (34): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+26 more)

### Community 83 - "locale-provider.tsx"
Cohesion: 0.13
Nodes (22): RoleBadge(), PERMISSION_ROWS, RolesPermissionsPanel(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS (+14 more)

### Community 84 - "subscription-plan-edit-dialog.tsx"
Cohesion: 0.30
Nodes (8): ACCEPTED_TYPES, OPTION_KEYS, LOCALES, ContactViewProps, Input, Label, labelVariants, Textarea

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "sha256.ts"
Cohesion: 0.24
Nodes (8): encoder, h, INITIAL, K, rotr(), sha256(), sha256Hex(), w

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "add-curriculum-level-dialog.tsx"
Cohesion: 0.33
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 94 - "subscription-view.tsx"
Cohesion: 0.25
Nodes (7): SubscriptionView(), SubscriptionViewProps, interpolateText(), BILLING_PERIOD_MONTHS, BillingCurrency, BillingPeriodMonths, PaymentProviderSlug

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (19): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage(), ContentCoverageInput (+11 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "app/page.tsx"
Cohesion: 0.20
Nodes (13): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), getCourseDecks(), LANDING_LANGUAGES, LandingLanguageDefinition (+5 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.14
Nodes (26): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), emptyGrammarEntry(), GrammarContentPanel(), submit(), GRAMMAR_PAGES_PER_REQUEST (+18 more)

### Community 126 - "[language]/page.tsx"
Cohesion: 0.19
Nodes (12): LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), ALL_UNLOCKED, cefrBandOf(), cheapestTierUnlocking(), Entitlement (+4 more)

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

### Community 146 - "local-session.ts"
Cohesion: 0.42
Nodes (7): clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url(), verifyLocalSessionToken()

### Community 149 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 150 - "actions/quiz.ts"
Cohesion: 0.14
Nodes (20): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), advanceLearningAfterQuiz(), getNextLevelSlug(), buildQuizAttemptAnswersJson() (+12 more)

### Community 151 - "resolveMessage"
Cohesion: 0.10
Nodes (23): BillingSettingsForm(), handleRefreshRate(), onSubmit(), handleConfirm(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit() (+15 more)

### Community 152 - "data-source.ts"
Cohesion: 0.32
Nodes (6): DataSource, getDataSource(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 154 - "[quiz_id]/page.tsx"
Cohesion: 0.39
Nodes (6): generateMetadata(), PageProps, QuizPage(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 155 - "AdminDashboard"
Cohesion: 0.38
Nodes (7): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName()

### Community 160 - "getServerTranslator"
Cohesion: 0.10
Nodes (31): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage() (+23 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "landing/content.ts"
Cohesion: 0.33
Nodes (5): en, fa, it, LANDING_COPY, LandingCopy

### Community 175 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

## Knowledge Gaps
- **529 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+524 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **62 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `useTranslations`, `better-auth.ts`, `CurriculumLanguage`, `button.tsx`, `local/repository.ts`, `payments-ledger.tsx`, `BannerUploadForm`, `admin/layout.tsx`, `actions/quiz.ts`, `edit-curriculum-level-dialog.tsx`, `curriculum/types.ts`, `dashboard-welcome-header.tsx`, `quiz-form.tsx`, `blog.ts`, `phone-auth-form.tsx`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `billing-settings-form.tsx`, `sections.tsx`, `locale-provider.tsx`, `subscription-plan-edit-dialog.tsx`, `add-curriculum-level-dialog.tsx`, `subscription-view.tsx`, `lessons-monitor.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `cn`, `requireAdminPermission`, `CurriculumLanguage`, `button.tsx`, `local/repository.ts`, `payments-ledger.tsx`, `BannerUploadForm`, `admin/layout.tsx`, `resolveMessage`, `learn-category-view.tsx`, `actions/quiz.ts`, `AdminDashboard`, `getServerTranslator`, `edit-curriculum-level-dialog.tsx`, `curriculum/types.ts`, `Vocabulary`, `revalidateAppContent`, `content-form-panels.tsx`, `existing-content-list.tsx`, `middleware.ts`, `dashboard-welcome-header.tsx`, `quiz-form.tsx`, `curriculum-levels.ts`, `TierCapabilitiesPanel`, `lessons-monitor-page-view.tsx`, `phone-auth-form.tsx`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `billing-settings-form.tsx`, `actions/auth.ts`, `sections.tsx`, `locale-provider.tsx`, `subscription-plan-edit-dialog.tsx`, `add-curriculum-level-dialog.tsx`, `subscription-view.tsx`, `lessons-monitor.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `app-shell.tsx`, `data/index.ts`, `requireAdminPermission`, `fx-rate/route.ts`, `actions/quiz.ts`, `learn-category-view.tsx`, `data-source.ts`, `[quiz_id]/page.tsx`, `getServerTranslator`, `checkout.ts`, `revalidateAppContent`, `existing-content-list.tsx`, `admin.ts`, `curriculum-levels.ts`, `blog.ts`, `isLocalDataMode`, `phone-accounts.ts`, `actions/auth.ts`, `app/page.tsx`, `actions/content.ts`, `[language]/page.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _529 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useTranslations` be split into smaller, more focused modules?**
  _Cohesion score 0.04839685420447671 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04354136429608128 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._