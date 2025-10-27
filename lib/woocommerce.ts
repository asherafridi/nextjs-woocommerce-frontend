import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wcApi = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL!,
  consumerKey: process.env.WOO_KEY!,
  consumerSecret: process.env.WOO_SECRET!,
  version: "wc/v3",
});
