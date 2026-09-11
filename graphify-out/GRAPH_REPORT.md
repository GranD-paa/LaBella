# Graph Report - cursor P  (2026-09-11)

## Corpus Check
- 496 files · ~380,434 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2600 nodes · 7502 edges · 187 communities (121 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 60 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `35aecf72`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- grammar-rules-list.tsx
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- resolveMessage
- Lesson
- cn
- locale-provider.tsx
- types/index.ts
- category/[slug]/page.tsx
- curriculum/types.ts
- store.ts
- badge.tsx
- blog-image.ts
- 001_app_schema.sql
- local/repository.ts
- user-management-panel.tsx
- providers/index.ts
- robots-metadata.test.ts
- checkout.ts
- jalali.ts
- seed.ts
- schema.sql
- compilerOptions
- button.tsx
- devDependencies
- dependencies
- content-form-panels.tsx
- server-locale.ts
- components.json
- utils.ts
- learn-category-hero.tsx
- period.ts
- fx-rate/route.ts
- blog-shell.tsx
- action-guards.ts
- getDataRepository
- page-skeletons.tsx
- middleware.ts
- [language]/page.tsx
- blog/[slug]/page.tsx
- admin.ts
- markdown.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- pricing.ts
- add-curriculum-level-dialog.tsx
- final-deployment/manifest.json
- otp-challenge.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- quiz-form.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- useTranslations
- app/layout.tsx
- billing-settings-form.tsx
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
- my-subscriptions-card.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- refresh.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- actions/auth.ts
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
- blog-post-card.tsx
- actions/content.ts
- availability.ts
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
- requireAdminPermission
- react-hook-form
- @radix-ui/react-avatar
- lesson-view.tsx
- [quiz_id]/page.tsx
- edit-curriculum-level-dialog.tsx
- getServerTranslator
- @radix-ui/react-tabs
- AdminDashboard
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- UserQuizAttempt
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
- landing.ts
- band-exams.test.ts
- isLocalDataMode
- llms.txt/route.ts
- blog/languages.ts
- getLocaleDefinition
- entitlements/index.ts
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 212 edges
2. `cn()` - 187 edges
3. `getDataRepository()` - 156 edges
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
- `postSchema` --calls--> `getBlogLanguage()`  [EXTRACTED]
  app/admin/actions/blog.ts → lib/blog/languages.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `BlogPostPage()` --indirect_call--> `blogImageIdFromUrl()`  [INFERRED]
  app/blog/[slug]/page.tsx → lib/data/blog-image.ts

## Import Cycles
- None detected.

## Communities (187 total, 66 thin omitted)

### Community 0 - "grammar-rules-list.tsx"
Cohesion: 0.16
Nodes (7): GrammarReader(), attachGrammarPages(), GrammarPage, GrammarPageSummary, SignedGrammarPage, isObjectStorageConfigured(), GrammarRule

### Community 1 - "postgres/client.ts"
Cohesion: 0.13
Nodes (20): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool() (+12 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): BlogPost, DataRepository, getLandingPricing(), Payment, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.11
Nodes (26): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+18 more)

### Community 6 - "resolveMessage"
Cohesion: 0.08
Nodes (24): BillingSettingsForm(), handleRefreshRate(), onSubmit(), runAction(), onSubmit(), onSubmit(), EditCurriculumLevelDialog(), handleConfirm() (+16 more)

### Community 7 - "Lesson"
Cohesion: 0.17
Nodes (14): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), getDefaultLanguageContext() (+6 more)

### Community 8 - "cn"
Cohesion: 0.08
Nodes (27): AdminLayout(), CheckRow(), Counter(), LessonsMonitor(), EntitlementSettingsPanel(), PlanActiveToggle(), LaparliLogo(), AdminHeaderBadge() (+19 more)

### Community 9 - "locale-provider.tsx"
Cohesion: 0.15
Nodes (12): AboutView(), TIMELINE_KEYS, VALUE_ICONS, RoleBadge(), StatusBadge(), UserQuizAttemptsPanel(), LocaleContext, LocaleContextValue (+4 more)

### Community 10 - "types/index.ts"
Cohesion: 0.11
Nodes (25): SubscriptionViewProps, AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build() (+17 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.21
Nodes (20): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata(), Props (+12 more)

### Community 12 - "curriculum/types.ts"
Cohesion: 0.14
Nodes (18): LearnCategoryView(), ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES, CATEGORY_DEFINITIONS, LANGUAGES (+10 more)

### Community 13 - "store.ts"
Cohesion: 0.16
Nodes (19): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), LOCAL_SEED, LocalDatabase (+11 more)

### Community 14 - "badge.tsx"
Cohesion: 0.15
Nodes (23): LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), discountedPrice(), SubscriptionPlanList(), TIER_COLUMNS, LevelQuizRow (+15 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.14
Nodes (13): ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl(), ImageDimensions, isBlogImageUrl(), MAX_BLOG_IMAGE_BYTES, readImageDimensions(), readJpegDimensions() (+5 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "local/repository.ts"
Cohesion: 0.23
Nodes (14): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), BANNER_UPLOAD_DIR, BLOG_UPLOAD_DIR (+6 more)

### Community 18 - "user-management-panel.tsx"
Cohesion: 0.18
Nodes (19): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), LessonsTable(), AccountTierCell(), AccountTierCellData, getInitials(), UserManagementPanel() (+11 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.17
Nodes (15): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+7 more)

### Community 21 - "checkout.ts"
Cohesion: 0.15
Nodes (15): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), dynamic, GET(), handlePay(), getAvailableProviders() (+7 more)

### Community 22 - "jalali.ts"
Cohesion: 0.10
Nodes (33): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+25 more)

### Community 23 - "seed.ts"
Cohesion: 0.14
Nodes (15): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS (+7 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "button.tsx"
Cohesion: 0.13
Nodes (12): ACCEPTED_TYPES, ACCEPTED, LOCALES, Draft, ToggleRow(), ContactView(), ContactViewProps, ErrorState() (+4 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "content-form-panels.tsx"
Cohesion: 0.06
Nodes (43): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+35 more)

### Community 30 - "server-locale.ts"
Cohesion: 0.17
Nodes (20): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, fa, t (+12 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "utils.ts"
Cohesion: 0.13
Nodes (13): CONTENT_TYPES, CreateContentSection(), findLessonForLevel(), stepForJump(), AdminSubscriptionPageView(), BannerCarousel(), FlagIcon(), FLAGS (+5 more)

### Community 33 - "learn-category-hero.tsx"
Cohesion: 0.11
Nodes (23): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnLevelView() (+15 more)

### Community 34 - "period.ts"
Cohesion: 0.30
Nodes (9): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), isEntitled(), resolveStatusFromDates() (+1 more)

### Community 35 - "fx-rate/route.ts"
Cohesion: 0.18
Nodes (13): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, POST(), FxRateStore (+5 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.27
Nodes (8): NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 37 - "action-guards.ts"
Cohesion: 0.14
Nodes (13): RolePermissionsContext, AdminGuardResult, getRolePermissions(), GuardFail, GuardOk, requireAdminAction(), requireContentScope(), requireSuperAdminAction() (+5 more)

### Community 38 - "getDataRepository"
Cohesion: 0.07
Nodes (48): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), cancelSubscriptionAction(), saveGrammarReadingProgress(), AdminAccountingPage(), generateMetadata(), AdminBannersPage() (+40 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (24): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+16 more)

### Community 41 - "[language]/page.tsx"
Cohesion: 0.25
Nodes (8): PageProps, BandExamCard, BandExamsSection(), ComingSoonLanguage(), CourseLevelAccordion(), LearnLanguageView(), CURRICULUM_MESSAGE_KEYS, LocalizedText

### Community 42 - "blog/[slug]/page.tsx"
Cohesion: 0.31
Nodes (14): BlogPostPage(), generateMetadata(), Props, extractImageUrls(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep (+6 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (27): bannerSchema, BannerValues, BillingSettingsValues, contentVocabularySchema, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues, GrammarRuleValues (+19 more)

### Community 44 - "markdown.ts"
Cohesion: 0.19
Nodes (10): BlogToc(), countWords(), createBlogRenderer(), estimateReadingMinutes(), MarkdownContext, markdownToPlainText(), RenderedPost, renderMarkdown() (+2 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.13
Nodes (20): BandExam, groupLevelExamsByBand(), EnrichedQuiz, deriveQuizMetadataFromLesson(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults() (+12 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.07
Nodes (28): BlogImage, BlogPostInput, BlogPostStatus, CurriculumLevelOverrideRow, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES (+20 more)

### Community 49 - "blog.ts"
Cohesion: 0.11
Nodes (19): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, postSchema, resolveUploadError() (+11 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "pricing.ts"
Cohesion: 0.11
Nodes (27): SubscriptionPlanCards(), pricingFor(), rialFor(), formatPaidAmount(), formatRialAsToman(), LOCALE_TAGS, BillingCurrency, centsToEur() (+19 more)

### Community 52 - "add-curriculum-level-dialog.tsx"
Cohesion: 0.16
Nodes (20): GrantPlanOption, ManagedUser, PROVIDER_ICONS, PROVIDER_LABELS, JalaliParts, DialogContent, DialogDescription, DialogFooter() (+12 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (22): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+14 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, lint, messages:export, start (+3 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "quiz-form.tsx"
Cohesion: 0.31
Nodes (6): OPTION_KEYS, OPTION_LABELS, QuestionFeedback, RadioGroup, RadioGroupItem, useReducedMotion()

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "useTranslations"
Cohesion: 0.08
Nodes (36): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+28 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.22
Nodes (8): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps

### Community 63 - "billing-settings-form.tsx"
Cohesion: 0.20
Nodes (23): GrammarEditDialog(), GrammarForm(), LessonPicker(), VocabularyEditDialog(), Values, FormControl, FormDescription, FormField() (+15 more)

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
Nodes (35): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+27 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.06
Nodes (57): updateRolePermissionsAction(), countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), ChangeRoleDialog() (+49 more)

### Community 84 - "my-subscriptions-card.tsx"
Cohesion: 0.12
Nodes (17): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining() (+9 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "refresh.ts"
Cohesion: 0.17
Nodes (9): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+1 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "actions/auth.ts"
Cohesion: 0.10
Nodes (34): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getAuthChallenge(), getClientIpForRateLimit(), padTiming() (+26 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.15
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, DECKS, en (+10 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.08
Nodes (32): AdminQuizzesPage(), PageProps, resolveRequestedSlot(), LevelRow(), LessonsMonitorPageView(), SLOT_META, SlotSquare(), STATE_KEY (+24 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog-post-card.tsx"
Cohesion: 0.19
Nodes (13): absolute(), dynamic, GET(), xmlEscape(), BlogPostList(), Pagination(), BlogCardVariant, BlogPostCard() (+5 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.10
Nodes (39): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), finishGrammarUpload(), loadLessonContent(), renderGrammarPages() (+31 more)

### Community 126 - "availability.ts"
Cohesion: 0.12
Nodes (15): DashboardPage(), generateMetadata(), MenuPage(), generateMetadata(), SubscriptionPage(), getLanguagesWithAvailability(), getCurriculumLevelsForLanguage(), mergeLevelOverrides() (+7 more)

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

### Community 146 - "requireAdminPermission"
Cohesion: 0.12
Nodes (38): submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction() (+30 more)

### Community 149 - "lesson-view.tsx"
Cohesion: 0.23
Nodes (10): generateMetadata(), LessonPage(), PageProps, GrammarRuleWithPages, LessonView(), LessonViewProps, findLevelByOrderNumber(), findLevelInLanguages() (+2 more)

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (34): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+26 more)

### Community 151 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.45
Nodes (9): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+1 more)

### Community 152 - "getServerTranslator"
Cohesion: 0.16
Nodes (20): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+12 more)

### Community 155 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 160 - "UserQuizAttempt"
Cohesion: 0.18
Nodes (5): GradedQuizQuestion, OPTION_FIELDS, fetchQuizManagementStats(), QuizQuestion, UserQuizAttempt

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

### Community 172 - "landing.ts"
Cohesion: 0.50
Nodes (4): setLandingLanguageVisibilityAction(), LandingLanguagePanel(), toggle(), isLandingLanguageSlug()

### Community 174 - "isLocalDataMode"
Cohesion: 0.26
Nodes (9): WelcomePreviewPage(), DataSource, getDataSource(), isLocalDataMode(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule() (+1 more)

### Community 175 - "llms.txt/route.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 176 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 177 - "getLocaleDefinition"
Cohesion: 0.31
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), localizeDigits()

### Community 178 - "entitlements/index.ts"
Cohesion: 0.11
Nodes (10): ENTITLED_STATUSES, ALL_UNLOCKED, Entitlement, EntitlementGate, TIERS, AccountTier, FREE_TIER, isLiveSubscription() (+2 more)

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.profiles, public.blog_posts

## Knowledge Gaps
- **573 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+568 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `better-auth.ts`, `locale-provider.tsx`, `types/index.ts`, `category/[slug]/page.tsx`, `badge.tsx`, `user-management-panel.tsx`, `[quiz_id]/page.tsx`, `edit-curriculum-level-dialog.tsx`, `button.tsx`, `utils.ts`, `learn-category-hero.tsx`, `blog-shell.tsx`, `[language]/page.tsx`, `markdown.ts`, `blog.ts`, `pricing.ts`, `add-curriculum-level-dialog.tsx`, `BannerUploadForm`, `quiz-form.tsx`, `useTranslations`, `app/layout.tsx`, `billing-settings-form.tsx`, `sections.tsx`, `my-subscriptions-card.tsx`, `actions/auth.ts`, `lessons-monitor.tsx`, `blog-post-card.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `app-shell.tsx`, `category/[slug]/page.tsx`, `local/repository.ts`, `requireAdminPermission`, `checkout.ts`, `lesson-view.tsx`, `[quiz_id]/page.tsx`, `getServerTranslator`, `fx-rate/route.ts`, `action-guards.ts`, `[language]/page.tsx`, `blog/[slug]/page.tsx`, `landing.ts`, `isLocalDataMode`, `llms.txt/route.ts`, `blog/languages.ts`, `blog.ts`, `phone-accounts.ts`, `permissions/roles.ts`, `actions/auth.ts`, `app/page.tsx`, `lessons-monitor.tsx`, `blog-post-card.tsx`, `actions/content.ts`, `availability.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `grammar-rules-list.tsx`, `resolveMessage`, `cn`, `locale-provider.tsx`, `types/index.ts`, `curriculum/types.ts`, `badge.tsx`, `user-management-panel.tsx`, `requireAdminPermission`, `lesson-view.tsx`, `[quiz_id]/page.tsx`, `edit-curriculum-level-dialog.tsx`, `jalali.ts`, `button.tsx`, `AdminDashboard`, `content-form-panels.tsx`, `utils.ts`, `learn-category-hero.tsx`, `middleware.ts`, `[language]/page.tsx`, `pricing.ts`, `add-curriculum-level-dialog.tsx`, `BannerUploadForm`, `quiz-form.tsx`, `video-lessons-grid.tsx`, `billing-settings-form.tsx`, `sections.tsx`, `permissions/roles.ts`, `my-subscriptions-card.tsx`, `actions/auth.ts`, `lessons-monitor.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _573 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.035897435897435895 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._