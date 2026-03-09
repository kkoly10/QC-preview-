-- ResultRail QC V1.1
-- Milestone 2 foundation schema + RLS

create extension if not exists "pgcrypto";

-- ----------
-- Core tables
-- ----------
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete restrict,
  full_name text,
  role text not null default 'analyst',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_role_check check (role in ('admin', 'reviewer', 'analyst'))
);

create table if not exists runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  created_by uuid not null references profiles(id) on delete restrict,
  run_name text not null,
  batch_id text,
  instrument_type text,
  method_name text,
  analyte_family text,
  analyst_name text,
  notes text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint runs_status_check check (
    status in (
      'draft',
      'uploaded',
      'mapped',
      'checked',
      'needs cleanup',
      'ready for formal review',
      'exported',
      'archived'
    )
  )
);

create table if not exists uploaded_files (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  run_id uuid not null references runs(id) on delete cascade,
  storage_path text not null,
  original_filename text not null,
  file_type text not null,
  file_size bigint not null,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  name text not null,
  config jsonb not null default '{}'::jsonb,
  is_archived boolean not null default false,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists template_mappings (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references templates(id) on delete cascade,
  standard_field text not null,
  source_column text not null,
  created_at timestamptz not null default now(),
  unique(template_id, standard_field)
);

create table if not exists normalized_rows (
  id bigserial primary key,
  organization_id uuid not null references organizations(id) on delete restrict,
  run_id uuid not null references runs(id) on delete cascade,
  row_index integer not null,
  source_json jsonb not null,
  mapped_values jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(run_id, row_index)
);

create table if not exists validation_results (
  id bigserial primary key,
  organization_id uuid not null references organizations(id) on delete restrict,
  run_id uuid not null references runs(id) on delete cascade,
  normalized_row_id bigint references normalized_rows(id) on delete cascade,
  rule_code text not null,
  severity text not null,
  status text not null default 'open',
  message text not null,
  current_value text,
  expected_value text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint validation_severity_check check (severity in ('low', 'medium', 'high')),
  constraint validation_status_check check (status in ('open', 'resolved', 'overridden', 'not_applicable'))
);

create table if not exists review_actions (
  id bigserial primary key,
  organization_id uuid not null references organizations(id) on delete restrict,
  run_id uuid not null references runs(id) on delete cascade,
  validation_result_id bigint references validation_results(id) on delete cascade,
  action_type text not null,
  note text,
  created_by uuid not null references profiles(id) on delete restrict,
  created_at timestamptz not null default now(),
  constraint review_action_type_check check (
    action_type in ('resolve', 'override', 'comment', 'not_applicable')
  )
);

create table if not exists exports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  run_id uuid not null references runs(id) on delete cascade,
  storage_path text not null,
  export_type text not null default 'review_prep',
  created_by uuid not null references profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists activity_log (
  id bigserial primary key,
  organization_id uuid not null references organizations(id) on delete restrict,
  run_id uuid references runs(id) on delete cascade,
  actor_id uuid references profiles(id) on delete set null,
  event_type text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_org on profiles(organization_id);
create index if not exists idx_runs_org on runs(organization_id);
create index if not exists idx_uploaded_files_run on uploaded_files(run_id);
create index if not exists idx_templates_org on templates(organization_id);
create index if not exists idx_normalized_rows_run on normalized_rows(run_id);
create index if not exists idx_validation_results_run on validation_results(run_id);
create index if not exists idx_review_actions_run on review_actions(run_id);
create index if not exists idx_exports_run on exports(run_id);
create index if not exists idx_activity_log_run on activity_log(run_id);

-- ----------
-- RLS helpers
-- ----------
create or replace function public.current_profile_org_id()
returns uuid
language sql
stable
as $$
  select p.organization_id
  from public.profiles p
  where p.id = auth.uid()
$$;

-- ----------
-- Enable RLS everywhere
-- ----------
alter table organizations enable row level security;
alter table profiles enable row level security;
alter table runs enable row level security;
alter table uploaded_files enable row level security;
alter table templates enable row level security;
alter table template_mappings enable row level security;
alter table normalized_rows enable row level security;
alter table validation_results enable row level security;
alter table review_actions enable row level security;
alter table exports enable row level security;
alter table activity_log enable row level security;

-- ----------
-- Org-scoped policies
-- ----------
create policy organizations_select_own on organizations
for select
using (id = public.current_profile_org_id());

create policy profiles_select_own_org on profiles
for select
using (organization_id = public.current_profile_org_id());

create policy profiles_insert_own_org on profiles
for insert
with check (organization_id = public.current_profile_org_id() or auth.uid() = id);

create policy profiles_update_own_org on profiles
for update
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy runs_org_access on runs
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy uploaded_files_org_access on uploaded_files
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy templates_org_access on templates
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy template_mappings_org_access on template_mappings
for all
using (
  exists (
    select 1
    from templates t
    where t.id = template_id
      and t.organization_id = public.current_profile_org_id()
  )
)
with check (
  exists (
    select 1
    from templates t
    where t.id = template_id
      and t.organization_id = public.current_profile_org_id()
  )
);

create policy normalized_rows_org_access on normalized_rows
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy validation_results_org_access on validation_results
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy review_actions_org_access on review_actions
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy exports_org_access on exports
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());

create policy activity_log_org_access on activity_log
for all
using (organization_id = public.current_profile_org_id())
with check (organization_id = public.current_profile_org_id());
