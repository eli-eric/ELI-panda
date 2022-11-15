/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === 'production' ? 'http://api.panda.eli-beams.eu/' : 'http://localhost:5001/'
  }
}

module.exports = nextConfig
