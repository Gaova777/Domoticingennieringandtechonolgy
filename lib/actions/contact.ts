'use server';

import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre completo').max(100),
  phone: z
    .string()
    .min(7, 'Teléfono inválido')
    .max(25)
    .regex(/^[+0-9\s()-]+$/, 'Solo números y símbolos + ( ) -'),
  email: z.string().email('Correo inválido').max(120).optional().or(z.literal('')),
  city: z.string().min(2, 'Ingresa tu ciudad').max(80),
  serviceSlug: z.string().max(50).optional(),
  description: z.string().min(10, 'Cuéntanos un poco más (mín. 10 caracteres)').max(2000),
  acceptPolicy: z
    .boolean()
    .refine((v) => v === true, 'Debes aceptar la política de tratamiento de datos'),
});

export type ContactInput = z.infer<typeof schema>;

export type ContactResult =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContact(raw: unknown): Promise<ContactResult> {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Revisa los datos del formulario',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  const sb = supabaseAdmin();

  let serviceId: string | null = null;
  if (data.serviceSlug) {
    const { data: svc } = await sb
      .from('services')
      .select('id')
      .eq('slug', data.serviceSlug)
      .maybeSingle();
    serviceId = svc?.id ?? null;
  }

  const { data: inserted, error } = await sb
    .from('quote_requests')
    .insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      city: data.city,
      service_id: serviceId,
      description: data.description,
    })
    .select('id')
    .single();

  if (error || !inserted) {
    console.error('[submitContact]', error);
    return {
      ok: false,
      error: 'No pudimos enviar el mensaje. Intenta más tarde o escríbenos por WhatsApp.',
    };
  }

  return { ok: true, id: inserted.id };
}
