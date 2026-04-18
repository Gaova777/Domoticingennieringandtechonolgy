'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { submitContact } from '@/lib/actions/contact';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre').max(100),
  phone: z.string().min(7, 'Teléfono inválido').max(25),
  email: z.string().email('Correo inválido').max(120).optional().or(z.literal('')),
  city: z.string().min(2, 'Ingresa tu ciudad').max(80),
  serviceSlug: z.string().optional(),
  description: z.string().min(10, 'Cuéntanos un poco más').max(2000),
  acceptPolicy: z.boolean().refine((v) => v, 'Debes aceptar la política'),
});

type FormValues = z.infer<typeof schema>;

type Service = { slug: string; name: string };

type Props = {
  services: Service[];
  defaultServiceSlug?: string;
};

const fieldLabel =
  'font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground';

export function ContactForm({ services, defaultServiceSlug }: Props) {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: 'Pereira',
      serviceSlug: defaultServiceSlug ?? '',
      description: '',
      acceptPolicy: false,
    },
  });

  const acceptValue = watch('acceptPolicy');

  async function onSubmit(values: FormValues) {
    const result = await submitContact(values);
    if (result.ok) {
      toast.success('Mensaje enviado', {
        description: 'Te respondemos en menos de 24 horas hábiles.',
      });
      reset();
      setSent(true);
    } else {
      toast.error(result.error);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-sm border border-border bg-surface-1 p-8">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-green/40 bg-brand-green/10 text-brand-green">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-2xl tracking-tight">Gracias, lo recibimos.</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Te vamos a responder por WhatsApp o correo en menos de 24 horas hábiles.
          Si es urgente, escríbenos directo por WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          Enviar otro mensaje →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Nombre" error={errors.name?.message}>
          <Input
            {...register('name')}
            placeholder="Tu nombre completo"
            autoComplete="name"
            className="rounded-sm border-border bg-transparent"
          />
        </Field>
        <Field label="Teléfono / WhatsApp" error={errors.phone?.message}>
          <Input
            {...register('phone')}
            placeholder="+57 300 123 4567"
            autoComplete="tel"
            inputMode="tel"
            className="rounded-sm border-border bg-transparent font-mono"
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Correo electrónico (opcional)" error={errors.email?.message}>
          <Input
            {...register('email')}
            type="email"
            placeholder="tucorreo@ejemplo.com"
            autoComplete="email"
            className="rounded-sm border-border bg-transparent"
          />
        </Field>
        <Field label="Ciudad" error={errors.city?.message}>
          <Input
            {...register('city')}
            placeholder="Pereira"
            autoComplete="address-level2"
            className="rounded-sm border-border bg-transparent"
          />
        </Field>
      </div>

      <Field label="¿Qué servicio te interesa?" error={errors.serviceSlug?.message}>
        <select
          {...register('serviceSlug')}
          className="h-9 w-full rounded-sm border border-border bg-transparent px-3 text-sm outline-none focus-visible:border-foreground/40"
        >
          <option value="">— Selecciona un servicio —</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="otro">Otro / consulta general</option>
        </select>
      </Field>

      <Field
        label="Cuéntanos de tu proyecto"
        error={errors.description?.message}
      >
        <Textarea
          {...register('description')}
          rows={5}
          placeholder="Tipo de espacio (casa, local, oficina), qué buscas automatizar o asegurar, presupuesto aproximado…"
          className="min-h-[140px] rounded-sm border-border bg-transparent"
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <Checkbox
            checked={acceptValue}
            onCheckedChange={(v) => setValue('acceptPolicy', v === true, { shouldValidate: true })}
            className="mt-0.5 h-4 w-4 rounded-sm border-border data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
          />
          <span className="text-muted-foreground">
            Autorizo el tratamiento de mis datos conforme a la{' '}
            <Link
              href="/legal/privacidad"
              className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              Política de privacidad
            </Link>{' '}
            (Ley 1581 de 2012).
          </span>
        </label>
        {errors.acceptPolicy?.message ? (
          <p className="mt-2 text-xs text-destructive">{errors.acceptPolicy.message}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90 md:w-auto md:px-8"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar mensaje
          </>
        )}
      </Button>
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
