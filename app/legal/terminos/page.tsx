import type { Metadata } from 'next';
import {
  LegalLayout,
  H2,
  P,
  Ul,
  Strong,
  LegalDisclaimer,
} from '@/components/shared/legal-layout';
import { SITE, CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description:
    'Términos y condiciones de uso del sitio web y servicios de Domotic E Ingeniería.',
};

const UPDATED = '18 de abril de 2026';

export default function TerminosPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Términos y condiciones"
      updated={UPDATED}
      intro={
        <>
          Estos términos regulan el acceso y uso del sitio <Strong>{SITE.url}</Strong>{' '}
          y los productos o servicios ofrecidos por {SITE.name}. Al usar el
          sitio aceptas estos términos en su totalidad.
        </>
      }
    >
      <H2>1. Identificación</H2>
      <P>
        <Strong>{SITE.name}</Strong>, identificada con NIT {CONTACT.nit}, con
        domicilio en {CONTACT.address}, es una empresa colombiana dedicada a
        la comercialización e instalación de productos de domótica, seguridad
        electrónica y automatización.
      </P>

      <H2>2. Objeto</H2>
      <P>
        Estos términos regulan: (i) el uso del sitio; (ii) la compra de
        productos a través del e-commerce; (iii) la contratación de servicios
        de instalación y asesoría.
      </P>

      <H2>3. Capacidad del usuario</H2>
      <P>
        Para realizar compras debes ser mayor de edad (18 años) y contar con
        capacidad legal para contratar. Al completar una orden declaras que
        los datos suministrados son verídicos y actuales.
      </P>

      <H2>4. Productos, precios y disponibilidad</H2>
      <P>
        Todos los precios se expresan en pesos colombianos (COP) e incluyen el
        IVA cuando aplica. Los precios y el stock pueden cambiar sin previo
        aviso; prevalece la información mostrada al momento de finalizar la
        compra. Las imágenes son ilustrativas.
      </P>

      <H2>5. Orden de compra y confirmación</H2>
      <P>
        La orden se considera perfeccionada cuando recibes el correo o mensaje
        de confirmación con número de orden. Nos reservamos el derecho de
        cancelar órdenes con información inconsistente, sospechas de fraude o
        imposibilidad de entrega, devolviendo el valor pagado en su totalidad.
      </P>

      <H2>6. Medios de pago</H2>
      <P>
        Aceptamos pagos por tarjeta crédito/débito, PSE, Nequi y otros medios
        disponibles a través de la pasarela <Strong>Wompi</Strong>. También
        puedes coordinar pagos por transferencia o WhatsApp. {SITE.name} no
        almacena datos completos de tarjeta.
      </P>

      <H2>7. Envíos y entregas</H2>
      <P>
        Realizamos envíos a todo el territorio colombiano. Los tiempos
        estimados son:
      </P>
      <Ul>
        <li>
          <Strong>Pereira y área metropolitana:</Strong> 24 – 48 horas hábiles.
        </li>
        <li>
          <Strong>Resto del país:</Strong> 3 a 6 días hábiles según el
          transportador.
        </li>
      </Ul>
      <P>
        El costo de envío se calcula en el checkout. Los envíos superiores a
        cierto monto son gratis según lo indicado en el sitio.
      </P>

      <H2>8. Servicios de instalación</H2>
      <P>
        La instalación y asesoría técnica se contratan por cotización previa.
        La cotización incluye productos, mano de obra, tiempos y condiciones
        de garantía. Cualquier modificación durante la ejecución puede
        generar ajustes de precio, siempre informados por escrito.
      </P>

      <H2>9. Garantías</H2>
      <P>
        Los productos cuentan con garantía legal mínima y, cuando aplique,
        garantía adicional del fabricante. Consulta la{' '}
        <Strong>Política de Garantía</Strong> para detalle y procedimiento.
      </P>

      <H2>10. Derecho de retracto y devoluciones</H2>
      <P>
        De acuerdo con el <Strong>artículo 47 de la Ley 1480 de 2011</Strong>{' '}
        (Estatuto del Consumidor), en las ventas a distancia puedes ejercer el
        derecho de retracto dentro de los cinco (5) días hábiles siguientes a
        la entrega. Ver detalle en la <Strong>Política de devoluciones</Strong>.
      </P>

      <H2>11. Propiedad intelectual</H2>
      <P>
        Todo el contenido del sitio (textos, imágenes, logotipos, código,
        diseño) es propiedad de {SITE.name} o se usa con autorización. Está
        prohibida su reproducción total o parcial sin autorización escrita.
      </P>

      <H2>12. Limitación de responsabilidad</H2>
      <P>
        {SITE.name} no será responsable por daños indirectos derivados de la
        imposibilidad de uso del sitio o errores transitorios. En todo caso,
        la responsabilidad máxima se limita al valor pagado por el producto o
        servicio que origina la reclamación.
      </P>

      <H2>13. Modificaciones</H2>
      <P>
        Estos términos pueden actualizarse. La versión vigente será siempre
        la publicada en esta página, con la fecha indicada al inicio del
        documento.
      </P>

      <H2>14. Ley aplicable y jurisdicción</H2>
      <P>
        Estos términos se rigen por la ley colombiana. Cualquier disputa se
        someterá a los jueces del circuito de {SITE.city}, salvo que una
        norma de orden público disponga lo contrario.
      </P>

      <H2>15. Contacto</H2>
      <P>
        Para cualquier duda o reclamo escríbenos a <Strong>{CONTACT.email}</Strong>{' '}
        o al teléfono {CONTACT.phone}.
      </P>

      <LegalDisclaimer />
    </LegalLayout>
  );
}
