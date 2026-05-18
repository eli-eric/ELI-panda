import type { HierarchyNode } from '../../types'
import { collectAllNodeUids, filterTree, nodeMatchesSearch } from '../treeSearch'

const makeNode = (
    uid: string,
    name: string,
    children: HierarchyNode[] = [],
    systemCode?: string,
): HierarchyNode =>
    ({
        uid,
        name,
        systemCode,
        children,
    }) as HierarchyNode

describe('nodeMatchesSearch', () => {
    it('returns false for empty search', () => {
        expect(nodeMatchesSearch(makeNode('1', 'Pump'), '')).toBe(false)
    })

    it('matches by name (case-insensitive)', () => {
        expect(nodeMatchesSearch(makeNode('1', 'Cooling Pump'), 'pump')).toBe(true)
        expect(nodeMatchesSearch(makeNode('1', 'Cooling Pump'), 'PUMP')).toBe(true)
    })

    it('matches by systemCode (case-insensitive)', () => {
        expect(nodeMatchesSearch(makeNode('1', 'X', [], 'SYS-001'), 'sys-001')).toBe(true)
    })

    it('falls back to false when systemCode is missing', () => {
        expect(nodeMatchesSearch(makeNode('1', 'X'), 'sys')).toBe(false)
    })

    it('returns false when neither name nor code match', () => {
        expect(nodeMatchesSearch(makeNode('1', 'foo', [], 'BAR'), 'baz')).toBe(false)
    })
})

describe('filterTree', () => {
    it('empty search returns original list reference (no filtering)', () => {
        const tree = [makeNode('1', 'Pump')]
        expect(filterTree(tree, '')).toBe(tree)
    })

    it('keeps matching leaf only', () => {
        const tree = [
            makeNode('1', 'Pump'),
            makeNode('2', 'Valve'),
        ]
        const filtered = filterTree(tree, 'pump')
        expect(filtered.map(n => n.uid)).toEqual(['1'])
    })

    it('keeps ancestors of matching descendant', () => {
        const tree = [
            makeNode('root', 'Top', [
                makeNode('mid', 'Mid', [
                    makeNode('leaf', 'TARGET'),
                    makeNode('sibling', 'Sibling'),
                ]),
            ]),
        ]
        const filtered = filterTree(tree, 'target')
        expect(filtered[0].uid).toBe('root')
        expect(filtered[0].children[0].uid).toBe('mid')
        expect(filtered[0].children[0].children.map(c => c.uid)).toEqual(['leaf'])
    })

    it('drops branches with no match', () => {
        const tree = [
            makeNode('a', 'A', [makeNode('b', 'B')]),
            makeNode('match', 'matching'),
        ]
        expect(filterTree(tree, 'matching').map(n => n.uid)).toEqual(['match'])
    })

    it('does not mutate the original tree', () => {
        const leaf = makeNode('leaf', 'X')
        const tree = [makeNode('root', 'Root', [leaf, makeNode('keep', 'keep')])]
        filterTree(tree, 'keep')
        expect(tree[0].children.map(c => c.uid)).toEqual(['leaf', 'keep'])
    })
})

describe('collectAllNodeUids', () => {
    it('flattens uids in pre-order', () => {
        const tree = [
            makeNode('1', 'a', [makeNode('1a', 'a1'), makeNode('1b', 'a2')]),
            makeNode('2', 'b'),
        ]
        expect(collectAllNodeUids(tree)).toEqual(['1', '1a', '1b', '2'])
    })

    it('empty input returns empty array', () => {
        expect(collectAllNodeUids([])).toEqual([])
    })
})
