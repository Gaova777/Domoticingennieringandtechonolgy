'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductPlaceholder } from '@/components/shared/product-placeholder';
import { cn } from '@/lib/utils';

type Props = {
  sku: string;
  name: string;
  category?: string;
  imageUrl?: string | null;
  galleryUrls?: string[];
};

const ANGLES = ['FRONT', 'SIDE', 'BACK', 'DETAIL'];

export function ProductGallery({
  sku,
  name,
  category,
  imageUrl,
  galleryUrls,
}: Props) {
  const images = buildImageList(imageUrl, galleryUrls);
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="space-y-4">
        <ProductPlaceholder
          sku={`${sku} · ${ANGLES[0]}`}
          category={category}
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
                  category={category}
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

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-sm bg-surface-1 md:aspect-[4/5]">
        <Image
          src={images[active]}
          alt={name}
          fill
          sizes="(min-width: 768px) 56vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
      <ul className="grid grid-cols-4 gap-3">
        {images.slice(0, 4).map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-square w-full overflow-hidden rounded-sm border transition-colors',
                active === i
                  ? 'border-foreground'
                  : 'border-border hover:border-foreground/40',
              )}
            >
              <Image
                src={src}
                alt={`${name} — vista ${i + 1}`}
                fill
                sizes="15vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildImageList(
  main: string | null | undefined,
  gallery: string[] | undefined,
): string[] {
  const out: string[] = [];
  if (main) out.push(main);
  if (gallery) for (const url of gallery) if (!out.includes(url)) out.push(url);
  return out;
}
