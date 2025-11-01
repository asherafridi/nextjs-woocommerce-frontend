import { NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function GET() {
  try {
    // ✅ Fetch WooCommerce product categories (excluding ID 15)
    const { data } = await wcApi.get("products/categories", {
      exclude: [15],
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error fetching categories:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error: "Failed to fetch product categories",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
