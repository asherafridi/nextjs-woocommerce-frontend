import CategorySlider from "@/components/home/CategorySlider";
import Hero from "@/components/home/Hero";
import ProductsGallery from "@/components/home/ProductsGallery";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySlider />
      <ProductsGallery />
    </>
  );
}
