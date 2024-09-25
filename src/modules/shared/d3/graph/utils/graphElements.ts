// graphElements.ts
import type { D3DragEvent, Selection } from 'd3'
import { drag, select } from 'd3'

import { truncateString } from '@/utils'

import type { GraphNode } from '../types'
import { getNodeColor } from './index'

export function addGraphLinks(
  g: Selection<SVGGElement, unknown, null, undefined>,
  links: any[]
) {
  const link = g
    .selectAll<SVGPathElement, any>('path')
    .data(links)
    .join('path')
    .attr('stroke', '#ccc')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('marker-end', 'url(#arrowhead)')
    .style('cursor', 'pointer')

  return link
}

export function addGraphNodes(
  g: Selection<SVGGElement, unknown, null, undefined>,
  nodes: GraphNode[],
  circleRadius: number,
  dragstarted: (
    event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
    d: GraphNode
  ) => void,
  dragged: (
    event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
    d: GraphNode
  ) => void,
  dragended: (
    event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
    d: GraphNode
  ) => void
) {
  const node = g
    .selectAll<SVGCircleElement, GraphNode>('circle')
    .data(nodes)
    .join('circle')
    .attr('r', circleRadius)
    .attr('fill', d => getNodeColor(d.label || ''))
    .attr('data-uid', d => d.uid)
    .style('cursor', 'pointer')
    .attr('class', 'node')
    .attr('role', 'button')
    .attr('aria-label', d => `Node ${d.name}`)
    .call(
      drag<SVGCircleElement, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    )

  return node
}

export function addNodeLabels(
  g: Selection<SVGGElement, unknown, null, undefined>,
  nodes: GraphNode[],
  circleRadius: number,
  setSelectedNode: (node: GraphNode) => void,
  node: Selection<SVGCircleElement, GraphNode, SVGGElement, unknown>
) {
  const nodeLabels = g
    .selectAll<SVGTextElement, GraphNode>('text.node-label')
    .data(nodes)
    .join('text')
    .attr('class', 'node-label')
    .attr('text-anchor', 'middle')
    .text(d => truncateString(d.name || d.label, 10))
    .style('font-size', '12px')
    .style('fill', '#000')
    .style('cursor', 'pointer')

  nodeLabels.on('click', function (event, d) {
    setSelectedNode(d)
    node.attr('stroke', null)

    select(`circle[data-uid='${d.uid}']`)
      .attr('stroke', 'orange')
      .attr('stroke-width', 3)
  })

  return nodeLabels
}

export function addRelationshipLabels(
  g: Selection<SVGGElement, unknown, null, undefined>,
  links: any[],
  link: Selection<SVGPathElement, any, SVGGElement, unknown>
) {
  const relationshipLabels = g
    .selectAll<SVGTextElement, any>('text.relationship')
    .data(links)
    .join('text')
    .attr('class', 'relationship')
    .attr('dy', -10)
    .attr('text-anchor', 'middle')
    .text(d => d.relationship)
    .style('font-size', '10px')
    .style('fill', '#666')
    .style('cursor', 'pointer')

  relationshipLabels.on('click', function (event, d) {
    link
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)')
    relationshipLabels.style('fill', '#666')

    // Highlight corresponding link
    link
      .filter(linkData => linkData === d)
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead-highlight)')

    // Highlight clicked label
    select(this).style('fill', 'orange')
  })

  return relationshipLabels
}
