create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text,
  role text not null default 'editor',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text not null,
  short_title text,
  mobile_title text,
  tagline text,
  monogram text,
  footer_title text,
  footer_subtitle text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  page_name text not null,
  draft_content jsonb not null default '{}'::jsonb,
  published_content jsonb not null default '{}'::jsonb,
  draft_updated_at timestamptz,
  draft_updated_by uuid references auth.users(id),
  published_at timestamptz,
  published_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.references (
  id uuid primary key default gen_random_uuid(),
  ref_key text unique not null,
  short_label text not null,
  full_citation text not null,
  source_url text,
  doi text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_user_is_active_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and is_active = true
  );
$$;

drop trigger if exists admin_profiles_set_updated_at on public.admin_profiles;
create trigger admin_profiles_set_updated_at
before update on public.admin_profiles
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists pages_set_updated_at on public.pages;
create trigger pages_set_updated_at
before update on public.pages
for each row execute function public.set_updated_at();

drop trigger if exists references_set_updated_at on public.references;
create trigger references_set_updated_at
before update on public.references
for each row execute function public.set_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.pages enable row level security;
alter table public.references enable row level security;

drop policy if exists "admin profiles self select" on public.admin_profiles;
create policy "admin profiles self select"
on public.admin_profiles
for select
using (auth.uid() = user_id or public.current_user_is_active_admin());

drop policy if exists "admin profiles admin manage" on public.admin_profiles;
create policy "admin profiles admin manage"
on public.admin_profiles
for all
using (public.current_user_is_active_admin())
with check (public.current_user_is_active_admin());

drop policy if exists "site settings admin manage" on public.site_settings;
create policy "site settings admin manage"
on public.site_settings
for all
using (public.current_user_is_active_admin())
with check (public.current_user_is_active_admin());

drop policy if exists "pages admin manage" on public.pages;
create policy "pages admin manage"
on public.pages
for all
using (public.current_user_is_active_admin())
with check (public.current_user_is_active_admin());

drop policy if exists "references admin manage" on public.references;
create policy "references admin manage"
on public.references
for all
using (public.current_user_is_active_admin())
with check (public.current_user_is_active_admin());

create or replace view public.site_settings_public as
select
  id,
  site_title,
  short_title,
  mobile_title,
  tagline,
  monogram,
  footer_title,
  footer_subtitle,
  seo_title,
  seo_description,
  updated_at
from public.site_settings
limit 1;

create or replace view public.pages_public as
select
  slug,
  page_name,
  published_content,
  published_at,
  updated_at
from public.pages;

create or replace view public.references_public as
select
  ref_key,
  short_label,
  full_citation,
  source_url,
  doi,
  sort_order
from public.references
where is_active = true
order by sort_order asc;

grant select on public.site_settings_public to anon, authenticated;
grant select on public.pages_public to anon, authenticated;
grant select on public.references_public to anon, authenticated;

insert into public.site_settings (
  id,
  site_title,
  short_title,
  mobile_title,
  tagline,
  monogram,
  footer_title,
  footer_subtitle,
  seo_title,
  seo_description
)
values (
  '00000000-0000-0000-0000-000000000001',
  'Positioning and the Effect on Labor',
  'Positioning & Labor',
  'Positioning & Labor',
  'Evidence-informed birth education',
  'PL',
  'Positioning and the Effect on Labor',
  'Evidence-informed birth education',
  'Positioning and the Effect on Labor',
  'An evidence-based educational website about maternal positioning during labor, birth options, and why movement matters.'
)
on conflict (id) do update
set site_title = excluded.site_title,
    short_title = excluded.short_title,
    mobile_title = excluded.mobile_title,
    tagline = excluded.tagline,
    monogram = excluded.monogram,
    footer_title = excluded.footer_title,
    footer_subtitle = excluded.footer_subtitle,
    seo_title = excluded.seo_title,
    seo_description = excluded.seo_description;

insert into public.references (ref_key, short_label, full_citation, source_url, doi, sort_order, is_active)
values
  ('ondeck2019', 'Ondeck (2019)', 'Ondeck, M. (2019, April 1). Healthy Birth Practice #2: Walk, move around, and change positions throughout labor. The Journal of Perinatal Education.', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6503896/', null, 1, true),
  ('zang2020', 'Zang et al. (2020)', 'Zang, Y., Lu, H., Zhang, H., Huang, J., Ren, L., & Li, C. (2020). Effects of upright positions during the second stage of labour for women without epidural analgesia: A meta-analysis. Journal of Advanced Nursing, 76, 3293–3306.', 'https://doi.org/10.1111/jan.14587', '10.1111/jan.14587', 2, true),
  ('liu2025', 'Liu et al. (2025)', 'Liu, H., Li, L., Wang, X., Zhu, X., Sun, L., Zhu, C., Min, H., & Gu, C. (2025). Effectiveness of nulliparous women''s different childbirth positions during the second stage of labor: A systematic review and network meta-analysis. International Journal of Nursing Sciences, 12(3), 268–275.', 'https://doi.org/10.1016/j.ijnss.2025.04.006', '10.1016/j.ijnss.2025.04.006', 3, true),
  ('satone2023', 'Satone et al. (2023)', 'Satone, P. D., Tayade, S. A., & Tayade, S. (2023). Alternative birthing positions compared to the conventional position in the second stage of labor: A review. Cureus, 15(4).', null, null, 4, true),
  ('gimovsky2022', 'Gimovsky & Berghella (2022)', 'Gimovsky, A. C., & Berghella, V. (2022). Evidence-based labor management: second stage of labor (part 4). American Journal of Obstetrics & Gynecology MFM, 4(2), 100548.', null, null, 5, true)
on conflict (ref_key) do update
set short_label = excluded.short_label,
    full_citation = excluded.full_citation,
    source_url = excluded.source_url,
    doi = excluded.doi,
    sort_order = excluded.sort_order,
    is_active = excluded.is_active;

insert into public.pages (slug, page_name, draft_content, published_content, published_at)
values (
  'home',
  'Home',
  $$
  {
    "hero": {
      "eyebrow": "Evidence-informed birth education",
      "subline": "Maternal positioning, mobility, and delivery outcomes",
      "title": "Positioning and the Effect on Labor",
      "lead": "Positioning during labor is not just a comfort preference. The literature selected for this project consistently points to the value of walking, changing positions, and using upright or non-supine options when clinically appropriate.",
      "primaryCta": { "label": "Explore the evidence", "href": "/move-through-labor/evidence" },
      "secondaryCta": { "label": "Compare labor positions", "href": "/move-through-labor/positions" }
    },
    "heroCards": [
      { "label": "Mobility", "title": "Mobility", "text": "Walking, changing positions, and laboring upright are presented as meaningful supportive-care practices.", "citations": ["ondeck2019", "gimovsky2022"] },
      { "label": "Mechanics", "title": "Mechanics", "text": "Upright positions are associated in the selected evidence with fetal descent, pelvic opening, and more efficient labor mechanics.", "citations": ["zang2020", "liu2025", "satone2023"] },
      { "label": "Choice", "title": "Choice", "text": "The point is not one mandatory posture. The point is informed, supported choice rather than default lithotomy.", "citations": ["satone2023", "gimovsky2022"] }
    ],
    "heroSidebar": {
      "eyebrow": "Why this matters",
      "title": "A clearer first impression for readers",
      "bullets": [
        { "text": "Alternative positions may support physiologic labor progression, fetal descent, and more efficient pushing mechanics.", "citations": ["zang2020", "liu2025", "satone2023"] },
        { "text": "Selected reviews describe drawbacks of routine supine or lithotomy positioning, including greater discomfort and higher risk of episiotomy or perineal injury in some comparisons.", "citations": ["satone2023"] },
        { "text": "Walking, moving around, and changing positions throughout labor are presented as a healthy birth practice.", "citations": ["ondeck2019"] }
      ]
    },
    "featuredReferenceKeys": ["ondeck2019", "zang2020", "liu2025", "satone2023", "gimovsky2022"],
    "overview": {
      "eyebrow": "Overview",
      "title": "Positioning can influence labor experience and delivery outcomes",
      "description": "This educational site translates the selected research into clear, public-facing language. The goal is not to prescribe one universal position, but to show that birthing people should know they have options.",
      "cards": [
        { "eyebrow": "Context", "title": "Historical routine vs. current evidence", "text": "Hospitals have often encouraged supine or recumbent positioning for monitoring and clinician convenience. The selected literature argues that upright, kneeling, squatting, sitting, walking, or otherwise mobile positions can better support physiologic labor.", "citations": ["ondeck2019", "satone2023", "liu2025"] },
        { "eyebrow": "First births", "title": "Important for nulliparous women", "text": "The project focuses in part on women giving birth for the first time, who often experience longer labor. The selected reviews examine whether second-stage positions can improve outcomes and reduce the need for more intervention-heavy delivery.", "citations": ["liu2025", "gimovsky2022"] },
        { "eyebrow": "Systems view", "title": "Why cost and resource use matter", "text": "Promoting mobility and position choice is a comparatively low-cost supportive-care strategy. Ondeck’s discussion of movement during labor supports the argument that avoiding unnecessary intervention has both clinical and operational value.", "citations": ["ondeck2019"] }
      ]
    },
    "takeaways": {
      "eyebrow": "Key takeaways",
      "title": "What this website argues",
      "description": "The position a woman uses in labor can affect comfort, mechanics, and the overall birth process.",
      "cards": [
        { "title": "Mobility should be supported.", "text": "Laboring women benefit from being encouraged to move, walk, sway, kneel, sit, squat, or rest in non-supine positions when it is safe to do so.", "citations": ["ondeck2019", "gimovsky2022"] },
        { "title": "Lithotomy should not be treated as the automatic default.", "text": "The selected reviews suggest the conventional supine or lithotomy approach may come with tradeoffs, especially when compared with positions that use gravity and increase pelvic space.", "citations": ["satone2023", "zang2020"] },
        { "title": "Patient choice is part of quality care.", "text": "Evidence-based labor management includes respecting maternal preferences and recognizing that more than one position may be appropriate during the second stage of labor.", "citations": ["gimovsky2022", "liu2025"] }
      ]
    },
    "audienceBox": {
      "eyebrow": "Who this is for",
      "title": "General public first, citations still visible",
      "body1": "This site is written for the general public, but it keeps citations visible so that readers can trace each major point back to the selected articles.",
      "body2": "It can also serve as a discussion starter for childbirth education, shared decision-making, and conversations with clinicians about labor mobility.",
      "cta": { "label": "See full references", "href": "/move-through-labor/resources" }
    }
  }
  $$::jsonb,
  $$
  {
    "hero": {
      "eyebrow": "Evidence-informed birth education",
      "subline": "Maternal positioning, mobility, and delivery outcomes",
      "title": "Positioning and the Effect on Labor",
      "lead": "Positioning during labor is not just a comfort preference. The literature selected for this project consistently points to the value of walking, changing positions, and using upright or non-supine options when clinically appropriate.",
      "primaryCta": { "label": "Explore the evidence", "href": "/move-through-labor/evidence" },
      "secondaryCta": { "label": "Compare labor positions", "href": "/move-through-labor/positions" }
    },
    "heroCards": [
      { "label": "Mobility", "title": "Mobility", "text": "Walking, changing positions, and laboring upright are presented as meaningful supportive-care practices.", "citations": ["ondeck2019", "gimovsky2022"] },
      { "label": "Mechanics", "title": "Mechanics", "text": "Upright positions are associated in the selected evidence with fetal descent, pelvic opening, and more efficient labor mechanics.", "citations": ["zang2020", "liu2025", "satone2023"] },
      { "label": "Choice", "title": "Choice", "text": "The point is not one mandatory posture. The point is informed, supported choice rather than default lithotomy.", "citations": ["satone2023", "gimovsky2022"] }
    ],
    "heroSidebar": {
      "eyebrow": "Why this matters",
      "title": "A clearer first impression for readers",
      "bullets": [
        { "text": "Alternative positions may support physiologic labor progression, fetal descent, and more efficient pushing mechanics.", "citations": ["zang2020", "liu2025", "satone2023"] },
        { "text": "Selected reviews describe drawbacks of routine supine or lithotomy positioning, including greater discomfort and higher risk of episiotomy or perineal injury in some comparisons.", "citations": ["satone2023"] },
        { "text": "Walking, moving around, and changing positions throughout labor are presented as a healthy birth practice.", "citations": ["ondeck2019"] }
      ]
    },
    "featuredReferenceKeys": ["ondeck2019", "zang2020", "liu2025", "satone2023", "gimovsky2022"],
    "overview": {
      "eyebrow": "Overview",
      "title": "Positioning can influence labor experience and delivery outcomes",
      "description": "This educational site translates the selected research into clear, public-facing language. The goal is not to prescribe one universal position, but to show that birthing people should know they have options.",
      "cards": [
        { "eyebrow": "Context", "title": "Historical routine vs. current evidence", "text": "Hospitals have often encouraged supine or recumbent positioning for monitoring and clinician convenience. The selected literature argues that upright, kneeling, squatting, sitting, walking, or otherwise mobile positions can better support physiologic labor.", "citations": ["ondeck2019", "satone2023", "liu2025"] },
        { "eyebrow": "First births", "title": "Important for nulliparous women", "text": "The project focuses in part on women giving birth for the first time, who often experience longer labor. The selected reviews examine whether second-stage positions can improve outcomes and reduce the need for more intervention-heavy delivery.", "citations": ["liu2025", "gimovsky2022"] },
        { "eyebrow": "Systems view", "title": "Why cost and resource use matter", "text": "Promoting mobility and position choice is a comparatively low-cost supportive-care strategy. Ondeck’s discussion of movement during labor supports the argument that avoiding unnecessary intervention has both clinical and operational value.", "citations": ["ondeck2019"] }
      ]
    },
    "takeaways": {
      "eyebrow": "Key takeaways",
      "title": "What this website argues",
      "description": "The position a woman uses in labor can affect comfort, mechanics, and the overall birth process.",
      "cards": [
        { "title": "Mobility should be supported.", "text": "Laboring women benefit from being encouraged to move, walk, sway, kneel, sit, squat, or rest in non-supine positions when it is safe to do so.", "citations": ["ondeck2019", "gimovsky2022"] },
        { "title": "Lithotomy should not be treated as the automatic default.", "text": "The selected reviews suggest the conventional supine or lithotomy approach may come with tradeoffs, especially when compared with positions that use gravity and increase pelvic space.", "citations": ["satone2023", "zang2020"] },
        { "title": "Patient choice is part of quality care.", "text": "Evidence-based labor management includes respecting maternal preferences and recognizing that more than one position may be appropriate during the second stage of labor.", "citations": ["gimovsky2022", "liu2025"] }
      ]
    },
    "audienceBox": {
      "eyebrow": "Who this is for",
      "title": "General public first, citations still visible",
      "body1": "This site is written for the general public, but it keeps citations visible so that readers can trace each major point back to the selected articles.",
      "body2": "It can also serve as a discussion starter for childbirth education, shared decision-making, and conversations with clinicians about labor mobility.",
      "cta": { "label": "See full references", "href": "/move-through-labor/resources" }
    }
  }
  $$::jsonb,
  now()
)
on conflict (slug) do update
set page_name = excluded.page_name,
    draft_content = excluded.draft_content,
    published_content = excluded.published_content,
    published_at = excluded.published_at;

insert into public.pages (slug, page_name, draft_content, published_content)
values
  ('evidence', 'Evidence', '{}'::jsonb, '{}'::jsonb),
  ('positions', 'Positions', '{}'::jsonb, '{}'::jsonb),
  ('media', 'Media', '{}'::jsonb, '{}'::jsonb),
  ('resources', 'Resources', '{}'::jsonb, '{}'::jsonb)
on conflict (slug) do nothing;

-- After creating an Auth user for your editor, run something like:
-- insert into public.admin_profiles (user_id, email, display_name, role, is_active)
-- values ('YOUR_AUTH_USER_UUID', 'you@example.com', 'Editor Name', 'admin', true);
