import type { Metadata } from 'next';
import { parseFilters } from '@/lib/filters';
import { getProducts } from '@/lib/supabase/queries';
import { CatalogShell } from '@/components/catalog/catalog-shell';

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Catálogo de domótica, cámaras, cerraduras y accesorios. Envío a toda Colombia con soporte local en Pereira.',
};

export const revalidate = 300;

type SearchParams = { [key: string]: string | string[] | undefined };

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialFilters = parseFilters(params);

  // Fetch every active product once; the client shell filters in memory for
  // instant feedback. SSG-caching handles the heavy lifting (revalidate: 300).
  const allProducts = await getProducts({
    brands: [],
    inStockOnly: false,
    sort: 'relevance',
  });

  return (
    <CatalogShell allProducts={allProducts} initialFilters={initialFilters} />
  );
}
