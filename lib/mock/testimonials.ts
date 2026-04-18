export type Testimonial = {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar?: string;
  message: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service: string;
};

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Carolina Marín',
    role: 'Propietaria',
    city: 'Pereira',
    message:
      'Instalaron cámaras en toda la casa en una mañana. Se nota que saben: cableado limpio, app funcionando y me explicaron todo. Volvería a contratarlos.',
    rating: 5,
    service: 'Cámaras y CCTV',
  },
  {
    id: 't2',
    name: 'Andrés Ospina',
    role: 'Administrador PH',
    city: 'Dosquebradas',
    message:
      'Cambiamos las talanqueras y el control de acceso del conjunto. El equipo asesoró la marca correcta y pasaron la visita del asesor técnico al siguiente día.',
    rating: 5,
    service: 'Control de acceso',
  },
  {
    id: 't3',
    name: 'Valeria Cárdenas',
    role: 'Arquitecta',
    city: 'Pereira',
    message:
      'Tengo tres proyectos con ellos. Respuesta rápida por WhatsApp, precios justos y terminaciones como debe ser. Los recomiendo a mis clientes.',
    rating: 5,
    service: 'Domótica integral',
  },
];
