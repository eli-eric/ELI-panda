import type { HierarchyNode } from '../types'

/**
 * Checks if a node matches the search term (in name or systemCode)
 */
export const nodeMatchesSearch = (node: HierarchyNode, search: string): boolean => {
    if (!search) return false
    const lowerSearch = search.toLowerCase()
    const nameMatch = node.name.toLowerCase().includes(lowerSearch)
    const codeMatch = node.systemCode?.toLowerCase().includes(lowerSearch) ?? false
    return nameMatch || codeMatch
}

/**
 * Filters tree to show only matching nodes and their ancestors.
 * Preserves hierarchy structure - parents are kept to show the path to matches.
 * Returns new filtered tree (does not mutate original).
 */
export const filterTree = (nodes: HierarchyNode[], search: string): HierarchyNode[] => {
    if (!search) return nodes

    const filterNode = (node: HierarchyNode): HierarchyNode | null => {
        const filteredChildren = node.children
            .map(child => filterNode(child))
            .filter((child): child is HierarchyNode => child !== null)

        const selfMatches = nodeMatchesSearch(node, search)

        if (selfMatches || filteredChildren.length > 0) {
            return {
                ...node,
                children: filteredChildren,
            }
        }

        return null
    }

    return nodes
        .map(node => filterNode(node))
        .filter((node): node is HierarchyNode => node !== null)
}

/**
 * Collects all node UIDs from the tree (for expanding all filtered nodes)
 */
export const collectAllNodeUids = (nodes: HierarchyNode[]): string[] => {
    const uids: string[] = []

    const traverse = (nodeList: HierarchyNode[]) => {
        for (const node of nodeList) {
            uids.push(node.uid)
            if (node.children.length > 0) {
                traverse(node.children)
            }
        }
    }

    traverse(nodes)
    return uids
}
