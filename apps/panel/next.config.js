/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  transpilePackages: ["@packages/lib", "@packages/react-lib"],

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
