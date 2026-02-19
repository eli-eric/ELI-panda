import { test as base } from '@playwright/test'

import { setupCommonAppMocks } from '../helpers/app'

export const test = base.extend({
    page: async ({ page }, usePage) => {
        await setupCommonAppMocks(page)
        await usePage(page)
    },
})

export { expect } from '@playwright/test'
