/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'panda.eli-beams.eu']
  },
  env: {
    PANDA_API_GW_URL: process.env.PANDA_API_GW_URL,
    NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED
  }
}

module.exports = nextConfig
