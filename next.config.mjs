/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "media.formula1.com" },
      { protocol: "https", hostname: "www.formula1.com" }
    ]
  }
};
export default nextConfig;
