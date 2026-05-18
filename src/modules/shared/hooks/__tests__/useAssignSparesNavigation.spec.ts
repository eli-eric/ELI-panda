import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useAssignSparesNavigation } from '../useAssignSparesNavigation'
import { useRelationsStore } from '@/modules/systemsRelations/store/useRelationsStore'
import useTableStateStore from '@/store/useTableStateStore'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))

jest.mock('@/modules/systemsRelations/store/useRelationsStore', () => ({
    useRelationsStore: jest.fn(),
}))

jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseRelationsStore = useRelationsStore as unknown as jest.Mock
const mockUseTableStateStore = useTableStateStore as unknown as jest.Mock

let push: jest.Mock
let setSearch: jest.Mock
let setColumnFilter: jest.Mock
let setSelectedUidForSystem: jest.Mock
let setSelectedRelationshipType: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    push = jest.fn()
    setSearch = jest.fn()
    setColumnFilter = jest.fn()
    setSelectedUidForSystem = jest.fn()
    setSelectedRelationshipType = jest.fn()
    mockUseRouter.mockReturnValue({ push })
    mockUseRelationsStore.mockReturnValue({
        setSelectedUidForSystem,
        setSelectedRelationshipType,
    })
    mockUseTableStateStore.mockReturnValue({ setSearch, setColumnFilter })
})

describe('useAssignSparesNavigation', () => {
    it('always pushes default ITEM_USAGE filter; pushes catalogueNumber if provided; pushes parentSystem only if parentPath has TechnologyUnit', () => {
        const { result } = renderHook(() =>
            useAssignSparesNavigation({
                uid: 'sys-1',
                parentPath: [
                    { uid: 'top', name: 'TOP', systemLevel: 'KEY_SYSTEMS' as any },
                    { uid: 'tu-1', name: 'TU', systemLevel: 'TECHNOLOGY_UNIT' as any },
                    { uid: 'leaf', name: 'L', systemLevel: 'KEY_SYSTEMS' as any },
                ],
                catalogueNumber: 'CAT-9',
            }),
        )
        result.current()
        const [tableId, filters] = setColumnFilter.mock.calls[0]
        expect(tableId).toBe('spare-parts')
        const ids = (filters as any[]).map(f => f.id)
        expect(ids).toContain('itemUsage')
        expect(ids).toContain('catalogueNumber')
        expect(ids).toContain('parentSystem')
        const parent = (filters as any[]).find(f => f.id === 'parentSystem')
        expect(parent.value).toEqual({ uid: 'tu-1', name: 'TU' })
    })

    it('omits parentSystem filter when no TECHNOLOGY_UNIT in parentPath', () => {
        const { result } = renderHook(() =>
            useAssignSparesNavigation({
                uid: 'sys-1',
                parentPath: [{ uid: 'top', name: 'TOP', systemLevel: 'KEY_SYSTEMS' as any }],
                catalogueNumber: null,
            }),
        )
        result.current()
        const filters = setColumnFilter.mock.calls[0][1] as any[]
        expect(filters.find(f => f.id === 'parentSystem')).toBeUndefined()
        expect(filters.find(f => f.id === 'catalogueNumber')).toBeUndefined()
    })

    it('calls setSearch with uid + relations store setters and pushes to system relations path', () => {
        const { result } = renderHook(() =>
            useAssignSparesNavigation({
                uid: 'sys-9',
                parentPath: null,
                catalogueNumber: null,
            }),
        )
        result.current()
        expect(setSearch).toHaveBeenCalledWith('for-system', 'sys-9')
        expect(setSelectedUidForSystem).toHaveBeenCalledWith('sys-9')
        expect(setSelectedRelationshipType).toHaveBeenCalled()
        expect(push).toHaveBeenCalled()
    })
})
