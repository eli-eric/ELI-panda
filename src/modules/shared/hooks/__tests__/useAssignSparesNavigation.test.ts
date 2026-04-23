import { act, renderHook } from '@testing-library/react'

import { useRelationsStore } from '@/modules/systemsRelations/store/useRelationsStore'
import useTableStateStore from '@/store/useTableStateStore'
import { SystemLevel } from '@/types/gql/graphql'

import { useAssignSparesNavigation } from '../useAssignSparesNavigation'

const mockPush = jest.fn()
jest.mock('next/router', () => ({
    useRouter: () => ({ push: mockPush }),
}))

describe('useAssignSparesNavigation', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        useRelationsStore.getState().setSelectedUidForSystem(undefined)
        useTableStateStore.getState().setSearch('for-system', undefined)
        useTableStateStore.getState().setColumnFilter('spare-parts', [])
    })

    const baseParams = {
        uid: 'system-1',
        parentPath: [
            { uid: 'root', name: 'Root', systemLevel: SystemLevel.KeySystems },
            { uid: 'tu-1', name: 'Tech Unit 1', systemLevel: SystemLevel.TechnologyUnit },
            { uid: 'fg-1', name: 'Func Group 1', systemLevel: SystemLevel.SubsystemsAndParts },
        ],
        catalogueNumber: 'CAT-001',
    }

    it('navigates to /systems/relations', () => {
        const { result } = renderHook(() => useAssignSparesNavigation(baseParams))
        act(() => result.current())
        expect(mockPush).toHaveBeenCalledWith('/systems/relations')
    })

    it('sets catalogueNumber filter', () => {
        const { result } = renderHook(() => useAssignSparesNavigation(baseParams))
        act(() => result.current())

        const filters = useTableStateStore.getState().instances['spare-parts']?.columnFilter
        expect(filters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: 'catalogueNumber', value: 'CAT-001' }),
            ]),
        )
    })

    it('sets parentSystem filter when parent tech unit exists', () => {
        const { result } = renderHook(() => useAssignSparesNavigation(baseParams))
        act(() => result.current())

        const filters = useTableStateStore.getState().instances['spare-parts']?.columnFilter
        expect(filters).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 'parentSystem',
                    value: { uid: 'tu-1', name: 'Tech Unit 1' },
                }),
            ]),
        )
    })

    it('sets itemUsage filter', () => {
        const { result } = renderHook(() => useAssignSparesNavigation(baseParams))
        act(() => result.current())

        const filters = useTableStateStore.getState().instances['spare-parts']?.columnFilter
        expect(filters).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: 'itemUsage' })]),
        )
    })

    it('sets selectedUidForSystem in spares store', () => {
        const { result } = renderHook(() => useAssignSparesNavigation(baseParams))
        act(() => result.current())
        expect(useRelationsStore.getState().selectedUidForSystem).toBe('system-1')
    })

    it('sets search for for-system table', () => {
        const { result } = renderHook(() => useAssignSparesNavigation(baseParams))
        act(() => result.current())
        expect(useTableStateStore.getState().instances['for-system']?.search).toBe('system-1')
    })

    it('skips parentSystem filter when no tech unit in path', () => {
        const params = {
            uid: 'system-2',
            parentPath: [{ uid: 'root', name: 'Root', systemLevel: SystemLevel.KeySystems }],
            catalogueNumber: 'CAT-002',
        }
        const { result } = renderHook(() => useAssignSparesNavigation(params))
        act(() => result.current())

        const filters = useTableStateStore.getState().instances['spare-parts']?.columnFilter
        expect(filters).not.toEqual(
            expect.arrayContaining([expect.objectContaining({ id: 'parentSystem' })]),
        )
    })

    it('handles null parentPath', () => {
        const params = {
            uid: 'system-3',
            parentPath: null,
            catalogueNumber: 'CAT-003',
        }
        const { result } = renderHook(() => useAssignSparesNavigation(params))
        act(() => result.current())

        expect(mockPush).toHaveBeenCalledWith('/systems/relations')
        const filters = useTableStateStore.getState().instances['spare-parts']?.columnFilter
        expect(filters).not.toEqual(
            expect.arrayContaining([expect.objectContaining({ id: 'parentSystem' })]),
        )
    })

    it('skips catalogueNumber filter when null', () => {
        const params = {
            uid: 'system-4',
            parentPath: null,
            catalogueNumber: null,
        }
        const { result } = renderHook(() => useAssignSparesNavigation(params))
        act(() => result.current())

        const filters = useTableStateStore.getState().instances['spare-parts']?.columnFilter
        expect(filters).not.toEqual(
            expect.arrayContaining([expect.objectContaining({ id: 'catalogueNumber' })]),
        )
    })

    it('defaults relationshipType to IS_SPARE_FOR in store', () => {
        const { result } = renderHook(() => useAssignSparesNavigation(baseParams))
        act(() => result.current())
        expect(useRelationsStore.getState().selectedRelationshipType).toBe('IS_SPARE_FOR')
    })

    it('sets explicit relationshipType in store', () => {
        const params = { ...baseParams, relationshipType: 'IS_COOLED_BY' as const }
        const { result } = renderHook(() => useAssignSparesNavigation(params))
        act(() => result.current())
        expect(useRelationsStore.getState().selectedRelationshipType).toBe('IS_COOLED_BY')
    })
})
