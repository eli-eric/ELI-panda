import type { Page } from '@playwright/test'

import { mockNextAuthSession } from './auth'

interface AppMockOptions {
    roles?: string[]
}

export async function setupCommonAppMocks(page: Page, options?: AppMockOptions) {
    await mockNextAuthSession(page, { roles: options?.roles })
}
