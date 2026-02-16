import type { Page } from '@playwright/test'

import { getSystemDetailByUid, SYSTEM_HIERARCHY_MOCKS } from '../fixtures/systemHierarchy.mock'
import { setupNetworkMocks } from './network'

const HIERARCHY_ENDPOINT = /\/api\/mock-server\/systems\/hierarchy(?:\?.*)?$/
const LEAVES_ENDPOINT = /\/api\/mock-server\/system\/[^/]+\/leaves(?:\?.*)?$/
const HISTORY_ENDPOINT = /\/api\/mock-server\/system\/[^/]+\/history(?:\?.*)?$/

const extractPathParam = (pathname: string, key: 'history' | 'leaves'): string | null => {
    const regex = key === 'leaves' ? /\/system\/([^/]+)\/leaves$/ : /\/system\/([^/]+)\/history$/
    const match = pathname.match(regex)
    return match?.[1] ?? null
}

export async function setupSystemHierarchyNetworkMocks(page: Page) {
    await setupNetworkMocks(page, {
        graphQLHandlers: {
            SystemHierarchyDetail: ({ variables }) => {
                const where = variables?.where as { uid?: string } | undefined
                const system = getSystemDetailByUid(where?.uid ?? null)
                return {
                    systems: system ? [system] : [],
                }
            },
        },
        restHandlers: [
            {
                matcher: HIERARCHY_ENDPOINT,
                method: 'GET',
                resolver: () => SYSTEM_HIERARCHY_MOCKS.hierarchy,
            },
            {
                matcher: LEAVES_ENDPOINT,
                method: 'GET',
                resolver: ({ url }) => {
                    const parentUid = extractPathParam(url.pathname, 'leaves')
                    if (!parentUid) {
                        return { data: [], totalCount: 0 }
                    }
                    return (
                        SYSTEM_HIERARCHY_MOCKS.leavesByParentUid[
                            parentUid as keyof typeof SYSTEM_HIERARCHY_MOCKS.leavesByParentUid
                        ] ?? { data: [], totalCount: 0 }
                    )
                },
            },
            {
                matcher: HISTORY_ENDPOINT,
                method: 'GET',
                resolver: ({ url }) => {
                    const systemUid = extractPathParam(url.pathname, 'history')
                    if (!systemUid) {
                        return []
                    }
                    return (
                        SYSTEM_HIERARCHY_MOCKS.historyByUid[
                            systemUid as keyof typeof SYSTEM_HIERARCHY_MOCKS.historyByUid
                        ] ?? []
                    )
                },
            },
        ],
    })
}
