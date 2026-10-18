/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@malick-buss/shared'],
  onDemandEntries: {
    // Conserver les pages compilées en mémoire pendant 1h au lieu de les détruire après 15s
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 50,
  },
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

