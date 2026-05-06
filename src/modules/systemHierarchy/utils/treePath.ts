import type { HierarchyNode } from '../types'

export const findHierarchyPath = (
    nodes: HierarchyNode[],
    targetUid: string,
): HierarchyNode[] => {
    for (const node of nodes) {
        if (node.uid === targetUid) return [node]
        const childPath = findHierarchyPath(node.children, targetUid)
        if (childPath.length > 0) return [node, ...childPath]
    }
    return []
}
