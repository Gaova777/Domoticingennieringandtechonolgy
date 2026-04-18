import type { Metadata } from 'next';
import { CartPageClient } from '@/components/cart/cart-page-client';

export const metadata: Metadata = {
  title: 'Carrito',
  description:
    'Revisa los productos en tu carrito antes de ir al pago. Envíos a toda Colombia.',
};

export default function CartPage() {
  return (
    <div className="border-t border-border">
      <CartPageClient />
    </div>
  );
}
