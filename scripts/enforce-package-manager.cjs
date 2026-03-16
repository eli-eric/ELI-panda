#!/usr/bin/env node

const userAgent = process.env.npm_config_user_agent || ''

if (!userAgent.startsWith('yarn/')) {
    console.error('This repository requires Yarn. Please run: yarn install')
    process.exit(1)
}
