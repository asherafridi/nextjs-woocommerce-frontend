import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

export async function GET() {
  const consumerKey = "ck_c4ef8ac29169b164066d7757fd7708e929445999";
  const consumerSecret = "cs_f7edb055e28be49a7a53ea14491dd06cd2fdaffb";
  const url = "https://slateblue-sheep-666523.hostingersite.com/wp-json/wc/v3/products/categories?exclude=15";

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
