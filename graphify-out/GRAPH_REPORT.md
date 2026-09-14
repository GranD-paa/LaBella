# Graph Report - cursor P  (2026-09-14)

## Corpus Check
- 526 files · ~410,973 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2880 nodes · 8284 edges · 193 communities (126 shown, 67 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4a24bc8e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- PaymentSettings
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- learn-category-view.tsx
- agent/config.ts
- Lesson
- getDataRepository
- pages.ts
- seed.ts
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
- jalali.ts
- requireAdminPermission
- schema.sql
- compilerOptions
- error-state.tsx
- devDependencies
- dependencies
- admin/page.tsx
- i18n/types.ts
- components.json
- pipeline.ts
- cn
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
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- content-form-panels.tsx
- ingest/route.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- prompts.ts
- locale-provider.tsx
- final-deployment/manifest.json
- visibility.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- data/repository.ts
- video-lessons-grid.tsx
- sync-local-content.mjs
- landing/pricing.ts
- app/layout.tsx
- resolveRolePermissions
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
- permissions/roles.ts
- useTranslations
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- about-view.tsx
- react-dom
- resolveMessage
- What You Must Do When Invoked
- 005_send_limits.sql
- phone-auth-form.tsx
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
- money.ts
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
- agent/store.ts
- react-hook-form
- @radix-ui/react-avatar
- ConnectionForm
- [quiz_id]/page.tsx
- blog/languages.ts
- [category]/page.tsx
- blog-agent.mjs
- SubscriptionPlanCards
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
- TopicQueue
- llms.txt/route.ts
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
- reconcile.ts
- 011_blog_agent.sql
- blog-agent.ts
- @radix-ui/react-dropdown-menu
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
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/about/page.tsx → lib/i18n/metadata.ts
- `runTest()` --calls--> `testConnectionAction()`  [EXTRACTED]
  components/admin/blog/agent/connection-form.tsx → app/admin/actions/blog-agent.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (193 total, 67 thin omitted)

### Community 0 - "PaymentSettings"
Cohesion: 0.15
Nodes (16): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+8 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.11
Nodes (28): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, blogImageUrl(), getAccountingSnapshot(), buildUpdate(), execute() (+20 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (6): BlogPost, DataRepository, GrammarRule, QuizQuestion, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (27): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+19 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (20): signOutAction(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+12 more)

### Community 5 - "learn-category-view.tsx"
Cohesion: 0.12
Nodes (24): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnCategoryView() (+16 more)

### Community 6 - "agent/config.ts"
Cohesion: 0.21
Nodes (13): AiConnection, DEFAULT_AI_BASE_URL, AgentConfig, ApiKeyState, flag(), getAgentConfig(), loadAgentConfig(), readAgentPanelSettings() (+5 more)

### Community 7 - "Lesson"
Cohesion: 0.11
Nodes (23): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+15 more)

### Community 8 - "getDataRepository"
Cohesion: 0.15
Nodes (21): cancelSubscriptionAction(), recoverMyPendingPaymentsAction(), saveGrammarReadingProgress(), submitQuizAction(), grantSubscriptionAction(), setLandingLanguageVisibilityAction(), updateRolePermissionsAction(), updateEntitlementSettingsAction() (+13 more)

### Community 9 - "pages.ts"
Cohesion: 0.30
Nodes (14): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), attachGrammarPages(), deleteObject(), deleteObjects() (+6 more)

### Community 10 - "seed.ts"
Cohesion: 0.08
Nodes (18): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+10 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.20
Nodes (21): postSchema, BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata() (+13 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.15
Nodes (16): CategoryWatermark(), CATEGORY_ICON_BG, CATEGORY_ICON_TINT, CATEGORY_ICONS, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes() (+8 more)

### Community 13 - "local/store.ts"
Cohesion: 0.15
Nodes (21): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+13 more)

### Community 14 - "button.tsx"
Cohesion: 0.16
Nodes (25): ACCEPTED_TYPES, TestState, SECTIONS, ACCEPTED, LANDMARK_LABELS, LANGUAGE_LABELS, Draft, ToggleRow() (+17 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.10
Nodes (19): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE (+11 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "local/repository.ts"
Cohesion: 0.22
Nodes (12): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+4 more)

### Community 18 - "blog.ts"
Cohesion: 0.12
Nodes (16): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, resolveUploadError(), saveBlogPostAction() (+8 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "user-row-actions.tsx"
Cohesion: 0.16
Nodes (23): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), AssignLanguagesDialog(), handleSave() (+15 more)

### Community 22 - "jalali.ts"
Cohesion: 0.05
Nodes (60): { GET, POST }, OtpInput(), absorb(), focusBox(), DateOfBirthField(), clampDay(), assertVerifiablePhone(), auth (+52 more)

### Community 23 - "requireAdminPermission"
Cohesion: 0.15
Nodes (30): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+22 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next, next-themes (+19 more)

### Community 29 - "admin/page.tsx"
Cohesion: 0.16
Nodes (22): AdminBlogPage(), metadata, AdminPage(), generateMetadata(), DashboardPage(), generateMetadata(), TierReference, AdminDashboard() (+14 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.10
Nodes (28): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+20 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.10
Nodes (33): runTopicNowAction(), dynamic, GET(), maxDuration, POST(), wrongDataSource(), TokenUsage, costToman() (+25 more)

### Community 33 - "cn"
Cohesion: 0.06
Nodes (53): CheckRow(), Counter(), RoleBadge(), LaparliLogo(), Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), QuizSubmittedBanner() (+45 more)

### Community 34 - "refresh.ts"
Cohesion: 0.15
Nodes (12): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+4 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.12
Nodes (30): buildRecoveryDeps(), CheckoutResult, resolveOrigin(), startCheckoutAction(), dynamic, GET(), supabaseFxStore(), dynamic (+22 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.27
Nodes (8): NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 37 - "action-guards.ts"
Cohesion: 0.20
Nodes (10): AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireContentScope(), requireSuperAdminAction(), getAuthUser, getProfileById (+2 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.11
Nodes (33): AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata() (+25 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.14
Nodes (6): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton(), Skeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.13
Nodes (23): updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url(), verifyLocalSessionToken() (+15 more)

### Community 41 - "arvan.ts"
Cohesion: 0.20
Nodes (19): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+11 more)

### Community 42 - "markdown.ts"
Cohesion: 0.14
Nodes (18): absolute(), dynamic, GET(), xmlEscape(), BlogToc(), PublishableArticle, publishArticle(), uniqueSlug() (+10 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (29): updateSubscriptionPlanAction(), bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues (+21 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.18
Nodes (19): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+11 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.07
Nodes (30): BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS (+22 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "content-form-panels.tsx"
Cohesion: 0.04
Nodes (60): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+52 more)

### Community 49 - "ingest/route.ts"
Cohesion: 0.24
Nodes (12): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), normalise() (+4 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "prompts.ts"
Cohesion: 0.17
Nodes (13): BRAND_IMAGE_STYLE_LINES, BRAND_VOICE, DEFAULT_PROMPT_SECTIONS, ExistingPost, PROMPT_SECTION_KEYS, PromptOverrides, PromptSectionKey, SEO_RULES (+5 more)

### Community 52 - "locale-provider.tsx"
Cohesion: 0.17
Nodes (21): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LessonsTable(), AccountTierCell(), AccountTierCellData, GrantPlanOption, getInitials() (+13 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "visibility.ts"
Cohesion: 0.19
Nodes (10): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), LANDING_LANGUAGES, LandingLanguageDefinition, LandingLanguageSlug, LandmarkId (+2 more)

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
Nodes (15): GrammarReader(), BlogImage, BlogPostInput, AdminSubscriptionSummary, AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle (+7 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "landing/pricing.ts"
Cohesion: 0.17
Nodes (12): rialFor(), formatPaidAmount(), formatRialAsToman(), LOCALE_TAGS, convertEurCentsToRial(), rialToToman(), getLandingPricing(), toToman() (+4 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 63 - "resolveRolePermissions"
Cohesion: 0.22
Nodes (11): RolePermissionsContext, RolePermissionsProvider(), useRolePermissionOverrides(), useRolePermissions(), RolePermissionEditor(), handleSave(), RolesPermissionsPanel(), UserProfileDialog() (+3 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "actions/auth.ts"
Cohesion: 0.09
Nodes (30): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getClientIpForRateLimit(), padTiming(), refusalKey() (+22 more)

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
Cohesion: 0.08
Nodes (30): ADMIN_NAV, ADMIN_ROLE_SLUGS, ALLOWED, canEditRolePermissions(), EDITABLE_ROLE_SLUGS, EditableRoleSlug, isEditableRole(), LOCKED_PERMISSIONS (+22 more)

### Community 84 - "useTranslations"
Cohesion: 0.04
Nodes (58): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), handleRefreshRate(), onSubmit(), PaymentsLedger() (+50 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "about-view.tsx"
Cohesion: 0.33
Nodes (4): generateMetadata(), AboutView(), TIMELINE_KEYS, VALUE_ICONS

### Community 90 - "resolveMessage"
Cohesion: 0.12
Nodes (40): LessonPicker(), OPTION_KEYS, LOCALES, SubscriptionPlanEditDialog(), onSubmit(), GrantSubscriptionDialog(), handleSave(), ManagedUser (+32 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "phone-auth-form.tsx"
Cohesion: 0.10
Nodes (32): getAuthChallenge(), localFormat(), ltr(), PhoneAuthForm(), fail(), submitPhone(), useSolvedChallenge(), CHALLENGE_DIFFICULTY (+24 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.20
Nodes (14): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck, DECKS (+6 more)

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
Cohesion: 0.20
Nodes (10): BlogPostList(), remove(), Pagination(), BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate() (+2 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.12
Nodes (23): createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, ContentCategorySlug, GRAMMAR_PAGES_PER_REQUEST (+15 more)

### Community 126 - "money.ts"
Cohesion: 0.29
Nodes (12): BillingCurrency, centsToEur(), computePrice(), divRoundHalfUp(), eurToCents(), IrrConversionInput, PriceBreakdown, RateAcceptance (+4 more)

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

### Community 146 - "agent/store.ts"
Cohesion: 0.12
Nodes (24): AdminBlogAgentPage(), dynamic, maxDuration, metadata, BlogAgentPanel(), Tone, TONES, PromptEditor() (+16 more)

### Community 149 - "ConnectionForm"
Cohesion: 0.50
Nodes (5): ConnectionForm(), runTest(), save(), submit(), keyHint()

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.06
Nodes (43): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminLayout(), generateMetadata(), PageProps, QuizPage(), UserQuizAttemptsPanel(), buildInitialFeedback() (+35 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 152 - "[category]/page.tsx"
Cohesion: 0.11
Nodes (25): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+17 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "SubscriptionPlanCards"
Cohesion: 0.20
Nodes (8): daysRemaining(), MySubscriptionsCard(), SubscriptionPlanCards(), pricingFor(), getSubscriptionPlanMeta(), SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

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

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 173 - "TopicQueue"
Cohesion: 0.70
Nodes (5): TopicQueue(), onConfirm(), perform(), renderRow(), runNow()

### Community 175 - "llms.txt/route.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 176 - "topic-queue.tsx"
Cohesion: 0.18
Nodes (20): ActionOutcome, ConfirmDialog(), Field(), formatJalaliDay(), selectClassName, StatusBadge(), TOPIC_STATUS, Confirmation (+12 more)

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

### Community 188 - "reconcile.ts"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.06
Nodes (62): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkAddTopicsAction(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput (+54 more)

## Knowledge Gaps
- **653 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+648 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **67 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/repository.ts`, `app-shell.tsx`, `pages.ts`, `category/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `blog.ts`, `agent/store.ts`, `user-row-actions.tsx`, `[quiz_id]/page.tsx`, `requireAdminPermission`, `[category]/page.tsx`, `blog/languages.ts`, `admin/page.tsx`, `pipeline.ts`, `isLocalDataMode`, `action-guards.ts`, `getServerTranslator`, `markdown.ts`, `admin.ts`, `curriculum-levels.ts`, `llms.txt/route.ts`, `ingest/route.ts`, `visibility.ts`, `actions/auth.ts`, `app/page.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `learn-category-view.tsx`, `category/[slug]/page.tsx`, `curriculum/types.ts`, `button.tsx`, `blog.ts`, `[quiz_id]/page.tsx`, `jalali.ts`, `SubscriptionPlanCards`, `blog-shell.tsx`, `page-skeletons.tsx`, `content-form-panels.tsx`, `topic-queue.tsx`, `locale-provider.tsx`, `BannerUploadForm`, `app/layout.tsx`, `sections.tsx`, `useTranslations`, `resolveMessage`, `phone-auth-form.tsx`, `lessons-monitor.tsx`, `blog/types.ts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `learn-category-view.tsx`, `button.tsx`, `user-row-actions.tsx`, `[quiz_id]/page.tsx`, `requireAdminPermission`, `jalali.ts`, `SubscriptionPlanCards`, `admin/page.tsx`, `cn`, `isLocalDataMode`, `content-form-panels.tsx`, `topic-queue.tsx`, `locale-provider.tsx`, `BannerUploadForm`, `data/repository.ts`, `video-lessons-grid.tsx`, `resolveRolePermissions`, `sections.tsx`, `about-view.tsx`, `resolveMessage`, `phone-auth-form.tsx`, `lessons-monitor.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _653 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PaymentSettings` be split into smaller, more focused modules?**
  _Cohesion score 0.14855072463768115 - nodes in this community are weakly interconnected._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10960960960960961 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.030416951469583047 - nodes in this community are weakly interconnected._