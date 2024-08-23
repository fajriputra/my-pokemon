/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["raw.githubusercontent.com"],
  },
  trailingSlash: true, // Penting agar path di GitHub Pages dapat bekerja dengan baik
};

export default nextConfig;
