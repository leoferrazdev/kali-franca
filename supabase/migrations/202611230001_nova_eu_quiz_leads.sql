create table if not exists public.nova_eu_quiz_leads (
  id bigint generated always as identity primary key,
  nome text not null check (length(trim(nome)) between 1 and 100),
  email text not null check (email = lower(trim(email)) and length(email) <= 254),
  celular text not null check (celular ~ '^[+]55[1-9][0-9]9[0-9]{8}$'),
  ja_fez boolean not null,
  criado_em timestamptz not null default now(),
  unique (nome, email, celular, ja_fez)
);

alter table public.nova_eu_quiz_leads enable row level security;
revoke all on public.nova_eu_quiz_leads from public, anon, authenticated;
grant select, insert on public.nova_eu_quiz_leads to service_role;

create index if not exists nova_eu_quiz_leads_email_idx
  on public.nova_eu_quiz_leads (email);
