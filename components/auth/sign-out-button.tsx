'use client';

import { useTransition } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';

type Props = { className?: string; variant?: 'inline' | 'button' };

export function SignOutButton({ className, variant = 'button' }: Props) {
  const [pending, start] = useTransition();
  const base =
    variant === 'inline'
      ? 'inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-destructive'
      : 'inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium text-foreground transition hover:border-foreground/40';
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => signOut())}
      className={cn(base, className)}
    >
      <LogOut className="h-3.5 w-3.5" />
      {pending ? 'Saliendo…' : 'Cerrar sesión'}
    </button>
  );
}
