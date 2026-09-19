# Graph Report - cursor P  (2026-09-19)

## Corpus Check
- 544 files · ~423,891 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2982 nodes · 8606 edges · 203 communities (135 shown, 68 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fc4fc797`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tick/route.ts
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- llms.txt/route.ts
- jalali.ts
- Quiz
- user-management-panel.tsx
- agent/config.ts
- seed.ts
- category/[slug]/page.tsx
- curriculum/types.ts
- middleware.ts
- card.tsx
- blog-image.ts
- 001_app_schema.sql
- period.ts
- users.ts
- providers/index.ts
- robots-metadata.test.ts
- jev-panel.tsx
- better-auth.ts
- requireAdminPermission
- schema.sql
- compilerOptions
- PaymentSettings
- devDependencies
- dependencies
- admin/page.tsx
- app/layout.tsx
- components.json
- pipeline.ts
- blog.ts
- cn
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- getServerTranslator
- page-skeletons.tsx
- data-source.ts
- arvan.ts
- markdown.ts
- admin.ts
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- [category]/page.tsx
- useTranslations
- لندینگ‌پیج و بلاگ — سند تحویل
- blog/[slug]/page.tsx
- phone-auth-form.tsx
- final-deployment/manifest.json
- phone-accounts.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- admin-dashboard.tsx
- video-embed.ts
- sync-local-content.mjs
- landing/pricing.ts
- index.test.ts
- user-list-order.test.ts
- billing/schema.test.ts
- vercel.json
- validations/auth.ts
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
- actions/auth.ts
- pg
- permissions/roles.ts
- button.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- i18n/types.ts
- run-log.tsx
- content-form-panels.tsx
- What You Must Do When Invoked
- 005_send_limits.sql
- otp-challenge.ts
- app/page.tsx
- lessons-monitor.tsx
- 20260730120000_banners.sql
- tailwind.config.ts
- better-auth
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
- agent/store.ts
- UserQuizAttempt
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
- local/repository.ts
- data/repository.ts
- visibility.ts
- band-exams.test.ts
- CurriculumLanguage
- blog/[id]/page.tsx
- @radix-ui/react-avatar
- getDataRepository
- validations/quiz.ts
- blog/languages.ts
- @radix-ui/react-dropdown-menu
- blog-agent.mjs
- lesson-view.tsx
- @radix-ui/react-slot
- three
- 006_banner_images.sql
- public.grammar_rules
- Rules
- Search engine visibility
- 008_phone_auth.sql
- dashboard-welcome-header.tsx
- sms-test.mjs
- reconcile.ts
- react-dom
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- Blog agent — handoff
- sonner
- local/store.ts
- actions/content.ts
- utils.ts
- run-migration.mjs
- about-view.tsx
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- ConnectionForm
- 011_blog_agent.sql
- blog-agent.ts
- actions/quiz.ts
- zod
- topic-queue.tsx
- next-themes
- 012_blog_agent_settings.sql
- next
- @radix-ui/react-radio-group
- @radix-ui/react-separator
- @radix-ui/react-tabs
- react
- tailwind-merge
- public.blog_agent_settings

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 215 edges
2. `cn()` - 194 edges
3. `getDataRepository()` - 168 edges
4. `DataRepository` - 121 edges
5. `Button` - 77 edges
6. `requireAdminPermission()` - 69 edges
7. `resolveMessage()` - 59 edges
8. `revalidateAppContent()` - 53 edges
9. `Card` - 38 edges
10. `CardContent` - 38 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/about/page.tsx → lib/i18n/metadata.ts
- `runTest()` --calls--> `testConnectionAction()`  [EXTRACTED]
  components/admin/blog/agent/connection-form.tsx → app/admin/actions/blog-agent.ts
- `BlogPostEditor()` --indirect_call--> `saveBlogPostAction()`  [INFERRED]
  components/admin/blog/blog-post-editor.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (203 total, 68 thin omitted)

### Community 0 - "tick/route.ts"
Cohesion: 0.18
Nodes (17): runTopicNowAction(), dynamic, GET(), maxDuration, POST(), wrongDataSource(), TopicQueue(), onConfirm() (+9 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.12
Nodes (23): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, writeGateSettings(), getAccountingSnapshot(), buildUpdate(), execute() (+15 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (6): BlogImage, BlogPost, DataRepository, GrammarRule, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.08
Nodes (10): UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo() (+2 more)

### Community 5 - "llms.txt/route.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 6 - "jalali.ts"
Cohesion: 0.18
Nodes (20): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+12 more)

### Community 7 - "Quiz"
Cohesion: 0.15
Nodes (15): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelInLanguages() (+7 more)

### Community 8 - "user-management-panel.tsx"
Cohesion: 0.10
Nodes (33): AddCurriculumLevelDialog(), onSubmit(), AccountTierCell(), AccountTierCellData, AssignLanguagesDialog(), handleSave(), ChangeRoleDialog(), handleSave() (+25 more)

### Community 9 - "agent/config.ts"
Cohesion: 0.11
Nodes (29): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), AiConnection (+21 more)

### Community 10 - "seed.ts"
Cohesion: 0.08
Nodes (17): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+9 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.22
Nodes (19): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata(), Props (+11 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.11
Nodes (21): CurriculumLevelManager(), LanguageCard(), ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguageCode(), getLanguagesMissingCodes(), LANGUAGE_CODES (+13 more)

### Community 13 - "middleware.ts"
Cohesion: 0.21
Nodes (12): updateLocalSession(), updatePostgresSession(), isPublicRoute(), redirectTo(), routeFor(), PUBLIC_ROUTES, IMPORTANT: You *must* return the supabaseResponse object as it is., IMPORTANT: Avoid writing any logic between createServerClient and (+4 more)

### Community 14 - "card.tsx"
Cohesion: 0.12
Nodes (36): TestState, SECTIONS, ConfirmDialog(), Field(), reportResult(), LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES (+28 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.10
Nodes (19): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE (+11 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 18 - "users.ts"
Cohesion: 0.27
Nodes (15): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), UserRowActions(), canChangeUserRole() (+7 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.11
Nodes (20): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+12 more)

### Community 21 - "jev-panel.tsx"
Cohesion: 0.11
Nodes (32): reviewTextAction(), saveGateSettingsAction(), fa(), JevPanel(), save(), ManualReview(), run(), MODES (+24 more)

### Community 22 - "better-auth.ts"
Cohesion: 0.14
Nodes (22): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, isIranianMobile(), isIranianPhone(), looksGenerated() (+14 more)

### Community 23 - "requireAdminPermission"
Cohesion: 0.16
Nodes (30): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+22 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "PaymentSettings"
Cohesion: 0.15
Nodes (14): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+6 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, @hookform/resolvers, lucide-react, nodemailer, dependencies, @aws-sdk/client-s3, gsap (+19 more)

### Community 29 - "admin/page.tsx"
Cohesion: 0.16
Nodes (18): AdminBlogPage(), metadata, AdminPage(), generateMetadata(), RolePermissionsContext, RolePermissionsProvider(), TierReference, readPhoneNumbers() (+10 more)

### Community 30 - "app/layout.tsx"
Cohesion: 0.11
Nodes (21): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie() (+13 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.11
Nodes (30): TokenUsage, costToman(), MODEL_RATES, ModelRate, loadContext(), makeCover(), messageOf(), NormalisedArticle (+22 more)

### Community 33 - "blog.ts"
Cohesion: 0.14
Nodes (14): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, resolveUploadError(), saveBlogPostAction() (+6 more)

### Community 34 - "cn"
Cohesion: 0.09
Nodes (40): PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv(), CheckRow(), Counter(), LessonsMonitor(), DeleteConfirmDialog() (+32 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.16
Nodes (23): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), dynamic, GET(), dynamic (+15 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.27
Nodes (8): NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 37 - "action-guards.ts"
Cohesion: 0.20
Nodes (10): AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireContentScope(), requireSuperAdminAction(), getAuthUser, getProfileById (+2 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.11
Nodes (34): AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata() (+26 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 41 - "arvan.ts"
Cohesion: 0.19
Nodes (20): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+12 more)

### Community 42 - "markdown.ts"
Cohesion: 0.16
Nodes (15): absolute(), dynamic, GET(), xmlEscape(), BlogToc(), countWords(), createBlogRenderer(), estimateReadingMinutes() (+7 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (32): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues (+24 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.29
Nodes (12): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+4 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.11
Nodes (26): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz() (+18 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "[category]/page.tsx"
Cohesion: 0.14
Nodes (25): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+17 more)

### Community 49 - "useTranslations"
Cohesion: 0.05
Nodes (61): AccountingKpis(), Tile(), BreakdownList(), RevenueChart(), SubscriptionsTable(), AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel() (+53 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "blog/[slug]/page.tsx"
Cohesion: 0.33
Nodes (14): BlogPostPage(), generateMetadata(), Props, resolveBlogLanguages(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep (+6 more)

### Community 52 - "phone-auth-form.tsx"
Cohesion: 0.23
Nodes (13): getAuthChallenge(), OtpInput(), absorb(), focusBox(), localFormat(), ltr(), PhoneAuthForm(), fail() (+5 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "phone-accounts.ts"
Cohesion: 0.18
Nodes (11): GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), WelcomePage(), ProfileDetails, ProfileState (+3 more)

### Community 55 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, agent:topics, build, dev, lint, messages:export (+5 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "admin-dashboard.tsx"
Cohesion: 0.20
Nodes (13): DashboardPage(), generateMetadata(), AdminDashboard(), getInitial(), NAV_ICONS, scoreToneClassName(), IndexRow(), PlateIndex() (+5 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "landing/pricing.ts"
Cohesion: 0.05
Nodes (53): SubscriptionPlanCards(), pricingFor(), rialFor(), register(), formatPaidAmount(), formatRialAsToman(), LOCALE_TAGS, FxFetchResult (+45 more)

### Community 63 - "user-list-order.test.ts"
Cohesion: 0.31
Nodes (7): orderUsersForTable(), roleRank(), account(), learners(), visible(), VISIBLE_USER_LIMIT, ROLE_SLUGS

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "validations/auth.ts"
Cohesion: 0.17
Nodes (13): todayJalali(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema, phoneSchema (+5 more)

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

### Community 80 - "actions/auth.ts"
Cohesion: 0.12
Nodes (24): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getClientIpForRateLimit(), padTiming(), refusalKey() (+16 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.08
Nodes (32): useRolePermissionOverrides(), RolePermissionEditor(), handleSave(), RolesPermissionsPanel(), ADMIN_ROLE_SLUGS, ALLOWED, EDITABLE_ROLE_SLUGS, EditableRoleSlug (+24 more)

### Community 84 - "button.tsx"
Cohesion: 0.15
Nodes (20): LessonsMonitorPageView(), Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), UserDashboard(), Figure(), FigureRail(), useCountUp() (+12 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "i18n/types.ts"
Cohesion: 0.17
Nodes (16): fa, t, Translator, Unit, messages, createTranslator(), getNestedValue(), interpolate() (+8 more)

### Community 89 - "run-log.tsx"
Cohesion: 0.13
Nodes (19): bulkAddTopicsAction(), BlogAgentPanel(), formatScore(), GATE_OUTCOME, gateLabel(), RUN_STATUS, RunLog(), SettingsForm() (+11 more)

### Community 90 - "content-form-panels.tsx"
Cohesion: 0.06
Nodes (78): BillingSettingsForm(), handleRefreshRate(), onSubmit(), ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel() (+70 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (24): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+16 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.11
Nodes (24): FLAG_CODE, generateMetadata(), Home(), LandingCourse, LOCALES, LanguageSlug, getServerLocale(), BRAND_MARK (+16 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.09
Nodes (24): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, CONTENT_CATEGORIES, ContentStatus, ContentWizardContext, ContentWizardTarget (+16 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/types.ts"
Cohesion: 0.15
Nodes (12): BlogPostEditor(), BlogPostList(), remove(), Pagination(), BlogCardVariant, BlogPostCard(), Meta(), postHref() (+4 more)

### Community 125 - "agent/store.ts"
Cohesion: 0.18
Nodes (17): AdminBlogAgentPage(), dynamic, maxDuration, metadata, readGateSettings(), AdminTopicStatus, AgentTopic, costSince() (+9 more)

### Community 126 - "UserQuizAttempt"
Cohesion: 0.14
Nodes (6): buildLearnerEngagementMetrics(), buildAchievements(), fetchUserDashboardData(), fetchQuizManagementStats(), QuizQuestion, UserQuizAttempt

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

### Community 142 - "local/repository.ts"
Cohesion: 0.30
Nodes (9): clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url(), verifyLocalSessionToken(), BANNER_UPLOAD_DIR (+1 more)

### Community 143 - "data/repository.ts"
Cohesion: 0.08
Nodes (23): GrammarReader(), BlogPostInput, CurriculumLevelOverrideRow, getCurriculumLevelsForLanguage(), blogImageUrl(), BlogImageRow, BlogPostRow, failure() (+15 more)

### Community 144 - "visibility.ts"
Cohesion: 0.19
Nodes (10): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), LANDING_LANGUAGES, LandingLanguageDefinition, LandingLanguageSlug, LandmarkId (+2 more)

### Community 146 - "CurriculumLanguage"
Cohesion: 0.12
Nodes (23): ContinueLearningCard(), BandExamCard, CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLanguageView() (+15 more)

### Community 147 - "blog/[id]/page.tsx"
Cohesion: 0.22
Nodes (3): AdminBlogEditorPage(), metadata, ErrorState()

### Community 149 - "getDataRepository"
Cohesion: 0.16
Nodes (18): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), cancelSubscriptionAction(), saveGrammarReadingProgress(), setLandingLanguageVisibilityAction(), updateRolePermissionsAction(), AdminLayout(), dynamic (+10 more)

### Community 150 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.18
Nodes (10): postSchema, dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug (+2 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "lesson-view.tsx"
Cohesion: 0.24
Nodes (8): generateMetadata(), LessonPage(), PageProps, LessonDetailTabs(), LessonView(), LessonViewProps, findLevelByOrderNumber(), resolveLessonNavigation()

### Community 160 - "Rules"
Cohesion: 0.14
Nodes (13): 1. Put every Latin run in backticks, 2. Never let a line begin or end with Latin, 3. Keep punctuation on the Persian side, 4. Move any list of Latin items out of the prose, 5. Persian digits in prose, Latin digits in code, 6. Never put a bare URL in a sentence, 7. Prefer a Persian word when a real one exists, 8. Code blocks over inline code for anything long (+5 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 163 - "dashboard-welcome-header.tsx"
Cohesion: 0.29
Nodes (7): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), Avatar, AvatarFallback, AvatarImage, LearnerEngagementMetrics

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 166 - "reconcile.ts"
Cohesion: 0.27
Nodes (6): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 174 - "local/store.ts"
Cohesion: 0.14
Nodes (22): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), createLocalRepository(), commitStore() (+14 more)

### Community 175 - "actions/content.ts"
Cohesion: 0.10
Nodes (36): abortGrammarUpload(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), finishGrammarUpload(), loadLessonContent(), renderGrammarPages(), startGrammarUpload() (+28 more)

### Community 176 - "utils.ts"
Cohesion: 0.11
Nodes (19): ACCEPTED_TYPES, ACCEPTED, AdminSubscriptionPageView(), EntitlementSettingsPanel(), onSubmit(), LOCALES, SubscriptionPlanEditDialog(), onSubmit() (+11 more)

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "about-view.tsx"
Cohesion: 0.33
Nodes (4): generateMetadata(), AboutView(), TIMELINE_KEYS, VALUE_ICONS

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "ConnectionForm"
Cohesion: 0.50
Nodes (5): ConnectionForm(), runTest(), save(), submit(), keyHint()

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.06
Nodes (61): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput, dateField (+53 more)

### Community 192 - "actions/quiz.ts"
Cohesion: 0.10
Nodes (25): submitQuizAction(), generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit() (+17 more)

### Community 196 - "topic-queue.tsx"
Cohesion: 0.17
Nodes (21): ActionOutcome, formatJalaliDay(), Option, selectClassName, StatusBadge(), TOPIC_STATUS, Confirmation, TopicFields() (+13 more)

## Knowledge Gaps
- **668 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+663 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **68 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `app-shell.tsx`, `llms.txt/route.ts`, `agent/config.ts`, `category/[slug]/page.tsx`, `visibility.ts`, `users.ts`, `blog/[id]/page.tsx`, `requireAdminPermission`, `blog/languages.ts`, `lesson-view.tsx`, `admin/page.tsx`, `pipeline.ts`, `blog.ts`, `isLocalDataMode`, `action-guards.ts`, `getServerTranslator`, `data-source.ts`, `markdown.ts`, `admin.ts`, `curriculum-levels.ts`, `local/store.ts`, `actions/content.ts`, `[category]/page.tsx`, `blog/[slug]/page.tsx`, `phone-accounts.ts`, `admin-dashboard.tsx`, `actions/quiz.ts`, `actions/auth.ts`, `app/page.tsx`, `agent/store.ts`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `jalali.ts`, `user-management-panel.tsx`, `curriculum/types.ts`, `card.tsx`, `data/repository.ts`, `users.ts`, `CurriculumLanguage`, `requireAdminPermission`, `lesson-view.tsx`, `cn`, `dashboard-welcome-header.tsx`, `getServerTranslator`, `actions/content.ts`, `utils.ts`, `about-view.tsx`, `phone-auth-form.tsx`, `BannerUploadForm`, `admin-dashboard.tsx`, `landing/pricing.ts`, `actions/quiz.ts`, `topic-queue.tsx`, `sections.tsx`, `permissions/roles.ts`, `button.tsx`, `content-form-panels.tsx`, `lessons-monitor.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `user-management-panel.tsx`, `category/[slug]/page.tsx`, `curriculum/types.ts`, `card.tsx`, `CurriculumLanguage`, `app/layout.tsx`, `blog.ts`, `dashboard-welcome-header.tsx`, `blog-shell.tsx`, `utils.ts`, `useTranslations`, `phone-auth-form.tsx`, `BannerUploadForm`, `admin-dashboard.tsx`, `landing/pricing.ts`, `actions/quiz.ts`, `topic-queue.tsx`, `sections.tsx`, `button.tsx`, `content-form-panels.tsx`, `lessons-monitor.tsx`, `blog/types.ts`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _668 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11742424242424243 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03340040241448692 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._