-- ============================================================================
-- Seed: reference data (categories, brands, services, testimonials)
-- Idempotent on natural unique keys so re-applying is safe.
-- ============================================================================

-- Categories -----------------------------------------------------------------
insert into public.categories (slug, name, description, sort_order) values
  ('camaras',     'Cámaras',         'IP, analógicas, PTZ y bullet',               1),
  ('cerraduras',  'Cerraduras',      'Huella, clave, RFID y biométricas',          2),
  ('domotica',    'Domótica',        'Interruptores y módulos WiFi/Zigbee',        3),
  ('sensores',    'Sensores',        'Movimiento, humo, apertura, inundación',     4),
  ('iluminacion', 'Iluminación',     'Bombillos, cintas LED, dimmers',             5),
  ('motores',     'Motores',         'Puertas corredizas, garaje, talanqueras',    6),
  ('hubs',        'Hubs & Gateways', 'Controladores y puentes multi-protocolo',    7)
on conflict (slug) do nothing;

-- Brands --------------------------------------------------------------------
insert into public.brands (slug, name) values
  ('hikvision', 'Hikvision'),
  ('dahua',     'Dahua'),
  ('ezviz',     'EZVIZ'),
  ('sonoff',    'Sonoff'),
  ('tuya',      'Tuya'),
  ('shelly',    'Shelly'),
  ('xiaomi',    'Xiaomi'),
  ('aqara',     'Aqara')
on conflict (slug) do nothing;

-- Services ------------------------------------------------------------------
insert into public.services (slug, name, tagline, description, icon, accent, sort_order) values
  ('domotica',    'Domótica residencial',    'Tu casa te escucha',        'Iluminación, clima y escenas automatizadas con control por voz, app o sensores.',                  'Home',       'cyan',    1),
  ('camaras',     'Cámaras y CCTV',          'Vigilancia 24/7',           'Cámaras IP/analógicas, NVR, visión nocturna y acceso remoto desde el celular.',                    'Camera',     'magenta', 2),
  ('cerraduras',  'Cerraduras inteligentes', 'Llaves que no se pierden',  'Huella, clave, tarjeta RFID y app. Adiós a duplicar llaves cada semana.',                          'KeyRound',   'yellow',  3),
  ('puertas',     'Puertas automáticas',     'Entra sin bajarte',         'Corredizas, batientes, motores para garaje y talanqueras para conjuntos.',                         'DoorClosed', 'green',   4),
  ('iluminacion', 'Iluminación inteligente', 'Escenas a tu medida',       'Bombillos, cintas LED, dimmers con color y escenas programadas.',                                  'Lightbulb',  'cyan',    5),
  ('cableado',    'Cableado y redes',        'La base de todo',           'Cableado estructurado, certificación, redes WiFi profesionales y switches PoE.',                   'Cable',      'magenta', 6)
on conflict (slug) do nothing;

-- Testimonials --------------------------------------------------------------
-- No natural unique key; migrations only run once so no guard needed.
insert into public.testimonials (name, role, city, message, rating, service, sort_order) values
  ('Carolina Marín',    'Propietaria',      'Pereira',
   'Instalaron cámaras en toda la casa en una mañana. Se nota que saben: cableado limpio, app funcionando y me explicaron todo. Volvería a contratarlos.',
   5, 'Cámaras y CCTV',    1),
  ('Andrés Ospina',     'Administrador PH', 'Dosquebradas',
   'Cambiamos las talanqueras y el control de acceso del conjunto. El equipo asesoró la marca correcta y pasaron la visita del asesor técnico al siguiente día.',
   5, 'Control de acceso', 2),
  ('Valeria Cárdenas',  'Arquitecta',       'Pereira',
   'Tengo tres proyectos con ellos. Respuesta rápida por WhatsApp, precios justos y terminaciones como debe ser. Los recomiendo a mis clientes.',
   5, 'Domótica integral', 3);
