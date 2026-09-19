# Graph Report - cursor P  (2026-09-15)

## Corpus Check
- 529 files · ~412,712 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2908 nodes · 8342 edges · 202 communities (136 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b2d8b4e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- grammar-reader.tsx
- jalali.ts
- Lesson
- validations/auth.ts
- data/repository.ts
- PaymentSettings
- category/[slug]/page.tsx
- curriculum/types.ts
- local/store.ts
- button.tsx
- blog-image.ts
- 001_app_schema.sql
- local/repository.ts
- blog.ts
- providers/index.ts
- robots-metadata.test.ts
- user-row-actions.tsx
- better-auth.ts
- requireAdminPermission
- schema.sql
- compilerOptions
- blog/[id]/page.tsx
- devDependencies
- dependencies
- admin/page.tsx
- i18n/types.ts
- components.json
- pipeline.ts
- agent/store.ts
- sms.ts
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- getServerTranslator
- page-skeletons.tsx
- middleware.ts
- arvan.ts
- markdown.ts
- admin.ts
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- content-form-panels.tsx
- checkout.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- agent/config.ts
- utils.ts
- final-deployment/manifest.json
- actions/auth.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- sha256.ts
- video-embed.ts
- sync-local-content.mjs
- seed.ts
- app/layout.tsx
- RoleSlug
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
- refresh.ts
- pg
- permissions/roles.ts
- useTranslations
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- PhoneAuthForm
- ship.mjs
- resolveMessage
- What You Must Do When Invoked
- 005_send_limits.sql
- otp-challenge.ts
- app/page.tsx
- lessons-monitor.tsx
- 20260730120000_banners.sql
- tailwind.config.ts
- pages.ts
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
- landing/pricing.ts
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
- service-client.ts
- blog/[slug]/page.tsx
- actions/roles.ts
- lucide-react
- getDataRepository
- react-hook-form
- @radix-ui/react-avatar
- banner-list.tsx
- actions/quiz.ts
- blog/languages.ts
- [category]/page.tsx
- blog-agent.mjs
- availability.ts
- [quiz_id]/page.tsx
- three
- 006_banner_images.sql
- public.grammar_rules
- Rules
- Search engine visibility
- 008_phone_auth.sql
- hero.tsx
- sms-test.mjs
- @radix-ui/react-label
- role-permissions-context.tsx
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- Blog agent — handoff
- band-exams.test.ts
- TierCapabilitiesPanel
- llms.txt/route.ts
- edit-curriculum-level-dialog.tsx
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
- plans.ts
- reconcile-payments/route.ts
- 011_blog_agent.sql
- blog-agent.ts
- next
- tailwindcss-animate
- zod
- @radix-ui/react-alert-dialog
- @radix-ui/react-separator
- @radix-ui/react-tabs
- entitlements/schema.test.ts
- react
- @supabase/ssr
- 012_blog_agent_settings.sql
- @types/nodemailer

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 213 edges
2. `cn()` - 185 edges
3. `getDataRepository()` - 166 edges
4. `DataRepository` - 121 edges
5. `Button` - 76 edges
6. `requireAdminPermission()` - 69 edges
7. `resolveMessage()` - 59 edges
8. `revalidateAppContent()` - 53 edges
9. `Badge()` - 47 edges
10. `Card` - 39 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/languages/page.tsx → lib/i18n/metadata.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/quizzes/monitor/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (202 total, 66 thin omitted)

### Community 0 - "cn"
Cohesion: 0.08
Nodes (35): AccountingKpis(), Tile(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv() (+27 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.13
Nodes (20): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool() (+12 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (8): BlogImage, DataRepository, fetchQuizManagementStats(), GrammarRule, Payment, Profile, QuizQuestion, VideoLesson

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (21): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+13 more)

### Community 5 - "grammar-reader.tsx"
Cohesion: 0.43
Nodes (3): saveGrammarReadingProgress(), GrammarReader(), SignedGrammarPage

### Community 6 - "jalali.ts"
Cohesion: 0.18
Nodes (19): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+11 more)

### Community 7 - "Lesson"
Cohesion: 0.13
Nodes (20): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelInLanguages() (+12 more)

### Community 8 - "validations/auth.ts"
Cohesion: 0.18
Nodes (14): isValidJalaliDate(), todayJalali(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema (+6 more)

### Community 9 - "data/repository.ts"
Cohesion: 0.09
Nodes (21): BlogPostInput, CurriculumLevelOverrideRow, getCurriculumLevelsForLanguage(), blogImageUrl(), BlogImageRow, BlogPostRow, failure(), mapBlogImage() (+13 more)

### Community 10 - "PaymentSettings"
Cohesion: 0.15
Nodes (17): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+9 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.26
Nodes (17): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata(), Props (+9 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.08
Nodes (39): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView() (+31 more)

### Community 13 - "local/store.ts"
Cohesion: 0.16
Nodes (20): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+12 more)

### Community 14 - "button.tsx"
Cohesion: 0.14
Nodes (32): TestState, SECTIONS, RUN_STATUS, ConfirmDialog(), Field(), CheckRow(), Counter(), DeleteConfirmDialog() (+24 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.10
Nodes (19): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE (+11 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "local/repository.ts"
Cohesion: 0.23
Nodes (11): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+3 more)

### Community 18 - "blog.ts"
Cohesion: 0.10
Nodes (21): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, postSchema, resolveUploadError() (+13 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.13
Nodes (18): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+10 more)

### Community 21 - "user-row-actions.tsx"
Cohesion: 0.19
Nodes (20): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), AssignLanguagesDialog(), handleSave() (+12 more)

### Community 22 - "better-auth.ts"
Cohesion: 0.17
Nodes (14): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+6 more)

### Community 23 - "requireAdminPermission"
Cohesion: 0.13
Nodes (34): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), grantSubscriptionAction() (+26 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "blog/[id]/page.tsx"
Cohesion: 0.22
Nodes (3): AdminBlogEditorPage(), metadata, ErrorState()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, better-auth, gsap, @hookform/resolvers, next-themes, nodemailer, dependencies, @aws-sdk/client-s3 (+19 more)

### Community 29 - "admin/page.tsx"
Cohesion: 0.21
Nodes (17): AdminBlogPage(), metadata, AdminPage(), DashboardPage(), generateMetadata(), AdminDashboard(), getInitial(), scoreBadgeClassName() (+9 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.14
Nodes (20): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+12 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.10
Nodes (39): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), costToman() (+31 more)

### Community 33 - "agent/store.ts"
Cohesion: 0.12
Nodes (24): AdminBlogAgentPage(), dynamic, maxDuration, metadata, BlogAgentPanel(), Tone, TONES, PromptEditor() (+16 more)

### Community 34 - "sms.ts"
Cohesion: 0.29
Nodes (12): assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode(), RestResult (+4 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.14
Nodes (21): dynamic, GET(), maxDuration, POST(), wrongDataSource(), dynamic, GET(), supabaseFxStore() (+13 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.31
Nodes (7): BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 37 - "action-guards.ts"
Cohesion: 0.18
Nodes (11): AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireContentScope(), requireSuperAdminAction(), getAuthUser, getProfileById (+3 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.13
Nodes (20): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), generateMetadata(), AdminSubscriptionPage(), generateMetadata() (+12 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (24): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+16 more)

### Community 41 - "arvan.ts"
Cohesion: 0.15
Nodes (23): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+15 more)

### Community 42 - "markdown.ts"
Cohesion: 0.24
Nodes (7): BlogToc(), createBlogRenderer(), MarkdownContext, RenderedPost, renderMarkdown(), renderPost(), TocEntry

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (33): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), onSubmit(), BannerValues, BillingSettingsValues (+25 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.24
Nodes (15): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), AddCurriculumLevelDialog(), onSubmit() (+7 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.16
Nodes (15): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, ExtendedQuiz, ExtendedQuizQuestion, getSectionLabel(), normalizeAnswer() (+7 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "content-form-panels.tsx"
Cohesion: 0.11
Nodes (24): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), finishGrammarUpload(), ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion (+16 more)

### Community 49 - "checkout.ts"
Cohesion: 0.19
Nodes (19): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), dynamic, GET() (+11 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "agent/config.ts"
Cohesion: 0.11
Nodes (25): AiConnection, DEFAULT_AI_BASE_URL, AgentConfig, ApiKeyState, flag(), getAgentConfig(), loadAgentConfig(), ResolvedAgentConfig (+17 more)

### Community 52 - "utils.ts"
Cohesion: 0.09
Nodes (29): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), StatCard(), UserDashboard(), ComingSoonLanguage(), CourseLevelAccordion(), LevelCategoryGridProps (+21 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "actions/auth.ts"
Cohesion: 0.17
Nodes (18): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode() (+10 more)

### Community 55 - "scripts"
Cohesion: 0.12
Nodes (15): name, private, scripts, agent:topics, build, dev, lint, messages:export (+7 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "sha256.ts"
Cohesion: 0.24
Nodes (8): encoder, h, INITIAL, K, rotr(), sha256(), sha256Hex(), w

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "seed.ts"
Cohesion: 0.16
Nodes (14): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LocalDatabase, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT (+6 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 63 - "RoleSlug"
Cohesion: 0.33
Nodes (7): orderUsersForTable(), roleRank(), account(), learners(), visible(), VISIBLE_USER_LIMIT, RoleSlug

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "phone-accounts.ts"
Cohesion: 0.15
Nodes (13): destinationFor(), GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), WelcomePage(), ProfileDetails (+5 more)

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
Cohesion: 0.11
Nodes (31): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+23 more)

### Community 80 - "refresh.ts"
Cohesion: 0.13
Nodes (11): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+3 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.08
Nodes (32): Mark(), TIER_COLUMNS, TierReference, ADMIN_NAV, ADMIN_ROLE_SLUGS, ALLOWED, canViewPhoneNumbers(), EDITABLE_ROLE_SLUGS (+24 more)

### Community 84 - "useTranslations"
Cohesion: 0.05
Nodes (67): AdminAccountingPageView(), AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarForm(), onSubmit(), GrammarManager(), GrammarTable() (+59 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "PhoneAuthForm"
Cohesion: 0.16
Nodes (15): localFormat(), ltr(), PhoneAuthForm(), fail(), submitPhone(), countdownTickMs(), formatCountdown(), fa (+7 more)

### Community 89 - "ship.mjs"
Cohesion: 0.22
Nodes (17): announce(), askForMessage(), buildRun(), commit(), describe(), fail(), get(), git() (+9 more)

### Community 90 - "resolveMessage"
Cohesion: 0.07
Nodes (74): ACCEPTED_TYPES, Confirmation, ACCEPTED, handleConfirm(), GrammarEditDialog(), onSubmit(), LessonPicker(), LessonEditDialog() (+66 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "otp-challenge.ts"
Cohesion: 0.20
Nodes (17): getAuthChallenge(), useSolvedChallenge(), CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret() (+9 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.13
Nodes (20): FLAG_CODE, generateMetadata(), Home(), Landing(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck (+12 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.09
Nodes (24): LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, ContentStatus, ContentWizardTarget, add() (+16 more)

### Community 99 - "pages.ts"
Cohesion: 0.38
Nodes (11): renderGrammarPages(), startGrammarUpload(), attachGrammarPages(), deleteObject(), deleteObjects(), getBucket(), getClient(), getObject() (+3 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/types.ts"
Cohesion: 0.24
Nodes (11): BlogPostList(), BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate(), BLOG_PAGE_SIZE, BlogListResult (+3 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.15
Nodes (20): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, ContentCategorySlug, GRAMMAR_PAGES_PER_REQUEST, RenderGrammarPagesResult (+12 more)

### Community 126 - "landing/pricing.ts"
Cohesion: 0.13
Nodes (25): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial() (+17 more)

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

### Community 142 - "service-client.ts"
Cohesion: 0.22
Nodes (5): dynamic, POST(), BODY, verifyStripeWebhook(), Database

### Community 143 - "blog/[slug]/page.tsx"
Cohesion: 0.31
Nodes (14): BlogPostPage(), generateMetadata(), Props, extractImageUrls(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep (+6 more)

### Community 144 - "actions/roles.ts"
Cohesion: 0.29
Nodes (10): updateRolePermissionsAction(), useRolePermissionOverrides(), RolePermissionEditor(), handleSave(), RolesPermissionsPanel(), canEditRolePermissions(), isEditableRole(), isGrantablePermission() (+2 more)

### Community 146 - "getDataRepository"
Cohesion: 0.15
Nodes (19): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminLandingPage(), metadata, generateMetadata(), generateMetadata(), LevelPage(), PageProps (+11 more)

### Community 149 - "banner-list.tsx"
Cohesion: 0.39
Nodes (7): deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction(), BannerList(), runAction(), bannerSchema

### Community 150 - "actions/quiz.ts"
Cohesion: 0.08
Nodes (31): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), useReducedMotion(), buildQuizAttemptAnswersJson(), formatUserAnswerLabel() (+23 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.16
Nodes (13): absolute(), dynamic, GET(), xmlEscape(), dynamic, revalidate, sitemap(), BlogCta() (+5 more)

### Community 152 - "[category]/page.tsx"
Cohesion: 0.08
Nodes (34): CategoryPage(), PageProps, LanguageCoursePage(), PageProps, BandExamCard, LearnLanguageView(), BandExam, groupLevelExamsByBand() (+26 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "availability.ts"
Cohesion: 0.13
Nodes (19): AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), PageProps, resolveRequestedSlot() (+11 more)

### Community 156 - "[quiz_id]/page.tsx"
Cohesion: 0.39
Nodes (6): generateMetadata(), PageProps, QuizPage(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 160 - "Rules"
Cohesion: 0.14
Nodes (13): 1. Put every Latin run in backticks, 2. Never let a line begin or end with Latin, 3. Keep punctuation on the Persian side, 4. Move any list of Latin items out of the prose, 5. Persian digits in prose, Latin digits in code, 6. Never put a bare URL in a sentence, 7. Prefer a Persian word when a real one exists, 8. Code blocks over inline code for anything long (+5 more)

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

### Community 167 - "role-permissions-context.tsx"
Cohesion: 0.29
Nodes (6): RolePermissionsContext, RolePermissionsProvider(), useRolePermissions(), UserProfileDialog(), RolePermissionOverrides, RolePermissions

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 174 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 175 - "llms.txt/route.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 176 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.19
Nodes (19): ActionOutcome, ErrorText(), formatJalaliDay(), selectClassName, StatusBadge(), TOPIC_STATUS, TopicFields(), ConfirmActionDialog() (+11 more)

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

### Community 187 - "plans.ts"
Cohesion: 0.50
Nodes (3): SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

### Community 188 - "reconcile-payments/route.ts"
Cohesion: 0.21
Nodes (9): dynamic, GET(), getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify (+1 more)

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.05
Nodes (72): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkAddTopicsAction(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput (+64 more)

## Knowledge Gaps
- **658 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+653 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `app-shell.tsx`, `grammar-reader.tsx`, `category/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `actions/roles.ts`, `blog.ts`, `banner-list.tsx`, `actions/quiz.ts`, `requireAdminPermission`, `user-row-actions.tsx`, `blog/languages.ts`, `blog/[id]/page.tsx`, `availability.ts`, `[category]/page.tsx`, `admin/page.tsx`, `[quiz_id]/page.tsx`, `pipeline.ts`, `agent/store.ts`, `isLocalDataMode`, `action-guards.ts`, `getServerTranslator`, `admin.ts`, `curriculum-levels.ts`, `llms.txt/route.ts`, `content-form-panels.tsx`, `checkout.ts`, `actions/auth.ts`, `phone-accounts.ts`, `app/page.tsx`, `pages.ts`, `blog/types.ts`, `actions/content.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `cn`, `app-shell.tsx`, `grammar-reader.tsx`, `jalali.ts`, `curriculum/types.ts`, `button.tsx`, `actions/roles.ts`, `getDataRepository`, `banner-list.tsx`, `user-row-actions.tsx`, `actions/quiz.ts`, `[category]/page.tsx`, `availability.ts`, `admin/page.tsx`, `getServerTranslator`, `role-permissions-context.tsx`, `middleware.ts`, `curriculum-levels.ts`, `TierCapabilitiesPanel`, `content-form-panels.tsx`, `edit-curriculum-level-dialog.tsx`, `ChangeRoleDialog`, `utils.ts`, `BannerUploadForm`, `permissions/roles.ts`, `PhoneAuthForm`, `resolveMessage`, `lessons-monitor.tsx`, `actions/content.ts`, `landing/pricing.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `category/[slug]/page.tsx`, `curriculum/types.ts`, `button.tsx`, `blog.ts`, `getDataRepository`, `better-auth.ts`, `actions/quiz.ts`, `blog-shell.tsx`, `edit-curriculum-level-dialog.tsx`, `utils.ts`, `BannerUploadForm`, `app/layout.tsx`, `sections.tsx`, `useTranslations`, `PhoneAuthForm`, `resolveMessage`, `lessons-monitor.tsx`, `blog/types.ts`, `landing/pricing.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _658 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.08325624421831637 - nodes in this community are weakly interconnected._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.02850426094622392 - nodes in this community are weakly interconnected._