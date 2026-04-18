-- ============================================================================
-- Helper RPCs for checkout flow: atomic stock decrement.
-- ============================================================================

create or replace function public.decrement_stock(product_id uuid, amount int)
returns void
language sql
security definer
set search_path = public
as $$
  update public.products
     set stock = greatest(0, stock - amount),
         updated_at = now()
   where id = product_id;
$$;

grant execute on function public.decrement_stock(uuid, int) to service_role;
grant execute on function public.increment_promo_usage(uuid) to service_role;
