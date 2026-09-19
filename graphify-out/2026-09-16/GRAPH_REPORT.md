# Graph Report - cursor P  (2026-09-15)

## Corpus Check
- 529 files · ~413,154 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2914 nodes · 8355 edges · 205 communities (138 shown, 67 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b2d8b4e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin-accounting-page-view.tsx
- postgres/client.ts
- DataRepository
- fa.ts
- cn
- topic-queue.tsx
- jalali.ts
- Lesson
- user-management-panel.tsx
- data/repository.ts
- types/index.ts
- seo.ts
- level-category-grid.tsx
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
- app/layout.tsx
- components.json
- pipeline.ts
- agent/page.tsx
- sms.ts
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- getServerTranslator
- page-skeletons.tsx
- middleware.ts
- arvan.ts
- blog/[slug]/page.tsx
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
- badge.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- landing.tsx
- resolveMessage
- RoleSlug
- billing/schema.test.ts
- vercel.json
- app-shell.tsx
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
- providers.ts
- pg
- permissions/roles.ts
- useTranslations
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- i18n/types.ts
- ship.mjs
- billing-settings-form.tsx
- What You Must Do When Invoked
- 005_send_limits.sql
- phone-auth-form.tsx
- app/page.tsx
- curriculum/types.ts
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
- quiz-form.tsx
- curriculum/languages.ts
- ingest/route.ts
- lucide-react
- getDataRepository
- react-hook-form
- @radix-ui/react-avatar
- banner-list.tsx
- actions/quiz.ts
- blog/languages.ts
- entitlements/index.ts
- blog-agent.mjs
- availability.ts
- [quiz_id]/page.tsx
- three
- 006_banner_images.sql
- public.grammar_rules
- Rules
- Search engine visibility
- 008_phone_auth.sql
- LanguageSlug
- sms-test.mjs
- @radix-ui/react-label
- resolveRolePermissions
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- Blog agent — handoff
- local-session.ts
- data-source.ts
- TopicQueue
- agent-panel.tsx
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
- landing/pricing.ts
- reconcile.ts
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
- rss.xml/route.ts
- ConnectionForm
- AssignLanguagesDialog

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
- `WelcomePreviewPage()` --calls--> `isLocalDataMode()`  [EXTRACTED]
  app/(auth)/welcome-preview/page.tsx → lib/config/data-source.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `runTest()` --calls--> `testConnectionAction()`  [EXTRACTED]
  components/admin/blog/agent/connection-form.tsx → app/admin/actions/blog-agent.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/languages/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (205 total, 67 thin omitted)

### Community 0 - "admin-accounting-page-view.tsx"
Cohesion: 0.17
Nodes (18): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), toCsv() (+10 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.10
Nodes (24): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, ProfileDetails, ProfileState, saveProfile(), SaveProfileResult (+16 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (9): BlogPostInput, buildAchievements(), fetchUserDashboardData(), DataRepository, fetchQuizManagementStats(), GrammarRule, QuizQuestion, UserQuizAttempt (+1 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "cn"
Cohesion: 0.10
Nodes (26): signOutAction(), CheckRow(), Counter(), LaparliLogo(), UserNav(), AdminHeaderBadge(), AppHeader(), AuthAsidePanel() (+18 more)

### Community 5 - "topic-queue.tsx"
Cohesion: 0.16
Nodes (19): ACCEPTED_TYPES, formatJalaliDay(), Confirmation, TopicFields(), ACCEPTED, LOCALES, ManagedUser, PROVIDER_ICONS (+11 more)

### Community 6 - "jalali.ts"
Cohesion: 0.11
Nodes (30): WelcomePreviewPage(), CompleteProfileForm(), DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali() (+22 more)

### Community 7 - "Lesson"
Cohesion: 0.07
Nodes (41): CategoryPage(), BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, getLevel(), isCategorySlug(), ContinueLearningProgress (+33 more)

### Community 8 - "user-management-panel.tsx"
Cohesion: 0.18
Nodes (20): STATUS_STYLES, SubscriptionsTable(), DeleteConfirmDialog(), AccountTierCell(), AccountTierCellData, RoleBadge(), getInitials(), UserManagementPanel() (+12 more)

### Community 9 - "data/repository.ts"
Cohesion: 0.05
Nodes (45): DEFAULT_SUBSCRIPTION_TIERS, BlogImage, CurriculumLevelOverrideRow, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage() (+37 more)

### Community 10 - "types/index.ts"
Cohesion: 0.09
Nodes (30): SubscriptionView(), SubscriptionViewProps, AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy() (+22 more)

### Community 11 - "seo.ts"
Cohesion: 0.21
Nodes (22): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, Props, BlogIndexPage() (+14 more)

### Community 12 - "level-category-grid.tsx"
Cohesion: 0.08
Nodes (35): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), QuizSubmittedBanner() (+27 more)

### Community 13 - "local/store.ts"
Cohesion: 0.15
Nodes (21): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+13 more)

### Community 14 - "button.tsx"
Cohesion: 0.14
Nodes (29): TestState, SECTIONS, RUN_STATUS, ConfirmDialog(), Field(), LANDMARK_LABELS, LANGUAGE_LABELS, Draft (+21 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.14
Nodes (13): ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl(), ImageDimensions, isBlogImageUrl(), MAX_BLOG_IMAGE_BYTES, readImageDimensions(), readJpegDimensions() (+5 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "local/repository.ts"
Cohesion: 0.23
Nodes (11): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+3 more)

### Community 18 - "blog.ts"
Cohesion: 0.10
Nodes (20): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), optionalText, optionalUrl, postSchema, resolveUploadError(), saveBlogPostAction() (+12 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "user-row-actions.tsx"
Cohesion: 0.24
Nodes (17): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), GrantPlanOption, PendingActionType (+9 more)

### Community 22 - "better-auth.ts"
Cohesion: 0.18
Nodes (13): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+5 more)

### Community 23 - "requireAdminPermission"
Cohesion: 0.13
Nodes (32): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule() (+24 more)

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
Cohesion: 0.14
Nodes (24): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminBlogPage(), metadata, AdminLayout(), AdminPage(), generateMetadata(), DashboardPage() (+16 more)

### Community 30 - "app/layout.tsx"
Cohesion: 0.11
Nodes (21): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie() (+13 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.11
Nodes (33): dynamic, GET(), maxDuration, POST(), wrongDataSource(), costToman(), loadConfigOrReason(), loadContext() (+25 more)

### Community 33 - "agent/page.tsx"
Cohesion: 0.27
Nodes (10): AdminBlogAgentPage(), dynamic, maxDuration, metadata, readAgentPanelSettings(), DEFAULT_PROMPT_SECTIONS, costSince(), listRunsForAdmin() (+2 more)

### Community 34 - "sms.ts"
Cohesion: 0.27
Nodes (13): toLocalIranFormat(), assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode() (+5 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.21
Nodes (17): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+9 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.27
Nodes (8): NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 37 - "action-guards.ts"
Cohesion: 0.12
Nodes (17): setLandingLanguageVisibilityAction(), updateRolePermissionsAction(), LandingLanguagePanel(), toggle(), ActionResult, AdminGuardResult, GuardFail, GuardOk (+9 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.17
Nodes (16): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminSubscriptionPage(), generateMetadata(), ContactPage() (+8 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (20): generateMetadata(), dynamic, robots(), onSubmit(), updateLocalSession(), updatePostgresSession(), AUTH_PATHS, isPublicRoute() (+12 more)

### Community 41 - "arvan.ts"
Cohesion: 0.15
Nodes (23): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+15 more)

### Community 42 - "blog/[slug]/page.tsx"
Cohesion: 0.19
Nodes (15): BlogPostPage(), generateMetadata(), Props, BlogToc(), countWords(), createBlogRenderer(), extractImageUrls(), MarkdownContext (+7 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (28): updateSubscriptionPlanAction(), toggle(), onSubmit(), BannerValues, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues (+20 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.20
Nodes (18): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+10 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.15
Nodes (15): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, ExtendedQuiz, ExtendedQuizQuestion, LEVEL_EXAM_SECTION, normalizeAnswer() (+7 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "content-form-panels.tsx"
Cohesion: 0.08
Nodes (34): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+26 more)

### Community 49 - "checkout.ts"
Cohesion: 0.27
Nodes (12): buildRecoveryDeps(), cancelSubscriptionAction(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), requireAuthenticatedAction() (+4 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "agent/config.ts"
Cohesion: 0.11
Nodes (25): saveConnectionAction(), AiConnection, DEFAULT_AI_BASE_URL, AgentConfig, ApiKeyState, flag(), loadAgentConfig(), ResolvedAgentConfig (+17 more)

### Community 52 - "utils.ts"
Cohesion: 0.13
Nodes (17): AdminSubscriptionPageView(), EntitlementSettingsPanel(), draftFrom(), TierCapabilitiesPanel(), save(), BandExamCard, BandExamsSection(), ComingSoonLanguage() (+9 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "actions/auth.ts"
Cohesion: 0.12
Nodes (23): ActionResult, decideAndSend(), describeVerifyFailure(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode(), verifyPhoneCode() (+15 more)

### Community 55 - "scripts"
Cohesion: 0.12
Nodes (15): name, private, scripts, agent:topics, build, dev, lint, messages:export (+7 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "badge.tsx"
Cohesion: 0.12
Nodes (16): AdminBannersPageView(), BannerManagementPanel(), AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), AdminQuizzesPageView(), CONTENT_TYPES, CreateContentSection() (+8 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "landing.tsx"
Cohesion: 0.14
Nodes (21): LandingHero(), Landing(), Price(), PricingFallback(), PricingSection(), SegmentButton(), LandingDay(), LandingFeatures() (+13 more)

### Community 62 - "resolveMessage"
Cohesion: 0.09
Nodes (21): handleConfirm(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), AddCurriculumLevelDialog(), onSubmit(), EditCurriculumLevelDialog() (+13 more)

### Community 63 - "RoleSlug"
Cohesion: 0.29
Nodes (8): orderUsersForTable(), roleRank(), account(), learners(), visible(), VISIBLE_USER_LIMIT, ROLE_SLUGS, RoleSlug

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

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
Cohesion: 0.13
Nodes (18): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+10 more)

### Community 80 - "providers.ts"
Cohesion: 0.20
Nodes (8): FxFetchResult, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote, parseRateString()

### Community 83 - "permissions/roles.ts"
Cohesion: 0.08
Nodes (29): ADMIN_ROLE_SLUGS, ALLOWED, canEditRolePermissions(), EDITABLE_ROLE_SLUGS, EditableRoleSlug, isEditableRole(), LOCKED_PERMISSIONS, ManagedAccount (+21 more)

### Community 84 - "useTranslations"
Cohesion: 0.07
Nodes (36): saveGrammarReadingProgress(), AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), GrammarManager(), GrammarTable(), LessonsTable() (+28 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "i18n/types.ts"
Cohesion: 0.16
Nodes (18): countdownTickMs(), formatCountdown(), fa, t, Translator, Unit, messages, createTranslator() (+10 more)

### Community 89 - "ship.mjs"
Cohesion: 0.17
Nodes (23): announce(), buildRun(), commit(), describe(), describeStaged(), fail(), findProxy(), get() (+15 more)

### Community 90 - "billing-settings-form.tsx"
Cohesion: 0.23
Nodes (20): LessonPicker(), Values, ContactViewProps, FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue (+12 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "phone-auth-form.tsx"
Cohesion: 0.09
Nodes (36): getAuthChallenge(), localFormat(), ltr(), PhoneAuthForm(), fail(), submitPhone(), useSolvedChallenge(), CHALLENGE_DIFFICULTY (+28 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.11
Nodes (22): AdminLandingPage(), metadata, dynamic, GET(), text(), FLAG_CODE, generateMetadata(), Home() (+14 more)

### Community 95 - "curriculum/types.ts"
Cohesion: 0.10
Nodes (26): LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, CONTENT_CATEGORIES, ContentStatus, ContentWizardContext (+18 more)

### Community 99 - "pages.ts"
Cohesion: 0.30
Nodes (14): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), attachGrammarPages(), deleteObject(), deleteObjects() (+6 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog/types.ts"
Cohesion: 0.19
Nodes (15): deleteBlogPostAction(), BlogPostList(), remove(), Pagination(), BlogCardVariant, BlogPostCard(), Meta(), postHref() (+7 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.13
Nodes (22): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, ContentCategorySlug, GRAMMAR_PAGES_PER_REQUEST, RenderGrammarPagesResult (+14 more)

### Community 126 - "money.ts"
Cohesion: 0.27
Nodes (13): BillingCurrency, centsToEur(), computePrice(), divRoundHalfUp(), eurToCents(), IrrConversionInput, isRateAcceptable(), PriceBreakdown (+5 more)

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

### Community 142 - "quiz-form.tsx"
Cohesion: 0.15
Nodes (14): OPTION_KEYS, OPTION_LABELS, QuestionFeedback, JalaliParts, RadioGroup, RadioGroupItem, SelectContent, SelectItem (+6 more)

### Community 143 - "curriculum/languages.ts"
Cohesion: 0.16
Nodes (11): ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, CATEGORY_DEFINITIONS, getLanguage(), resolveLessonForLevel(), TURKISH_LEVELS, CategoryDefinition (+3 more)

### Community 144 - "ingest/route.ts"
Cohesion: 0.22
Nodes (16): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), getAgentConfig() (+8 more)

### Community 146 - "getDataRepository"
Cohesion: 0.16
Nodes (19): completeProfile(), destinationFor(), generateMetadata(), WelcomePage(), generateMetadata(), PageProps, generateMetadata(), LevelPage() (+11 more)

### Community 149 - "banner-list.tsx"
Cohesion: 0.39
Nodes (7): deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction(), BannerList(), runAction(), bannerSchema

### Community 150 - "actions/quiz.ts"
Cohesion: 0.09
Nodes (29): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), buildQuizAttemptAnswersJson(), formatUserAnswerLabel(), OPTION_FIELDS (+21 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 152 - "entitlements/index.ts"
Cohesion: 0.16
Nodes (8): ALL_UNLOCKED, Entitlement, EntitlementGate, gateForCategory(), isFreeBand(), resolveEntitlement(), TIERS, Subscription

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "availability.ts"
Cohesion: 0.16
Nodes (15): AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), PageProps, resolveRequestedSlot() (+7 more)

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

### Community 163 - "LanguageSlug"
Cohesion: 0.16
Nodes (11): LandingCourse, LOCALES, LanguageSlug, BRAND_MARK, BrandMark, COURSE_ORDER, CourseDeck, DECKS (+3 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 167 - "resolveRolePermissions"
Cohesion: 0.21
Nodes (10): RolePermissionsContext, RolePermissionsProvider(), useRolePermissions(), RolePermissionEditor(), handleSave(), UserProfileDialog(), isGrantablePermission(), resolveRolePermissions() (+2 more)

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 173 - "local-session.ts"
Cohesion: 0.42
Nodes (7): clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url(), verifyLocalSessionToken()

### Community 174 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 175 - "TopicQueue"
Cohesion: 0.36
Nodes (8): deleteTopicAction(), runTopicNowAction(), TopicQueue(), onConfirm(), perform(), renderRow(), runNow(), deleteTopic()

### Community 176 - "agent-panel.tsx"
Cohesion: 0.12
Nodes (26): BlogAgentPanel(), Tone, TONES, PromptEditor(), RunLog(), SettingsForm(), ActionOutcome, ErrorText() (+18 more)

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

### Community 187 - "landing/pricing.ts"
Cohesion: 0.13
Nodes (14): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), convertEurCentsToRial(), rialToToman(), getLandingPricing(), toToman() (+6 more)

### Community 188 - "reconcile.ts"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.06
Nodes (57): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkAddTopicsAction(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput (+49 more)

### Community 202 - "rss.xml/route.ts"
Cohesion: 0.53
Nodes (5): absolute(), dynamic, GET(), xmlEscape(), markdownToPlainText()

### Community 203 - "ConnectionForm"
Cohesion: 0.50
Nodes (5): ConnectionForm(), runTest(), save(), submit(), keyHint()

## Knowledge Gaps
- **658 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+653 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **67 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `cn`, `Lesson`, `seo.ts`, `ingest/route.ts`, `blog.ts`, `banner-list.tsx`, `actions/quiz.ts`, `requireAdminPermission`, `user-row-actions.tsx`, `blog/languages.ts`, `blog/[id]/page.tsx`, `availability.ts`, `[quiz_id]/page.tsx`, `admin/page.tsx`, `pipeline.ts`, `agent/page.tsx`, `isLocalDataMode`, `action-guards.ts`, `getServerTranslator`, `blog/[slug]/page.tsx`, `admin.ts`, `curriculum-levels.ts`, `data-source.ts`, `checkout.ts`, `actions/auth.ts`, `app-shell.tsx`, `rss.xml/route.ts`, `useTranslations`, `app/page.tsx`, `pages.ts`, `blog/types.ts`, `actions/content.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `admin-accounting-page-view.tsx`, `cn`, `topic-queue.tsx`, `jalali.ts`, `user-management-panel.tsx`, `types/index.ts`, `level-category-grid.tsx`, `button.tsx`, `quiz-form.tsx`, `banner-list.tsx`, `user-row-actions.tsx`, `actions/quiz.ts`, `availability.ts`, `getServerTranslator`, `resolveRolePermissions`, `content-form-panels.tsx`, `agent-panel.tsx`, `ChangeRoleDialog`, `utils.ts`, `BannerUploadForm`, `badge.tsx`, `video-lessons-grid.tsx`, `landing/pricing.ts`, `landing.tsx`, `resolveMessage`, `AssignLanguagesDialog`, `billing-settings-form.tsx`, `phone-auth-form.tsx`, `curriculum/types.ts`, `actions/content.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `admin-accounting-page-view.tsx`, `topic-queue.tsx`, `user-management-panel.tsx`, `types/index.ts`, `seo.ts`, `level-category-grid.tsx`, `button.tsx`, `quiz-form.tsx`, `blog.ts`, `better-auth.ts`, `actions/quiz.ts`, `app/layout.tsx`, `blog-shell.tsx`, `agent-panel.tsx`, `utils.ts`, `BannerUploadForm`, `badge.tsx`, `landing/pricing.ts`, `landing.tsx`, `sections.tsx`, `useTranslations`, `billing-settings-form.tsx`, `phone-auth-form.tsx`, `curriculum/types.ts`, `blog/types.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _658 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10420168067226891 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.029509183980728697 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._