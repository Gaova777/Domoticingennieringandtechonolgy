import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTACT, waLink } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Orden recibida',
  description: 'Gracias por tu compra — tu orden ha sido creada.',
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const orderNumber =
    typeof params.order === 'string' ? params.order : undefined;

  return (
    <div className="border-t border-border">
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-8 px-6 py-20 md:py-28">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green">
          <Check className="h-6 w-6" />
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Orden recibida
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
            ¡Gracias! Tu pedido está <em className="italic">en camino.</em>
          </h1>
        </div>

        {orderNumber ? (
          <div className="rounded-sm border border-border bg-surface-1 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Número de orden
            </p>
            <p className="mt-2 font-mono text-xl tracking-widest">{orderNumber}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Guarda este número. Te lo enviamos por correo y WhatsApp.
            </p>
          </div>
        ) : null}

        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Recibimos tu orden y ya estamos preparándola. En las próximas horas
            hábiles te contactamos para confirmar el pago y coordinar la
            entrega.
          </p>
          <p>
            Si elegiste pago por Wompi, completa la transacción desde la
            pestaña que se abre. Si elegiste coordinar por WhatsApp, ya debería
            haberse abierto una ventana con el resumen del pedido.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            size="lg"
            render={
              <a
                href={waLink(
                  orderNumber
                    ? `Hola, consulto el estado de mi orden ${orderNumber}.`
                    : 'Hola, acabo de hacer una compra.',
                )}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            className="h-11 rounded-full bg-brand-green px-6 text-sm font-medium text-background hover:bg-brand-green/90"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Contactar por WhatsApp
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<a href={`mailto:${CONTACT.email}`} />}
            className="h-11 rounded-full border-border px-6 text-sm font-medium"
          >
            <Mail className="mr-2 h-4 w-4" />
            {CONTACT.email}
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <Link href="/productos" className="hover:text-foreground">
            Seguir comprando →
          </Link>
          <Link href="/" className="hover:text-foreground">
            Volver al inicio →
          </Link>
        </div>
      </section>
    </div>
  );
}
