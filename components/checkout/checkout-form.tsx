'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, Lock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart, cartSelectors } from '@/lib/stores/cart';
import { createOrder } from '@/lib/actions/orders';
import { DEPARTMENTS } from '@/lib/colombia';
import { waLink, formatCop } from '@/lib/constants';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Nombre requerido').max(100),
  email: z.string().email('Correo inválido').max(120),
  phone: z
    .string()
    .min(7, 'Teléfono inválido')
    .max(25)
    .regex(/^[+0-9\s()-]+$/, 'Solo números y + ( ) -'),
  address: z.string().min(5, 'Dirección muy corta').max(200),
  city: z.string().min(2, 'Ciudad requerida').max(80),
  department: z.string().min(2, 'Departamento requerido'),
  postalCode: z.string().max(20).optional().or(z.literal('')),
  notes: z.string().max(500).optional().or(z.literal('')),
  paymentMethod: z.enum(['wompi', 'whatsapp']),
  acceptPolicy: z.boolean().refine((v) => v, 'Debes aceptar términos'),
});

type FormValues = z.infer<typeof schema>;

const fieldLabel =
  'font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground';

export function CheckoutForm() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => cartSelectors.subtotal(s));
  const promo = useCart((s) => s.promo);
  const clearCart = useCart((s) => s.clear);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: 'Pereira',
      department: 'Risaralda',
      postalCode: '',
      notes: '',
      paymentMethod: 'wompi',
      acceptPolicy: false,
    },
  });

  const paymentMethod = watch('paymentMethod');
  const acceptPolicy = watch('acceptPolicy');

  async function onSubmit(values: FormValues) {
    if (items.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }
    setSubmitting(true);
    try {
      const result = await createOrder({
        customer: {
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
        shipping: {
          address: values.address,
          city: values.city,
          department: values.department,
          postalCode: values.postalCode,
          notes: values.notes,
        },
        items: items.map((i) => ({
          id: i.id,
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        promoCode: promo?.code,
        paymentMethod: values.paymentMethod,
        acceptPolicy: values.acceptPolicy,
      });

      if (!result.ok) {
        toast.error(result.error);
        setSubmitting(false);
        return;
      }

      clearCart();

      if (result.paymentMethod === 'whatsapp') {
        const msg =
          `Hola, acabo de crear la orden ${result.orderNumber}.\n\n` +
          `Productos: ${result.summary}\n` +
          `Total: ${formatCop(result.total)}\n\n` +
          `Quisiera coordinar el pago.`;
        window.open(waLink(msg), '_blank', 'noopener,noreferrer');
      }

      router.push(`/checkout/exito?order=${encodeURIComponent(result.orderNumber)}`);
    } catch (err) {
      console.error(err);
      toast.error('Algo falló. Intenta de nuevo o coordina por WhatsApp.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>
      <section className="space-y-6">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            01 · Comprador
          </p>
          <h2 className="mt-2 font-serif text-2xl tracking-tight">
            Datos de contacto
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Nombre completo" error={errors.name?.message}>
            <Input
              {...register('name')}
              autoComplete="name"
              className="rounded-sm border-border bg-transparent"
            />
          </Field>
          <Field label="Correo electrónico" error={errors.email?.message}>
            <Input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="rounded-sm border-border bg-transparent"
            />
          </Field>
        </div>
        <Field label="Teléfono / WhatsApp" error={errors.phone?.message}>
          <Input
            {...register('phone')}
            placeholder="+57 300 123 4567"
            inputMode="tel"
            autoComplete="tel"
            className="rounded-sm border-border bg-transparent font-mono"
          />
        </Field>
      </section>

      <section className="space-y-6 border-t border-border pt-12">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            02 · Envío
          </p>
          <h2 className="mt-2 font-serif text-2xl tracking-tight">
            Dirección de entrega
          </h2>
        </header>
        <Field label="Dirección" error={errors.address?.message}>
          <Input
            {...register('address')}
            placeholder="Calle 20 # 15-30 apto 402"
            autoComplete="street-address"
            className="rounded-sm border-border bg-transparent"
          />
        </Field>
        <div className="grid gap-6 md:grid-cols-3">
          <Field label="Ciudad" error={errors.city?.message}>
            <Input
              {...register('city')}
              autoComplete="address-level2"
              className="rounded-sm border-border bg-transparent"
            />
          </Field>
          <Field label="Departamento" error={errors.department?.message}>
            <select
              {...register('department')}
              className="h-9 w-full rounded-sm border border-border bg-transparent px-3 text-sm outline-none focus-visible:border-foreground/40"
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Código postal (opcional)" error={errors.postalCode?.message}>
            <Input
              {...register('postalCode')}
              inputMode="numeric"
              autoComplete="postal-code"
              className="rounded-sm border-border bg-transparent font-mono"
            />
          </Field>
        </div>
        <Field label="Notas para el mensajero (opcional)" error={errors.notes?.message}>
          <Textarea
            {...register('notes')}
            rows={3}
            placeholder="Indicaciones para la entrega, portería, horario preferido…"
            className="rounded-sm border-border bg-transparent"
          />
        </Field>
      </section>

      <section className="space-y-6 border-t border-border pt-12">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            03 · Pago
          </p>
          <h2 className="mt-2 font-serif text-2xl tracking-tight">
            Elige tu método.
          </h2>
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          <PaymentOption
            value="wompi"
            active={paymentMethod === 'wompi'}
            onSelect={() => setValue('paymentMethod', 'wompi', { shouldValidate: true })}
            title="Tarjeta, PSE, Nequi"
            subtitle="Vía Wompi — seguro y encriptado"
            icon={<Lock className="h-4 w-4" />}
          />
          <PaymentOption
            value="whatsapp"
            active={paymentMethod === 'whatsapp'}
            onSelect={() =>
              setValue('paymentMethod', 'whatsapp', { shouldValidate: true })
            }
            title="Coordinar por WhatsApp"
            subtitle="Transferencia o pago manual"
            icon={<MessageCircle className="h-4 w-4" />}
          />
        </div>

        {paymentMethod === 'wompi' ? (
          <p className="rounded-sm border border-border bg-surface-1 p-4 text-xs leading-relaxed text-muted-foreground">
            Al confirmar se genera la orden y te redirigimos al portal seguro de
            Wompi. No almacenamos datos de tarjeta.
          </p>
        ) : (
          <p className="rounded-sm border border-border bg-surface-1 p-4 text-xs leading-relaxed text-muted-foreground">
            Al confirmar creamos la orden con estado <em>pendiente</em> y abrimos
            WhatsApp con el resumen para coordinar el pago.
          </p>
        )}
      </section>

      <section className="space-y-4 border-t border-border pt-12">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <Checkbox
            checked={acceptPolicy}
            onCheckedChange={(v) =>
              setValue('acceptPolicy', v === true, { shouldValidate: true })
            }
            className="mt-0.5 h-4 w-4 rounded-sm border-border data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
          />
          <span className="text-muted-foreground">
            Acepto los{' '}
            <Link
              href="/legal/terminos"
              className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              términos y condiciones
            </Link>{' '}
            y la{' '}
            <Link
              href="/legal/privacidad"
              className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              política de privacidad
            </Link>{' '}
            (Habeas Data Ley 1581).
          </span>
        </label>
        {errors.acceptPolicy?.message ? (
          <p className="text-xs text-destructive">{errors.acceptPolicy.message}</p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={submitting || items.length === 0}
          className="h-12 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando…
            </>
          ) : paymentMethod === 'wompi' ? (
            'Confirmar y pagar'
          ) : (
            'Confirmar y abrir WhatsApp'
          )}
        </Button>
      </section>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className={cn(fieldLabel)}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function PaymentOption({
  active,
  onSelect,
  title,
  subtitle,
  icon,
}: {
  value: string;
  active: boolean;
  onSelect: () => void;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex flex-col items-start gap-2 rounded-sm border px-5 py-4 text-left transition',
        active
          ? 'border-foreground bg-foreground/[0.03]'
          : 'border-border hover:border-foreground/40',
      )}
    >
      <span className="flex items-center gap-2 text-foreground/70">{icon}</span>
      <span className="font-serif text-base tracking-tight">{title}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {subtitle}
      </span>
    </button>
  );
}
