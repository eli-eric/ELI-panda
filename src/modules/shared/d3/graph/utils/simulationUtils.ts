import type { ForceLink, Simulation } from 'd3'
import { forceCenter, forceLink, forceManyBody, forceSimulation } from 'd3'

import type { GraphNode } from '../types'

export function initializeForceSimulation(
    nodes: GraphNode[],
    links: any[],
    width: number,
    height: number,
    onTick: () => void,
): Simulation<GraphNode, undefined> {
    const simulation = forceSimulation<GraphNode>()
        .force(
            'link',
            forceLink<GraphNode, any>()
                .id(d => d.uid)
                .distance(100),
        )
        .force('charge', forceManyBody().strength(-300))
        .force('center', forceCenter(width / 2, height / 2))

    simulation.nodes(nodes).on('tick', onTick)
    ;(simulation.force('link') as ForceLink<GraphNode, any>)?.links(links)
    return simulation
}
