import '@xyflow/react/dist/style.css'

import {
    Background,
    type Edge,
    type Node,
    ReactFlow,
    type ReactFlowInstance,
} from '@xyflow/react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

interface RelationshipGraphComponentProps {
    nodes: Node[]
    edges: Edge[]
    isLoading: boolean
    onInit?: (instance: ReactFlowInstance) => void
    onNodeClick?: (event: React.MouseEvent, node: Node) => void
    onEdgeClick?: (event: React.MouseEvent, edge: Edge) => void
    nodeTypes?: Record<string, FC<any>>
    edgeTypes?: Record<string, FC<any>>
    children?: React.ReactNode
}

export const RelationshipGraphComponent: FC<RelationshipGraphComponentProps> = ({
    nodes,
    edges,
    isLoading,
    onInit,
    onNodeClick,
    onEdgeClick,
    nodeTypes,
    edgeTypes,
    children,
}) => {
    const { formatMessage: fm } = useIntl()
    const loadingText = `${fm({ id: message.systemHierarchy.graph.title })}...`

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="text-muted-foreground text-sm animate-pulse">
                    {loadingText}
                </div>
            </div>
        )
    }

    if (nodes.length === 0) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="text-muted-foreground text-sm">
                    {fm({ id: message.systemHierarchy.graph.noNodes })}
                </div>
            </div>
        )
    }

    return (
        <div className="h-full w-full" data-testid="relationship-graph">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onInit={onInit}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                minZoom={0.1}
                maxZoom={2}
            >
                <Background />
                {children}
            </ReactFlow>
        </div>
    )
}
