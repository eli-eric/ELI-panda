/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false
  },
  swcMinify: false,
  reactStrictMode: false,
  output: 'standalone',
  images: {
    domains: [
      'localhost',
      'panda.eli-beams.eu',
      'source.unsplash.com',
      'api.panda.eli-beams.eu',
      'panda.eli-laser.eu',
      'panda-api.eli-laser.eu'
    ]
  },
  env: {
    PANDA_API_GW_URL: process.env.PANDA_API_GW_URL,
    PANDA_ENV: process.env.PANDA_ENV
  }
}

module.exports = nextConfig
