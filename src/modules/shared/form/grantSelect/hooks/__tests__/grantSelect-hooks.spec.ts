import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useGrantSelectionModal } from '../useGrantSelectionModal'
import { useGrantsForSelect } from '../useGrantsForSelect'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    keepPreviousData: 'keepPreviousData',
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/grant-modal-content', () => ({
    GrantModalContent: () => null,
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryManager.mockReturnValue({ query: { search: 'x' } })
    mockUseQuery.mockReturnValue({ data: undefined })
})

describe('useGrantsForSelect', () => {
    it('builds queryKey under "grants-select" with manager.query', () => {
        renderHook(() => useGrantsForSelect('table-1'))
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'grants-select',
            { query: { search: 'x' } },
        ])
        expect(mockUseQueryManager).toHaveBeenCalledWith('table-1')
    })
})

describe('useGrantSelectionModal', () => {
    it('opens dialog with fixed id, initial selection forwarded to props', () => {
        const openModal = jest.fn(() => 'm1')
        mockUseDynamicModalStore.mockReturnValue({ openModal })

        const { result } = renderHook(() => useGrantSelectionModal())
        const onSelect = jest.fn()
        const initial = [{ uid: 'g1' } as any]
        const id = result.current.openGrantModal(onSelect, initial)

        expect(id).toBe('m1')
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('dialog')
        const config = callArgs[1]
        expect(config.id).toBe('grant-select')
        expect(config.props.size).toBe('xl')
        expect(config.props.onSelect).toBe(onSelect)
        expect(config.props.initialSelected).toBe(initial)
    })
})
