import type { Query } from '@tanstack/react-query'

import { RELATIONSHIP_GRAPH_QUERY_KEY, SYSTEM_DETAIL_QUERY_KEY } from '../queryKeys'
import { matchesSpareAffectedQuery } from '../spareInvalidationPredicate'

const SYS_A = 'sys-uid-aaaa-1111'
const SYS_B = 'sys-uid-bbbb-2222'
const SPARE = 'spare-uid-cccc-3333'
const UNRELATED = 'unrelated-uid-9999'

const asQuery = (queryKey: unknown[]): Query => ({ queryKey } as unknown as Query)

describe('matchesSpareAffectedQuery', () => {
    const predicate = matchesSpareAffectedQuery([SYS_A, SPARE])

    it('matches RELATIONSHIP_GRAPH_QUERY_KEY regardless of uid', () => {
        expect(predicate(asQuery([RELATIONSHIP_GRAPH_QUERY_KEY]))).toBe(true)
        expect(predicate(asQuery([RELATIONSHIP_GRAPH_QUERY_KEY, 'anything']))).toBe(true)
    })

    it('matches SYSTEM_DETAIL_QUERY_KEY when the key contains one of the uids', () => {
        expect(predicate(asQuery([SYSTEM_DETAIL_QUERY_KEY, SYS_A]))).toBe(true)
        expect(predicate(asQuery([SYSTEM_DETAIL_QUERY_KEY, SPARE]))).toBe(true)
    })

    it('skips SYSTEM_DETAIL_QUERY_KEY when the key does not contain any uid', () => {
        expect(predicate(asQuery([SYSTEM_DETAIL_QUERY_KEY, SYS_B]))).toBe(false)
        expect(predicate(asQuery([SYSTEM_DETAIL_QUERY_KEY, UNRELATED]))).toBe(false)
    })

    it('matches useGraphQL default keys when variables contain a uid (flat)', () => {
        const key = ['SystemDetail', { where: { deleted: false, uid: SYS_A } }, {}]
        expect(predicate(asQuery(key))).toBe(true)
    })

    it('matches useGraphQL default keys when variables contain a uid (nested)', () => {
        const key = [
            'SystemDetail',
            { where: { physicalItem: { uid: SPARE } } },
            {},
        ]
        expect(predicate(asQuery(key))).toBe(true)
    })

    it('does not match useGraphQL keys with unrelated uids', () => {
        const key = ['SystemDetail', { where: { uid: UNRELATED } }, {}]
        expect(predicate(asQuery(key))).toBe(false)
    })

    it('does not match when variables is missing or non-object', () => {
        expect(predicate(asQuery(['some-key']))).toBe(false)
        expect(predicate(asQuery(['some-key', null]))).toBe(false)
        expect(predicate(asQuery(['some-key', 'not-an-object']))).toBe(false)
    })

    it('does not collide on substring match (uid as part of an unrelated string)', () => {
        // Old JSON.stringify(...).includes(uid) would have matched these.
        const key1 = [
            'SystemDetail',
            { where: { catalogueNumber: `CAT-${SYS_A}-PUMP` } },
            {},
        ]
        const key2 = ['SystemDetail', { where: { search: `notes about ${SPARE} here` } }, {}]
        expect(predicate(asQuery(key1))).toBe(false)
        expect(predicate(asQuery(key2))).toBe(false)
    })

    it('matches uid inside arrays of strings', () => {
        const key = ['SystemDetail', { where: { uid_IN: ['x', SYS_A, 'y'] } }, {}]
        expect(predicate(asQuery(key))).toBe(true)
    })

    it('returns a fresh predicate per uid list', () => {
        const matchA = matchesSpareAffectedQuery([SYS_A])
        const matchB = matchesSpareAffectedQuery([SYS_B])
        const key = [SYSTEM_DETAIL_QUERY_KEY, SYS_A]
        expect(matchA(asQuery(key))).toBe(true)
        expect(matchB(asQuery(key))).toBe(false)
    })
})
