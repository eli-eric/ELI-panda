import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3'

export interface GraphNode extends SimulationNodeDatum {
    uid: string
    name: string
    label?: string
    properties: Record<string, string>
}

export interface GraphLink extends SimulationLinkDatum<GraphNode> {
    uid?: string
    source: string
    target: string
    relationship: string
}

export interface SystemGraphRelationshipStat {
    total: number
    returned: number
    hasMore: boolean
}

export interface SystemGraphMeta {
    relationshipStats?: Record<string, SystemGraphRelationshipStat>
    hiddenLinksTotal?: number
}

export interface SystemGraphPage {
    type: string
    offset: number
    limit: number
    returned: number
    total: number
    hasMore: boolean
}

export type SystemGraphResponse = {
    nodes: GraphNode[]
    links: GraphLink[]
    meta?: SystemGraphMeta
    page?: SystemGraphPage
}

export type RenderStatsProps = {
    open: boolean
    selectedNode: GraphNode | null
}
