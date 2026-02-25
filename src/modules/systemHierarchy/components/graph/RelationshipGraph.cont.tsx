import type { Edge, Node, ReactFlowInstance } from '@xyflow/react'
import { Controls, MiniMap, ReactFlowProvider } from '@xyflow/react'
import { type FC, useCallback, useMemo, useRef, useState } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useDeleteRelationship } from '../../hooks/mutations/useDeleteRelationship'
import { useRelationshipGraph } from '../../hooks/queries/useRelationshipGraph'
import { useGraphFilters } from '../../hooks/useGraphFilters'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { useHierarchyStore } from '../../store/useHierarchyStore'
import type { GraphLayoutMode } from '../../types/graph'
import { GRAPH_LAYOUT_MODES } from '../../types/graph'
import { filterEdges, filterNodes } from '../../utils/graphFilters'
import { applyForceLayout, applyHierarchicalLayout } from '../../utils/graphLayout'
import { toReactFlowEdges, toReactFlowNodes } from '../../utils/graphTransformers'
import { CreateRelationshipModalContainer } from './CreateRelationshipModal.cont'
import { EdgeDetailSheet } from './EdgeDetailSheet.comp'
import { GraphLegend } from './GraphLegend.comp'
import { GraphToolbar } from './GraphToolbar.comp'
import { LayoutSwitcher } from './LayoutSwitcher.comp'
import { NodeDetailSheet } from './NodeDetailSheet.comp'
import { RelationshipEdge } from './RelationshipEdge.comp'
import { RelationshipGraphComponent } from './RelationshipGraph.comp'
import { SystemNode } from './SystemNode.comp'

// Define nodeTypes/edgeTypes outside component to prevent re-renders
const nodeTypes = { systemNode: SystemNode }
const edgeTypes = { relationshipEdge: RelationshipEdge }

export const RelationshipGraphContainer: FC = () => {
    const { selectedParentUid } = useHierarchyNavigation()
    const { graphLayoutMode, setGraphLayoutMode } = useHierarchyStore()
    const [layoutMode, setLayoutMode] = useState<GraphLayoutMode>(graphLayoutMode)
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedNodes, setSelectedNodes] = useState<string[]>([])
    const rfInstance = useRef<ReactFlowInstance | null>(null)

    const { openModal, closeModal } = useDynamicModalStore()
    const { deleteRelationship } = useDeleteRelationship()

    // generalGraph API requires a system uid — use selectedParentUid or selectedLeafUid
    const graphUid = selectedParentUid
    const { nodes: apiNodes, edges: apiEdges, isLoading } = useRelationshipGraph({
        systemUid: graphUid,
    })

    const {
        filters,
        setSearch,
        toggleSystemLevel,
        setSystemType,
        toggleRelationshipType,
        resetFilters,
    } = useGraphFilters()

    // Apply filters
    const filteredNodes = useMemo(() => filterNodes(apiNodes, filters), [apiNodes, filters])
    const visibleNodeUids = useMemo(() => new Set(filteredNodes.map(n => n.uid)), [filteredNodes])
    const filteredEdges = useMemo(
        () => filterEdges(apiEdges, visibleNodeUids, filters),
        [apiEdges, visibleNodeUids, filters],
    )

    // Transform to ReactFlow format
    const rawNodes = useMemo(() => toReactFlowNodes(filteredNodes), [filteredNodes])
    const rfEdges = useMemo(() => toReactFlowEdges(filteredEdges), [filteredEdges])

    // Apply layout
    const rfNodes = useMemo(() => {
        if (layoutMode === GRAPH_LAYOUT_MODES.HIERARCHY) {
            return applyHierarchicalLayout(rawNodes, rfEdges)
        }
        return applyForceLayout(rawNodes, rfEdges)
    }, [rawNodes, rfEdges, layoutMode])

    // Apply selection highlighting
    const nodesWithSelection = useMemo(() => {
        if (!selectionMode || selectedNodes.length === 0) return rfNodes
        return rfNodes.map(n => ({
            ...n,
            data: {
                ...n.data,
                selected: selectedNodes.includes(n.id),
                selectionIndex: selectedNodes.indexOf(n.id),
            },
        }))
    }, [rfNodes, selectionMode, selectedNodes])

    // Extract unique values for filter dropdowns
    const systemTypes = useMemo(
        () => [...new Set(apiNodes.map(n => n.systemType?.name).filter(Boolean))] as string[],
        [apiNodes],
    )
    const systemLevels = useMemo(
        () => [...new Set(apiNodes.map(n => n.systemLevel))] as string[],
        [apiNodes],
    )
    const handleInit = useCallback((instance: ReactFlowInstance) => {
        rfInstance.current = instance
        setTimeout(() => instance.fitView({ padding: 0.2 }), 100)
    }, [])

    const handleLayoutChange = useCallback(
        (mode: GraphLayoutMode) => {
            setLayoutMode(mode)
            setGraphLayoutMode(mode)
            setTimeout(() => rfInstance.current?.fitView({ padding: 0.2 }), 100)
        },
        [setGraphLayoutMode],
    )

    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            if (selectionMode) {
                setSelectedNodes(prev => {
                    if (prev.includes(node.id)) return prev.filter(id => id !== node.id)
                    if (prev.length >= 2) return [prev[1], node.id]
                    const next = [...prev, node.id]
                    if (next.length === 2) {
                        setTimeout(() => {
                            const sourceNode = apiNodes.find(n => n.uid === next[0])
                            const targetNode = apiNodes.find(n => n.uid === next[1])
                            if (!sourceNode || !targetNode) return
                            const modalId = openModal('dialog', {
                                id: 'create-relationship',
                                component: CreateRelationshipModalContainer,
                                props: {
                                    sourceNode,
                                    targetNode,
                                    title: 'Create Relationship',
                                    onClose: () => {
                                        closeModal(modalId)
                                        setSelectedNodes([])
                                    },
                                },
                            })
                        }, 0)
                    }
                    return next
                })
                return
            }

            const apiNode = apiNodes.find(n => n.uid === node.id)
            if (!apiNode) return

            openModal('sheet', {
                id: `node-detail-${node.id}`,
                component: NodeDetailSheet,
                props: {
                    node: apiNode,
                    side: 'right',
                },
            })
        },
        [selectionMode, apiNodes, openModal, closeModal],
    )

    const handleEdgeClick = useCallback(
        (_event: React.MouseEvent, edge: Edge) => {
            const apiEdge = apiEdges.find(e => e.uid === edge.id)
            if (!apiEdge) return

            const sourceNode = apiNodes.find(n => n.uid === apiEdge.source)
            const targetNode = apiNodes.find(n => n.uid === apiEdge.target)

            openModal('sheet', {
                id: `edge-detail-${edge.id}`,
                component: EdgeDetailSheet,
                props: {
                    edge: apiEdge,
                    sourceName: sourceNode?.name ?? apiEdge.source,
                    targetName: targetNode?.name ?? apiEdge.target,
                    onDelete: deleteRelationship,
                    side: 'right',
                },
            })
        },
        [apiEdges, apiNodes, openModal, deleteRelationship],
    )

    const toggleSelectionMode = useCallback(() => {
        setSelectionMode(prev => !prev)
        setSelectedNodes([])
    }, [])

    return (
        <div className="h-full w-full flex flex-col">
            <GraphToolbar
                filters={filters}
                onSearchChange={setSearch}
                onToggleSystemLevel={toggleSystemLevel}
                onSystemTypeChange={setSystemType}
                onToggleRelationshipType={toggleRelationshipType}
                onResetFilters={resetFilters}
                systemTypes={systemTypes}
                systemLevels={systemLevels}
                selectionMode={selectionMode}
                onToggleSelectionMode={toggleSelectionMode}
            >
                <LayoutSwitcher activeLayout={layoutMode} onLayoutChange={handleLayoutChange} />
            </GraphToolbar>
            <div className="flex-1 relative">
                <ReactFlowProvider>
                    <RelationshipGraphComponent
                        nodes={nodesWithSelection}
                        edges={rfEdges}
                        isLoading={isLoading}
                        onInit={handleInit}
                        onNodeClick={handleNodeClick}
                        onEdgeClick={handleEdgeClick}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                    >
                        <Controls />
                        <MiniMap
                            nodeStrokeWidth={3}
                            className="!bg-background !border-border"
                        />
                    </RelationshipGraphComponent>
                </ReactFlowProvider>
                <GraphLegend />
            </div>
        </div>
    )
}
