import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Productos',
  description:
    'Catálogo de domótica, cámaras, cerraduras inteligentes y accesorios con envío a toda Colombia.',
};

export default function ProductsPage() {
  return (
    <PagePlaceholder
      eyebrow="Catálogo"
      title="Productos"
      description="Cámaras, cerraduras, sensores, kits de domótica y más — con envío a toda Colombia y soporte local en Pereira."
      phase="Fase 4 — Catálogo completo en camino"
    />
  );
}
