import { useDetailGraphStore } from '../store/useDetailGraphStore'
import { useDetailGraphFilters } from './useGraphFilters'
import { useRelationshipGraphContainerState } from './useRelationshipGraphContainerState'

export const useDetailGraphState = (rootUid: string) => {
    const layoutMode = useDetailGraphStore(state => state.layoutMode)
    const setLayoutMode = useDetailGraphStore(state => state.setLayoutMode)
    const expandedNodes = useDetailGraphStore(state => state.expandedNodes)
    const expandedEdges = useDetailGraphStore(state => state.expandedEdges)
    const addExpanded = useDetailGraphStore(state => state.addExpanded)
    const setExpanded = useDetailGraphStore(state => state.setExpanded)
    const resetExpanded = useDetailGraphStore(state => state.resetExpanded)

    const filtersHook = useDetailGraphFilters()

    return useRelationshipGraphContainerState({
        rootUid,
        layoutMode,
        setLayoutMode,
        expandedNodes,
        expandedEdges,
        addExpanded,
        setExpanded,
        resetExpanded,
        filtersHook,
    })
}
