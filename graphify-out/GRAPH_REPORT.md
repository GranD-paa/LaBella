# Graph Report - cursor P  (2026-08-30)

## Corpus Check
- 392 files · ~192,334 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1780 nodes · 5523 edges · 123 communities (80 shown, 43 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Admin Forms & Validation
- Curriculum & Dashboard Cards
- Data Repository Interface
- Admin i18n Message Bundles
- App Layouts & Navigation
- Authentication Actions
- Admin Data Tables
- Learning Progress State
- Admin Content Managers
- Admin Content Actions
- Accounting Snapshots
- Admin CRUD Actions
- Payment Webhooks & Cron
- Quiz Taking & Grading
- Local Dev Seed Data
- Currency & Pricing Format
- Postgres App Schema
- Quiz Management Helpers
- Locale Configuration
- Payment Providers
- Entitlements & Band Exams
- Roles & Permissions
- Learner Content Views
- User Dashboard & Achievements
- Legacy Supabase Schema
- TypeScript Config
- Admin Billing Actions
- Dev Dependencies
- Runtime Dependencies
- Public Marketing Pages
- Checkout Flow
- shadcn Component Config
- Confirmation Dialogs
- Accounting Dashboard
- Subscription Plan Admin
- Data Source & Session Middleware
- Learning Path Routes
- App Route Pages
- Subscription Data Access
- Loading Skeletons
- Admin Page Entrypoints
- Local Session & Signing
- Postgres Client & Pool
- User Administration
- Banner & Language Admin
- Quiz Admin Tables
- Postgres Entitlements Schema
- Supabase Billing Migration
- Billing Periods & Renewal
- Curriculum Level Overrides
- Server Action Guards
- Quiz Validation Schemas
- Root Layout & PWA
- Deployment Manifest Copy
- Payment Reconciliation
- NPM Scripts
- PWA Manifest
- Supabase Entitlements Migration
- Quiz Page Entry
- Video Embed Parsing
- Local Content Sync Script
- FX Rate Providers
- Lesson Page & Navigation
- Admin Dashboard View
- Billing Schema Tests
- Vercel Config
- Banner Upload Handlers
- Deployment Vercel Copy
- Supabase User Roles Migration
- ESLint Config
- Supabase Learning State Migration
- Postgres Banner Swap
- Locale Parity Test
- Next.js Config
- PostCSS Config
- Service Worker
- Supabase Content Migration
- Supabase Claim Hook Migration
- Supabase Subscription Migration
- clsx Package Entry
- Hook Form Resolvers Entry
- pg Driver Entry
- Radix Alert Dialog Entry
- Radix Avatar Entry
- Radix Dialog Entry
- Radix Radio Group Entry
- Radix Tabs Entry
- React Package Entry
- React DOM Entry
- Sonner Toast Entry
- Supabase SSR Entry
- Supabase JS Entry
- Tailwind Merge Entry
- Tailwind Animate Entry
- Zod Package Entry
- Supabase Banners Migration
- Tailwind Config
- Better Auth Account Table
- Quiz Attempts Table
- Better Auth User Table
- Grammar Rules Table
- Quiz Questions Table
- Video Lessons Table
- Vocabulary Table
- Better Auth Session Table
- Quizzes Table
- Profiles Table
- Subscription Plans Table
- Payment Settings Table
- Subscription Plans Reference
- Quiz Attempts Reference
- Better Auth Verification Table

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 207 edges
2. `cn()` - 151 edges
3. `getDataRepository()` - 120 edges
4. `DataRepository` - 93 edges
5. `Button` - 60 edges
6. `resolveMessage()` - 60 edges
7. `revalidateAppContent()` - 53 edges
8. `Badge()` - 39 edges
9. `getServerTranslator()` - 37 edges
10. `Lesson` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `AboutPage()` --calls--> `getDataRepository()`  [EXTRACTED]
  app/about/page.tsx → lib/data/index.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/accounting/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/admin/banners/page.tsx → lib/i18n/metadata.ts
- `AdminLayout()` --calls--> `requireAdmin()`  [EXTRACTED]
  app/admin/layout.tsx → lib/supabase/admin-guard.ts

## Import Cycles
- None detected.

## Communities (123 total, 43 thin omitted)

### Community 0 - "Admin Forms & Validation"
Cohesion: 0.05
Nodes (116): BillingSettingsForm(), handleRefreshRate(), onSubmit(), ContentActionBar(), ContentFormPanel(), emptyQuestion, GrammarContentPanel(), submit() (+108 more)

### Community 1 - "Curriculum & Dashboard Cards"
Cohesion: 0.07
Nodes (49): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS, LearnCategoryBackLink(), LearnCategoryHero() (+41 more)

### Community 2 - "Data Repository Interface"
Cohesion: 0.04
Nodes (6): DataRepository, fetchQuizManagementStats(), Banner, Payment, QuizQuestion, VideoLesson

### Community 3 - "Admin i18n Message Bundles"
Cohesion: 0.06
Nodes (25): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+17 more)

### Community 4 - "App Layouts & Navigation"
Cohesion: 0.07
Nodes (18): signOutAction(), AdminLayout(), UserNav(), AppHeader(), AppHeaderLeft(), AppShell(), AuthAsidePanel(), AuthMobileHeader() (+10 more)

### Community 5 - "Authentication Actions"
Cohesion: 0.08
Nodes (32): ActionResult, formatAuthErrorKey(), getClientIpForRateLimit(), signInAction(), signUpAction(), signUpWithPostgres(), { GET, POST }, generateMetadata() (+24 more)

### Community 6 - "Admin Data Tables"
Cohesion: 0.17
Nodes (28): STATUS_STYLES, DeleteConfirmDialog(), handleConfirm(), CONTENT_TYPES, pluralize(), QuizzesTable(), getInitials(), UserManagementPanel() (+20 more)

### Community 7 - "Learning Progress State"
Cohesion: 0.11
Nodes (21): QuizManager(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+13 more)

### Community 8 - "Admin Content Managers"
Cohesion: 0.09
Nodes (25): AdminContentHeader(), AdminBannersPageView(), BannerManagementPanel(), GrammarForm(), onSubmit(), GrammarManager(), GrammarTable(), VocabularyTable() (+17 more)

### Community 9 - "Admin Content Actions"
Cohesion: 0.06
Nodes (34): createContentGrammar(), createContentVideo(), createContentVocabulary(), BannerValues, billingSettingsSchema, BillingSettingsValues, contentGrammarSchema, contentVocabularySchema (+26 more)

### Community 10 - "Accounting Snapshots"
Cohesion: 0.10
Nodes (21): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+13 more)

### Community 11 - "Admin CRUD Actions"
Cohesion: 0.15
Nodes (29): createGrammarRule(), deleteGrammarRule(), updateGrammarRule(), createLesson(), deleteLesson(), updateLesson(), addQuizQuestion(), createQuizWithQuestions() (+21 more)

### Community 12 - "Payment Webhooks & Cron"
Cohesion: 0.13
Nodes (28): buildRecoveryDeps(), dynamic, GET(), supabaseFxStore(), dynamic, GET(), dynamic, GET() (+20 more)

### Community 13 - "Quiz Taking & Grading"
Cohesion: 0.11
Nodes (25): submitQuizAction(), buildInitialFeedback(), OPTION_LABELS, QuestionFeedback, QuizForm(), lockAnswer(), onSubmit(), useReducedMotion() (+17 more)

### Community 14 - "Local Dev Seed Data"
Cohesion: 0.12
Nodes (22): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, LOCAL_SEED, LocalDatabase, quizIds, backfillMissingCollections() (+14 more)

### Community 15 - "Currency & Pricing Format"
Cohesion: 0.11
Nodes (22): SubscriptionPlanCards(), pricingFor(), rialFor(), formatPaidAmount(), formatRialAsToman(), LOCALE_TAGS, BillingCurrency, centsToEur() (+14 more)

### Community 16 - "Postgres App Schema"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "Quiz Management Helpers"
Cohesion: 0.12
Nodes (25): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes() (+17 more)

### Community 18 - "Locale Configuration"
Cohesion: 0.14
Nodes (24): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale(), LOCALE_COOKIE_KEY (+16 more)

### Community 19 - "Payment Providers"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "Entitlements & Band Exams"
Cohesion: 0.11
Nodes (17): LanguageCoursePage(), PageProps, BandExamCard, LearnLanguageView(), BandExam, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS (+9 more)

### Community 21 - "Roles & Permissions"
Cohesion: 0.11
Nodes (19): RoleBadge(), PERMISSION_ROWS, RolesPermissionsPanel(), StatusBadge(), ManagedUser, PERMISSION_ROWS, UserProfileDialog(), UserQuizAttemptsPanel() (+11 more)

### Community 22 - "Learner Content Views"
Cohesion: 0.11
Nodes (11): VocabularyManager(), VideoLessonsGrid(), VideoPoster(), GrammarRulesList(), LessonDetailTabs(), LessonViewProps, QuizTabContent(), VocabularyFlashcards() (+3 more)

### Community 23 - "User Dashboard & Achievements"
Cohesion: 0.11
Nodes (20): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), StatCard(), UserDashboard(), AdminHeaderBadge(), daysRemaining() (+12 more)

### Community 24 - "Legacy Supabase Schema"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "TypeScript Config"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "Admin Billing Actions"
Cohesion: 0.19
Nodes (20): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), uploadBannerAction() (+12 more)

### Community 27 - "Dev Dependencies"
Cohesion: 0.08
Nodes (25): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+17 more)

### Community 28 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (23): better-auth, class-variance-authority, lucide-react, next-themes, dependencies, better-auth, class-variance-authority, lucide-react (+15 more)

### Community 29 - "Public Marketing Pages"
Cohesion: 0.11
Nodes (15): AboutPage(), generateMetadata(), generateMetadata(), generateMetadata(), generateMetadata(), ContactPage(), generateMetadata(), generateMetadata() (+7 more)

### Community 30 - "Checkout Flow"
Cohesion: 0.16
Nodes (16): CheckoutResult, recoverMyPendingPaymentsAction(), resolveOrigin(), startCheckoutAction(), CheckoutDialog(), handlePay(), PROVIDER_ICONS, PROVIDER_LABELS (+8 more)

### Community 31 - "shadcn Component Config"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "Confirmation Dialogs"
Cohesion: 0.22
Nodes (17): ConfirmActionDialog(), AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay (+9 more)

### Community 33 - "Accounting Dashboard"
Cohesion: 0.16
Nodes (15): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+7 more)

### Community 34 - "Subscription Plan Admin"
Cohesion: 0.15
Nodes (11): AdminSubscriptionPageView(), EntitlementSettingsPanel(), PlanActiveToggle(), SubscriptionPlanEditDialog(), discountedPrice(), SubscriptionPlanList(), Draft, draftFrom() (+3 more)

### Community 35 - "Data Source & Session Middleware"
Cohesion: 0.14
Nodes (16): updateLocalSession(), PUBLIC_ROUTES, updatePostgresSession(), DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw (+8 more)

### Community 36 - "Learning Path Routes"
Cohesion: 0.19
Nodes (15): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LearnCategoryView() (+7 more)

### Community 37 - "App Route Pages"
Cohesion: 0.25
Nodes (12): AdminPage(), AdminQuizzesPage(), generateMetadata(), DashboardPage(), generateMetadata(), MenuPage(), generateMetadata(), SubscriptionPage() (+4 more)

### Community 38 - "Subscription Data Access"
Cohesion: 0.11
Nodes (10): CurriculumLevelOverrideRow, AuthUser, LocalAuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, LocalizedText, Profile (+2 more)

### Community 39 - "Loading Skeletons"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "Admin Page Entrypoints"
Cohesion: 0.20
Nodes (11): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLanguagesPage(), AdminSubscriptionPage() (+3 more)

### Community 41 - "Local Session & Signing"
Cohesion: 0.21
Nodes (13): PUBLIC_ROUTES, clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, setLocalSessionUserId(), signSession(), toBase64Url() (+5 more)

### Community 42 - "Postgres Client & Pool"
Cohesion: 0.33
Nodes (13): getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool, query(), queryOne(), resolveConnectionString() (+5 more)

### Community 43 - "User Administration"
Cohesion: 0.23
Nodes (9): sendPasswordResetEmail(), updateUserAdminStatus(), updateUserRole(), updateUserStatus(), ChangeRoleDialog(), handleSave(), PendingActionType, UserRowActions() (+1 more)

### Community 44 - "Banner & Language Admin"
Cohesion: 0.21
Nodes (9): ACCEPTED_TYPES, AdminLanguagesPageView(), LanguageManagementPanel(), LockedContentNotice(), QuizCard(), Button, ButtonProps, LanguageToggle (+1 more)

### Community 45 - "Quiz Admin Tables"
Cohesion: 0.16
Nodes (8): LessonsTable(), AdminQuizzesPageView(), CreateContentSection(), QuizManagementTable(), renderStats(), toggleStatus(), EnrichedQuiz, getQuizAttemptStats()

### Community 46 - "Postgres Entitlements Schema"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "Supabase Billing Migration"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "Billing Periods & Renewal"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 49 - "Curriculum Level Overrides"
Cohesion: 0.35
Nodes (11): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), handleConfirm(), isLanguageSlug() (+3 more)

### Community 50 - "Server Action Guards"
Cohesion: 0.24
Nodes (8): cancelSubscriptionAction(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser, getProfileById, RoleSlug

### Community 51 - "Quiz Validation Schemas"
Cohesion: 0.27
Nodes (8): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), answerOptionSchema, createSubmitQuizSchema(), submitQuizSchema, SubmitQuizValues

### Community 52 - "Root Layout & PWA"
Cohesion: 0.22
Nodes (8): generateMetadata(), inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps

### Community 53 - "Deployment Manifest Copy"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "Payment Reconciliation"
Cohesion: 0.25
Nodes (7): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), reconcilePayments(), verify, verifyParamsFromReference

### Community 55 - "NPM Scripts"
Cohesion: 0.18
Nodes (10): name, private, scripts, build, dev, lint, start, test (+2 more)

### Community 56 - "PWA Manifest"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 57 - "Supabase Entitlements Migration"
Cohesion: 0.22
Nodes (7): public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payments, public.quizzes, public.subscriptions

### Community 58 - "Quiz Page Entry"
Cohesion: 0.31
Nodes (8): generateMetadata(), PageProps, QuizPage(), NoQuestionsMessage(), QuizPageIntro(), isQuizAccessible(), getLearnQuizHref(), mergeGradedQuestions()

### Community 59 - "Video Embed Parsing"
Cohesion: 0.33
Nodes (8): VideoCard(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "Local Content Sync Script"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "FX Rate Providers"
Cohesion: 0.22
Nodes (7): FxFetchResult, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote

### Community 62 - "Lesson Page & Navigation"
Cohesion: 0.33
Nodes (6): generateMetadata(), LessonPage(), PageProps, LessonView(), findLevelByOrderNumber(), resolveLessonNavigation()

### Community 63 - "Admin Dashboard View"
Cohesion: 0.38
Nodes (7): AdminDashboard(), languageLabel(), sectionLabel(), statusLabel(), getInitial(), LevelQuizRowDetails(), scoreBadgeClassName()

### Community 65 - "Vercel Config"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "Banner Upload Handlers"
Cohesion: 0.60
Nodes (5): BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 67 - "Deployment Vercel Copy"
Cohesion: 0.40
Nodes (4): buildCommand, framework, headers, installCommand

### Community 69 - "ESLint Config"
Cohesion: 0.50
Nodes (3): extends, next/core-web-vitals, next/typescript

### Community 70 - "Supabase Learning State Migration"
Cohesion: 0.50
Nodes (3): public.user_learning_state, public.lessons, public.profiles

## Knowledge Gaps
- **341 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AddCurriculumLevelResult` (+336 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `Admin Content Managers` to `Admin Forms & Validation`, `Curriculum & Dashboard Cards`, `App Layouts & Navigation`, `Admin Data Tables`, `Learning Progress State`, `Quiz Taking & Grading`, `Currency & Pricing Format`, `Entitlements & Band Exams`, `Roles & Permissions`, `Learner Content Views`, `User Dashboard & Achievements`, `Admin Billing Actions`, `Public Marketing Pages`, `Checkout Flow`, `Confirmation Dialogs`, `Accounting Dashboard`, `Subscription Plan Admin`, `Learning Path Routes`, `User Administration`, `Banner & Language Admin`, `Quiz Admin Tables`, `Quiz Page Entry`, `Video Embed Parsing`, `Lesson Page & Navigation`, `Admin Dashboard View`, `Banner Upload Handlers`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `Admin CRUD Actions` to `App Layouts & Navigation`, `Authentication Actions`, `Admin Content Actions`, `Payment Webhooks & Cron`, `Quiz Taking & Grading`, `Entitlements & Band Exams`, `Admin Billing Actions`, `Public Marketing Pages`, `Checkout Flow`, `Data Source & Session Middleware`, `Learning Path Routes`, `App Route Pages`, `Admin Page Entrypoints`, `Postgres Client & Pool`, `User Administration`, `Curriculum Level Overrides`, `Server Action Guards`, `Quiz Validation Schemas`, `Quiz Page Entry`, `Lesson Page & Navigation`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `DataRepository` connect `Data Repository Interface` to `Curriculum & Dashboard Cards`, `Learning Path Routes`, `App Route Pages`, `Subscription Data Access`, `Learning Progress State`, `Local Session & Signing`, `Accounting Snapshots`, `Admin CRUD Actions`, `Postgres Client & Pool`, `Quiz Taking & Grading`, `Local Dev Seed Data`, `Quiz Management Helpers`, `Learner Content Views`, `Checkout Flow`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _341 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin Forms & Validation` be split into smaller, more focused modules?**
  _Cohesion score 0.05083655083655084 - nodes in this community are weakly interconnected._
- **Should `Curriculum & Dashboard Cards` be split into smaller, more focused modules?**
  _Cohesion score 0.0669710806697108 - nodes in this community are weakly interconnected._
- **Should `Data Repository Interface` be split into smaller, more focused modules?**
  _Cohesion score 0.0430976430976431 - nodes in this community are weakly interconnected._