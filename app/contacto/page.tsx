import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Hablá con nosotros por WhatsApp, teléfono o correo. Visitanos en Pereira, Risaralda.',
};

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Contacto"
      title="Hablemos de tu proyecto"
      description="Escribinos por WhatsApp, llamá, o visitanos en Pereira. Respondemos en horario comercial."
      phase="Fase 3 — formulario y mapa en camino"
    />
  );
}
