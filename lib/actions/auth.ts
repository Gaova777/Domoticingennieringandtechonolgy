'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

const signInSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, 'Ingresa tu nombre').max(100),
  phone: z
    .string()
    .min(7, 'Teléfono muy corto')
    .max(25)
    .regex(/^[+0-9\s()-]+$/, 'Solo números y + ( ) -')
    .optional()
    .or(z.literal('')),
  acceptPolicy: z
    .boolean()
    .refine((v) => v === true, 'Debes aceptar la política'),
});

export type AuthResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function translateError(msg: string | undefined): string {
  if (!msg) return 'Algo falló, intenta de nuevo';
  const m = msg.toLowerCase();
  if (m.includes('invalid login') || m.includes('invalid credentials'))
    return 'Correo o contraseña incorrectos';
  if (m.includes('already registered') || m.includes('user already'))
    return 'Ese correo ya tiene una cuenta';
  if (m.includes('password should be at least'))
    return 'La contraseña debe tener al menos 6 caracteres';
  if (m.includes('email rate limit'))
    return 'Demasiados intentos. Espera un minuto y vuelve a intentar';
  if (m.includes('email not confirmed'))
    return 'Debes confirmar tu correo antes de iniciar sesión';
  return msg;
}

export async function signIn(raw: unknown): Promise<AuthResult> {
  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Revisa los datos',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const sb = await createClient();
  const { error } = await sb.auth.signInWithPassword(parsed.data);
  if (error) return { ok: false, error: translateError(error.message) };

  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function signUp(raw: unknown): Promise<AuthResult> {
  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Revisa los datos',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const sb = await createClient();
  const { data, error } = await sb.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
        phone: parsed.data.phone || null,
      },
    },
  });

  if (error) return { ok: false, error: translateError(error.message) };

  // If email confirmation is disabled, the user is auto-signed-in.
  // If confirmation is required, a session exists only after confirm.
  if (data.session) {
    revalidatePath('/', 'layout');
  }
  return { ok: true };
}

export async function signOut() {
  const sb = await createClient();
  await sb.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}
