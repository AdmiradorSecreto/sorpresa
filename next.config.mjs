/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: 'export',
  basePath: '/sorpresa',      // tu repo en GitHub
  assetPrefix: '/sorpresa/',  // asegura que los assets se carguen
}

export default nextConfig
