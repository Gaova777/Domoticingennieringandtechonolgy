export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavSection = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const PRIMARY_NAV: NavSection[] = [
  {
    label: 'Productos',
    href: '/productos',
    description: 'Catálogo completo',
    children: [
      { label: 'Todos los productos', href: '/productos' },
      { label: 'Cámaras y CCTV', href: '/productos?cat=camaras' },
      { label: 'Cerraduras inteligentes', href: '/productos?cat=cerraduras' },
      { label: 'Domótica y módulos', href: '/productos?cat=domotica' },
      { label: 'Sensores', href: '/productos?cat=sensores' },
      { label: 'Iluminación', href: '/productos?cat=iluminacion' },
      { label: 'Motores y puertas', href: '/productos?cat=motores' },
      { label: 'Hubs & Gateways', href: '/productos?cat=hubs' },
    ],
  },
  {
    label: 'Servicios',
    href: '/servicios',
    description: 'Instalación y asesoría',
    children: [
      { label: 'Todos los servicios', href: '/servicios' },
      { label: 'Domótica residencial', href: '/servicios/domotica' },
      { label: 'Cámaras y CCTV', href: '/servicios/camaras' },
      { label: 'Cerraduras inteligentes', href: '/servicios/cerraduras' },
      { label: 'Puertas automáticas', href: '/servicios/puertas' },
      { label: 'Iluminación inteligente', href: '/servicios/iluminacion' },
      { label: 'Cableado y redes', href: '/servicios/cableado' },
    ],
  },
  {
    label: 'Configurador',
    href: '/configurador',
    description: 'Armá tu proyecto',
  },
  {
    label: 'Aprendé',
    href: '/blog',
    description: 'Guías y comparativas',
  },
  {
    label: 'Contacto',
    href: '/contacto',
    description: 'Hablemos',
  },
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

export const HOME_ANCHORS: NavItem[] = [
  { label: 'Destacados', href: '/#destacados' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Configurador', href: '/#configurador' },
  { label: 'Testimonios', href: '/#testimonios' },
  { label: 'Visítanos', href: '/#visitanos' },
];
