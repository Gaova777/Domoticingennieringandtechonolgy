'use server';

import {
  validatePromoCode as validate,
  type PromoValidation,
} from '@/lib/supabase/queries';

export async function checkPromoCode(
  code: string,
  subtotalCop: number,
): Promise<PromoValidation> {
  return validate(code, subtotalCop);
}
