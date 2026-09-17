# Graph Report - cursor P  (2026-09-16)

## Corpus Check
- 528 files · ~411,780 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2888 nodes · 8306 edges · 192 communities (126 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b2d8b4e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin-accounting-page-view.tsx
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- validations/auth.ts
- jalali.ts
- Lesson
- utils.ts
- learn-category-view.tsx
- types/index.ts
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
- users.ts
- better-auth.ts
- getDataRepository
- schema.sql
- compilerOptions
- blog/[id]/page.tsx
- devDependencies
- dependencies
- admin/page.tsx
- app/layout.tsx
- components.json
- pipeline.ts
- blog/[slug]/page.tsx
- sms.ts
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- data/index.ts
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
- sha256.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- agent/config.ts
- llms.txt/route.ts
- final-deployment/manifest.json
- phone-accounts.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- CreateContentSection
- video-lessons-grid.tsx
- sync-local-content.mjs
- landing/pricing.ts
- getLocaleDefinition
- RoleSlug
- billing/schema.test.ts
- vercel.json
- about-view.tsx
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
- admin-quiz-attempts.ts
- pg
- permissions/roles.ts
- useTranslations
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- i18n/types.ts
- landing/page.tsx
- resolveMessage
- What You Must Do When Invoked
- 005_send_limits.sql
- actions/auth.ts
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
- enforceLanguageScope
- @hookform/resolvers
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
- cn
- level-overrides.ts
- ingest/route.ts
- lucide-react
- [category]/page.tsx
- react-hook-form
- @radix-ui/react-avatar
- nodemailer
- [quiz_id]/page.tsx
- blog/languages.ts
- @radix-ui/react-dropdown-menu
- blog-agent.mjs
- LessonsMonitorPageView
- @radix-ui/react-slot
- three
- 006_banner_images.sql
- public.grammar_rules
- Rules
- Search engine visibility
- 008_phone_auth.sql
- LanguageSlug
- sms-test.mjs
- @radix-ui/react-label
- react-dom
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- Blog agent — handoff
- sonner
- topic-queue.tsx
- run-migration.mjs
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- subscription-plan-cards.tsx
- subscription-view.tsx
- 011_blog_agent.sql
- blog-agent.ts
- tailwindcss-animate
- zod
- entitlements/schema.test.ts
- 012_blog_agent_settings.sql

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
  app/about/page.tsx → lib/i18n/metadata.ts
- `postSchema` --calls--> `getBlogLanguage()`  [EXTRACTED]
  app/admin/actions/blog.ts → lib/blog/languages.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts

## Import Cycles
- None detected.

## Communities (192 total, 66 thin omitted)

### Community 0 - "admin-accounting-page-view.tsx"
Cohesion: 0.15
Nodes (20): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger() (+12 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.08
Nodes (38): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, deleteTopic(), insertTopics(), listTopics(), NewTopic (+30 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (16): BlogImage, BlogPostInput, DataRepository, QuizAttemptWithRelations, QuizWithLessonTitle, GrammarPage, GrammarPageSummary, fetchQuizManagementStats() (+8 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (21): signOutAction(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+13 more)

### Community 5 - "validations/auth.ts"
Cohesion: 0.18
Nodes (14): isValidJalaliDate(), todayJalali(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema (+6 more)

### Community 6 - "jalali.ts"
Cohesion: 0.18
Nodes (19): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+11 more)

### Community 7 - "Lesson"
Cohesion: 0.12
Nodes (22): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+14 more)

### Community 8 - "utils.ts"
Cohesion: 0.14
Nodes (24): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LessonsTable(), AdminQuizzesPageView(), AccountTierCell(), AccountTierCellData, RoleBadge() (+16 more)

### Community 9 - "learn-category-view.tsx"
Cohesion: 0.13
Nodes (13): LearnCategoryBackLink(), LearnCategoryView(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonView(), LessonViewProps (+5 more)

### Community 10 - "types/index.ts"
Cohesion: 0.06
Nodes (46): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+38 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.25
Nodes (18): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata(), Props (+10 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.07
Nodes (49): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS (+41 more)

### Community 13 - "local/store.ts"
Cohesion: 0.16
Nodes (20): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), LOCAL_SEED, LocalDatabase (+12 more)

### Community 14 - "button.tsx"
Cohesion: 0.13
Nodes (31): TestState, SECTIONS, ConfirmDialog(), Field(), LANDMARK_LABELS, LANGUAGE_LABELS, AdminLanguagesPageView(), CurriculumLevelManager() (+23 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.10
Nodes (19): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE (+11 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "local/repository.ts"
Cohesion: 0.17
Nodes (15): clearLocalSession(), addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES (+7 more)

### Community 18 - "blog.ts"
Cohesion: 0.14
Nodes (14): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, postSchema, resolveUploadError() (+6 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "users.ts"
Cohesion: 0.23
Nodes (15): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave() (+7 more)

### Community 22 - "better-auth.ts"
Cohesion: 0.17
Nodes (14): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+6 more)

### Community 23 - "getDataRepository"
Cohesion: 0.15
Nodes (34): submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction() (+26 more)

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
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next, next-themes (+19 more)

### Community 29 - "admin/page.tsx"
Cohesion: 0.19
Nodes (17): AdminBlogPage(), metadata, AdminPage(), generateMetadata(), DashboardPage(), generateMetadata(), getRolePermissions(), readPhoneNumbers() (+9 more)

### Community 30 - "app/layout.tsx"
Cohesion: 0.18
Nodes (10): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster() (+2 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.12
Nodes (29): TokenUsage, costToman(), MODEL_RATES, ModelRate, loadAgentConfig(), loadConfigOrReason(), loadContext(), makeCover() (+21 more)

### Community 33 - "blog/[slug]/page.tsx"
Cohesion: 0.33
Nodes (14): BlogPostPage(), generateMetadata(), Props, resolveBlogLanguages(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep (+6 more)

### Community 34 - "sms.ts"
Cohesion: 0.29
Nodes (12): assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode(), RestResult (+4 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.11
Nodes (33): buildRecoveryDeps(), dynamic, GET(), maxDuration, POST(), wrongDataSource(), dynamic, GET() (+25 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.27
Nodes (8): NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 37 - "action-guards.ts"
Cohesion: 0.17
Nodes (13): cancelSubscriptionAction(), saveGrammarReadingProgress(), AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), requireContentScope() (+5 more)

### Community 38 - "data/index.ts"
Cohesion: 0.13
Nodes (30): AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata() (+22 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (23): CompleteProfileForm(), onSubmit(), updateLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url() (+15 more)

### Community 41 - "arvan.ts"
Cohesion: 0.19
Nodes (20): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+12 more)

### Community 42 - "markdown.ts"
Cohesion: 0.13
Nodes (17): saveBlogPostAction(), absolute(), dynamic, GET(), xmlEscape(), BlogPostEditor(), BlogToc(), countWords() (+9 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (29): createStructuredQuiz(), revalidateQuizPaths(), bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, EntitlementSettingsValues (+21 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.31
Nodes (12): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+4 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.08
Nodes (30): BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS (+22 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "content-form-panels.tsx"
Cohesion: 0.09
Nodes (44): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), ContentActionBar(), ContentFormPanel() (+36 more)

### Community 49 - "sha256.ts"
Cohesion: 0.24
Nodes (9): encoder, h, INITIAL, K, leadingZeroBits(), rotr(), sha256(), sha256Hex() (+1 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "agent/config.ts"
Cohesion: 0.09
Nodes (32): saveConnectionAction(), AdminBlogAgentPage(), dynamic, maxDuration, metadata, AiConnection, DEFAULT_AI_BASE_URL, AgentConfig (+24 more)

### Community 52 - "llms.txt/route.ts"
Cohesion: 0.36
Nodes (6): dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "phone-accounts.ts"
Cohesion: 0.12
Nodes (18): completeProfile(), describeVerifyFailure(), destinationFor(), verifyPhoneCode(), welcomeHref(), GET(), generateMetadata(), LoginPage() (+10 more)

### Community 55 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, agent:topics, build, dev, lint, messages:export (+5 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "CreateContentSection"
Cohesion: 0.50
Nodes (3): CreateContentSection(), findLessonForLevel(), stepForJump()

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "landing/pricing.ts"
Cohesion: 0.11
Nodes (18): Arrow(), Check(), Cross(), DAY_ICONS, LESSON_ICONS, SectionHead(), Price(), SegmentButton() (+10 more)

### Community 62 - "getLocaleDefinition"
Cohesion: 0.31
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), localizeDigits()

### Community 63 - "RoleSlug"
Cohesion: 0.33
Nodes (7): orderUsersForTable(), roleRank(), account(), learners(), visible(), VISIBLE_USER_LIMIT, RoleSlug

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "about-view.tsx"
Cohesion: 0.33
Nodes (4): generateMetadata(), AboutView(), TIMELINE_KEYS, VALUE_ICONS

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

### Community 80 - "admin-quiz-attempts.ts"
Cohesion: 0.47
Nodes (5): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminLayout(), parseAttemptBreakdown(), requireAdmin()

### Community 83 - "permissions/roles.ts"
Cohesion: 0.06
Nodes (49): updateRolePermissionsAction(), RolePermissionsContext, RolePermissionsProvider(), useRolePermissionOverrides(), useRolePermissions(), Mark(), RolePermissionEditor(), handleSave() (+41 more)

### Community 84 - "useTranslations"
Cohesion: 0.06
Nodes (40): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarForm(), onSubmit(), GrammarManager(), GrammarTable(), AdminSubscriptionPageView() (+32 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "i18n/types.ts"
Cohesion: 0.13
Nodes (23): DEFAULT_LOCALE, isAppLocale(), LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, countdownTickMs(), formatCountdown(), fa (+15 more)

### Community 89 - "landing/page.tsx"
Cohesion: 0.40
Nodes (5): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), getLandingLanguageToggles()

### Community 90 - "resolveMessage"
Cohesion: 0.07
Nodes (71): GrammarEditDialog(), onSubmit(), AddCurriculumLevelDialog(), onSubmit(), EditCurriculumLevelDialog(), onSubmit(), LessonPicker(), LessonEditDialog() (+63 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "actions/auth.ts"
Cohesion: 0.11
Nodes (33): ActionResult, decideAndSend(), getAuthChallenge(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode(), localFormat() (+25 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.21
Nodes (13): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), getCourseDecks(), LANDING_LANGUAGES, LandingLanguageDefinition (+5 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.08
Nodes (25): LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, CONTENT_CATEGORIES, ContentStatus, ContentWizardContext (+17 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/types.ts"
Cohesion: 0.13
Nodes (13): BlogPostList(), remove(), Pagination(), BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate() (+5 more)

### Community 125 - "enforceLanguageScope"
Cohesion: 0.20
Nodes (14): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), createVocabulary(), deleteVocabulary(), updateVocabulary(), ExistingContentList(), REMOVE (+6 more)

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

### Community 142 - "cn"
Cohesion: 0.07
Nodes (32): ACCEPTED_TYPES, ACCEPTED, CheckRow(), Counter(), OPTION_KEYS, WizardQuestionFields(), EntitlementSettingsPanel(), onSubmit() (+24 more)

### Community 143 - "level-overrides.ts"
Cohesion: 0.18
Nodes (9): getLanguage(), CurriculumLevelOverrideRow, getBandFromCode(), getCurriculumLevelsForLanguage(), groupLevelsByBand(), resolveLessonForLevel(), CefrBand, advanceLearningAfterQuiz() (+1 more)

### Community 144 - "ingest/route.ts"
Cohesion: 0.18
Nodes (19): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), flag() (+11 more)

### Community 146 - "[category]/page.tsx"
Cohesion: 0.11
Nodes (24): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+16 more)

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.06
Nodes (36): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+28 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

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
Cohesion: 0.16
Nodes (11): LandingCourse, LOCALES, LanguageSlug, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS (+3 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 176 - "topic-queue.tsx"
Cohesion: 0.11
Nodes (31): BlogAgentPanel(), Tone, TONES, PromptEditor(), RUN_STATUS, RunLog(), ActionOutcome, ErrorText() (+23 more)

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "subscription-plan-cards.tsx"
Cohesion: 0.11
Nodes (28): CheckoutDialog(), PLAN_ICONS, SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), BillingCurrency, centsToEur() (+20 more)

### Community 188 - "subscription-view.tsx"
Cohesion: 0.12
Nodes (19): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), SubscriptionView(), SubscriptionViewProps, getAvailableProviders() (+11 more)

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.05
Nodes (64): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkAddTopicsAction(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput (+56 more)

## Knowledge Gaps
- **653 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+648 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/repository.ts`, `app-shell.tsx`, `types/index.ts`, `category/[slug]/page.tsx`, `ingest/route.ts`, `local/repository.ts`, `blog.ts`, `[category]/page.tsx`, `users.ts`, `[quiz_id]/page.tsx`, `blog/languages.ts`, `blog/[id]/page.tsx`, `admin/page.tsx`, `pipeline.ts`, `blog/[slug]/page.tsx`, `isLocalDataMode`, `action-guards.ts`, `data/index.ts`, `markdown.ts`, `admin.ts`, `curriculum-levels.ts`, `content-form-panels.tsx`, `agent/config.ts`, `llms.txt/route.ts`, `phone-accounts.ts`, `subscription-view.tsx`, `admin-quiz-attempts.ts`, `permissions/roles.ts`, `landing/page.tsx`, `actions/auth.ts`, `app/page.tsx`, `blog/types.ts`, `enforceLanguageScope`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `admin-accounting-page-view.tsx`, `app-shell.tsx`, `jalali.ts`, `utils.ts`, `learn-category-view.tsx`, `curriculum/types.ts`, `button.tsx`, `cn`, `users.ts`, `[quiz_id]/page.tsx`, `getDataRepository`, `LessonsMonitorPageView`, `middleware.ts`, `content-form-panels.tsx`, `topic-queue.tsx`, `BannerUploadForm`, `CreateContentSection`, `video-lessons-grid.tsx`, `subscription-plan-cards.tsx`, `subscription-view.tsx`, `about-view.tsx`, `sections.tsx`, `permissions/roles.ts`, `resolveMessage`, `actions/auth.ts`, `lessons-monitor.tsx`, `enforceLanguageScope`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `admin-accounting-page-view.tsx`, `app-shell.tsx`, `utils.ts`, `category/[slug]/page.tsx`, `curriculum/types.ts`, `button.tsx`, `blog.ts`, `better-auth.ts`, `[quiz_id]/page.tsx`, `app/layout.tsx`, `blog-shell.tsx`, `topic-queue.tsx`, `BannerUploadForm`, `CreateContentSection`, `subscription-plan-cards.tsx`, `subscription-view.tsx`, `landing/pricing.ts`, `sections.tsx`, `useTranslations`, `resolveMessage`, `actions/auth.ts`, `lessons-monitor.tsx`, `blog/types.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _653 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `admin-accounting-page-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14666666666666667 - nodes in this community are weakly interconnected._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.027682452528025623 - nodes in this community are weakly interconnected._