/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'localhost'
      },
      {
        hostname: 'panda.eli-beams.eu'
      },
      {
        hostname: 'api.panda.eli-beams.eu'
      },
      {
        hostname: 'panda.eli-laser.eu'
      },
      {
        hostname: 'panda-api.eli-laser.eu'
      }
    ]
  },
  env: {
    PANDA_API_GW_URL: process.env.PANDA_API_GW_URL,
    PANDA_ENV: process.env.PANDA_ENV
  },
  webpack: config => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true }
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config
  }
}

module.exports = nextConfig
