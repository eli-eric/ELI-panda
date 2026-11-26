import type { QueryClient } from '@tanstack/react-query'

import type { SystemLevel } from '@/types/constants/systemLevel'

import { getSystemDetailQueryKey } from '../hooks/queries/useSystemDetail'
import type { ParentPathEntry, SystemDetail } from '../types'

export interface OptimisticSystemHint {
    name: string
    systemCode?: string | null
    systemLevel?: SystemLevel | null
    parentPath?: ParentPathEntry[]
}

const buildPlaceholderDetail = (uid: string, hint: OptimisticSystemHint): SystemDetail => ({
    uid,
    name: hint.name,
    description: null,
    systemCode: hint.systemCode ?? null,
    systemAlias: null,
    systemLevel: hint.systemLevel ?? null,
    lastUpdateTime: null,
    parentUid: hint.parentPath?.at(-1)?.uid ?? null,
    parentPath: hint.parentPath ?? [],
    systemType: null,
    location: null,
    zone: null,
    importance: null,
    attribute: null,
    responsible: null,
    responsibleTeam: null,
    owner: null,
    operators: [],
    maintainedBy: [],
    miniImageUrl: null,
    minimalSpareParstCount: null,
    sparePartsCoverageSum: null,
    sp_coverage: null,
    physicalItem: null,
    statistics: {
        subsystemsCount: 0,
        directSubsystemsCount: 0,
        sparePartsCount: 0,
        sparesForCount: 0,
        minimalSpareParstCount: null,
        sparePartsCoverageSum: null,
        sp_coverage: null,
    },
})

/**
 * Seeds a complete-but-empty SystemDetail from what the tree/table row already knows
 * so the breadcrumb renders instantly on navigation. Written with `updatedAt: 0` —
 * the entry is stale from birth, so the mounting `useSystemDetail` fetches the real
 * payload right away. Never overwrites an existing entry (it may be the real one).
 */
export const primeSystemDetailCache = (
    queryClient: QueryClient,
    uid: string,
    hint: OptimisticSystemHint,
) => {
    const key = getSystemDetailQueryKey(uid)
    if (queryClient.getQueryData(key)) return
    queryClient.setQueryData(key, buildPlaceholderDetail(uid, hint), { updatedAt: 0 })
}
