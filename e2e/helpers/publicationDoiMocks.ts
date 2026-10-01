import type { Page } from '@playwright/test'

import { PUBLICATION_WOS_PREVIEW } from '../fixtures/publicationDoi.mock'
import { setupNetworkMocks } from './network'

const CODEBOOK_ENDPOINT = /\/api\/mock-server\/codebook\/[^?]+(?:\?.*)?$/
const LINKS_ENDPOINT = /\/api\/mock-server\/files\/links\/[^?]+(?:\?.*)?$/
const WOS_PREVIEW_ENDPOINT = /\/api\/mock-server\/publications\/wos-preview(?:\?.*)?$/

export async function setupPublicationDoiNetworkMocks(page: Page) {
    await setupNetworkMocks(page, {
        restHandlers: [
            {
                matcher: CODEBOOK_ENDPOINT,
                method: 'GET',
                resolver: () => ({
                    data: [],
                    metadata: {
                        code: 'PLAYWRIGHT_CODEBOOK',
                        type: 'PLAYWRIGHT_CODEBOOK',
                    },
                }),
            },
            {
                matcher: LINKS_ENDPOINT,
                method: 'GET',
                resolver: () => [],
            },
            {
                matcher: WOS_PREVIEW_ENDPOINT,
                method: 'GET',
                resolver: () => PUBLICATION_WOS_PREVIEW,
            },
        ],
    })
}
