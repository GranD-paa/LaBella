# Graph Report - cursor P  (2026-09-11)

## Corpus Check
- 496 files · ~381,216 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2603 nodes · 7502 edges · 191 communities (126 shown, 65 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a585af85`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- admin/page.tsx
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- banner-list.tsx
- Lesson
- cn
- user-quiz-attempts-panel.tsx
- billing/accounting.ts
- category/[slug]/page.tsx
- curriculum-levels.ts
- store.ts
- user-management-panel.tsx
- blog-image.ts
- 001_app_schema.sql
- local/repository.ts
- create-content-section.tsx
- providers/index.ts
- robots-metadata.test.ts
- reconcile.ts
- jalali.ts
- seed.ts
- schema.sql
- compilerOptions
- blog/[id]/page.tsx
- devDependencies
- dependencies
- content-form-panels.tsx
- i18n/types.ts
- components.json
- CurriculumLanguage
- dashboard-welcome-header.tsx
- learn-category-view.tsx
- isLocalDataMode
- blog-shell.tsx
- action-guards.ts
- data/index.ts
- page-skeletons.tsx
- middleware.ts
- validations/quiz.ts
- blog/[slug]/page.tsx
- admin.ts
- brand-logo.tsx
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- pricing.ts
- grant-subscription-dialog.tsx
- final-deployment/manifest.json
- otp-challenge.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- existing-content-list.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- locale-provider.tsx
- button.tsx
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
- react
- react-dom
- PaymentSettings
- What You Must Do When Invoked
- 005_send_limits.sql
- actions/auth.ts
- app/page.tsx
- curriculum/types.ts
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
- dashboard-data.ts
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
- getDataRepository
- react-hook-form
- @radix-ui/react-avatar
- availability.ts
- attempt-payload.ts
- edit-curriculum-level-dialog.tsx
- curriculum/languages.ts
- @radix-ui/react-tabs
- AdminDashboard
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- grading.ts
- Search engine visibility
- 008_phone_auth.sql
- LanguageSlug
- sms-test.mjs
- @radix-ui/react-label
- @radix-ui/react-slot
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- action-result.ts
- band-exams.test.ts
- data-source.ts
- rss.xml/route.ts
- blog/languages.ts
- run-migration.mjs
- types/index.ts
- 010_roles_rebuild.sql
- public.lessons
- BannerUploadForm
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- [quiz_id]/page.tsx
- BlogImageLibrary
- landing/page.tsx
- admin/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 213 edges
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
- `remove()` --calls--> `deleteBlogImageAction()`  [EXTRACTED]
  components/admin/blog/blog-image-library.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/languages/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (191 total, 65 thin omitted)

### Community 0 - "admin/page.tsx"
Cohesion: 0.25
Nodes (13): AdminPage(), DashboardPage(), generateMetadata(), TierReference, getRolePermissions(), ADMIN_NAV, adminLandingPath(), AdminNavItem (+5 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.13
Nodes (20): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool() (+12 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (5): BlogImage, DataRepository, GrammarRule, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.13
Nodes (3): AppHeader(), AppHeaderLeft(), AppShell()

### Community 5 - "better-auth.ts"
Cohesion: 0.11
Nodes (26): { GET, POST }, OtpInput(), absorb(), focusBox(), assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS (+18 more)

### Community 6 - "banner-list.tsx"
Cohesion: 0.46
Nodes (6): deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), BannerList(), runAction(), bannerSchema

### Community 7 - "Lesson"
Cohesion: 0.15
Nodes (17): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+9 more)

### Community 8 - "cn"
Cohesion: 0.11
Nodes (26): RootLayout(), SlotSquare(), Pagination(), NavChip(), StatCard(), JalaliParts, DialogOverlay, DropdownMenuCheckboxItem (+18 more)

### Community 9 - "user-quiz-attempts-panel.tsx"
Cohesion: 0.52
Nodes (5): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), UserQuizAttemptsPanel(), parseAttemptBreakdown(), requireAdmin()

### Community 10 - "billing/accounting.ts"
Cohesion: 0.16
Nodes (16): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+8 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.26
Nodes (17): BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata(), Props (+9 more)

### Community 12 - "curriculum-levels.ts"
Cohesion: 0.21
Nodes (17): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), handleConfirm(), isLanguageSlug() (+9 more)

### Community 13 - "store.ts"
Cohesion: 0.16
Nodes (19): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), LOCAL_SEED, LocalDatabase (+11 more)

### Community 14 - "user-management-panel.tsx"
Cohesion: 0.10
Nodes (44): STATUS_STYLES, DeleteConfirmDialog(), LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), discountedPrice(), SubscriptionPlanList() (+36 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.14
Nodes (13): ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl(), ImageDimensions, isBlogImageUrl(), MAX_BLOG_IMAGE_BYTES, readImageDimensions(), readJpegDimensions() (+5 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "local/repository.ts"
Cohesion: 0.14
Nodes (23): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), addBillingMonths(), BillingPeriod (+15 more)

### Community 18 - "create-content-section.tsx"
Cohesion: 0.19
Nodes (8): ContentFormPanel(), LessonForm(), onSubmit(), LessonsTable(), CONTENT_TYPES, CreateContentSection(), findLessonForLevel(), stepForJump()

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 21 - "reconcile.ts"
Cohesion: 0.27
Nodes (6): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 22 - "jalali.ts"
Cohesion: 0.10
Nodes (33): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+25 more)

### Community 23 - "seed.ts"
Cohesion: 0.10
Nodes (16): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+8 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "blog/[id]/page.tsx"
Cohesion: 0.17
Nodes (5): AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata, ErrorState()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "content-form-panels.tsx"
Cohesion: 0.04
Nodes (62): BillingSettingsForm(), handleRefreshRate(), onSubmit(), ContentActionBar(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry (+54 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.17
Nodes (15): localizeDigits(), fa, t, messages, createTranslator(), getNestedValue(), interpolate(), AppLocale (+7 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "CurriculumLanguage"
Cohesion: 0.17
Nodes (16): BandExamCard, BandExamsSection(), ComingSoonLanguage(), CourseLevelAccordion(), LearnLanguageView(), FlagIcon(), FLAGS, US_STARS (+8 more)

### Community 33 - "dashboard-welcome-header.tsx"
Cohesion: 0.14
Nodes (19): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), LearnLevelView(), LearnLevelViewProps, LevelCategoryGrid(), GrammarRuleWithPages, LessonDetailTabs() (+11 more)

### Community 34 - "learn-category-view.tsx"
Cohesion: 0.18
Nodes (12): CategoryWatermark(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero(), LearnCategoryView(), LockedContentNotice(), VocabularyFlashcards(), CATEGORY_ICON_BG (+4 more)

### Community 35 - "isLocalDataMode"
Cohesion: 0.16
Nodes (20): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), dynamic, GET(), supabaseFxStore(), dynamic (+12 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.25
Nodes (8): BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle(), syncBrowserThemeColor(), LaparliLogo()

### Community 37 - "action-guards.ts"
Cohesion: 0.17
Nodes (13): cancelSubscriptionAction(), saveGrammarReadingProgress(), AdminGuardResult, GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), requireContentScope() (+5 more)

### Community 38 - "data/index.ts"
Cohesion: 0.10
Nodes (27): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), generateMetadata(), AdminSubscriptionPage(), generateMetadata() (+19 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.14
Nodes (6): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton(), Skeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.12
Nodes (24): CompleteProfileForm(), onSubmit(), updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession() (+16 more)

### Community 41 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 42 - "blog/[slug]/page.tsx"
Cohesion: 0.15
Nodes (23): BlogPostPage(), generateMetadata(), Props, BlogToc(), countWords(), createBlogRenderer(), extractImageUrls(), MarkdownContext (+15 more)

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (32): BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues, grammarRuleSchema, GrammarRuleValues (+24 more)

### Community 44 - "brand-logo.tsx"
Cohesion: 0.31
Nodes (4): AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark()

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.12
Nodes (26): BandExam, groupLevelExamsByBand(), cefrBandOf(), isFreeBand(), EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz() (+18 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.08
Nodes (28): GrammarReader(), GrammarRulesList(), BlogPostInput, CurriculumLevelOverrideRow, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES (+20 more)

### Community 49 - "blog.ts"
Cohesion: 0.16
Nodes (15): BlogFormState, BlogImageUploadState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, resolveUploadError(), revalidateBlog() (+7 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "pricing.ts"
Cohesion: 0.08
Nodes (32): RevenueChart(), SubscriptionPlanCards(), pricingFor(), rialFor(), formatMonthLabel(), formatPaidAmount(), formatRialAsToman(), LOCALE_TAGS (+24 more)

### Community 52 - "grant-subscription-dialog.tsx"
Cohesion: 0.24
Nodes (13): useRolePermissions(), ManagedUser, UserProfileDialog(), PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter() (+5 more)

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

### Community 58 - "existing-content-list.tsx"
Cohesion: 0.36
Nodes (6): loadLessonContent(), ExistingContentList(), REMOVE, emptyLessonContent(), LessonContent, LessonContentItem

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.17
Nodes (15): AccountingKpis(), Tile(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), SubscriptionsTable(), QuizTabContent() (+7 more)

### Community 62 - "locale-provider.tsx"
Cohesion: 0.11
Nodes (24): instrumentSerif, inter, vazirmatn, viewport, AdminContentHeader(), Landing(), applyDocumentLocale(), LocaleContext (+16 more)

### Community 63 - "button.tsx"
Cohesion: 0.14
Nodes (35): ACCEPTED_TYPES, ACCEPTED, CheckRow(), Counter(), LessonPicker(), OPTION_KEYS, LOCALES, ToggleRow() (+27 more)

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
Cohesion: 0.06
Nodes (62): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), AssignLanguagesDialog(), handleSave() (+54 more)

### Community 84 - "useTranslations"
Cohesion: 0.07
Nodes (32): BannerManagementPanel(), GrammarForm(), onSubmit(), GrammarManager(), GrammarTable(), AdminSubscriptionPageView(), RoleBadge(), VocabularyForm() (+24 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "PaymentSettings"
Cohesion: 0.11
Nodes (12): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+4 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "actions/auth.ts"
Cohesion: 0.10
Nodes (34): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getAuthChallenge(), getClientIpForRateLimit(), padTiming() (+26 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.14
Nodes (17): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), en, fa, getLandingCopy(), it (+9 more)

### Community 95 - "curriculum/types.ts"
Cohesion: 0.09
Nodes (26): LessonsMonitor(), LevelRow(), SLOT_META, STATE_KEY, AdminQuizzesPageView(), CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus (+18 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "blog-post-list.tsx"
Cohesion: 0.24
Nodes (12): BlogPostList(), BlogCardVariant, BlogPostCard(), Meta(), postHref(), formatBlogDate(), resolveBlogLanguages(), BLOG_PAGE_SIZE (+4 more)

### Community 125 - "actions/content.ts"
Cohesion: 0.14
Nodes (26): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), GRAMMAR_PAGES_PER_REQUEST, RenderGrammarPagesResult, StartGrammarUploadResult (+18 more)

### Community 126 - "dashboard-data.ts"
Cohesion: 0.15
Nodes (8): buildLearnerEngagementMetrics(), AdminDashboardData, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats(), Profile, UserQuizAttempt

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

### Community 146 - "getDataRepository"
Cohesion: 0.21
Nodes (30): submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), uploadBannerAction(), deleteBlogImageAction(), createContentVideo() (+22 more)

### Community 149 - "availability.ts"
Cohesion: 0.15
Nodes (16): AdminLanguagesPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), PageProps, resolveRequestedSlot() (+8 more)

### Community 150 - "attempt-payload.ts"
Cohesion: 0.16
Nodes (14): buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), useReducedMotion(), buildQuizAttemptAnswersJson(), formatUserAnswerLabel(), OPTION_FIELDS (+6 more)

### Community 151 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.45
Nodes (9): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+1 more)

### Community 152 - "curriculum/languages.ts"
Cohesion: 0.11
Nodes (24): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, LanguageCoursePage(), getLanguageWithAvailability() (+16 more)

### Community 155 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 160 - "grading.ts"
Cohesion: 0.24
Nodes (5): GradedQuizQuestion, OPTION_FIELDS, multipleChoiceQuestion, writtenQuestion, QuizQuestion

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

### Community 172 - "action-result.ts"
Cohesion: 0.27
Nodes (6): setLandingLanguageVisibilityAction(), revalidateQuizPaths(), updateRolePermissionsAction(), ActionResult, isLandingLanguageSlug(), sanitizeRolePermissionOverride()

### Community 174 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 175 - "rss.xml/route.ts"
Cohesion: 0.20
Nodes (12): absolute(), dynamic, GET(), xmlEscape(), generateMetadata(), dynamic, GET(), text() (+4 more)

### Community 176 - "blog/languages.ts"
Cohesion: 0.22
Nodes (8): dynamic, revalidate, sitemap(), BlogCta(), BLOG_LANGUAGES, BlogLanguage, BlogLanguageSlug, BY_SLUG

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "types/index.ts"
Cohesion: 0.10
Nodes (16): SubscriptionView(), SubscriptionViewProps, ALL_UNLOCKED, Entitlement, EntitlementGate, TIERS, interpolateText(), BILLING_PERIOD_MONTHS (+8 more)

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.profiles, public.blog_posts

### Community 187 - "[quiz_id]/page.tsx"
Cohesion: 0.39
Nodes (6): generateMetadata(), PageProps, QuizPage(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 188 - "BlogImageLibrary"
Cohesion: 0.29
Nodes (5): updateBlogImageAltAction(), BlogImageLibrary(), remove(), saveAlt(), formatBytes()

### Community 189 - "landing/page.tsx"
Cohesion: 0.40
Nodes (5): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), getLandingLanguageToggles()

### Community 190 - "admin/layout.tsx"
Cohesion: 0.53
Nodes (3): AdminLayout(), AdminHeaderBadge(), LanguageSwitcher()

## Knowledge Gaps
- **578 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+573 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **65 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `better-auth.ts`, `user-quiz-attempts-panel.tsx`, `category/[slug]/page.tsx`, `user-management-panel.tsx`, `create-content-section.tsx`, `attempt-payload.ts`, `edit-curriculum-level-dialog.tsx`, `content-form-panels.tsx`, `CurriculumLanguage`, `dashboard-welcome-header.tsx`, `learn-category-view.tsx`, `blog-shell.tsx`, `page-skeletons.tsx`, `blog/[slug]/page.tsx`, `brand-logo.tsx`, `types/index.ts`, `pricing.ts`, `grant-subscription-dialog.tsx`, `BannerUploadForm`, `BlogImageLibrary`, `admin-accounting-page-view.tsx`, `locale-provider.tsx`, `button.tsx`, `admin/layout.tsx`, `sections.tsx`, `useTranslations`, `actions/auth.ts`, `curriculum/types.ts`, `blog-post-list.tsx`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `admin/page.tsx`, `postgres/client.ts`, `app-shell.tsx`, `banner-list.tsx`, `user-quiz-attempts-panel.tsx`, `category/[slug]/page.tsx`, `curriculum-levels.ts`, `local/repository.ts`, `availability.ts`, `curriculum/languages.ts`, `blog/[id]/page.tsx`, `isLocalDataMode`, `action-guards.ts`, `data/index.ts`, `blog/[slug]/page.tsx`, `admin.ts`, `action-result.ts`, `data-source.ts`, `rss.xml/route.ts`, `blog/languages.ts`, `blog.ts`, `existing-content-list.tsx`, `[quiz_id]/page.tsx`, `BlogImageLibrary`, `landing/page.tsx`, `phone-accounts.ts`, `permissions/roles.ts`, `actions/auth.ts`, `app/page.tsx`, `blog-post-list.tsx`, `actions/content.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `banner-list.tsx`, `cn`, `user-quiz-attempts-panel.tsx`, `user-management-panel.tsx`, `create-content-section.tsx`, `availability.ts`, `attempt-payload.ts`, `edit-curriculum-level-dialog.tsx`, `jalali.ts`, `AdminDashboard`, `content-form-panels.tsx`, `CurriculumLanguage`, `dashboard-welcome-header.tsx`, `learn-category-view.tsx`, `data/index.ts`, `middleware.ts`, `brand-logo.tsx`, `data/repository.ts`, `types/index.ts`, `pricing.ts`, `grant-subscription-dialog.tsx`, `BannerUploadForm`, `existing-content-list.tsx`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `locale-provider.tsx`, `button.tsx`, `admin/layout.tsx`, `permissions/roles.ts`, `actions/auth.ts`, `curriculum/types.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _578 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03324808184143223 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._