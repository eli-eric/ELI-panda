/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    experimental: {
        proxyClientMaxBodySize: '150mb',
    },
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
            },
            {
                hostname: 'panda.eli-beams.eu',
            },
            {
                hostname: 'api.panda.eli-beams.eu',
            },
            {
                hostname: 'panda.eli-laser.eu',
            },
            {
                hostname: 'panda-api.eli-laser.eu',
            },
        ],
    },
    env: {
        PANDA_API_GW_URL: process.env.PANDA_API_GW_URL,
        PANDA_ENV: process.env.PANDA_ENV,
    },
}

module.exports = nextConfig
