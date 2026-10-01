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
        command: `rm -rf .next && yarn build && PORT=${E2E_PORT} next start --hostname 127.0.0.1`,
        url: E2E_BASE_URL,
        reuseExistingServer: false,
        // A cold `rm -rf .next && yarn build` takes ~4 min for this app, so the
        // previous 3-minute budget made the suite unstartable.
        timeout: 8 * 60 * 1000,
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
