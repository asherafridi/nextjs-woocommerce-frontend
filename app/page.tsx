import CategorySlider from "@/components/home/CategorySlider";
import Hero from "@/components/home/Hero";
import ProductsGallery from "@/components/home/ProductsGallery";
import Image from "next/image";

import { Product,Category } from "@/types/woo";
export const revalidate = 60;

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 900 }, // ISR cache
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    next: { revalidate: 60 },
  });

  if (!res1.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: Category[] = await res1.json();

  const products: Product[] = await res.json();

  return (
    <>
      <Hero />
      <CategorySlider categories={categories} />
      <ProductsGallery products={products} />
    </>
  );
}
