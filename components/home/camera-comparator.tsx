import Link from 'next/link';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { MOCK_CAMERA_COMPARE } from '@/lib/mock/products';
import { formatCop } from '@/lib/constants';
import { SectionHeading } from './section-heading';
import { Button } from '@/components/ui/button';

const ROWS: {
  key: keyof (typeof MOCK_CAMERA_COMPARE)[number];
  label: string;
  render?: (v: unknown) => React.ReactNode;
}[] = [
  { key: 'resolution', label: 'Resolución' },
  {
    key: 'nightRangeM',
    label: 'Visión nocturna',
    render: (v) => `${v as number} m`,
  },
  { key: 'ipRating', label: 'Protección IP' },
  {
    key: 'hasColorNight',
    label: 'Color de noche',
    render: (v) =>
      v ? (
        <Check className="h-4 w-4 text-brand-green" />
      ) : (
        <Minus className="h-4 w-4 text-muted-foreground/40" />
      ),
  },
  {
    key: 'priceFrom',
    label: 'Precio desde',
    render: (v) => formatCop(v as number),
  },
];

export function CameraComparator() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Comparador"
            title="Elegí la cámara correcta"
            description="Comparamos modelos populares con las specs que importan. Sin jerga innecesaria."
          />
          <Button
            variant="outline"
            render={<Link href="/productos?comparar=camaras" />}
            className="border-white/15 bg-white/5 hover:border-brand-magenta/40 hover:text-brand-magenta"
          >
            Comparador completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-40 p-4 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Característica
                </th>
                {MOCK_CAMERA_COMPARE.map((cam) => (
                  <th key={cam.id} className="p-4 text-left">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-cyan">
                      {cam.brand}
                    </div>
                    <div className="mt-1 text-base font-bold leading-tight">
                      {cam.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.key as string}
                  className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}
                >
                  <td className="p-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {row.label}
                  </td>
                  {MOCK_CAMERA_COMPARE.map((cam) => {
                    const raw = cam[row.key];
                    return (
                      <td
                        key={cam.id}
                        className="p-4 text-sm font-medium tabular-nums"
                      >
                        {row.render ? row.render(raw) : String(raw)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
