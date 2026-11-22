create table public.nova_eu_orders (
  order_id text primary key,
  buyer_email text not null,
  product_slug text not null check (product_slug in ('abundancia','amor-proprio','oportunidades','leveza')),
  revoked boolean not null default false
);

alter table public.nova_eu_orders enable row level security;
revoke all on public.nova_eu_orders from anon, authenticated;
grant select (product_slug, revoked) on public.nova_eu_orders to authenticated;

create policy "Buyers read their active Nova Eu orders"
on public.nova_eu_orders for select to authenticated
using (
  not revoked and
  buyer_email = lower((select auth.jwt() ->> 'email'))
);

insert into storage.buckets (id, name, public)
values ('nova-eu', 'nova-eu', false)
on conflict (id) do nothing;

create policy "Buyers read Nova Eu files from purchased tracks"
on storage.objects for select to authenticated
using (
  bucket_id = 'nova-eu' and exists (
    select 1 from public.nova_eu_orders
    where product_slug = (storage.foldername(name))[1] and not revoked
  )
);

grant select, insert, update on public.nova_eu_orders to service_role;

create function public.record_nova_eu_order(
  p_order_id text, p_email text, p_slug text, p_revoked boolean
) returns void
language sql
set search_path = ''
as $$
  insert into public.nova_eu_orders as existing (order_id, buyer_email, product_slug, revoked)
  values (p_order_id, lower(trim(p_email)), p_slug, p_revoked)
  on conflict (order_id) do update
    set revoked = existing.revoked or excluded.revoked
    where existing.product_slug = excluded.product_slug
      and existing.buyer_email = excluded.buyer_email;
$$;

revoke all on function public.record_nova_eu_order(text,text,text,boolean) from public, anon, authenticated;
grant execute on function public.record_nova_eu_order(text,text,text,boolean) to service_role;
