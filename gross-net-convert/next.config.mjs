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
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/tools/salary-calculator' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tools/salary-calculator' : '',
  trailingSlash: true,
}

export default nextConfig
