'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { signUp } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';

const schema = z.object({
  fullName: z.string().min(2, 'Ingresa tu nombre').max(100),
  email: z.string().email('Correo inválido'),
  phone: z
    .string()
    .max(25)
    .regex(/^$|^[+0-9\s()-]+$/, 'Solo números y + ( ) -')
    .optional()
    .or(z.literal('')),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  acceptPolicy: z.boolean().refine((v) => v, 'Debes aceptar la política'),
});

type FormValues = z.infer<typeof schema>;

const fieldLabel =
  'font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground';

export function RegisterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [needsConfirm, setNeedsConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      acceptPolicy: false,
    },
  });

  const acceptValue = watch('acceptPolicy');

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const result = await signUp(values);
    if (!result.ok) {
      toast.error(result.error);
      setSubmitting(false);
      return;
    }
    toast.success('Cuenta creada');
    // If Supabase requires email confirmation, no session exists yet.
    // We optimistically route to /cuenta — middleware will redirect to login
    // if there's no session and show the confirm-email message below.
    setNeedsConfirm(true);
    setTimeout(() => {
      router.push('/cuenta');
      router.refresh();
    }, 600);
  }

  if (needsConfirm) {
    return (
      <div className="rounded-sm border border-border bg-surface-1 p-6 text-sm leading-relaxed">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-cyan">
          Revisa tu correo
        </p>
        <p className="mt-3 text-base">
          Te enviamos un enlace a{' '}
          <span className="font-mono text-foreground">
            {getValues('email')}
          </span>{' '}
          para confirmar tu cuenta. Cuando lo abras, vuelve e inicia sesión.
        </p>
        <Link
          href="/cuenta/login"
          className="mt-6 inline-flex text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
        >
          Ir al inicio de sesión →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label className={cn(fieldLabel)}>Nombre completo</Label>
        <Input
          {...register('fullName')}
          autoComplete="name"
          className="rounded-sm border-border bg-transparent"
        />
        {errors.fullName ? (
          <p className="text-xs text-destructive">{errors.fullName.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label className={cn(fieldLabel)}>Correo electrónico</Label>
        <Input
          {...register('email')}
          type="email"
          autoComplete="email"
          className="rounded-sm border-border bg-transparent"
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label className={cn(fieldLabel)}>Teléfono (opcional)</Label>
        <Input
          {...register('phone')}
          inputMode="tel"
          autoComplete="tel"
          placeholder="+57 300 123 4567"
          className="rounded-sm border-border bg-transparent font-mono"
        />
        {errors.phone ? (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label className={cn(fieldLabel)}>Contraseña</Label>
        <Input
          {...register('password')}
          type="password"
          autoComplete="new-password"
          placeholder="Mínimo 6 caracteres"
          className="rounded-sm border-border bg-transparent font-mono"
        />
        {errors.password ? (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
          <Checkbox
            checked={acceptValue}
            onCheckedChange={(v) =>
              setValue('acceptPolicy', v === true, { shouldValidate: true })
            }
            className="mt-0.5 h-4 w-4 rounded-sm border-border data-[state=checked]:border-foreground data-[state=checked]:bg-foreground"
          />
          <span className="text-muted-foreground">
            Acepto la{' '}
            <Link
              href="/legal/privacidad"
              className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              política de privacidad
            </Link>{' '}
            (Habeas Data Ley 1581).
          </span>
        </label>
        {errors.acceptPolicy ? (
          <p className="mt-1 text-xs text-destructive">
            {errors.acceptPolicy.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="h-11 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creando…
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" />
            Crear cuenta
          </>
        )}
      </Button>
    </form>
  );
}
