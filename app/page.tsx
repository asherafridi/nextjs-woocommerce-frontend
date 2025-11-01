import CategorySlider from "@/components/home/CategorySlider";
import Hero from "@/components/home/Hero";
import ProductsGallery from "@/components/home/ProductsGallery";
import Image from "next/image";

import { WooProduct,WooProductCategory } from "@/types/woo";
export const revalidate = 60;

export default async function Home() {
  const newArrivalsFetch = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    next: { revalidate: 900 }, // ISR cache
  });

  if (!newArrivalsFetch.ok) {
    throw new Error("Failed to fetch products");
  }
  const categoriesFetch = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
    next: { revalidate: 3600 },
  });

  if (!categoriesFetch.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: WooProductCategory[] = await categoriesFetch.json();

  const data = await newArrivalsFetch.json();

  const products: WooProduct[] = data.products;

  return (
    <>
      <Hero />
      <CategorySlider categories={categories} />
      <ProductsGallery products={products} name={"New Arrivals"} />
    </>
  );
}
