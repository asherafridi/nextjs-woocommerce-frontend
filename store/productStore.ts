"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WooImage {
  id: number;
  src: string;
  alt: string;
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: WooImage[];
  categories: WooCategory[];
}

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
    }),
    {
      name: "product-storage", // localStorage key
    }
  )
);
