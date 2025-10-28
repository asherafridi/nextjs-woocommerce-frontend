import React from "react";
import ProductCard from "@/components/ProductCard";
import { WooProduct } from "@/types/woo";


const ProductsGallery = ({ products,name }: { products: WooProduct[],name: string }) => {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">{name}</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product:any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsGallery;
