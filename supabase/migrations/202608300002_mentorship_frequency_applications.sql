-- Kalì Franca — aplicações da Mentoria Frequência da Abundância
-- Esta migration não contém respostas reais, credenciais ou chaves privadas.

create table public.mentorship_applications (
  id uuid primary key default gen_random_uuid(),
  mentorship_slug text not null default 'frequencia-da-abundancia',
  status text not null default 'nova',
  full_name text not null check (char_length(btrim(full_name)) between 2 and 160),
  age_range text not null check (char_length(btrim(age_range)) between 2 and 80),
  sex text not null check (char_length(btrim(sex)) between 2 and 40),
  email text not null check (char_length(btrim(email)) between 5 and 254),
  whatsapp text not null check (char_length(btrim(whatsapp)) between 8 and 40),
  city_state text not null check (char_length(btrim(city_state)) between 2 and 160),
  challenge text not null check (char_length(btrim(challenge)) between 2 and 4000),
  beliefs text not null check (char_length(btrim(beliefs)) between 2 and 4000),
  energy_tools_experience text not null check (char_length(btrim(energy_tools_experience)) between 2 and 4000),
  priority_area text not null check (char_length(btrim(priority_area)) between 2 and 120),
  current_state text not null check (char_length(btrim(current_state)) between 2 and 240),
  predominant_feeling text not null check (char_length(btrim(predominant_feeling)) between 2 and 4000),
  previous_support text not null check (char_length(btrim(previous_support)) between 2 and 4000),
  perceived_block text not null check (char_length(btrim(perceived_block)) between 2 and 4000),
  desired_wins text not null check (char_length(btrim(desired_wins)) between 2 and 4000),
  commitment_score smallint not null check (commitment_score between 0 and 10),
  investment_readiness text not null check (char_length(btrim(investment_readiness)) between 2 and 160),
  consent boolean not null default false check (consent is true),
  consented_at timestamptz not null,
  client_submission_id uuid not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mentorship_applications_slug_value_check
    check (mentorship_slug = 'frequencia-da-abundancia'),
  constraint mentorship_applications_status_value_check
    check (status in ('nova', 'em_analise', 'aprovada', 'recusada', 'contatada')),
  constraint mentorship_applications_email_format_check
    check (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')
);

create index mentorship_applications_slug_created_at_idx
  on public.mentorship_applications (mentorship_slug, created_at desc);

create trigger mentorship_applications_set_updated_at
before update on public.mentorship_applications
for each row execute function public.set_updated_at();

alter table public.mentorship_applications enable row level security;

create policy mentorship_applications_anon_insert
  on public.mentorship_applications for insert to anon
  with check (
    mentorship_slug = 'frequencia-da-abundancia'
    and status = 'nova'
    and consent is true
    and consented_at <= now()
  );

create policy mentorship_applications_admin_select
  on public.mentorship_applications for select to authenticated
  using (public.is_administradora());

revoke all on table public.mentorship_applications from anon;
revoke insert, update, delete on table public.mentorship_applications from authenticated;

grant insert (
  full_name,
  age_range,
  sex,
  email,
  whatsapp,
  city_state,
  challenge,
  beliefs,
  energy_tools_experience,
  priority_area,
  current_state,
  predominant_feeling,
  previous_support,
  perceived_block,
  desired_wins,
  commitment_score,
  investment_readiness,
  consent,
  consented_at,
  client_submission_id
) on table public.mentorship_applications to anon;

grant select on table public.mentorship_applications to authenticated;
