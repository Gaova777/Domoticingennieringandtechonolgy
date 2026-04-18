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

export type AppliedPromo = {
  code: string;
  description: string | null;
  type: 'percent' | 'fixed_cop';
  value: number;
  discount: number;
  promoId: string;
};

type CartState = {
  items: CartItem[];
  promo: AppliedPromo | null;
  isHydrated: boolean;
  setHydrated: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyPromo: (promo: AppliedPromo) => void;
  clearPromo: () => void;
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
      promo: null,
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
              promo: null,
            };
          }
          return {
            items: [...state.items, { ...item, quantity }],
            promo: null,
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          promo: null,
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
          promo: null,
        })),
      applyPromo: (promo) => set({ promo }),
      clearPromo: () => set({ promo: null }),
      clear: () => set({ items: [], promo: null }),
    }),
    {
      name: 'domotic-cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
      partialize: (state) => ({ items: state.items, promo: state.promo }),
    },
  ),
);

export const cartSelectors: CartSelectors = {
  totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
};
