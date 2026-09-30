import { expect, test } from '../fixtures/test'
import { setupNetworkMocks } from '../helpers/network'

const SYSTEMS_ENDPOINT = /\/api\/mock-server\/systems(?:\?.*)?$/

const FILTER = JSON.stringify([
    { id: 'systemLevel', value: ['TECHNOLOGY_UNIT'], name: 'systemLevel' },
])

interface SystemsCall {
    columnFilter: string | null
    pagination: string | null
}

// Regression tests for ELIPANDA-505: a shared link carrying table state must keep
// that state in the URL and apply it to the fetch, instead of being reset to the
// unfiltered default page.
const mockSystems = async (page: import('@playwright/test').Page, calls: SystemsCall[]) => {
    await setupNetworkMocks(page, {
        restHandlers: [
            {
                matcher: SYSTEMS_ENDPOINT,
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
}

test.describe('Systems overview deep link', () => {
    test('keeps the filter query param from a shared link', async ({ page }) => {
        const calls: SystemsCall[] = []
        await mockSystems(page, calls)

        await page.goto(`/systems/overview?page=1&filter=${encodeURIComponent(FILTER)}`)
        await page.waitForTimeout(4000)

        expect(new URL(page.url()).searchParams.get('filter')).toBe(FILTER)
        expect(calls.at(-1)?.columnFilter).toBe(FILTER)
    })

    test('honours a page deep link', async ({ page }) => {
        const calls: SystemsCall[] = []
        await mockSystems(page, calls)

        await page.goto(`/systems/overview?page=3&filter=${encodeURIComponent(FILTER)}`)
        await page.waitForTimeout(4000)

        const url = new URL(page.url())
        expect(url.searchParams.get('page')).toBe('3')
        expect(url.searchParams.get('filter')).toBe(FILTER)
        expect(JSON.parse(calls.at(-1)?.pagination ?? '{}')).toMatchObject({ page: 3 })
    })

    test('clearing a deep-linked filter removes it for good', async ({ page }) => {
        const calls: SystemsCall[] = []
        await mockSystems(page, calls)

        await page.goto(`/systems/overview?filter=${encodeURIComponent(FILTER)}`)
        await expect(page.getByText('systemLevel', { exact: true })).toBeVisible()

        await page.getByTestId('filter-badge-remove-systemLevel').click()
        await page.waitForTimeout(3000)

        // The param must stay gone — the initial-URL fallback must never
        // resurrect a filter the user has just cleared.
        expect(new URL(page.url()).searchParams.get('filter')).toBeNull()
        expect(calls.at(-1)?.columnFilter).toBe('[]')
    })
})
