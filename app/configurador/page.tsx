import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Configurador de proyecto',
  description:
    'Armá tu proyecto de domótica o seguridad en minutos. Te proponemos el kit y cotización ideal.',
};

export default function ConfiguradorPage() {
  return (
    <PagePlaceholder
      eyebrow="Configurador"
      title="Armá tu proyecto en minutos"
      description="Respondé unas preguntas y te proponemos el kit de productos + instalación que más se ajusta a tu espacio y presupuesto."
      phase="Feature diferenciador · en diseño"
    />
  );
}
