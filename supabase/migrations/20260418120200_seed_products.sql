-- ============================================================================
-- Seed: catalog products (22 items)
-- Uses category/brand slugs to resolve FK ids.
-- ============================================================================

with rows as (
  select * from (values
    -- Cámaras ----------------------------------------------------------------
    (
      'hikvision-ds-2cd2043g2-ip-4mp', 'HIK-2043G2', 'Cámara IP 4MP AcuSense',
      'camaras', 'hikvision',
      480000, 550000::int, 4.8::numeric, 124, 12,
      ARRAY['Envío gratis','AcuSense']::text[], '4MP · IR 30m · IP67 · PoE', 'PoE'::text, 24,
      'Cámara IP bullet de 4MP con tecnología AcuSense — filtrado inteligente de alertas por humano/vehículo. Ideal para frente de vivienda o comercio.',
      '[{"label":"Resolución","value":"4 MP (2688 × 1520)"},{"label":"Visión nocturna","value":"IR hasta 30 m"},{"label":"Protección","value":"IP67"},{"label":"Alimentación","value":"PoE 802.3af"},{"label":"Audio","value":"Entrada/salida integrada"},{"label":"Codec","value":"H.265+ · H.264"}]'::jsonb,
      ARRAY['Cámara','Adaptador estanco','Kit de fijación','Manual']::text[], '2026-02-10'::timestamptz
    ),
    (
      'dahua-ipc-hfw2431s', 'DAH-2431S', 'Dahua 4MP Color Night',
      'camaras', 'dahua',
      520000, NULL::int, 4.7::numeric, 89, 8,
      ARRAY['Color nocturno']::text[], '4MP · Full color · IP67 · PoE', 'PoE'::text, 24,
      'Cámara bullet Dahua con visión nocturna a todo color gracias a su lente de apertura ampliada.',
      '[{"label":"Resolución","value":"4 MP"},{"label":"Visión nocturna","value":"Color hasta 40 m"},{"label":"Protección","value":"IP67"},{"label":"Alimentación","value":"PoE"},{"label":"Codec","value":"H.265"}]'::jsonb,
      ARRAY[]::text[], '2026-03-01'::timestamptz
    ),
    (
      'ezviz-c3n-exterior', 'EZV-C3N', 'EZVIZ C3N Exterior',
      'camaras', 'ezviz',
      265000, NULL::int, 4.5::numeric, 198, 23,
      ARRAY['Color noche']::text[], '1080p · IP67 · WiFi · App', 'WiFi'::text, 12,
      'Cámara WiFi exterior con visión a color en la noche y detección humana. Ideal para casa sin cableado.',
      '[{"label":"Resolución","value":"1080p Full HD"},{"label":"Conectividad","value":"WiFi 2.4 GHz"},{"label":"Visión nocturna","value":"Color hasta 25 m"},{"label":"Protección","value":"IP67"},{"label":"Almacenamiento","value":"microSD hasta 256 GB · Cloud"}]'::jsonb,
      ARRAY[]::text[], '2026-01-20'::timestamptz
    ),
    (
      'hikvision-ds-2de4425iw-ae', 'HIK-PTZ4425', 'PTZ Hikvision 4MP 25x',
      'camaras', 'hikvision',
      2850000, NULL::int, 4.9::numeric, 42, 3,
      ARRAY['PTZ','AutoTracking']::text[], '4MP · Zoom 25x · Auto-tracking · IP66', 'PoE+'::text, 36,
      'Cámara PTZ profesional con zoom óptico 25x y seguimiento automático. Para parqueaderos, bodegas y perímetros amplios.',
      '[{"label":"Resolución","value":"4 MP"},{"label":"Zoom","value":"25x óptico"},{"label":"Pan/Tilt","value":"360° / -15°–90°"},{"label":"Protección","value":"IP66"}]'::jsonb,
      ARRAY[]::text[], '2026-03-15'::timestamptz
    ),
    (
      'ezviz-db1-doorbell', 'EZV-DB1', 'Timbre con video DB1',
      'camaras', 'ezviz',
      430000, NULL::int, 4.5::numeric, 76, 7,
      ARRAY['Video + audio']::text[], '2K · PIR · WiFi · Audio bidireccional', 'WiFi'::text, 18,
      'Timbre con cámara 2K, detección PIR y llamada bidireccional al celular.',
      '[{"label":"Resolución","value":"2K (1600p)"},{"label":"Campo de visión","value":"180°"},{"label":"Audio","value":"Bidireccional"}]'::jsonb,
      ARRAY[]::text[], '2026-02-18'::timestamptz
    ),

    -- Domótica ---------------------------------------------------------------
    (
      'sonoff-mini-r2', 'SON-MINI-R2', 'Sonoff Mini R2 WiFi',
      'domotica', 'sonoff',
      75000, NULL::int, 4.7::numeric, 312, 48,
      ARRAY['Best seller']::text[], '10 A · WiFi · Alexa/Google · eWeLink', 'WiFi'::text, 12,
      'Módulo relé WiFi para esconder detrás del interruptor físico. Conserva el control manual y agrega control por app/voz.',
      '[{"label":"Corriente máx.","value":"10 A"},{"label":"Conectividad","value":"WiFi 2.4 GHz"},{"label":"Asistentes","value":"Alexa · Google · SmartThings"},{"label":"API","value":"eWeLink · Home Assistant"}]'::jsonb,
      ARRAY[]::text[], '2025-11-01'::timestamptz
    ),
    (
      'sonoff-basic-r4', 'SON-BAS-R4', 'Sonoff Basic R4',
      'domotica', 'sonoff',
      58000, NULL::int, 4.6::numeric, 178, 32,
      ARRAY[]::text[], '10 A · WiFi · Botón físico', 'WiFi'::text, 12,
      'El clásico reinventado — relé WiFi económico para automatizar equipos.',
      '[{"label":"Corriente máx.","value":"10 A"},{"label":"Conectividad","value":"WiFi 2.4 GHz"}]'::jsonb,
      ARRAY[]::text[], '2026-01-08'::timestamptz
    ),
    (
      'shelly-pro-4pm', 'SHE-PRO4PM', 'Shelly Pro 4PM',
      'domotica', 'shelly',
      420000, NULL::int, 4.9::numeric, 67, 5,
      ARRAY['Profesional','DIN rail']::text[], '4 canales · 16 A · Medición · WiFi/LAN', 'WiFi/LAN'::text, 24,
      'Módulo profesional de 4 canales con medición de consumo energético. Montaje en riel DIN.',
      '[{"label":"Canales","value":"4 independientes"},{"label":"Corriente","value":"16 A por canal"},{"label":"Conectividad","value":"WiFi · LAN · BLE"},{"label":"Medición","value":"Consumo en tiempo real"}]'::jsonb,
      ARRAY[]::text[], '2026-02-20'::timestamptz
    ),
    (
      'aqara-switch-dual-zigbee', 'AQA-SWD2', 'Interruptor doble Zigbee',
      'domotica', 'aqara',
      210000, NULL::int, 4.8::numeric, 64, 16,
      ARRAY['Sin neutro']::text[], '2 canales · Zigbee · Sin neutro · Premium', 'Zigbee'::text, 24,
      'Interruptor inteligente doble sin necesidad de cable neutro — instalación directa sobre el cableado existente.',
      '[{"label":"Canales","value":"2"},{"label":"Neutro","value":"No requerido"},{"label":"Protocolo","value":"Zigbee 3.0"}]'::jsonb,
      ARRAY[]::text[], '2026-03-08'::timestamptz
    ),

    -- Cerraduras -------------------------------------------------------------
    (
      'tuya-smart-lock-x7-huella', 'TUY-X7', 'Cerradura Smart X7 Huella',
      'cerraduras', 'tuya',
      620000, 720000::int, 4.6::numeric, 87, 6,
      ARRAY['Instalación incluida']::text[], 'Huella · Clave · RFID · App · Llave', 'BLE/WiFi'::text, 18,
      'Cerradura inteligente con 5 métodos de apertura. App Tuya con gestión de usuarios temporales.',
      '[{"label":"Apertura","value":"Huella · Clave · RFID · App · Llave"},{"label":"Batería","value":"4 AA · 8 meses"},{"label":"App","value":"Tuya Smart / Smart Life"}]'::jsonb,
      ARRAY['Cerradura','2 tarjetas RFID','2 llaves','4 pilas AA']::text[], '2026-01-15'::timestamptz
    ),
    (
      'aqara-u100-smart-lock', 'AQA-U100', 'Aqara U100 Smart Lock',
      'cerraduras', 'aqara',
      980000, NULL::int, 4.8::numeric, 54, 4,
      ARRAY['Premium']::text[], 'Huella · HomeKit · Zigbee · Apple Home Key', 'Zigbee'::text, 24,
      'Cerradura premium con soporte nativo Apple HomeKit y compatibilidad Matter.',
      '[{"label":"Apertura","value":"Huella · Clave · NFC · App · HomeKey"},{"label":"Protocolo","value":"Zigbee 3.0 · BLE"},{"label":"Matter","value":"Soportado vía hub"}]'::jsonb,
      ARRAY[]::text[], '2026-03-05'::timestamptz
    ),

    -- Sensores ---------------------------------------------------------------
    (
      'aqara-motion-sensor-p1', 'AQA-MS-P1', 'Sensor de movimiento P1',
      'sensores', 'aqara',
      120000, NULL::int, 4.7::numeric, 145, 40,
      ARRAY[]::text[], 'PIR · Zigbee · 5 años batería', 'Zigbee'::text, 24,
      'Sensor PIR de alta precisión con ajuste de sensibilidad. Ideal para automatizaciones de iluminación.',
      '[{"label":"Protocolo","value":"Zigbee 3.0"},{"label":"Batería","value":"CR2450 · hasta 5 años"},{"label":"Alcance","value":"7 m · 170°"}]'::jsonb,
      ARRAY[]::text[], '2025-12-10'::timestamptz
    ),
    (
      'aqara-door-window-t1', 'AQA-DW-T1', 'Sensor apertura T1',
      'sensores', 'aqara',
      95000, NULL::int, 4.8::numeric, 230, 55,
      ARRAY[]::text[], 'Zigbee · 2 años batería · Ultra delgado', 'Zigbee'::text, 24,
      'Sensor magnético para puerta o ventana. Integra con escenas de seguridad y ahorro.',
      '[{"label":"Protocolo","value":"Zigbee 3.0"},{"label":"Batería","value":"CR1632"}]'::jsonb,
      ARRAY[]::text[], '2025-10-22'::timestamptz
    ),
    (
      'xiaomi-smoke-alarm', 'XIA-SMOKE', 'Sensor de humo WiFi',
      'sensores', 'xiaomi',
      180000, NULL::int, 4.6::numeric, 98, 18,
      ARRAY['Certificado']::text[], 'Detector foto-eléctrico · WiFi · 85 dB', 'WiFi'::text, 12,
      'Detector fotoeléctrico con sirena y notificación al celular. Certificación internacional.',
      '[{"label":"Detección","value":"Fotoeléctrica"},{"label":"Sirena","value":"85 dB"},{"label":"Batería","value":"10 años"}]'::jsonb,
      ARRAY[]::text[], '2026-02-28'::timestamptz
    ),
    (
      'sonoff-water-leak', 'SON-WATER', 'Sensor de inundación',
      'sensores', 'sonoff',
      110000, NULL::int, 4.5::numeric, 73, 22,
      ARRAY[]::text[], 'Zigbee · Alarma inmediata · IP67', 'Zigbee'::text, 12,
      'Sensor de fuga de agua para colocar debajo de lavamanos, tanques o lavadoras.',
      '[{"label":"Protocolo","value":"Zigbee"},{"label":"Protección","value":"IP67"}]'::jsonb,
      ARRAY[]::text[], '2026-03-10'::timestamptz
    ),

    -- Iluminación -----------------------------------------------------------
    (
      'xiaomi-mi-led-smart-bulb', 'XIA-BULB-E27', 'Bombillo LED WiFi E27',
      'iluminacion', 'xiaomi',
      65000, NULL::int, 4.5::numeric, 420, 100,
      ARRAY['16 millones de colores']::text[], '9 W · RGB+CCT · WiFi · Mi Home', 'WiFi'::text, 12,
      'Bombillo inteligente con 16 millones de colores y temperatura ajustable.',
      '[{"label":"Potencia","value":"9 W (equiv. 60 W)"},{"label":"Base","value":"E27"},{"label":"App","value":"Mi Home · Alexa · Google"}]'::jsonb,
      ARRAY[]::text[], '2025-09-18'::timestamptz
    ),
    (
      'tuya-led-strip-rgbic', 'TUY-STRIP-5M', 'Cinta LED RGBIC 5m',
      'iluminacion', 'tuya',
      145000, NULL::int, 4.6::numeric, 156, 28,
      ARRAY[]::text[], '5m · RGBIC · Efectos · Música', 'WiFi'::text, 12,
      'Cinta LED con control por dirección (RGBIC) — permite efectos de onda y reactivos a la música.',
      '[{"label":"Longitud","value":"5 metros"},{"label":"Tipo","value":"RGBIC"},{"label":"Control","value":"WiFi · Control remoto · Mic"}]'::jsonb,
      ARRAY[]::text[], '2026-01-28'::timestamptz
    ),
    (
      'shelly-rgbw2-dimmer', 'SHE-DIMMER2', 'Shelly Dimmer 2',
      'iluminacion', 'shelly',
      285000, NULL::int, 4.8::numeric, 91, 11,
      ARRAY['Sin neutro']::text[], 'Dimmer · Sin neutro · WiFi · 200 W', 'WiFi'::text, 24,
      'Dimmer WiFi que funciona sin cable neutro — ideal para casas antiguas en Colombia.',
      '[{"label":"Potencia","value":"200 W máx"},{"label":"Neutro","value":"No requerido"},{"label":"Conectividad","value":"WiFi · BLE"}]'::jsonb,
      ARRAY[]::text[], '2026-02-05'::timestamptz
    ),

    -- Motores ----------------------------------------------------------------
    (
      'motor-garaje-dks-500kg', 'MOT-DKS500', 'Motor garaje DKS 500kg',
      'motores', 'dahua',
      1450000, NULL::int, 4.7::numeric, 38, 4,
      ARRAY['Instalación incluida']::text[], 'Corrediza · 500 kg · Control remoto · Batería backup', NULL::text, 24,
      'Motor para puerta corrediza de hasta 500 kg. Incluye instalación en Pereira y área metropolitana.',
      '[{"label":"Peso máx.","value":"500 kg"},{"label":"Tipo puerta","value":"Corrediza"},{"label":"Control","value":"2 controles remotos incluidos"}]'::jsonb,
      ARRAY['Motor','2 controles','Ojo infrarrojo','Instalación']::text[], '2026-02-12'::timestamptz
    ),
    (
      'motor-portero-corredizo-ac2000', 'MOT-AC2000', 'Motor corredizo AC2000',
      'motores', 'dahua',
      2100000, NULL::int, 4.8::numeric, 19, 2,
      ARRAY['Pesado','Industrial']::text[], '2000 kg · Corrediza · 24 V DC · Uso intensivo', NULL::text, 36,
      'Motor industrial para conjuntos residenciales o entradas de uso intensivo.',
      '[{"label":"Peso máx.","value":"2000 kg"},{"label":"Ciclos/día","value":"200+"},{"label":"Voltaje","value":"24 V DC"}]'::jsonb,
      ARRAY[]::text[], '2026-03-20'::timestamptz
    ),

    -- Hubs & Gateways -------------------------------------------------------
    (
      'aqara-hub-m2', 'AQA-HUB-M2', 'Aqara Hub M2',
      'hubs', 'aqara',
      320000, NULL::int, 4.7::numeric, 112, 9,
      ARRAY['Matter','HomeKit']::text[], 'Zigbee · Matter · HomeKit · Alexa · Google', 'Zigbee+WiFi'::text, 24,
      'Gateway central Aqara con soporte multi-asistente. Puente entre Zigbee y red WiFi/Matter.',
      '[{"label":"Protocolos","value":"Zigbee 3.0 · WiFi · BLE"},{"label":"Matter","value":"Soportado"},{"label":"Plataformas","value":"HomeKit · Alexa · Google"}]'::jsonb,
      ARRAY[]::text[], '2026-01-10'::timestamptz
    ),
    (
      'tuya-zigbee-gateway', 'TUY-GW-ZB', 'Gateway Zigbee Tuya',
      'hubs', 'tuya',
      175000, NULL::int, 4.4::numeric, 88, 14,
      ARRAY[]::text[], 'Zigbee · App Tuya · 128 dispositivos', 'Zigbee'::text, 12,
      'Puente Zigbee para dispositivos Tuya/Smart Life. Hasta 128 dispositivos conectados.',
      '[{"label":"Protocolo","value":"Zigbee 3.0"},{"label":"Capacidad","value":"128 dispositivos"}]'::jsonb,
      ARRAY[]::text[], '2025-11-22'::timestamptz
    )
  ) as r(
    slug, sku, name,
    cat_slug, brand_slug,
    price, compare_at_price, rating, reviews, stock,
    badges, short_spec, protocol, warranty_months,
    description, specs, includes, created_at
  )
)
insert into public.products (
  slug, sku, name, category_id, brand_id,
  price, compare_at_price, rating, reviews, stock,
  badges, short_spec, protocol, warranty_months,
  description, specs, includes, created_at
)
select
  r.slug, r.sku, r.name, c.id, b.id,
  r.price, r.compare_at_price, r.rating, r.reviews, r.stock,
  r.badges, r.short_spec, r.protocol, r.warranty_months,
  r.description, r.specs, r.includes, r.created_at
from rows r
join public.categories c on c.slug = r.cat_slug
join public.brands b on b.slug = r.brand_slug
on conflict (slug) do nothing;

-- Mark a few as featured for the home page
update public.products set is_featured = true
where slug in (
  'hikvision-ds-2cd2043g2-ip-4mp',
  'sonoff-mini-r2',
  'tuya-smart-lock-x7-huella',
  'ezviz-c3n-exterior'
);
