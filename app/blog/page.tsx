import type { Metadata } from 'next';
import { PagePlaceholder } from '@/components/shared/page-placeholder';

export const metadata: Metadata = {
  title: 'Aprendé',
  description:
    'Guías, comparativas y tutoriales sobre domótica, cámaras de seguridad y hogar inteligente.',
};

export default function BlogPage() {
  return (
    <PagePlaceholder
      eyebrow="Centro de aprendizaje"
      title="Aprendé sobre hogar inteligente"
      description="Guías prácticas, comparativas entre marcas y casos reales de instalaciones en Pereira y Risaralda."
      phase="Contenido en producción"
    />
  );
}
