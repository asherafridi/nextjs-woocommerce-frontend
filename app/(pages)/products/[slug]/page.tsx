import { wcApi } from "@/lib/woocommerce";
import axios from "axios";
import Image from "next/image";
import React, { use } from "react";
import { useRouter } from "next/navigation";


// Fetch single product by slug
async function getProductBySlug(slug: string) {
  const { data } = await axios.get(`http://localhost:3000/api/products/get?slug=${slug}`);
  return data;
}

const page = ({slug}:{slug:string}) => {
     
  const product = getProductBySlug(slug as string);
  console.log(product);

  if (!product) {
    return <div className="text-center py-10 text-gray-600">Product not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {slug}
    </div>
  );
};

export default page;
