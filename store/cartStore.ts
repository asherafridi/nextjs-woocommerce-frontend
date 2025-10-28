"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WooProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: string;
}

interface CartItem extends WooProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: WooProduct) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      increaseQty: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + parseFloat(item.price || "0") * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage", // localStorage key
      skipHydration: false,
    }
  )
);
