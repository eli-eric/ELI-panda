import '@xyflow/react/dist/style.css'

import {
    Background,
    type Edge,
    type EdgeTypes,
    type Node,
    type NodeTypes,
    ReactFlow,
    type ReactFlowInstance,
    useNodesInitialized,
    useReactFlow,
} from '@xyflow/react'
import { useTheme } from 'next-themes'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

interface RelationshipGraphComponentProps {
    nodes: Node[]
    edges: Edge[]
    isLoading: boolean
    isRefreshing?: boolean
    isRelationshipFilterActive?: boolean
    onInit?: (instance: ReactFlowInstance) => void
    onNodeClick?: (event: React.MouseEvent, node: Node) => void
    onEdgeClick?: (event: React.MouseEvent, edge: Edge) => void
    nodeTypes?: NodeTypes
    edgeTypes?: EdgeTypes
    fitViewVersion?: number
    children?: React.ReactNode
}

const FitViewController: FC<{ version?: number }> = ({ version = 0 }) => {
    const { fitView } = useReactFlow()
    const nodesInitialized = useNodesInitialized()

    useEffect(() => {
        if (!nodesInitialized) return
        fitView({ padding: 0.2 })
    }, [version, nodesInitialized, fitView])

    return null
}

export const RelationshipGraphComponent: FC<RelationshipGraphComponentProps> = ({
    nodes,
    edges,
    isLoading,
    isRefreshing = false,
    isRelationshipFilterActive = false,
    onInit,
    onNodeClick,
    onEdgeClick,
    nodeTypes,
    edgeTypes,
    fitViewVersion,
    children,
}) => {
    const { formatMessage: fm } = useIntl()
    const { resolvedTheme } = useTheme()
    const loadingText = `${fm({ id: message.systemHierarchy.graph.title })}...`
    const refreshingText = fm({ id: message.systemHierarchy.graph.updating })
    const emptyText = isRelationshipFilterActive
        ? fm({ id: message.systemHierarchy.graph.noConnectedNodes })
        : fm({ id: message.systemHierarchy.graph.noNodes })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="text-muted-foreground text-sm animate-pulse">{loadingText}</div>
            </div>
        )
    }

    if (nodes.length === 0) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="text-muted-foreground text-sm">{emptyText}</div>
            </div>
        )
    }

    return (
        <div className="h-full w-full relative" data-testid="relationship-graph">
            {isRefreshing && (
                <div className="absolute top-3 right-3 z-20 rounded-md border border-border bg-background/95 px-2 py-1 text-[11px] text-muted-foreground shadow-sm">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        {refreshingText}
                    </span>
                </div>
            )}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onInit={onInit}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                colorMode={resolvedTheme === 'dark' ? 'dark' : 'light'}
                fitView
                minZoom={0.1}
                maxZoom={2}
            >
                <FitViewController version={fitViewVersion} />
                <Background />
                {children}
            </ReactFlow>
        </div>
    )
}
