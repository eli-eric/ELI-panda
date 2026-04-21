import type { CatalogueCategoryTreeNode } from '../types'

export const nodeMatchesSearch = (node: CatalogueCategoryTreeNode, search: string): boolean => {
    if (!search) return false
    const lowered = search.toLowerCase()
    const nameMatch = node.name.toLowerCase().includes(lowered)
    const codeMatch = node.code.toLowerCase().includes(lowered)
    return nameMatch || codeMatch
}

export const filterTree = (
    nodes: CatalogueCategoryTreeNode[],
    search: string,
): CatalogueCategoryTreeNode[] => {
    if (!search) return nodes

    const filterNode = (node: CatalogueCategoryTreeNode): CatalogueCategoryTreeNode | null => {
        const filteredChildren = node.children
            .map(child => filterNode(child))
            .filter((child): child is CatalogueCategoryTreeNode => child !== null)

        const selfMatches = nodeMatchesSearch(node, search)
        if (selfMatches || filteredChildren.length > 0) {
            return { ...node, children: filteredChildren }
        }
        return null
    }

    return nodes.map(n => filterNode(n)).filter((n): n is CatalogueCategoryTreeNode => n !== null)
}

export const collectAllNodeUids = (nodes: CatalogueCategoryTreeNode[]): string[] => {
    const uids: string[] = []
    const traverse = (list: CatalogueCategoryTreeNode[]) => {
        for (const n of list) {
            uids.push(n.uid)
            if (n.children.length > 0) traverse(n.children)
        }
    }
    traverse(nodes)
    return uids
}
