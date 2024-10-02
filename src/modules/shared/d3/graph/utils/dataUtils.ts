import type { GraphNode, SystemGraphResponse } from '../types'

export function prepareGraphData(data: SystemGraphResponse) {
  const nodeMap = new Map(data.nodes.map(node => [node.uid, node]))
  const links = data.links.map(link => ({
    ...link,
    source: nodeMap.get(link.source) as GraphNode,
    target: nodeMap.get(link.target) as GraphNode
  }))
  return { nodes: data.nodes, links }
}
