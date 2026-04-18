'use server';

import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { supabasePublic } from '@/lib/supabase/public';
import { computeTotals } from '@/lib/cart';
import type { Json } from '@/types/database';

const customerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(120),
  phone: z.string().min(7).max(25),
});

const shippingSchema = z.object({
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(80),
  department: z.string().min(2).max(80),
  postalCode: z.string().max(20).optional().or(z.literal('')),
  notes: z.string().max(500).optional().or(z.literal('')),
});

const itemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  price: z.number().int().positive(),
  quantity: z.number().int().positive().max(99),
});

const schema = z.object({
  customer: customerSchema,
  shipping: shippingSchema,
  items: z.array(itemSchema).min(1, 'El carrito está vacío'),
  promoCode: z.string().max(30).optional(),
  paymentMethod: z.enum(['wompi', 'whatsapp']),
  acceptPolicy: z
    .boolean()
    .refine((v) => v === true, 'Debes aceptar términos y política'),
});

export type CreateOrderInput = z.infer<typeof schema>;

export type CreateOrderResult =
  | {
      ok: true;
      orderId: string;
      orderNumber: string;
      paymentMethod: 'wompi' | 'whatsapp';
      total: number;
      summary: string;
    }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const suffix = Date.now().toString().slice(-6);
  const rand = Math.floor(Math.random() * 900 + 100);
  return `DOM-${year}-${suffix}${rand}`;
}

export async function createOrder(raw: unknown): Promise<CreateOrderResult> {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Revisa los datos del formulario',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  const sbPublic = supabasePublic();

  // Re-fetch current product prices + stock from DB (server-authoritative).
  const { data: products, error: prodErr } = await sbPublic
    .from('products')
    .select('id, slug, sku, name, price, stock, is_active')
    .in(
      'id',
      data.items.map((i) => i.id),
    );

  if (prodErr || !products) {
    console.error('[createOrder] products fetch', prodErr);
    return { ok: false, error: 'No pudimos validar los productos' };
  }

  type SnapshotInfo = {
    sku: string;
    name: string;
    slug: string;
    unit_price: number;
  };
  type Snapshot = {
    product_id: string;
    product_snapshot: SnapshotInfo;
    quantity: number;
    unit_price: number;
    subtotal: number;
  };
  const snapshots: Snapshot[] = [];

  for (const cartItem of data.items) {
    const product = products.find((p) => p.id === cartItem.id);
    if (!product || !product.is_active) {
      return {
        ok: false,
        error: `El producto "${cartItem.name}" ya no está disponible`,
      };
    }
    if (cartItem.quantity > product.stock) {
      return {
        ok: false,
        error: `Solo quedan ${product.stock} unidades de "${product.name}"`,
      };
    }
    snapshots.push({
      product_id: product.id,
      product_snapshot: {
        sku: product.sku,
        name: product.name,
        slug: product.slug,
        unit_price: product.price,
      },
      quantity: cartItem.quantity,
      unit_price: product.price,
      subtotal: product.price * cartItem.quantity,
    });
  }

  const subtotal = snapshots.reduce((s, i) => s + i.subtotal, 0);

  // Validate promo on server.
  let discount = 0;
  let promoId: string | null = null;
  if (data.promoCode) {
    const code = data.promoCode.trim().toUpperCase();
    const { data: promo } = await sbPublic
      .from('promotions')
      .select('id, code, type, value, min_purchase')
      .ilike('code', code)
      .maybeSingle();

    if (promo && subtotal >= promo.min_purchase) {
      discount =
        promo.type === 'percent'
          ? Math.round((subtotal * promo.value) / 100)
          : Math.min(promo.value, subtotal);
      promoId = promo.id;
    }
  }

  const totals = computeTotals({ subtotal, discount });
  const orderNumber = generateOrderNumber();
  const admin = supabaseAdmin();

  const { data: order, error: orderErr } = await admin
    .from('orders')
    .insert({
      order_number: orderNumber,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      status: 'pending',
      shipping_address: {
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
        address: data.shipping.address,
        city: data.shipping.city,
        department: data.shipping.department,
        postalCode: data.shipping.postalCode || null,
        notes: data.shipping.notes || null,
      },
      payment_method: data.paymentMethod,
      guest_email: data.customer.email,
      guest_phone: data.customer.phone,
      notes: promoId ? `promo_id:${promoId}` : null,
    })
    .select('id, order_number')
    .single();

  if (orderErr || !order) {
    console.error('[createOrder] order insert', orderErr);
    return { ok: false, error: 'No pudimos crear la orden' };
  }

  const itemsPayload = snapshots.map((s) => ({
    ...s,
    order_id: order.id,
    product_snapshot: s.product_snapshot as unknown as Json,
  }));
  const { error: itemsErr } = await admin
    .from('order_items')
    .insert(itemsPayload);

  if (itemsErr) {
    console.error('[createOrder] order_items insert', itemsErr);
  }

  // Decrement stock for each item. Best-effort (no row-level lock available).
  await Promise.all(
    snapshots.map(async (s) => {
      try {
        await admin.rpc('decrement_stock', {
          product_id: s.product_id,
          amount: s.quantity,
        });
      } catch (err) {
        console.error('[createOrder] decrement_stock', err);
      }
    }),
  );

  if (promoId) {
    try {
      await admin.rpc('increment_promo_usage', { promo_id: promoId });
    } catch (err) {
      console.error('[createOrder] increment_promo_usage', err);
    }
  }

  const summary = snapshots
    .map(
      (s) =>
        `${s.quantity}× ${s.product_snapshot.name} (${s.product_snapshot.sku})`,
    )
    .join(' · ');

  return {
    ok: true,
    orderId: order.id,
    orderNumber: order.order_number,
    paymentMethod: data.paymentMethod,
    total: totals.total,
    summary,
  };
}
