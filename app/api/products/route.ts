import { NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // ✅ Extract filters from query params
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const order = searchParams.get("order") || "desc"; // asc | desc
    const orderby = searchParams.get("orderby") || "date"; // date | price | title | popularity | rating
    const per_page = searchParams.get("per_page") || "2"; // Products per page
    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search");

    // ✅ Build WooCommerce query
    const params: Record<string, any> = {
      per_page,
      page,
      order,
      orderby,
    };

    if (category) params.category = category;
    if (search) params.search = search;
    if (minPrice) params.min_price = minPrice;
    // if (maxPrice) params.max_price = maxPrice;

    // ✅ Fetch from WooCommerce API
    const queryString = new URLSearchParams(params).toString();
    const resp = await wcApi.get(`products?${queryString}`); 
    const { data, headers } = resp;

    // ✅ WooCommerce returns total + total_pages headers
    const total = headers["x-wp-total"];
    const totalPages = headers["x-wp-totalpages"];

    return NextResponse.json(
      {
        products: data,
        pagination: {
          total: Number(total),
          totalPages: Number(totalPages),
          currentPage: Number(page),
          perPage: Number(per_page),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
