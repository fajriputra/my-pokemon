/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["raw.githubusercontent.com"],
  },
  trailingSlash: true,
};

export default nextConfig;
