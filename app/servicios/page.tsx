import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Instalación profesional de domótica, CCTV, cerraduras inteligentes y puertas automáticas en Pereira y Risaralda.',
};

export default function ServicesPage() {
  return (
    <PagePlaceholder
      eyebrow="Servicios"
      title="Instalación profesional"
      description="Diseño, suministro e instalación de domótica, seguridad y automatización para hogares, comercios y propiedad horizontal."
      phase="Fase 3 — Detalle por servicio próximamente"
    />
  );
}
