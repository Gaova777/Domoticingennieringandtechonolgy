import 'server-only';

import { createClient } from '@/lib/supabase/server';

export type DBOrder = {
  id: string;
  orderNumber: string;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string | null;
  createdAt: string;
  itemsCount: number;
};

export async function getCurrentUser() {
  const sb = await createClient();
  const { data } = await sb.auth.getUser();
  return data.user ?? null;
}

export async function getCurrentProfile() {
  const sb = await createClient();
  const { data: auth } = await sb.auth.getUser();
  if (!auth.user) return null;
  const { data } = await sb
    .from('profiles')
    .select('id, full_name, phone, city, role')
    .eq('id', auth.user.id)
    .maybeSingle();
  return data;
}

export async function getMyOrders(): Promise<DBOrder[]> {
  const sb = await createClient();
  const { data, error } = await sb
    .from('orders')
    .select(
      'id, order_number, subtotal, shipping, total, status, payment_method, created_at, items:order_items(id)',
    )
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    orderNumber: row.order_number,
    subtotal: row.subtotal,
    shipping: row.shipping,
    total: row.total,
    status: row.status,
    paymentMethod: row.payment_method,
    createdAt: row.created_at,
    itemsCount: Array.isArray(row.items) ? row.items.length : 0,
  }));
}
