-- ============================================================================
-- Phase 5: promotions table + is_star flag for products
-- ============================================================================

-- Star product flag ----------------------------------------------------------
alter table public.products
  add column if not exists is_star boolean not null default false;

create index if not exists products_star_idx
  on public.products (is_star)
  where is_active and is_star;

-- Promotions -----------------------------------------------------------------
create type public.promotion_type as enum ('percent', 'fixed_cop');

create table public.promotions (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  description text,
  type public.promotion_type not null,
  value int not null check (value > 0),
  min_purchase int not null default 0 check (min_purchase >= 0),
  max_uses int check (max_uses is null or max_uses > 0),
  used_count int not null default 0 check (used_count >= 0),
  valid_from timestamptz not null default now(),
  valid_to timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index promotions_code_unique_idx on public.promotions (upper(code));
create index promotions_active_window_idx
  on public.promotions (valid_from, valid_to)
  where is_active;

create trigger promotions_updated_at
before update on public.promotions
for each row execute function public.set_updated_at();

alter table public.promotions enable row level security;

-- Public can read only currently-valid active promos.
create policy "promotions_public_read_valid" on public.promotions
  for select using (
    is_active
    and now() >= valid_from
    and (valid_to is null or now() <= valid_to)
    and (max_uses is null or used_count < max_uses)
  );

create policy "promotions_admin_insert" on public.promotions
  for insert with check (public.is_admin());
create policy "promotions_admin_update" on public.promotions
  for update using (public.is_admin()) with check (public.is_admin());
create policy "promotions_admin_delete" on public.promotions
  for delete using (public.is_admin());

-- Atomic usage counter (called from server action).
create or replace function public.increment_promo_usage(promo_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.promotions
     set used_count = used_count + 1
   where id = promo_id
     and (max_uses is null or used_count < max_uses);
$$;

-- Seed sample promos --------------------------------------------------------
insert into public.promotions (code, description, type, value, min_purchase, max_uses) values
  ('BIENVENIDO10', 'Descuento del 10% en tu primera compra (mínimo $100.000)', 'percent', 10, 100000, 500),
  ('ENVIOGRATIS', 'Envío gratis (mínimo $150.000)', 'fixed_cop', 15000, 150000, NULL);

-- Mark a couple of catalog items as star products for demo
update public.products
set is_star = true
where slug in (
  'hikvision-ds-2cd2043g2-ip-4mp',
  'sonoff-mini-r2',
  'aqara-u100-smart-lock'
);
