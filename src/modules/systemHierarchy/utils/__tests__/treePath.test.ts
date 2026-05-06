import { SystemLevel } from '@/types/gql/graphql'

import type { HierarchyNode } from '../../types'
import { findHierarchyPath } from '../treePath'

const node = (uid: string, name: string, children: HierarchyNode[] = []): HierarchyNode => ({
    uid,
    name,
    systemCode: null,
    systemLevel: SystemLevel.KeySystems,
    hasLeafChildren: false,
    children,
})

describe('findHierarchyPath', () => {
    const tree: HierarchyNode[] = [
        node('r1', 'Root1', [
            node('a', 'A', [node('b', 'B', [node('c', 'C')])]),
            node('d', 'D'),
        ]),
        node('r2', 'Root2'),
    ]

    it('returns empty array when uid is not found', () => {
        expect(findHierarchyPath(tree, 'missing')).toEqual([])
    })

    it('returns single-element path for a root node', () => {
        const path = findHierarchyPath(tree, 'r2')
        expect(path.map(n => n.uid)).toEqual(['r2'])
    })

    it('returns full root-to-target path for a deeply nested node', () => {
        const path = findHierarchyPath(tree, 'c')
        expect(path.map(n => n.uid)).toEqual(['r1', 'a', 'b', 'c'])
    })

    it('returns short branch when target is mid-tree', () => {
        const path = findHierarchyPath(tree, 'd')
        expect(path.map(n => n.uid)).toEqual(['r1', 'd'])
    })
})
