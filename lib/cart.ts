import { SHIPPING } from '@/lib/constants';

export type CartTotals = {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShipping: boolean;
};

export function computeTotals({
  subtotal,
  discount = 0,
  overrideShipping,
}: {
  subtotal: number;
  discount?: number;
  overrideShipping?: number;
}): CartTotals {
  const afterDiscount = Math.max(0, subtotal - discount);
  const freeShipping = afterDiscount >= SHIPPING.freeShippingThresholdCop;
  const shipping =
    typeof overrideShipping === 'number'
      ? overrideShipping
      : freeShipping
        ? 0
        : SHIPPING.flatRateCop;
  const total = afterDiscount + shipping;
  return { subtotal, discount, shipping, total, freeShipping };
}
