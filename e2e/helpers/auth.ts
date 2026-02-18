import type { Page, Route } from '@playwright/test'

const DEFAULT_ROLES = ['basics', 'systems-view', 'system-edit']

interface MockSessionOptions {
    roles?: string[]
}

const AUTH_SESSION_PATH = /\/api\/auth\/session(?:\?.*)?$/
const AUTH_PROVIDERS_PATH = /\/api\/auth\/providers(?:\?.*)?$/
const AUTH_CSRF_PATH = /\/api\/auth\/csrf(?:\?.*)?$/

const fulfillJson = async (route: Route, body: unknown) => {
    await route.fulfill({
        body: JSON.stringify(body),
        contentType: 'application/json',
        status: 200,
    })
}

export async function mockNextAuthSession(page: Page, options?: MockSessionOptions) {
    const roles = options?.roles ?? DEFAULT_ROLES

    await page.route(AUTH_SESSION_PATH, async route => {
        await fulfillJson(route, {
            expires: '2099-12-31T23:59:59.999Z',
            user: {
                apiAccessToken: 'playwright-token',
                email: 'playwright.user@example.com',
                facility: 'Beamline Facility',
                facilityCode: 'B',
                fullName: 'Playwright User',
                name: 'Playwright User',
                roles,
                uid: 'playwright-user',
            },
        })
    })

    await page.route(AUTH_PROVIDERS_PATH, async route => {
        await fulfillJson(route, {
            credentials: {
                id: 'credentials',
                name: 'Credentials',
                signinUrl: '/api/auth/signin/credentials',
                type: 'credentials',
            },
        })
    })

    await page.route(AUTH_CSRF_PATH, async route => {
        await fulfillJson(route, {
            csrfToken: 'playwright-csrf-token',
        })
    })
}
