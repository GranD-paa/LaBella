# Graph Report - cursor P  (2026-09-13)

## Corpus Check
- 512 files · ~396,753 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2737 nodes · 7785 edges · 199 communities (134 shown, 65 thin omitted)
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
- edit-curriculum-level-dialog.tsx
- blog-post-editor.tsx
- types/index.ts
- category/[slug]/page.tsx
- curriculum/types.ts
- local/store.ts
- card.tsx
- blog-image.ts
- 001_app_schema.sql
- period.ts
- subscription-view.tsx
- providers/index.ts
- robots-metadata.test.ts
- button.tsx
- jalali.ts
- requireAdminPermission
- schema.sql
- compilerOptions
- blog/[id]/page.tsx
- devDependencies
- dependencies
- content-form-panels.tsx
- server-locale.ts
- components.json
- ingest/route.ts
- utils.ts
- refresh.ts
- fx-rate/route.ts
- blog-shell.tsx
- action-guards.ts
- getServerTranslator
- page-skeletons.tsx
- middleware.ts
- arvan.ts
- markdown.ts
- admin.ts
- user-row-actions.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- landing/pricing.ts
- cn
- final-deployment/manifest.json
- getDataRepository
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- billing-settings-form.tsx
- video-embed.ts
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- quiz-form.tsx
- billing/schema.test.ts
- vercel.json
- isLocalDataMode
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
- PhoneAuthForm
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
- blog-post-list.tsx
- actions/content.ts
- locale-provider.tsx
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
- enforceLanguageScope
- react-hook-form
- @radix-ui/react-avatar
- lesson/[id]/page.tsx
- [quiz_id]/page.tsx
- blog/languages.ts
- local/repository.ts
- blog-agent.mjs
- my-subscriptions-card.tsx
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
- [category]/page.tsx
- data-source.ts
- llms.txt/route.ts
- learn-category-view.tsx
- run-migration.mjs
- user-management-panel.tsx
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- dashboard-data.ts
- reconcile.ts
- 011_blog_agent.sql
- schedule.ts
- @radix-ui/react-dropdown-menu
- tailwindcss-animate
- zod
- brand-logo.tsx
- getLocaleDefinition
- create-content-section.tsx
- entitlements/schema.test.ts
- decks.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 213 edges
2. `cn()` - 187 edges
3. `getDataRepository()` - 164 edges
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
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `BlogPostEditor()` --indirect_call--> `saveBlogPostAction()`  [INFERRED]
  components/admin/blog/blog-post-editor.tsx → app/admin/actions/blog.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts

## Import Cycles
- None detected.

## Communities (199 total, 65 thin omitted)

### Community 0 - "admin/page.tsx"
Cohesion: 0.18
Nodes (17): AdminPage(), generateMetadata(), DashboardPage(), generateMetadata(), RolePermissionsContext, RolePermissionsProvider(), getRolePermissions(), fetchAdminDashboardData() (+9 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.09
Nodes (32): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, runTopicNow(), tick(), AgentTopic, claimNextTopic() (+24 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (11): BlogImage, buildLearnerEngagementMetrics(), buildAchievements(), fetchUserDashboardData(), DataRepository, fetchQuizManagementStats(), GrammarRule, Profile (+3 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (19): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell() (+11 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.15
Nodes (21): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, isIranianMobile(), isIranianPhone(), looksGenerated(), normalizePhone() (+13 more)

### Community 6 - "pipeline.ts"
Cohesion: 0.14
Nodes (20): TokenUsage, costToman(), MODEL_RATES, ModelRate, loadContext(), makeCover(), RunOutcome, runTopic() (+12 more)

### Community 7 - "Lesson"
Cohesion: 0.11
Nodes (20): LESSONS, TEN_A1_LEVELS, ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed() (+12 more)

### Community 8 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.45
Nodes (9): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+1 more)

### Community 9 - "blog-post-editor.tsx"
Cohesion: 0.15
Nodes (12): ACCEPTED_TYPES, ACCEPTED, CheckRow(), Counter(), Draft, draftFrom(), TierCapabilitiesPanel(), save() (+4 more)

### Community 10 - "types/index.ts"
Cohesion: 0.07
Nodes (39): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+31 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.24
Nodes (18): postSchema, BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata() (+10 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.09
Nodes (28): addCurriculumLevelAction(), isCefrBand(), AddCurriculumLevelDialog(), onSubmit(), CONTENT_CATEGORIES, ContentStatus, ContentWizardContext, ENGLISH_LEVELS (+20 more)

### Community 13 - "local/store.ts"
Cohesion: 0.16
Nodes (19): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), LOCAL_SEED, LocalDatabase (+11 more)

### Community 14 - "card.tsx"
Cohesion: 0.18
Nodes (19): LANDMARK_LABELS, LANGUAGE_LABELS, AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), AdminDashboard(), getInitial(), NAV_ICONS (+11 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.14
Nodes (13): ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl(), ImageDimensions, isBlogImageUrl(), MAX_BLOG_IMAGE_BYTES, readImageDimensions(), readJpegDimensions() (+5 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 18 - "subscription-view.tsx"
Cohesion: 0.23
Nodes (10): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), SubscriptionView(), SubscriptionViewProps, interpolateText(), BILLING_PERIOD_MONTHS, BillingCurrency (+2 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "button.tsx"
Cohesion: 0.24
Nodes (14): LOCALES, ToggleRow(), PROVIDER_ICONS, PROVIDER_LABELS, Button, ButtonProps, DialogContent, DialogDescription (+6 more)

### Community 22 - "jalali.ts"
Cohesion: 0.12
Nodes (28): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+20 more)

### Community 23 - "requireAdminPermission"
Cohesion: 0.13
Nodes (29): submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction() (+21 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (6): AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata, BlogPostEditor(), ErrorState()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next, next-themes (+19 more)

### Community 29 - "content-form-panels.tsx"
Cohesion: 0.06
Nodes (51): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+43 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.13
Nodes (24): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, countdownTickMs(), formatCountdown() (+16 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "ingest/route.ts"
Cohesion: 0.16
Nodes (20): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), AgentConfig (+12 more)

### Community 33 - "utils.ts"
Cohesion: 0.09
Nodes (37): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamsSection(), CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS (+29 more)

### Community 34 - "refresh.ts"
Cohesion: 0.18
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

### Community 35 - "fx-rate/route.ts"
Cohesion: 0.19
Nodes (16): dynamic, GET(), maxDuration, POST(), wrongDataSource(), dynamic, GET(), supabaseFxStore() (+8 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.21
Nodes (9): BlogShell(), NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle() (+1 more)

### Community 37 - "action-guards.ts"
Cohesion: 0.20
Nodes (10): AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireContentScope(), requireSuperAdminAction(), getAuthUser, getProfileById (+2 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.10
Nodes (32): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage() (+24 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.16
Nodes (18): updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url(), verifyLocalSessionToken() (+10 more)

### Community 41 - "arvan.ts"
Cohesion: 0.20
Nodes (19): ACCEPTED_IMAGE_TYPES, AiError, apiKey(), asString(), baseUrl(), chatJSON(), ChatResult, decodeImagePayload() (+11 more)

### Community 42 - "markdown.ts"
Cohesion: 0.15
Nodes (15): absolute(), dynamic, GET(), xmlEscape(), BlogToc(), countWords(), createBlogRenderer(), estimateReadingMinutes() (+7 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (29): updateSubscriptionPlanAction(), updateSubscriptionTierAction(), toggle(), onSubmit(), bannerSchema, BannerValues, BillingSettingsValues, ContentVocabularyValues (+21 more)

### Community 44 - "user-row-actions.tsx"
Cohesion: 0.16
Nodes (23): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), AssignLanguagesDialog(), handleSave() (+15 more)

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
Cohesion: 0.09
Nodes (24): BlogPostInput, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, blogImageUrl() (+16 more)

### Community 49 - "blog.ts"
Cohesion: 0.14
Nodes (14): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, resolveUploadError(), saveBlogPostAction() (+6 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "landing/pricing.ts"
Cohesion: 0.16
Nodes (22): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+14 more)

### Community 52 - "cn"
Cohesion: 0.22
Nodes (18): STATUS_STYLES, SubscriptionsTable(), DeleteConfirmDialog(), LaparliLogo(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable(), Separator (+10 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "getDataRepository"
Cohesion: 0.20
Nodes (15): cancelSubscriptionAction(), startCheckoutAction(), saveGrammarReadingProgress(), grantSubscriptionAction(), setLandingLanguageVisibilityAction(), createStructuredQuiz(), revalidateQuizPaths(), handlePay() (+7 more)

### Community 55 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, agent:topics, build, dev, lint, messages:export (+5 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "billing-settings-form.tsx"
Cohesion: 0.20
Nodes (11): OPTION_KEYS, JalaliParts, RadioGroup, RadioGroupItem, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton (+3 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.33
Nodes (8): VideoCard(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.17
Nodes (17): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), BillingSettingsForm(), PaymentsLedger(), handleExport(), toCsv() (+9 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.22
Nodes (8): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps

### Community 63 - "quiz-form.tsx"
Cohesion: 0.21
Nodes (19): LessonPicker(), Values, OPTION_LABELS, QuestionFeedback, FormControl, FormDescription, FormField(), FormFieldContext (+11 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "isLocalDataMode"
Cohesion: 0.09
Nodes (27): completeProfile(), describeVerifyFailure(), destinationFor(), verifyPhoneCode(), welcomeHref(), GET(), generateMetadata(), LoginPage() (+19 more)

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

### Community 83 - "permissions/roles.ts"
Cohesion: 0.08
Nodes (39): updateRolePermissionsAction(), useRolePermissionOverrides(), Mark(), RolePermissionEditor(), handleSave(), RolesPermissionsPanel(), TIER_COLUMNS, TierReference (+31 more)

### Community 84 - "useTranslations"
Cohesion: 0.07
Nodes (26): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), LessonsMonitor(), GrammarManager(), GrammarTable(), LessonForm(), LessonsTable() (+18 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (19): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+11 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "actions/auth.ts"
Cohesion: 0.18
Nodes (16): ActionResult, decideAndSend(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode(), RequestCodeInput, RequestCodeResult (+8 more)

### Community 90 - "PhoneAuthForm"
Cohesion: 0.33
Nodes (7): OtpInput(), absorb(), focusBox(), PhoneAuthForm(), fail(), submitPhone(), foldDigits()

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "phone-auth-form.tsx"
Cohesion: 0.11
Nodes (29): getAuthChallenge(), localFormat(), ltr(), useSolvedChallenge(), CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge() (+21 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.13
Nodes (19): AdminLandingPage(), metadata, FLAG_CODE, generateMetadata(), Home(), LandingLanguagePanel(), toggle(), Landing() (+11 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (19): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage(), ContentCoverageInput (+11 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog-post-list.tsx"
Cohesion: 0.20
Nodes (13): BlogPostList(), remove(), Pagination(), BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate() (+5 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.12
Nodes (24): createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), ExistingContentList(), REMOVE, ContentCategorySlug, GRAMMAR_PAGES_PER_REQUEST (+16 more)

### Community 126 - "locale-provider.tsx"
Cohesion: 0.15
Nodes (15): GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, LessonDetailTabs(), LessonView(), LessonViewProps, QuizTabContent(), VocabularyFlashcards() (+7 more)

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
Cohesion: 0.33
Nodes (14): BlogPostPage(), generateMetadata(), Props, resolveBlogLanguages(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep (+6 more)

### Community 146 - "enforceLanguageScope"
Cohesion: 0.17
Nodes (15): createContentVideo(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), createVocabulary() (+7 more)

### Community 149 - "lesson/[id]/page.tsx"
Cohesion: 0.19
Nodes (17): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), generateMetadata(), LessonPage(), PageProps, submit() (+9 more)

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (36): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+28 more)

### Community 151 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 152 - "local/repository.ts"
Cohesion: 0.25
Nodes (13): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), BANNER_UPLOAD_DIR, BLOG_UPLOAD_DIR (+5 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "my-subscriptions-card.tsx"
Cohesion: 0.12
Nodes (17): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining() (+9 more)

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
Cohesion: 0.15
Nodes (12): Alternatives that were priced but not adopted, Blog agent — handoff, Costs, measured, Environment, Files, Infrastructure facts, Open, Owner's stated preferences (+4 more)

### Community 173 - "[category]/page.tsx"
Cohesion: 0.09
Nodes (30): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+22 more)

### Community 174 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 175 - "llms.txt/route.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 176 - "learn-category-view.tsx"
Cohesion: 0.20
Nodes (5): LearnCategoryView(), VideoLessonsGrid(), VideoPoster(), LocalizedText, VideoLesson

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "user-management-panel.tsx"
Cohesion: 0.18
Nodes (13): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AccountTierCell(), AccountTierCellData, RoleBadge(), StatusBadge(), getInitials() (+5 more)

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "dashboard-data.ts"
Cohesion: 0.27
Nodes (7): useRolePermissions(), ManagedUser, UserProfileDialog(), AdminDashboardData, PERMISSION_LABEL_KEYS, ROLE_DEFINITIONS, UserStatus

### Community 188 - "reconcile.ts"
Cohesion: 0.27
Nodes (6): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "schedule.ts"
Cohesion: 0.40
Nodes (4): dailySlots(), PUBLISH_HOUR_TEHRAN, PUBLISH_MINUTE_TEHRAN, tehranTimeToInstant()

### Community 194 - "brand-logo.tsx"
Cohesion: 0.33
Nodes (4): AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark()

### Community 195 - "getLocaleDefinition"
Cohesion: 0.31
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), localizeDigits()

### Community 196 - "create-content-section.tsx"
Cohesion: 0.31
Nodes (6): AdminQuizzesPageView(), CONTENT_TYPES, CreateContentSection(), findLessonForLevel(), stepForJump(), ContentWizardTarget

### Community 198 - "decks.ts"
Cohesion: 0.33
Nodes (5): COURSE_ORDER, DECKS, en, fa, it

## Knowledge Gaps
- **624 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+619 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `admin/page.tsx`, `postgres/client.ts`, `app-shell.tsx`, `pipeline.ts`, `category/[slug]/page.tsx`, `curriculum/types.ts`, `blog/[slug]/page.tsx`, `subscription-view.tsx`, `enforceLanguageScope`, `lesson/[id]/page.tsx`, `[quiz_id]/page.tsx`, `requireAdminPermission`, `local/repository.ts`, `blog/languages.ts`, `blog/[id]/page.tsx`, `ingest/route.ts`, `fx-rate/route.ts`, `action-guards.ts`, `getServerTranslator`, `markdown.ts`, `admin.ts`, `user-row-actions.tsx`, `[category]/page.tsx`, `data-source.ts`, `llms.txt/route.ts`, `blog.ts`, `isLocalDataMode`, `permissions/roles.ts`, `actions/auth.ts`, `app/page.tsx`, `blog-post-list.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `Lesson`, `edit-curriculum-level-dialog.tsx`, `blog-post-editor.tsx`, `curriculum/types.ts`, `card.tsx`, `subscription-view.tsx`, `button.tsx`, `[quiz_id]/page.tsx`, `requireAdminPermission`, `jalali.ts`, `my-subscriptions-card.tsx`, `content-form-panels.tsx`, `server-locale.ts`, `utils.ts`, `getServerTranslator`, `user-row-actions.tsx`, `[category]/page.tsx`, `learn-category-view.tsx`, `user-management-panel.tsx`, `cn`, `BannerUploadForm`, `billing-settings-form.tsx`, `dashboard-data.ts`, `video-embed.ts`, `admin-accounting-page-view.tsx`, `quiz-form.tsx`, `isLocalDataMode`, `brand-logo.tsx`, `create-content-section.tsx`, `permissions/roles.ts`, `PhoneAuthForm`, `phone-auth-form.tsx`, `lessons-monitor.tsx`, `actions/content.ts`, `locale-provider.tsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `edit-curriculum-level-dialog.tsx`, `blog-post-editor.tsx`, `category/[slug]/page.tsx`, `card.tsx`, `subscription-view.tsx`, `button.tsx`, `[quiz_id]/page.tsx`, `my-subscriptions-card.tsx`, `server-locale.ts`, `utils.ts`, `blog-shell.tsx`, `markdown.ts`, `blog.ts`, `user-management-panel.tsx`, `BannerUploadForm`, `billing-settings-form.tsx`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `quiz-form.tsx`, `brand-logo.tsx`, `create-content-section.tsx`, `sections.tsx`, `useTranslations`, `PhoneAuthForm`, `phone-auth-form.tsx`, `lessons-monitor.tsx`, `blog-post-list.tsx`, `locale-provider.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _624 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09146341463414634 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.028601978080727078 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._