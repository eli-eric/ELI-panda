/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
