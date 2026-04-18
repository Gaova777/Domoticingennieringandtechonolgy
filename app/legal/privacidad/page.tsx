import type { Metadata } from 'next';
import {
  LegalLayout,
  H2,
  H3,
  P,
  Ul,
  Strong,
  LegalDisclaimer,
} from '@/components/shared/legal-layout';
import { SITE, CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Política de privacidad — Habeas Data',
  description:
    'Política de tratamiento de datos personales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.',
};

const UPDATED = '18 de abril de 2026';

export default function PrivacidadPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de privacidad y tratamiento de datos"
      updated={UPDATED}
      intro={
        <>
          En cumplimiento de la <Strong>Ley 1581 de 2012</Strong> (Habeas Data),
          el <Strong>Decreto 1377 de 2013</Strong> y demás normativa vigente,{' '}
          {SITE.name} informa a sus usuarios la política de tratamiento de sus
          datos personales.
        </>
      }
    >
      <H2>1. Identificación del responsable</H2>
      <P>
        <Strong>{SITE.name}</Strong>, identificada con NIT {CONTACT.nit}, con
        domicilio en {CONTACT.address}, actúa como responsable del tratamiento
        de los datos personales recolectados a través del sitio{' '}
        <Strong>{SITE.url}</Strong>, sus canales de WhatsApp, correo electrónico
        y redes sociales.
      </P>
      <P>
        Para cualquier asunto relacionado con tus datos personales puedes
        contactarnos en{' '}
        <Strong>
          <a
            href={`mailto:${CONTACT.email}`}
            className="underline underline-offset-4"
          >
            {CONTACT.email}
          </a>
        </Strong>{' '}
        o en el teléfono {CONTACT.phone}.
      </P>

      <H2>2. Datos que recolectamos</H2>
      <P>
        Según la interacción, podemos tratar las siguientes categorías de datos
        personales:
      </P>
      <Ul>
        <li>
          <Strong>Datos de identificación:</Strong> nombre completo, número de
          documento, fecha de nacimiento.
        </li>
        <li>
          <Strong>Datos de contacto:</Strong> correo electrónico, teléfono,
          ciudad y dirección de envío o instalación.
        </li>
        <li>
          <Strong>Datos transaccionales:</Strong> historial de compras, órdenes,
          cotizaciones, preferencias y referencias de pago (nunca almacenamos
          datos completos de tarjeta; los gestiona la pasarela autorizada).
        </li>
        <li>
          <Strong>Datos técnicos:</Strong> dirección IP, tipo de dispositivo,
          navegador y datos de cookies de primera parte.
        </li>
      </Ul>

      <H2>3. Finalidades del tratamiento</H2>
      <P>Los datos personales se tratan para las siguientes finalidades:</P>
      <Ul>
        <li>Gestionar y ejecutar órdenes, cotizaciones y servicios de instalación.</li>
        <li>Enviar comunicaciones transaccionales (confirmaciones, estado del envío, garantía).</li>
        <li>Atender consultas, sugerencias o reclamos.</li>
        <li>Cumplir obligaciones contables, fiscales y legales.</li>
        <li>
          Mejorar la experiencia del sitio mediante análisis agregado y
          anónimo.
        </li>
        <li>
          Enviar comunicaciones comerciales <Strong>solo cuando el titular lo autoriza expresamente</Strong>.
        </li>
      </Ul>

      <H2>4. Derechos del titular (art. 8, Ley 1581)</H2>
      <P>Como titular de datos personales tienes derecho a:</P>
      <Ul>
        <li>Conocer, actualizar y rectificar tus datos personales.</li>
        <li>
          Solicitar prueba de la autorización otorgada para el tratamiento.
        </li>
        <li>
          Ser informado sobre el uso que se ha dado a tus datos.
        </li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio
          (SIC) cuando se haya incumplido la normativa.
        </li>
        <li>Revocar la autorización y solicitar la supresión de los datos.</li>
        <li>Acceder gratuitamente a tus datos personales.</li>
      </Ul>

      <H2>5. Cómo ejercer tus derechos</H2>
      <P>
        Puedes ejercer cualquiera de estos derechos enviando un correo a{' '}
        <Strong>{CONTACT.email}</Strong> con el asunto{' '}
        <Strong>"Habeas Data"</Strong>. Debes incluir:
      </P>
      <Ul>
        <li>Nombre completo y número de documento.</li>
        <li>Descripción clara de la solicitud (acceso, rectificación, supresión, revocatoria, etc.).</li>
        <li>Datos de contacto para respuesta.</li>
      </Ul>
      <P>
        Responderemos en un plazo máximo de{' '}
        <Strong>quince (15) días hábiles</Strong> a partir de la recepción. Si
        no es posible resolver en ese plazo, informaremos los motivos y la
        fecha estimada de respuesta.
      </P>

      <H2>6. Autorización y consentimiento</H2>
      <P>
        Al usar el formulario de contacto, cotización o compra, otorgas
        autorización expresa, previa e informada para el tratamiento de tus
        datos conforme a esta política. La autorización puede ser revocada en
        cualquier momento, salvo cuando exista una obligación legal que
        imponga su conservación.
      </P>

      <H2>7. Seguridad y conservación</H2>
      <P>
        Aplicamos medidas técnicas, humanas y administrativas razonables para
        proteger la información contra pérdida, alteración, acceso no
        autorizado o uso indebido. Los datos se conservan únicamente por el
        tiempo necesario para cumplir las finalidades y las obligaciones
        legales (contables, fiscales y de garantía).
      </P>

      <H2>8. Transferencia y transmisión</H2>
      <P>
        Podemos transferir o transmitir datos a proveedores de tecnología (por
        ejemplo, Supabase, Vercel, Resend o Wompi) que actúan como encargados
        del tratamiento bajo contrato. Estos proveedores están obligados a
        proteger la información bajo estándares equivalentes o superiores a
        los colombianos.
      </P>
      <P>
        No vendemos, cedemos ni compartimos datos personales con terceros para
        fines publicitarios sin autorización explícita.
      </P>

      <H2>9. Cookies</H2>
      <P>
        El sitio utiliza cookies de primera parte para recordar preferencias y
        analizar uso de forma agregada. Puedes desactivarlas desde la
        configuración de tu navegador, aunque algunas funcionalidades pueden
        verse afectadas.
      </P>

      <H2>10. Menores de edad</H2>
      <P>
        {SITE.name} no recolecta datos personales de menores de 18 años de
        manera deliberada. Si consideras que un menor nos ha suministrado
        datos, contáctanos para suprimirlos.
      </P>

      <H2>11. Modificaciones</H2>
      <P>
        Esta política puede actualizarse. Cualquier cambio sustancial se
        publicará en esta misma página con fecha de vigencia actualizada.
      </P>

      <H2>12. Autoridad de control</H2>
      <P>
        La autoridad competente en Colombia para la protección de datos
        personales es la{' '}
        <Strong>Superintendencia de Industria y Comercio (SIC)</Strong>. Ante
        ella puedes presentar quejas si consideras vulnerados tus derechos.
      </P>

      <LegalDisclaimer />
    </LegalLayout>
  );
}
