"use client";
import React from "react";
import { useCartStore}  from "@/store/cartStore";


const AddToCart = ({product}:{product:any}) => {
  const {addToCart} = useCartStore();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      images: product.images[0]?.src || "",
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
    Add to Cart
    </button>
  );
};

export default AddToCart;
