import type { RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'
import { RELATIONSHIP_TYPES } from '../types/graph'

const ALLOWED_RELATIONSHIP_TYPES = new Set<string>(Object.values(RELATIONSHIP_TYPES))

export interface GraphFilterState {
    search: string
    systemLevels: string[]
    systemType: string | null
    relationshipTypes: string[]
}

export const DEFAULT_GRAPH_FILTERS: GraphFilterState = {
    search: '',
    systemLevels: [],
    systemType: null,
    relationshipTypes: [],
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
        if (filters.systemLevels.length > 0 && !filters.systemLevels.includes(node.systemLevel))
            return false
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
        // Only show allowed relationship types
        if (!ALLOWED_RELATIONSHIP_TYPES.has(edge.relationship)) return false
        if (!visibleNodeUids.has(edge.source) || !visibleNodeUids.has(edge.target)) return false
        if (
            filters.relationshipTypes.length > 0 &&
            !filters.relationshipTypes.includes(edge.relationship)
        )
            return false
        return true
    })
}
