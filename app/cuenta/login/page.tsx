import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthShell } from '@/components/auth/auth-shell';
import { LoginForm } from '@/components/auth/login-form';
import { getCurrentUser } from '@/lib/supabase/queries-auth';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Accede a tu cuenta para ver pedidos y cotizaciones.',
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect('/cuenta');

  return (
    <AuthShell
      eyebrow="Acceso"
      title="Bienvenido de vuelta."
      description="Ingresa con tu correo y contraseña para ver tus pedidos y cotizaciones."
      footer={
        <p>
          ¿Todavía no tienes cuenta?{' '}
          <Link
            href="/cuenta/registro"
            className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
          >
            Crear cuenta
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
