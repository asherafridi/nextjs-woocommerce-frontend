import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

export async function GET() {
  const consumerKey = process.env.WOO_KEY!;
  const consumerSecret = process.env.WOO_SECRET!;
  const url = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL+"/wp-json/wc/v3/products/categories?exclude=15";

  // Initialize OAuth
  const oauth = new OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: "HMAC-SHA256",
    hash_function(base_string, key) {
      return CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64);
    },
  });

  // Create request data
  const request_data = {
    url,
    method: "GET",
  };

  // Sign the request
  const authHeader = oauth.toHeader(oauth.authorize(request_data));

  // Fetch products
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: authHeader.Authorization,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
