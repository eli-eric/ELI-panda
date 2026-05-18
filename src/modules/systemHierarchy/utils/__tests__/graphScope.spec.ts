import { RELATIONSHIP_TYPES } from '../../types/graph'
import {
    applyPageToScope,
    compareRelationshipTypesByRank,
    getHiddenLinksTotal,
    isNodeScopeKey,
    mergeScopeStateWithMeta,
    scopeKeyToUid,
    toGraphScopeKey,
    toNodeScopeKey,
    toScopeState,
} from '../graphScope'

describe('graphScope', () => {
    describe('compareRelationshipTypesByRank', () => {
        it('lower rank comes first', () => {
            const sorted = [
                RELATIONSHIP_TYPES.IS_SPARE_FOR,
                RELATIONSHIP_TYPES.HAS_SUBSYSTEM,
            ].sort(compareRelationshipTypesByRank)
            // HAS_SUBSYSTEM rank=0, comes first
            expect(sorted[0]).toBe(RELATIONSHIP_TYPES.HAS_SUBSYSTEM)
        })

        it('falls back to alpha order for unknown types', () => {
            const sorted = ['ZZZ_UNKNOWN_A', 'ZZZ_UNKNOWN_B'].sort(
                compareRelationshipTypesByRank,
            )
            expect(sorted).toEqual(['ZZZ_UNKNOWN_A', 'ZZZ_UNKNOWN_B'])
        })
    })

    describe('getHiddenLinksTotal', () => {
        it('sums total-returned across stats (never negative)', () => {
            expect(
                getHiddenLinksTotal({
                    A: { total: 10, returned: 5, hasMore: true },
                    B: { total: 3, returned: 8, hasMore: false }, // negative clamped to 0
                    C: { total: 7, returned: 2, hasMore: true },
                }),
            ).toBe(5 + 0 + 5)
        })
    })

    describe('toScopeState', () => {
        it('returns empty when no meta', () => {
            expect(toScopeState()).toEqual({ relationshipStats: {}, hiddenLinksTotal: 0 })
        })

        it('builds state from meta.relationshipStats', () => {
            const result = toScopeState({
                relationshipStats: { A: { total: 5, returned: 2, hasMore: true } },
            } as any)
            expect(result.hiddenLinksTotal).toBe(3)
        })
    })

    describe('mergeScopeStateWithMeta', () => {
        it('returns new scope when previousScope undefined', () => {
            const result = mergeScopeStateWithMeta(undefined, {
                relationshipStats: { A: { total: 5, returned: 2, hasMore: true } },
            } as any)
            expect(result.relationshipStats.A.returned).toBe(2)
        })

        it('takes the max of previous and incoming returned per type', () => {
            const result = mergeScopeStateWithMeta(
                {
                    relationshipStats: { A: { total: 5, returned: 4, hasMore: true } },
                    hiddenLinksTotal: 1,
                },
                {
                    relationshipStats: { A: { total: 5, returned: 2, hasMore: true } },
                } as any,
            )
            expect(result.relationshipStats.A.returned).toBe(4)
            expect(result.relationshipStats.A.hasMore).toBe(true)
        })
    })

    describe('applyPageToScope', () => {
        it('writes new type stat from page (offset + returned)', () => {
            const result = applyPageToScope(undefined, {
                type: 'A',
                total: 20,
                offset: 5,
                returned: 5,
                hasMore: true,
            } as any)
            expect(result.relationshipStats.A.returned).toBe(10)
        })

        it('preserves max of previous and incoming returned', () => {
            const result = applyPageToScope(
                {
                    relationshipStats: { A: { total: 20, returned: 12, hasMore: true } },
                    hiddenLinksTotal: 8,
                },
                { type: 'A', total: 20, offset: 5, returned: 5, hasMore: false } as any,
            )
            expect(result.relationshipStats.A.returned).toBe(12)
        })
    })

    describe('scope key helpers', () => {
        it('toGraphScopeKey wraps uid + handles null', () => {
            expect(toGraphScopeKey('abc')).toBe('graph:abc')
            expect(toGraphScopeKey(null)).toBe('graph:unknown')
            expect(toGraphScopeKey()).toBe('graph:unknown')
        })

        it('toNodeScopeKey + isNodeScopeKey roundtrip', () => {
            const key = toNodeScopeKey('n-1')
            expect(key).toBe('node:n-1')
            expect(isNodeScopeKey(key)).toBe(true)
            expect(isNodeScopeKey('graph:x')).toBe(false)
        })

        it('scopeKeyToUid extracts uid from both prefixes', () => {
            expect(scopeKeyToUid('node:n-1')).toBe('n-1')
            expect(scopeKeyToUid('graph:g-1')).toBe('g-1')
        })

        it('scopeKeyToUid returns null for unknown graph and bad prefix', () => {
            expect(scopeKeyToUid('graph:unknown')).toBeNull()
            expect(scopeKeyToUid('graph:')).toBeNull()
            expect(scopeKeyToUid('other:x')).toBeNull()
        })
    })
})
