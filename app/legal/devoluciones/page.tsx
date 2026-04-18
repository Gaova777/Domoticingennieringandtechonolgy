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
  title: 'Política de devoluciones',
  description:
    'Derecho de retracto y reversión de pago conforme a la Ley 1480 de 2011 (Estatuto del Consumidor).',
};

const UPDATED = '18 de abril de 2026';

export default function DevolucionesPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de devoluciones y retracto"
      updated={UPDATED}
      intro={
        <>
          {SITE.name} cumple con lo establecido en la{' '}
          <Strong>Ley 1480 de 2011</Strong> (Estatuto del Consumidor) y el{' '}
          <Strong>Decreto 1499 de 2014</Strong> que regulan el derecho de
          retracto y la reversión de pago en las ventas a distancia.
        </>
      }
    >
      <H2>1. Derecho de retracto</H2>
      <P>
        Tienes derecho a retractarte de la compra dentro de los{' '}
        <Strong>cinco (5) días hábiles</Strong> siguientes a la entrega del
        producto, sin necesidad de justificar la decisión.
      </P>

      <H2>2. Condiciones para el retracto</H2>
      <Ul>
        <li>El producto debe estar en perfecto estado, sin uso.</li>
        <li>El empaque original debe estar cerrado o en condiciones de reventa.</li>
        <li>Todos los accesorios, manuales y sellos de seguridad deben estar incluidos.</li>
        <li>
          No se ha hecho uso que deteriore el producto más allá del necesario
          para su verificación.
        </li>
      </Ul>

      <H2>3. Productos excluidos</H2>
      <P>
        De acuerdo con el artículo 47 del Estatuto del Consumidor, el derecho
        de retracto <Strong>no aplica</Strong> para:
      </P>
      <Ul>
        <li>
          Productos personalizados o fabricados bajo especificación del
          consumidor (ej. kits de instalación a medida).
        </li>
        <li>
          Servicios ya ejecutados (instalaciones completadas, configuraciones,
          visitas técnicas).
        </li>
        <li>
          Productos de higiene personal o que, por razones de salubridad, no
          puedan devolverse.
        </li>
      </Ul>

      <H2>4. Cómo solicitar el retracto</H2>
      <P>
        Escríbenos a <Strong>{CONTACT.email}</Strong> con el asunto{' '}
        <Strong>"Retracto"</Strong> e incluye:
      </P>
      <Ul>
        <li>Número de orden y fecha de la compra.</li>
        <li>Datos de contacto (nombre, teléfono, correo).</li>
        <li>Dirección desde donde enviarás el producto.</li>
        <li>Cuenta bancaria para la devolución del dinero (si aplica).</li>
      </Ul>
      <P>
        Una vez aprobada la solicitud te enviamos las instrucciones para el
        envío de retorno.
      </P>

      <H2>5. Costos de envío de retorno</H2>
      <P>
        El <Strong>costo del envío de retorno</Strong> es asumido por el
        consumidor, salvo en los casos en que el producto haya llegado
        defectuoso, averiado o diferente al solicitado. En estos últimos, los
        gastos los asume {SITE.name}.
      </P>

      <H2>6. Reembolso</H2>
      <P>
        Una vez recibido el producto en nuestras instalaciones y verificada su
        condición, procesamos el reembolso del valor pagado dentro de los{' '}
        <Strong>treinta (30) días calendario</Strong> siguientes, conforme al
        Estatuto del Consumidor.
      </P>
      <P>
        El reembolso se realiza por el mismo medio de pago utilizado. Si el
        pago fue por tarjeta, el tiempo de reflejo depende del banco emisor.
      </P>

      <H2>7. Cambios</H2>
      <P>
        Si prefieres cambiar el producto por otro de igual o mayor valor (con
        el ajuste correspondiente), contáctanos y te guiamos en el
        procedimiento.
      </P>

      <H2>8. Producto defectuoso o avería en transporte</H2>
      <P>
        Si el producto llega con daños visibles o no funciona desde la primera
        instalación, contáctanos dentro de los primeros 5 días hábiles.
        Gestionamos el reemplazo o reparación sin costo. En estos casos no
        asumes costos de envío de retorno.
      </P>

      <H2>9. Reversión de pago</H2>
      <P>
        Adicional al retracto, puedes solicitar la{' '}
        <Strong>reversión de pago</Strong> cuando sea procedente según el
        artículo 51 de la Ley 1480 de 2011, especialmente en casos de:
      </P>
      <Ul>
        <li>Compras con suplantación o fraude.</li>
        <li>Producto no recibido.</li>
        <li>Producto que no corresponde al solicitado.</li>
        <li>Producto defectuoso.</li>
      </Ul>

      <H2>10. Contacto</H2>
      <P>
        Para cualquier gestión relacionada con devoluciones escríbenos a{' '}
        <Strong>{CONTACT.email}</Strong> o al WhatsApp {CONTACT.phone}.
      </P>

      <LegalDisclaimer />
    </LegalLayout>
  );
}
