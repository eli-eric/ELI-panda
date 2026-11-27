import type { CatalogueCategoryFlat } from '../../types'
import { buildCategoryTree } from '../buildCategoryTree'

const makeNode = (
    overrides: Partial<CatalogueCategoryFlat> & { uid: string },
): CatalogueCategoryFlat => ({
    uid: overrides.uid,
    name: overrides.name ?? overrides.uid,
    code: overrides.code ?? overrides.uid,
    miniImageUrl: overrides.miniImageUrl ?? null,
    systemType: overrides.systemType ?? null,
    parentCategory: overrides.parentCategory ?? null,
    itemCount: overrides.itemCount ?? 0,
})

describe('buildCategoryTree', () => {
    it('returns empty array for empty input', () => {
        expect(buildCategoryTree([])).toEqual([])
    })

    it('treats a node without parentCategory as a root', () => {
        const flat = [makeNode({ uid: 'a', name: 'Alpha' })]
        const tree = buildCategoryTree(flat)
        expect(tree).toHaveLength(1)
        expect(tree[0]).toMatchObject({ uid: 'a', name: 'Alpha', children: [] })
    })

    it('nests a node under its parent via parentCategory.uid', () => {
        const flat = [
            makeNode({ uid: 'a', name: 'Alpha' }),
            makeNode({ uid: 'b', name: 'Beta', parentCategory: { uid: 'a' } }),
        ]
        const tree = buildCategoryTree(flat)
        expect(tree).toHaveLength(1)
        expect(tree[0].uid).toBe('a')
        expect(tree[0].children).toHaveLength(1)
        expect(tree[0].children[0].uid).toBe('b')
    })

    it('sorts siblings alphabetically by name', () => {
        const flat = [
            makeNode({ uid: 'root' }),
            makeNode({ uid: 'c', name: 'Charlie', parentCategory: { uid: 'root' } }),
            makeNode({ uid: 'a', name: 'Alpha', parentCategory: { uid: 'root' } }),
            makeNode({ uid: 'b', name: 'Beta', parentCategory: { uid: 'root' } }),
        ]
        const tree = buildCategoryTree(flat)
        expect(tree[0].children.map(c => c.name)).toEqual(['Alpha', 'Beta', 'Charlie'])
    })

    it('nests deep hierarchies recursively', () => {
        const flat = [
            makeNode({ uid: 'a' }),
            makeNode({ uid: 'b', parentCategory: { uid: 'a' } }),
            makeNode({ uid: 'c', parentCategory: { uid: 'b' } }),
            makeNode({ uid: 'd', parentCategory: { uid: 'c' } }),
        ]
        const tree = buildCategoryTree(flat)
        expect(tree[0].children[0].children[0].children[0].uid).toBe('d')
    })

    it('treats a node with a missing parent as a root (orphan)', () => {
        const flat = [makeNode({ uid: 'lonely', parentCategory: { uid: 'ghost' } })]
        const tree = buildCategoryTree(flat)
        expect(tree).toHaveLength(1)
        expect(tree[0].uid).toBe('lonely')
    })

    it('does not infinitely recurse on cyclical parent chains', () => {
        const flat = [
            makeNode({ uid: 'a', parentCategory: { uid: 'b' } }),
            makeNode({ uid: 'b', parentCategory: { uid: 'a' } }),
        ]
        expect(() => buildCategoryTree(flat)).not.toThrow()
    })
})
