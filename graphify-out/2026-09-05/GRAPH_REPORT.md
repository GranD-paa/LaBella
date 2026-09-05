# Graph Report - cursor P  (2026-09-05)

## Corpus Check
- 429 files · ~319,406 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2134 nodes · 6263 edges · 160 communities (103 shown, 57 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c51c619b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- requireSuperAdminAction
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- user-profile-dialog.tsx
- Lesson
- button.tsx
- admin.ts
- types/index.ts
- actions/quiz.ts
- isLocalDataMode
- cn
- level-overrides.ts
- pricing.ts
- 001_app_schema.sql
- hero.tsx
- app/layout.tsx
- providers/index.ts
- [category]/page.tsx
- curriculum-levels.ts
- data/index.ts
- useTranslations
- schema.sql
- compilerOptions
- user-row-actions.tsx
- devDependencies
- dependencies
- getServerTranslator
- i18n/types.ts
- components.json
- quiz-edit-dialog.tsx
- data/repository.ts
- local/repository.ts
- middleware.ts
- content-form-panels.tsx
- Button
- quiz-management/types.ts
- page-skeletons.tsx
- createPageMetadata
- utils.ts
- quiz-form.tsx
- resolveMessage
- locale-provider.tsx
- helpers.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- subscription-view.tsx
- blog.ts
- لندینگ‌پیج و بلاگ — سند تحویل
- seed.ts
- my-subscriptions-card.tsx
- final-deployment/manifest.json
- action-guards.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-embed.ts
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- [provider]/route.ts
- AdminDashboard
- billing/schema.test.ts
- vercel.json
- BannerUploadForm
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
- @radix-ui/react-alert-dialog
- stripe/route.ts
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- entitlements/schema.test.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- admin-password.mjs
- plans.ts
- zod
- 20260730120000_banners.sql
- tailwind.config.ts
- "account"
- public.user_quiz_attempts
- "user"
- public.grammar_rules
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
- billing-settings-form.tsx
- .tmp-banner-test.mjs
- getDataRepository
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
- gsap
- marked
- next-themes
- next
- nodemailer
- @radix-ui/react-label
- QuizManagementTable
- react-hook-form
- @supabase/ssr
- tailwind-merge
- @types/nodemailer
- TierCapabilitiesPanel
- validations/quiz.ts
- .tmp-banner-test.cjs
- local-session.ts
- period.ts
- [quiz_id]/page.tsx
- data-source.ts
- 006_banner_images.sql
- Search engine visibility

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 172 edges
3. `getDataRepository()` - 138 edges
4. `DataRepository` - 104 edges
5. `Button` - 63 edges
6. `resolveMessage()` - 60 edges
7. `revalidateAppContent()` - 53 edges
8. `Badge()` - 42 edges
9. `getServerTranslator()` - 37 edges
10. `Lesson` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/sign-up/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/accounting/page.tsx → lib/i18n/metadata.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/banners/page.tsx → lib/i18n/metadata.ts

## Import Cycles
- None detected.

## Communities (160 total, 57 thin omitted)

### Community 0 - "requireSuperAdminAction"
Cohesion: 0.19
Nodes (17): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+9 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.12
Nodes (25): dynamic, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature() (+17 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (9): BlogPost, DataRepository, getLandingPricing(), fetchQuizManagementStats(), GrammarRule, LocalizedText, QuizQuestion, VideoLesson (+1 more)

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (21): signOutAction(), AdminLayout(), UserNav(), AdminHeaderBadge(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel() (+13 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.05
Nodes (53): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+45 more)

### Community 6 - "user-profile-dialog.tsx"
Cohesion: 0.12
Nodes (19): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), RoleBadge(), ManagedUser, PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel(), Separator (+11 more)

### Community 7 - "Lesson"
Cohesion: 0.08
Nodes (27): QuizManager(), LESSONS, TEN_A1_LEVELS, isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages (+19 more)

### Community 8 - "button.tsx"
Cohesion: 0.34
Nodes (11): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+3 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (32): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), updateSubscriptionTierAction(), onSubmit(), toggle(), bannerSchema, BannerValues, BillingSettingsValues (+24 more)

### Community 10 - "types/index.ts"
Cohesion: 0.09
Nodes (30): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+22 more)

### Community 11 - "actions/quiz.ts"
Cohesion: 0.15
Nodes (18): submitQuizAction(), buildInitialFeedback(), QuizForm(), lockAnswer(), onSubmit(), buildQuizAttemptAnswersJson(), formatUserAnswerLabel(), OPTION_FIELDS (+10 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.31
Nodes (11): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), refreshFxRate() (+3 more)

### Community 13 - "cn"
Cohesion: 0.20
Nodes (22): SubscriptionsTable(), DeleteConfirmDialog(), pluralize(), QuizzesTable(), StatusBadge(), getInitials(), UserManagementPanel(), getScoreBadgeClass() (+14 more)

### Community 14 - "level-overrides.ts"
Cohesion: 0.18
Nodes (9): getLanguage(), CurriculumLevelOverrideRow, getBandFromCode(), getCurriculumLevelsForLanguage(), groupLevelsByBand(), resolveLessonForLevel(), CefrBand, advanceLearningAfterQuiz() (+1 more)

### Community 15 - "pricing.ts"
Cohesion: 0.16
Nodes (23): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial() (+15 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.18
Nodes (9): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+1 more)

### Community 18 - "app/layout.tsx"
Cohesion: 0.11
Nodes (20): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, applyDocumentLocale(), LocaleProvider(), persistLocaleCookie() (+12 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.17
Nodes (15): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+7 more)

### Community 20 - "[category]/page.tsx"
Cohesion: 0.13
Nodes (23): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+15 more)

### Community 21 - "curriculum-levels.ts"
Cohesion: 0.29
Nodes (12): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+4 more)

### Community 22 - "data/index.ts"
Cohesion: 0.14
Nodes (17): AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage(), metadata (+9 more)

### Community 23 - "useTranslations"
Cohesion: 0.07
Nodes (31): AdminContentHeader(), ContentActionBar(), GrammarManager(), GrammarTable(), LessonsTable(), CreateContentSection(), AdminSubscriptionPageView(), ConfirmActionDialog() (+23 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "user-row-actions.tsx"
Cohesion: 0.24
Nodes (8): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), PendingActionType, UserRowActions()

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): better-auth, lucide-react, dependencies, better-auth, lucide-react, @radix-ui/react-avatar, @radix-ui/react-dropdown-menu, @radix-ui/react-select (+17 more)

### Community 29 - "getServerTranslator"
Cohesion: 0.16
Nodes (18): AdminLanguagesPage(), generateMetadata(), AdminQuizzesPage(), generateMetadata(), generateMetadata(), LessonPage(), PageProps, generateMetadata() (+10 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.24
Nodes (12): messages, createTranslator(), getNestedValue(), interpolate(), AppLocale, DeepStringRecord, Join, MessageKey (+4 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "quiz-edit-dialog.tsx"
Cohesion: 0.21
Nodes (13): emptyQuestion, pluralize(), QuizEditDialog(), handleAddQuestion(), handleEditQuestion(), handleTitleSave(), refreshAfterMutation(), startEditingQuestion() (+5 more)

### Community 33 - "data/repository.ts"
Cohesion: 0.08
Nodes (16): BlogCategory, BlogPostInput, BlogPostStatus, AuthUser, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle (+8 more)

### Community 34 - "local/repository.ts"
Cohesion: 0.18
Nodes (20): computeRenewalPeriod(), isEntitled(), BANNER_UPLOAD_DIR, createLocalRepository(), commitStore(), failLocalPayment(), settleLocalPayment(), LOCAL_SEED (+12 more)

### Community 35 - "middleware.ts"
Cohesion: 0.16
Nodes (14): generateMetadata(), dynamic, robots(), updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), isSiteIndexable(), PUBLIC_ROUTES (+6 more)

### Community 36 - "content-form-panels.tsx"
Cohesion: 0.09
Nodes (32): ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel(), submit() (+24 more)

### Community 37 - "Button"
Cohesion: 0.21
Nodes (27): LessonPicker(), emptyQuestion, LOCALES, PROVIDER_ICONS, PROVIDER_LABELS, Button, DialogContent, DialogDescription (+19 more)

### Community 38 - "quiz-management/types.ts"
Cohesion: 0.23
Nodes (10): ExtendedQuizQuestion, getSectionLabel(), LEVEL_EXAM_SECTION, normalizeAnswer(), QuestionType, QUIZ_SECTIONS, QuizMetadata, QuizStatus (+2 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "createPageMetadata"
Cohesion: 0.11
Nodes (18): generateMetadata(), AdminPage(), generateMetadata(), generateMetadata(), ContactPage(), generateMetadata(), DashboardPage(), generateMetadata() (+10 more)

### Community 41 - "utils.ts"
Cohesion: 0.08
Nodes (44): CONTENT_TYPES, CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryHero(), LearnLevelView(), LearnLevelViewProps (+36 more)

### Community 42 - "quiz-form.tsx"
Cohesion: 0.17
Nodes (14): ACCEPTED_TYPES, OPTION_KEYS, QuizQuestionFields(), OPTION_KEYS, ContactViewProps, OPTION_LABELS, QuestionFeedback, Label (+6 more)

### Community 43 - "resolveMessage"
Cohesion: 0.08
Nodes (25): BillingSettingsForm(), handleRefreshRate(), onSubmit(), handleConfirm(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit() (+17 more)

### Community 44 - "locale-provider.tsx"
Cohesion: 0.12
Nodes (30): BannerManagementPanel(), LANDMARK_LABELS, LANGUAGE_LABELS, CurriculumLevelManager(), LanguageManagementPanel(), EntitlementSettingsPanel(), PlanActiveToggle(), discountedPrice() (+22 more)

### Community 45 - "helpers.ts"
Cohesion: 0.29
Nodes (11): fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata(), withQuizDefaults() (+3 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "subscription-view.tsx"
Cohesion: 0.13
Nodes (17): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), SubscriptionView(), SubscriptionViewProps (+9 more)

### Community 49 - "blog.ts"
Cohesion: 0.08
Nodes (34): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogIndexPage(), metadata (+26 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "seed.ts"
Cohesion: 0.11
Nodes (16): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, createSupabaseRepository(), DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS (+8 more)

### Community 52 - "my-subscriptions-card.tsx"
Cohesion: 0.11
Nodes (20): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), QuizSubmittedBanner() (+12 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "action-guards.ts"
Cohesion: 0.27
Nodes (7): cancelSubscriptionAction(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser, getProfileById

### Community 55 - "scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "public/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "20260813120000_entitlements_and_plan_periods.sql"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "app/page.tsx"
Cohesion: 0.13
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck, DECKS (+10 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.39
Nodes (7): isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.19
Nodes (17): AccountingKpis(), Tile(), BreakdownList(), PaymentsLedger(), handleExport(), STATUS_STYLES, toCsv(), RevenueChart() (+9 more)

### Community 62 - "[provider]/route.ts"
Cohesion: 0.48
Nodes (6): dynamic, GET(), markFailed(), redirectToResult(), settle(), getPaymentProvider()

### Community 63 - "AdminDashboard"
Cohesion: 0.21
Nodes (12): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName(), getQuizSectionDescriptionKey() (+4 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "BannerUploadForm"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

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
Nodes (34): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+26 more)

### Community 84 - "stripe/route.ts"
Cohesion: 0.33
Nodes (4): dynamic, POST(), BODY, verifyStripeWebhook()

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "admin-password.mjs"
Cohesion: 0.40
Nodes (3): [mode, email, password], names, pool

### Community 94 - "plans.ts"
Cohesion: 0.50
Nodes (3): SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "billing-settings-form.tsx"
Cohesion: 0.35
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 126 - "getDataRepository"
Cohesion: 0.17
Nodes (32): createContentGrammar(), createContentVideo(), createContentVocabulary(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson() (+24 more)

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

### Community 146 - "QuizManagementTable"
Cohesion: 0.29
Nodes (4): QuizManagementTable(), renderStats(), toggleStatus(), getQuizAttemptStats()

### Community 151 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 152 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 154 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 155 - "period.ts"
Cohesion: 0.31
Nodes (7): addBillingMonths(), BillingPeriod, computeGraceDeadline(), daysInUtcMonth(), ENTITLED_STATUSES, resolveStatusFromDates(), SubscriptionStatus

### Community 156 - "[quiz_id]/page.tsx"
Cohesion: 0.29
Nodes (8): generateMetadata(), PageProps, QuizPage(), NoQuestionsMessage(), QuizPageIntro(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 157 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

## Knowledge Gaps
- **485 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `{ Client }`, `png`, `png` (+480 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **57 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `requireSuperAdminAction`, `app-shell.tsx`, `actions/auth.ts`, `user-profile-dialog.tsx`, `Lesson`, `button.tsx`, `actions/quiz.ts`, `cn`, `pricing.ts`, `QuizManagementTable`, `data/index.ts`, `TierCapabilitiesPanel`, `user-row-actions.tsx`, `[quiz_id]/page.tsx`, `getServerTranslator`, `quiz-edit-dialog.tsx`, `content-form-panels.tsx`, `Button`, `createPageMetadata`, `utils.ts`, `quiz-form.tsx`, `resolveMessage`, `locale-provider.tsx`, `subscription-view.tsx`, `my-subscriptions-card.tsx`, `admin-accounting-page-view.tsx`, `AdminDashboard`, `BannerUploadForm`, `sections.tsx`, `billing-settings-form.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `user-profile-dialog.tsx`, `button.tsx`, `actions/quiz.ts`, `pricing.ts`, `app/layout.tsx`, `QuizManagementTable`, `useTranslations`, `Button`, `utils.ts`, `quiz-form.tsx`, `locale-provider.tsx`, `subscription-view.tsx`, `blog.ts`, `my-subscriptions-card.tsx`, `admin-accounting-page-view.tsx`, `BannerUploadForm`, `sections.tsx`, `billing-settings-form.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `requireSuperAdminAction`, `postgres/repository.ts`, `app-shell.tsx`, `actions/auth.ts`, `user-profile-dialog.tsx`, `admin.ts`, `actions/quiz.ts`, `isLocalDataMode`, `[category]/page.tsx`, `curriculum-levels.ts`, `data/index.ts`, `user-row-actions.tsx`, `[quiz_id]/page.tsx`, `getServerTranslator`, `data-source.ts`, `local/repository.ts`, `createPageMetadata`, `subscription-view.tsx`, `blog.ts`, `seed.ts`, `action-guards.ts`, `app/page.tsx`, `[provider]/route.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `{ Client }` to the rest of the system?**
  _485 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03462709284627093 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._