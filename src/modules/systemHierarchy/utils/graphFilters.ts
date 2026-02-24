import type { RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'

export interface GraphFilterState {
    search: string
    systemLevel: string | null
    systemType: string | null
    relationshipType: string | null
}

export const DEFAULT_GRAPH_FILTERS: GraphFilterState = {
    search: '',
    systemLevel: null,
    systemType: null,
    relationshipType: null,
}

export const filterNodes = (
    nodes: RelationshipGraphNode[],
    filters: GraphFilterState,
): RelationshipGraphNode[] => {
    return nodes.filter(node => {
        if (filters.search) {
            const term = filters.search.toLowerCase()
            const matchesName = node.name.toLowerCase().includes(term)
            const matchesCode = node.systemCode?.toLowerCase().includes(term) ?? false
            if (!matchesName && !matchesCode) return false
        }
        if (filters.systemLevel && node.systemLevel !== filters.systemLevel) return false
        if (filters.systemType && node.systemType?.name !== filters.systemType) return false
        return true
    })
}

export const filterEdges = (
    edges: RelationshipGraphEdge[],
    visibleNodeUids: Set<string>,
    filters: GraphFilterState,
): RelationshipGraphEdge[] => {
    return edges.filter(edge => {
        if (!visibleNodeUids.has(edge.source) || !visibleNodeUids.has(edge.target)) return false
        if (filters.relationshipType && edge.relationship !== filters.relationshipType) return false
        return true
    })
}
