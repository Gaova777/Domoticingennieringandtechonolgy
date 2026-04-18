import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Package, FileText, MapPin, ArrowRight } from 'lucide-react';
import {
  getCurrentUser,
  getCurrentProfile,
  getMyOrders,
} from '@/lib/supabase/queries-auth';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { formatCop } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mi cuenta',
  description: 'Resumen de pedidos, cotizaciones y datos de tu cuenta.',
  robots: { index: false, follow: false },
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendiente',
  paid: 'Pagada',
  processing: 'En preparación',
  shipped: 'Enviada',
  delivered: 'Entregada',
  cancelled: 'Cancelada',
  refunded: 'Reembolsada',
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/cuenta/login?next=/cuenta');
  const profile = await getCurrentProfile();
  const orders = await getMyOrders();

  const fullName = profile?.full_name?.trim() || user.email?.split('@')[0];

  return (
    <div className="border-t border-border">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Mi cuenta
              </p>
              <h1 className="mt-3 text-balance font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Hola, <em className="italic">{fullName}</em>.
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">{user.email}</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            icon={Package}
            label="Pedidos"
            value={String(orders.length).padStart(2, '0')}
            href="/cuenta"
          />
          <StatCard
            icon={FileText}
            label="Cotizaciones"
            value="—"
            href="/cotizar"
            cta="Nueva cotización"
          />
          <StatCard
            icon={MapPin}
            label="Ciudad"
            value={profile?.city || '—'}
            href="/cuenta/perfil"
            cta="Editar perfil"
          />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Historial
              </p>
              <h2 className="mt-3 font-serif text-2xl tracking-tight md:text-3xl">
                Tus pedidos
              </h2>
            </div>
            <Link
              href="/productos"
              className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              Seguir comprando →
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="mt-10 rounded-sm border border-border bg-surface-1 p-10 text-center">
              <p className="font-serif text-xl tracking-tight md:text-2xl">
                Aún no tienes pedidos.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Cuando compres productos o servicios, aparecerán acá con su
                estado y detalle.
              </p>
              <Link
                href="/productos"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {orders.map((o) => (
                <li key={o.id}>
                  <div className="grid grid-cols-2 items-center gap-4 py-6 md:grid-cols-[auto_1fr_auto_auto_auto] md:gap-10">
                    <span className="col-span-2 font-mono text-xs tracking-widest md:col-span-1">
                      {o.orderNumber}
                    </span>
                    <div className="col-span-2 md:col-span-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {new Intl.DateTimeFormat('es-CO', {
                          dateStyle: 'medium',
                        }).format(new Date(o.createdAt))}
                        {' · '}
                        {o.itemsCount} items
                      </p>
                    </div>
                    <span className="font-mono text-sm tabular-nums">
                      {formatCop(o.total)}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      <StatusDot status={o.status} />
                      {STATUS_LABEL[o.status] ?? o.status}
                    </span>
                    <ArrowRight className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
  cta,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href: string;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-5 rounded-sm border border-border p-6 transition-colors hover:border-foreground/40"
    >
      <Icon strokeWidth={1.25} className="h-5 w-5 text-foreground/70" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-serif text-3xl tabular-nums tracking-tight">
          {value}
        </p>
      </div>
      {cta ? (
        <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition group-hover:text-foreground">
          {cta} →
        </span>
      ) : null}
    </Link>
  );
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === 'paid' || status === 'delivered'
      ? 'bg-brand-green'
      : status === 'cancelled' || status === 'refunded'
        ? 'bg-destructive'
        : status === 'pending'
          ? 'bg-brand-yellow'
          : 'bg-brand-cyan';
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />;
}
