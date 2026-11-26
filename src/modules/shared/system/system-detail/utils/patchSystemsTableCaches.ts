import type { Query, QueryClient } from '@tanstack/react-query'

import type { CodebookType } from '@/types/responses/codebook'
import type {
    SystemDetail as SystemsTableRow,
    SystemsResponse,
} from '@/types/responses/systems'
import { SYSTEMS_TABLE_QUERY_KEY } from '@/utils/query/queryKeys'

import type { SystemDetail } from '../types'

// The systems overview lazily merges expanded subsystems into its list cache
// (useSubsystems → addSubsystems). Refetching that list drops them and breaks the open
// tree, so system writes patch the cached rows in place instead of invalidating.

const SUBSYSTEMS_QUERY_KEY = 'subsystems'

const toCodebook = (value: { uid: string; name: string; code?: string | null } | null) =>
    value ? ({ uid: value.uid, name: value.name, code: value.code ?? undefined } as CodebookType) : undefined

/** Projects the REST detail onto the fields the overview row renders. */
export const toSystemsTableRowPatch = (detail: SystemDetail): Partial<SystemsTableRow> => ({
    name: detail.name,
    systemCode: detail.systemCode ?? undefined,
    systemLevel: detail.systemLevel ?? undefined,
    description: detail.description ?? undefined,
    systemType: toCodebook(detail.systemType),
    location: toCodebook(detail.location),
    zone: toCodebook(detail.zone),
    importance: toCodebook(detail.importance),
    attribute: toCodebook(detail.attribute),
    responsible: toCodebook(detail.responsible),
})

const patchPhysicalItem = (
    row: SystemsTableRow,
    detail: SystemDetail,
): SystemsTableRow['physicalItem'] => {
    const item = detail.physicalItem
    if (!item || !row.physicalItem) return row.physicalItem
    return {
        ...row.physicalItem,
        serialNumber: item.serialNumber ?? undefined,
        notes: item.notes ?? undefined,
        itemUsage: toCodebook(item.itemUsage),
        conditionStatus: toCodebook(item.conditionStatus),
    }
}

/** Replaces the row with `detail.uid` anywhere in the (sub)tree; same reference when absent. */
export const patchSystemRows = (
    rows: SystemsTableRow[],
    detail: SystemDetail,
): SystemsTableRow[] => {
    let changed = false
    const next = rows.map(row => {
        if (row.uid === detail.uid) {
            changed = true
            return {
                ...row,
                ...toSystemsTableRowPatch(detail),
                physicalItem: patchPhysicalItem(row, detail),
                statistics: row.statistics && {
                    ...row.statistics,
                    minimalSpareParstCount: detail.minimalSpareParstCount ?? undefined,
                    sp_coverage: detail.sp_coverage ?? undefined,
                },
            }
        }
        if (!row.subSystems?.length) return row
        const subSystems = patchSystemRows(row.subSystems, detail)
        if (subSystems === row.subSystems) return row
        changed = true
        return { ...row, subSystems }
    })
    return changed ? next : rows
}

const isSystemsResponse = (data: unknown): data is SystemsResponse =>
    !!data && Array.isArray((data as SystemsResponse).data)

const isSystemsTableQuery = (query: Query) => query.queryKey[0] === SYSTEMS_TABLE_QUERY_KEY

/** Patches every cached systems table + subsystems list containing the written system. */
export const patchSystemsTableCaches = (queryClient: QueryClient, detail: SystemDetail) => {
    queryClient.setQueriesData<SystemsResponse>({ predicate: isSystemsTableQuery }, prev => {
        if (!isSystemsResponse(prev)) return prev
        const data = patchSystemRows(prev.data, detail)
        return data === prev.data ? prev : { ...prev, data }
    })
    queryClient.setQueriesData<SystemsTableRow[]>({ queryKey: [SUBSYSTEMS_QUERY_KEY] }, prev =>
        Array.isArray(prev) ? patchSystemRows(prev, detail) : prev,
    )
}

const toNewRow = (detail: SystemDetail): SystemsTableRow => ({
    uid: detail.uid,
    ...toSystemsTableRowPatch(detail),
    name: detail.name,
    parentUid: detail.parentUid ?? undefined,
    hasSubsystems: false,
    subSystems: [],
})

const insertUnderParent = (
    rows: SystemsTableRow[],
    parentUid: string,
    row: SystemsTableRow,
): SystemsTableRow[] =>
    rows.map(item => {
        if (item.uid === parentUid) {
            // only append when the parent's children are already loaded (expanded);
            // otherwise the next expand fetches them including the new one
            return {
                ...item,
                hasSubsystems: true,
                subSystems: item.subSystems?.length ? [...item.subSystems, row] : item.subSystems,
            }
        }
        return item.subSystems?.length
            ? { ...item, subSystems: insertUnderParent(item.subSystems, parentUid, row) }
            : item
    })

/** Adds a newly created system to cached systems tables without refetching them. */
export const insertIntoSystemsTableCaches = (queryClient: QueryClient, detail: SystemDetail) => {
    const row = toNewRow(detail)
    queryClient.setQueriesData<SystemsResponse>({ predicate: isSystemsTableQuery }, prev => {
        if (!isSystemsResponse(prev)) return prev
        if (detail.parentUid) {
            return { ...prev, data: insertUnderParent(prev.data, detail.parentUid, row) }
        }
        return { ...prev, data: [row, ...prev.data], totalCount: prev.totalCount + 1 }
    })
}
