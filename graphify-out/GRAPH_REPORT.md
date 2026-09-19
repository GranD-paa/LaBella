# Graph Report - cursor P  (2026-09-19)

## Corpus Check
- 544 files · ~423,882 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2981 nodes · 8601 edges · 209 communities (141 shown, 68 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0034dada`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tick/route.ts
- postgres/client.ts
- DataRepository
- fa.ts
- app-shell.tsx
- user-management-panel.tsx
- jalali.ts
- Lesson
- subscription-plan-edit-dialog.tsx
- ingest/route.ts
- seed.ts
- category/[slug]/page.tsx
- curriculum/languages.ts
- middleware.ts
- button.tsx
- blog-image.ts
- 001_app_schema.sql
- period.ts
- user-row-actions.tsx
- providers/index.ts
- robots-metadata.test.ts
- jev-panel.tsx
- better-auth.ts
- getDataRepository
- schema.sql
- compilerOptions
- types/index.ts
- devDependencies
- dependencies
- admin/page.tsx
- app/layout.tsx
- components.json
- pipeline.ts
- blog.ts
- cn
- local/repository.ts
- blog-shell.tsx
- action-guards.test.ts
- getServerTranslator
- page-skeletons.tsx
- agent/config.ts
- arvan.ts
- markdown.ts
- admin.ts
- curriculum-levels.ts
- quiz-management/types.ts
- 002_entitlements.sql
- 20260804120000_billing_accounting.sql
- [language]/page.tsx
- useTranslations
- لندینگ‌پیج و بلاگ — سند تحویل
- blog/[slug]/page.tsx
- phone-auth-form.tsx
- final-deployment/manifest.json
- isLocalDataMode
- scripts
- public/manifest.json
- 20260813120000_entitlements_and_plan_periods.sql
- billing-settings-form.tsx
- video-embed.ts
- sync-local-content.mjs
- landing/pricing.ts
- resolveMessage
- RoleSlug
- billing/schema.test.ts
- vercel.json
- validations/auth.ts
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
- actions/auth.ts
- pg
- permissions/roles.ts
- plate.tsx
- @radix-ui/react-dialog
- send-limit.ts
- Laparli
- server-locale.ts
- agent-panel.tsx
- content-form-panels.tsx
- What You Must Do When Invoked
- 005_send_limits.sql
- otp-challenge.ts
- app/page.tsx
- content-coverage.ts
- 20260730120000_banners.sql
- tailwind.config.ts
- better-auth
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
- refresh.ts
- agent/store.ts
- [quiz_id]/page.tsx
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
- create-content-section.tsx
- data/repository.ts
- landing/page.tsx
- scheduler.ts
- utils.ts
- blog/[id]/page.tsx
- @radix-ui/react-avatar
- admin/layout.tsx
- validations/quiz.ts
- wizard-question-fields.tsx
- @radix-ui/react-dropdown-menu
- blog-agent.mjs
- subscription-view.tsx
- @radix-ui/react-slot
- three
- 006_banner_images.sql
- public.grammar_rules
- Rules
- Search engine visibility
- 008_phone_auth.sql
- hero.tsx
- sms-test.mjs
- reconcile.ts
- react-dom
- @supabase/supabase-js
- export-locales.mjs
- public.profiles
- public.send_attempts
- Blog agent — handoff
- sonner
- local/store.ts
- actions/content.ts
- TierCapabilitiesPanel
- run-migration.mjs
- money.ts
- 010_roles_rebuild.sql
- public.lessons
- banner-upload-form.tsx
- blog-share.tsx
- public.profiles
- 009_blog_refactor.sql
- public.subscriptions
- public.subscription_events
- ConnectionForm
- categories.ts
- 011_blog_agent.sql
- blog-agent.ts
- getLocaleDefinition
- quiz-form.tsx
- zod
- app/blog/page.tsx
- resolveRolePermissions
- topic-queue.tsx
- entitlements/schema.test.ts
- advance-learning.ts
- next-themes
- 012_blog_agent_settings.sql
- next
- @radix-ui/react-radio-group
- @radix-ui/react-separator
- @radix-ui/react-tabs
- react
- tailwind-merge
- public.blog_agent_settings

## God Nodes (most connected - your core abstractions)
1. `useTranslations()` - 213 edges
2. `cn()` - 194 edges
3. `getDataRepository()` - 168 edges
4. `DataRepository` - 121 edges
5. `Button` - 77 edges
6. `requireAdminPermission()` - 69 edges
7. `resolveMessage()` - 59 edges
8. `revalidateAppContent()` - 53 edges
9. `Card` - 38 edges
10. `CardContent` - 38 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/login/page.tsx → lib/i18n/metadata.ts
- `generateMetadata()` --calls--> `createPageMetadata()`  [EXTRACTED]
  app/(auth)/welcome/page.tsx → lib/i18n/metadata.ts
- `runTest()` --calls--> `testConnectionAction()`  [EXTRACTED]
  components/admin/blog/agent/connection-form.tsx → app/admin/actions/blog-agent.ts
- `BlogPostEditor()` --indirect_call--> `saveBlogPostAction()`  [INFERRED]
  components/admin/blog/blog-post-editor.tsx → app/admin/actions/blog.ts
- `remove()` --calls--> `deleteBlogPostAction()`  [EXTRACTED]
  components/admin/blog/blog-post-list.tsx → app/admin/actions/blog.ts

## Import Cycles
- None detected.

## Communities (209 total, 68 thin omitted)

### Community 0 - "tick/route.ts"
Cohesion: 0.14
Nodes (18): dynamic, GET(), maxDuration, POST(), wrongDataSource(), dynamic, GET(), dynamic (+10 more)

### Community 1 - "postgres/client.ts"
Cohesion: 0.09
Nodes (28): dynamic, dynamic, recordVerifyAttempt(), VerifyGate, ProfileDetails, ProfileState, saveProfile(), SaveProfileResult (+20 more)

### Community 2 - "DataRepository"
Cohesion: 0.03
Nodes (8): BlogImage, BlogPost, DataRepository, GrammarRule, Payment, Profile, VideoLesson, Vocabulary

### Community 3 - "fa.ts"
Cohesion: 0.06
Nodes (26): adminAccountingEn, adminAccountingFa, adminAccountingIt, adminBannersEn, adminBannersFa, adminBannersIt, adminContentEn, adminContentFa (+18 more)

### Community 4 - "app-shell.tsx"
Cohesion: 0.09
Nodes (4): AppShell(), AuthHeaderControls(), BrandLogo(), BrandMark()

### Community 5 - "user-management-panel.tsx"
Cohesion: 0.22
Nodes (17): STATUS_STYLES, DeleteConfirmDialog(), LessonsTable(), AccountTierCell(), AccountTierCellData, getInitials(), UserManagementPanel(), VocabularyTable() (+9 more)

### Community 6 - "jalali.ts"
Cohesion: 0.16
Nodes (21): DateOfBirthField(), clampDay(), JalaliParts, BREAKS, div(), GregorianDate, gregorianToJalali(), gregorianToJdn() (+13 more)

### Community 7 - "Lesson"
Cohesion: 0.11
Nodes (21): isCategorySlug(), ContinueLearningProgress, resolveContinueLearningPath(), italian, languages, getLevelCheckpointQuizzes(), isLevelPassed(), resolveNextIncompleteLevel() (+13 more)

### Community 8 - "subscription-plan-edit-dialog.tsx"
Cohesion: 0.21
Nodes (17): LOCALES, ManagedUser, ContactViewProps, PROVIDER_ICONS, PROVIDER_LABELS, DialogContent, DialogDescription, DialogFooter() (+9 more)

### Community 9 - "ingest/route.ts"
Cohesion: 0.20
Nodes (16): dynamic, ingestSchema, maxDuration, optional, POST(), sniffImageType(), storeCover(), getAgentConfig() (+8 more)

### Community 10 - "seed.ts"
Cohesion: 0.12
Nodes (15): DEFAULT_PAYMENT_SETTINGS, DEFAULT_SUBSCRIPTION_TIERS, lessonIds, LOCAL_DEV_CREDENTIALS, quizIds, DEFAULT_SUBSCRIPTION_PAGE_CONTENT, DEFAULT_SUBSCRIPTION_PLANS, LANGUAGE_SLUGS (+7 more)

### Community 11 - "category/[slug]/page.tsx"
Cohesion: 0.14
Nodes (22): postSchema, BlogCategoryPage(), findCategory(), generateMetadata(), Props, BlogLanguagePage(), dynamic, generateMetadata() (+14 more)

### Community 12 - "curriculum/languages.ts"
Cohesion: 0.10
Nodes (25): CategoryPage(), generateMetadata(), PageProps, generateMetadata(), LevelPage(), PageProps, generateMetadata(), getLanguageWithAvailability() (+17 more)

### Community 13 - "middleware.ts"
Cohesion: 0.11
Nodes (24): CompleteProfileForm(), onSubmit(), updateLocalSession(), getLocalSessionUserId(), getSessionSecret(), LOCAL_SESSION_COOKIE, signSession(), toBase64Url() (+16 more)

### Community 14 - "button.tsx"
Cohesion: 0.15
Nodes (30): TestState, SECTIONS, GATE_OUTCOME, RUN_STATUS, ConfirmDialog(), Field(), LANDMARK_LABELS, LANGUAGE_LABELS (+22 more)

### Community 15 - "blog-image.ts"
Cohesion: 0.17
Nodes (10): ALLOWED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ROUTE, blogImageIdFromUrl(), ImageDimensions, isBlogImageUrl(), MAX_BLOG_IMAGE_BYTES, readImageDimensions(), readJpegDimensions() (+2 more)

### Community 16 - "001_app_schema.sql"
Cohesion: 0.11
Nodes (29): on_user_created, public.banners, public.cancel_my_subscription(), public.create_pending_payment(), public.curriculum_level_overrides, public.fail_payment(), public.fx_rates, public.grammar_rules (+21 more)

### Community 17 - "period.ts"
Cohesion: 0.27
Nodes (10): addBillingMonths(), BillingPeriod, computeGraceDeadline(), computeRenewalPeriod(), daysInUtcMonth(), daysUntil(), ENTITLED_STATUSES, isEntitled() (+2 more)

### Community 18 - "user-row-actions.tsx"
Cohesion: 0.16
Nodes (23): countSuperAdmins(), loadTarget(), updateUserAdminStatus(), updateUserAssignedLanguages(), updateUserRole(), updateUserStatus(), AssignLanguagesDialog(), handleSave() (+15 more)

### Community 19 - "providers/index.ts"
Cohesion: 0.17
Nodes (15): manualProvider, PROVIDERS, stripeProvider, StripeWebhookEvent, CheckoutRequest, CheckoutResponse, PaymentProvider, VerifyRequest (+7 more)

### Community 21 - "jev-panel.tsx"
Cohesion: 0.10
Nodes (35): reviewTextAction(), saveGateSettingsAction(), fa(), JevPanel(), save(), ManualReview(), run(), MODES (+27 more)

### Community 22 - "better-auth.ts"
Cohesion: 0.14
Nodes (22): { GET, POST }, assertVerifiablePhone(), auth, VerifiableUser, POOL_OPTIONS, isIranianMobile(), isIranianPhone(), looksGenerated() (+14 more)

### Community 23 - "getDataRepository"
Cohesion: 0.10
Nodes (56): submitQuizAction(), recordManualPaymentAction(), refreshFxRateAction(), refundPaymentAction(), updateBillingSettingsAction(), deleteBannerAction(), reorderBannerAction(), updateBannerStatusAction() (+48 more)

### Community 24 - "schema.sql"
Cohesion: 0.10
Nodes (18): private.is_admin(), protect_profile_privileged_fields, public.banners, public.curriculum_level_overrides, public.grammar_rules, public.language_settings, public.lessons, public.profiles (+10 more)

### Community 25 - "compilerOptions"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 26 - "types/index.ts"
Cohesion: 0.11
Nodes (21): VocabularyManager(), VideoPoster(), AccountingInput, buildAccountingSnapshot(), monthKey(), recentMonthKeys(), sliceBy(), sumBy() (+13 more)

### Community 27 - "devDependencies"
Cohesion: 0.07
Nodes (27): @electric-sql/pglite, eslint, eslint-config-next, devDependencies, @electric-sql/pglite, eslint, eslint-config-next, postcss (+19 more)

### Community 28 - "dependencies"
Cohesion: 0.07
Nodes (27): @aws-sdk/client-s3, gsap, @hookform/resolvers, lucide-react, nodemailer, dependencies, @aws-sdk/client-s3, gsap (+19 more)

### Community 29 - "admin/page.tsx"
Cohesion: 0.16
Nodes (20): AdminBlogPage(), metadata, AdminPage(), generateMetadata(), RolePermissionsContext, RolePermissionsProvider(), TierReference, readPhoneNumbers() (+12 more)

### Community 30 - "app/layout.tsx"
Cohesion: 0.14
Nodes (15): generateMetadata(), instrumentSerif, inter, RootLayout(), vazirmatn, viewport, dynamic, GET() (+7 more)

### Community 31 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 32 - "pipeline.ts"
Cohesion: 0.08
Nodes (37): runTopicNowAction(), BlogCta(), TokenUsage, costToman(), MODEL_RATES, ModelRate, loadAgentConfig(), loadConfigOrReason() (+29 more)

### Community 33 - "blog.ts"
Cohesion: 0.18
Nodes (13): BlogFormState, BlogImageUploadState, deleteBlogImageAction(), optionalText, optionalUrl, resolveUploadError(), updateBlogImageAltAction(), uploadBlogImageAction() (+5 more)

### Community 34 - "cn"
Cohesion: 0.07
Nodes (31): CheckRow(), Counter(), EntitlementSettingsPanel(), RoleBadge(), useRolePermissions(), StatusBadge(), UserProfileDialog(), UserQuizAttemptsPanel() (+23 more)

### Community 35 - "local/repository.ts"
Cohesion: 0.25
Nodes (12): buildRecoveryDeps(), dynamic, GET(), markFailed(), redirectToResult(), settle(), clearLocalSession(), BANNER_UPLOAD_DIR (+4 more)

### Community 36 - "blog-shell.tsx"
Cohesion: 0.24
Nodes (9): BlogShell(), NavChip(), BLOG_THEME_ATTRIBUTE, BLOG_THEME_STORAGE_KEY, BlogTheme, BlogThemeScript(), BlogThemeToggle(), toggle() (+1 more)

### Community 37 - "action-guards.test.ts"
Cohesion: 0.16
Nodes (11): cancelSubscriptionAction(), resolveOrigin(), startCheckoutAction(), saveGrammarReadingProgress(), handlePay(), requireAdminAction(), requireAuthenticatedAction(), requireSuperAdminAction() (+3 more)

### Community 38 - "getServerTranslator"
Cohesion: 0.08
Nodes (38): generateMetadata(), AdminAccountingPage(), generateMetadata(), AdminBannersPage(), generateMetadata(), AdminLessonsMonitorPage(), generateMetadata(), AdminQuizzesPage() (+30 more)

### Community 39 - "page-skeletons.tsx"
Cohesion: 0.15
Nodes (5): AdminSkeleton(), DashboardSkeleton(), LessonDetailSkeleton(), ProfileSkeleton(), QuizSkeleton()

### Community 40 - "agent/config.ts"
Cohesion: 0.13
Nodes (20): saveConnectionAction(), AiConnection, DEFAULT_AI_BASE_URL, AgentConfig, ApiKeyState, flag(), ResolvedAgentConfig, resolveLayers() (+12 more)

### Community 41 - "arvan.ts"
Cohesion: 0.19
Nodes (20): ACCEPTED_IMAGE_TYPES, AiError, asString(), chatJSON(), ChatResult, decodeImagePayload(), extractDataUrl(), findImage() (+12 more)

### Community 42 - "markdown.ts"
Cohesion: 0.16
Nodes (15): absolute(), dynamic, GET(), xmlEscape(), BlogToc(), publishArticle(), countWords(), createBlogRenderer() (+7 more)

### Community 43 - "admin.ts"
Cohesion: 0.06
Nodes (31): BannerValues, billingSettingsSchema, BillingSettingsValues, ContentVocabularyValues, entitlementSettingsSchema, EntitlementSettingsValues, grammarRuleSchema, GrammarRuleValues (+23 more)

### Community 44 - "curriculum-levels.ts"
Cohesion: 0.17
Nodes (19): addCurriculumLevelAction(), AddCurriculumLevelResult, deleteCurriculumLevelAction(), isCefrBand(), resetCurriculumLevelAction(), AdminLanguagesPage(), generateMetadata(), AddCurriculumLevelDialog() (+11 more)

### Community 45 - "quiz-management/types.ts"
Cohesion: 0.11
Nodes (25): BandExam, LevelSlug, getQuizSectionDescriptionKey(), getQuizSectionTitleKey(), isQuizSectionSlug(), SECTION_SLUGS, deriveQuizMetadataFromLesson(), enrichQuiz() (+17 more)

### Community 46 - "002_entitlements.sql"
Cohesion: 0.18
Nodes (11): public.create_pending_payment(), public.list_my_pending_payments(), public.list_stale_pending_payments(), public.record_quiz_attempt(), public.subscription_tiers, public.payment_settings, public.payments, public.quizzes (+3 more)

### Community 47 - "20260804120000_billing_accounting.sql"
Cohesion: 0.21
Nodes (8): public.fx_rates, public.payment_settings, public.payments, public.refunds, public.subscription_events, public.subscriptions, public.webhook_events, auth.users

### Community 48 - "[language]/page.tsx"
Cohesion: 0.10
Nodes (16): LanguageCoursePage(), PageProps, groupLevelExamsByBand(), LESSONS, TEN_A1_LEVELS, ALL_UNLOCKED, cefrBandOf(), cheapestTierUnlocking() (+8 more)

### Community 49 - "useTranslations"
Cohesion: 0.09
Nodes (29): AdminContentHeader(), GrammarManager(), GrammarTable(), AdminLanguagesPageView(), CurriculumLevelManager(), LanguageManagementPanel(), PlanActiveToggle(), Mark() (+21 more)

### Community 50 - "لندینگ‌پیج و بلاگ — سند تحویل"
Cohesion: 0.09
Nodes (22): ابزارهایی که **همین الان** روی دیسک هستند, ~~الف) مایگریشن دیتابیس~~ — انجام شد ۱۴۰۵/۰۶/۲۰, ب) فایل لوگو — بلاک‌کننده, دو تلهٔ فنی که باید بداند, فایل‌های تغییریافته, فایل‌های جدید, لندینگ‌پیج و بلاگ — سند تحویل, مسیر پیشنهادی (ترکیبی) (+14 more)

### Community 51 - "blog/[slug]/page.tsx"
Cohesion: 0.20
Nodes (18): BlogPostPage(), generateMetadata(), Props, BlogPostList(), remove(), BlogCardVariant, BlogPostCard(), Meta() (+10 more)

### Community 52 - "phone-auth-form.tsx"
Cohesion: 0.19
Nodes (15): getAuthChallenge(), OtpInput(), absorb(), focusBox(), localFormat(), ltr(), PhoneAuthForm(), fail() (+7 more)

### Community 53 - "final-deployment/manifest.json"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, scope, short_name (+2 more)

### Community 54 - "isLocalDataMode"
Cohesion: 0.16
Nodes (16): GET(), generateMetadata(), LoginPage(), parseLoginRedirect(), generateMetadata(), WelcomePage(), WelcomePreviewPage(), getSafeRedirectPath() (+8 more)

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
Cohesion: 0.22
Nodes (17): LessonPicker(), VocabularyForm(), onSubmit(), Values, FormControl, FormDescription, FormField(), FormFieldContext (+9 more)

### Community 59 - "video-embed.ts"
Cohesion: 0.33
Nodes (8): VideoCard(), isSafeId(), parseAparat(), parseVimeo(), parseYouTube(), toVideoEmbed(), VideoEmbed, VideoProvider

### Community 60 - "sync-local-content.mjs"
Cohesion: 0.20
Nodes (8): accounts, DIRECT, EXPORT_FILE, roleByUser, ROOT, store, STORE_FILE, summary

### Community 61 - "landing/pricing.ts"
Cohesion: 0.13
Nodes (16): SubscriptionPlanCards(), pricingFor(), rialFor(), formatRialAsToman(), centsToEur(), convertEurCentsToRial(), rialToToman(), formatEur() (+8 more)

### Community 62 - "resolveMessage"
Cohesion: 0.10
Nodes (21): BillingSettingsForm(), handleRefreshRate(), onSubmit(), handleConfirm(), EditCurriculumLevelDialog(), onSubmit(), LessonEditDialog(), onSubmit() (+13 more)

### Community 63 - "RoleSlug"
Cohesion: 0.29
Nodes (8): orderUsersForTable(), roleRank(), account(), learners(), visible(), VISIBLE_USER_LIMIT, ROLE_SLUGS, RoleSlug

### Community 65 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, crons, framework, headers, installCommand

### Community 66 - "validations/auth.ts"
Cohesion: 0.17
Nodes (13): isValidJalaliDate(), birthDateSchema, completeProfileSchema, CompleteProfileValues, isVerifiablePhone(), latinName(), otpCodeSchema, phoneSchema (+5 more)

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

### Community 80 - "actions/auth.ts"
Cohesion: 0.15
Nodes (21): ActionResult, completeProfile(), decideAndSend(), describeVerifyFailure(), destinationFor(), getClientIpForRateLimit(), padTiming(), refusalKey() (+13 more)

### Community 83 - "permissions/roles.ts"
Cohesion: 0.09
Nodes (26): ADMIN_ROLE_SLUGS, ALLOWED, canEditRolePermissions(), EDITABLE_ROLE_SLUGS, EditableRoleSlug, isEditableRole(), LOCKED_PERMISSIONS, MAX_SUPER_ADMINS (+18 more)

### Community 84 - "plate.tsx"
Cohesion: 0.11
Nodes (29): AdminBannersPageView(), BannerManagementPanel(), LessonsMonitorPageView(), Achievement, ACHIEVEMENT_ICONS, AchievementsSection(), AdminDashboard(), getInitial() (+21 more)

### Community 86 - "send-limit.ts"
Cohesion: 0.14
Nodes (18): getTransport(), sendEmail(), claimSend(), countAndClaim(), Counts, decideEmail(), decideSms(), PHONE_LADDER_MS (+10 more)

### Community 87 - "Laparli"
Cohesion: 0.08
Nodes (24): App identity (PWA), Build for production, Deploy to Vercel, Environment variables, File map, Laparli — Deployment Guide, Performance, Post-deploy checklist (+16 more)

### Community 88 - "server-locale.ts"
Cohesion: 0.17
Nodes (20): DEFAULT_LOCALE, isAppLocale(), LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, LocaleDefinition, LOCALES, fa, t (+12 more)

### Community 89 - "agent-panel.tsx"
Cohesion: 0.10
Nodes (29): AccountingKpis(), Tile(), AdminAccountingPageView(), BreakdownList(), PaymentsLedger(), handleExport(), toCsv(), RevenueChart() (+21 more)

### Community 90 - "content-form-panels.tsx"
Cohesion: 0.07
Nodes (38): ContentActionBar(), ContentFormPanel(), emptyGrammarEntry(), emptyQuestion, GrammarContentPanel(), GrammarEntry, GrammarEntryFields(), GrammarProgress (+30 more)

### Community 91 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 93 - "otp-challenge.ts"
Cohesion: 0.13
Nodes (24): CHALLENGE_DIFFICULTY, ChallengeVerdict, INVALID, issueChallenge(), redeemChallenge(), secret(), sign(), signatureMatches() (+16 more)

### Community 94 - "app/page.tsx"
Cohesion: 0.15
Nodes (18): FLAG_CODE, generateMetadata(), Home(), getServerLocale(), getLandingCopy(), COURSE_ORDER, DECKS, en (+10 more)

### Community 95 - "content-coverage.ts"
Cohesion: 0.14
Nodes (15): add(), BandCoverage, buildContentCoverage(), ContentCoverageInput, COVERAGE_SLOTS, CoverageSlot, CoverageState, emptyTally() (+7 more)

### Community 104 - "public.grammar_pages"
Cohesion: 0.40
Nodes (5): public.grammar_pages, public.grammar_reading_progress, public.grammar_rules, public.profiles, public

### Community 123 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 124 - "refresh.ts"
Cohesion: 0.13
Nodes (15): dynamic, GET(), FxFetchResult, FxRateProvider, getFxProvider(), navasanProvider, PROVIDERS, TgjuPayload (+7 more)

### Community 125 - "agent/store.ts"
Cohesion: 0.18
Nodes (17): AdminBlogAgentPage(), dynamic, maxDuration, metadata, readAgentPanelSettings(), AdminTopic, AdminTopicStatus, AgentTopic (+9 more)

### Community 126 - "[quiz_id]/page.tsx"
Cohesion: 0.09
Nodes (16): generateMetadata(), PageProps, QuizPage(), fetchAdminDashboardData(), GradedQuizQuestion, OPTION_FIELDS, multipleChoiceQuestion, writtenQuestion (+8 more)

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

### Community 142 - "create-content-section.tsx"
Cohesion: 0.15
Nodes (11): LessonsMonitor(), LevelRow(), SLOT_META, SlotSquare(), STATE_KEY, AdminQuizzesPageView(), CONTENT_TYPES, CreateContentSection() (+3 more)

### Community 143 - "data/repository.ts"
Cohesion: 0.07
Nodes (31): BlogPostInput, BlogPostStatus, slugifyTitle(), CurriculumLevelOverrideRow, ALLOWED_BANNER_IMAGE_TYPES, BANNER_IMAGE_ROUTE, bannerImageUrl(), MAX_BANNER_IMAGE_BYTES (+23 more)

### Community 144 - "landing/page.tsx"
Cohesion: 0.33
Nodes (5): AdminLandingPage(), metadata, LandingLanguagePanel(), toggle(), getLandingLanguageToggles()

### Community 145 - "scheduler.ts"
Cohesion: 0.26
Nodes (12): register(), isRefreshOverdue(), lastRunAtOrBefore(), millisecondsUntilNextRun(), nextRunAfter(), REFRESH_HOUR_TEHRAN, REFRESH_MINUTE_TEHRAN, runInstantForSameDay() (+4 more)

### Community 146 - "utils.ts"
Cohesion: 0.08
Nodes (43): AdminSubscriptionPageView(), ContinueLearningCard(), DashboardWelcomeHeader(), DashboardWelcomeHeaderProps, getInitials(), BandExamCard, BandExamsSection(), CategoryWatermark() (+35 more)

### Community 147 - "blog/[id]/page.tsx"
Cohesion: 0.17
Nodes (4): AdminBlogEditorPage(), metadata, BlogPostEditor(), ErrorState()

### Community 149 - "admin/layout.tsx"
Cohesion: 0.36
Nodes (6): AdminQuizAttemptSummary, getUserQuizAttemptsForAdminAction(), AdminLayout(), AppHeader(), parseAttemptBreakdown(), requireAdmin()

### Community 150 - "validations/quiz.ts"
Cohesion: 0.22
Nodes (11): entityIdRecordSchema(), entityIdSchema(), isEntityId(), createBaseSubmitQuizSchema(), createSubmitQuizSchema(), SubmitQuizValues, Translator, answerOptionSchema (+3 more)

### Community 151 - "wizard-question-fields.tsx"
Cohesion: 0.21
Nodes (11): OPTION_KEYS, RadioGroup, RadioGroupItem, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton (+3 more)

### Community 153 - "blog-agent.mjs"
Cohesion: 0.42
Nodes (8): env(), flag(), fmt(), main(), orNull(), PROJECT, tehranSlot(), tomorrowSlot()

### Community 155 - "subscription-view.tsx"
Cohesion: 0.25
Nodes (9): CheckoutResult, recoverMyPendingPaymentsAction(), SubscriptionView(), SubscriptionViewProps, interpolateText(), BILLING_PERIOD_MONTHS, BillingCurrency, BillingPeriodMonths (+1 more)

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
Cohesion: 0.16
Nodes (10): LandingCourse, LOCALES, BRAND_MARK, BrandMark, en, fa, it, LANDING_COPY (+2 more)

### Community 164 - "sms-test.mjs"
Cohesion: 0.50
Nodes (3): form(), mode, post()

### Community 166 - "reconcile.ts"
Cohesion: 0.27
Nodes (6): getPaymentProvider(), ReconcileDeps, ReconcileOutcome, reconcilePayment(), verify, verifyParamsFromReference

### Community 172 - "Blog agent — handoff"
Cohesion: 0.12
Nodes (15): Admin panel (2026-09-14), Alternatives that were priced but not adopted, Bake-off, 2026-09-12 23:13, Blog agent — handoff, Costs, measured, Deploy plan (nothing done yet), Environment, Files (+7 more)

### Community 174 - "local/store.ts"
Cohesion: 0.15
Nodes (21): DevModeBanner(), localFormat(), findLocalUserByPhone(), LOCAL_DEV_CODE, signInLocalByPhone(), setLocalSessionUserId(), commitStore(), LOCAL_SEED (+13 more)

### Community 175 - "actions/content.ts"
Cohesion: 0.13
Nodes (27): abortGrammarUpload(), renderGrammarPages(), startGrammarUpload(), submit(), GRAMMAR_PAGES_PER_REQUEST, RenderGrammarPagesResult, StartGrammarUploadResult, attachGrammarPages() (+19 more)

### Community 176 - "TierCapabilitiesPanel"
Cohesion: 0.40
Nodes (3): draftFrom(), TierCapabilitiesPanel(), save()

### Community 177 - "run-migration.mjs"
Cohesion: 0.22
Nodes (6): apply, client, parsed, PROJECT, sql, url

### Community 178 - "money.ts"
Cohesion: 0.33
Nodes (10): BillingCurrency, computePrice(), divRoundHalfUp(), eurToCents(), IrrConversionInput, PriceBreakdown, RateAcceptance, resolvePlanDiscountPercent() (+2 more)

### Community 179 - "010_roles_rebuild.sql"
Cohesion: 0.40
Nodes (4): public.grant_subscription(), public.role_permission_overrides, "user", public.subscription_tiers

### Community 181 - "banner-upload-form.tsx"
Cohesion: 0.38
Nodes (6): ACCEPTED_TYPES, BannerUploadForm(), handleDrop(), handleSubmit(), pickFile(), reset()

### Community 184 - "009_blog_refactor.sql"
Cohesion: 0.40
Nodes (4): public.blog_images, public.blog_post_languages, public.blog_posts, public.profiles

### Community 187 - "ConnectionForm"
Cohesion: 0.50
Nodes (5): ConnectionForm(), runTest(), save(), submit(), keyHint()

### Community 188 - "categories.ts"
Cohesion: 0.20
Nodes (8): ExistingContentList(), CONTENT_CATEGORIES, ContentCategorySlug, ContentStatus, ContentWizardContext, emptyLessonContent(), LessonContent, LessonContentItem

### Community 189 - "011_blog_agent.sql"
Cohesion: 0.38
Nodes (5): blog_topics_touch_updated_at, public.blog_agent_runs, public.blog_topics, public.blog_posts, public.touch_blog_topics_updated_at

### Community 190 - "blog-agent.ts"
Cohesion: 0.06
Nodes (63): addTopicAction(), AgentActionResult, asSuperAdmin(), bulkAddTopicsAction(), bulkFields, BulkTopicsInput, connectionFields, ConnectionInput (+55 more)

### Community 191 - "getLocaleDefinition"
Cohesion: 0.31
Nodes (7): applyDocumentLocale(), LocaleProvider(), persistLocaleCookie(), readLocaleCookie(), readStoredLocale(), getLocaleDefinition(), localizeDigits()

### Community 192 - "quiz-form.tsx"
Cohesion: 0.18
Nodes (15): buildInitialFeedback(), OPTION_LABELS, QuestionFeedback, QuizForm(), lockAnswer(), useReducedMotion(), buildQuizAttemptAnswersJson(), formatUserAnswerLabel() (+7 more)

### Community 194 - "app/blog/page.tsx"
Cohesion: 0.46
Nodes (7): BlogIndexPage(), metadata, BLOG_ID(), blogEntityJsonLd(), collectionJsonLd(), ORGANIZATION_ID(), organizationJsonLd()

### Community 195 - "resolveRolePermissions"
Cohesion: 0.43
Nodes (6): useRolePermissionOverrides(), RolePermissionEditor(), handleSave(), RolesPermissionsPanel(), isGrantablePermission(), resolveRolePermissions()

### Community 196 - "topic-queue.tsx"
Cohesion: 0.19
Nodes (19): ActionOutcome, formatJalaliDay(), Option, selectClassName, StatusBadge(), tehranInputValues(), tomorrowInTehran(), TOPIC_STATUS (+11 more)

## Knowledge Gaps
- **668 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `ActionResult`, `CheckoutResult`, `AgentActionResult` (+663 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **68 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getDataRepository()` connect `getDataRepository` to `postgres/client.ts`, `app-shell.tsx`, `ingest/route.ts`, `category/[slug]/page.tsx`, `curriculum/languages.ts`, `landing/page.tsx`, `user-row-actions.tsx`, `blog/[id]/page.tsx`, `admin/layout.tsx`, `subscription-view.tsx`, `admin/page.tsx`, `app/layout.tsx`, `pipeline.ts`, `blog.ts`, `local/repository.ts`, `action-guards.test.ts`, `getServerTranslator`, `markdown.ts`, `admin.ts`, `curriculum-levels.ts`, `actions/content.ts`, `[language]/page.tsx`, `blog/[slug]/page.tsx`, `isLocalDataMode`, `actions/auth.ts`, `app/page.tsx`, `refresh.ts`, `agent/store.ts`, `[quiz_id]/page.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `useTranslations()` connect `useTranslations` to `app-shell.tsx`, `user-management-panel.tsx`, `jalali.ts`, `subscription-plan-edit-dialog.tsx`, `middleware.ts`, `button.tsx`, `create-content-section.tsx`, `utils.ts`, `user-row-actions.tsx`, `getDataRepository`, `wizard-question-fields.tsx`, `types/index.ts`, `subscription-view.tsx`, `cn`, `getServerTranslator`, `curriculum-levels.ts`, `TierCapabilitiesPanel`, `phone-auth-form.tsx`, `banner-upload-form.tsx`, `billing-settings-form.tsx`, `video-embed.ts`, `categories.ts`, `landing/pricing.ts`, `resolveMessage`, `quiz-form.tsx`, `resolveRolePermissions`, `topic-queue.tsx`, `sections.tsx`, `actions/auth.ts`, `plate.tsx`, `agent-panel.tsx`, `content-form-panels.tsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `app-shell.tsx`, `user-management-panel.tsx`, `subscription-plan-edit-dialog.tsx`, `category/[slug]/page.tsx`, `button.tsx`, `create-content-section.tsx`, `utils.ts`, `wizard-question-fields.tsx`, `subscription-view.tsx`, `app/layout.tsx`, `blog.ts`, `blog-shell.tsx`, `useTranslations`, `blog/[slug]/page.tsx`, `phone-auth-form.tsx`, `banner-upload-form.tsx`, `billing-settings-form.tsx`, `landing/pricing.ts`, `resolveMessage`, `quiz-form.tsx`, `topic-queue.tsx`, `sections.tsx`, `plate.tsx`, `agent-panel.tsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `ActionResult` to the rest of the system?**
  _668 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tick/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14333333333333334 - nodes in this community are weakly interconnected._
- **Should `postgres/client.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08906882591093117 - nodes in this community are weakly interconnected._
- **Should `DataRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.032432432432432434 - nodes in this community are weakly interconnected._