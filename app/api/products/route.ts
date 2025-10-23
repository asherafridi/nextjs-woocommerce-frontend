import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  const consumerKey = "ck_1608de1c2a578ed47f5bdd419b2160ff26cba0c5";
  const consumerSecret = "cs_a1f5db8c98e5399b55887ca0887ccb9ec1482243";
  const baseUrl = "http://localhost/zain-mart/wp-json/wc/v3/products";

  // ✅ Get ?search= parameter from request URL
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  // ✅ Append search query if provided
  const url = search
    ? `${baseUrl}?search=${encodeURIComponent(search)}`
    : baseUrl;

  // ✅ Initialize OAuth 1.0a
  const oauth = new OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: "HMAC-SHA256",
    hash_function(base_string, key) {
      return CryptoJS.HmacSHA256(base_string, key).toString(CryptoJS.enc.Base64);
    },
  });

  // ✅ Generate OAuth authorization header
  const request_data = { url, method: "GET" };
  const authHeader = oauth.toHeader(oauth.authorize(request_data));

  // ✅ Make WooCommerce API call
  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: authHeader.Authorization },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
