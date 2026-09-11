# Graph Report - cursor P  (2026-09-11)

## Corpus Check
- 484 files · ~363,302 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2483 nodes · 7062 edges · 187 communities (124 shown, 63 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 57 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `60688f1b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useTranslations
- postgres/client.ts
- DataRepository
- fa.ts
- user-row-actions.tsx
- better-auth.ts
- language/[slug]/page.tsx
- dashboard-data.ts
- cn
- getDataRepository
- billing/accounting.ts
- isLocalDataMode
- curriculum/languages.ts
- store.ts
- user-management-panel.tsx
- blog-image-library.tsx
- 001_app_schema.sql
- action-guards.ts
- content-form-panels.tsx
- providers/index.ts
- getLocaleDefinition
- local/repository.ts
- jalali.ts
- data/repository.ts
- schema.sql
- compilerOptions
- supabase/repository.ts
- devDependencies
- dependencies
- QuizQuestion
- server-locale.ts
- components.json
- validations/auth.ts
- button.tsx
- period.ts
- seed.ts
- blog/error.tsx
- admin-schemas.ts
- createPageMetadata
- page-skeletons.tsx
- middleware.ts
- my-subscriptions-card.tsx
- blog/[slug]/page.tsx
- admin.ts
- revalidateAppContent
- helpers.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- postgres/repository.ts
- requireSuperAdminAction
- لندینگ‌پیج و بلاگ — سند تحویل
- money.ts
- markdown.ts
- final-deployment/manifest.json
- phone-auth-form.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- phone-accounts.ts
- video-embed.ts
- sync-local-content.mjs
- types/index.ts
- app/layout.tsx
- edit-curriculum-level-dialog.tsx
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
- utils.ts
- entitlement-settings-panel.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- refresh.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- billing-settings-form.tsx
- app/page.tsx
- content-coverage.ts
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
- getServerTranslator
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
- curriculum-levels.ts
- react-hook-form
- @radix-ui/react-avatar
- banner-upload-form.tsx
- quiz-form.tsx
- resolveMessage
- entitlements/index.ts
- @radix-ui/react-tabs
- AdminDashboard
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- requireAdmin
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
- sms.ts
- band-exams.test.ts
- validations/quiz.ts
- storage/index.ts
- blog/languages.ts
- sha256.ts
- quiz-management/types.ts
- llms.txt/route.ts
- blog-shell.tsx
- level-overrides.ts
- blog-share.tsx
- decks.ts
- 009_blog_refactor.sql
- VideoLesson
- blog-images/[id]/route.ts

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
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/accounting/page.tsx → lib/i18n/metadata.ts
- `BlogPostEditor()` --indirect_call--> `saveBlogPostAction()`  [INFERRED]
  components/admin/blog/blog-post-editor.tsx → app/admin/actions/blog.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (187 total, 63 thin omitted)

### Community 0 - "useTranslations"
Cohesion: 0.07
Nodes (43): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), LevelRow(), LessonsMonitorPageView(), GrammarTable(), AdminLanguagesPageView() (+35 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.16
Nodes (18): dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool (+10 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (4): BlogImage, BlogPost, DataRepository, GrammarRule

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "user-row-actions.tsx"
Cohesion: 0.06
Nodes (25): signOutAction(), AdminLayout(), ManagedUser, PendingActionType, UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft() (+17 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.17
Nodes (14): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+6 more)

### Community 6 - "language/[slug]/page.tsx"
Cohesion: 0.20
Nodes (20): postSchema, BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), generateMetadata(), Props (+12 more)

### Community 7 - "dashboard-data.ts"
Cohesion: 0.10
Nodes (22): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+14 more)

### Community 8 - "cn"
Cohesion: 0.16
Nodes (21): SlotSquare(), PlanActiveToggle(), ConfirmActionDialog(), handleConfirm(), LaparliLogo(), AlertDialogAction, AlertDialogCancel, AlertDialogContent (+13 more)

### Community 9 - "getDataRepository"
Cohesion: 0.17
Nodes (21): cancelSubscriptionAction(), saveGrammarReadingProgress(), createGrammarRule(), updateGrammarRule(), setLandingLanguageVisibilityAction(), createLesson(), deleteLesson(), updateLesson() (+13 more)

### Community 10 - "billing/accounting.ts"
Cohesion: 0.17
Nodes (14): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+6 more)

### Community 11 - "isLocalDataMode"
Cohesion: 0.14
Nodes (24): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+16 more)

### Community 12 - "curriculum/languages.ts"
Cohesion: 0.17
Nodes (8): ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, CATEGORY_DEFINITIONS, TURKISH_LEVELS, CategoryDefinition, advanceLearningAfterQuiz(), getNextLevelSlug()

### Community 13 - "store.ts"
Cohesion: 0.18
Nodes (18): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+10 more)

### Community 14 - "user-management-panel.tsx"
Cohesion: 0.14
Nodes (29): CheckRow(), Counter(), DeleteConfirmDialog(), handleConfirm(), LANDMARK_LABELS, LANGUAGE_LABELS, PERMISSION_ROWS, getInitials() (+21 more)

### Community 15 - "blog-image-library.tsx"
Cohesion: 0.11
Nodes (16): ACCEPTED, BlogImageLibrary(), remove(), saveAlt(), formatBytes(), ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl() (+8 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "action-guards.ts"
Cohesion: 0.12
Nodes (16): updateUserAdminStatus(), updateUserStatus(), UserRowActions(), GuardFail, GuardOk, requireAdminAction(), getAuthUser, getProfileById (+8 more)

### Community 18 - "content-form-panels.tsx"
Cohesion: 0.13
Nodes (17): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+9 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.11
Nodes (20): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+12 more)

### Community 20 - "getLocaleDefinition"
Cohesion: 0.31
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), localizeDigits()

### Community 21 - "local/repository.ts"
Cohesion: 0.15
Nodes (17): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), getAvailableProviders(), ReconcileDeps, ReconcileOutcome (+9 more)

### Community 22 - "jalali.ts"
Cohesion: 0.18
Nodes (19): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+11 more)

### Community 23 - "data/repository.ts"
Cohesion: 0.10
Nodes (11): BlogPostInput, AuthUser, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, GrammarPage, GrammarPageSummary (+3 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "supabase/repository.ts"
Cohesion: 0.18
Nodes (9): DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS, PLAN_TEMPLATES, PlanTemplate, createClient(), Database, Json (+1 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "QuizQuestion"
Cohesion: 0.24
Nodes (3): fetchAdminDashboardData(), fetchQuizManagementStats(), QuizQuestion

### Community 30 - "server-locale.ts"
Cohesion: 0.14
Nodes (23): DEFAULT_LOCALE, isAppLocale(), LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, countdownTickMs(), formatCountdown(), fa (+15 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "validations/auth.ts"
Cohesion: 0.18
Nodes (14): isValidJalaliDate(), todayJalali(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema (+6 more)

### Community 33 - "button.tsx"
Cohesion: 0.09
Nodes (43): LessonsMonitor(), SLOT_META, STATE_KEY, CONTENT_TYPES, CreateContentSection(), stepForJump(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps (+35 more)

### Community 34 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 35 - "seed.ts"
Cohesion: 0.15
Nodes (8): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LocalDatabase, quizIds, Payment, PaymentSettings

### Community 37 - "admin-schemas.ts"
Cohesion: 0.10
Nodes (23): AddCurriculumLevelDialog(), onSubmit(), EditCurriculumLevelDialog(), onSubmit(), LessonEditDialog(), onSubmit(), AddCurriculumLevelValues, ContentVocabularyValues (+15 more)

### Community 38 - "createPageMetadata"
Cohesion: 0.11
Nodes (24): generateMetadata(), AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), PageProps (+16 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.11
Nodes (25): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+17 more)

### Community 41 - "my-subscriptions-card.tsx"
Cohesion: 0.10
Nodes (25): PageProps, Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), StatCard(), UserDashboard(), BandExamCard (+17 more)

### Community 42 - "blog/[slug]/page.tsx"
Cohesion: 0.33
Nodes (14): BlogPostPage(), generateMetadata(), Props, resolveBlogLanguages(), BLOG_ID(), blogEntityJsonLd(), blogPostingJsonLd(), BreadcrumbStep (+6 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (29): updateSubscriptionTierAction(), bannerSchema, BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues (+21 more)

### Community 44 - "revalidateAppContent"
Cohesion: 0.19
Nodes (17): submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction() (+9 more)

### Community 45 - "helpers.ts"
Cohesion: 0.19
Nodes (13): BandExam, EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel() (+5 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "postgres/repository.ts"
Cohesion: 0.16
Nodes (16): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, blogImageUrl(), matchesImageSignature() (+8 more)

### Community 49 - "requireSuperAdminAction"
Cohesion: 0.15
Nodes (19): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), deleteBlogPostAction(), optionalText, optionalUrl, resolveUploadError(), revalidateBlog() (+11 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "money.ts"
Cohesion: 0.13
Nodes (20): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+12 more)

### Community 52 - "markdown.ts"
Cohesion: 0.13
Nodes (15): absolute(), dynamic, GET(), xmlEscape(), BlogPostEditor(), BlogToc(), countWords(), createBlogRenderer() (+7 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "phone-auth-form.tsx"
Cohesion: 0.15
Nodes (23): getAuthChallenge(), localFormat(), ltr(), PhoneAuthForm(), fail(), submitPhone(), useSolvedChallenge(), CHALLENGE_DIFFICULTY (+15 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, lint, messages:export, start (+3 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "phone-accounts.ts"
Cohesion: 0.16
Nodes (12): GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), WelcomePage(), ProfileDetails, ProfileState (+4 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "types/index.ts"
Cohesion: 0.10
Nodes (30): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv() (+22 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 63 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.22
Nodes (25): LessonPicker(), LOCALES, Values, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter() (+17 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "actions/auth.ts"
Cohesion: 0.18
Nodes (18): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getClientIpForRateLimit(), padTiming(), refusalKey() (+10 more)

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

### Community 83 - "utils.ts"
Cohesion: 0.12
Nodes (15): AdminBannersPageView(), BannerManagementPanel(), RoleBadge(), StatusBadge(), PERMISSION_ROWS, UserQuizAttemptsPanel(), BannerCarousel(), LanguageCard() (+7 more)

### Community 84 - "entitlement-settings-panel.tsx"
Cohesion: 0.15
Nodes (12): AdminSubscriptionPageView(), EntitlementSettingsPanel(), discountedPrice(), SubscriptionPlanList(), Draft, draftFrom(), TierCapabilitiesPanel(), save() (+4 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (19): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+11 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "refresh.ts"
Cohesion: 0.16
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "billing-settings-form.tsx"
Cohesion: 0.19
Nodes (12): OPTION_KEYS, JalaliParts, RadioGroup, RadioGroupItem, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton (+4 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.12
Nodes (23): FLAG_CODE, generateMetadata(), Home(), getLanguageCode(), getLanguagesMissingCodes(), LANGUAGE_CODES, LANGUAGES, getServerLocale() (+15 more)

### Community 95 - "content-coverage.ts"
Cohesion: 0.14
Nodes (15): add(), BandCoverage, buildContentCoverage(), ContentCoverageInput, COVERAGE_SLOTS, CoverageSlot, CoverageState, emptyTally() (+7 more)

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
Nodes (24): createContentVideo(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), deleteGrammarRule(), ExistingContentList(), REMOVE (+16 more)

### Community 126 - "getServerTranslator"
Cohesion: 0.18
Nodes (18): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), generateMetadata() (+10 more)

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

### Community 146 - "curriculum-levels.ts"
Cohesion: 0.29
Nodes (12): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+4 more)

### Community 149 - "banner-upload-form.tsx"
Cohesion: 0.24
Nodes (9): ACCEPTED_TYPES, BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset(), ContactViewProps, Label (+1 more)

### Community 150 - "quiz-form.tsx"
Cohesion: 0.11
Nodes (25): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), OPTION_LABELS, QuestionFeedback, QuizForm(), lockAnswer() (+17 more)

### Community 151 - "resolveMessage"
Cohesion: 0.09
Nodes (23): BillingSettingsForm(), handleRefreshRate(), onSubmit(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), GrammarManager() (+15 more)

### Community 152 - "entitlements/index.ts"
Cohesion: 0.20
Nodes (9): LanguageCoursePage(), groupLevelExamsByBand(), ALL_UNLOCKED, cefrBandOf(), Entitlement, EntitlementGate, isFreeBand(), resolveEntitlement() (+1 more)

### Community 155 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 160 - "requireAdmin"
Cohesion: 0.10
Nodes (21): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata (+13 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 163 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LandingHero(), LOCALES, BRAND_MARK, BrandMark, en, fa, it (+2 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "sms.ts"
Cohesion: 0.29
Nodes (12): assertConsoleAccepted(), assertRestAccepted(), credentials(), isSmsConfigured(), panelUsername(), post(), resolveMode(), RestResult (+4 more)

### Community 174 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 175 - "storage/index.ts"
Cohesion: 0.36
Nodes (12): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), deleteObject(), deleteObjects(), getBucket() (+4 more)

### Community 176 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 177 - "sha256.ts"
Cohesion: 0.24
Nodes (8): encoder, h, INITIAL, K, rotr(), sha256(), sha256Hex(), w

### Community 178 - "quiz-management/types.ts"
Cohesion: 0.24
Nodes (9): ExtendedQuiz, ExtendedQuizQuestion, normalizeAnswer(), QuestionType, QUIZ_SECTIONS, QuizMetadata, QuizStatus, scoreWrittenAnswer() (+1 more)

### Community 179 - "llms.txt/route.ts"
Cohesion: 0.31
Nodes (7): generateMetadata(), dynamic, GET(), text(), dynamic, robots(), isSiteIndexable()

### Community 180 - "blog-shell.tsx"
Cohesion: 0.27
Nodes (8): NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor()

### Community 181 - "level-overrides.ts"
Cohesion: 0.29
Nodes (7): getLanguage(), CurriculumLevelOverrideRow, getBandFromCode(), getCurriculumLevelsForLanguage(), groupLevelsByBand(), mergeLevelOverrides(), CefrBand

### Community 183 - "decks.ts"
Cohesion: 0.29
Nodes (6): COURSE_ORDER, CourseDeck, DECKS, en, fa, it

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.profiles, public.blog_posts

## Knowledge Gaps
- **551 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+546 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **63 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `user-row-actions.tsx`, `language/[slug]/page.tsx`, `isLocalDataMode`, `action-guards.ts`, `curriculum-levels.ts`, `local/repository.ts`, `quiz-form.tsx`, `entitlements/index.ts`, `requireAdmin`, `createPageMetadata`, `my-subscriptions-card.tsx`, `blog/[slug]/page.tsx`, `admin.ts`, `revalidateAppContent`, `storage/index.ts`, `blog/languages.ts`, `requireSuperAdminAction`, `llms.txt/route.ts`, `markdown.ts`, `phone-accounts.ts`, `actions/auth.ts`, `app/page.tsx`, `actions/content.ts`, `getServerTranslator`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `useTranslations`, `user-row-actions.tsx`, `better-auth.ts`, `language/[slug]/page.tsx`, `user-management-panel.tsx`, `blog-image-library.tsx`, `banner-upload-form.tsx`, `quiz-form.tsx`, `button.tsx`, `my-subscriptions-card.tsx`, `blog-shell.tsx`, `markdown.ts`, `phone-auth-form.tsx`, `types/index.ts`, `app/layout.tsx`, `edit-curriculum-level-dialog.tsx`, `sections.tsx`, `utils.ts`, `entitlement-settings-panel.tsx`, `billing-settings-form.tsx`, `blog/types.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `user-row-actions.tsx`, `cn`, `user-management-panel.tsx`, `action-guards.ts`, `content-form-panels.tsx`, `banner-upload-form.tsx`, `quiz-form.tsx`, `resolveMessage`, `jalali.ts`, `AdminDashboard`, `button.tsx`, `admin-schemas.ts`, `createPageMetadata`, `middleware.ts`, `my-subscriptions-card.tsx`, `revalidateAppContent`, `phone-auth-form.tsx`, `types/index.ts`, `edit-curriculum-level-dialog.tsx`, `sections.tsx`, `utils.ts`, `entitlement-settings-panel.tsx`, `billing-settings-form.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _551 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useTranslations` be split into smaller, more focused modules?**
  _Cohesion score 0.06547619047619048 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03648863035430989 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._