const isProduction = process.env.NODE_ENV === 'production';

const assetPrefix = isProduction ? process.env.ASSET_PREFIX : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: assetPrefix,
  output: 'export',
  reactStrictMode: true,
};

export default nextConfig;
