import { wcApi } from "@/lib/woocommerce";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {


  // ✅ Get ?search= parameter from request URL
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  
    const {data} = await wcApi.get("products", { slug });

  return NextResponse.json(data[0]);
}