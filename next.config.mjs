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

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
if (process.env.GITHUB_ACTIONS && repoName) {
  nextConfig.basePath = `/${repoName}`;
  nextConfig.assetPrefix = `/${repoName}/`;
}
export default nextConfig;
