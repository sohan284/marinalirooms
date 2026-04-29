import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/en/le-suite',
        destination: '/en#le-suite',
        permanent: true,
      },
      {
        source: '/it/le-suite',
        destination: '/it#le-suite',
        permanent: true,
      },
      {
        source: '/de/le-suite',
        destination: '/de#le-suite',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
