# Graph Report - cursor P  (2026-09-14)

## Corpus Check
- 525 files · ~409,734 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2876 nodes · 8271 edges · 195 communities (129 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 62 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `78fffdab`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin/page.tsx
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- agent/config.ts
- Lesson
- topic-queue.tsx
- learn-category-view.tsx
- types/index.ts
- category/[slug]/page.tsx
- curriculum/types.ts
- local-phone-auth.ts
- button.tsx
- blog-image-library.tsx
- 001_app_schema.sql
- local/repository.ts
- blog.ts
- providers/index.ts
- robots-metadata.test.ts
- enforceLanguageScope
- jalali.ts
- getDataRepository
- schema.sql
- compilerOptions
- admin/blog/page.tsx
- devDependencies
- dependencies
- resolveRolePermissions
- server-locale.ts
- components.json
- pipeline.ts
- cn
- refresh.ts
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- data/index.ts
- page-skeletons.tsx
- middleware.ts
- arvan.ts
- markdown.ts
- admin.ts
- user-row-actions.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- agent/store.ts
- ingest/route.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- schedule.ts
- user-management-panel.tsx
- final-deployment/manifest.json
- quiz-sections.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- landing/content.ts
- video-embed.ts
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- ConnectionForm
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
- resolveMessage
- What You Must Do When Invoked
- 005_send_limits.sql
- otp-challenge.ts
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
- blog-post-list.tsx
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
- CreateContentSection
- [quiz_id]/page.tsx
- blog/languages.ts
- blog-agent.mjs
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
- data-source.ts
- getStaticSiteUrl
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
- validations/quiz.ts
- reconcile.ts
- 011_blog_agent.sql
- blog-agent.ts
- @radix-ui/react-dropdown-menu
- tailwindcss-animate
- zod
- getLocaleDefinition
- entitlements/schema.test.ts
- TierCapabilitiesPanel
- 012_blog_agent_settings.sql

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 213 edges
2. `cn()` - 187 edges
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
- `WelcomePreviewPage()` --calls--> `isLocalDataMode()`  [EXTRACTED]
  app/(auth)/welcome-preview/page.tsx → lib/config/data-source.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `runTest()` --calls--> `testConnectionAction()`  [EXTRACTED]
  components/admin/blog/agent/connection-form.tsx → app/admin/actions/blog-agent.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (195 total, 66 thin omitted)

### Community 0 - "admin/page.tsx"
Cohesion: 0.22
Nodes (15): AdminBlogPage(), AdminPage(), AdminLessonsMonitorPage(), generateMetadata(), TierReference, ADMIN_NAV, adminLandingPath(), AdminNavItem (+7 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.08
Nodes (37): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES (+29 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (11): BlogImage, BlogPostInput, fetchAdminDashboardData(), DataRepository, fetchQuizManagementStats(), GrammarRule, LocalizedText, Payment (+3 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (19): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+11 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.11
Nodes (28): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+20 more)

### Community 6 - "agent/config.ts"
Cohesion: 0.10
Nodes (25): AiConnection, DEFAULT_AI_BASE_URL, AgentConfig, ApiKeyState, flag(), loadAgentConfig(), ResolvedAgentConfig, resolveLayers() (+17 more)

### Community 7 - "Lesson"
Cohesion: 0.10
Nodes (29): destinationFor(), LessonPage(), getLanguagesWithAvailability(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes() (+21 more)

### Community 8 - "topic-queue.tsx"
Cohesion: 0.12
Nodes (31): ActionOutcome, ErrorText(), formatJalaliDay(), selectClassName, StatusBadge(), TOPIC_STATUS, Confirmation, TopicFields() (+23 more)

### Community 9 - "learn-category-view.tsx"
Cohesion: 0.09
Nodes (19): PageProps, LearnCategoryView(), VideoLessonsGrid(), VideoPoster(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs() (+11 more)

### Community 10 - "types/index.ts"
Cohesion: 0.06
Nodes (51): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+43 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.22
Nodes (16): postSchema, BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata() (+8 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.08
Nodes (30): CategoryPage(), PageProps, CATEGORY_ICON_BG, CATEGORY_ICON_TINT, CATEGORY_ICONS, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS (+22 more)

### Community 13 - "local-phone-auth.ts"
Cohesion: 0.21
Nodes (13): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+5 more)

### Community 14 - "button.tsx"
Cohesion: 0.14
Nodes (28): TestState, SECTIONS, RUN_STATUS, ConfirmDialog(), Field(), LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager() (+20 more)

### Community 15 - "blog-image-library.tsx"
Cohesion: 0.10
Nodes (18): ACCEPTED, BlogImageLibrary(), remove(), saveAlt(), formatBytes(), ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl() (+10 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "local/repository.ts"
Cohesion: 0.21
Nodes (12): clearLocalSession(), addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled() (+4 more)

### Community 18 - "blog.ts"
Cohesion: 0.16
Nodes (14): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, resolveUploadError(), saveBlogPostAction() (+6 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "enforceLanguageScope"
Cohesion: 0.21
Nodes (13): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), createVocabulary(), deleteVocabulary(), updateVocabulary(), ExistingContentList(), REMOVE (+5 more)

### Community 22 - "jalali.ts"
Cohesion: 0.13
Nodes (26): DateOfBirthField(), clampDay(), JalaliParts, BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn() (+18 more)

### Community 23 - "getDataRepository"
Cohesion: 0.13
Nodes (40): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+32 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "admin/blog/page.tsx"
Cohesion: 0.19
Nodes (4): AdminBlogEditorPage(), metadata, metadata, ErrorState()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next, next-themes (+19 more)

### Community 29 - "resolveRolePermissions"
Cohesion: 0.18
Nodes (15): updateRolePermissionsAction(), RolePermissionsContext, RolePermissionsProvider(), useRolePermissionOverrides(), useRolePermissions(), RolePermissionEditor(), handleSave(), RolesPermissionsPanel() (+7 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.14
Nodes (23): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LocaleDefinition, LOCALES, countdownTickMs(), formatCountdown(), fa (+15 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.11
Nodes (31): runTopicNowAction(), dynamic, GET(), maxDuration, POST(), wrongDataSource(), TokenUsage, costToman() (+23 more)

### Community 33 - "cn"
Cohesion: 0.06
Nodes (59): CheckRow(), Counter(), AdminSubscriptionPageView(), EntitlementSettingsPanel(), onSubmit(), PlanActiveToggle(), toggle(), ToggleRow() (+51 more)

### Community 34 - "refresh.ts"
Cohesion: 0.18
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.15
Nodes (25): buildRecoveryDeps(), CheckoutResult, resolveOrigin(), startCheckoutAction(), dynamic, GET(), supabaseFxStore(), dynamic (+17 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.24
Nodes (9): BlogShell(), NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle() (+1 more)

### Community 37 - "action-guards.ts"
Cohesion: 0.17
Nodes (13): cancelSubscriptionAction(), saveGrammarReadingProgress(), AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), requireContentScope() (+5 more)

### Community 38 - "data/index.ts"
Cohesion: 0.10
Nodes (31): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), generateMetadata() (+23 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.14
Nodes (21): updateLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url(), verifyLocalSessionToken(), updatePostgresSession() (+13 more)

### Community 41 - "arvan.ts"
Cohesion: 0.20
Nodes (19): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+11 more)

### Community 42 - "markdown.ts"
Cohesion: 0.20
Nodes (9): BlogToc(), countWords(), createBlogRenderer(), MarkdownContext, markdownToPlainText(), RenderedPost, renderMarkdown(), renderPost() (+1 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (32): createStructuredQuiz(), revalidateQuizPaths(), updateSubscriptionPlanAction(), BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema (+24 more)

### Community 44 - "user-row-actions.tsx"
Cohesion: 0.16
Nodes (23): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), AssignLanguagesDialog(), handleSave() (+15 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.14
Nodes (21): EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+13 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "agent/store.ts"
Cohesion: 0.20
Nodes (14): AdminBlogAgentPage(), dynamic, maxDuration, metadata, readAgentPanelSettings(), AdminTopicStatus, AgentTopic, costSince() (+6 more)

### Community 49 - "ingest/route.ts"
Cohesion: 0.23
Nodes (15): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), getAgentConfig() (+7 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "schedule.ts"
Cohesion: 0.40
Nodes (4): dailySlots(), PUBLISH_HOUR_TEHRAN, PUBLISH_MINUTE_TEHRAN, tehranTimeToInstant()

### Community 52 - "user-management-panel.tsx"
Cohesion: 0.17
Nodes (21): STATUS_STYLES, SubscriptionsTable(), DeleteConfirmDialog(), handleConfirm(), LessonsTable(), AccountTierCellData, getInitials(), UserManagementPanel() (+13 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "quiz-sections.ts"
Cohesion: 0.47
Nodes (5): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, QuizSectionSlug

### Community 55 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, agent:topics, build, dev, lint, messages:export (+5 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "landing/content.ts"
Cohesion: 0.33
Nodes (5): en, fa, it, LANDING_COPY, LandingCopy

### Community 59 - "video-embed.ts"
Cohesion: 0.33
Nodes (8): VideoCard(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.15
Nodes (18): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger() (+10 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 63 - "ConnectionForm"
Cohesion: 0.50
Nodes (5): ConnectionForm(), runTest(), save(), submit(), keyHint()

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
Nodes (32): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+24 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.09
Nodes (29): Mark(), TIER_COLUMNS, ADMIN_ROLE_SLUGS, ALLOWED, EDITABLE_ROLE_SLUGS, EditableRoleSlug, LOCKED_PERMISSIONS, MAX_SUPER_ADMINS (+21 more)

### Community 84 - "useTranslations"
Cohesion: 0.06
Nodes (42): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), LessonsMonitorPageView(), GrammarForm() (+34 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "actions/auth.ts"
Cohesion: 0.10
Nodes (32): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), getAuthChallenge(), getClientIpForRateLimit(), padTiming(), refusalKey() (+24 more)

### Community 90 - "resolveMessage"
Cohesion: 0.07
Nodes (72): runAction(), ACCEPTED_TYPES, GrammarEditDialog(), onSubmit(), AddCurriculumLevelDialog(), onSubmit(), EditCurriculumLevelDialog(), handleConfirm() (+64 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (23): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+15 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.13
Nodes (19): AdminLandingPage(), metadata, FLAG_CODE, generateMetadata(), Home(), LandingLanguagePanel(), toggle(), Landing() (+11 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.08
Nodes (30): AdminQuizzesPage(), generateMetadata(), PageProps, resolveRequestedSlot(), LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare() (+22 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog-post-list.tsx"
Cohesion: 0.20
Nodes (13): BlogPostList(), remove(), Pagination(), BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate() (+5 more)

### Community 125 - "content-form-panels.tsx"
Cohesion: 0.09
Nodes (42): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), ContentActionBar(), ContentFormPanel() (+34 more)

### Community 126 - "subscription-plan-cards.tsx"
Cohesion: 0.12
Nodes (31): CheckoutDialog(), PLAN_ICONS, SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), LOCALE_TAGS, BillingCurrency (+23 more)

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
Nodes (15): BlogPostPage(), generateMetadata(), Props, extractImageUrls(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep (+7 more)

### Community 146 - "agent-panel.tsx"
Cohesion: 0.14
Nodes (19): bulkAddTopicsAction(), BlogAgentPanel(), Tone, TONES, PromptEditor(), RunLog(), formatTehranDateTime(), Option (+11 more)

### Community 149 - "CreateContentSection"
Cohesion: 0.50
Nodes (3): CreateContentSection(), findLessonForLevel(), stepForJump()

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.09
Nodes (29): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), submitQuizAction(), generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm() (+21 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.24
Nodes (9): absolute(), dynamic, GET(), xmlEscape(), BlogCta(), BlogLanguage, BlogLanguageSlug, BY_SLUG (+1 more)

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

### Community 163 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LOCALES, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS, en (+2 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "Blog agent — handoff"
Cohesion: 0.13
Nodes (14): Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files, Infrastructure facts (+6 more)

### Community 173 - "[language]/page.tsx"
Cohesion: 0.11
Nodes (15): LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED, cefrBandOf() (+7 more)

### Community 174 - "data-source.ts"
Cohesion: 0.19
Nodes (10): WelcomePreviewPage(), CompleteProfileForm(), onSubmit(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+2 more)

### Community 175 - "getStaticSiteUrl"
Cohesion: 0.20
Nodes (12): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), dynamic, revalidate (+4 more)

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "subscription-view.tsx"
Cohesion: 0.43
Nodes (5): recoverMyPendingPaymentsAction(), SubscriptionView(), SubscriptionViewProps, interpolateText(), BILLING_PERIOD_MONTHS

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 188 - "reconcile.ts"
Cohesion: 0.27
Nodes (6): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.07
Nodes (54): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput, dateField (+46 more)

### Community 195 - "getLocaleDefinition"
Cohesion: 0.40
Nodes (6): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition()

### Community 199 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

## Knowledge Gaps
- **652 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+647 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `admin/page.tsx`, `postgres/repository.ts`, `app-shell.tsx`, `Lesson`, `learn-category-view.tsx`, `category/[slug]/page.tsx`, `curriculum/types.ts`, `blog/[slug]/page.tsx`, `blog.ts`, `enforceLanguageScope`, `[quiz_id]/page.tsx`, `blog/languages.ts`, `admin/blog/page.tsx`, `resolveRolePermissions`, `pipeline.ts`, `isLocalDataMode`, `action-guards.ts`, `data/index.ts`, `admin.ts`, `user-row-actions.tsx`, `[language]/page.tsx`, `data-source.ts`, `getStaticSiteUrl`, `agent/store.ts`, `ingest/route.ts`, `subscription-view.tsx`, `phone-accounts.ts`, `actions/auth.ts`, `app/page.tsx`, `lessons-monitor.tsx`, `blog-post-list.tsx`, `content-form-panels.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `better-auth.ts`, `topic-queue.tsx`, `category/[slug]/page.tsx`, `curriculum/types.ts`, `button.tsx`, `blog-image-library.tsx`, `CreateContentSection`, `[quiz_id]/page.tsx`, `blog-shell.tsx`, `markdown.ts`, `subscription-view.tsx`, `user-management-panel.tsx`, `BannerUploadForm`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `sections.tsx`, `useTranslations`, `actions/auth.ts`, `resolveMessage`, `lessons-monitor.tsx`, `blog-post-list.tsx`, `subscription-plan-cards.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `topic-queue.tsx`, `learn-category-view.tsx`, `button.tsx`, `enforceLanguageScope`, `CreateContentSection`, `getDataRepository`, `[quiz_id]/page.tsx`, `jalali.ts`, `resolveRolePermissions`, `cn`, `user-row-actions.tsx`, `data-source.ts`, `subscription-view.tsx`, `user-management-panel.tsx`, `BannerUploadForm`, `video-embed.ts`, `admin-accounting-page-view.tsx`, `TierCapabilitiesPanel`, `permissions/roles.ts`, `actions/auth.ts`, `resolveMessage`, `lessons-monitor.tsx`, `content-form-panels.tsx`, `subscription-plan-cards.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _652 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08067375886524823 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.02562342713337909 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._