'use client';

import { useState, useTransition } from 'react';
import { Tag, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/stores/cart';
import { checkPromoCode } from '@/lib/actions/promotions';
import { formatCop } from '@/lib/constants';

type Props = { subtotal: number };

export function PromoInput({ subtotal }: Props) {
  const promo = useCart((s) => s.promo);
  const applyPromo = useCart((s) => s.applyPromo);
  const clearPromo = useCart((s) => s.clearPromo);

  const [code, setCode] = useState('');
  const [pending, startTransition] = useTransition();

  const onApply = () => {
    if (!code.trim()) return;
    startTransition(async () => {
      const result = await checkPromoCode(code, subtotal);
      if (!result.valid) {
        toast.error(result.reason);
        return;
      }
      applyPromo({
        code: result.code,
        description: result.description,
        type: result.type,
        value: result.value,
        discount: result.discount,
        promoId: result.promoId,
      });
      setCode('');
      toast.success(`Cupón aplicado · ${formatCop(result.discount)} de descuento`);
    });
  };

  if (promo) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-sm border border-brand-green/40 bg-brand-green/5 p-3">
        <div className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-brand-green" />
          <span className="font-mono tracking-widest">{promo.code}</span>
          <span className="text-muted-foreground">· −{formatCop(promo.discount)}</span>
        </div>
        <button
          type="button"
          onClick={clearPromo}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
          aria-label="Quitar cupón"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        Cupón de descuento
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="BIENVENIDO10"
            maxLength={30}
            className="rounded-sm border-border bg-transparent pl-9 font-mono uppercase tracking-widest"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onApply();
              }
            }}
          />
        </div>
        <Button
          type="button"
          onClick={onApply}
          disabled={pending || !code.trim()}
          variant="outline"
          className="rounded-sm border-border font-mono text-[10px] uppercase tracking-[0.22em]"
        >
          Aplicar
        </Button>
      </div>
    </div>
  );
}
