import { renderHook } from '@testing-library/react'

import { useDetailGraphStore } from '../../store/useDetailGraphStore'
import { useDetailGraphState } from '../useDetailGraphState'
import { useDetailGraphFilters } from '../useGraphFilters'
import { useRelationshipGraphContainerState } from '../useRelationshipGraphContainerState'

jest.mock('../../store/useDetailGraphStore', () => ({
    useDetailGraphStore: jest.fn(),
}))

jest.mock('../useGraphFilters', () => ({
    useDetailGraphFilters: jest.fn(),
}))

jest.mock('../useRelationshipGraphContainerState', () => ({
    useRelationshipGraphContainerState: jest.fn(),
}))

const mockUseDetailGraphStore = useDetailGraphStore as unknown as jest.Mock
const mockUseDetailGraphFilters = useDetailGraphFilters as jest.Mock
const mockUseContainerState = useRelationshipGraphContainerState as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    // each selector returns the corresponding piece
    mockUseDetailGraphStore.mockImplementation((selector: any) => {
        return selector({
            layoutMode: 'VERTICAL',
            setLayoutMode: 'setLayoutMode',
            expandedNodes: ['n1'],
            expandedEdges: ['e1'],
            addExpanded: 'addExpanded',
            setExpanded: 'setExpanded',
            resetExpanded: 'resetExpanded',
        })
    })
    mockUseDetailGraphFilters.mockReturnValue('filtersHook')
    mockUseContainerState.mockReturnValue('containerState')
})

describe('useDetailGraphState', () => {
    it('passes store selectors + filtersHook + rootUid to useRelationshipGraphContainerState', () => {
        renderHook(() => useDetailGraphState('root-1'))
        expect(mockUseContainerState).toHaveBeenCalledWith({
            rootUid: 'root-1',
            layoutMode: 'VERTICAL',
            setLayoutMode: 'setLayoutMode',
            expandedNodes: ['n1'],
            expandedEdges: ['e1'],
            addExpanded: 'addExpanded',
            setExpanded: 'setExpanded',
            resetExpanded: 'resetExpanded',
            filtersHook: 'filtersHook',
        })
    })

    it('returns whatever useRelationshipGraphContainerState returns', () => {
        const { result } = renderHook(() => useDetailGraphState('root-1'))
        expect(result.current).toBe('containerState')
    })
})
