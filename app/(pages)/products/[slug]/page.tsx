import Image from "next/image";
import React from "react";
import AddToCart from "./AddtoCart";

// ✅ Types
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

interface WooProduct {
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

// ✅ Component
const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: WooProduct = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ✅ Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.images?.[0]?.src || "/placeholder.png"}
              alt={product.images?.[0]?.alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnail images */}
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Product Info */}
        <div>
          <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>

          <div
            className="text-xl font-medium text-blue-600 mb-2"
            dangerouslySetInnerHTML={{ __html: product.price_html }}
          />

          {product.on_sale && (
            <p className="text-sm text-green-600 mb-2 font-medium">
              On Sale 🎉
            </p>
          )}

          <p className="text-gray-600 mb-6">
            {product.short_description.replace(/<[^>]*>?/gm, "")}
          </p>
          <AddToCart product={product} />

          {/* ✅ Categories */}
          {product.categories?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Categories:</h3>
              <ul className="flex flex-wrap gap-2">
                {product.categories.map((cat) => (
                  <li
                    key={cat.id}
                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div
              className="prose prose-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
