import React from "react";
import ProductCard from "@/components/ProductCard";

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

interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  price_html: string;
  on_sale: boolean;
  stock_status: string;
  average_rating: string;
  rating_count: number;
  type: string;
  categories: WooCategory[];
  images: WooImage[];
}

const ProductsGallery = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product:any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGallery;
