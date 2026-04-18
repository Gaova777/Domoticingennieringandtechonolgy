-- ============================================================================
-- Domotic E Ingeniería — Initial schema
-- Tables, enums, helpers, triggers and Row Level Security.
-- ============================================================================

create extension if not exists "pgcrypto";

-- Enums ----------------------------------------------------------------------
create type public.user_role as enum ('customer', 'admin');
create type public.order_status as enum (
  'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
);
create type public.quote_status as enum (
  'pending', 'contacted', 'quoted', 'approved', 'in_progress', 'completed', 'cancelled'
);

-- Generic updated_at trigger -------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- profiles (extends auth.users)
-- ============================================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  city text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Admin check helper — SECURITY DEFINER to avoid recursive RLS on profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Auto-create profile row on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ============================================================================
-- categories
-- ============================================================================
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  icon text,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index categories_slug_idx on public.categories (slug);
create index categories_sort_idx on public.categories (sort_order);

-- ============================================================================
-- brands
-- ============================================================================
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  logo_url text,
  description text,
  created_at timestamptz not null default now()
);

create index brands_slug_idx on public.brands (slug);

-- ============================================================================
-- products
-- ============================================================================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  sku text unique not null,
  name text not null,
  description text,
  category_id uuid not null references public.categories(id) on delete restrict,
  brand_id uuid not null references public.brands(id) on delete restrict,
  price int not null check (price >= 0),
  compare_at_price int check (compare_at_price is null or compare_at_price > price),
  rating numeric(2,1) not null default 0 check (rating >= 0 and rating <= 5),
  reviews int not null default 0 check (reviews >= 0),
  stock int not null default 0 check (stock >= 0),
  badges text[] not null default '{}',
  short_spec text,
  protocol text,
  warranty_months int not null default 12 check (warranty_months >= 0),
  specs jsonb not null default '[]'::jsonb,
  includes text[] not null default '{}',
  image_url text,
  gallery_urls text[] not null default '{}',
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_slug_idx on public.products (slug);
create index products_active_category_idx on public.products (category_id) where is_active;
create index products_active_brand_idx on public.products (brand_id) where is_active;
create index products_created_at_idx on public.products (created_at desc) where is_active;
create index products_featured_idx on public.products (is_featured) where is_active and is_featured;

create trigger products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- ============================================================================
-- services
-- ============================================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  long_description text,
  icon text,
  accent text check (accent is null or accent in ('cyan', 'magenta', 'yellow', 'green')),
  image_url text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index services_slug_idx on public.services (slug);
create index services_active_sort_idx on public.services (sort_order) where is_active;

-- ============================================================================
-- orders
-- ============================================================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  order_number text unique not null,
  subtotal int not null check (subtotal >= 0),
  shipping int not null default 0 check (shipping >= 0),
  total int not null check (total >= 0),
  status public.order_status not null default 'pending',
  shipping_address jsonb,
  payment_method text,
  payment_ref text,
  guest_email text,
  guest_phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_user_idx on public.orders (user_id);
create index orders_status_idx on public.orders (status, created_at desc);
create index orders_number_idx on public.orders (order_number);

create trigger orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- ============================================================================
-- order_items
-- ============================================================================
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_snapshot jsonb not null,
  quantity int not null check (quantity > 0),
  unit_price int not null check (unit_price >= 0),
  subtotal int not null check (subtotal >= 0),
  created_at timestamptz not null default now()
);

create index order_items_order_idx on public.order_items (order_id);
create index order_items_product_idx on public.order_items (product_id);

-- ============================================================================
-- quote_requests
-- ============================================================================
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  city text not null,
  service_id uuid references public.services(id) on delete set null,
  description text not null,
  file_url text,
  tentative_date date,
  status public.quote_status not null default 'pending',
  admin_response text,
  pdf_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index quote_user_idx on public.quote_requests (user_id);
create index quote_status_idx on public.quote_requests (status, created_at desc);

create trigger quote_updated_at
before update on public.quote_requests
for each row execute function public.set_updated_at();

-- ============================================================================
-- testimonials
-- ============================================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  city text,
  message text not null,
  avatar_url text,
  rating int check (rating between 1 and 5),
  service text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index testimonials_active_sort_idx on public.testimonials (sort_order) where is_active;

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.services enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.quote_requests enable row level security;
alter table public.testimonials enable row level security;

-- profiles ----------------------------------------------------
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles_update_own_or_admin" on public.profiles
  for update using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

create policy "profiles_insert_self" on public.profiles
  for insert with check (auth.uid() = id or public.is_admin());

-- categories --------------------------------------------------
create policy "categories_public_read" on public.categories
  for select using (true);
create policy "categories_admin_insert" on public.categories
  for insert with check (public.is_admin());
create policy "categories_admin_update" on public.categories
  for update using (public.is_admin()) with check (public.is_admin());
create policy "categories_admin_delete" on public.categories
  for delete using (public.is_admin());

-- brands ------------------------------------------------------
create policy "brands_public_read" on public.brands
  for select using (true);
create policy "brands_admin_insert" on public.brands
  for insert with check (public.is_admin());
create policy "brands_admin_update" on public.brands
  for update using (public.is_admin()) with check (public.is_admin());
create policy "brands_admin_delete" on public.brands
  for delete using (public.is_admin());

-- products ----------------------------------------------------
create policy "products_public_read" on public.products
  for select using (is_active = true or public.is_admin());
create policy "products_admin_insert" on public.products
  for insert with check (public.is_admin());
create policy "products_admin_update" on public.products
  for update using (public.is_admin()) with check (public.is_admin());
create policy "products_admin_delete" on public.products
  for delete using (public.is_admin());

-- services ----------------------------------------------------
create policy "services_public_read" on public.services
  for select using (is_active = true or public.is_admin());
create policy "services_admin_insert" on public.services
  for insert with check (public.is_admin());
create policy "services_admin_update" on public.services
  for update using (public.is_admin()) with check (public.is_admin());
create policy "services_admin_delete" on public.services
  for delete using (public.is_admin());

-- testimonials ------------------------------------------------
create policy "testimonials_public_read" on public.testimonials
  for select using (is_active = true or public.is_admin());
create policy "testimonials_admin_insert" on public.testimonials
  for insert with check (public.is_admin());
create policy "testimonials_admin_update" on public.testimonials
  for update using (public.is_admin()) with check (public.is_admin());
create policy "testimonials_admin_delete" on public.testimonials
  for delete using (public.is_admin());

-- orders ------------------------------------------------------
create policy "orders_select_own_or_admin" on public.orders
  for select using (user_id = auth.uid() or public.is_admin());
create policy "orders_insert_self_or_guest" on public.orders
  for insert with check (
    user_id = auth.uid() or user_id is null or public.is_admin()
  );
create policy "orders_update_admin" on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

-- order_items -------------------------------------------------
create policy "order_items_select_via_order" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or public.is_admin())
    )
  );
create policy "order_items_insert_via_order" on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or o.user_id is null or public.is_admin())
    )
  );

-- quote_requests ---------------------------------------------
create policy "quote_select_own_or_admin" on public.quote_requests
  for select using (user_id = auth.uid() or public.is_admin());
create policy "quote_insert_any" on public.quote_requests
  for insert with check (true);
create policy "quote_update_admin" on public.quote_requests
  for update using (public.is_admin()) with check (public.is_admin());
