import type { Page } from '@playwright/test'

import { expect, test } from '../fixtures/test'
import { setupNetworkMocks } from '../helpers/network'

const SYSTEMS_ENDPOINT = /\/api\/mock-server\/systems(?:\?.*)?$/

const FILTER = JSON.stringify([
    { id: 'systemLevel', value: ['TECHNOLOGY_UNIT'], name: 'systemLevel' },
])
const SORTING = JSON.stringify([{ id: 'name', desc: true }])

interface SystemsCall {
    columnFilter: string | null
    pagination: string | null
    sorting: string | null
    search: string | null
}

// Regression tests for ELIPANDA-505: a shared link carrying table state must keep
// that state in the URL and apply it to the fetch, instead of resetting to the
// unfiltered default page.
const mockSystems = async (page: Page) => {
    const calls: SystemsCall[] = []

    await setupNetworkMocks(page, {
        restHandlers: [
            {
                matcher: SYSTEMS_ENDPOINT,
                resolver: ({ url }) => {
                    calls.push({
                        columnFilter: url.searchParams.get('columnFilter'),
                        pagination: url.searchParams.get('pagination'),
                        sorting: url.searchParams.get('sorting'),
                        search: url.searchParams.get('search'),
                    })
                    return { data: [], totalCount: 0 }
                },
            },
        ],
    })

    return calls
}

/** Last request the table made, once it settles on the expected value. */
const expectLastCall = (calls: SystemsCall[], field: keyof SystemsCall) =>
    expect.poll(() => calls.at(-1)?.[field] ?? null)

test.describe('Systems overview deep link', () => {
    test('keeps the filter query param and applies it to the fetch', async ({ page }) => {
        const calls = await mockSystems(page)

        await page.goto(`/systems/overview?page=1&filter=${encodeURIComponent(FILTER)}`)

        await expectLastCall(calls, 'columnFilter').toBe(FILTER)
        expect(new URL(page.url()).searchParams.get('filter')).toBe(FILTER)
    })

    test('applies a filtered deep link on the very first fetch', async ({ page }) => {
        const calls = await mockSystems(page)

        await page.goto(`/systems/overview?filter=${encodeURIComponent(FILTER)}`)
        await expectLastCall(calls, 'columnFilter').toBe(FILTER)

        // No unfiltered round-trip first: a shared link must not flash page-1
        // unfiltered data before correcting itself.
        expect(calls.map(call => call.columnFilter)).toEqual([FILTER])
    })

    test('honours page, sort and search deep links', async ({ page }) => {
        const calls = await mockSystems(page)

        await page.goto(
            `/systems/overview?page=3&sortBy=${encodeURIComponent(SORTING)}&search=pump`,
        )

        await expectLastCall(calls, 'sorting').toBe(SORTING)
        const lastCall = calls.at(-1)
        expect(JSON.parse(lastCall?.pagination ?? '{}')).toMatchObject({ page: 3 })
        expect(lastCall?.search).toBe('pump')

        const url = new URL(page.url())
        expect(url.searchParams.get('page')).toBe('3')
        expect(url.searchParams.get('sortBy')).toBe(SORTING)
    })

    test('clearing a deep-linked filter removes it and resets to page 1', async ({ page }) => {
        const calls = await mockSystems(page)

        await page.goto(`/systems/overview?page=3&filter=${encodeURIComponent(FILTER)}`)
        await expectLastCall(calls, 'columnFilter').toBe(FILTER)
        expect(JSON.parse(calls.at(-1)?.pagination ?? '{}')).toMatchObject({ page: 3 })

        await page.getByTestId('filter-badge-remove-systemLevel').click()

        // The param must stay gone — the address-bar fallback must never
        // resurrect a filter the user has just cleared.
        await expectLastCall(calls, 'columnFilter').toBe('[]')
        await expect.poll(() => new URL(page.url()).searchParams.get('filter')).toBeNull()

        // Changing the filter is still a user action that sends you back to
        // page 1 — only the initial hydration of a deep link is exempt.
        await expect.poll(() => JSON.parse(calls.at(-1)?.pagination ?? '{}').page).toBe(1)
    })

    test('survives a malformed filter param instead of crashing', async ({ page }) => {
        const calls = await mockSystems(page)
        const crashes: string[] = []
        page.on('pageerror', error => crashes.push(error.message))

        await page.goto('/systems/overview?filter=%255B%257Bbroken')

        await expectLastCall(calls, 'columnFilter').toBe('[]')
        expect(crashes).toEqual([])
    })
})
