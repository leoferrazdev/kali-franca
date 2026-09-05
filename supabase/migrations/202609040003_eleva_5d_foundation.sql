-- Kalì Franca — fundação de dados do produto Eleva 5D
-- Esta migration não insere usuários, compras, fotos ou progresso real.

create table public.eleva_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug = 'eleva-5d'),
  name text not null,
  status text not null default 'preparing' check (status in ('preparing', 'published', 'archived')),
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.eleva_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  slug text not null check (slug in ('reprogramar', 'alinhar', 'manifestar', 'sustentar', 'elevar')),
  position smallint not null check (position between 1 and 5),
  title text not null,
  focus text not null,
  unique (product_id, slug),
  unique (product_id, position)
);

create table public.eleva_content_items (
  id uuid primary key default gen_random_uuid(),
  movement_id uuid not null references public.eleva_movements(id) on delete cascade,
  kind text not null check (kind in ('audio', 'video', 'journal', 'checklist', 'vision', 'playlist', 'article')),
  title text not null,
  description text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  position smallint not null default 1,
  unique (movement_id, kind, position)
);

create table public.eleva_member_setups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  initial_photo_path text,
  initial_cut_text text not null check (char_length(btrim(initial_cut_text)) between 2 and 4000),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id)
);

create table public.eleva_daily_activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  movement_id uuid not null references public.eleva_movements(id) on delete cascade,
  activity_date date not null,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  unique (user_id, product_id, movement_id, activity_date)
);

create table public.eleva_progress_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.eleva_products(id) on delete cascade,
  movement_id uuid references public.eleva_movements(id) on delete set null,
  activity_date date not null,
  event_type text not null check (event_type in ('setup_completed', 'activity_completed', 'activity_reopened')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index eleva_movements_product_position_idx
  on public.eleva_movements (product_id, position);

create index eleva_content_items_movement_position_idx
  on public.eleva_content_items (movement_id, position);

create index eleva_daily_activities_user_date_idx
  on public.eleva_daily_activities (user_id, activity_date desc);

create index eleva_progress_events_user_created_at_idx
  on public.eleva_progress_events (user_id, created_at desc);

create trigger eleva_products_set_updated_at
before update on public.eleva_products
for each row execute function public.set_updated_at();

create trigger eleva_member_setups_set_updated_at
before update on public.eleva_member_setups
for each row execute function public.set_updated_at();

insert into public.eleva_products (slug, name, status, description)
values (
  'eleva-5d',
  'Eleva 5D',
  'preparing',
  'Um ciclo de cinco movimentos para retornar ao centro e sustentar o próximo movimento.'
)
on conflict (slug) do update set
  name = excluded.name,
  status = excluded.status,
  description = excluded.description;

insert into public.eleva_movements (product_id, slug, position, title, focus)
select product.id, movement.slug, movement.position, movement.title, movement.focus
from public.eleva_products product
cross join (values
  ('reprogramar', 1, 'Reprogramar', 'Despertar diário e clareza.'),
  ('alinhar', 2, 'Alinhar', 'Retorno ao estado de potência.'),
  ('manifestar', 3, 'Manifestar', 'Visão, sentimento e ação prática.'),
  ('sustentar', 4, 'Sustentar', 'Musculatura emocional e constância.'),
  ('elevar', 5, 'Elevar', 'Expansão da visão e da consciência.')
) as movement(slug, position, title, focus)
where product.slug = 'eleva-5d'
on conflict (product_id, slug) do update set
  position = excluded.position,
  title = excluded.title,
  focus = excluded.focus;

alter table public.eleva_products enable row level security;
alter table public.eleva_movements enable row level security;
alter table public.eleva_content_items enable row level security;
alter table public.eleva_member_setups enable row level security;
alter table public.eleva_daily_activities enable row level security;
alter table public.eleva_progress_events enable row level security;

create policy eleva_products_select_authenticated
  on public.eleva_products for select to authenticated
  using (true);

create policy eleva_movements_select_authenticated
  on public.eleva_movements for select to authenticated
  using (true);

create policy eleva_content_items_select_authenticated
  on public.eleva_content_items for select to authenticated
  using (true);

create policy eleva_member_setups_select_own
  on public.eleva_member_setups for select to authenticated
  using (user_id = auth.uid());

create policy eleva_member_setups_insert_own
  on public.eleva_member_setups for insert to authenticated
  with check (user_id = auth.uid());

create policy eleva_member_setups_update_own
  on public.eleva_member_setups for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy eleva_daily_activities_select_own
  on public.eleva_daily_activities for select to authenticated
  using (user_id = auth.uid());

create policy eleva_daily_activities_insert_own
  on public.eleva_daily_activities for insert to authenticated
  with check (user_id = auth.uid());

create policy eleva_daily_activities_update_own
  on public.eleva_daily_activities for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy eleva_progress_events_select_own
  on public.eleva_progress_events for select to authenticated
  using (user_id = auth.uid());

create policy eleva_progress_events_insert_own
  on public.eleva_progress_events for insert to authenticated
  with check (user_id = auth.uid());

revoke all on table public.eleva_products, public.eleva_movements, public.eleva_content_items,
  public.eleva_member_setups, public.eleva_daily_activities, public.eleva_progress_events from anon;

grant select on table public.eleva_products, public.eleva_movements, public.eleva_content_items to authenticated;
grant select, insert, update on table public.eleva_member_setups to authenticated;
grant select, insert, update on table public.eleva_daily_activities to authenticated;
grant select, insert on table public.eleva_progress_events to authenticated;
