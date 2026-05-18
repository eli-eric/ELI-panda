import { renderHook } from '@testing-library/react'

import { useHierarchyStore } from '../../store/useHierarchyStore'
import { useGraphFilters } from '../useGraphFilters'
import { useHierarchyNavigation } from '../useHierarchyNavigation'
import { useLeavesGraphState } from '../useLeavesGraphState'
import { useRelationshipGraphContainerState } from '../useRelationshipGraphContainerState'

jest.mock('../../store/useHierarchyStore', () => ({
    useHierarchyStore: jest.fn(),
}))

jest.mock('../useGraphFilters', () => ({
    useGraphFilters: jest.fn(),
}))

jest.mock('../useHierarchyNavigation', () => ({
    useHierarchyNavigation: jest.fn(),
}))

jest.mock('../useRelationshipGraphContainerState', () => ({
    useRelationshipGraphContainerState: jest.fn(),
}))

const mockUseHierarchyStore = useHierarchyStore as unknown as jest.Mock
const mockUseGraphFilters = useGraphFilters as jest.Mock
const mockUseHierarchyNavigation = useHierarchyNavigation as jest.Mock
const mockUseContainerState = useRelationshipGraphContainerState as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseHierarchyStore.mockImplementation((selector: any) =>
        selector({
            graphLayoutMode: 'HORIZONTAL',
            setGraphLayoutMode: 'setLayout',
            graphExpandedNodes: ['n1'],
            graphExpandedEdges: ['e1'],
            addGraphExpanded: 'addExpanded',
            setGraphExpanded: 'setExpanded',
            resetGraphExpanded: 'resetExpanded',
        }),
    )
    mockUseHierarchyNavigation.mockReturnValue({ selectedParentUid: 'parent-1' })
    mockUseGraphFilters.mockReturnValue('graphFiltersHook')
    mockUseContainerState.mockReturnValue('containerResult')
})

describe('useLeavesGraphState', () => {
    it('forwards rootUid + store selectors + filtersHook to container state hook', () => {
        renderHook(() => useLeavesGraphState())
        expect(mockUseContainerState).toHaveBeenCalledWith({
            rootUid: 'parent-1',
            layoutMode: 'HORIZONTAL',
            setLayoutMode: 'setLayout',
            expandedNodes: ['n1'],
            expandedEdges: ['e1'],
            addExpanded: 'addExpanded',
            setExpanded: 'setExpanded',
            resetExpanded: 'resetExpanded',
            filtersHook: 'graphFiltersHook',
        })
    })

    it('returns containerState result', () => {
        const { result } = renderHook(() => useLeavesGraphState())
        expect(result.current).toBe('containerResult')
    })
})
