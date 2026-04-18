import type { Metadata } from 'next';
import { CheckoutGuard } from '@/components/checkout/checkout-guard';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Finaliza tu compra con envío a toda Colombia.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="border-t border-border">
      <CheckoutGuard />
    </div>
  );
}
