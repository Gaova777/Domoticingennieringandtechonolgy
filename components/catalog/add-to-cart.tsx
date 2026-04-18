'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/stores/cart';
import type { DBProduct } from '@/lib/supabase/queries';
import { formatCop, waLink } from '@/lib/constants';

export function AddToCart({ product }: { product: DBProduct }) {
  const addItem = useCart((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const max = Math.max(1, product.stock || 99);
  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.imageUrl ?? '',
        maxStock: product.stock > 0 ? product.stock : undefined,
      },
      qty,
    );
    setJustAdded(true);
    toast.success('Agregado al carrito', {
      description: `${qty} × ${product.name}`,
    });
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Disminuir cantidad"
            className="inline-flex h-10 w-10 items-center justify-center text-muted-foreground transition hover:text-foreground disabled:opacity-30"
            disabled={qty <= 1}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-sm tabular-nums">
            {String(qty).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            aria-label="Aumentar cantidad"
            className="inline-flex h-10 w-10 items-center justify-center text-muted-foreground transition hover:text-foreground disabled:opacity-30"
            disabled={qty >= max}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <Button
          onClick={handleAdd}
          disabled={outOfStock}
          size="lg"
          className="h-11 flex-1 rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90"
        >
          {justAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Agregado
            </>
          ) : outOfStock ? (
            'Sin stock — coordinar por WhatsApp'
          ) : (
            <>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Agregar al carrito · {formatCop(product.price * qty)}
            </>
          )}
        </Button>
      </div>

      <a
        href={waLink(
          `Hola, me interesa: ${product.name} (${product.sku}). ¿Disponible?`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium text-foreground transition hover:border-foreground"
      >
        Coordinar por WhatsApp →
      </a>
    </div>
  );
}
