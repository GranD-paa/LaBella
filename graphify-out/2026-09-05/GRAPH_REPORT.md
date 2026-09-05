# Graph Report - cursor P  (2026-09-05)

## Corpus Check
- 435 files · ~325,187 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2181 nodes · 6428 edges · 161 communities (103 shown, 58 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c634db3e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- revalidateAppContent
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- actions/auth.ts
- roles.ts
- Lesson
- cn
- admin.ts
- types/index.ts
- quiz-form.tsx
- isLocalDataMode
- badge.tsx
- advance-learning.ts
- local/repository.ts
- 001_app_schema.sql
- hero.tsx
- grammar.ts
- providers/index.ts
- [language]/page.tsx
- curriculum-levels.ts
- landing/page.tsx
- useTranslations
- schema.sql
- compilerOptions
- refresh.ts
- devDependencies
- dependencies
- data/index.ts
- i18n/types.ts
- components.json
- quiz-edit-dialog.tsx
- curriculum/languages.ts
- store.ts
- data-source.ts
- content-form-panels.tsx
- billing-settings-form.tsx
- quiz-management/types.ts
- page-skeletons.tsx
- QuizQuestion
- curriculum/types.ts
- quiz-form-dialog.tsx
- resolveMessage
- button.tsx
- helpers.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- checkout.ts
- app/layout.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- data/repository.ts
- my-subscriptions-card.tsx
- final-deployment/manifest.json
- [category]/page.tsx
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- app/page.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- billing/format.ts
- curriculum-level-manager.tsx
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
- blog.ts
- lesson-edit-dialog.tsx
- @radix-ui/react-dialog
- @radix-ui/react-radio-group
- Laparli
- react
- react-dom
- entitlements/schema.test.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- admin-password.mjs
- pricing.ts
- decks.ts
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
- edit-curriculum-level-dialog.tsx
- band-exams.test.ts
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
- @aws-sdk/s3-request-presigner
- marked
- better-auth
- next
- nodemailer
- lucide-react
- QuizManagementTable
- react-hook-form
- @radix-ui/react-avatar
- tailwind-merge
- @types/nodemailer
- admin-subscription-page-view.tsx
- @radix-ui/react-dropdown-menu
- @radix-ui/react-tabs
- local-session.ts
- period.ts
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- Search engine visibility

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 211 edges
2. `cn()` - 172 edges
3. `getDataRepository()` - 142 edges
4. `DataRepository` - 112 edges
5. `Button` - 66 edges
6. `resolveMessage()` - 63 edges
7. `revalidateAppContent()` - 55 edges
8. `Badge()` - 42 edges
9. `getServerTranslator()` - 37 edges
10. `Lesson` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/sign-up/page.tsx → lib/i18n/metadata.ts
- `BlogPostEditor()` --indirect_call--> `saveBlogPostAction()`  [INFERRED]
  components/admin/blog/blog-post-editor.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts

## Import Cycles
- None detected.

## Communities (161 total, 58 thin omitted)

### Community 0 - "revalidateAppContent"
Cohesion: 0.25
Nodes (16): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+8 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.10
Nodes (28): dynamic, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature() (+20 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): BlogPost, DataRepository, GrammarRule, Payment, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.07
Nodes (18): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+10 more)

### Community 5 - "actions/auth.ts"
Cohesion: 0.05
Nodes (53): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+45 more)

### Community 6 - "roles.ts"
Cohesion: 0.29
Nodes (8): ADMIN_ROLE_SLUGS, isRoleSlug(), ROLE_DEFINITIONS, RoleDefinition, roleImpliesAdmin(), RolePermissions, USER_STATUSES, UserStatus

### Community 7 - "Lesson"
Cohesion: 0.12
Nodes (21): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+13 more)

### Community 8 - "cn"
Cohesion: 0.13
Nodes (24): Tile(), ACCEPTED_TYPES, ConfirmActionDialog(), BrandLogo(), BrandMark(), QuizCard(), SubscriptionLanguageTabs(), SubscriptionView() (+16 more)

### Community 9 - "admin.ts"
Cohesion: 0.06
Nodes (41): addQuizQuestion(), createQuizWithQuestions(), createStructuredQuiz(), deleteQuizQuestion(), getQuestionLessonId(), getQuizLessonId(), revalidateQuizPaths(), updateQuizQuestion() (+33 more)

### Community 10 - "types/index.ts"
Cohesion: 0.14
Nodes (19): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+11 more)

### Community 11 - "quiz-form.tsx"
Cohesion: 0.06
Nodes (44): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), submitQuizAction(), PageProps, QuizPage(), UserQuizAttemptsPanel(), buildInitialFeedback(), OPTION_LABELS (+36 more)

### Community 12 - "isLocalDataMode"
Cohesion: 0.23
Nodes (16): dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET(), dynamic (+8 more)

### Community 13 - "badge.tsx"
Cohesion: 0.19
Nodes (21): STATUS_STYLES, SubscriptionsTable(), DeleteConfirmDialog(), RoleBadge(), StatusBadge(), getInitials(), UserManagementPanel(), getScoreBadgeClass() (+13 more)

### Community 14 - "advance-learning.ts"
Cohesion: 0.47
Nodes (3): ITALIAN_LEVELS, advanceLearningAfterQuiz(), getNextLevelSlug()

### Community 15 - "local/repository.ts"
Cohesion: 0.18
Nodes (19): SubscriptionPlanCards(), pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp() (+11 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "hero.tsx"
Cohesion: 0.16
Nodes (10): LandingCourse, LandingHero(), LOCALES, BRAND_MARK, BrandMark, en, fa, it (+2 more)

### Community 18 - "grammar.ts"
Cohesion: 0.14
Nodes (25): createGrammarRule(), deleteGrammarRule(), removeGrammarDocument(), updateGrammarRule(), uploadGrammarDocument(), generateMetadata(), LessonPage(), PageProps (+17 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.10
Nodes (21): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+13 more)

### Community 20 - "[language]/page.tsx"
Cohesion: 0.13
Nodes (15): LanguageCoursePage(), PageProps, BandExam, groupLevelExamsByBand(), ALL_UNLOCKED, cefrBandOf(), cheapestTierUnlocking(), Entitlement (+7 more)

### Community 21 - "curriculum-levels.ts"
Cohesion: 0.20
Nodes (16): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), handleConfirm(), isLanguageSlug() (+8 more)

### Community 22 - "landing/page.tsx"
Cohesion: 0.40
Nodes (5): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), getLandingLanguageToggles()

### Community 23 - "useTranslations"
Cohesion: 0.06
Nodes (45): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminAccountingPageView(), BreakdownList(), AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel() (+37 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "refresh.ts"
Cohesion: 0.15
Nodes (12): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+4 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.08
Nodes (25): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+17 more)

### Community 29 - "data/index.ts"
Cohesion: 0.11
Nodes (33): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogEditorPage(), metadata, AdminBlogPage() (+25 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.13
Nodes (23): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+15 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "quiz-edit-dialog.tsx"
Cohesion: 0.21
Nodes (13): emptyQuestion, pluralize(), QuizEditDialog(), handleAddQuestion(), handleEditQuestion(), handleTitleSave(), refreshAfterMutation(), startEditingQuestion() (+5 more)

### Community 33 - "curriculum/languages.ts"
Cohesion: 0.15
Nodes (10): CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, ENGLISH_LEVELS, GERMAN_LEVELS, CATEGORY_DEFINITIONS, TURKISH_LEVELS (+2 more)

### Community 34 - "store.ts"
Cohesion: 0.21
Nodes (14): DevModeBanner(), commitStore(), LOCAL_SEED, LocalDatabase, backfillMissingCollections(), backfillNewRowFields(), cloneSeed(), DATA_DIR (+6 more)

### Community 35 - "data-source.ts"
Cohesion: 0.14
Nodes (17): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+9 more)

### Community 36 - "content-form-panels.tsx"
Cohesion: 0.10
Nodes (29): ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit(), QuizContentPanel(), submit(), VideoContentPanel() (+21 more)

### Community 37 - "billing-settings-form.tsx"
Cohesion: 0.27
Nodes (17): LessonPicker(), LOCALES, FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue, FormItem (+9 more)

### Community 38 - "quiz-management/types.ts"
Cohesion: 0.16
Nodes (14): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, ExtendedQuiz, ExtendedQuizQuestion, normalizeAnswer(), QuestionType (+6 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "QuizQuestion"
Cohesion: 0.16
Nodes (5): buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats(), QuizQuestion

### Community 41 - "curriculum/types.ts"
Cohesion: 0.11
Nodes (35): ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, BandExamsSection(), CategoryWatermark(), ComingSoonLanguage() (+27 more)

### Community 42 - "quiz-form-dialog.tsx"
Cohesion: 0.15
Nodes (16): emptyQuestion, QuizFormDialog(), onSubmit(), OPTION_KEYS, QuizQuestionFields(), OPTION_KEYS, WizardQuestionFields(), ContactViewProps (+8 more)

### Community 43 - "resolveMessage"
Cohesion: 0.10
Nodes (20): BillingSettingsForm(), handleRefreshRate(), onSubmit(), runAction(), handleConfirm(), GrammarDocumentDialog(), remove(), upload() (+12 more)

### Community 44 - "button.tsx"
Cohesion: 0.17
Nodes (21): AccountingKpis(), BlogPostEditor(), LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES, Draft, ToggleRow(), PERMISSION_ROWS (+13 more)

### Community 45 - "helpers.ts"
Cohesion: 0.28
Nodes (12): getLanguage(), fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes(), findPublishedQuizForLevel(), findPublishedQuizzesForLevel(), resolveQuizCreateMetadata() (+4 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "checkout.ts"
Cohesion: 0.14
Nodes (17): buildRecoveryDeps(), CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), handlePay(), getAvailableProviders(), ReconcileDeps (+9 more)

### Community 49 - "app/layout.tsx"
Cohesion: 0.06
Nodes (36): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+28 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "data/repository.ts"
Cohesion: 0.07
Nodes (24): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, BlogPostInput, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, AuthUser, LocalAuthUser (+16 more)

### Community 52 - "my-subscriptions-card.tsx"
Cohesion: 0.14
Nodes (14): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), LANGUAGE_LABEL_KEYS, LevelQuizRow, QuizSubmittedBanner(), StatCard(), UserDashboard() (+6 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "[category]/page.tsx"
Cohesion: 0.28
Nodes (11): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, getLanguageWithAvailability(), getLevel() (+3 more)

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
Cohesion: 0.15
Nodes (19): FLAG_CODE, generateMetadata(), Home(), getLanguageCode(), getLanguagesMissingCodes(), LANGUAGE_CODES, LANGUAGES, LanguageSlug (+11 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.29
Nodes (9): VideoCard(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed (+1 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "billing/format.ts"
Cohesion: 0.25
Nodes (12): PaymentsLedger(), handleExport(), toCsv(), RevenueChart(), CheckoutDialog(), formatEurCents(), formatMonthLabel(), formatNumber() (+4 more)

### Community 62 - "curriculum-level-manager.tsx"
Cohesion: 0.23
Nodes (8): AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), TabsContent, TabsList, TabsTrigger, LanguageToggle, CEFR_BANDS

### Community 63 - "AdminDashboard"
Cohesion: 0.38
Nodes (7): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName()

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
Cohesion: 0.11
Nodes (31): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+23 more)

### Community 83 - "blog.ts"
Cohesion: 0.22
Nodes (8): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), BlogPostList(), remove()

### Community 84 - "lesson-edit-dialog.tsx"
Cohesion: 0.25
Nodes (6): LessonEditDialog(), onSubmit(), LessonForm(), onSubmit(), createLessonSchema(), LessonValues

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "admin-password.mjs"
Cohesion: 0.40
Nodes (3): [mode, email, password], names, pool

### Community 94 - "pricing.ts"
Cohesion: 0.20
Nodes (9): LandingPriceCell, LandingPricingData, LandingPricingLanguage, LandingPricingPlan, getSubscriptionPlanMeta(), SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta (+1 more)

### Community 95 - "decks.ts"
Cohesion: 0.29
Nodes (6): COURSE_ORDER, CourseDeck, DECKS, en, fa, it

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.13
Nodes (25): AddCurriculumLevelDialog(), onSubmit(), EditCurriculumLevelDialog(), onSubmit(), ManagedUser, PERMISSION_ROWS, UserProfileDialog(), PROVIDER_ICONS (+17 more)

### Community 126 - "getDataRepository"
Cohesion: 0.10
Nodes (37): cancelSubscriptionAction(), saveGrammarReadingProgress(), createContentGrammar(), createContentVideo(), createContentVocabulary(), setLandingLanguageVisibilityAction(), createLesson(), deleteLesson() (+29 more)

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

### Community 151 - "admin-subscription-page-view.tsx"
Cohesion: 0.18
Nodes (9): AdminSubscriptionPageView(), EntitlementSettingsPanel(), PlanActiveToggle(), discountedPrice(), SubscriptionPlanList(), draftFrom(), TierCapabilitiesPanel(), save() (+1 more)

### Community 154 - "local-session.ts"
Cohesion: 0.33
Nodes (9): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+1 more)

### Community 155 - "period.ts"
Cohesion: 0.29
Nodes (9): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), ENTITLED_STATUSES, isEntitled(), resolveStatusFromDates() (+1 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

## Knowledge Gaps
- **484 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+479 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **58 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `revalidateAppContent`, `app-shell.tsx`, `actions/auth.ts`, `cn`, `quiz-form.tsx`, `badge.tsx`, `local/repository.ts`, `QuizManagementTable`, `admin-subscription-page-view.tsx`, `quiz-edit-dialog.tsx`, `content-form-panels.tsx`, `billing-settings-form.tsx`, `curriculum/types.ts`, `quiz-form-dialog.tsx`, `resolveMessage`, `button.tsx`, `my-subscriptions-card.tsx`, `video-lessons-grid.tsx`, `billing/format.ts`, `curriculum-level-manager.tsx`, `AdminDashboard`, `BannerUploadForm`, `sections.tsx`, `lesson-edit-dialog.tsx`, `edit-curriculum-level-dialog.tsx`, `getDataRepository`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `BannerUploadForm`, `app-shell.tsx`, `billing-settings-form.tsx`, `curriculum/types.ts`, `quiz-form-dialog.tsx`, `quiz-form.tsx`, `button.tsx`, `badge.tsx`, `sections.tsx`, `local/repository.ts`, `app/layout.tsx`, `QuizManagementTable`, `my-subscriptions-card.tsx`, `useTranslations`, `admin-subscription-page-view.tsx`, `edit-curriculum-level-dialog.tsx`, `billing/format.ts`, `curriculum-level-manager.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `revalidateAppContent`, `postgres/repository.ts`, `data-source.ts`, `app-shell.tsx`, `actions/auth.ts`, `admin.ts`, `quiz-form.tsx`, `isLocalDataMode`, `checkout.ts`, `app/layout.tsx`, `grammar.ts`, `blog.ts`, `[language]/page.tsx`, `curriculum-levels.ts`, `landing/page.tsx`, `[category]/page.tsx`, `app/page.tsx`, `data/index.ts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _484 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `postgres/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1006006006006006 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.037698412698412696 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05959183673469388 - nodes in this community are weakly interconnected._