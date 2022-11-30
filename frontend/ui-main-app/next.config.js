/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'eli-beams.eu']
  },
  env: {
    PANDA_API_GW_URL: process.env.PANDA_API_GW_URL
  }
}

module.exports = nextConfig
