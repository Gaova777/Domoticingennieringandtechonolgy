'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormValues = z.infer<typeof schema>;

const fieldLabel =
  'font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground';

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const redirectTo = search.get('next') || '/cuenta';
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const result = await signIn(values);
    if (!result.ok) {
      toast.error(result.error);
      setSubmitting(false);
      return;
    }
    toast.success('Bienvenido');
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label className={cn(fieldLabel)}>Correo electrónico</Label>
        <Input
          {...register('email')}
          type="email"
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          className="rounded-sm border-border bg-transparent"
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label className={cn(fieldLabel)}>Contraseña</Label>
        <Input
          {...register('password')}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="rounded-sm border-border bg-transparent font-mono"
        />
        {errors.password ? (
          <p className="text-xs text-destructive">{errors.password.message}</p>
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
            Ingresando…
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Iniciar sesión
          </>
        )}
      </Button>
    </form>
  );
}
