import type { Page } from '@playwright/test'

import { expect, test } from '../fixtures/test'
import { setupNetworkMocks } from '../helpers/network'

const ZONES_ENDPOINT = /\/api\/mock-server\/zones(?:\?.*)?$/

const FILTER = JSON.stringify([{ id: 'name', value: 'pump', name: 'name' }])

interface ZonesCall {
    columnFilter: string | null
    pagination: string | null
}

// Zones is server-rendered (no dynamic ssr:false), so it is the page that proves
// URL-derived state must not leak into the hydration render: the prerendered HTML
// cannot know the query string, so reading it during hydration makes React throw
// away the server tree.
const mockZones = async (page: Page) => {
    const calls: ZonesCall[] = []
    await setupNetworkMocks(page, {
        restHandlers: [
            {
                matcher: ZONES_ENDPOINT,
                resolver: ({ url }) => {
                    calls.push({
                        columnFilter: url.searchParams.get('columnFilter'),
                        pagination: url.searchParams.get('pagination'),
                    })
                    return { data: [], totalCount: 0 }
                },
            },
        ],
    })
    return calls
}

// React minifies these in a production build: #418/#423/#425 are the
// hydration-mismatch codes, so match them as well as the dev wording.
const HYDRATION_ERROR =
    /hydrat|did not match|server.rendered|server HTML|react error #(418|423|425)/i

const collectHydrationProblems = (page: Page) => {
    const problems: string[] = []
    const record = (text: string) => {
        if (HYDRATION_ERROR.test(text)) problems.push(text)
    }
    page.on('console', message => {
        if (message.type() === 'error' || message.type() === 'warning') record(message.text())
    })
    page.on('pageerror', error => record(error.message))
    return problems
}

test.describe('Server-rendered page deep link', () => {
    test('hydrates a ?page deep link without a hydration mismatch', async ({ page }) => {
        const problems = collectHydrationProblems(page)
        const calls = await mockZones(page)

        await page.goto('/zones?page=3')

        // Waiting for the deep-linked page to reach the API means hydration has
        // finished, so any mismatch it caused has already been reported.
        await expect.poll(() => JSON.parse(calls.at(-1)?.pagination ?? '{}').page).toBe(3)
        expect(new URL(page.url()).searchParams.get('page')).toBe('3')
        expect(problems).toEqual([])
    })

    test('hydrates a ?filter deep link without a hydration mismatch, and keeps it', async ({
        page,
    }) => {
        const problems = collectHydrationProblems(page)
        const calls = await mockZones(page)

        await page.goto(`/zones?filter=${encodeURIComponent(FILTER)}`)

        await expect.poll(() => calls.at(-1)?.columnFilter ?? null).toBe(FILTER)
        expect(new URL(page.url()).searchParams.get('filter')).toBe(FILTER)
        expect(problems).toEqual([])
    })
})
