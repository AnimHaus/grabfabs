import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-9f1519d31cf2482ba68512fc7582919d.r2.dev',
      },
    ],
  },
};

export default nextConfig;
