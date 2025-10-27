import { NextRequest, NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

// ✅ Correctly typed dynamic route
export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const { slug } = context.params;

    const { data } = await wcApi.get("products", { slug });

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
