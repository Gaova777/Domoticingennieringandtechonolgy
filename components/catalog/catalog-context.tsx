'use client';

import { createContext, useContext } from 'react';
import type { Filters } from '@/lib/filters';

type CatalogContextValue = {
  filters: Filters;
  setFilters: (updater: (prev: Filters) => Filters) => void;
  reset: () => void;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function useCatalogFilters(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalogFilters must be used inside CatalogContext');
  }
  return ctx;
}

export const CatalogProvider = CatalogContext.Provider;
