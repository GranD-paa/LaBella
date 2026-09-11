# Graph Report - cursor P  (2026-09-11)

## Corpus Check
- 485 files · ~364,589 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2489 nodes · 7066 edges · 167 communities (103 shown, 64 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `61efac57`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- learn-category-view.tsx
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- payments-ledger.tsx
- Lesson
- cn
- locale-provider.tsx
- types/index.ts
- getLocaleDefinition
- curriculum/types.ts
- local/repository.ts
- button.tsx
- blog-image.ts
- 001_app_schema.sql
- action-guards.ts
- entitlements/schema.test.ts
- providers/index.ts
- robots-metadata.test.ts
- isLocalDataMode
- jalali.ts
- data/repository.ts
- schema.sql
- compilerOptions
- devDependencies
- dependencies
- i18n/types.ts
- components.json
- CreateContentSection
- level-category-grid.tsx
- period.ts
- utils.ts
- blog-shell.tsx
- curriculum-levels.ts
- getDataRepository
- page-skeletons.tsx
- middleware.ts
- useTranslations
- blog/[slug]/page.tsx
- admin.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- pricing.ts
- markdown.ts
- final-deployment/manifest.json
- otp-challenge.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- content-form-panels.tsx
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
- user-management-panel.tsx
- TierCapabilitiesPanel
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- PaymentSettings
- What You Must Do When Invoked
- 005_send_limits.sql
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
- next
- nodemailer
- lucide-react
- revalidateAppContent
- react-hook-form
- @radix-ui/react-avatar
- actions/quiz.ts
- [language]/page.tsx
- @radix-ui/react-tabs
- AdminDashboard
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
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
- band-exams.test.ts
- blog/languages.ts
- BannerUploadForm
- blog-share.tsx
- 009_blog_refactor.sql

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 205 edges
2. `cn()` - 187 edges
3. `getDataRepository()` - 150 edges
4. `DataRepository` - 114 edges
5. `Button` - 67 edges
6. `resolveMessage()` - 52 edges
7. `revalidateAppContent()` - 48 edges
8. `Badge()` - 41 edges
9. `Lesson` - 38 edges
10. `getServerTranslator()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `saveAlt()` --calls--> `updateBlogImageAltAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts
- `remove()` --calls--> `deleteBlogImageAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `BlogPostPage()` --indirect_call--> `blogImageIdFromUrl()`  [INFERRED]
  app/blog/[slug]/page.tsx → lib/data/blog-image.ts

## Import Cycles
- None detected.

## Communities (167 total, 64 thin omitted)

### Community 0 - "learn-category-view.tsx"
Cohesion: 0.19
Nodes (10): PageProps, LearnCategoryView(), GrammarReader(), GrammarRulesList(), GrammarRuleWithPages, CategorySlug, attachGrammarPages(), GrammarPage (+2 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.11
Nodes (29): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, blogImageUrl(), getAccountingSnapshot(), buildUpdate(), execute() (+21 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (9): BlogImage, fetchAdminDashboardData(), DataRepository, fetchQuizManagementStats(), GrammarRule, QuizQuestion, UserQuizAttempt, VideoLesson (+1 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.11
Nodes (28): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+20 more)

### Community 6 - "payments-ledger.tsx"
Cohesion: 0.26
Nodes (15): STATUS_STYLES, DeleteConfirmDialog(), GrammarTable(), LessonsTable(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable(), Table (+7 more)

### Community 7 - "Lesson"
Cohesion: 0.12
Nodes (23): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+15 more)

### Community 8 - "cn"
Cohesion: 0.13
Nodes (27): CheckRow(), Counter(), ConfirmActionDialog(), handleConfirm(), LaparliLogo(), LanguageSwitcher(), QuizCard(), AlertDialogAction (+19 more)

### Community 9 - "locale-provider.tsx"
Cohesion: 0.16
Nodes (10): AdminLayout(), AdminHeaderBadge(), AppHeader(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark(), LocaleContext (+2 more)

### Community 10 - "types/index.ts"
Cohesion: 0.10
Nodes (23): GrammarManager(), AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build() (+15 more)

### Community 11 - "getLocaleDefinition"
Cohesion: 0.33
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), isAppLocale()

### Community 12 - "curriculum/types.ts"
Cohesion: 0.11
Nodes (19): LessonViewProps, CONTENT_CATEGORIES, ContentStatus, ContentWizardContext, ContentWizardTarget, ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS (+11 more)

### Community 13 - "local/repository.ts"
Cohesion: 0.11
Nodes (33): dynamic, GET(), markFailed(), redirectToResult(), settle(), DevModeBanner(), localFormat(), findLocalUserByPhone() (+25 more)

### Community 14 - "button.tsx"
Cohesion: 0.12
Nodes (33): BannerManagementPanel(), ACCEPTED_TYPES, ACCEPTED, LANDMARK_LABELS, LANGUAGE_LABELS, LanguageManagementPanel(), CONTENT_TYPES, discountedPrice() (+25 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.10
Nodes (19): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE (+11 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "action-guards.ts"
Cohesion: 0.22
Nodes (9): cancelSubscriptionAction(), recoverMyPendingPaymentsAction(), saveGrammarReadingProgress(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser (+1 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "isLocalDataMode"
Cohesion: 0.10
Nodes (27): buildRecoveryDeps(), CheckoutResult, resolveOrigin(), startCheckoutAction(), dynamic, GET(), dynamic, GET() (+19 more)

### Community 22 - "jalali.ts"
Cohesion: 0.10
Nodes (33): DateOfBirthField(), clampDay(), JalaliParts, BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn() (+25 more)

### Community 23 - "data/repository.ts"
Cohesion: 0.07
Nodes (23): DEFAULT_SUBSCRIPTION_TIERS, BlogPostInput, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, QuizAttemptWithRelations, QuizWithLessonTitle (+15 more)

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
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.13
Nodes (23): DEFAULT_LOCALE, LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, countdownTickMs(), formatCountdown(), fa (+15 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 33 - "level-category-grid.tsx"
Cohesion: 0.12
Nodes (24): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnLevelView() (+16 more)

### Community 34 - "period.ts"
Cohesion: 0.29
Nodes (8): addBillingMonths(), BillingPeriod, computeGraceDeadline(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, resolveStatusFromDates(), SubscriptionStatus

### Community 35 - "utils.ts"
Cohesion: 0.12
Nodes (17): BandExamCard, BandExamsSection(), ComingSoonLanguage(), CourseLevelAccordion(), LearnLanguageView(), BannerCarousel(), FlagIcon(), FLAGS (+9 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.13
Nodes (10): BlogShell(), NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle() (+2 more)

### Community 37 - "curriculum-levels.ts"
Cohesion: 0.12
Nodes (25): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), AddCurriculumLevelDialog() (+17 more)

### Community 38 - "getDataRepository"
Cohesion: 0.09
Nodes (48): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage() (+40 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.11
Nodes (25): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+17 more)

### Community 41 - "useTranslations"
Cohesion: 0.06
Nodes (33): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), LessonsMonitor(), AdminLanguagesPageView(), CurriculumLevelManager() (+25 more)

### Community 42 - "blog/[slug]/page.tsx"
Cohesion: 0.21
Nodes (26): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), BlogIndexPage(), metadata, BlogPostPage() (+18 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (30): createStructuredQuiz(), revalidateQuizPaths(), bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, contentVocabularySchema, ContentVocabularyValues (+22 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.12
Nodes (23): BandExam, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel() (+15 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 49 - "blog.ts"
Cohesion: 0.12
Nodes (16): BlogFormState, BlogImageUploadState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, resolveUploadError(), revalidateBlog() (+8 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "pricing.ts"
Cohesion: 0.12
Nodes (27): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial() (+19 more)

### Community 52 - "markdown.ts"
Cohesion: 0.15
Nodes (13): saveBlogPostAction(), BlogPostEditor(), BlogToc(), countWords(), createBlogRenderer(), estimateReadingMinutes(), MarkdownContext, markdownToPlainText() (+5 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (23): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+15 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, lint, messages:export, start (+3 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.13
Nodes (21): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+13 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.16
Nodes (12): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, dynamic, robots() (+4 more)

### Community 63 - "content-form-panels.tsx"
Cohesion: 0.05
Nodes (99): BillingSettingsForm(), handleRefreshRate(), onSubmit(), ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel() (+91 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "actions/auth.ts"
Cohesion: 0.08
Nodes (40): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getAuthChallenge(), getClientIpForRateLimit(), padTiming() (+32 more)

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

### Community 83 - "user-management-panel.tsx"
Cohesion: 0.12
Nodes (21): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel() (+13 more)

### Community 84 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (19): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+11 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "PaymentSettings"
Cohesion: 0.12
Nodes (17): dynamic, GET(), supabaseFxStore(), DEFAULT_PAYMENT_SETTINGS, FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider (+9 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.13
Nodes (19): FLAG_CODE, generateMetadata(), Home(), Landing(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck (+11 more)

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
Cohesion: 0.13
Nodes (16): dynamic, Props, BlogPostList(), BlogListView(), Pagination(), BlogCardVariant, BlogPostCard(), Meta() (+8 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.10
Nodes (40): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), finishGrammarUpload(), loadLessonContent(), renderGrammarPages() (+32 more)

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

### Community 146 - "revalidateAppContent"
Cohesion: 0.10
Nodes (36): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+28 more)

### Community 150 - "actions/quiz.ts"
Cohesion: 0.07
Nodes (39): submitQuizAction(), generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit() (+31 more)

### Community 152 - "[language]/page.tsx"
Cohesion: 0.11
Nodes (22): CategoryPage(), generateMetadata(), generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage(), PageProps (+14 more)

### Community 155 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

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

### Community 176 - "blog/languages.ts"
Cohesion: 0.14
Nodes (16): absolute(), dynamic, GET(), xmlEscape(), dynamic, GET(), text(), dynamic (+8 more)

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.profiles, public.blog_posts

## Knowledge Gaps
- **554 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+549 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **64 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `learn-category-view.tsx`, `postgres/repository.ts`, `app-shell.tsx`, `local/repository.ts`, `action-guards.ts`, `revalidateAppContent`, `isLocalDataMode`, `actions/quiz.ts`, `data/repository.ts`, `[language]/page.tsx`, `curriculum-levels.ts`, `blog/[slug]/page.tsx`, `admin.ts`, `blog/languages.ts`, `blog.ts`, `markdown.ts`, `actions/auth.ts`, `PaymentSettings`, `app/page.tsx`, `blog-post-list.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `better-auth.ts`, `payments-ledger.tsx`, `locale-provider.tsx`, `button.tsx`, `actions/quiz.ts`, `CreateContentSection`, `level-category-grid.tsx`, `utils.ts`, `blog-shell.tsx`, `useTranslations`, `blog.ts`, `pricing.ts`, `markdown.ts`, `BannerUploadForm`, `admin-accounting-page-view.tsx`, `app/layout.tsx`, `content-form-panels.tsx`, `actions/auth.ts`, `sections.tsx`, `user-management-panel.tsx`, `lessons-monitor.tsx`, `blog-post-list.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `learn-category-view.tsx`, `payments-ledger.tsx`, `cn`, `locale-provider.tsx`, `types/index.ts`, `curriculum/types.ts`, `button.tsx`, `revalidateAppContent`, `actions/quiz.ts`, `jalali.ts`, `AdminDashboard`, `CreateContentSection`, `level-category-grid.tsx`, `utils.ts`, `curriculum-levels.ts`, `getDataRepository`, `middleware.ts`, `pricing.ts`, `BannerUploadForm`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `content-form-panels.tsx`, `actions/auth.ts`, `user-management-panel.tsx`, `TierCapabilitiesPanel`, `lessons-monitor.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _554 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.036853002070393374 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._