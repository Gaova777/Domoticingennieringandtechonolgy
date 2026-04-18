import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Carrito',
  description: 'Revisá tu carrito antes de proceder al pago.',
};

export default function CartPage() {
  return (
    <PagePlaceholder
      eyebrow="Carrito"
      title="Tu carrito"
      description="Acá vas a ver los productos que vayas agregando. Podés seguir comprando o proceder al pago."
      phase="Fase 5 — UI del carrito en camino"
    />
  );
}
