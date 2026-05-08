import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/rsvpify-dashboard",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
