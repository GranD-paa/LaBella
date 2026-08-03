-- Admin-editable subscription plans (price, discount, and per-language
-- title/description/features) plus page-level text for the subscription
-- page hero and footer. All user-facing text is stored per-locale (fa/en/it)
-- so the site's multi-language support keeps working after admin edits.

create table if not exists public.subscription_plans (
  id text primary key,
  price_eur numeric(10,2) not null,
  discount_percent integer not null default 0,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  features jsonb not null default '[]'::jsonb,
  order_number integer not null default 0,
  updated_at timestamptz not null default now(),
  constraint subscription_plans_discount_check check (discount_percent >= 0 and discount_percent <= 95),
  constraint subscription_plans_price_check check (price_eur >= 0)
);

comment on table public.subscription_plans is
  'Super-admin managed pricing, discounts, and localized copy for each subscription tier.';

create table if not exists public.subscription_page_content (
  id text primary key default 'default',
  hero_title jsonb not null default '{}'::jsonb,
  hero_subtitle jsonb not null default '{}'::jsonb,
  footer_note jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.subscription_page_content is
  'Singleton row holding the editable hero and footer copy for the subscription page.';

alter table public.subscription_plans enable row level security;
alter table public.subscription_plans force row level security;
alter table public.subscription_page_content enable row level security;
alter table public.subscription_page_content force row level security;

drop policy if exists "Subscription plans viewable by authenticated" on public.subscription_plans;
create policy "Subscription plans viewable by authenticated"
  on public.subscription_plans for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage subscription plans" on public.subscription_plans;
create policy "Admins can manage subscription plans"
  on public.subscription_plans for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists "Subscription page content viewable by authenticated" on public.subscription_page_content;
create policy "Subscription page content viewable by authenticated"
  on public.subscription_page_content for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage subscription page content" on public.subscription_page_content;
create policy "Admins can manage subscription page content"
  on public.subscription_page_content for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

insert into public.subscription_plans (id, price_eur, discount_percent, title, description, features, order_number)
values
  ('basic', 2.99, 0,
   '{"fa":"بیسیک","en":"Basic","it":"Base"}'::jsonb,
   '{"fa":"مناسب یادگیرندگانی که روی یک زبان تمرکز دارند.","en":"Perfect for focused learners starting one language.","it":"Perfetto per studenti concentrati su una lingua."}'::jsonb,
   '[{"fa":"۱ زبان فعال در هر زمان","en":"1 active language at a time","it":"1 lingua attiva alla volta"},{"fa":"درس‌ها، واژگان و گرامر اصلی","en":"Core lessons, vocabulary & grammar","it":"Lezioni, vocabolario e grammatica di base"},{"fa":"تا ۳ بار تلاش مجدد برای هر آزمون","en":"Up to 3 quiz retakes per lesson","it":"Fino a 3 tentativi per quiz"},{"fa":"پیگیری پیشرفت در داشبورد","en":"Progress tracking on your dashboard","it":"Monitoraggio dei progressi sulla dashboard"}]'::jsonb,
   1),
  ('pro', 4.99, 0,
   '{"fa":"پرو","en":"Pro","it":"Pro"}'::jsonb,
   '{"fa":"محبوب‌ترین طرح برای تمرین روزانه جدی.","en":"Our most popular plan for serious daily practice.","it":"Il piano più popolare per una pratica quotidiana seria."}'::jsonb,
   '[{"fa":"همه امکانات بیسیک","en":"Everything in Basic","it":"Tutto quello incluso nel piano Base"},{"fa":"همه زبان‌های فعال فعلی","en":"All currently active languages","it":"Tutte le lingue attualmente attive"},{"fa":"تلاش مجدد نامحدود آزمون","en":"Unlimited quiz retakes","it":"Tentativi illimitati per i quiz"},{"fa":"گرامر پیشرفته و عمیق","en":"Extended grammar deep-dives","it":"Approfondimenti grammaticali avanzati"},{"fa":"پشتیبانی ایمیلی اولویت‌دار","en":"Priority email support","it":"Supporto email prioritario"}]'::jsonb,
   2),
  ('ultimate', 5.99, 0,
   '{"fa":"اولتیمیت","en":"Ultimate","it":"Ultimate"}'::jsonb,
   '{"fa":"حداکثر دسترسی برای یادگیرندگان حرفه‌ای.","en":"Maximum access for power learners and early adopters.","it":"Accesso massimo per utenti esperti e primi utilizzatori."}'::jsonb,
   '[{"fa":"همه امکانات پرو","en":"Everything in Pro","it":"Tutto quello incluso nel piano Pro"},{"fa":"همه زبان‌های آینده پس از انتشار","en":"All future languages as they launch","it":"Tutte le lingue future al lancio"},{"fa":"دسترسی آفلاین به درس‌ها (PWA)","en":"Offline lesson access (PWA)","it":"Accesso offline alle lezioni (PWA)"},{"fa":"دسترسی زودهنگام به سطوح و ویژگی‌های جدید","en":"Early access to new levels & features","it":"Accesso anticipato a nuovi livelli e funzionalità"},{"fa":"پیشنهاد مسیر یادگیری شخصی‌سازی‌شده","en":"Personalized learning path suggestions","it":"Suggerimenti di percorso di apprendimento personalizzati"}]'::jsonb,
   3)
on conflict (id) do nothing;

insert into public.subscription_page_content (id, hero_title, hero_subtitle, footer_note)
values (
  'default',
  '{"fa":"طرح یادگیری خود را انتخاب کنید","en":"Choose your learning plan","it":"Scegli il tuo piano di apprendimento"}'::jsonb,
  '{"fa":"{name}، با اشتراک ماهانه‌ای متناسب با اهدافتان، تجربه کامل لاپارلی را باز کنید.","en":"{name}, unlock the full Laparli experience with a monthly subscription tailored to your goals.","it":"{name}, sblocca l''esperienza completa di Laparli con un abbonamento su misura per i tuoi obiettivi."}'::jsonb,
  '{"fa":"اشتراک هر ۳۰ روز تمدید می‌شود. پس از فعال شدن پرداخت، هر زمان می‌توانید طرح را تغییر دهید یا لغو کنید. قیمت‌ها به یورو نمایش داده می‌شوند.","en":"Subscriptions renew every 30 days. You can change or cancel your plan anytime once payments go live. Prices are shown in EUR.","it":"Gli abbonamenti si rinnovano ogni 30 giorni. Puoi cambiare o annullare il piano in qualsiasi momento una volta attivati i pagamenti. I prezzi sono in EUR."}'::jsonb
)
on conflict (id) do nothing;
