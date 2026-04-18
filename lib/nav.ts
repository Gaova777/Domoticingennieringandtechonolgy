export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Productos', href: '/productos', description: 'Catálogo completo' },
  { label: 'Servicios', href: '/servicios', description: 'Instalación y asesoría' },
  { label: 'Configurador', href: '/configurador', description: 'Arma tu proyecto' },
  { label: 'Aprendé', href: '/blog', description: 'Guías y comparativas' },
  { label: 'Contacto', href: '/contacto', description: 'Hablemos' },
];

export const FOOTER_SERVICES: NavItem[] = [
  { label: 'Domótica residencial', href: '/servicios/domotica' },
  { label: 'Cámaras y CCTV', href: '/servicios/camaras' },
  { label: 'Cerraduras inteligentes', href: '/servicios/cerraduras' },
  { label: 'Puertas automáticas', href: '/servicios/puertas' },
  { label: 'Cableado estructurado', href: '/servicios/cableado' },
];

export const FOOTER_LEGAL: NavItem[] = [
  { label: 'Términos y condiciones', href: '/legal/terminos' },
  { label: 'Política de privacidad', href: '/legal/privacidad' },
  { label: 'Política de devoluciones', href: '/legal/devoluciones' },
  { label: 'Política de garantía', href: '/legal/garantia' },
];
