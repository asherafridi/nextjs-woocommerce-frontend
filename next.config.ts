import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "slateblue-sheep-666523.hostingersite.com",
        port: "",
        pathname: "/wp-content/uploads/**", // allow all images under this path
      },
    ],
  },
};

export default nextConfig;
