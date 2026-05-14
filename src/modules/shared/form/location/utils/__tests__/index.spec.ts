import { updateLocationWithSublocation } from '../index'

type TreeNode = { uid: string; name: string; code?: string; children?: TreeNode[] }

const node = (uid: string, children?: TreeNode[]): TreeNode => ({
    uid,
    name: `loc-${uid}`,
    code: uid,
    children,
})

describe('updateLocationWithSublocation', () => {
    const subLocations = [
        { name: 'Sub-1', code: 'S1', uid: 's1', subLocations: [] },
        { name: 'Sub-2', code: 'S2', uid: 's2', subLocations: [{} as any] },
    ] as any

    it('replaces children of matching node and flags isExpandable from subLocations length', () => {
        const tree = [node('a'), node('b')]
        const out = updateLocationWithSublocation(tree, subLocations, 'a')
        const updated = out[0] as any
        expect(updated.children).toEqual([
            { name: 'Sub-1', code: 'S1', uid: 's1', isExpandable: false },
            { name: 'Sub-2', code: 'S2', uid: 's2', isExpandable: true },
        ])
        // sibling untouched
        expect(out[1]).toMatchObject({ uid: 'b' })
        expect((out[1] as any).children).toBeUndefined()
    })

    it('recurses into nested children when uid not found at root', () => {
        const tree = [node('a', [node('a1', [node('a1a')])])]
        const out = updateLocationWithSublocation(tree, subLocations, 'a1a')
        const a1a = (out[0] as any).children[0].children[0]
        expect(a1a.children).toHaveLength(2)
        expect(a1a.children[0].isExpandable).toBe(false)
    })

    it('returns node as-is if no match anywhere', () => {
        const tree = [node('a')]
        const out = updateLocationWithSublocation(tree, subLocations, 'nope')
        expect(out).toEqual(tree)
    })
})
