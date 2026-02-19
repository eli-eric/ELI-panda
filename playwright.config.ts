import { defineConfig, devices } from '@playwright/test'

const IS_CI = !!process.env.CI
const E2E_PORT = 5002
const E2E_BASE_URL = `http://localhost:${E2E_PORT}`

export default defineConfig({
    testDir: './e2e',
    testMatch: '**/*.e2e.ts',
    fullyParallel: true,
    forbidOnly: IS_CI,
    retries: IS_CI ? 2 : 0,
    workers: IS_CI ? 2 : undefined,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: E2E_BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        viewport: { width: 1440, height: 900 },
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
    webServer: {
        command:
            `yarn build && ` +
            `mkdir -p .next/standalone/.next && ` +
            `cp -R .next/static .next/standalone/.next/static && ` +
            `cp -R public .next/standalone/public && ` +
            `PORT=${E2E_PORT} HOSTNAME=127.0.0.1 node .next/standalone/server.js`,
        url: E2E_BASE_URL,
        reuseExistingServer: false,
        timeout: 3 * 60 * 1000,
        stdout: 'ignore',
        stderr: 'pipe',
        env: {
            ...process.env,
            PANDA_ENV: 'localhost',
            PANDA_API_GW_URL: `${E2E_BASE_URL}/api/mock-server`,
            PLAYWRIGHT_E2E: '1',
        },
    },
})
