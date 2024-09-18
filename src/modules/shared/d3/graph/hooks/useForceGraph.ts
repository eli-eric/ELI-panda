// useForceGraph.ts
import type { D3DragEvent, Simulation, ZoomBehavior } from 'd3'
import { select } from 'd3'
import { useCallback, useEffect, useRef } from 'react'

import type { GraphNode, SystemGraphResponse } from '../types'
import { getLinkMetrics } from '../utils'
import { prepareGraphData } from '../utils/dataUtils'
import {
  addGraphLinks,
  addGraphNodes,
  addNodeLabels,
  addRelationshipLabels
} from '../utils/graphElements'
import { initializeForceSimulation } from '../utils/simulationUtils'
import {
  createOrSelectGroupElement,
  initializeZoomBehavior,
  setupSVGDefinitions
} from '../utils/svgUtils'

interface UseForceGraphProps {
  data: SystemGraphResponse
  svgRef: React.RefObject<SVGSVGElement>
  circleRadius?: number
  setSelectedNode: (node: GraphNode | null) => void
  setOpenStats: (open: boolean) => void
  setOpenFilter: (open: boolean) => void
}

export const useForceGraph = ({
  data,
  svgRef,
  circleRadius = 10,
  setSelectedNode,
  setOpenStats,
  setOpenFilter
}: UseForceGraphProps) => {
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const simulationRef = useRef<Simulation<GraphNode, undefined> | null>(null)
  const nodeSelectionRef = useRef<d3.Selection<
    SVGCircleElement,
    GraphNode,
    SVGGElement,
    unknown
  > | null>(null)
  const linkSelectionRef = useRef<d3.Selection<
    SVGPathElement,
    any,
    SVGGElement,
    unknown
  > | null>(null)
  const relationshipLabelsRef = useRef<d3.Selection<
    SVGTextElement,
    any,
    SVGGElement,
    unknown
  > | null>(null)

  // Zoom In and Zoom Out functions
  const zoomIn = useCallback(() => {
    if (svgRef.current && zoomRef.current) {
      const svg = select<SVGSVGElement, unknown>(svgRef.current)
      zoomRef.current.scaleBy(svg, 1.2)
    }
  }, [svgRef])

  const zoomOut = useCallback(() => {
    if (svgRef.current && zoomRef.current) {
      const svg = select<SVGSVGElement, unknown>(svgRef.current)
      zoomRef.current.scaleBy(svg, 0.8)
    }
  }, [svgRef])

  // Drag event handlers
  const dragstarted = (
    event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
    d: GraphNode
  ) => {
    if (!event.active) simulationRef.current?.alphaTarget(0.3).restart()
    setSelectedNode(d)
    setOpenStats(true)
    setOpenFilter(false)

    nodeSelectionRef.current?.attr('stroke', null)
    select(event.sourceEvent.currentTarget)
      .attr('stroke', 'orange')
      .attr('stroke-width', 3)

    d.fx = d.x
    d.fy = d.y
  }

  const dragged = (
    event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
    d: GraphNode
  ) => {
    d.fx = event.x
    d.fy = event.y
  }

  const dragended = (
    event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
    d: GraphNode
  ) => {
    if (!event.active) simulationRef.current?.alphaTarget(0)
    d.fx = d.x
    d.fy = d.y
  }

  useEffect(() => {
    if (!data || !data.nodes || !data.links) {
      return
    }

    const svgElement = svgRef.current
    if (!svgElement) return

    const svg = select<SVGSVGElement, unknown>(svgElement)
    const width = svg.node()?.clientWidth || 800
    const height = svg.node()?.clientHeight || 600

    // Setup SVG definitions
    setupSVGDefinitions(svg, circleRadius)

    // Initialize zoom behavior
    initializeZoomBehavior(svg, zoomRef)

    // Create or select the group element
    const g = createOrSelectGroupElement(svg)

    // Prepare graph data
    const { nodes, links } = prepareGraphData(data)

    // Initialize force simulation
    const simulation = initializeForceSimulation(
      nodes,
      links,
      width,
      height,
      ticked
    )
    simulationRef.current = simulation

    // Add links to the graph
    const link = addGraphLinks(g, links)
    linkSelectionRef.current = link

    // Add nodes to the graph
    const node = addGraphNodes(
      g,
      nodes,
      circleRadius,
      dragstarted,
      dragged,
      dragended
    )
    nodeSelectionRef.current = node

    // Add node labels
    const nodeLabels = addNodeLabels(
      g,
      nodes,
      circleRadius,
      setSelectedNode,
      node
    )

    // Add relationship labels
    const relationshipLabels = addRelationshipLabels(g, links, link)
    relationshipLabelsRef.current = relationshipLabels

    function ticked() {
      // Update link positions
      link.attr('d', d => {
        const dx = (d.target?.x ?? 0) - (d.source?.x ?? 0)
        const dy = (d.target?.y ?? 0) - (d.source?.y ?? 0)

        const { totalLinks, linkIndex } = getLinkMetrics(d, links)

        const curvature =
          totalLinks > 1 ? (linkIndex - (totalLinks - 1) / 2) * 30 : 0

        return `M${d.source?.x},${d.source?.y} Q${
          (d.source?.x ?? 0) + dx / 2 + curvature
        },${(d.source?.y ?? 0) + dy / 2 + curvature} ${d.target?.x},${
          d.target?.y
        }`
      })

      // Update node positions
      node.attr('cx', d => d.x ?? 0).attr('cy', d => d.y ?? 0)

      // Update node labels
      nodeLabels
        .attr('x', d => d.x ?? 0)
        .attr('y', d => (d.y ?? 0) - circleRadius - 5)

      // Update relationship labels
      relationshipLabels
        .attr('x', d => {
          const { labelOffset } = getLinkMetrics(d, links)
          return ((d.source?.x ?? 0) + (d.target?.x ?? 0)) / 2 + labelOffset
        })
        .attr('y', d => {
          const { labelOffset } = getLinkMetrics(d, links)
          return ((d.source?.y ?? 0) + (d.target?.y ?? 0)) / 2 + labelOffset
        })
    }

    // Cleanup function
    return () => {
      simulation.stop()
      svg.selectAll('*').remove()
    }
    // eslint-disable-next-line
  }, [data])

  return {
    zoomIn,
    zoomOut
  }
}
