import { wcApi } from "@/lib/woocommerce";
import Image from "next/image";
import { notFound } from "next/navigation";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const {slug} = await params;
    const { data } = await wcApi.get("products", { slug: slug});

    if (!data || data.length === 0) {
      return notFound();
    }

    const product = data[0];

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {product.images?.length > 0 && (
          <div className="relative w-80 h-80">
            <Image
              src={product.images[0].src}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <p className="mt-4 text-lg">{product.price_html}</p>
        <div
          className="prose mt-6"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    return notFound();
  }
}
