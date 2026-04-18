import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Cotizar servicio',
  description:
    'Solicitá una cotización sin compromiso para tu proyecto de domótica, seguridad o automatización.',
};

export default function QuotePage() {
  return (
    <PagePlaceholder
      eyebrow="Cotización"
      title="Solicitá tu cotización"
      description="Contanos qué querés hacer y te enviamos una propuesta con productos, instalación y tiempos."
      phase="Fase 7 — formulario completo próximamente"
    />
  );
}
