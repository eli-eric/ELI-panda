import type { Query } from '@tanstack/react-query'

import { RELATIONSHIP_GRAPH_QUERY_KEY, SYSTEM_DETAIL_QUERY_KEY } from './queryKeys'

// Matches a TanStack Query whose data could be affected by a spare mutation on
// the given uids. Covers:
//  - explicit keys: [SYSTEM_DETAIL_QUERY_KEY, uid], [RELATIONSHIP_GRAPH_QUERY_KEY, ...]
//  - useGraphQL default keys: [opName, variables, document] — scans variables (position [1])
//    for either uid, catching { where: { uid } }, { where: { physicalItem: { uid } } }, etc.
export const matchesSpareAffectedQuery =
    (uids: ReadonlyArray<string>) =>
    (q: Query): boolean => {
        const key = q.queryKey as unknown[]
        if (key[0] === RELATIONSHIP_GRAPH_QUERY_KEY) return true
        if (key[0] === SYSTEM_DETAIL_QUERY_KEY) {
            return uids.some(uid => key.includes(uid))
        }
        const variables = key[1]
        if (variables && typeof variables === 'object') {
            const json = JSON.stringify(variables)
            return uids.some(uid => json.includes(uid))
        }
        return false
    }
