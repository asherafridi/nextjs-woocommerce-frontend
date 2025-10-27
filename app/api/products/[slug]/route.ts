import { NextRequest, NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    console.log('Slug:', slug); // ✅ Your console.log!

    const { data } = await wcApi.get("products", { slug });
    console.log('WooCommerce response:', data);

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}