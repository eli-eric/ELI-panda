import { test as base } from '@playwright/test'

import { setupCommonAppMocks } from '../helpers/app'

export const test = base.extend({
    page: async ({ page }, use) => {
        await setupCommonAppMocks(page)
        await use(page)
    },
})

export { expect } from '@playwright/test'
