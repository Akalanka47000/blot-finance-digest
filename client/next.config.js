const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ];
  },
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['@shared/constants', '@/components', '@/constants', '@/hooks', '@/icons', '@/utils']
  }
};

module.exports = withBundleAnalyzer(nextConfig);
