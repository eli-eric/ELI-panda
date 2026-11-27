import type { Query } from '@tanstack/react-query'

import { RELATIONSHIP_GRAPH_QUERY_KEY } from './queryKeys'

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
// the given uids: anything in the relationship graph, plus every query whose key
// params (second slot) reference one of the uids — `[SYSTEM_DETAIL_QUERY_KEY, { uid }]`,
// `[SYSTEM_SPARE_PARTS_QUERY_KEY, { uid }]`, and the legacy useGraphQL keys
// `[opName, variables, document]` (variables walked structurally, document skipped).
export const matchesSpareAffectedQuery =
    (uids: ReadonlyArray<string>) =>
    (q: Query): boolean => {
        const [head, params] = q.queryKey as unknown[]
        if (head === RELATIONSHIP_GRAPH_QUERY_KEY) return true
        return containsAnyString(params, new Set(uids))
    }
