# Graph Report - cursor P  (2026-09-11)

## Corpus Check
- 485 files · ~366,640 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2508 nodes · 7126 edges · 184 communities (120 shown, 64 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f45de897`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- button.tsx
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- resolveMessage
- Quiz
- cn
- locale-provider.tsx
- types/index.ts
- category/[slug]/page.tsx
- curriculum/languages.ts
- store.ts
- user-management-panel.tsx
- blog-image.ts
- 001_app_schema.sql
- checkout.ts
- entitlements/schema.test.ts
- providers/index.ts
- robots-metadata.test.ts
- isLocalDataMode
- jalali.ts
- seed.ts
- schema.sql
- compilerOptions
- blog-post-editor.tsx
- devDependencies
- dependencies
- content-form-panels.tsx
- i18n/types.ts
- components.json
- create-content-section.tsx
- utils.ts
- local/repository.ts
- BannerCarousel
- blog-shell.tsx
- curriculum-levels.ts
- getDataRepository
- page-skeletons.tsx
- middleware.ts
- useTranslations
- blog/[slug]/page.tsx
- admin.ts
- admin-schemas.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- requireSuperAdminAction
- لندینگ‌پیج و بلاگ — سند تحویل
- pricing.ts
- edit-curriculum-level-dialog.tsx
- final-deployment/manifest.json
- phone-auth-form.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- quiz-form.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- billing-settings-form.tsx
- billing/schema.test.ts
- vercel.json
- phone-accounts.ts
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
- roles.ts
- my-subscriptions-card.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- refresh.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- actions/auth.ts
- app/page.tsx
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
- blog/types.ts
- actions/content.ts
- dashboard-data.ts
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
- revalidateAppContent
- react-hook-form
- @radix-ui/react-avatar
- sms.ts
- [quiz_id]/page.tsx
- validations/auth.ts
- [category]/page.tsx
- @radix-ui/react-tabs
- AdminDashboard
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- sha256.ts
- Search engine visibility
- 008_phone_auth.sql
- hero.tsx
- sms-test.mjs
- @radix-ui/react-label
- @radix-ui/react-slot
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- landing.ts
- band-exams.test.ts
- data-source.ts
- rss.xml/route.ts
- blog/languages.ts
- quiz-tab-content.tsx
- index.test.ts
- decks.ts
- plans.ts
- BannerUploadForm
- blog-share.tsx
- 009_blog_refactor.sql

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 205 edges
2. `cn()` - 187 edges
3. `getDataRepository()` - 150 edges
4. `DataRepository` - 115 edges
5. `Button` - 67 edges
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
- `saveAlt()` --calls--> `updateBlogImageAltAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts
- `remove()` --calls--> `deleteBlogImageAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (184 total, 64 thin omitted)

### Community 0 - "button.tsx"
Cohesion: 0.24
Nodes (9): BandExamCard, BandExamsSection(), GrammarReader(), GrammarRuleWithPages, LessonViewProps, Button, ButtonProps, SignedGrammarPage (+1 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.11
Nodes (27): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, blogImageUrl(), getAccountingSnapshot(), buildUpdate(), execute() (+19 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (8): BlogImage, BlogPost, DataRepository, getLandingPricing(), GrammarRule, QuizQuestion, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.10
Nodes (7): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), clearProfileFlag()

### Community 5 - "better-auth.ts"
Cohesion: 0.18
Nodes (13): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+5 more)

### Community 6 - "resolveMessage"
Cohesion: 0.08
Nodes (23): BillingSettingsForm(), handleRefreshRate(), onSubmit(), runAction(), handleConfirm(), GrammarForm(), onSubmit(), GrammarManager() (+15 more)

### Community 7 - "Quiz"
Cohesion: 0.14
Nodes (18): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+10 more)

### Community 8 - "cn"
Cohesion: 0.10
Nodes (31): PlanActiveToggle(), ConfirmActionDialog(), LaparliLogo(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark(), LanguageSwitcher() (+23 more)

### Community 9 - "locale-provider.tsx"
Cohesion: 0.14
Nodes (16): AboutView(), TIMELINE_KEYS, VALUE_ICONS, CurriculumLevelManager(), LanguageManagementPanel(), RoleBadge(), StatusBadge(), PERMISSION_ROWS (+8 more)

### Community 10 - "types/index.ts"
Cohesion: 0.17
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.22
Nodes (19): postSchema, BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata() (+11 more)

### Community 12 - "curriculum/languages.ts"
Cohesion: 0.14
Nodes (11): ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES, CATEGORY_DEFINITIONS, LANGUAGES, TURKISH_LEVELS (+3 more)

### Community 13 - "store.ts"
Cohesion: 0.17
Nodes (19): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+11 more)

### Community 14 - "user-management-panel.tsx"
Cohesion: 0.13
Nodes (33): DeleteConfirmDialog(), LANDMARK_LABELS, LANGUAGE_LABELS, Draft, ToggleRow(), PERMISSION_ROWS, ManagedUser, getInitials() (+25 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.10
Nodes (19): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE (+11 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "checkout.ts"
Cohesion: 0.19
Nodes (12): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), getAvailableProviders(), failLocalPayment() (+4 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "isLocalDataMode"
Cohesion: 0.12
Nodes (24): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+16 more)

### Community 22 - "jalali.ts"
Cohesion: 0.14
Nodes (25): DateOfBirthField(), clampDay(), JalaliParts, BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn() (+17 more)

### Community 23 - "seed.ts"
Cohesion: 0.09
Nodes (18): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+10 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "blog-post-editor.tsx"
Cohesion: 0.12
Nodes (13): ACCEPTED_TYPES, ACCEPTED, BlogImageLibrary(), remove(), saveAlt(), formatBytes(), CheckRow(), Counter() (+5 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "content-form-panels.tsx"
Cohesion: 0.12
Nodes (20): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+12 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.15
Nodes (19): LOCALES, countdownTickMs(), formatCountdown(), fa, t, Translator, Unit, messages (+11 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "create-content-section.tsx"
Cohesion: 0.21
Nodes (9): AdminQuizzesPageView(), CONTENT_TYPES, CreateContentSection(), stepForJump(), CONTENT_CATEGORIES, ContentStatus, ContentWizardContext, ContentWizardTarget (+1 more)

### Community 33 - "utils.ts"
Cohesion: 0.10
Nodes (35): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView() (+27 more)

### Community 34 - "local/repository.ts"
Cohesion: 0.20
Nodes (14): clearLocalSession(), addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled() (+6 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.13
Nodes (10): BlogShell(), NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle() (+2 more)

### Community 37 - "curriculum-levels.ts"
Cohesion: 0.19
Nodes (19): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), EditCurriculumLevelDialog(), handleConfirm() (+11 more)

### Community 38 - "getDataRepository"
Cohesion: 0.08
Nodes (53): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), destinationFor(), cancelSubscriptionAction(), saveGrammarReadingProgress(), AdminAccountingPage(), generateMetadata() (+45 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (23): CompleteProfileForm(), onSubmit(), updateLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url() (+15 more)

### Community 41 - "useTranslations"
Cohesion: 0.07
Nodes (31): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), LessonsMonitor(), LessonsMonitorPageView(), GrammarTable(), AdminLanguagesPageView(), LessonsTable() (+23 more)

### Community 42 - "blog/[slug]/page.tsx"
Cohesion: 0.15
Nodes (24): BlogPostPage(), generateMetadata(), Props, BlogToc(), countWords(), createBlogRenderer(), estimateReadingMinutes(), extractImageUrls() (+16 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (31): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), bannerSchema, BannerValues, BillingSettingsValues, contentVocabularySchema, ContentVocabularyValues (+23 more)

### Community 44 - "admin-schemas.ts"
Cohesion: 0.12
Nodes (20): GrammarEditDialog(), onSubmit(), LessonEditDialog(), onSubmit(), AddCurriculumLevelValues, ContentVocabularyValues, createAddCurriculumLevelSchema(), createCurriculumLevelSchema() (+12 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.11
Nodes (27): BandExam, getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson() (+19 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.10
Nodes (10): BlogPostInput, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, GrammarPage, GrammarPageSummary, Json (+2 more)

### Community 49 - "requireSuperAdminAction"
Cohesion: 0.10
Nodes (25): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), uploadBannerAction(), BlogFormState, BlogImageUploadState, deleteBlogImageAction() (+17 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "pricing.ts"
Cohesion: 0.16
Nodes (23): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial() (+15 more)

### Community 52 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.31
Nodes (11): LOCALES, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay (+3 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "phone-auth-form.tsx"
Cohesion: 0.14
Nodes (24): getAuthChallenge(), localFormat(), ltr(), PhoneAuthForm(), fail(), submitPhone(), useSolvedChallenge(), CHALLENGE_DIFFICULTY (+16 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, lint, messages:export, start (+3 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "quiz-form.tsx"
Cohesion: 0.15
Nodes (14): OPTION_KEYS, WizardQuestionFields(), OPTION_LABELS, QuestionFeedback, RadioGroup, RadioGroupItem, SelectContent, SelectItem (+6 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.29
Nodes (9): VideoCard(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed (+1 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.15
Nodes (21): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv() (+13 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.12
Nodes (19): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie() (+11 more)

### Community 63 - "billing-settings-form.tsx"
Cohesion: 0.26
Nodes (17): LessonPicker(), Values, FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue, FormItem (+9 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "phone-accounts.ts"
Cohesion: 0.16
Nodes (12): GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), WelcomePage(), ProfileDetails, ProfileState (+4 more)

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
Nodes (33): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+25 more)

### Community 83 - "roles.ts"
Cohesion: 0.10
Nodes (27): ChangeRoleDialog(), handleSave(), handleSubmit(), PendingActionType, UserRowActions(), ADMIN_ROLE_SLUGS, ALLOWED, canChangeUserRole() (+19 more)

### Community 84 - "my-subscriptions-card.tsx"
Cohesion: 0.15
Nodes (14): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining() (+6 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (19): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+11 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "refresh.ts"
Cohesion: 0.16
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "actions/auth.ts"
Cohesion: 0.19
Nodes (16): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode() (+8 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.17
Nodes (15): FLAG_CODE, generateMetadata(), Home(), Landing(), useLocale(), getServerLocale(), getLandingCopy(), getCourseDecks() (+7 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (19): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage(), ContentCoverageInput (+11 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/types.ts"
Cohesion: 0.22
Nodes (9): BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate(), BLOG_PAGE_SIZE, BlogListResult, BlogCategory (+1 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.12
Nodes (31): abortGrammarUpload(), deleteContentQuiz(), deleteContentVideo(), finishGrammarUpload(), loadLessonContent(), renderGrammarPages(), startGrammarUpload(), submit() (+23 more)

### Community 126 - "dashboard-data.ts"
Cohesion: 0.17
Nodes (7): buildLearnerEngagementMetrics(), LearnerEngagementMetrics, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), UserStatus, fetchQuizManagementStats()

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

### Community 146 - "revalidateAppContent"
Cohesion: 0.12
Nodes (34): submitQuizAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule() (+26 more)

### Community 149 - "sms.ts"
Cohesion: 0.27
Nodes (13): toLocalIranFormat(), assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode() (+5 more)

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (35): PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage(), QuizPageIntro() (+27 more)

### Community 151 - "validations/auth.ts"
Cohesion: 0.18
Nodes (10): completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema, phoneSchema, requestCodeSchema, verifyCodeSchema (+2 more)

### Community 152 - "[category]/page.tsx"
Cohesion: 0.18
Nodes (19): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LanguageCoursePage(), PageProps, getLanguageWithAvailability(), groupLevelExamsByBand() (+11 more)

### Community 155 - "AdminDashboard"
Cohesion: 0.38
Nodes (7): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName()

### Community 160 - "sha256.ts"
Cohesion: 0.24
Nodes (8): encoder, h, INITIAL, K, rotr(), sha256(), sha256Hex(), w

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 163 - "hero.tsx"
Cohesion: 0.18
Nodes (9): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+1 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "landing.ts"
Cohesion: 0.28
Nodes (7): setLandingLanguageVisibilityAction(), AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), isLandingLanguageSlug(), getLandingLanguageToggles()

### Community 174 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 175 - "rss.xml/route.ts"
Cohesion: 0.36
Nodes (7): absolute(), dynamic, GET(), xmlEscape(), BlogPostList(), remove(), resolveBlogLanguages()

### Community 176 - "blog/languages.ts"
Cohesion: 0.13
Nodes (15): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), dynamic, revalidate (+7 more)

### Community 177 - "quiz-tab-content.tsx"
Cohesion: 0.29
Nodes (6): QuizCard(), QuizTabContent(), CATEGORY_ACCENTS, CATEGORY_ICON_BG, CATEGORY_ICON_TINT, CATEGORY_ICONS

### Community 179 - "decks.ts"
Cohesion: 0.33
Nodes (5): COURSE_ORDER, DECKS, en, fa, it

### Community 180 - "plans.ts"
Cohesion: 0.50
Nodes (3): SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.profiles, public.blog_posts

## Knowledge Gaps
- **562 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+557 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **64 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/repository.ts`, `app-shell.tsx`, `category/[slug]/page.tsx`, `checkout.ts`, `revalidateAppContent`, `isLocalDataMode`, `[quiz_id]/page.tsx`, `[category]/page.tsx`, `curriculum-levels.ts`, `blog/[slug]/page.tsx`, `admin.ts`, `landing.ts`, `data-source.ts`, `rss.xml/route.ts`, `blog/languages.ts`, `requireSuperAdminAction`, `phone-accounts.ts`, `actions/auth.ts`, `app/page.tsx`, `blog/types.ts`, `actions/content.ts`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `button.tsx`, `better-auth.ts`, `locale-provider.tsx`, `category/[slug]/page.tsx`, `user-management-panel.tsx`, `[quiz_id]/page.tsx`, `blog-post-editor.tsx`, `create-content-section.tsx`, `utils.ts`, `BannerCarousel`, `blog-shell.tsx`, `useTranslations`, `blog/[slug]/page.tsx`, `quiz-tab-content.tsx`, `pricing.ts`, `edit-curriculum-level-dialog.tsx`, `BannerUploadForm`, `phone-auth-form.tsx`, `quiz-form.tsx`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `billing-settings-form.tsx`, `sections.tsx`, `my-subscriptions-card.tsx`, `lessons-monitor.tsx`, `blog/types.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `button.tsx`, `app-shell.tsx`, `resolveMessage`, `cn`, `locale-provider.tsx`, `user-management-panel.tsx`, `revalidateAppContent`, `[quiz_id]/page.tsx`, `jalali.ts`, `blog-post-editor.tsx`, `AdminDashboard`, `content-form-panels.tsx`, `create-content-section.tsx`, `utils.ts`, `BannerCarousel`, `curriculum-levels.ts`, `middleware.ts`, `admin-schemas.ts`, `quiz-tab-content.tsx`, `pricing.ts`, `edit-curriculum-level-dialog.tsx`, `BannerUploadForm`, `phone-auth-form.tsx`, `quiz-form.tsx`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `billing-settings-form.tsx`, `roles.ts`, `my-subscriptions-card.tsx`, `app/page.tsx`, `lessons-monitor.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _562 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1126984126984127 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03279279279279279 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._