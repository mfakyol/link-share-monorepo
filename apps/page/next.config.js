/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  transpilePackages: ["@packages/lib", "@packages/react-lib"],
};

module.exports = nextConfig;
