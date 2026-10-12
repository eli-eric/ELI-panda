import type { Page } from '@playwright/test'

import { PUBLICATION_WOS_LOOKUP } from '../fixtures/publicationDoi.mock'
import { setupNetworkMocks } from './network'

const CODEBOOK_ENDPOINT = /\/api\/mock-server\/codebook\/[^?]+(?:\?.*)?$/
const LINKS_ENDPOINT = /\/api\/mock-server\/files\/links\/[^?]+(?:\?.*)?$/
const WOS_LOOKUP_ENDPOINT = /\/api\/mock-server\/publications\/wos\/lookup(?:\?.*)?$/
const RESEARCHER_IDS_ENDPOINT = /\/api\/mock-server\/researcher\/[^/]+\/researcher-ids$/

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
                matcher: WOS_LOOKUP_ENDPOINT,
                method: 'GET',
                resolver: () => PUBLICATION_WOS_LOOKUP,
            },
            {
                matcher: RESEARCHER_IDS_ENDPOINT,
                method: 'PATCH',
                resolver: () => ({}),
            },
        ],
    })
}
