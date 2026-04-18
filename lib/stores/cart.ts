'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  maxStock?: number;
};

type CartState = {
  items: CartItem[];
  isHydrated: boolean;
  setHydrated: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

type CartSelectors = {
  totalItems: (state: CartState) => number;
  subtotal: (state: CartState) => number;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            const nextQty = Math.min(
              existing.quantity + quantity,
              existing.maxStock ?? Number.MAX_SAFE_INTEGER,
            );
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: nextQty } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'domotic-cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const cartSelectors: CartSelectors = {
  totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
};
