import { expect, type Page } from '@playwright/test'

export async function expectQueryParam(page: Page, key: string, expectedValue: string | null) {
    await expect
        .poll(() => {
            const url = new URL(page.url())
            return url.searchParams.get(key)
        })
        .toBe(expectedValue)
}
