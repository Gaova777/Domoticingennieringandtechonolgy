import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Mi cuenta',
  description: 'Gestioná tus pedidos, direcciones y cotizaciones.',
};

export default function AccountPage() {
  return (
    <PagePlaceholder
      eyebrow="Mi cuenta"
      title="Acceso a tu cuenta"
      description="Desde acá vas a poder ver tus pedidos, cotizaciones y direcciones guardadas."
      phase="Fase 6 — autenticación en camino"
    />
  );
}
