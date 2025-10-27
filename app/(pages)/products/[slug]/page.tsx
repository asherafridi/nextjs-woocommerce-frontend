import { wcApi } from "@/lib/woocommerce";
import Image from "next/image";
import React from "react";




// ✅ Fix: tell Next.js to treat this as a normal async component
const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params;


  return (
    <div className="max-w-5xl mx-auto p-6">
     {slug}
    </div>
  );
};

export default ProductPage;
