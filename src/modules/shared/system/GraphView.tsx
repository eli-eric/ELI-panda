import {
  drag,
  forceCenter,
  ForceLink,
  forceLink,
  forceManyBody,
  forceSimulation,
  select,
  zoom
} from 'd3'
import type { FC, PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'

import { MinusButton, PlusButton, StatsButton } from '@/components/Buttons'

import type { RenderStatsProps } from './GraphModal'
import type { GraphNode, SystemGraphResponse } from './types'

interface Props {
  data: SystemGraphResponse
  renderStats: (props: RenderStatsProps) => JSX.Element | null
}

const GraphView: FC<PropsWithChildren<Props>> = ({ data, renderStats }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const zoomRef = useRef<any>(null)

  const [openStats, setOpenStats] = useState(false)
  const [selectedNode, setSelectedNode] = useState<GraphNode>(data.nodes[0])

  useEffect(() => {
    const svg = select(svgRef.current) // Select the SVG element using D3
    const width = svg.node()?.clientWidth || 800 // Get SVG width, or default to 800
    const height = svg.node()?.clientHeight || 600 // Get SVG height, or default to 600

    const circleRadius = 10 // Define the radius of the node circle

    // Append arrow markers to the SVG (only once)
    svg.select('defs').remove() // Remove any existing defs (definitions) to avoid duplication
    svg
      .append('defs') // Add definitions (defs) to SVG
      .append('marker') // Add a marker for arrowheads
      .attr('id', 'arrowhead') // Set an ID for referencing the arrowhead marker
      .attr('viewBox', '0 -5 10 10') // Define the viewbox for the arrow shape
      .attr('refX', 17) // Position of the arrowhead relative to the node boundary
      .attr('refY', 0) // Vertically center the arrowhead
      .attr('markerWidth', 6) // Define the width of the arrowhead
      .attr('markerHeight', 6) // Define the height of the arrowhead
      .attr('orient', 'auto') // Automatically orient the arrowhead
      .append('path') // Create the arrowhead path (triangle shape)
      .attr('d', 'M 0,-5 L 10,0 L 0,5') // Define the path for the arrowhead shape
      .attr('fill', '#ccc') // Set arrowhead color to gray

    // Set up zoom
    const zoomHandler = zoom().on('zoom', event => {
      // On zoom event, apply the zoom transformation to the <g> group containing graph elements
      svg.select('g').attr('transform', event.transform)
    })
    svg.call(zoomHandler as any) // Apply zoom functionality to the SVG

    zoomRef.current = zoomHandler // Store the zoom handler reference for buttons

    // Create a group to contain graph elements (so we can zoom/pan the entire group)
    let g: d3.Selection<SVGGElement, unknown, null, undefined> = svg.select('g')
    if (g.empty()) {
      g = svg.append('g') // If no group exists, create one
    }

    // Convert IDs to node objects
    const nodeMap = new Map(data.nodes.map(node => [node.uid, node])) // Create a map of nodes by their uid

    // Map the links data to use node objects instead of IDs
    const links = data.links.map(link => ({
      ...link,
      source: nodeMap.get(link.source) as GraphNode, // Convert source ID to node object
      target: nodeMap.get(link.target) as GraphNode // Convert target ID to node object
    }))

    // Set up the simulation
    const simulation = forceSimulation<GraphNode>() // Create the force simulation
      .force(
        'link', // Add a force for links
        forceLink<GraphNode, any>()
          .id(d => d.uid) // Set the id accessor to uid
          .distance(100) // Set the link distance (space between connected nodes)
      )
      .force('charge', forceManyBody().strength(-300)) // Add a repulsion force (negative charge pushes nodes apart)
      .force('center', forceCenter(width / 2, height / 2)) // Center the graph on the SVG

    // Add the links (lines) between nodes with arrow markers
    const link = g
      .selectAll('line') // Select all existing lines
      .data(links) // Bind the link data
      .join('line') // Enter, update, and remove lines as needed
      .attr('stroke', '#ccc') // Set the stroke color to gray
      .attr('stroke-width', 2) // Set the stroke width
      .attr('marker-end', 'url(#arrowhead)') // Add the arrow marker to the end of the line

    // Add the node circles
    const node = g
      .selectAll('circle') // Select all existing circles
      .data(data.nodes) // Bind the node data
      .join('circle') // Enter, update, and remove circles as needed
      .attr('r', circleRadius) // Set the radius of each circle
      .attr('fill', '#69b3a2') // Set the fill color of the circles
      .call(
        drag<SVGCircleElement, GraphNode>() // Enable dragging for the nodes
          .on('start', dragstarted) // Define the behavior on drag start
          .on('drag', dragged) // Define the behavior while dragging
          .on('end', dragended) as any // Define the behavior on drag end
      )

    // Add labels to the nodes
    const nodeLabels = g
      .selectAll('text.node-label') // Select all existing text labels for nodes
      .data(data.nodes) // Bind the node data
      .join('text') // Enter, update, and remove text labels as needed
      .attr('class', 'node-label') // Add class for styling
      .attr('x', d => d.x ?? 0) // Set the x-position of the label based on node x
      .attr('y', d => (d.y ?? 0) - circleRadius - 5) // Set the y-position above the node circle
      .attr('text-anchor', 'middle') // Center the text horizontally
      .text(d => d.name) // Set the text content to the node's name
      .style('font-size', '12px') // Set the font size
      .style('fill', '#000') // Set the font color

    // Add relationship labels to the links
    const relationshipLabels = g
      .selectAll('text.relationship') // Select all existing text labels for relationships
      .data(links) // Bind the link data
      .join('text') // Enter, update, and remove text labels as needed
      .attr('class', 'relationship') // Add class for styling
      .attr('x', d => ((d.source?.x ?? 0) + (d.target?.x ?? 0)) / 2) // Set x-position at the midpoint of the link
      .attr('y', d => ((d.source?.y ?? 0) + (d.target?.y ?? 0)) / 2) // Set y-position at the midpoint of the link
      .attr('dy', -10) // Offset the text vertically
      .attr('text-anchor', 'middle') // Center the text horizontally
      .text(d => d.relationship) // Set the text content to the relationship type
      .style('font-size', '10px') // Set the font size
      .style('fill', '#666') // Set the font color

    // Update simulation nodes and links on every tick
    simulation.nodes(data.nodes).on('tick', ticked) // Update positions on each tick
    ;(simulation.force('link') as ForceLink<GraphNode, any>)?.links(links) // Update the simulation with the links

    function ticked() {
      // Update link positions as the simulation progresses
      link
        .attr('x1', d => d.source?.x ?? 0) // Set the x1 position for the link source
        .attr('y1', d => d.source?.y ?? 0) // Set the y1 position for the link source
        .attr('x2', d => d.target?.x ?? 0) // Set the x2 position for the link target
        .attr('y2', d => d.target?.y ?? 0) // Set the y2 position for the link target

      // Update node positions as the simulation progresses
      node.attr('cx', d => d.x ?? 0).attr('cy', d => d.y ?? 0) // Set the x and y positions for the nodes

      // Update node label positions as the simulation progresses
      nodeLabels
        .attr('x', d => d.x ?? 0) // Update the x position of the label
        .attr('y', d => (d.y ?? 0) - circleRadius - 5) // Update the y position of the label

      // Update relationship label positions as the simulation progresses
      relationshipLabels
        .attr('x', d => ((d.source?.x ?? 0) + (d.target?.x ?? 0)) / 2) // Update the x position of the relationship label
        .attr('y', d => ((d.source?.y ?? 0) + (d.target?.y ?? 0)) / 2) // Update the y position of the relationship label
    }

    // Define what happens when dragging starts
    function dragstarted(this: SVGCircleElement, event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart() // Restart the simulation if not already active
      select(this).raise().attr('stroke', 'black') // Raise the dragged node and change its stroke color
      d.fx = d.x // Fix the node's x position
      d.fy = d.y // Fix the node's y position
    }

    // Define what happens while dragging
    function dragged(event: any, d: GraphNode) {
      d.fx = event.x // Update the node's fixed x position to the drag event's x
      d.fy = event.y // Update the node's fixed y position to the drag event's y
    }

    // Define what happens when dragging ends
    function dragended(this: SVGCircleElement, event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0) // Lower the simulation's alpha target when dragging ends
      select(this).attr('stroke', null) // Remove the stroke color
      d.fx = d.x // Keep the node fixed at the current x position
      d.fy = d.y // Keep the node fixed at the current y position
    }
  }, [data])

  // Function to zoom in by scaling up the graph
  const zoomIn = () => {
    zoomRef.current.scaleBy(select(svgRef.current), 1.2) // Increase scale by 20%
  }

  // Function to zoom out by scaling down the graph
  const zoomOut = () => {
    zoomRef.current.scaleBy(select(svgRef.current), 0.8) // Decrease scale by 20%
  }

  const handleOpenStats = () => setOpenStats(!openStats)

  return (
    <div className="">
      <div className="mb-2 flex justify-between">
        <div>
          <MinusButton onClick={zoomOut} />
          <PlusButton onClick={zoomIn} className="mr-2" />
        </div>
        <StatsButton onClick={handleOpenStats} />
      </div>
      <div className="flex">
        <svg
          ref={svgRef}
          className="w-full border rounded-md"
          height="600"
        ></svg>
        {renderStats({ open: openStats })}
      </div>
    </div>
  )
}

export default GraphView
