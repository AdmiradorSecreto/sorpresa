/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export', // necesario para next export
  basePath: process.env.NODE_ENV === 'production' ? '/sorpresa' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sorpresa/' : '',
}

export default nextConfig
