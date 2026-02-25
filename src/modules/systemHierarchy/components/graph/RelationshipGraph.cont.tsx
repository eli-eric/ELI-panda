import { useQueryClient } from '@tanstack/react-query'
import type { Edge, Node, ReactFlowInstance } from '@xyflow/react'
import { Controls, MiniMap, ReactFlowProvider } from '@xyflow/react'
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'
import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { queryFetcher } from '@/utils/fetcher'

import { useDeleteRelationship } from '../../hooks/mutations/useDeleteRelationship'
import { useRelationshipGraph } from '../../hooks/queries/useRelationshipGraph'
import { useGraphFilters } from '../../hooks/useGraphFilters'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { useHierarchyStore } from '../../store/useHierarchyStore'
import { RELATIONSHIP_GRAPH_QUERY_KEY } from '../../types/constants'
import type { GraphLayoutMode } from '../../types/graph'
import { GRAPH_LAYOUT_MODES } from '../../types/graph'
import { filterEdges, filterNodes } from '../../utils/graphFilters'
import { applyHorizontalLayout, applyVerticalLayout } from '../../utils/graphLayout'
import {
    fromSystemGraphResponse,
    toReactFlowEdges,
    toReactFlowNodes,
} from '../../utils/graphTransformers'
import { CreateRelationshipModalContainer } from './CreateRelationshipModal.cont'
import { EdgeDetailSheet } from './EdgeDetailSheet.comp'
import { GraphLegend } from './GraphLegend.comp'
import { GraphToolbar } from './GraphToolbar.comp'
import { LayoutSwitcher } from './LayoutSwitcher.comp'
import { RelationshipEdge } from './RelationshipEdge.comp'
import { RelationshipGraphComponent } from './RelationshipGraph.comp'
import { SystemNode } from './SystemNode.comp'

// Define nodeTypes/edgeTypes outside component to prevent re-renders
const nodeTypes = { systemNode: SystemNode }
const edgeTypes = { relationshipEdge: RelationshipEdge }

export const RelationshipGraphContainer: FC = () => {
    const { selectedParentUid, selectLeaf } = useHierarchyNavigation()
    const {
        graphLayoutMode,
        setGraphLayoutMode,
        graphExpandedNodes,
        graphExpandedEdges,
        addGraphExpanded,
        resetGraphExpanded,
    } = useHierarchyStore()
    const [layoutMode, setLayoutMode] = useState<GraphLayoutMode>(graphLayoutMode)
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedNodes, setSelectedNodes] = useState<string[]>([])
    const rfInstance = useRef<ReactFlowInstance | null>(null)
    const contextMenuCloseRef = useRef(0)

    const { openModal, closeModal } = useDynamicModalStore()
    const { deleteRelationship } = useDeleteRelationship()
    const queryClient = useQueryClient()
    const openSystemEdit = useSystemEditSheet()

    // generalGraph API requires a system uid — use selectedParentUid or selectedLeafUid
    const graphUid = selectedParentUid
    const { nodes: apiNodes, edges: apiEdges, isLoading } = useRelationshipGraph({
        systemUid: graphUid,
    })

    // Merge API data with expanded subgraph data
    const mergedNodes = useMemo(() => {
        const seen = new Set(apiNodes.map(n => n.uid))
        return [...apiNodes, ...graphExpandedNodes.filter(n => !seen.has(n.uid))]
    }, [apiNodes, graphExpandedNodes])

    const mergedEdges = useMemo(() => {
        const seen = new Set(apiEdges.map(e => e.uid))
        return [...apiEdges, ...graphExpandedEdges.filter(e => !seen.has(e.uid))]
    }, [apiEdges, graphExpandedEdges])

    // Reset expanded data only when parent actually changes (not on remount)
    const prevParentRef = useRef(selectedParentUid)
    useEffect(() => {
        if (prevParentRef.current !== selectedParentUid) {
            prevParentRef.current = selectedParentUid
            resetGraphExpanded()
        }
    }, [selectedParentUid, resetGraphExpanded])

    const {
        filters,
        setSearch,
        toggleSystemLevel,
        setSystemType,
        toggleRelationshipType,
        resetFilters,
    } = useGraphFilters()

    // Apply filters
    const filteredNodes = useMemo(() => filterNodes(mergedNodes, filters), [mergedNodes, filters])
    const visibleNodeUids = useMemo(() => new Set(filteredNodes.map(n => n.uid)), [filteredNodes])
    const filteredEdges = useMemo(
        () => filterEdges(mergedEdges, visibleNodeUids, filters),
        [mergedEdges, visibleNodeUids, filters],
    )
    // Expand handler — fetches subgraph for a node and merges into store
    const handleExpand = useCallback(
        async (uid: string) => {
            const raw = await queryClient.fetchQuery({
                queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY, { uid }],
                queryFn: queryFetcher<SystemGraphResponse>('generalGraph'),
            })
            const data = fromSystemGraphResponse(raw)
            addGraphExpanded(data.nodes, data.links)
            setTimeout(() => rfInstance.current?.fitView({ padding: 0.2 }), 200)
        },
        [queryClient, addGraphExpanded],
    )

    const handleContextMenuChange = useCallback((open: boolean) => {
        if (!open) contextMenuCloseRef.current = Date.now()
    }, [])

    const handleViewDetail = useCallback(
        (uid: string) => {
            selectLeaf(uid)
        },
        [selectLeaf],
    )

    // Transform to ReactFlow format
    const rawNodes = useMemo(
        () => toReactFlowNodes(filteredNodes, { layoutMode, onExpand: handleExpand, onViewDetail: handleViewDetail, onContextMenuChange: handleContextMenuChange }),
        [filteredNodes, layoutMode, handleExpand, handleViewDetail, handleContextMenuChange],
    )
    const rfEdges = useMemo(() => toReactFlowEdges(filteredEdges), [filteredEdges])

    // Apply layout
    const rfNodes = useMemo(() => {
        if (layoutMode === GRAPH_LAYOUT_MODES.HORIZONTAL) {
            return applyHorizontalLayout(rawNodes, rfEdges)
        }
        return applyVerticalLayout(rawNodes, rfEdges)
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
        () => [...new Set(mergedNodes.map(n => n.systemType?.name).filter(Boolean))] as string[],
        [mergedNodes],
    )
    const systemLevels = useMemo(
        () => [...new Set(mergedNodes.map(n => n.systemLevel).filter(Boolean))] as string[],
        [mergedNodes],
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
            if (Date.now() - contextMenuCloseRef.current < 300) return

            if (selectionMode) {
                setSelectedNodes(prev => {
                    if (prev.includes(node.id)) return prev.filter(id => id !== node.id)
                    if (prev.length >= 2) return [prev[1], node.id]
                    const next = [...prev, node.id]
                    if (next.length === 2) {
                        setTimeout(() => {
                            const sourceNode = mergedNodes.find(n => n.uid === next[0])
                            const targetNode = mergedNodes.find(n => n.uid === next[1])
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

            openSystemEdit(node.id)
        },
        [selectionMode, mergedNodes, openModal, closeModal, openSystemEdit],
    )

    const handleEdgeClick = useCallback(
        (_event: React.MouseEvent, edge: Edge) => {
            const apiEdge = mergedEdges.find(e => e.uid === edge.id)
            if (!apiEdge) return

            const sourceNode = mergedNodes.find(n => n.uid === apiEdge.source)
            const targetNode = mergedNodes.find(n => n.uid === apiEdge.target)

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
        [mergedEdges, mergedNodes, openModal, deleteRelationship],
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
