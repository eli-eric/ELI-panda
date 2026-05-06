import { useHierarchyStore } from '../store/useHierarchyStore'
import { useGraphFilters } from './useGraphFilters'
import { useHierarchyNavigation } from './useHierarchyNavigation'
import { useRelationshipGraphContainerState } from './useRelationshipGraphContainerState'

export const useLeavesGraphState = () => {
    const { selectedParentUid } = useHierarchyNavigation()
    const graphLayoutMode = useHierarchyStore(state => state.graphLayoutMode)
    const setGraphLayoutMode = useHierarchyStore(state => state.setGraphLayoutMode)
    const graphExpandedNodes = useHierarchyStore(state => state.graphExpandedNodes)
    const graphExpandedEdges = useHierarchyStore(state => state.graphExpandedEdges)
    const addGraphExpanded = useHierarchyStore(state => state.addGraphExpanded)
    const setGraphExpanded = useHierarchyStore(state => state.setGraphExpanded)
    const resetGraphExpanded = useHierarchyStore(state => state.resetGraphExpanded)

    const filtersHook = useGraphFilters()

    return useRelationshipGraphContainerState({
        rootUid: selectedParentUid,
        layoutMode: graphLayoutMode,
        setLayoutMode: setGraphLayoutMode,
        expandedNodes: graphExpandedNodes,
        expandedEdges: graphExpandedEdges,
        addExpanded: addGraphExpanded,
        setExpanded: setGraphExpanded,
        resetExpanded: resetGraphExpanded,
        filtersHook,
    })
}
