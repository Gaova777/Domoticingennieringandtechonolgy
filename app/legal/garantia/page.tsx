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
  title: 'Política de garantía',
  description:
    'Garantía legal, voluntaria y del fabricante sobre productos y servicios de Domotic E Ingeniería.',
};

const UPDATED = '18 de abril de 2026';

export default function GarantiaPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de garantía"
      updated={UPDATED}
      intro={
        <>
          {SITE.name} ofrece garantía sobre todos los productos y servicios
          cumpliendo con la <Strong>Ley 1480 de 2011</Strong> (Estatuto del
          Consumidor) y el <Strong>Decreto 735 de 2013</Strong>.
        </>
      }
    >
      <H2>1. Tipos de garantía</H2>
      <Ul>
        <li>
          <Strong>Garantía legal:</Strong> obligación de responder por la
          calidad, idoneidad y seguridad del producto durante el tiempo
          mínimo establecido por la ley.
        </li>
        <li>
          <Strong>Garantía del fabricante:</Strong> cobertura adicional
          entregada directamente por el fabricante (Hikvision, Dahua, Aqara,
          etc.), por el tiempo y condiciones que éste defina.
        </li>
        <li>
          <Strong>Garantía sobre la instalación:</Strong> cubre mano de obra y
          configuración ejecutada por {SITE.name}.
        </li>
      </Ul>

      <H2>2. Tiempos de cobertura</H2>
      <P>Los tiempos de garantía varían según el producto:</P>
      <Ul>
        <li>
          <Strong>Cámaras IP / CCTV:</Strong> 12 a 36 meses según marca.
        </li>
        <li>
          <Strong>Cerraduras inteligentes:</Strong> 12 a 24 meses según marca.
        </li>
        <li>
          <Strong>Módulos de domótica (interruptores, relés):</Strong> 12 a 24 meses.
        </li>
        <li>
          <Strong>Sensores:</Strong> 12 a 24 meses según fabricante.
        </li>
        <li>
          <Strong>Motores y automatismos:</Strong> 24 a 36 meses.
        </li>
        <li>
          <Strong>Instalación y mano de obra:</Strong> 6 meses desde la entrega.
        </li>
      </Ul>
      <P>
        El tiempo exacto se indica en la factura y en la ficha del producto.
      </P>

      <H2>3. Qué cubre la garantía</H2>
      <Ul>
        <li>Defectos de fabricación del equipo.</li>
        <li>Fallas en el funcionamiento bajo uso normal.</li>
        <li>Defectos de mano de obra en la instalación.</li>
        <li>Repuestos necesarios para reparar defectos cubiertos.</li>
      </Ul>

      <H2>4. Qué no cubre la garantía</H2>
      <Ul>
        <li>Daños por uso indebido, negligencia o manipulación por terceros.</li>
        <li>Daños por sobretensión eléctrica, fenómenos naturales o rayos sin protector adecuado.</li>
        <li>Rotura de elementos por caída o golpes posteriores a la entrega.</li>
        <li>Alteración o modificación del producto sin autorización.</li>
        <li>Desgaste natural de piezas consumibles (baterías, gomas, filtros).</li>
        <li>Daños por humedad o exposición a ambientes no previstos por el fabricante.</li>
      </Ul>

      <H2>5. Cómo hacer efectiva la garantía</H2>
      <P>Para solicitar la garantía sigue estos pasos:</P>
      <Ul>
        <li>
          Escribe a <Strong>{CONTACT.email}</Strong> o al WhatsApp{' '}
          {CONTACT.phone}.
        </li>
        <li>
          Incluye: número de factura u orden, descripción de la falla,
          fotografías o videos si es posible.
        </li>
        <li>
          Programamos visita técnica o recogida del equipo según el caso.
        </li>
      </Ul>

      <H2>6. Tiempos de respuesta</H2>
      <P>
        Tras recibir el producto o reporte de falla tenemos hasta{' '}
        <Strong>treinta (30) días hábiles</Strong> para diagnosticar,
        reparar, reemplazar o emitir reembolso, conforme al artículo 11 de la
        Ley 1480 de 2011. En la mayoría de los casos resolvemos en menos
        tiempo.
      </P>

      <H2>7. Resultado de la garantía</H2>
      <P>Dependiendo del diagnóstico, la garantía puede resolverse con:</P>
      <Ul>
        <li>Reparación del producto.</li>
        <li>Reemplazo por uno igual o equivalente.</li>
        <li>Devolución del dinero pagado cuando no sea posible lo anterior.</li>
      </Ul>

      <H2>8. Mantenimiento preventivo</H2>
      <P>
        La garantía no cubre mantenimiento preventivo de rutina. Ofrecemos
        planes de mantenimiento trimestral o anual por separado. Consulta
        disponibilidad con nuestro equipo.
      </P>

      <H2>9. Reclamos ante la autoridad</H2>
      <P>
        Si consideras que no se ha cumplido la garantía, puedes presentar
        reclamo ante la{' '}
        <Strong>Superintendencia de Industria y Comercio (SIC)</Strong>{' '}
        a través de sus canales de atención.
      </P>

      <LegalDisclaimer />
    </LegalLayout>
  );
}
