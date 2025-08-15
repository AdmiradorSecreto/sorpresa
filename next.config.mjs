/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: 'export',
  basePath: '/sorpresa',         // nombre del repo en GitHub
  assetPrefix: '/sorpresa/',     // asegura que los assets carguen correctamente
}

export default nextConfig;
