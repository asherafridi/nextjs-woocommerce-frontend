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
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-600">Product not found</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          {product.images?.[0] && (
            <Image
              src={product.images[0].src}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg object-cover"
            />
          )}
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <p className="text-2xl font-bold text-green-600">
            {product.price_html ? (
              <span dangerouslySetInnerHTML={{ __html: product.price_html }} />
            ) : (
              `$${product.price}`
            )}
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {product.short_description && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Details</h2>
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
