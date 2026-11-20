import type { Query } from '@tanstack/react-query'

import { RELATIONSHIP_GRAPH_QUERY_KEY, SYSTEM_DETAIL_QUERY_KEY } from './queryKeys'

// Strict-equality walk over a nested value. Early-exits on first match.
// Used instead of `JSON.stringify(...).includes(uid)` to avoid substring
// collisions (a catalogue number / EUN / free-text filter that happens to
// contain a uid as a substring).
const containsAnyString = (value: unknown, needles: ReadonlySet<string>): boolean => {
    if (typeof value === 'string') return needles.has(value)
    if (Array.isArray(value)) {
        for (const v of value) {
            if (containsAnyString(v, needles)) return true
        }
        return false
    }
    if (value && typeof value === 'object') {
        for (const v of Object.values(value)) {
            if (containsAnyString(v, needles)) return true
        }
    }
    return false
}

// Matches a TanStack Query whose data could be affected by a spare mutation on
// the given uids. Covers:
//  - explicit keys: [SYSTEM_DETAIL_QUERY_KEY, uid], [RELATIONSHIP_GRAPH_QUERY_KEY, ...]
//  - useGraphQL default keys: [opName, variables, document] — walks `variables`
//    structurally to find any string value equal to one of the uids.
export const matchesSpareAffectedQuery =
    (uids: ReadonlyArray<string>) =>
    (q: Query): boolean => {
        const key = q.queryKey as unknown[]
        if (key[0] === RELATIONSHIP_GRAPH_QUERY_KEY) return true
        const needles = new Set(uids)
        if (key[0] === SYSTEM_DETAIL_QUERY_KEY) {
            return key.some(part => typeof part === 'string' && needles.has(part))
        }
        const variables = key[1]
        if (variables && typeof variables === 'object') {
            return containsAnyString(variables, needles)
        }
        return false
    }
