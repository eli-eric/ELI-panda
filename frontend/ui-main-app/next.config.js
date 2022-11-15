/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === 'production' ? 'http://localhost:5001/' : 'http://api.panda.eli-beams.eu/'
  }
}

module.exports = nextConfig
