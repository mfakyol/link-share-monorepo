/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  experimental: {
    transpilePackages: ["@packages/shared"],
  },

  async rewrites() {
    return [
      {
        source: "/panel/:tab",
        destination: "/panel",
      },
    ];
  },
};

module.exports = nextConfig;
