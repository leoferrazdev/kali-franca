-- CRM Kali França — fundação inicial de dados
-- Esta migration não insere dados reais e não contém credenciais.

create type public.app_role as enum ('administradora', 'comercial');
create type public.lead_status as enum ('novo', 'qualificando', 'oferta', 'ganho', 'perdido');
create type public.lead_source as enum ('landing_page', 'whatsapp', 'instagram', 'manual', 'outro');
create type public.interaction_channel as enum ('landing_page', 'whatsapp', 'instagram', 'outro');
create type public.interaction_direction as enum ('inbound', 'outbound');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  source public.lead_source not null,
  status public.lead_status not null default 'novo',
  owner_id uuid references public.profiles(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.interactions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  channel public.interaction_channel not null,
  direction public.interaction_direction not null,
  message_text text,
  external_id text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint interactions_message_or_external_id check (message_text is not null or external_id is not null)
);

create unique index interactions_external_id_unique
  on public.interactions (external_id)
  where external_id is not null;

create table public.offers (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  name text not null,
  notes text,
  presented_at timestamptz not null default now(),
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  title text not null,
  description text,
  assigned_to uuid references public.profiles(id) on delete set null,
  due_at timestamptz,
  completed_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.funnel_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  from_status public.lead_status,
  to_status public.lead_status not null,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint funnel_events_status_must_change check (from_status is null or from_status <> to_status)
);

create table public.community_conversions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null unique references public.leads(id) on delete cascade,
  community_name text not null default 'Kali França',
  entered boolean not null,
  converted_at timestamptz not null default now(),
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index leads_status_created_at_idx on public.leads (status, created_at desc);
create index leads_source_created_at_idx on public.leads (source, created_at desc);
create index leads_owner_id_idx on public.leads (owner_id);
create index interactions_lead_created_at_idx on public.interactions (lead_id, created_at desc);
create index offers_lead_presented_at_idx on public.offers (lead_id, presented_at desc);
create index tasks_due_at_idx on public.tasks (due_at) where completed_at is null;
create index funnel_events_lead_created_at_idx on public.funnel_events (lead_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin_or_commercial()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('administradora'::public.app_role, 'comercial'::public.app_role);
$$;

create or replace function public.is_administradora()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() = 'administradora'::public.app_role;
$$;

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.interactions enable row level security;
alter table public.offers enable row level security;
alter table public.tasks enable row level security;
alter table public.funnel_events enable row level security;
alter table public.community_conversions enable row level security;

create policy profiles_select_own_or_admin
  on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_administradora());

create policy profiles_insert_admin
  on public.profiles for insert to authenticated
  with check (public.is_administradora());

create policy profiles_update_admin
  on public.profiles for update to authenticated
  using (public.is_administradora())
  with check (public.is_administradora());

create policy leads_select_staff
  on public.leads for select to authenticated
  using (public.is_admin_or_commercial());

create policy leads_insert_staff
  on public.leads for insert to authenticated
  with check (public.is_admin_or_commercial());

create policy leads_update_staff
  on public.leads for update to authenticated
  using (public.is_admin_or_commercial())
  with check (public.is_admin_or_commercial());

create policy interactions_select_staff
  on public.interactions for select to authenticated
  using (public.is_admin_or_commercial());

create policy interactions_insert_staff
  on public.interactions for insert to authenticated
  with check (public.is_admin_or_commercial());

create policy offers_select_staff
  on public.offers for select to authenticated
  using (public.is_admin_or_commercial());

create policy offers_insert_staff
  on public.offers for insert to authenticated
  with check (public.is_admin_or_commercial());

create policy tasks_select_staff
  on public.tasks for select to authenticated
  using (public.is_admin_or_commercial());

create policy tasks_insert_staff
  on public.tasks for insert to authenticated
  with check (public.is_admin_or_commercial());

create policy tasks_update_staff
  on public.tasks for update to authenticated
  using (public.is_admin_or_commercial())
  with check (public.is_admin_or_commercial());

create policy funnel_events_select_staff
  on public.funnel_events for select to authenticated
  using (public.is_admin_or_commercial());

create policy funnel_events_insert_staff
  on public.funnel_events for insert to authenticated
  with check (public.is_admin_or_commercial());

create policy community_conversions_select_staff
  on public.community_conversions for select to authenticated
  using (public.is_admin_or_commercial());

create policy community_conversions_insert_staff
  on public.community_conversions for insert to authenticated
  with check (public.is_admin_or_commercial());

create policy community_conversions_update_staff
  on public.community_conversions for update to authenticated
  using (public.is_admin_or_commercial())
  with check (public.is_admin_or_commercial());

revoke all on table public.profiles, public.leads, public.interactions, public.offers,
  public.tasks, public.funnel_events, public.community_conversions from anon;

grant select, insert, update on table public.profiles to authenticated;
grant select, insert, update on table public.leads to authenticated;
grant select, insert on table public.interactions to authenticated;
grant select, insert on table public.offers to authenticated;
grant select, insert, update on table public.tasks to authenticated;
grant select, insert on table public.funnel_events to authenticated;
grant select, insert, update on table public.community_conversions to authenticated;

revoke update, delete on table public.funnel_events from authenticated;
revoke execute on function public.current_app_role() from public;
revoke execute on function public.is_admin_or_commercial() from public;
revoke execute on function public.is_administradora() from public;
grant execute on function public.current_app_role() to authenticated;
grant execute on function public.is_admin_or_commercial() to authenticated;
grant execute on function public.is_administradora() to authenticated;
