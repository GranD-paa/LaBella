# Graph Report - cursor P  (2026-09-11)

## Corpus Check
- 467 files · ~347,392 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2360 nodes · 6715 edges · 172 communities (112 shown, 60 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `832859bb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useTranslations
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- cn
- continue-learning.ts
- edit-curriculum-level-dialog.tsx
- requireAdminPermission
- billing/accounting.ts
- fx-rate/route.ts
- curriculum/languages.ts
- local/repository.ts
- card.tsx
- language-switcher.tsx
- 001_app_schema.sql
- existing-content-list.tsx
- subscriptions-table.tsx
- providers/index.ts
- locale-provider.tsx
- reconcile.ts
- jalali.ts
- grammar-rules-list.tsx
- schema.sql
- compilerOptions
- supabase/repository.ts
- devDependencies
- dependencies
- dashboard-data.ts
- server-locale.ts
- components.json
- button.tsx
- admin-subscription-page-view.tsx
- period.ts
- seed.ts
- blog/error.tsx
- content-form-panels.tsx
- curriculum/types.ts
- page-skeletons.tsx
- [slug]/page.tsx
- my-subscriptions-card.tsx
- stripe/route.ts
- admin.ts
- revalidateAppContent
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- data/repository.ts
- action-result.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- pricing.ts
- blog-post-editor.tsx
- final-deployment/manifest.json
- otp-challenge.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- isLocalDataMode
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- app/layout.tsx
- billing-settings-form.tsx
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
- app/page.tsx
- @hookform/resolvers
- pg
- badge.tsx
- entitlement-settings-panel.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- phone-auth-form.tsx
- What You Must Do When Invoked
- 005_send_limits.sql
- quiz-form.tsx
- subscription-view.tsx
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
- [provider]/route.ts
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
- about-view.tsx
- react-hook-form
- @radix-ui/react-avatar
- BannerUploadForm
- [quiz_id]/page.tsx
- resolveMessage
- data-source.ts
- @radix-ui/react-tabs
- admin-dashboard.tsx
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- getDataRepository
- Search engine visibility
- 008_phone_auth.sql
- sms-test.mjs
- @radix-ui/react-label
- @radix-ui/react-slot
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- types/index.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 205 edges
2. `cn()` - 177 edges
3. `getDataRepository()` - 143 edges
4. `DataRepository` - 109 edges
5. `Button` - 66 edges
6. `resolveMessage()` - 52 edges
7. `revalidateAppContent()` - 48 edges
8. `Badge()` - 41 edges
9. `Lesson` - 38 edges
10. `getServerTranslator()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/dashboard/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (172 total, 60 thin omitted)

### Community 0 - "useTranslations"
Cohesion: 0.09
Nodes (27): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), ContentActionBar(), GrammarEntryFields(), GrammarManager(), GrammarTable(), AdminLanguagesPageView() (+19 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.11
Nodes (23): dynamic, recordVerifyAttempt(), VerifyGate, ProfileDetails, ProfileState, saveProfile(), SaveProfileResult, getAccountingSnapshot() (+15 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (7): DataRepository, getLandingPricing(), Payment, Profile, QuizQuestion, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.14
Nodes (22): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, isIranianMobile(), isIranianPhone(), looksGenerated() (+14 more)

### Community 6 - "cn"
Cohesion: 0.09
Nodes (27): PlanActiveToggle(), toggle(), PendingActionType, CategoryWatermark(), LevelCategoryGridProps, BannerCarousel(), DialogOverlay, DropdownMenuCheckboxItem (+19 more)

### Community 7 - "continue-learning.ts"
Cohesion: 0.14
Nodes (17): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+9 more)

### Community 8 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.40
Nodes (10): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+2 more)

### Community 9 - "requireAdminPermission"
Cohesion: 0.12
Nodes (20): cancelSubscriptionAction(), createLesson(), deleteLesson(), updateLesson(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), createVocabulary() (+12 more)

### Community 10 - "billing/accounting.ts"
Cohesion: 0.16
Nodes (16): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+8 more)

### Community 11 - "fx-rate/route.ts"
Cohesion: 0.30
Nodes (10): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), refreshFxRate() (+2 more)

### Community 12 - "curriculum/languages.ts"
Cohesion: 0.17
Nodes (10): ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, CATEGORY_DEFINITIONS, getLanguage(), resolveLessonForLevel(), TURKISH_LEVELS, CategoryDefinition (+2 more)

### Community 13 - "local/repository.ts"
Cohesion: 0.14
Nodes (25): buildRecoveryDeps(), DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), BANNER_UPLOAD_DIR (+17 more)

### Community 14 - "card.tsx"
Cohesion: 0.21
Nodes (18): DeleteConfirmDialog(), handleConfirm(), LANDMARK_LABELS, LANGUAGE_LABELS, discountedPrice(), SubscriptionPlanList(), PERMISSION_ROWS, ProfileViewProps (+10 more)

### Community 15 - "language-switcher.tsx"
Cohesion: 0.18
Nodes (9): AdminLayout(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AuthAsidePanel(), AuthMobileHeader(), BrandLogo(), BrandMark() (+1 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "existing-content-list.tsx"
Cohesion: 0.17
Nodes (12): deleteContentQuiz(), deleteContentVideo(), loadLessonContent(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), ExistingContentList(), REMOVE (+4 more)

### Community 18 - "subscriptions-table.tsx"
Cohesion: 0.26
Nodes (10): SubscriptionsTable(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable(), TableCaption, TableCell, TableFooter, TableHead (+2 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.17
Nodes (15): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+7 more)

### Community 20 - "locale-provider.tsx"
Cohesion: 0.29
Nodes (9): applyDocumentLocale(), LocaleContext, LocaleContextValue, LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition() (+1 more)

### Community 21 - "reconcile.ts"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 22 - "jalali.ts"
Cohesion: 0.10
Nodes (34): DateOfBirthField(), clampDay(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn(), isJalaliLeapYear() (+26 more)

### Community 23 - "grammar-rules-list.tsx"
Cohesion: 0.15
Nodes (8): GrammarReader(), GrammarRulesList(), attachGrammarPages(), GrammarPage, GrammarPageSummary, SignedGrammarPage, isObjectStorageConfigured(), GrammarRule

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "supabase/repository.ts"
Cohesion: 0.16
Nodes (10): DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS, PLAN_TEMPLATES, PlanTemplate, createClient(), Database, Json (+2 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "dashboard-data.ts"
Cohesion: 0.19
Nodes (7): AdminPage(), DashboardPage(), buildLearnerEngagementMetrics(), buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats()

### Community 30 - "server-locale.ts"
Cohesion: 0.17
Nodes (20): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, fa, t (+12 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "button.tsx"
Cohesion: 0.28
Nodes (13): LOCALES, ContactViewProps, PROVIDER_ICONS, PROVIDER_LABELS, Button, ButtonProps, DialogContent, DialogDescription (+5 more)

### Community 33 - "admin-subscription-page-view.tsx"
Cohesion: 0.09
Nodes (36): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamsSection(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS (+28 more)

### Community 34 - "period.ts"
Cohesion: 0.29
Nodes (9): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+1 more)

### Community 35 - "seed.ts"
Cohesion: 0.17
Nodes (8): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, PaymentSettings, SubscriptionTier

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.08
Nodes (33): emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarProgress, QuizContentPanel(), submit(), VideoContentPanel() (+25 more)

### Community 38 - "curriculum/types.ts"
Cohesion: 0.18
Nodes (15): AdminQuizzesPage(), PageProps, resolveRequestedSlot(), ContentFormPanel(), AdminQuizzesPageView(), CONTENT_TYPES, CreateContentSection(), stepForJump() (+7 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "[slug]/page.tsx"
Cohesion: 0.05
Nodes (51): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+43 more)

### Community 41 - "my-subscriptions-card.tsx"
Cohesion: 0.14
Nodes (16): generateMetadata(), Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), QuizSubmittedBanner(), UserDashboard(), daysRemaining(), MySubscriptionEntry (+8 more)

### Community 42 - "stripe/route.ts"
Cohesion: 0.33
Nodes (4): dynamic, POST(), BODY, verifyStripeWebhook()

### Community 43 - "admin.ts"
Cohesion: 0.07
Nodes (27): createStructuredQuiz(), revalidateQuizPaths(), BannerValues, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues, GrammarRuleValues (+19 more)

### Community 44 - "revalidateAppContent"
Cohesion: 0.14
Nodes (31): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+23 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.13
Nodes (21): EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+13 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "data/repository.ts"
Cohesion: 0.07
Nodes (26): BlogCategory, BlogPost, BlogPostInput, BlogPostStatus, CurriculumLevelOverrideRow, CefrBand, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE (+18 more)

### Community 49 - "action-result.ts"
Cohesion: 0.14
Nodes (13): saveGrammarReadingProgress(), submitQuizAction(), BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, setLandingLanguageVisibilityAction() (+5 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "pricing.ts"
Cohesion: 0.07
Nodes (36): SubscriptionPlanCards(), pricingFor(), rialFor(), FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS (+28 more)

### Community 52 - "blog-post-editor.tsx"
Cohesion: 0.53
Nodes (3): saveBlogPostAction(), BlogPostEditor(), slugifyTitle()

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (24): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+16 more)

### Community 55 - "scripts"
Cohesion: 0.17
Nodes (11): name, private, scripts, build, dev, lint, messages:export, start (+3 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "isLocalDataMode"
Cohesion: 0.25
Nodes (10): GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), WelcomePage(), WelcomePreviewPage(), CompleteProfileForm(), onSubmit() (+2 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.26
Nodes (10): VideoCard(), VideoLessonsGrid(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed() (+2 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.20
Nodes (16): AccountingKpis(), Tile(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv(), RevenueChart() (+8 more)

### Community 62 - "app/layout.tsx"
Cohesion: 0.22
Nodes (8): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps

### Community 63 - "billing-settings-form.tsx"
Cohesion: 0.28
Nodes (15): LessonPicker(), Values, FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue, FormItem (+7 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "actions/auth.ts"
Cohesion: 0.14
Nodes (21): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getClientIpForRateLimit(), padTiming(), refusalKey() (+13 more)

### Community 67 - "final-deployment/vercel.json"
Cohesion: 0.40
Nodes (4): buildCommand, framework, headers, installCommand

### Community 69 - "extends"
Cohesion: 0.50
Nodes (3): extends, next/core-web-vitals, next/typescript

### Community 70 - "public.user_learning_state"
Cohesion: 0.50
Nodes (3): public.user_learning_state, public.lessons, public.profiles

### Community 79 - "app/page.tsx"
Cohesion: 0.05
Nodes (60): FLAG_CODE, generateMetadata(), Home(), DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard() (+52 more)

### Community 83 - "badge.tsx"
Cohesion: 0.14
Nodes (22): RoleBadge(), StatusBadge(), ManagedUser, getInitials(), UserManagementPanel(), PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel() (+14 more)

### Community 84 - "entitlement-settings-panel.tsx"
Cohesion: 0.15
Nodes (11): ACCEPTED_TYPES, EntitlementSettingsPanel(), onSubmit(), Draft, draftFrom(), TierCapabilitiesPanel(), save(), ToggleRow() (+3 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "phone-auth-form.tsx"
Cohesion: 0.19
Nodes (15): getAuthChallenge(), OtpInput(), absorb(), focusBox(), localFormat(), ltr(), PhoneAuthForm(), fail() (+7 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "quiz-form.tsx"
Cohesion: 0.20
Nodes (10): OPTION_KEYS, OPTION_LABELS, QuestionFeedback, JalaliParts, RadioGroup, RadioGroupItem, SelectContent, SelectItem (+2 more)

### Community 94 - "subscription-view.tsx"
Cohesion: 0.19
Nodes (13): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), SubscriptionView(), SubscriptionViewProps, getAvailableProviders() (+5 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.14
Nodes (19): LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage() (+11 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "[provider]/route.ts"
Cohesion: 0.53
Nodes (5): dynamic, GET(), markFailed(), redirectToResult(), settle()

### Community 125 - "actions/content.ts"
Cohesion: 0.14
Nodes (27): abortGrammarUpload(), createContentVideo(), createContentVocabulary(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), GRAMMAR_PAGES_PER_REQUEST (+19 more)

### Community 126 - "getServerTranslator"
Cohesion: 0.08
Nodes (36): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+28 more)

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

### Community 146 - "about-view.tsx"
Cohesion: 0.50
Nodes (3): AboutView(), TIMELINE_KEYS, VALUE_ICONS

### Community 149 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.07
Nodes (36): generateMetadata(), PageProps, QuizPage(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), NoQuestionsMessage() (+28 more)

### Community 151 - "resolveMessage"
Cohesion: 0.10
Nodes (22): BillingSettingsForm(), handleRefreshRate(), onSubmit(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit(), AddCurriculumLevelDialog() (+14 more)

### Community 152 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 155 - "admin-dashboard.tsx"
Cohesion: 0.15
Nodes (17): generateMetadata(), RolesPermissionsPanel(), AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LANGUAGE_LABEL_KEYS (+9 more)

### Community 160 - "getDataRepository"
Cohesion: 0.08
Nodes (38): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage() (+30 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 173 - "types/index.ts"
Cohesion: 0.09
Nodes (15): LockedContentNotice(), GrammarRuleWithPages, LessonDetailTabs(), LessonViewProps, QuizTabContent(), BandExam, LESSONS, TEN_A1_LEVELS (+7 more)

## Knowledge Gaps
- **530 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+525 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `app-shell.tsx`, `requireAdminPermission`, `fx-rate/route.ts`, `local/repository.ts`, `existing-content-list.tsx`, `[quiz_id]/page.tsx`, `data-source.ts`, `admin-dashboard.tsx`, `dashboard-data.ts`, `curriculum/types.ts`, `[slug]/page.tsx`, `my-subscriptions-card.tsx`, `admin.ts`, `revalidateAppContent`, `action-result.ts`, `blog-post-editor.tsx`, `isLocalDataMode`, `actions/auth.ts`, `app/page.tsx`, `subscription-view.tsx`, `[provider]/route.ts`, `actions/content.ts`, `getServerTranslator`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `cn`, `edit-curriculum-level-dialog.tsx`, `requireAdminPermission`, `card.tsx`, `language-switcher.tsx`, `existing-content-list.tsx`, `about-view.tsx`, `subscriptions-table.tsx`, `locale-provider.tsx`, `BannerUploadForm`, `[quiz_id]/page.tsx`, `resolveMessage`, `grammar-rules-list.tsx`, `jalali.ts`, `admin-dashboard.tsx`, `getDataRepository`, `button.tsx`, `admin-subscription-page-view.tsx`, `content-form-panels.tsx`, `curriculum/types.ts`, `my-subscriptions-card.tsx`, `revalidateAppContent`, `types/index.ts`, `pricing.ts`, `isLocalDataMode`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `billing-settings-form.tsx`, `actions/auth.ts`, `app/page.tsx`, `badge.tsx`, `entitlement-settings-panel.tsx`, `phone-auth-form.tsx`, `quiz-form.tsx`, `subscription-view.tsx`, `lessons-monitor.tsx`, `getServerTranslator`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `DataRepository` connect `DataRepository` to `getDataRepository`, `seed.ts`, `billing/accounting.ts`, `curriculum/languages.ts`, `local/repository.ts`, `types/index.ts`, `quiz-management/types.ts`, `data/repository.ts`, `app/page.tsx`, `admin-accounting-page-view.tsx`, `pricing.ts`, `grammar-rules-list.tsx`, `subscription-view.tsx`, `supabase/repository.ts`, `dashboard-data.ts`, `getServerTranslator`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _530 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useTranslations` be split into smaller, more focused modules?**
  _Cohesion score 0.08771929824561403 - nodes in this community are weakly interconnected._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11491935483870967 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.04032729398012858 - nodes in this community are weakly interconnected._