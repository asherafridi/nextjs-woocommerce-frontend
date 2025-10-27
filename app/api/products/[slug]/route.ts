import { NextRequest, NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce"; // optional if you're using WooCommerce API

// GET /api/products/:slug
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Example with WooCommerce
    const { data } = await wcApi.get("products", { slug });

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
