-- ============================================================================
-- Normalise site copy to Colombian Spanish (tú, no voseo).
-- Also enrich services with long_description used on /servicios/[slug].
-- ============================================================================

update public.services
set tagline = 'Entra sin bajarte'
where slug = 'puertas' and tagline = 'Entrá sin bajarte';

update public.services
set long_description = case slug
  when 'domotica' then
    'Diseñamos escenarios de automatización para tu casa: iluminación que se adapta al horario, climatización inteligente, cortinas motorizadas y control por voz con Alexa o Google. Integramos marcas premium (Aqara, Sonoff, Shelly, Tuya) y garantizamos instalación limpia y documentada.'
  when 'camaras' then
    'Sistemas de videovigilancia IP y analógicos para casa, comercio y propiedad horizontal. Cámaras 4K con visión nocturna a color, detección inteligente (humano/vehículo), grabación en NVR o en la nube, y acceso remoto desde tu celular. Cableado estructurado certificado.'
  when 'cerraduras' then
    'Cerraduras inteligentes con apertura por huella, clave, tarjeta RFID, app y llave física de respaldo. Compatibles con Apple HomeKit y Google Home. Gestión de usuarios temporales (empleados, familia, servicios) con registro de entradas y salidas.'
  when 'puertas' then
    'Automatización de puertas corredizas, batientes y motores para garaje. También talanqueras para conjuntos residenciales. Instalación en Pereira y su área metropolitana con instalación, controles remotos y mantenimiento preventivo incluido.'
  when 'iluminacion' then
    'Iluminación inteligente que cambia con tu rutina: bombillos RGB, cintas LED reactivas a música, dimmers sin neutro y escenas programadas. Compatible con todos los asistentes. Diseñamos el esquema para que combine estética y funcionalidad.'
  when 'cableado' then
    'La base de toda instalación seria: cableado estructurado categoría 6 o superior, certificación de puntos, redes WiFi profesionales (mesh o controlador), switches PoE y racks para cuartos técnicos. Sin cableado bien hecho, nada más funciona como debería.'
  else long_description
end
where slug in ('domotica', 'camaras', 'cerraduras', 'puertas', 'iluminacion', 'cableado');
