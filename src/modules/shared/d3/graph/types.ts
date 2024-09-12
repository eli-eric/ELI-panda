import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3'

export interface GraphNode extends SimulationNodeDatum {
  uid: string
  name: string
  label?: string
  properties: Record<string, string>
}

export interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string
  target: string
  relationship: string
}

export type SystemGraphResponse = {
  nodes: GraphNode[]
  links: GraphLink[]
}
