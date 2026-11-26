import type { QueryClient } from '@tanstack/react-query'

import { SYSTEM_CAN_EDIT_QUERY_KEY } from '@/modules/shared/system/edit-permission'
import {
    HIERARCHY_QUERY_KEY,
    LEAVES_COUNT_QUERY_KEY,
    LEAVES_QUERY_KEY,
    RELATIONSHIP_GRAPH_QUERY_KEY,
    SYSTEM_CODES_QUERY_KEY,
    SYSTEM_HISTORY_QUERY_KEY,
    SYSTEM_SPARE_PARTS_QUERY_KEY,
    SYSTEMS_TABLE_QUERY_KEY,
} from '@/utils/query/queryKeys'

import { getSystemDetailQueryKey } from '../hooks/queries/useSystemDetail'
import type { SystemDetail } from '../types'

// Fields rendered by the explorer tree / graph nodes (name, code, level badge).
const TREE_FIELDS: ReadonlySet<string> = new Set([
    'name',
    'systemCode',
    'systemLevel',
    'systemType',
])
// Changing these may revoke or grant the user's own responsibility.
const RESPONSIBILITY_FIELDS: ReadonlySet<string> = new Set(['responsible', 'responsibleTeam'])

const touchesAny = (fields: readonly string[], set: ReadonlySet<string>) =>
    fields.some(field => set.has(field))

/**
 * Applies a successful system write: the response is the fresh detail (incl. the new
 * concurrency token), so it replaces the cache entry directly; the views that render
 * a projection of the same system are invalidated (only active ones refetch).
 */
export const refreshAfterSystemWrite = (
    queryClient: QueryClient,
    detail: SystemDetail,
    changedFields: readonly string[],
) => {
    queryClient.setQueryData(getSystemDetailQueryKey(detail.uid), detail)
    void queryClient.invalidateQueries({
        queryKey: [SYSTEM_HISTORY_QUERY_KEY, { uid: detail.uid }],
    })
    void queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
    void queryClient.invalidateQueries({ queryKey: [SYSTEMS_TABLE_QUERY_KEY] })
    void queryClient.invalidateQueries({ queryKey: [SYSTEM_CODES_QUERY_KEY] })

    if (touchesAny(changedFields, TREE_FIELDS)) {
        void queryClient.invalidateQueries({ queryKey: [HIERARCHY_QUERY_KEY] })
        void queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
    }
    if (touchesAny(changedFields, RESPONSIBILITY_FIELDS)) {
        void queryClient.invalidateQueries({ queryKey: [SYSTEM_CAN_EDIT_QUERY_KEY] })
    }
    if (changedFields.includes('minimalSpareParstCount')) {
        void queryClient.invalidateQueries({
            queryKey: [SYSTEM_SPARE_PARTS_QUERY_KEY, { uid: detail.uid }],
        })
    }
}

/** After structural changes (create / delete / copy / move) every tree-shaped view is stale. */
export const refreshSystemStructure = (queryClient: QueryClient) => {
    void queryClient.invalidateQueries({ queryKey: [HIERARCHY_QUERY_KEY] })
    void queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
    void queryClient.invalidateQueries({ queryKey: [LEAVES_COUNT_QUERY_KEY] })
    void queryClient.invalidateQueries({ queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY] })
    void queryClient.invalidateQueries({ queryKey: [SYSTEMS_TABLE_QUERY_KEY] })
}
