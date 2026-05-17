import { findHierarchyPath } from '../treePath'

const node = (uid: string, children: any[] = []) => ({
    uid,
    name: `N-${uid}`,
    children,
} as any)

describe('findHierarchyPath', () => {
    it('returns [node] for a top-level match', () => {
        const tree = [node('a'), node('b')]
        expect(findHierarchyPath(tree, 'a').map(n => n.uid)).toEqual(['a'])
    })

    it('returns full path through nested children', () => {
        const tree = [node('a', [node('b', [node('c')])])]
        expect(findHierarchyPath(tree, 'c').map(n => n.uid)).toEqual(['a', 'b', 'c'])
    })

    it('returns empty array when not found', () => {
        const tree = [node('a', [node('b')])]
        expect(findHierarchyPath(tree, 'missing')).toEqual([])
    })

    it('handles deeply nested second branch', () => {
        const tree = [
            node('a', [node('a-1'), node('a-2', [node('a-2-1')])]),
            node('b', [node('b-1')]),
        ]
        expect(findHierarchyPath(tree, 'a-2-1').map(n => n.uid)).toEqual([
            'a',
            'a-2',
            'a-2-1',
        ])
        expect(findHierarchyPath(tree, 'b-1').map(n => n.uid)).toEqual(['b', 'b-1'])
    })
})
