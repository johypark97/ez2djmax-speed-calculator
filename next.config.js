/** @type {import('next').NextConfig} */

const IS_PROD = process.env.NODE_ENV === 'production';

const PREFIX = IS_PROD ? '.' : undefined;

const nextConfig = {
  assetPrefix: PREFIX,
  output: 'export',
  reactStrictMode: true,
};

module.exports = nextConfig;
