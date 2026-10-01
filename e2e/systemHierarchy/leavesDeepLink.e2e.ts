import type { Page } from '@playwright/test'

import { SYSTEM_HIERARCHY_MOCKS } from '../fixtures/systemHierarchy.mock'
import { expect, test } from '../fixtures/test'
import { setupNetworkMocks } from '../helpers/network'

const HIERARCHY_ENDPOINT = /\/api\/mock-server\/systems\/hierarchy(?:\?.*)?$/
const LEAVES_ENDPOINT = /\/api\/mock-server\/system\/[^/]+\/leaves(?:\?.*)?$/

const FILTER = JSON.stringify([{ id: 'name', value: 'pump', name: 'name' }])
const SORTING = JSON.stringify([{ id: 'name', desc: true }])

/**
 * The leaves table pairs a URL-enabled PaginationV2 with a table whose
 * filter/sort hooks are not URL-synced, so it is the case that proves the
 * pagination reset does not assume that pairing holds.
 */
const mockLeaves = async (page: Page) => {
    const paginations: (string | null)[] = []

    await setupNetworkMocks(page, {
        restHandlers: [
            {
                matcher: HIERARCHY_ENDPOINT,
                resolver: () => SYSTEM_HIERARCHY_MOCKS.hierarchy,
            },
            {
                matcher: LEAVES_ENDPOINT,
                resolver: ({ url }) => {
                    paginations.push(url.searchParams.get('pagination'))
                    // Real rows, not an empty page: the empty state renders a
                    // different tree and would not exercise the reset at all.
                    return SYSTEM_HIERARCHY_MOCKS.leavesByParentUid['sys-root']
                },
            },
        ],
    })

    return paginations
}

test.describe('System hierarchy leaves deep link', () => {
    test('keeps ?page when the link also carries a sort and a filter', async ({ page }) => {
        const paginations = await mockLeaves(page)

        await page.goto(
            `/systems/hierarchy?parent=sys-root&page=3` +
                `&sortBy=${encodeURIComponent(SORTING)}` +
                `&filter=${encodeURIComponent(FILTER)}`,
        )

        await expect.poll(() => paginations.length).toBeGreaterThan(0)
        await expect.poll(() => JSON.parse(paginations.at(-1) ?? '{}').page).toBe(3)
        expect(new URL(page.url()).searchParams.get('page')).toBe('3')
    })
})
