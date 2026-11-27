import type { CatalogueCategoryFlat, CatalogueCategoryTreeNode } from '../types'

export const buildCategoryTree = (flat: CatalogueCategoryFlat[]): CatalogueCategoryTreeNode[] => {
    const byUid = new Map<string, CatalogueCategoryTreeNode>()
    for (const node of flat) {
        byUid.set(node.uid, { ...node, children: [] })
    }

    const roots: CatalogueCategoryTreeNode[] = []
    const seen = new Set<string>()

    for (const node of flat) {
        if (seen.has(node.uid)) continue
        seen.add(node.uid)

        const tree = byUid.get(node.uid)!
        const parentUid = node.parentCategory?.uid

        if (parentUid && parentUid !== node.uid && byUid.has(parentUid)) {
            const parent = byUid.get(parentUid)!
            if (!hasAncestor(parent, node.uid, byUid)) {
                parent.children.push(tree)
                continue
            }
        }
        roots.push(tree)
    }

    const sortRecursively = (nodes: CatalogueCategoryTreeNode[]) => {
        nodes.sort((a, b) => a.name.localeCompare(b.name))
        for (const n of nodes) sortRecursively(n.children)
    }
    sortRecursively(roots)

    return roots
}

const hasAncestor = (
    node: CatalogueCategoryTreeNode,
    targetUid: string,
    byUid: Map<string, CatalogueCategoryTreeNode>,
): boolean => {
    let currentUid: string | undefined = node.uid
    const visited = new Set<string>()
    while (currentUid) {
        if (visited.has(currentUid)) return false
        visited.add(currentUid)
        if (currentUid === targetUid) return true
        const current = byUid.get(currentUid)
        const parentUid = (current as unknown as CatalogueCategoryFlat | undefined)?.parentCategory
            ?.uid
        currentUid = parentUid
    }
    return false
}
