import type { Page } from '@playwright/test'

import { PUBLICATION_EXECUTIVE_SUMMARY } from '../fixtures/publicationAnalytics.mock'
import { setupNetworkMocks } from './network'

const EXECUTIVE_SUMMARY_ENDPOINT =
    /\/api\/mock-server\/publications\/analytics\/executive-summary(?:\?.*)?$/

export async function setupPublicationAnalyticsMocks(page: Page, options?: { fail?: boolean }) {
    await setupNetworkMocks(page, {
        restHandlers: [
            {
                matcher: EXECUTIVE_SUMMARY_ENDPOINT,
                method: 'GET',
                status: options?.fail ? 500 : 200,
                resolver: () => (options?.fail ? { message: 'boom' } : PUBLICATION_EXECUTIVE_SUMMARY),
            },
        ],
    })
}
