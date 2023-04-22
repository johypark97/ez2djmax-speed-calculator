const isProduction = process.env.NODE_ENV === 'production';

const assetPrefix = isProduction ? '.' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: assetPrefix,
  output: 'export',
  reactStrictMode: true,
};

module.exports = nextConfig;
