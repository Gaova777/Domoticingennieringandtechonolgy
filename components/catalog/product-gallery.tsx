'use client';

import { useState } from 'react';
import { ProductPlaceholder } from '@/components/shared/product-placeholder';
import { cn } from '@/lib/utils';

type Props = {
  sku: string;
  name: string;
};

const ANGLES = ['FRONT', 'SIDE', 'BACK', 'DETAIL'];

export function ProductGallery({ sku }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <ProductPlaceholder
        sku={`${sku} · ${ANGLES[active]}`}
        size="lg"
        className="aspect-square md:aspect-[4/5]"
      />
      <ul className="grid grid-cols-4 gap-3">
        {ANGLES.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'block w-full rounded-sm border transition-colors',
                active === i
                  ? 'border-foreground'
                  : 'border-border hover:border-foreground/40',
              )}
            >
              <ProductPlaceholder
                sku={label}
                size="sm"
                className="aspect-square border-0"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
