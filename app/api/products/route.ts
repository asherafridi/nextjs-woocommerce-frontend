import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  const consumerKey = "ck_c4ef8ac29169b164066d7757fd7708e929445999";
  const consumerSecret = "cs_f7edb055e28be49a7a53ea14491dd06cd2fdaffb";
  const baseUrl = "https://slateblue-sheep-666523.hostingersite.com/wp-json/wc/v3/products";

  // ✅ Get ?search= parameter from request URL
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  // ✅ Append search query if provided
  const url = search
    ? `${baseUrl}?search=${encodeURIComponent(search)}&per_page=8`
    : `${baseUrl}?per_page=8`;

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
