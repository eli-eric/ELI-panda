import type { CatalogueCategoryTreeNode } from '../../types'
import { collectAllNodeUids, filterTree, nodeMatchesSearch } from '../treeSearch'

const node = (
    uid: string,
    overrides: Partial<CatalogueCategoryTreeNode> = {},
): CatalogueCategoryTreeNode => ({
    uid,
    name: overrides.name ?? uid,
    code: overrides.code ?? uid,
    miniImageUrl: null,
    systemType: null,
    parentCategory: overrides.parentCategory ?? null,
    itemCount: 0,
    children: overrides.children ?? [],
})

describe('nodeMatchesSearch', () => {
    it('returns false for empty search', () => {
        expect(nodeMatchesSearch(node('a', { name: 'Alpha' }), '')).toBe(false)
    })

    it('matches on name case-insensitively', () => {
        expect(nodeMatchesSearch(node('a', { name: 'Alpha Gear' }), 'gear')).toBe(true)
    })

    it('matches on code case-insensitively', () => {
        expect(nodeMatchesSearch(node('a', { name: 'X', code: 'CODE-99' }), 'code')).toBe(true)
    })

    it('returns false when neither name nor code match', () => {
        expect(nodeMatchesSearch(node('a', { name: 'X', code: 'Y' }), 'z')).toBe(false)
    })
})

describe('filterTree', () => {
    it('returns original tree when search is empty', () => {
        const tree = [node('a')]
        expect(filterTree(tree, '')).toBe(tree)
    })

    it('keeps ancestor path for matching descendant', () => {
        const tree = [
            node('a', {
                name: 'Root',
                children: [
                    node('b', {
                        name: 'Mid',
                        children: [node('c', { name: 'Widget' })],
                    }),
                ],
            }),
        ]
        const filtered = filterTree(tree, 'widget')
        expect(filtered).toHaveLength(1)
        expect(filtered[0].uid).toBe('a')
        expect(filtered[0].children[0].uid).toBe('b')
        expect(filtered[0].children[0].children[0].uid).toBe('c')
    })

    it('drops subtrees with no match', () => {
        const tree = [
            node('a', { name: 'Root', children: [node('b', { name: 'NoMatch' })] }),
            node('c', { name: 'Widget' }),
        ]
        const filtered = filterTree(tree, 'widget')
        expect(filtered.map(n => n.uid)).toEqual(['c'])
    })
})

describe('collectAllNodeUids', () => {
    it('returns all uids recursively', () => {
        const tree = [node('a', { children: [node('b', { children: [node('c')] })] }), node('d')]
        expect(collectAllNodeUids(tree).sort()).toEqual(['a', 'b', 'c', 'd'])
    })
})
