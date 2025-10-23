import OAuth from "oauth-1.0a";
import CryptoJS from "crypto-js";

export async function GET() {
  const consumerKey = "ck_1608de1c2a578ed47f5bdd419b2160ff26cba0c5";
  const consumerSecret = "cs_a1f5db8c98e5399b55887ca0887ccb9ec1482243";
  const url = "http://localhost/zain-mart/wp-json/wc/v3/products/categories?exclude=15";

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
