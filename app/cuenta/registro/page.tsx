import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthShell } from '@/components/auth/auth-shell';
import { RegisterForm } from '@/components/auth/register-form';
import { getCurrentUser } from '@/lib/supabase/queries-auth';

export const metadata: Metadata = {
  title: 'Crear cuenta',
  description: 'Regístrate para agilizar pedidos y gestionar tus cotizaciones.',
  robots: { index: false, follow: false },
};

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect('/cuenta');

  return (
    <AuthShell
      eyebrow="Nueva cuenta"
      title="Crea tu cuenta."
      description="Así no tienes que volver a llenar los datos en cada compra, y llevas historial de pedidos."
      footer={
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link
            href="/cuenta/login"
            className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
          >
            Iniciar sesión
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
