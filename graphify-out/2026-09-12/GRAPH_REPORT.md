# Graph Report - cursor P  (2026-09-12)

## Corpus Check
- 508 files · ~390,518 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2694 nodes · 7704 edges · 194 communities (130 shown, 64 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 58 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `78fffdab`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin/page.tsx
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- pipeline.ts
- Lesson
- cn
- utils.ts
- types/index.ts
- category/[slug]/page.tsx
- curriculum-levels.ts
- local-phone-auth.ts
- button.tsx
- blog-image.ts
- 001_app_schema.sql
- period.ts
- landing/pricing.ts
- providers/index.ts
- robots-metadata.test.ts
- reconcile.ts
- jalali.ts
- seed.ts
- schema.sql
- compilerOptions
- blog/[id]/page.tsx
- devDependencies
- dependencies
- content-form-panels.tsx
- locale-provider.tsx
- components.json
- [language]/page.tsx
- learn-category-hero.tsx
- category-watermark.tsx
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- getServerTranslator
- page-skeletons.tsx
- middleware.ts
- pages.ts
- markdown.ts
- admin.ts
- validations/auth.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- money.ts
- user-management-panel.tsx
- final-deployment/manifest.json
- sha256.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- sms.ts
- video-lessons-grid.tsx
- sync-local-content.mjs
- payments-ledger.tsx
- app/layout.tsx
- quiz-form.tsx
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
- permissions/roles.ts
- useTranslations
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- seo.ts
- react-dom
- PhoneAuthForm
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
- blog/[slug]/page.tsx
- actions/content.ts
- learn-category-view.tsx
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
- users.ts
- nodemailer
- lucide-react
- requireAdminPermission
- react-hook-form
- @radix-ui/react-avatar
- quizzes/page.tsx
- [quiz_id]/page.tsx
- index.test.ts
- curriculum/types.ts
- blog-agent.mjs
- dashboard/page.tsx
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- getLevel
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
- getDataRepository
- [category]/page.tsx
- data-source.ts
- llms.txt/route.ts
- UserRowActions
- run-migration.mjs
- subscription-view.tsx
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- advance-learning.ts
- about-view.tsx
- 011_blog_agent.sql
- schedule.ts
- @radix-ui/react-dropdown-menu
- tailwindcss-animate
- zod

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 213 edges
2. `cn()` - 187 edges
3. `getDataRepository()` - 160 edges
4. `DataRepository` - 121 edges
5. `Button` - 70 edges
6. `requireAdminPermission()` - 67 edges
7. `resolveMessage()` - 59 edges
8. `revalidateAppContent()` - 53 edges
9. `Badge()` - 43 edges
10. `Lesson` - 38 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `WelcomePreviewPage()` --calls--> `isLocalDataMode()`  [EXTRACTED]
  app/(auth)/welcome-preview/page.tsx → lib/config/data-source.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/about/page.tsx → lib/i18n/metadata.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (194 total, 64 thin omitted)

### Community 0 - "admin/page.tsx"
Cohesion: 0.17
Nodes (17): AdminLandingPage(), metadata, AdminPage(), generateMetadata(), LandingLanguagePanel(), toggle(), getInitials(), UserManagementPanel() (+9 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.16
Nodes (16): dynamic, dynamic, listTopics(), getAccountingSnapshot(), buildUpdate(), getPool(), globalForPool, isReadOnlyStatement() (+8 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (16): CurriculumLevelOverrideRow, buildLearnerEngagementMetrics(), AdminDashboardData, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), DataRepository, UserStatus (+8 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (13): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+5 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.20
Nodes (12): { GET, POST }, absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, foldDigits() (+4 more)

### Community 6 - "pipeline.ts"
Cohesion: 0.06
Nodes (61): saveBlogPostAction(), BlogPostEditor(), ACCEPTED_IMAGE_TYPES, AiError, apiKey(), asString(), baseUrl(), chatJSON() (+53 more)

### Community 7 - "Lesson"
Cohesion: 0.16
Nodes (16): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelInLanguages() (+8 more)

### Community 8 - "cn"
Cohesion: 0.10
Nodes (34): Tile(), AdminSubscriptionPageView(), ConfirmActionDialog(), LaparliLogo(), StatCard(), LanguageSwitcher(), AlertDialogAction, AlertDialogCancel (+26 more)

### Community 9 - "utils.ts"
Cohesion: 0.15
Nodes (10): ACCEPTED_TYPES, ACCEPTED, CheckRow(), Counter(), ToggleRow(), OtpInput(), ContactViewProps, Label (+2 more)

### Community 10 - "types/index.ts"
Cohesion: 0.09
Nodes (29): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+21 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.15
Nodes (23): postSchema, BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata() (+15 more)

### Community 12 - "curriculum-levels.ts"
Cohesion: 0.31
Nodes (12): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+4 more)

### Community 13 - "local-phone-auth.ts"
Cohesion: 0.23
Nodes (12): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), cloneSeed() (+4 more)

### Community 14 - "button.tsx"
Cohesion: 0.13
Nodes (34): AccountingKpis(), LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), CONTENT_TYPES, CreateContentSection(), findLessonForLevel() (+26 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.17
Nodes (10): ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl(), ImageDimensions, isBlogImageUrl(), MAX_BLOG_IMAGE_BYTES, readImageDimensions(), readJpegDimensions() (+2 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "period.ts"
Cohesion: 0.29
Nodes (9): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+1 more)

### Community 18 - "landing/pricing.ts"
Cohesion: 0.12
Nodes (16): Arrow(), Check(), Cross(), DAY_ICONS, LESSON_ICONS, SectionHead(), Price(), SegmentButton() (+8 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "reconcile.ts"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 22 - "jalali.ts"
Cohesion: 0.15
Nodes (22): DateOfBirthField(), clampDay(), JalaliParts, BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn() (+14 more)

### Community 23 - "seed.ts"
Cohesion: 0.09
Nodes (25): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+17 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "blog/[id]/page.tsx"
Cohesion: 0.17
Nodes (5): AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata, ErrorState()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next, next-themes (+19 more)

### Community 29 - "content-form-panels.tsx"
Cohesion: 0.04
Nodes (66): BillingSettingsForm(), handleRefreshRate(), onSubmit(), ContentFormPanel(), emptyQuestion, GrammarEntry, GrammarProgress, QuizContentPanel() (+58 more)

### Community 30 - "locale-provider.tsx"
Cohesion: 0.15
Nodes (26): applyDocumentLocale(), LocaleContext, LocaleContextValue, LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE (+18 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "[language]/page.tsx"
Cohesion: 0.17
Nodes (14): PageProps, BandExamCard, BandExamsSection(), ComingSoonLanguage(), CourseLevelAccordion(), LearnLanguageView(), FlagIcon(), FLAGS (+6 more)

### Community 33 - "learn-category-hero.tsx"
Cohesion: 0.14
Nodes (20): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnLevelView() (+12 more)

### Community 34 - "category-watermark.tsx"
Cohesion: 0.43
Nodes (5): CategoryWatermark(), CATEGORY_ICON_BG, CATEGORY_ICON_TINT, CATEGORY_ICONS, CategorySlug

### Community 35 - "isLocalDataMode"
Cohesion: 0.16
Nodes (22): dynamic, GET(), maxDuration, POST(), wrongDataSource(), dynamic, GET(), supabaseFxStore() (+14 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.21
Nodes (10): BlogShell(), NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle() (+2 more)

### Community 37 - "action-guards.ts"
Cohesion: 0.17
Nodes (11): AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireContentScope(), requireSuperAdminAction(), getAuthUser, getProfileById (+3 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.10
Nodes (28): AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminSubscriptionPage(), generateMetadata() (+20 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.11
Nodes (25): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+17 more)

### Community 41 - "pages.ts"
Cohesion: 0.23
Nodes (16): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), emptyGrammarEntry(), GrammarContentPanel(), submit(), attachGrammarPages() (+8 more)

### Community 42 - "markdown.ts"
Cohesion: 0.15
Nodes (14): absolute(), dynamic, GET(), xmlEscape(), BlogToc(), countWords(), createBlogRenderer(), extractImageUrls() (+6 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (25): bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, EntitlementSettingsValues, GrammarRuleValues, LessonValues (+17 more)

### Community 44 - "validations/auth.ts"
Cohesion: 0.17
Nodes (13): todayJalali(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema, phoneSchema (+5 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.11
Nodes (26): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz() (+18 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.07
Nodes (32): BlogCategory, BlogImage, BlogPost, BlogPostInput, BlogPostStatus, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl() (+24 more)

### Community 49 - "blog.ts"
Cohesion: 0.15
Nodes (13): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, resolveUploadError(), updateBlogImageAltAction() (+5 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "money.ts"
Cohesion: 0.10
Nodes (23): SubscriptionPlanCards(), pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp() (+15 more)

### Community 52 - "user-management-panel.tsx"
Cohesion: 0.11
Nodes (26): SubscriptionsTable(), DeleteConfirmDialog(), LessonsTable(), AccountTierCell(), AccountTierCellData, AssignLanguagesDialog(), GrantPlanOption, RoleBadge() (+18 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "sha256.ts"
Cohesion: 0.24
Nodes (9): encoder, h, INITIAL, K, leadingZeroBits(), rotr(), sha256(), sha256Hex() (+1 more)

### Community 55 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, agent:topics, build, dev, lint, messages:export (+5 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "sms.ts"
Cohesion: 0.27
Nodes (13): toLocalIranFormat(), assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode() (+5 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "payments-ledger.tsx"
Cohesion: 0.20
Nodes (15): BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv(), RevenueChart(), CheckoutDialog(), PROVIDER_ICONS (+7 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 63 - "quiz-form.tsx"
Cohesion: 0.18
Nodes (32): LessonPicker(), OPTION_KEYS, LOCALES, Values, OPTION_LABELS, QuestionFeedback, DialogContent, DialogDescription (+24 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "phone-accounts.ts"
Cohesion: 0.10
Nodes (20): completeProfile(), describeVerifyFailure(), destinationFor(), verifyPhoneCode(), welcomeHref(), GET(), generateMetadata(), LoginPage() (+12 more)

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
Cohesion: 0.14
Nodes (24): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+16 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.07
Nodes (48): updateRolePermissionsAction(), RolePermissionsContext, RolePermissionsProvider(), useRolePermissionOverrides(), useRolePermissions(), Mark(), RolePermissionEditor(), handleSave() (+40 more)

### Community 84 - "useTranslations"
Cohesion: 0.10
Nodes (15): AdminContentHeader(), ContentActionBar(), GrammarEntryFields(), LessonsMonitor(), LessonsMonitorPageView(), GrammarManager(), GrammarTable(), VocabularyManager() (+7 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.13
Nodes (20): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+12 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "seo.ts"
Cohesion: 0.32
Nodes (13): BlogPostPage(), generateMetadata(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep, collectionJsonLd(), JsonLd (+5 more)

### Community 90 - "PhoneAuthForm"
Cohesion: 0.21
Nodes (11): localFormat(), ltr(), PhoneAuthForm(), fail(), submitPhone(), countdownTickMs(), formatCountdown(), fa (+3 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "actions/auth.ts"
Cohesion: 0.12
Nodes (28): ActionResult, decideAndSend(), getAuthChallenge(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode(), useSolvedChallenge() (+20 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.15
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, DECKS, en (+10 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (20): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage(), ContentCoverageInput (+12 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/[slug]/page.tsx"
Cohesion: 0.20
Nodes (13): Props, BlogPostList(), remove(), BlogCta(), BlogCardVariant, BlogPostCard(), Meta(), postHref() (+5 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.12
Nodes (24): createContentVideo(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, ContentCategorySlug (+16 more)

### Community 126 - "learn-category-view.tsx"
Cohesion: 0.19
Nodes (11): LearnCategoryView(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonView(), LessonViewProps, QuizTabContent() (+3 more)

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

### Community 143 - "users.ts"
Cohesion: 0.35
Nodes (10): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave() (+2 more)

### Community 146 - "requireAdminPermission"
Cohesion: 0.13
Nodes (36): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+28 more)

### Community 149 - "quizzes/page.tsx"
Cohesion: 0.27
Nodes (8): AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), PageProps, resolveRequestedSlot(), AdminQuizzesPageView(), scopeLanguageList()

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.06
Nodes (39): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), generateMetadata(), PageProps, QuizPage(), UserQuizAttemptsPanel(), buildInitialFeedback(), QuizForm() (+31 more)

### Community 151 - "index.test.ts"
Cohesion: 0.20
Nodes (3): TIERS, Subscription, SubscriptionTier

### Community 152 - "curriculum/types.ts"
Cohesion: 0.13
Nodes (20): CONTENT_CATEGORIES, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES (+12 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "dashboard/page.tsx"
Cohesion: 0.17
Nodes (12): generateMetadata(), Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), AdminDashboard(), getInitial(), scoreBadgeClassName(), QuizSubmittedBanner() (+4 more)

### Community 160 - "getLevel"
Cohesion: 0.43
Nodes (7): generateMetadata(), generateMetadata(), LevelPage(), PageProps, generateMetadata(), getLanguageWithAvailability(), getLevel()

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 163 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+2 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "getDataRepository"
Cohesion: 0.16
Nodes (19): cancelSubscriptionAction(), saveGrammarReadingProgress(), submitQuizAction(), setLandingLanguageVisibilityAction(), DashboardPage(), generateMetadata(), LessonPage(), PageProps (+11 more)

### Community 173 - "[category]/page.tsx"
Cohesion: 0.14
Nodes (16): CategoryPage(), PageProps, LanguageCoursePage(), BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, isCategorySlug() (+8 more)

### Community 174 - "data-source.ts"
Cohesion: 0.24
Nodes (7): WelcomePreviewPage(), DataSource, getDataSource(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 175 - "llms.txt/route.ts"
Cohesion: 0.36
Nodes (6): dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 176 - "UserRowActions"
Cohesion: 0.32
Nodes (6): UserRowActions(), canChangeUserRole(), canChangeUserStatus(), deny(), isProtectedAccount(), resolveAdminToggleRole()

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "subscription-view.tsx"
Cohesion: 0.17
Nodes (15): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), SubscriptionView(), SubscriptionViewProps (+7 more)

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "advance-learning.ts"
Cohesion: 0.39
Nodes (4): getLanguage(), resolveLessonForLevel(), advanceLearningAfterQuiz(), getNextLevelSlug()

### Community 188 - "about-view.tsx"
Cohesion: 0.33
Nodes (4): generateMetadata(), AboutView(), TIMELINE_KEYS, VALUE_ICONS

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "schedule.ts"
Cohesion: 0.40
Nodes (4): dailySlots(), PUBLISH_HOUR_TEHRAN, PUBLISH_MINUTE_TEHRAN, tehranTimeToInstant()

## Knowledge Gaps
- **595 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+590 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **64 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `app-shell.tsx`, `utils.ts`, `category/[slug]/page.tsx`, `button.tsx`, `landing/pricing.ts`, `[quiz_id]/page.tsx`, `dashboard/page.tsx`, `content-form-panels.tsx`, `[language]/page.tsx`, `learn-category-hero.tsx`, `category-watermark.tsx`, `blog-shell.tsx`, `markdown.ts`, `blog.ts`, `subscription-view.tsx`, `money.ts`, `user-management-panel.tsx`, `BannerUploadForm`, `payments-ledger.tsx`, `app/layout.tsx`, `quiz-form.tsx`, `sections.tsx`, `useTranslations`, `PhoneAuthForm`, `lessons-monitor.tsx`, `blog/[slug]/page.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `admin/page.tsx`, `postgres/client.ts`, `app-shell.tsx`, `pipeline.ts`, `category/[slug]/page.tsx`, `curriculum-levels.ts`, `users.ts`, `requireAdminPermission`, `quizzes/page.tsx`, `[quiz_id]/page.tsx`, `blog/[id]/page.tsx`, `dashboard/page.tsx`, `getLevel`, `[language]/page.tsx`, `isLocalDataMode`, `action-guards.ts`, `getServerTranslator`, `pages.ts`, `markdown.ts`, `[category]/page.tsx`, `data-source.ts`, `llms.txt/route.ts`, `blog.ts`, `subscription-view.tsx`, `phone-accounts.ts`, `permissions/roles.ts`, `seo.ts`, `actions/auth.ts`, `app/page.tsx`, `blog/[slug]/page.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `admin/page.tsx`, `app-shell.tsx`, `cn`, `utils.ts`, `button.tsx`, `users.ts`, `requireAdminPermission`, `quizzes/page.tsx`, `[quiz_id]/page.tsx`, `jalali.ts`, `dashboard/page.tsx`, `content-form-panels.tsx`, `locale-provider.tsx`, `[language]/page.tsx`, `learn-category-hero.tsx`, `getServerTranslator`, `middleware.ts`, `pages.ts`, `UserRowActions`, `subscription-view.tsx`, `money.ts`, `user-management-panel.tsx`, `BannerUploadForm`, `video-lessons-grid.tsx`, `about-view.tsx`, `payments-ledger.tsx`, `quiz-form.tsx`, `sections.tsx`, `permissions/roles.ts`, `PhoneAuthForm`, `lessons-monitor.tsx`, `actions/content.ts`, `learn-category-view.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _595 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.02866698518872432 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._
- **Should `app-shell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07560975609756097 - nodes in this community are weakly interconnected._