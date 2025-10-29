import { NextRequest, NextResponse } from "next/server";
import { wcApi } from "@/lib/woocommerce";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      address,
      country,
      zip,
      phone,
      paymentMethod,
      items,
      total,
      shipping,
    } = body;

    // Map cart items to WooCommerce order line_items
    const line_items = items.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: paymentMethod,
      payment_method_title:
        paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod,
      set_paid: false,
      billing: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city: "",
        state: "",
        postcode: zip,
        country,
        email,
        phone,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city: "",
        state: "",
        postcode: zip,
        country,
      },
      line_items,
      shipping_lines: [
        {
          method_id: "flat_rate",
          method_title: "Flat Rate",
          total: shipping,
        },
      ],
    };

    const { data } = await wcApi.post("orders", orderData);

    return NextResponse.json(
      { message: "Order Created Successfully", order: data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("WooCommerce Order Error:", error.response?.data || error);
    return NextResponse.json(
      { error: "Failed to create order", details: error.message },
      { status: 500 }
    );
  }
}
