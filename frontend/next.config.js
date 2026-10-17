/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@malick-buss/shared'],
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/vendeur/dashboard',
      },
    ];
  },
};

module.exports = nextConfig;

