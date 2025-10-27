import { wcApi } from "@/lib/woocommerce";
import Image from "next/image";
import React from "react";

async function getProductBySlug(slug: string) {
  try {
    const { data } = await wcApi.get("products", { slug });
    return data[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}


// ✅ Fix: tell Next.js to treat this as a normal async component
const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params;

  
    const { data } = await wcApi.get("products", { slug });

    console.log("Product data:", data);

  return (
    <div className="max-w-5xl mx-auto p-6">
     {slug}
    </div>
  );
};

export default ProductPage;
