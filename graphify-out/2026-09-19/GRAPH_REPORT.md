# Graph Report - cursor P  (2026-09-19)

## Corpus Check
- 541 files · ~423,038 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2975 nodes · 8575 edges · 207 communities (134 shown, 73 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cfc79704`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin-accounting-page-view.tsx
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- getStaticSiteUrl
- jalali.ts
- Quiz
- user-management-panel.tsx
- ingest/route.ts
- seed.ts
- seo.ts
- CurriculumLanguage
- middleware.ts
- button.tsx
- blog-image-library.tsx
- 001_app_schema.sql
- period.ts
- subscription-view.tsx
- providers/index.ts
- robots-metadata.test.ts
- gate.ts
- better-auth.ts
- getDataRepository
- schema.sql
- compilerOptions
- billing/accounting.ts
- devDependencies
- dependencies
- admin/page.tsx
- app/layout.tsx
- components.json
- pipeline.ts
- rss.xml/route.ts
- grammar-table.tsx
- checkout.ts
- blog-shell.tsx
- action-guards.ts
- data/index.ts
- page-skeletons.tsx
- isLocalDataMode
- arvan.ts
- blog/[slug]/page.tsx
- admin.ts
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- [category]/page.tsx
- useTranslations
- لندینگ‌پیج و بلاگ — سند تحویل
- agent/config.ts
- phone-auth-form.tsx
- final-deployment/manifest.json
- phone-accounts.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- PaymentSettings
- video-embed.ts
- sync-local-content.mjs
- landing/pricing.ts
- [language]/page.tsx
- user-list-order.test.ts
- billing/schema.test.ts
- vercel.json
- duration.test.ts
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
- plate.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- server-locale.ts
- formatTehranDateTime
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
- agent-panel.tsx
- data.ts
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
- local-phone-auth.ts
- data/repository.ts
- [quiz_id]/page.tsx
- band-exams.test.ts
- curriculum/types.ts
- scheduler.ts
- @radix-ui/react-avatar
- refresh.ts
- validations/quiz.ts
- blog/languages.ts
- @radix-ui/react-dropdown-menu
- blog-agent.mjs
- sms.ts
- @radix-ui/react-slot
- three
- 006_banner_images.sql
- public.grammar_rules
- Rules
- Search engine visibility
- 008_phone_auth.sql
- LanguageSlug
- sms-test.mjs
- CreateContentSection
- react-dom
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- Blog agent — handoff
- sonner
- local/repository.ts
- actions/content.ts
- TierCapabilitiesPanel
- run-migration.mjs
- ChangeRoleDialog
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- money.ts
- 011_blog_agent.sql
- blog-agent.ts
- BlogImage
- actions/quiz.ts
- zod
- VideoLesson
- Payment
- cn
- entitlements/schema.test.ts
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
1. `useTranslations()` - 213 edges
2. `cn()` - 194 edges
3. `getDataRepository()` - 166 edges
4. `DataRepository` - 121 edges
5. `Button` - 76 edges
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
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `saveAlt()` --calls--> `updateBlogImageAltAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts
- `remove()` --calls--> `deleteBlogImageAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (207 total, 73 thin omitted)

### Community 0 - "admin-accounting-page-view.tsx"
Cohesion: 0.12
Nodes (24): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger() (+16 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.11
Nodes (29): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, listTopics(), blogImageUrl(), getAccountingSnapshot(), buildUpdate() (+21 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (21): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+13 more)

### Community 5 - "getStaticSiteUrl"
Cohesion: 0.20
Nodes (12): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), dynamic, revalidate (+4 more)

### Community 6 - "jalali.ts"
Cohesion: 0.13
Nodes (27): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+19 more)

### Community 7 - "Quiz"
Cohesion: 0.14
Nodes (17): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+9 more)

### Community 8 - "user-management-panel.tsx"
Cohesion: 0.10
Nodes (33): formatJalaliDay(), Confirmation, TopicFields(), AddCurriculumLevelDialog(), onSubmit(), AccountTierCell(), AccountTierCellData, AssignLanguagesDialog() (+25 more)

### Community 9 - "ingest/route.ts"
Cohesion: 0.14
Nodes (21): saveBlogPostAction(), dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover() (+13 more)

### Community 10 - "seed.ts"
Cohesion: 0.15
Nodes (13): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS (+5 more)

### Community 11 - "seo.ts"
Cohesion: 0.24
Nodes (18): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), BlogIndexPage(), metadata, BlogListView() (+10 more)

### Community 12 - "CurriculumLanguage"
Cohesion: 0.27
Nodes (10): FlagIcon(), FLAGS, US_STARS, LanguageCard(), SubscriptionLanguageTabs(), getLanguageCode(), getLanguagesMissingCodes(), LANGUAGE_CODES (+2 more)

### Community 13 - "middleware.ts"
Cohesion: 0.14
Nodes (18): CompleteProfileForm(), onSubmit(), updateLocalSession(), updatePostgresSession(), AUTH_PATHS, isPublicRoute(), PUBLIC_ROUTES, redirectTo() (+10 more)

### Community 14 - "button.tsx"
Cohesion: 0.10
Nodes (39): TestState, MODES, OUTCOME_LABELS, SECTIONS, GATE_OUTCOME, RUN_STATUS, ConfirmDialog(), ErrorText() (+31 more)

### Community 15 - "blog-image-library.tsx"
Cohesion: 0.08
Nodes (24): ACCEPTED, BlogImageLibrary(), remove(), saveAlt(), formatBytes(), ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl() (+16 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "period.ts"
Cohesion: 0.29
Nodes (9): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+1 more)

### Community 18 - "subscription-view.tsx"
Cohesion: 0.31
Nodes (6): SubscriptionView(), SubscriptionViewProps, interpolateText(), BILLING_PERIOD_MONTHS, BillingPeriodMonths, PaymentProviderSlug

### Community 19 - "providers/index.ts"
Cohesion: 0.11
Nodes (20): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+12 more)

### Community 21 - "gate.ts"
Cohesion: 0.16
Nodes (19): reviewTextAction(), fa(), ManualReview(), run(), shown(), describeVerdict(), failsRun(), GateOutcome (+11 more)

### Community 22 - "better-auth.ts"
Cohesion: 0.23
Nodes (10): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, isIranianMobile(), isIranianPhone(), looksGenerated() (+2 more)

### Community 23 - "getDataRepository"
Cohesion: 0.13
Nodes (46): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+38 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "billing/accounting.ts"
Cohesion: 0.15
Nodes (16): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+8 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, @hookform/resolvers, lucide-react, nodemailer, dependencies, @aws-sdk/client-s3, gsap (+19 more)

### Community 29 - "admin/page.tsx"
Cohesion: 0.12
Nodes (27): AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata, AdminLandingPage(), metadata, AdminPage(), LandingLanguagePanel() (+19 more)

### Community 30 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+2 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.10
Nodes (36): runTopicNowAction(), TokenUsage, costToman(), MODEL_RATES, ModelRate, loadConfigOrReason(), loadContext(), makeCover() (+28 more)

### Community 33 - "rss.xml/route.ts"
Cohesion: 0.60
Nodes (4): absolute(), dynamic, GET(), xmlEscape()

### Community 34 - "grammar-table.tsx"
Cohesion: 0.18
Nodes (18): SubscriptionsTable(), DeleteConfirmDialog(), handleConfirm(), GrammarTable(), LessonsTable(), VocabularyTable(), QuizAttemptHistoryRow, QuizHistoryTable() (+10 more)

### Community 35 - "checkout.ts"
Cohesion: 0.15
Nodes (16): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), dynamic, GET(), getAvailableProviders() (+8 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.23
Nodes (9): BlogShell(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor() (+1 more)

### Community 37 - "action-guards.ts"
Cohesion: 0.18
Nodes (12): cancelSubscriptionAction(), saveGrammarReadingProgress(), AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), requireContentScope() (+4 more)

### Community 38 - "data/index.ts"
Cohesion: 0.08
Nodes (42): generateMetadata(), destinationFor(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata() (+34 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "isLocalDataMode"
Cohesion: 0.17
Nodes (16): dynamic, GET(), maxDuration, POST(), wrongDataSource(), dynamic, GET(), WelcomePreviewPage() (+8 more)

### Community 41 - "arvan.ts"
Cohesion: 0.19
Nodes (20): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+12 more)

### Community 42 - "blog/[slug]/page.tsx"
Cohesion: 0.18
Nodes (17): BlogPostPage(), generateMetadata(), Props, BlogToc(), countWords(), createBlogRenderer(), extractImageUrls(), MarkdownContext (+9 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (34): bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, contentVocabularySchema, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues (+26 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.19
Nodes (17): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), handleConfirm(), isLanguageSlug() (+9 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.13
Nodes (22): BandExam, getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, deriveQuizMetadataFromLesson(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel() (+14 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "[category]/page.tsx"
Cohesion: 0.16
Nodes (17): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, LearnLevelView(), LearnLevelViewProps (+9 more)

### Community 49 - "useTranslations"
Cohesion: 0.06
Nodes (56): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), ContentActionBar(), GrammarEntryFields(), LessonsMonitorPageView(), GrammarForm(), onSubmit() (+48 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "agent/config.ts"
Cohesion: 0.22
Nodes (11): AiConnection, DEFAULT_AI_BASE_URL, AgentConfig, ApiKeyState, flag(), loadAgentConfig(), ResolvedAgentConfig, resolveLayers() (+3 more)

### Community 52 - "phone-auth-form.tsx"
Cohesion: 0.24
Nodes (12): getAuthChallenge(), OtpInput(), absorb(), focusBox(), localFormat(), ltr(), PhoneAuthForm(), fail() (+4 more)

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

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "landing/pricing.ts"
Cohesion: 0.15
Nodes (14): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), convertEurCentsToRial(), rialToToman(), getLandingPricing(), toToman() (+6 more)

### Community 62 - "[language]/page.tsx"
Cohesion: 0.20
Nodes (12): LanguageCoursePage(), PageProps, groupLevelExamsByBand(), ALL_UNLOCKED, cefrBandOf(), cheapestTierUnlocking(), Entitlement, EntitlementGate (+4 more)

### Community 63 - "user-list-order.test.ts"
Cohesion: 0.36
Nodes (6): orderUsersForTable(), roleRank(), account(), learners(), visible(), VISIBLE_USER_LIMIT

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "duration.test.ts"
Cohesion: 0.32
Nodes (6): countdownTickMs(), formatCountdown(), fa, t, Translator, Unit

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
Nodes (36): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+28 more)

### Community 80 - "actions/auth.ts"
Cohesion: 0.12
Nodes (24): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode() (+16 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.07
Nodes (54): updateRolePermissionsAction(), countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), useRolePermissions() (+46 more)

### Community 84 - "plate.tsx"
Cohesion: 0.07
Nodes (38): AboutView(), TIMELINE_KEYS, VALUE_ICONS, Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), AdminDashboard(), getInitial() (+30 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "server-locale.ts"
Cohesion: 0.14
Nodes (23): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+15 more)

### Community 89 - "formatTehranDateTime"
Cohesion: 0.12
Nodes (19): bulkAddTopicsAction(), nextFreeDay(), JevPanel(), SettingsForm(), submit(), formatTehranDateTime(), BulkAddCard(), submit() (+11 more)

### Community 90 - "content-form-panels.tsx"
Cohesion: 0.06
Nodes (77): ACCEPTED_TYPES, ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarProgress, QuizContentPanel() (+69 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (23): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+15 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.14
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, DECKS, en (+10 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.11
Nodes (21): LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage() (+13 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/types.ts"
Cohesion: 0.22
Nodes (13): BlogPostList(), remove(), BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate(), resolveBlogLanguages() (+5 more)

### Community 125 - "agent-panel.tsx"
Cohesion: 0.10
Nodes (32): AdminBlogAgentPage(), dynamic, maxDuration, metadata, BlogAgentPanel(), Tone, TONES, PromptEditor() (+24 more)

### Community 126 - "data.ts"
Cohesion: 0.12
Nodes (8): buildLearnerEngagementMetrics(), buildAchievements(), fetchUserDashboardData(), EnrichedQuiz, fetchEnrichedQuizzes(), fetchQuizManagementStats(), filterQuizzes(), QuizPathFilter

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

### Community 142 - "local-phone-auth.ts"
Cohesion: 0.20
Nodes (14): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret() (+6 more)

### Community 143 - "data/repository.ts"
Cohesion: 0.09
Nodes (13): BlogPostInput, AdminSubscriptionSummary, AuthUser, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, GrammarPage (+5 more)

### Community 144 - "[quiz_id]/page.tsx"
Cohesion: 0.27
Nodes (6): PageProps, QuizPage(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions(), QuizQuestion

### Community 146 - "curriculum/types.ts"
Cohesion: 0.12
Nodes (25): CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LevelCategoryGrid(), LevelCategoryGridProps, CONTENT_CATEGORIES, ContentStatus, CATEGORY_ACCENTS (+17 more)

### Community 147 - "scheduler.ts"
Cohesion: 0.26
Nodes (12): register(), isRefreshOverdue(), lastRunAtOrBefore(), millisecondsUntilNextRun(), nextRunAfter(), REFRESH_HOUR_TEHRAN, REFRESH_MINUTE_TEHRAN, runInstantForSameDay() (+4 more)

### Community 149 - "refresh.ts"
Cohesion: 0.13
Nodes (15): dynamic, GET(), FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload (+7 more)

### Community 150 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.21
Nodes (9): postSchema, dynamic, generateMetadata(), Props, BlogCta(), BlogLanguage, BlogLanguageSlug, BY_SLUG (+1 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "sms.ts"
Cohesion: 0.29
Nodes (12): assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode(), RestResult (+4 more)

### Community 160 - "Rules"
Cohesion: 0.14
Nodes (13): 1. Put every Latin run in backticks, 2. Never let a line begin or end with Latin, 3. Keep punctuation on the Persian side, 4. Move any list of Latin items out of the prose, 5. Persian digits in prose, Latin digits in code, 6. Never put a bare URL in a sentence, 7. Prefer a Persian word when a real one exists, 8. Code blocks over inline code for anything long (+5 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 163 - "LanguageSlug"
Cohesion: 0.17
Nodes (9): LandingCourse, LOCALES, LanguageSlug, BRAND_MARK, BrandMark, en, fa, it (+1 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 166 - "CreateContentSection"
Cohesion: 0.50
Nodes (3): CreateContentSection(), findLessonForLevel(), stepForJump()

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 174 - "local/repository.ts"
Cohesion: 0.14
Nodes (25): dynamic, GET(), markFailed(), redirectToResult(), settle(), BANNER_UPLOAD_DIR, BLOG_UPLOAD_DIR, createLocalRepository() (+17 more)

### Community 175 - "actions/content.ts"
Cohesion: 0.11
Nodes (32): abortGrammarUpload(), finishGrammarUpload(), loadLessonContent(), renderGrammarPages(), startGrammarUpload(), submit(), ExistingContentList(), REMOVE (+24 more)

### Community 176 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "ChangeRoleDialog"
Cohesion: 0.67
Nodes (3): ChangeRoleDialog(), handleSave(), handleSubmit()

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "money.ts"
Cohesion: 0.29
Nodes (12): BillingCurrency, centsToEur(), computePrice(), divRoundHalfUp(), eurToCents(), IrrConversionInput, PriceBreakdown, RateAcceptance (+4 more)

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.05
Nodes (66): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput, dateField (+58 more)

### Community 192 - "actions/quiz.ts"
Cohesion: 0.11
Nodes (23): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), submitQuizAction(), UserQuizAttemptsPanel(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit() (+15 more)

### Community 196 - "cn"
Cohesion: 0.09
Nodes (33): ActionOutcome, selectClassName, StatusBadge(), tehranInputValues(), tomorrowInTehran(), TOPIC_STATUS, CheckRow(), Counter() (+25 more)

## Knowledge Gaps
- **669 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+664 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **73 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/repository.ts`, `app-shell.tsx`, `getStaticSiteUrl`, `ingest/route.ts`, `seo.ts`, `[quiz_id]/page.tsx`, `refresh.ts`, `admin/page.tsx`, `pipeline.ts`, `rss.xml/route.ts`, `checkout.ts`, `action-guards.ts`, `data/index.ts`, `isLocalDataMode`, `blog/[slug]/page.tsx`, `curriculum-levels.ts`, `local/repository.ts`, `actions/content.ts`, `[category]/page.tsx`, `phone-accounts.ts`, `[language]/page.tsx`, `actions/quiz.ts`, `actions/auth.ts`, `permissions/roles.ts`, `app/page.tsx`, `blog/types.ts`, `agent-panel.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `admin-accounting-page-view.tsx`, `app-shell.tsx`, `user-management-panel.tsx`, `seo.ts`, `CurriculumLanguage`, `button.tsx`, `blog-image-library.tsx`, `curriculum/types.ts`, `subscription-view.tsx`, `app/layout.tsx`, `grammar-table.tsx`, `blog-shell.tsx`, `CreateContentSection`, `useTranslations`, `phone-auth-form.tsx`, `BannerUploadForm`, `landing/pricing.ts`, `actions/quiz.ts`, `sections.tsx`, `plate.tsx`, `content-form-panels.tsx`, `lessons-monitor.tsx`, `blog/types.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `admin-accounting-page-view.tsx`, `app-shell.tsx`, `jalali.ts`, `user-management-panel.tsx`, `CurriculumLanguage`, `middleware.ts`, `button.tsx`, `curriculum/types.ts`, `subscription-view.tsx`, `getDataRepository`, `admin/page.tsx`, `grammar-table.tsx`, `CreateContentSection`, `data/index.ts`, `actions/content.ts`, `TierCapabilitiesPanel`, `[category]/page.tsx`, `ChangeRoleDialog`, `phone-auth-form.tsx`, `BannerUploadForm`, `landing/pricing.ts`, `actions/quiz.ts`, `cn`, `sections.tsx`, `permissions/roles.ts`, `plate.tsx`, `content-form-panels.tsx`, `lessons-monitor.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _669 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `admin-accounting-page-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12258064516129032 - nodes in this community are weakly interconnected._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10661268556005399 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.033282130056323606 - nodes in this community are weakly interconnected._