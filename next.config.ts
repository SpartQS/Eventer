import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: 'cdn2.thecatapi.com' },
      { hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
