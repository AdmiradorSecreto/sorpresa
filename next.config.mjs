/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: 'export',
  basePath: '/sorpresa',
  assetPrefix: '/sorpresa',  // sin la barra final
  trailingSlash: true  // añade esto
}

export default nextConfig