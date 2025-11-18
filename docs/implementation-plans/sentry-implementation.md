# Sentry Implementation Guide for ELI-PANDA

> **Status**: Ready for Implementation
> **Target Environment**: Production (initially)
> **Estimated Time**: 2-3 hours
> **Last Updated**: 2025-11-07

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Step 1: Install Sentry SDK](#step-1-install-sentry-sdk)
- [Step 2: Create Configuration Files](#step-2-create-configuration-files)
- [Step 3: Create Error Boundaries](#step-3-create-error-boundaries)
- [Step 4: Update Next.js Configuration](#step-4-update-nextjs-configuration)
- [Step 5: Docker Configuration](#step-5-docker-configuration)
- [Step 6: GitHub Actions Configuration](#step-6-github-actions-configuration)
- [Step 7: Environment Variables](#step-7-environment-variables)
- [Step 8: Update .gitignore and .dockerignore](#step-8-update-gitignore-and-dockerignore)
- [Step 9: Testing](#step-9-testing)
- [Troubleshooting](#troubleshooting)
- [Final Checklist](#final-checklist)

---

## Overview

This guide provides a comprehensive implementation plan for integrating Sentry error tracking and monitoring into the ELI-PANDA Next.js application.

### Features to Implement

- ✅ **Error Tracking**: Automatic capture of frontend and backend errors
- ✅ **Performance Monitoring**: APM with 10% sampling rate
- ✅ **Session Replay**: Record user sessions on errors (100%) and random sessions (10%)
- ✅ **User Feedback**: Allow users to report issues directly
- ✅ **Source Maps**: Upload source maps for readable stack traces
- 🔒 **Production Only**: Monitoring enabled only in production environment

### Architecture Notes

- **Next.js Version**: 14.2.33
- **Router**: Hybrid (Page Router primary + App Router for some features)
- **Deployment**: Docker with multi-stage builds
- **CI/CD**: GitHub Actions with self-hosted runner
- **Primary Router**: Page Router (most pages in `/src/pages/`)

---

## Prerequisites

### 1. Sentry Account Setup

1. Create a new project at [sentry.io](https://sentry.io)
2. Select "Next.js" as the platform
3. Note down the following:
   - **DSN URL**: `https://xxx@xxx.ingest.sentry.io/xxx`
   - **Organization Slug**: Your Sentry organization name
   - **Project Slug**: Your project name
4. Generate an Auth Token:
   - Go to Settings → Developer Settings → Auth Tokens
   - Create token with `project:releases` and `project:write` scopes
   - Save this token securely

### 2. GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

| Secret Name              | Description                 | Example                                |
| ------------------------ | --------------------------- | -------------------------------------- |
| `SENTRY_AUTH_TOKEN`      | Sentry authentication token | `sntrys_xxxxx...`                      |
| `SENTRY_ORG`             | Sentry organization slug    | `eli-panda`                            |
| `SENTRY_PROJECT`         | Sentry project slug         | `eli-panda-frontend`                   |
| `NEXT_PUBLIC_SENTRY_DSN` | Public DSN URL              | `https://xxx@xxx.ingest.sentry.io/xxx` |

---

## Step 1: Install Sentry SDK

```bash
yarn add @sentry/nextjs
```

This will install the official Sentry SDK for Next.js, which includes integrations for:

- Client-side (Browser)
- Server-side (Node.js)
- Edge Runtime
- Next.js specific features

---

## Step 2: Create Configuration Files

### 2.1 Create `instrumentation.ts` (Root Level)

This file enables Next.js instrumentation hooks.

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

export const onRequestError = async (
  err: { digest: string } & Error,
  request: {
    path: string
    method: string
    headers: { [key: string]: string | string[] | undefined }
  }
) => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs')
    Sentry.captureException(err, {
      contexts: {
        request: {
          path: request.path,
          method: request.method,
          headers: request.headers
        }
      }
    })
  }
}
```

### 2.2 Create `sentry.client.config.ts` (Root Level)

Client-side Sentry configuration for browser runtime.

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
const ENVIRONMENT =
  process.env.SENTRY_ENVIRONMENT || process.env.PANDA_ENV || 'production'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: SENTRY_DSN,

  // Only enable in production
  enabled: IS_PRODUCTION,

  // Environment name
  environment: ENVIRONMENT,

  // Performance Monitoring
  tracesSampleRate: 0.1, // 10% of transactions

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true
    }),
    Sentry.feedbackIntegration({
      colorScheme: 'system',
      showBranding: false
    }),
    Sentry.browserTracingIntegration()
  ],

  // Filtering
  ignoreErrors: [
    // Browser extensions
    'top.GLOBALS',
    'chrome-extension://',
    'moz-extension://',
    // Network errors
    'Network request failed',
    'NetworkError',
    // NextAuth errors (expected during auth flow)
    '[next-auth]'
  ],

  // Performance
  beforeSend(event, hint) {
    // Filter out events from development
    if (!IS_PRODUCTION) {
      return null
    }
    return event
  }
})
```

### 2.3 Create `sentry.server.config.ts` (Root Level)

Server-side Sentry configuration for Node.js runtime.

```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
const ENVIRONMENT =
  process.env.SENTRY_ENVIRONMENT || process.env.PANDA_ENV || 'production'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: SENTRY_DSN,

  // Only enable in production
  enabled: IS_PRODUCTION,

  // Environment name
  environment: ENVIRONMENT,

  // Performance Monitoring
  tracesSampleRate: 0.1, // 10% of transactions

  // Integrations
  integrations: [Sentry.httpIntegration(), Sentry.graphqlIntegration()],

  // Filtering
  ignoreErrors: [
    // Expected GraphQL errors
    'GraphQL error:',
    // Auth errors (expected)
    'Unauthorized',
    'Authentication required'
  ],

  // Performance
  beforeSend(event, hint) {
    // Filter out events from development
    if (!IS_PRODUCTION) {
      return null
    }

    // Add server context
    if (event.request) {
      event.tags = {
        ...event.tags,
        server: 'true'
      }
    }

    return event
  }
})
```

### 2.4 Create `sentry.edge.config.ts` (Root Level)

Edge runtime Sentry configuration.

```typescript
// sentry.edge.config.ts
import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN
const ENVIRONMENT =
  process.env.SENTRY_ENVIRONMENT || process.env.PANDA_ENV || 'production'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

Sentry.init({
  dsn: SENTRY_DSN,

  // Only enable in production
  enabled: IS_PRODUCTION,

  // Environment name
  environment: ENVIRONMENT,

  // Performance Monitoring (lower rate for edge)
  tracesSampleRate: 0.05, // 5% of transactions

  // Filtering
  beforeSend(event, hint) {
    if (!IS_PRODUCTION) {
      return null
    }

    // Add edge context
    event.tags = {
      ...event.tags,
      runtime: 'edge'
    }

    return event
  }
})
```

---

## Step 3: Create Error Boundaries

### 3.1 Create `src/app/global-error.tsx`

Error boundary for App Router (for future App Router pages).

```typescript
// src/app/global-error.tsx
'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <Error statusCode={undefined as any} />
      </body>
    </html>
  )
}
```

### 3.2 Create `src/pages/_error.tsx`

Error boundary for Page Router (primary router for this application).

```typescript
// src/pages/_error.tsx
import * as Sentry from '@sentry/nextjs'
import type { NextPage } from 'next'
import type { ErrorProps } from 'next/error'
import Error from 'next/error'
import { useEffect } from 'react'

const CustomErrorComponent: NextPage<ErrorProps> = ({ statusCode, title }) => {
  useEffect(() => {
    // This effect will only run on the client side
    if (statusCode && statusCode >= 500) {
      // Only log server errors to Sentry
      Sentry.captureException(new Error(`Error ${statusCode}: ${title || 'Server error'}`))
    }
  }, [statusCode, title])

  return <Error statusCode={statusCode} title={title} />
}

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return Error.getInitialProps(contextData)
}

export default CustomErrorComponent
```

---

## Step 4: Update Next.js Configuration

Update `next.config.js` to integrate Sentry's webpack plugin and configuration.

```javascript
// next.config.js
const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  output: 'standalone',

  // Enable instrumentation
  experimental: {
    instrumentationHook: true
  },

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
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  }
}

// Sentry configuration options
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only upload source maps in production builds
  silent: false, // Can be used to suppress logs

  // Upload source maps during build
  widenClientFileUpload: true,

  // Automatically annotate React components for better error messages
  reactComponentAnnotation: {
    enabled: true
  },

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // automaticVercelMonitors: true,
}

// Wrap Next.js config with Sentry
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
```

---

## Step 5: Docker Configuration

### 5.1 Update `Dockerfile`

Modify the Dockerfile to include Sentry environment variables during build and runtime.

**Changes to Builder Stage (line ~19-41):**

```dockerfile
# 2. Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Existing ARGs
ARG NEO4J_PASSWORD
ARG AZURE_AD_BEAMLINES_CLIENT_ID
ARG AZURE_AD_BEAMLINES_CLIENT_SECRET
ARG AZURE_AD_BEAMLINES_TENANT_ID

# NEW: Sentry build-time arguments
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG NEXT_PUBLIC_SENTRY_DSN

# Existing ENVs
ENV PANDA_API_GW_URL="https://panda-api.eli-laser.eu/v1"
ENV MINIO_ENDPOINT="minio-main"
ENV MINIO_BUCKET_NAME="panda-production"
ENV NEO4J_USER="neo4j"
ENV PANDA_ENV="production"
ENV NEO4J_URI="bolt://panda-neo4j:7687"
ENV NEO4J_PASSWORD="${NEO4J_PASSWORD}"
ENV AZURE_AD_BEAMLINES_CLIENT_ID="${AZURE_AD_BEAMLINES_CLIENT_ID}"
ENV AZURE_AD_BEAMLINES_CLIENT_SECRET="${AZURE_AD_BEAMLINES_CLIENT_SECRET}"
ENV AZURE_AD_BEAMLINES_TENANT_ID="${AZURE_AD_BEAMLINES_TENANT_ID}"

# NEW: Sentry build-time environment variables
ENV SENTRY_AUTH_TOKEN="${SENTRY_AUTH_TOKEN}"
ENV SENTRY_ORG="${SENTRY_ORG}"
ENV SENTRY_PROJECT="${SENTRY_PROJECT}"
ENV NEXT_PUBLIC_SENTRY_DSN="${NEXT_PUBLIC_SENTRY_DSN}"

RUN env

RUN yarn build
```

**Changes to Runner Stage (line ~44-60):**

```dockerfile
# 3. Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PANDA_API_GW_URL="https://panda-api.eli-laser.eu/v1"
ENV NEXTAUTH_URL="https://panda.eli-laser.eu/"
ENV MINIO_ENDPOINT="minio-main"
ENV MINIO_BUCKET_NAME="panda-production"
ENV PANDA_ENV="production"
ENV NEO4J_USER="neo4j"
ENV NEO4J_URI="bolt://panda-neo4j:7687"
ENV NEO4J_PASSWORD="${NEO4J_PASSWORD}"
ENV AZURE_AD_BEAMLINES_CLIENT_ID="${AZURE_AD_BEAMLINES_CLIENT_ID}"
ENV AZURE_AD_BEAMLINES_CLIENT_SECRET="${AZURE_AD_BEAMLINES_CLIENT_SECRET}"
ENV AZURE_AD_BEAMLINES_TENANT_ID="${AZURE_AD_BEAMLINES_TENANT_ID}"

# NEW: Sentry runtime environment variables
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN="${NEXT_PUBLIC_SENTRY_DSN}"
ENV SENTRY_ENVIRONMENT="production"

RUN env
# ... rest of the file remains the same
```

### 5.2 Update `docker-compose.yml`

Add Sentry environment variables to the build and runtime configuration.

```yaml
version: '3.9'

networks:
  panda-net:
    driver: bridge
    name: panda-net

services:
  panda-frontend-ui-main-app:
    container_name: panda-frontend-ui-main-app
    restart: unless-stopped
    environment:
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - MINIO_ACCESS_KEY_PROD=${MINIO_ACCESS_KEY_PROD}
      - MINIO_SECRET_KEY_PROD=${MINIO_SECRET_KEY_PROD}
      - NEO4J_PASSWORD=${NEO4J_PASSWORD}
      - AZURE_AD_BEAMLINES_CLIENT_ID=${AZURE_AD_BEAMLINES_CLIENT_ID}
      - AZURE_AD_BEAMLINES_CLIENT_SECRET=${AZURE_AD_BEAMLINES_CLIENT_SECRET}
      - AZURE_AD_BEAMLINES_TENANT_ID=${AZURE_AD_BEAMLINES_TENANT_ID}
      # NEW: Sentry runtime environment
      - NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
    build:
      context: ./
      dockerfile: Dockerfile
      labels:
        - panda-frontend-ui-main-app
      args:
        - NEO4J_PASSWORD=${NEO4J_PASSWORD}
        - AZURE_AD_BEAMLINES_CLIENT_ID=${AZURE_AD_BEAMLINES_CLIENT_ID}
        - AZURE_AD_BEAMLINES_CLIENT_SECRET=${AZURE_AD_BEAMLINES_CLIENT_SECRET}
        - AZURE_AD_BEAMLINES_TENANT_ID=${AZURE_AD_BEAMLINES_TENANT_ID}
        # NEW: Sentry build arguments
        - SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
        - SENTRY_ORG=${SENTRY_ORG}
        - SENTRY_PROJECT=${SENTRY_PROJECT}
        - NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
    networks:
      - panda-net
    ports:
      - '127.0.0.1:5000:5001'
```

### 5.3 Update Other Docker Compose Files

Apply similar changes to:

- `docker-compose-dev.yml`
- `docker-compose-test.yml`

Use appropriate environment-specific values for `SENTRY_ENVIRONMENT` if needed.

---

## Step 6: GitHub Actions Configuration

### 6.1 Update `compose-up-production-on-push.yml`

Add Sentry secrets to the production workflow.

```yaml
name: Compose up frontend on push

on:
  push:
    branches:
      - 'production'

jobs:
  use-secret:
    runs-on: czechia-server
    steps:
      - name: Show secret stats
        run: |
          echo "${{ secrets.NEXTAUTH_SECRET }}" | "${{ secrets.MINIO_ACCESS_KEY_PROD }}" | "${{ secrets.MINIO_SECRET_KEY_PROD }}" | "${{ secrets.NEO4J_PASSWORD }}" | "${{ secrets.AZURE_AD_BEAMLINES_CLIENT_ID }}" | "${{ secrets.AZURE_AD_BEAMLINES_CLIENT_SECRET }}" | "${{ secrets.AZURE_AD_BEAMLINES_TENANT_ID }}" | "${{ secrets.SENTRY_AUTH_TOKEN }}" | "${{ secrets.NEXT_PUBLIC_SENTRY_DSN }}" | wc | wc

  unit-tests:
    runs-on: czechia-server
    needs: use-secret
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Yarn
        run: npm install -g yarn
      - name: Install dependencies
        run: yarn install
      - name: Run unit tests
        run: yarn test

  compose-up:
    runs-on: czechia-server
    needs: unit-tests
    steps:
      - uses: actions/checkout@v3
      - run: |
          docker compose up -d --build
        env:
          NEXTAUTH_SECRET: '${{ secrets.NEXTAUTH_SECRET }}'
          MINIO_ACCESS_KEY_DEV: '${{ secrets.MINIO_ACCESS_KEY_PROD }}'
          MINIO_SECRET_KEY_DEV: '${{ secrets.MINIO_SECRET_KEY_PROD }}'
          NEO4J_PASSWORD: '${{ secrets.NEO4J_PASSWORD }}'
          AZURE_AD_BEAMLINES_CLIENT_ID: '${{ secrets.AZURE_AD_BEAMLINES_CLIENT_ID }}'
          AZURE_AD_BEAMLINES_CLIENT_SECRET: '${{ secrets.AZURE_AD_BEAMLINES_CLIENT_SECRET }}'
          AZURE_AD_BEAMLINES_TENANT_ID: '${{ secrets.AZURE_AD_BEAMLINES_TENANT_ID }}'
          # NEW: Sentry environment variables
          SENTRY_AUTH_TOKEN: '${{ secrets.SENTRY_AUTH_TOKEN }}'
          SENTRY_ORG: '${{ secrets.SENTRY_ORG }}'
          SENTRY_PROJECT: '${{ secrets.SENTRY_PROJECT }}'
          NEXT_PUBLIC_SENTRY_DSN: '${{ secrets.NEXT_PUBLIC_SENTRY_DSN }}'
```

### 6.2 Update `compose-up-dev-on-push.yml`

Similar changes for dev workflow (optional - you may want to disable source maps upload for faster builds).

```yaml
name: Compose up DEV frontend on push

on:
  push:
    branches:
      - 'dev'

jobs:
  # ... existing jobs ...

  compose-up:
    runs-on: czechia-server
    needs: unit-tests
    steps:
      - uses: actions/checkout@v3
      - run: |
          docker compose -f docker-compose-dev.yml up -d --build
        env:
          NEXTAUTH_SECRET: '${{ secrets.NEXTAUTH_SECRET }}'
          MINIO_ACCESS_KEY_PROD: '${{ secrets.MINIO_ACCESS_KEY_DEV }}'
          MINIO_SECRET_KEY_PROD: '${{ secrets.MINIO_SECRET_KEY_DEV }}'
          NEO4J_PASSWORD: '${{ secrets.NEO4J_PASSWORD }}'
          AZURE_AD_BEAMLINES_CLIENT_ID: '${{ secrets.AZURE_AD_BEAMLINES_CLIENT_ID }}'
          AZURE_AD_BEAMLINES_CLIENT_SECRET: '${{ secrets.AZURE_AD_BEAMLINES_CLIENT_SECRET }}'
          AZURE_AD_BEAMLINES_TENANT_ID: '${{ secrets.AZURE_AD_BEAMLINES_TENANT_ID }}'
          # Optional: Include Sentry for dev environment (or omit to disable)
          # SENTRY_AUTH_TOKEN: '${{ secrets.SENTRY_AUTH_TOKEN }}'
          # SENTRY_ORG: '${{ secrets.SENTRY_ORG }}'
          # SENTRY_PROJECT: '${{ secrets.SENTRY_PROJECT }}'
          # NEXT_PUBLIC_SENTRY_DSN: '${{ secrets.NEXT_PUBLIC_SENTRY_DSN }}'
```

### 6.3 Update `compose-up-test-on-push.yml`

Similar changes for test workflow.

---

## Step 7: Environment Variables

### 7.1 Local Development (`.env`)

Add to your local `.env` file (this file is already in `.gitignore`):

```bash
# Sentry Configuration (Optional for local development)
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_ORG=eli-panda
SENTRY_PROJECT=eli-panda-frontend
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxx
SENTRY_ENVIRONMENT=development

# Note: Sentry will only be active when NODE_ENV=production
# For local testing with Sentry enabled, set:
# NODE_ENV=production
```

### 7.2 Production Environment

Ensure the following are set via Docker Compose or CI/CD:

| Variable                 | Required       | Description                       |
| ------------------------ | -------------- | --------------------------------- |
| `NEXT_PUBLIC_SENTRY_DSN` | ✅ Yes         | Public DSN for Sentry project     |
| `SENTRY_AUTH_TOKEN`      | ✅ Yes (build) | Auth token for source maps upload |
| `SENTRY_ORG`             | ✅ Yes (build) | Sentry organization slug          |
| `SENTRY_PROJECT`         | ✅ Yes (build) | Sentry project slug               |
| `SENTRY_ENVIRONMENT`     | ⚠️ Optional    | Defaults to `production`          |

---

## Step 8: Update .gitignore and .dockerignore

### 8.1 Update `.gitignore`

Add Sentry-specific files (append to existing `.gitignore`):

```gitignore
# Sentry
.sentryclirc
.env.sentry-build-plugin
```

### 8.2 Update `.dockerignore`

Add Sentry-specific files (append to existing `.dockerignore`):

```dockerignore
# Sentry
.sentryclirc
.env.sentry-build-plugin
```

---

## Step 9: Testing

### 9.1 Create Test Endpoint

Create `src/pages/api/sentry-test.ts`:

```typescript
// src/pages/api/sentry-test.ts
import * as Sentry from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Test error capture
    throw new Error('Sentry Test Error - API Route')
  } catch (error) {
    Sentry.captureException(error)
    res.status(500).json({ error: 'Test error captured by Sentry' })
  }
}
```

Create `src/pages/sentry-test.tsx`:

```typescript
// src/pages/sentry-test.tsx
import * as Sentry from '@sentry/nextjs'
import { NextPage } from 'next'

const SentryTestPage: NextPage = () => {
  const handleClientError = () => {
    throw new Error('Sentry Test Error - Client Side')
  }

  const handleApiError = async () => {
    try {
      const response = await fetch('/api/sentry-test')
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('API test failed:', error)
    }
  }

  const handleFeedback = () => {
    const feedback = Sentry.getFeedback()
    if (feedback) {
      feedback.createWidget()
    }
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Sentry Test Page</h1>

      <div className="space-y-2">
        <button
          onClick={handleClientError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Test Client Error
        </button>

        <button
          onClick={handleApiError}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
        >
          Test API Error
        </button>

        <button
          onClick={handleFeedback}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
        >
          Open Feedback Widget
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm">
          Click the buttons above to test Sentry integration.
          Errors will only be sent in production mode.
        </p>
      </div>
    </div>
  )
}

export default SentryTestPage
```

### 9.2 Testing Steps

1. **Local Testing** (optional):

   ```bash
   NODE_ENV=production yarn build
   NODE_ENV=production yarn start
   ```

   - Navigate to `http://localhost:5001/sentry-test`
   - Click "Test Client Error" - check Sentry dashboard for error
   - Click "Test API Error" - check Sentry dashboard for API error
   - Click "Open Feedback Widget" - test user feedback form

2. **Production Testing**:
   - Deploy to production environment
   - Navigate to `/sentry-test`
   - Test all three buttons
   - Verify errors appear in Sentry dashboard within 1-2 minutes

3. **Verify Source Maps**:
   - In Sentry error details, check that stack traces show original TypeScript file names and line numbers (not minified)
   - Example: `OrderItem.cont.tsx:123` instead of `chunk-abc123.js:1`

4. **Test Session Replay**:
   - Navigate through the application normally
   - Trigger an error
   - In Sentry, find the error and click "Replay" to watch the session recording

5. **Test Performance Monitoring**:
   - Navigate through several pages
   - In Sentry, go to "Performance" section
   - Verify you see transaction data for page loads and API calls

---

## Troubleshooting

### Issue: Source Maps Not Uploading

**Symptoms**: Stack traces show minified code instead of original source

**Solutions**:

1. Verify `SENTRY_AUTH_TOKEN` is set correctly in build environment
2. Check Docker build logs for Sentry webpack plugin output
3. Verify `SENTRY_ORG` and `SENTRY_PROJECT` match your Sentry project
4. Ensure the auth token has `project:releases` and `project:write` scopes

### Issue: No Errors Appearing in Sentry

**Symptoms**: Errors occur but don't show up in Sentry dashboard

**Solutions**:

1. Verify `NODE_ENV=production` in runtime environment
2. Check that `NEXT_PUBLIC_SENTRY_DSN` is set correctly
3. Look for Sentry initialization logs in browser console (should see "Sentry initialized")
4. Check network tab for outgoing requests to `sentry.io`
5. Verify the DSN is for the correct project

### Issue: Build Fails with Sentry Errors

**Symptoms**: Docker build fails during `yarn build` with Sentry-related errors

**Solutions**:

1. Temporarily disable source maps upload by removing `SENTRY_AUTH_TOKEN` from build args
2. Check that all Sentry config files are present
3. Verify `@sentry/nextjs` is installed in `package.json`
4. Check for syntax errors in Sentry config files

### Issue: Too Many Events / High Data Volume

**Symptoms**: Sentry quota exceeded quickly

**Solutions**:

1. Lower `tracesSampleRate` (e.g., from 0.1 to 0.05)
2. Lower `replaysSessionSampleRate` (e.g., from 0.1 to 0.05)
3. Add more entries to `ignoreErrors` array
4. Implement more aggressive `beforeSend` filtering

### Issue: Session Replay Not Working

**Symptoms**: Errors appear but no replay available

**Solutions**:

1. Verify `Sentry.replayIntegration()` is included in client config
2. Check browser console for replay errors
3. Ensure the page was loaded after Sentry initialization
4. Verify `replaysOnErrorSampleRate` is set to 1.0

---

## Final Checklist

Before considering the implementation complete, verify the following:

### Configuration Files

- [ ] `instrumentation.ts` created in root
- [ ] `sentry.client.config.ts` created in root
- [ ] `sentry.server.config.ts` created in root
- [ ] `sentry.edge.config.ts` created in root
- [ ] `src/app/global-error.tsx` created
- [ ] `src/pages/_error.tsx` created
- [ ] `next.config.js` wrapped with `withSentryConfig`

### Environment Setup

- [ ] Sentry project created on sentry.io
- [ ] DSN obtained from Sentry project
- [ ] Auth token generated with correct scopes
- [ ] GitHub secrets added for all 4 Sentry variables
- [ ] Local `.env` updated (optional)

### Docker & Deployment

- [ ] `Dockerfile` updated with Sentry ARGs and ENVs (builder stage)
- [ ] `Dockerfile` updated with Sentry ENVs (runner stage)
- [ ] `docker-compose.yml` updated with Sentry build args and environment
- [ ] `.dockerignore` updated with Sentry exclusions
- [ ] `.gitignore` updated with Sentry exclusions

### CI/CD

- [ ] `compose-up-production-on-push.yml` updated with Sentry secrets
- [ ] `compose-up-dev-on-push.yml` updated (optional)
- [ ] `compose-up-test-on-push.yml` updated (optional)

### Testing

- [ ] Test endpoint `/api/sentry-test` created
- [ ] Test page `/sentry-test` created
- [ ] Client-side error test successful
- [ ] Server-side error test successful
- [ ] User feedback widget tested
- [ ] Source maps verified in Sentry dashboard
- [ ] Session replay verified for error events
- [ ] Performance monitoring data appearing in Sentry

### Production Verification

- [ ] Production build succeeds without errors
- [ ] Source maps uploaded successfully during build
- [ ] Application starts and runs normally
- [ ] Errors captured and visible in Sentry dashboard
- [ ] Stack traces show original source code (not minified)
- [ ] Environment tag correct in Sentry (`production`)
- [ ] Performance data appearing in Sentry
- [ ] No performance degradation observed

---

## Additional Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Session Replay Documentation](https://docs.sentry.io/product/session-replay/)
- [User Feedback Widget](https://docs.sentry.io/product/user-feedback/)
- [Source Maps Upload](https://docs.sentry.io/platforms/javascript/sourcemaps/)

---

## Notes

- **Production Only**: Sentry is configured to only be active in production (`NODE_ENV=production`)
- **Sample Rates**: Adjust `tracesSampleRate` and `replaysSessionSampleRate` based on your traffic and Sentry plan limits
- **Privacy**: Session replay is configured with `maskAllText: true` and `blockAllMedia: true` to protect user privacy
- **Cost Management**: Monitor your Sentry quota usage, especially for Session Replay which can consume significant data
- **Security**: Never commit `.sentryclirc` or auth tokens to git

---

**Last Updated**: 2025-11-07
**Author**: Implementation plan generated for ELI-PANDA project
**Status**: Ready for implementation
