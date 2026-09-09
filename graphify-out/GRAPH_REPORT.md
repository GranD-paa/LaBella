# Graph Report - cursor P  (2026-09-09)

## Corpus Check
- 456 files · ~342,175 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2332 nodes · 6639 edges · 173 communities (113 shown, 60 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8102fda6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- data/repository.ts
- postgres/repository.ts
- DataRepository
- fa.ts
- app-shell.tsx
- better-auth.ts
- app/layout.tsx
- Lesson
- cn
- getDataRepository
- types/index.ts
- quiz-form.tsx
- supabase/repository.ts
- TierCapabilitiesPanel
- button.tsx
- pricing.ts
- 001_app_schema.sql
- app/page.tsx
- actions/content.ts
- providers/index.ts
- [category]/page.tsx
- add-curriculum-level-dialog.tsx
- jalali.ts
- useTranslations
- schema.sql
- compilerOptions
- seed.ts
- devDependencies
- dependencies
- edit-curriculum-level-dialog.tsx
- i18n/types.ts
- components.json
- user-dashboard.tsx
- curriculum/languages.ts
- checkout.ts
- refresh.ts
- requireSuperAdminAction
- content-form-panels.tsx
- data/index.ts
- page-skeletons.tsx
- middleware.ts
- curriculum/types.ts
- admin-schemas.ts
- admin.ts
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- blog/types.ts
- [slug]/page.tsx
- لندینگ‌پیج و بلاگ — سند تحویل
- local/repository.ts
- actions/auth.ts
- final-deployment/manifest.json
- otp-challenge.ts
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- phone-auth-form.tsx
- video-lessons-grid.tsx
- sync-local-content.mjs
- admin-accounting-page-view.tsx
- hero.tsx
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
- user-management-panel.tsx
- banner-image.ts
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- react
- react-dom
- dashboard-data.ts
- What You Must Do When Invoked
- 005_send_limits.sql
- action-guards.ts
- subscription-plan-cards.tsx
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
- landing.tsx
- existing-content-list.tsx
- validations/quiz.ts
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
- period.ts
- react-hook-form
- @radix-ui/react-avatar
- banner-upload-form.tsx
- [quiz_id]/page.tsx
- resolveMessage
- data-source.ts
- @radix-ui/react-tabs
- band-exams.test.ts
- quiz-sections.ts
- sonner
- three
- 006_banner_images.sql
- public.grammar_rules
- getServerTranslator
- Search engine visibility
- 008_phone_auth.sql
- actions/quiz.ts
- sms-test.mjs
- @radix-ui/react-label
- @radix-ui/react-slot
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- plans.ts

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 203 edges
2. `cn()` - 177 edges
3. `getDataRepository()` - 144 edges
4. `DataRepository` - 109 edges
5. `Button` - 62 edges
6. `resolveMessage()` - 53 edges
7. `revalidateAppContent()` - 48 edges
8. `Badge()` - 41 edges
9. `Lesson` - 38 edges
10. `getServerTranslator()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts
- `toggle()` --calls--> `setLandingLanguageVisibilityAction()`  [EXTRACTED]
  components/admin/landing/landing-language-panel.tsx → app/admin/actions/landing.ts
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  app/layout.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (173 total, 60 thin omitted)

### Community 0 - "data/repository.ts"
Cohesion: 0.12
Nodes (11): AuthUser, ProfileSummary, QuizAttemptWithRelations, QuizWithLessonTitle, attachGrammarPages(), GrammarPage, GrammarPageSummary, isObjectStorageConfigured() (+3 more)

### Community 1 - "postgres/repository.ts"
Cohesion: 0.16
Nodes (20): dynamic, recordVerifyAttempt(), VerifyGate, getAccountingSnapshot(), buildUpdate(), execute(), getPool(), globalForPool (+12 more)

### Community 2 - "DataRepository"
Cohesion: 0.04
Nodes (6): DataRepository, getLandingPricing(), GrammarRule, QuizQuestion, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 5 - "better-auth.ts"
Cohesion: 0.14
Nodes (22): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, isIranianMobile(), isIranianPhone(), looksGenerated() (+14 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.20
Nodes (9): instrumentSerif, inter, RootLayout(), vazirmatn, viewport, ServiceWorkerRegister(), Toaster(), ToasterProps (+1 more)

### Community 7 - "Lesson"
Cohesion: 0.15
Nodes (18): ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel(), findLevelByOrderNumber() (+10 more)

### Community 8 - "cn"
Cohesion: 0.15
Nodes (25): LessonsMonitor(), ConfirmActionDialog(), PendingActionType, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter() (+17 more)

### Community 9 - "getDataRepository"
Cohesion: 0.18
Nodes (25): uploadBannerAction(), createContentVideo(), createContentVocabulary(), deleteContentQuiz(), deleteContentVideo(), createGrammarRule(), deleteGrammarRule(), updateGrammarRule() (+17 more)

### Community 10 - "types/index.ts"
Cohesion: 0.14
Nodes (20): AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy(), build(), FX (+12 more)

### Community 11 - "quiz-form.tsx"
Cohesion: 0.14
Nodes (16): OPTION_KEYS, WizardQuestionFields(), ContactViewProps, buildInitialFeedback(), OPTION_LABELS, QuestionFeedback, QuizForm(), lockAnswer() (+8 more)

### Community 12 - "supabase/repository.ts"
Cohesion: 0.15
Nodes (9): DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS, PLAN_TEMPLATES, PlanTemplate, createClient(), Database, Payment (+1 more)

### Community 13 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 14 - "button.tsx"
Cohesion: 0.13
Nodes (28): BannerManagementPanel(), LANDMARK_LABELS, LANGUAGE_LABELS, CONTENT_TYPES, CreateContentSection(), stepForJump(), EntitlementSettingsPanel(), discountedPrice() (+20 more)

### Community 15 - "pricing.ts"
Cohesion: 0.12
Nodes (23): pricingFor(), rialFor(), BillingCurrency, centsToEur(), computePrice(), convertEurCentsToRial(), divRoundHalfUp(), eurToCents() (+15 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "app/page.tsx"
Cohesion: 0.14
Nodes (19): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, CourseDeck, DECKS (+11 more)

### Community 18 - "actions/content.ts"
Cohesion: 0.18
Nodes (22): abortGrammarUpload(), finishGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), deleteObject(), deleteObjects(), getBucket() (+14 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.12
Nodes (19): dynamic, POST(), manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, BODY, verifyStripeWebhook() (+11 more)

### Community 20 - "[category]/page.tsx"
Cohesion: 0.14
Nodes (20): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), LanguageCoursePage() (+12 more)

### Community 21 - "add-curriculum-level-dialog.tsx"
Cohesion: 0.24
Nodes (9): JalaliParts, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger (+1 more)

### Community 22 - "jalali.ts"
Cohesion: 0.12
Nodes (28): DateOfBirthField(), clampDay(), toPersianDigits(), BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn() (+20 more)

### Community 23 - "useTranslations"
Cohesion: 0.05
Nodes (52): AboutView(), TIMELINE_KEYS, VALUE_ICONS, AdminContentHeader(), AdminBannersPageView(), LessonsMonitorPageView(), GrammarTable(), LessonsTable() (+44 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "seed.ts"
Cohesion: 0.12
Nodes (10): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, LocalAuthUser, Banner, Subscription (+2 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, next-themes, dependencies, @aws-sdk/client-s3, gsap, next-themes, @radix-ui/react-alert-dialog (+19 more)

### Community 29 - "edit-curriculum-level-dialog.tsx"
Cohesion: 0.39
Nodes (10): LOCALES, DialogContent, DialogDescription, DialogFooter(), DialogHeader(), DialogOverlay, DialogTitle, FormItem (+2 more)

### Community 30 - "i18n/types.ts"
Cohesion: 0.13
Nodes (23): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), DEFAULT_LOCALE, getLocaleDefinition(), isAppLocale() (+15 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "user-dashboard.tsx"
Cohesion: 0.16
Nodes (12): Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), ContinueLearningCard(), QuizSubmittedBanner(), StatCard(), UserDashboard(), daysRemaining() (+4 more)

### Community 33 - "curriculum/languages.ts"
Cohesion: 0.13
Nodes (14): ENGLISH_LEVELS, GERMAN_LEVELS, ITALIAN_LEVELS, getLanguagesMissingCodes(), LANGUAGE_CODES, CATEGORY_DEFINITIONS, getLanguage(), LANGUAGES (+6 more)

### Community 34 - "checkout.ts"
Cohesion: 0.11
Nodes (29): CheckoutResult, resolveOrigin(), startCheckoutAction(), dynamic, GET(), supabaseFxStore(), dynamic, GET() (+21 more)

### Community 35 - "refresh.ts"
Cohesion: 0.16
Nodes (10): FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload, tgjuProvider, TgjuQuote (+2 more)

### Community 36 - "requireSuperAdminAction"
Cohesion: 0.20
Nodes (16): recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction(), setLandingLanguageVisibilityAction() (+8 more)

### Community 37 - "content-form-panels.tsx"
Cohesion: 0.13
Nodes (17): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+9 more)

### Community 38 - "data/index.ts"
Cohesion: 0.16
Nodes (12): BlogFormState, deleteBlogPostAction(), optionalText, optionalUrl, postSchema, saveBlogPostAction(), AdminBlogEditorPage(), metadata (+4 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "middleware.ts"
Cohesion: 0.13
Nodes (22): updateLocalSession(), clearLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url(), verifyLocalSessionToken() (+14 more)

### Community 41 - "curriculum/types.ts"
Cohesion: 0.09
Nodes (39): DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, CategoryWatermark(), ComingSoonLanguage(), CourseLevelAccordion(), COUNT_MESSAGE_KEYS (+31 more)

### Community 42 - "admin-schemas.ts"
Cohesion: 0.16
Nodes (18): ContentVocabularyValues, createAddCurriculumLevelSchema(), createContentVocabularySchema(), createCurriculumLevelSchema(), createGrammarRuleSchema(), createLessonSchema(), createQuizQuestionSchema(), createQuizSchema() (+10 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (33): updateEntitlementSettingsAction(), updateSubscriptionPlanAction(), onSubmit(), toggle(), onSubmit(), bannerSchema, BannerValues, BillingSettingsValues (+25 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.17
Nodes (19): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), renameCurriculumLevelAction(), resetCurriculumLevelAction(), setLanguageAvailabilityAction(), handleConfirm() (+11 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.12
Nodes (24): BandExam, groupLevelExamsByBand(), cefrBandOf(), EnrichedQuiz, fetchEnrichedQuizzes(), deriveQuizMetadataFromLesson(), enrichQuiz(), filterQuizzes() (+16 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "blog/types.ts"
Cohesion: 0.17
Nodes (6): BlogPostCard(), formatBlogDate(), BlogCategory, BlogPost, BlogPostInput, BlogPostStatus

### Community 49 - "[slug]/page.tsx"
Cohesion: 0.09
Nodes (25): BlogIndexPage(), metadata, dynamic, GET(), xmlEscape(), BlogPostPage(), generateMetadata(), Props (+17 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, الف) مایگریشن دیتابیس — بلاک‌کننده, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "local/repository.ts"
Cohesion: 0.14
Nodes (26): buildRecoveryDeps(), DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), computeRenewalPeriod() (+18 more)

### Community 52 - "actions/auth.ts"
Cohesion: 0.13
Nodes (22): ActionResult, decideAndSend(), getClientIpForRateLimit(), padTiming(), refusalKey(), requestPhoneCode(), signOutAction(), UserNav() (+14 more)

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

### Community 58 - "phone-auth-form.tsx"
Cohesion: 0.26
Nodes (11): getAuthChallenge(), OtpInput(), absorb(), focusBox(), localFormat(), PhoneAuthForm(), fail(), submitPhone() (+3 more)

### Community 59 - "video-lessons-grid.tsx"
Cohesion: 0.29
Nodes (9): VideoCard(), VideoPoster(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed (+1 more)

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "admin-accounting-page-view.tsx"
Cohesion: 0.13
Nodes (21): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+13 more)

### Community 62 - "hero.tsx"
Cohesion: 0.18
Nodes (9): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+1 more)

### Community 63 - "billing-settings-form.tsx"
Cohesion: 0.23
Nodes (16): LessonPicker(), Values, FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue, FormItemContext (+8 more)

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "phone-accounts.ts"
Cohesion: 0.12
Nodes (19): completeProfile(), destinationFor(), verifyPhoneCode(), welcomeHref(), GET(), generateMetadata(), LoginPage(), parseLoginRedirect() (+11 more)

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
Nodes (22): DayMeter(), GoldChip(), GoldTile(), IndexDial(), LiquidCard(), SectionBloom(), StepDisc(), StepTrail() (+14 more)

### Community 83 - "user-management-panel.tsx"
Cohesion: 0.29
Nodes (14): STATUS_STYLES, DeleteConfirmDialog(), getInitials(), UserManagementPanel(), getScoreBadgeClass(), QuizAttemptHistoryRow, QuizHistoryTable(), Table (+6 more)

### Community 84 - "banner-image.ts"
Cohesion: 0.24
Nodes (8): ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES, validateBannerImage(), ValidatedBannerImage, matchesImageSignature(), SIGNATURE_CHECKS

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (19): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+11 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 90 - "dashboard-data.ts"
Cohesion: 0.17
Nodes (7): ManagedUser, buildLearnerEngagementMetrics(), AdminDashboardData, buildAchievements(), fetchAdminDashboardData(), fetchUserDashboardData(), fetchQuizManagementStats()

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "action-guards.ts"
Cohesion: 0.13
Nodes (17): cancelSubscriptionAction(), recoverMyPendingPaymentsAction(), saveGrammarReadingProgress(), GuardFail, GuardOk, requireAdminAction(), requireAuthenticatedAction(), getAuthUser (+9 more)

### Community 94 - "subscription-plan-cards.tsx"
Cohesion: 0.19
Nodes (14): CheckoutDialog(), PROVIDER_ICONS, PROVIDER_LABELS, PLAN_ICONS, SubscriptionPlanCards(), SubscriptionView(), SubscriptionViewProps, formatRialAsToman() (+6 more)

### Community 95 - "lessons-monitor.tsx"
Cohesion: 0.12
Nodes (19): LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, add(), BandCoverage, buildContentCoverage(), ContentCoverageInput (+11 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "landing.tsx"
Cohesion: 0.27
Nodes (12): LandingHero(), Landing(), PricingFallback(), PricingSection(), LandingDay(), LandingFeatures(), LandingHurdles(), LandingLesson() (+4 more)

### Community 125 - "existing-content-list.tsx"
Cohesion: 0.23
Nodes (10): loadLessonContent(), ExistingContentList(), REMOVE, CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, emptyLessonContent() (+2 more)

### Community 126 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

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

### Community 146 - "period.ts"
Cohesion: 0.29
Nodes (8): addBillingMonths(), BillingPeriod, computeGraceDeadline(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, resolveStatusFromDates(), SubscriptionStatus

### Community 149 - "banner-upload-form.tsx"
Cohesion: 0.38
Nodes (6): ACCEPTED_TYPES, BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 150 - "[quiz_id]/page.tsx"
Cohesion: 0.12
Nodes (18): generateMetadata(), PageProps, QuizPage(), NoQuestionsMessage(), QuizPageIntro(), formatUserAnswerLabel(), OPTION_FIELDS, QUIZ_ATTEMPT_BREAKDOWN_KEY (+10 more)

### Community 151 - "resolveMessage"
Cohesion: 0.07
Nodes (25): BillingSettingsForm(), handleRefreshRate(), onSubmit(), handleConfirm(), GrammarEditDialog(), onSubmit(), GrammarForm(), onSubmit() (+17 more)

### Community 152 - "data-source.ts"
Cohesion: 0.31
Nodes (7): DataSource, getDataSource(), isPostgresDataMode(), isSupabaseDataMode(), raw, loadModule(), getActiveDataSourceLabel()

### Community 155 - "quiz-sections.ts"
Cohesion: 0.47
Nodes (5): getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, QuizSectionSlug

### Community 160 - "getServerTranslator"
Cohesion: 0.06
Nodes (56): generateMetadata(), AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminBlogPage() (+48 more)

### Community 161 - "Search engine visibility"
Cohesion: 0.40
Nodes (4): Opening the site at launch, Search engine visibility, What "hidden" actually does, What is public, and what is not

### Community 162 - "008_phone_auth.sql"
Cohesion: 0.33
Nodes (4): on_user_created, public.otp_attempts, public.otp_challenges, public.handle_new_user

### Community 163 - "actions/quiz.ts"
Cohesion: 0.70
Nodes (4): submitQuizAction(), buildQuizAttemptAnswersJson(), gradeAnswer(), LEVEL_EXAM_SECTION

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 172 - "plans.ts"
Cohesion: 0.50
Nodes (3): SUBSCRIPTION_PLAN_META, SubscriptionPlanId, SubscriptionPlanMeta

## Knowledge Gaps
- **525 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `optionalText` (+520 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **60 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useTranslations()` connect `useTranslations` to `cn`, `getDataRepository`, `quiz-form.tsx`, `TierCapabilitiesPanel`, `button.tsx`, `banner-upload-form.tsx`, `add-curriculum-level-dialog.tsx`, `resolveMessage`, `[quiz_id]/page.tsx`, `edit-curriculum-level-dialog.tsx`, `user-dashboard.tsx`, `getServerTranslator`, `requireSuperAdminAction`, `content-form-panels.tsx`, `curriculum/types.ts`, `actions/auth.ts`, `phone-auth-form.tsx`, `video-lessons-grid.tsx`, `admin-accounting-page-view.tsx`, `billing-settings-form.tsx`, `phone-accounts.ts`, `user-management-panel.tsx`, `subscription-plan-cards.tsx`, `lessons-monitor.tsx`, `landing.tsx`, `existing-content-list.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/repository.ts`, `app-shell.tsx`, `app/page.tsx`, `actions/content.ts`, `[category]/page.tsx`, `[quiz_id]/page.tsx`, `data-source.ts`, `getServerTranslator`, `checkout.ts`, `actions/quiz.ts`, `requireSuperAdminAction`, `data/index.ts`, `admin.ts`, `curriculum-levels.ts`, `[slug]/page.tsx`, `actions/auth.ts`, `phone-accounts.ts`, `action-guards.ts`, `existing-content-list.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app/layout.tsx`, `quiz-form.tsx`, `button.tsx`, `banner-upload-form.tsx`, `add-curriculum-level-dialog.tsx`, `useTranslations`, `edit-curriculum-level-dialog.tsx`, `user-dashboard.tsx`, `data/index.ts`, `curriculum/types.ts`, `[slug]/page.tsx`, `phone-auth-form.tsx`, `admin-accounting-page-view.tsx`, `billing-settings-form.tsx`, `sections.tsx`, `user-management-panel.tsx`, `subscription-plan-cards.tsx`, `lessons-monitor.tsx`, `landing.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _525 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `data/repository.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11578947368421053 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.03934426229508197 - nodes in this community are weakly interconnected._
- **Should `fa.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05878084179970972 - nodes in this community are weakly interconnected._