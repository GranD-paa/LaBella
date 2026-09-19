# Graph Report - cursor P  (2026-09-14)

## Corpus Check
- 526 files · ~410,456 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2878 nodes · 8272 edges · 199 communities (132 shown, 67 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c18af91b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- types/index.ts
- postgres/client.ts
- DataRepository
- fa.ts
- cn
- better-auth.ts
- agent/config.ts
- dashboard-data.ts
- add-curriculum-level-dialog.tsx
- lesson/[id]/page.tsx
- seed.ts
- category/[slug]/page.tsx
- curriculum/languages.ts
- local/repository.ts
- button.tsx
- postgres/repository.ts
- 001_app_schema.sql
- period.ts
- blog.ts
- providers/index.ts
- robots-metadata.test.ts
- topic-queue.tsx
- jalali.ts
- getDataRepository
- schema.sql
- compilerOptions
- agent/page.tsx
- devDependencies
- dependencies
- resolveMessage
- server-locale.ts
- components.json
- pipeline.ts
- utils.ts
- refresh.ts
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- getServerTranslator
- page-skeletons.tsx
- middleware.ts
- arvan.ts
- markdown.ts
- admin.ts
- availability.ts
- helpers.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- admin-schemas.ts
- ingest/route.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- schedule.ts
- user-management-panel.tsx
- final-deployment/manifest.json
- quiz-management/types.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- data/repository.ts
- video-embed.ts
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- app-shell.tsx
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
- actions/auth.ts
- react-dom
- billing-settings-form.tsx
- What You Must Do When Invoked
- 005_send_limits.sql
- otp-challenge.ts
- app/page.tsx
- Lesson
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
- content-form-panels.tsx
- subscription-plan-cards.tsx
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
- blog/[slug]/page.tsx
- nodemailer
- lucide-react
- agent-panel.tsx
- react-hook-form
- @radix-ui/react-avatar
- validations/auth.ts
- [quiz_id]/page.tsx
- blog/languages.ts
- [category]/page.tsx
- blog-agent.mjs
- user-dashboard.tsx
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- Rules
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
- Blog agent — handoff
- [language]/page.tsx
- sms.ts
- llms.txt/route.ts
- edit-curriculum-level-dialog.tsx
- run-migration.mjs
- quiz-form.tsx
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- index.test.ts
- subscription-view.tsx
- 011_blog_agent.sql
- blog-agent.ts
- @radix-ui/react-dropdown-menu
- tailwindcss-animate
- zod
- resolve-navigation.ts
- getLocaleDefinition
- entitlements/schema.test.ts
- TierCapabilitiesPanel
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
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `runTest()` --calls--> `testConnectionAction()`  [EXTRACTED]
  components/admin/blog/agent/connection-form.tsx → app/admin/actions/blog-agent.ts
- `saveAlt()` --calls--> `updateBlogImageAltAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts
- `remove()` --calls--> `deleteBlogImageAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (199 total, 67 thin omitted)

### Community 0 - "types/index.ts"
Cohesion: 0.13
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.13
Nodes (20): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool() (+12 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (7): BlogImage, DataRepository, GrammarRule, Payment, QuizQuestion, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "cn"
Cohesion: 0.09
Nodes (27): signOutAction(), CheckRow(), Counter(), LaparliLogo(), UserNav(), AdminHeaderBadge(), AppHeader(), AuthAsidePanel() (+19 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.17
Nodes (14): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+6 more)

### Community 6 - "agent/config.ts"
Cohesion: 0.11
Nodes (25): AiConnection, DEFAULT_AI_BASE_URL, AgentConfig, ApiKeyState, flag(), getAgentConfig(), loadAgentConfig(), ResolvedAgentConfig (+17 more)

### Community 7 - "dashboard-data.ts"
Cohesion: 0.11
Nodes (18): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), getDefaultLanguageContext() (+10 more)

### Community 8 - "add-curriculum-level-dialog.tsx"
Cohesion: 0.18
Nodes (18): ManagedUser, PROVIDER_ICONS, PROVIDER_LABELS, JalaliParts, DialogContent, DialogDescription, DialogFooter(), DialogHeader() (+10 more)

### Community 9 - "lesson/[id]/page.tsx"
Cohesion: 0.33
Nodes (10): LessonPage(), PageProps, attachGrammarPages(), deleteObject(), getBucket(), getClient(), getObject(), isObjectStorageConfigured() (+2 more)

### Community 10 - "seed.ts"
Cohesion: 0.10
Nodes (23): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LocalDatabase, quizIds, backfillMissingCollections(), backfillNewRowFields() (+15 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.26
Nodes (17): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata(), Props (+9 more)

### Community 12 - "curriculum/languages.ts"
Cohesion: 0.17
Nodes (8): ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, CATEGORY_DEFINITIONS, TURKISH_LEVELS, CategoryDefinition, advanceLearningAfterQuiz(), getNextLevelSlug()

### Community 13 - "local/repository.ts"
Cohesion: 0.14
Nodes (21): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret() (+13 more)

### Community 14 - "button.tsx"
Cohesion: 0.13
Nodes (29): ACCEPTED_TYPES, TestState, SECTIONS, RUN_STATUS, ACCEPTED, LANDMARK_LABELS, LANGUAGE_LABELS, discountedPrice() (+21 more)

### Community 15 - "postgres/repository.ts"
Cohesion: 0.09
Nodes (27): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE (+19 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "period.ts"
Cohesion: 0.29
Nodes (9): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+1 more)

### Community 18 - "blog.ts"
Cohesion: 0.12
Nodes (15): BlogFormState, BlogImageUploadState, optionalText, optionalUrl, postSchema, resolveUploadError(), saveBlogPostAction(), uploadBlogImageAction() (+7 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.11
Nodes (20): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+12 more)

### Community 21 - "topic-queue.tsx"
Cohesion: 0.12
Nodes (27): addTopicAction(), bulkAddTopicsAction(), toInstant(), topicRow(), updateTopicAction(), ActionOutcome, ConfirmDialog(), ErrorText() (+19 more)

### Community 22 - "jalali.ts"
Cohesion: 0.18
Nodes (20): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+12 more)

### Community 23 - "getDataRepository"
Cohesion: 0.13
Nodes (43): cancelSubscriptionAction(), saveGrammarReadingProgress(), submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction() (+35 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "agent/page.tsx"
Cohesion: 0.15
Nodes (10): AdminBlogAgentPage(), dynamic, maxDuration, metadata, ErrorState(), readAgentPanelSettings(), costSince(), listRunsForAdmin() (+2 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next, next-themes (+19 more)

### Community 29 - "resolveMessage"
Cohesion: 0.08
Nodes (29): BillingSettingsForm(), handleRefreshRate(), onSubmit(), runAction(), handleConfirm(), GrammarForm(), onSubmit(), AddCurriculumLevelDialog() (+21 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.14
Nodes (24): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, countdownTickMs(), formatCountdown() (+16 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.11
Nodes (33): dynamic, GET(), maxDuration, POST(), wrongDataSource(), costToman(), loadConfigOrReason(), loadContext() (+25 more)

### Community 33 - "utils.ts"
Cohesion: 0.08
Nodes (43): AdminSubscriptionPageView(), EntitlementSettingsPanel(), ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamsSection(), CategoryWatermark() (+35 more)

### Community 34 - "refresh.ts"
Cohesion: 0.15
Nodes (12): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+4 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.13
Nodes (26): buildRecoveryDeps(), dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET() (+18 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.27
Nodes (8): NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 37 - "action-guards.ts"
Cohesion: 0.20
Nodes (10): AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireContentScope(), requireSuperAdminAction(), getAuthUser, getProfileById (+2 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.07
Nodes (51): generateMetadata(), completeProfile(), destinationFor(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage() (+43 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.14
Nodes (19): CompleteProfileForm(), onSubmit(), updateLocalSession(), LOCAL_SESSION_COOKIE, updatePostgresSession(), AUTH_PATHS, isPublicRoute(), PUBLIC_ROUTES (+11 more)

### Community 41 - "arvan.ts"
Cohesion: 0.20
Nodes (19): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+11 more)

### Community 42 - "markdown.ts"
Cohesion: 0.17
Nodes (13): absolute(), dynamic, GET(), xmlEscape(), BlogToc(), countWords(), createBlogRenderer(), MarkdownContext (+5 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (28): bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues, GrammarRuleValues (+20 more)

### Community 44 - "availability.ts"
Cohesion: 0.16
Nodes (21): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), AdminLanguagesPage() (+13 more)

### Community 45 - "helpers.ts"
Cohesion: 0.16
Nodes (14): fetchAdminDashboardData(), EnrichedQuiz, fetchEnrichedQuizzes(), fetchQuizManagementStats(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel() (+6 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "admin-schemas.ts"
Cohesion: 0.11
Nodes (23): GrammarEditDialog(), onSubmit(), LessonEditDialog(), onSubmit(), AddCurriculumLevelValues, ContentVocabularyValues, createContentVocabularySchema(), createGrammarRuleSchema() (+15 more)

### Community 49 - "ingest/route.ts"
Cohesion: 0.22
Nodes (16): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), normalise() (+8 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "schedule.ts"
Cohesion: 0.40
Nodes (4): dailySlots(), PUBLISH_HOUR_TEHRAN, PUBLISH_MINUTE_TEHRAN, tehranTimeToInstant()

### Community 52 - "user-management-panel.tsx"
Cohesion: 0.15
Nodes (24): STATUS_STYLES, SubscriptionsTable(), DeleteConfirmDialog(), LessonsTable(), AccountTierCell(), AccountTierCellData, RoleBadge(), StatusBadge() (+16 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "quiz-management/types.ts"
Cohesion: 0.16
Nodes (14): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, ExtendedQuiz, ExtendedQuizQuestion, normalizeAnswer(), QuestionType (+6 more)

### Community 55 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, agent:topics, build, dev, lint, messages:export (+5 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "data/repository.ts"
Cohesion: 0.09
Nodes (12): BlogPostInput, AdminSubscriptionSummary, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, GrammarPage, GrammarPageSummary (+4 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.13
Nodes (19): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+11 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.22
Nodes (8): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps

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
Nodes (36): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+28 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.05
Nodes (72): updateRolePermissionsAction(), countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), AssignLanguagesDialog() (+64 more)

### Community 84 - "useTranslations"
Cohesion: 0.08
Nodes (34): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarManager(), GrammarTable() (+26 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "actions/auth.ts"
Cohesion: 0.14
Nodes (25): ActionResult, decideAndSend(), describeVerifyFailure(), getAuthChallenge(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode() (+17 more)

### Community 90 - "billing-settings-form.tsx"
Cohesion: 0.23
Nodes (20): LessonPicker(), LOCALES, ToggleRow(), Values, FormControl, FormDescription, FormField(), FormFieldContext (+12 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (22): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+14 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.14
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, DECKS, en (+10 more)

### Community 95 - "Lesson"
Cohesion: 0.08
Nodes (29): LessonsMonitor(), LevelRow(), LessonsMonitorPageView(), SLOT_META, SlotSquare(), STATE_KEY, AdminQuizzesPageView(), CONTENT_TYPES (+21 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/types.ts"
Cohesion: 0.18
Nodes (14): deleteBlogPostAction(), BlogPostList(), remove(), Pagination(), BlogCardVariant, BlogPostCard(), Meta(), postHref() (+6 more)

### Community 125 - "content-form-panels.tsx"
Cohesion: 0.07
Nodes (50): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), finishGrammarUpload(), loadLessonContent(), renderGrammarPages() (+42 more)

### Community 126 - "subscription-plan-cards.tsx"
Cohesion: 0.11
Nodes (32): CheckoutDialog(), handlePay(), PLAN_ICONS, SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), LOCALE_TAGS (+24 more)

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

### Community 143 - "blog/[slug]/page.tsx"
Cohesion: 0.30
Nodes (15): BlogPostPage(), generateMetadata(), Props, resolveBlogLanguages(), extractImageUrls(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd() (+7 more)

### Community 146 - "agent-panel.tsx"
Cohesion: 0.12
Nodes (19): BlogAgentPanel(), Tone, TONES, ConnectionForm(), runTest(), save(), submit(), keyHint() (+11 more)

### Community 149 - "validations/auth.ts"
Cohesion: 0.18
Nodes (14): isValidJalaliDate(), todayJalali(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema (+6 more)

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.06
Nodes (41): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminLayout(), PageProps, QuizPage(), UserQuizAttemptsPanel(), buildInitialFeedback(), QuizForm() (+33 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 152 - "[category]/page.tsx"
Cohesion: 0.26
Nodes (12): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, getLanguageWithAvailability(), getLanguage() (+4 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "user-dashboard.tsx"
Cohesion: 0.17
Nodes (11): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining(), MySubscriptionEntry (+3 more)

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
Nodes (8): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 173 - "[language]/page.tsx"
Cohesion: 0.15
Nodes (14): LanguageCoursePage(), PageProps, BandExamCard, BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED (+6 more)

### Community 174 - "sms.ts"
Cohesion: 0.29
Nodes (12): assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode(), RestResult (+4 more)

### Community 175 - "llms.txt/route.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 176 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.45
Nodes (9): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+1 more)

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "quiz-form.tsx"
Cohesion: 0.31
Nodes (6): OPTION_KEYS, OPTION_LABELS, QuestionFeedback, RadioGroup, RadioGroupItem, useReducedMotion()

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "index.test.ts"
Cohesion: 0.20
Nodes (3): TIERS, Subscription, SubscriptionTier

### Community 188 - "subscription-view.tsx"
Cohesion: 0.13
Nodes (17): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), SubscriptionView(), SubscriptionViewProps, getAvailableProviders(), getPaymentProvider() (+9 more)

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.08
Nodes (47): AgentActionResult, asSuperAdmin(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput, dateField, deleteTopicAction() (+39 more)

### Community 194 - "resolve-navigation.ts"
Cohesion: 0.70
Nodes (4): findLevelByOrderNumber(), findLevelInLanguages(), resolveLessonNavigation(), resolveLevelContext()

### Community 195 - "getLocaleDefinition"
Cohesion: 0.31
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), localizeDigits()

### Community 199 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

## Knowledge Gaps
- **653 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+648 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **67 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `cn`, `lesson/[id]/page.tsx`, `category/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `blog.ts`, `[quiz_id]/page.tsx`, `blog/languages.ts`, `[category]/page.tsx`, `agent/page.tsx`, `pipeline.ts`, `isLocalDataMode`, `action-guards.ts`, `getServerTranslator`, `markdown.ts`, `availability.ts`, `[language]/page.tsx`, `llms.txt/route.ts`, `ingest/route.ts`, `subscription-view.tsx`, `app-shell.tsx`, `phone-accounts.ts`, `permissions/roles.ts`, `actions/auth.ts`, `app/page.tsx`, `blog/types.ts`, `content-form-panels.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `better-auth.ts`, `add-curriculum-level-dialog.tsx`, `category/[slug]/page.tsx`, `button.tsx`, `blog.ts`, `[quiz_id]/page.tsx`, `user-dashboard.tsx`, `resolveMessage`, `utils.ts`, `blog-shell.tsx`, `edit-curriculum-level-dialog.tsx`, `quiz-form.tsx`, `user-management-panel.tsx`, `BannerUploadForm`, `subscription-view.tsx`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `sections.tsx`, `useTranslations`, `actions/auth.ts`, `billing-settings-form.tsx`, `Lesson`, `blog/types.ts`, `subscription-plan-cards.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `cn`, `add-curriculum-level-dialog.tsx`, `button.tsx`, `[quiz_id]/page.tsx`, `getDataRepository`, `jalali.ts`, `user-dashboard.tsx`, `resolveMessage`, `utils.ts`, `getServerTranslator`, `middleware.ts`, `edit-curriculum-level-dialog.tsx`, `admin-schemas.ts`, `quiz-form.tsx`, `user-management-panel.tsx`, `BannerUploadForm`, `subscription-view.tsx`, `admin-accounting-page-view.tsx`, `TierCapabilitiesPanel`, `sections.tsx`, `permissions/roles.ts`, `actions/auth.ts`, `billing-settings-form.tsx`, `Lesson`, `content-form-panels.tsx`, `subscription-plan-cards.tsx`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _653 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03018500486854917 - nodes in this community are weakly interconnected._