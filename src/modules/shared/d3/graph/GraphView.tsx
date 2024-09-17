import type { D3DragEvent, ForceLink, ZoomBehavior } from 'd3'
import {
  drag,
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
  zoom
} from 'd3'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  FilterButton,
  MinusButton,
  PlusButton,
  StatsButton
} from '@/components/Buttons'
import { classNames } from '@/utils'

import type { GraphNode, SystemGraphResponse } from './types'
import { getNodeColor } from './utils'

interface Props {
  data: SystemGraphResponse

  renderFilter: (props: { open: boolean }) => JSX.Element | null
  renderStats: (props: {
    open: boolean
    selectedNode: GraphNode | null
  }) => JSX.Element | null
}

const GraphView: FC<PropsWithChildren<Props>> = ({
  data,
  renderStats,
  renderFilter
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null) // Updated type
  const circleRadius = 10

  const [openStats, setOpenStats] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)

  // Event handlers wrapped with useCallback
  const zoomIn = useCallback(() => {
    if (svgRef.current && zoomRef.current) {
      const svg = select<SVGSVGElement, unknown>(svgRef.current)
      zoomRef.current.scaleBy(svg, 1.2)
    }
  }, [])

  const zoomOut = useCallback(() => {
    if (svgRef.current && zoomRef.current) {
      const svg = select<SVGSVGElement, unknown>(svgRef.current)
      zoomRef.current.scaleBy(svg, 0.8)
    }
  }, [])

  const handleOpenStats = useCallback(() => {
    setOpenStats(prev => !prev)
    setOpenFilter(false)
  }, [])

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(prev => !prev)
    setOpenStats(false)
  }, [])

  // Drag event handlers
  const dragstarted = useCallback(
    (
      event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
      d: GraphNode
    ) => {
      if (!event.active) simulationRef.current?.alphaTarget(0.3).restart()
      setSelectedNode(d)

      nodeSelectionRef.current?.attr('stroke', null)
      select(event.sourceEvent.currentTarget)
        .attr('stroke', 'orange')
        .attr('stroke-width', 3)

      d.fx = d.x
      d.fy = d.y
    },
    []
  )

  const dragged = useCallback(
    (
      event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
      d: GraphNode
    ) => {
      d.fx = event.x
      d.fy = event.y
    },
    []
  )

  const dragended = useCallback(
    (
      event: D3DragEvent<SVGCircleElement, GraphNode, unknown>,
      d: GraphNode
    ) => {
      if (!event.active) simulationRef.current?.alphaTarget(0)
      d.fx = d.x
      d.fy = d.y
    },
    []
  )

  const simulationRef = useRef<d3.Simulation<GraphNode, undefined> | null>(null)
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

  useEffect(() => {
    if (!data || !data.nodes || !data.links) {
      console.error('Invalid data provided to GraphView component.')
      return
    }

    const svgElement = svgRef.current
    if (!svgElement) return

    // Ensure svg is correctly typed
    const svg = select<SVGSVGElement, unknown>(svgElement)
    const width = svg.node()?.clientWidth || 800
    const height = svg.node()?.clientHeight || 600

    svg.select('defs').remove()
    const defs = svg.append('defs')

    // Define arrow markers
    defs
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 17)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', '#ccc')

    defs
      .append('marker')
      .attr('id', 'arrowhead-highlight')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', circleRadius + 7)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', 'orange')

    // Initialize zoom behavior with updated generic type
    const zoomHandler = zoom<SVGSVGElement, unknown>().on('zoom', event => {
      svg.select('g').attr('transform', event.transform)
    })
    svg.call(zoomHandler)
    zoomRef.current = zoomHandler

    // Create or select the group element
    let g = svg.select<SVGGElement>('g')
    if (g.empty()) {
      g = svg.append('g')
    }

    // Map nodes and links
    const nodeMap = new Map(data.nodes.map(node => [node.uid, node]))
    const links = data.links.map(link => ({
      ...link,
      source: nodeMap.get(link.source) as GraphNode,
      target: nodeMap.get(link.target) as GraphNode
    }))

    // Initialize force simulation
    const simulation = forceSimulation<GraphNode>()
      .force(
        'link',
        forceLink<GraphNode, any>()
          .id(d => d.uid)
          .distance(100)
      )
      .force('charge', forceManyBody().strength(-300))
      .force('center', forceCenter(width / 2, height / 2))

    simulationRef.current = simulation

    // Add links
    const link = g
      .selectAll<SVGPathElement, any>('path')
      .data(links)
      .join('path')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .attr('marker-end', 'url(#arrowhead)')
      .style('cursor', 'pointer')
      .attr('class', 'link') // Tailwind CSS class can be applied here

    linkSelectionRef.current = link

    link.on('click', function (event, d) {
      // Reset styles
      link
        .attr('stroke', '#ccc')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)')
      relationshipLabels.style('fill', '#666')

      // Highlight clicked link
      select(this)
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead-highlight)')

      // Highlight corresponding label
      relationshipLabels.filter(label => label === d).style('fill', 'orange')
    })

    // Add nodes
    const node = g
      .selectAll<SVGCircleElement, GraphNode>('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', circleRadius)
      .attr('fill', d => getNodeColor(d.label || ''))
      .attr('data-uid', d => d.uid)
      .style('cursor', 'pointer')
      .attr('class', 'node') // Tailwind CSS class can be applied here
      .attr('role', 'button') // Accessibility
      .attr('aria-label', d => `Node ${d.name}`)
      .call(
        drag<SVGCircleElement, GraphNode>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      )

    nodeSelectionRef.current = node

    // Add node labels
    const nodeLabels = g
      .selectAll<SVGTextElement, GraphNode>('text.node-label')
      .data(data.nodes)
      .join('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .text(d => d.name || d.label || '')
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

    // Add relationship labels
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

    relationshipLabelsRef.current = relationshipLabels

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

    // Start simulation
    simulation.nodes(data.nodes).on('tick', ticked)
    ;(simulation.force('link') as ForceLink<GraphNode, any>)?.links(links)

    function ticked() {
      // Update link positions
      link.attr('d', d => {
        const dx = (d.target?.x ?? 0) - (d.source?.x ?? 0)
        const dy = (d.target?.y ?? 0) - (d.source?.y ?? 0)

        const { totalLinks, linkIndex } = getLinkMetrics(d)

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
          const { labelOffset } = getLinkMetrics(d)
          return ((d.source?.x ?? 0) + (d.target?.x ?? 0)) / 2 + labelOffset
        })
        .attr('y', d => {
          const { labelOffset } = getLinkMetrics(d)
          return ((d.source?.y ?? 0) + (d.target?.y ?? 0)) / 2 + labelOffset
        })
    }

    // Helper function to compute link metrics
    const getLinkMetrics = (d: any) => {
      const totalLinks = links.filter(
        l =>
          (l.source === d.source && l.target === d.target) ||
          (l.source === d.target && l.target === d.source)
      ).length

      const linkIndex = links
        .filter(
          l =>
            (l.source === d.source && l.target === d.target) ||
            (l.source === d.target && l.target === d.source)
        )
        .indexOf(d)

      const labelOffset =
        totalLinks > 1 ? (linkIndex - (totalLinks - 1) / 2) * 20 : 0

      return { totalLinks, linkIndex, labelOffset }
    }

    // Cleanup function
    return () => {
      simulation.stop()
      svg.selectAll('*').remove()
    }
  }, [data, dragstarted, dragged, dragended])

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <div className="flex gap-x-1">
          <FilterButton onClick={handleOpenFilter} />
          <MinusButton onClick={zoomOut} />
          <PlusButton onClick={zoomIn} />
        </div>
        <StatsButton onClick={handleOpenStats} disabled={!selectedNode} />
      </div>
      <div className="grid grid-cols-12 gap-x-2">
        {renderFilter({ open: openFilter })}
        <svg
          ref={svgRef}
          className={classNames(
            'w-full border rounded-md',
            openStats ? 'col-span-7' : openFilter ? 'col-span-8' : 'col-span-12'
          )}
          height="600"
        ></svg>
        {renderStats({ open: openStats, selectedNode })}
      </div>
    </div>
  )
}

export default GraphView
