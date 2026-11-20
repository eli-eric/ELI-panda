import type { Page } from '@playwright/test'

import { expect, test } from '../fixtures/test'
import { setupNetworkMocks } from '../helpers/network'

// Catch-all: these tests are about surviving a bad query string, not about payloads.
const API = /\/api\/mock-server\//

const mockApi = async (page: Page) => {
    const requests: string[] = []
    await setupNetworkMocks(page, {
        restHandlers: [
            {
                matcher: API,
                resolver: ({ url }) => {
                    requests.push(url.pathname)
                    return { data: [], totalCount: 0 }
                },
            },
        ],
    })
    return requests
}

/**
 * A render-phase throw surfaces as a React `console.error` plus Next's
 * client-side-exception notice — not as a `pageerror` — so both have to be
 * watched or the assertion passes through a blank page.
 */
const collectFatalErrors = (page: Page) => {
    const errors: string[] = []
    const record = (text: string) => {
        if (/SyntaxError|client-side exception|Unexpected token/i.test(text)) errors.push(text)
    }
    page.on('console', message => {
        if (message.type() === 'error') record(message.text())
    })
    page.on('pageerror', error => record(error.message))
    return errors
}

test.describe('Malformed query string', () => {
    // A hand-edited or truncated shared link must degrade, not blank the page.
    for (const query of ['page=abc', 'page=0', 'pageSize=abc', 'filter=%255B%257Bbroken']) {
        test(`survives ?${query}`, async ({ page }) => {
            const errors = collectFatalErrors(page)
            const requests = await mockApi(page)

            await page.goto(`/catalogue?${query}`)

            // Reaching the API proves the page rendered rather than blanking out.
            await expect.poll(() => requests.length).toBeGreaterThan(0)
            expect(errors).toEqual([])
        })
    }
})
