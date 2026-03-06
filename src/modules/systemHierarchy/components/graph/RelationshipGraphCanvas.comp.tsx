import type { Edge, Node } from '@xyflow/react'
import { Controls, MiniMap, ReactFlowProvider } from '@xyflow/react'
import type { FC } from 'react'
import type { MouseEvent } from 'react'

import { GraphLegend } from './GraphLegend.comp'
import { RelationshipEdge } from './RelationshipEdge.comp'
import { RelationshipGraphComponent } from './RelationshipGraph.comp'
import type { RelationshipLoadMoreRow } from './RelationshipLoadMorePanel.comp'
import { RelationshipLoadMorePanel } from './RelationshipLoadMorePanel.comp'
import { SystemNode } from './SystemNode.comp'

const nodeTypes = { systemNode: SystemNode }
const edgeTypes = { relationshipEdge: RelationshipEdge }

interface RelationshipGraphCanvasProps {
    nodes: Node[]
    edges: Edge[]
    isLoading: boolean
    isRefreshing: boolean
    isRelationshipFilterActive: boolean
    fitViewVersion: number
    hiddenTotal: number
    rows: RelationshipLoadMoreRow[]
    showBackToGraph: boolean
    onBackToGraph: () => void
    onLoadMore: (type: string) => void
    onNodeClick: (event: MouseEvent, node: Node) => void
    onEdgeClick: (event: MouseEvent, edge: Edge) => void
}

export const RelationshipGraphCanvas: FC<RelationshipGraphCanvasProps> = ({
    nodes,
    edges,
    isLoading,
    isRefreshing,
    isRelationshipFilterActive,
    fitViewVersion,
    hiddenTotal,
    rows,
    showBackToGraph,
    onBackToGraph,
    onLoadMore,
    onNodeClick,
    onEdgeClick,
}) => (
    <div className="flex-1 relative">
        <ReactFlowProvider>
            <RelationshipGraphComponent
                nodes={nodes}
                edges={edges}
                isLoading={isLoading}
                isRefreshing={isRefreshing}
                isRelationshipFilterActive={isRelationshipFilterActive}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitViewVersion={fitViewVersion}
            >
                <Controls />
                <MiniMap nodeStrokeWidth={3} className="!bg-background !border-border" />
            </RelationshipGraphComponent>
        </ReactFlowProvider>
        <RelationshipLoadMorePanel
            hiddenTotal={hiddenTotal}
            rows={rows}
            showBackToGraph={showBackToGraph}
            onBackToGraph={onBackToGraph}
            onLoadMore={onLoadMore}
        />
        <GraphLegend />
    </div>
)
