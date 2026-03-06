import {
    applyPageToScope,
    getHiddenLinksTotal,
    mergeScopeStateWithMeta,
    scopeKeyToUid,
    toGraphScopeKey,
    toNodeScopeKey,
    toScopeState,
} from '../graphScope'

describe('graphScope utils', () => {
    it('calculates hidden links total from relationship stats', () => {
        const hiddenTotal = getHiddenLinksTotal({
            HAS_SUBSYSTEM: { total: 10, returned: 8, hasMore: true },
            IS_POWERED_BY: { total: 3, returned: 3, hasMore: false },
        })

        expect(hiddenTotal).toBe(2)
    })

    it('keeps max returned count when merging scope meta', () => {
        const previous = toScopeState({
            relationshipStats: {
                HAS_SUBSYSTEM: { total: 30, returned: 20, hasMore: true },
            },
        })

        const merged = mergeScopeStateWithMeta(previous, {
            relationshipStats: {
                HAS_SUBSYSTEM: { total: 30, returned: 10, hasMore: true },
            },
        })

        expect(merged.relationshipStats.HAS_SUBSYSTEM.returned).toBe(20)
        expect(merged.relationshipStats.HAS_SUBSYSTEM.hasMore).toBe(true)
    })

    it('applies page update and keeps hidden total in sync', () => {
        const next = applyPageToScope(undefined, {
            type: 'IS_COOLED_BY',
            offset: 20,
            limit: 10,
            returned: 10,
            total: 40,
            hasMore: true,
        })

        expect(next.relationshipStats.IS_COOLED_BY.returned).toBe(30)
        expect(next.hiddenLinksTotal).toBe(10)
    })

    it('round-trips graph and node scope keys', () => {
        expect(toGraphScopeKey('abc')).toBe('graph:abc')
        expect(scopeKeyToUid('graph:abc')).toBe('abc')

        expect(toNodeScopeKey('xyz')).toBe('node:xyz')
        expect(scopeKeyToUid('node:xyz')).toBe('xyz')
    })

    it('normalizes empty graph scope keys to unknown', () => {
        expect(toGraphScopeKey('')).toBe('graph:unknown')
        expect(scopeKeyToUid('graph:')).toBeNull()
        expect(scopeKeyToUid('graph:unknown')).toBeNull()
    })
})
