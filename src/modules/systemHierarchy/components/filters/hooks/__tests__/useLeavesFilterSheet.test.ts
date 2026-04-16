import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { LEAVES_TABLE_ID } from '../../../../types/constants'
import { useLeavesFilterSheet } from '../useLeavesFilterSheet'

jest.mock('@/store/useDynamicModalStore')

jest.mock('../../LeavesFilterSheet.cont', () => ({
    LeavesFilterSheet: () => null,
}))

const mockOpenModal = jest.fn(() => 'mock-modal-id')

;(useDynamicModalStore as unknown as jest.Mock).mockReturnValue({
    openModal: mockOpenModal,
})

describe('useLeavesFilterSheet', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        ;(useDynamicModalStore as unknown as jest.Mock).mockReturnValue({
            openModal: mockOpenModal,
        })
    })

    it('returns a function', () => {
        const { result } = renderHook(() => useLeavesFilterSheet())
        expect(typeof result.current).toBe('function')
    })

    it('calls openModal with sheet type and correct props', () => {
        const { result } = renderHook(() => useLeavesFilterSheet())
        result.current()

        expect(mockOpenModal).toHaveBeenCalledWith(
            'sheet',
            expect.objectContaining({
                id: `leaves-filters-${LEAVES_TABLE_ID}`,
                props: expect.objectContaining({
                    title: 'Leaves Filters',
                    size: 'l',
                    side: 'left',
                    tableId: LEAVES_TABLE_ID,
                    enableQueryURL: true,
                }),
            }),
        )
    })

    it('supports custom side prop', () => {
        const { result } = renderHook(() => useLeavesFilterSheet())
        result.current({ side: 'right' })

        expect(mockOpenModal).toHaveBeenCalledWith(
            'sheet',
            expect.objectContaining({
                props: expect.objectContaining({
                    side: 'right',
                }),
            }),
        )
    })

    it('returns modal id', () => {
        const { result } = renderHook(() => useLeavesFilterSheet())
        const modalId = result.current()
        expect(modalId).toBe('mock-modal-id')
    })
})
