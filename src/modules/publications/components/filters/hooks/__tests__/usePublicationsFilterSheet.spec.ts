import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderHookWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { PublicationsFilterSheet } from '../../PublicationsFilterSheet.cont'
import { usePublicationsFilterSheet } from '../usePublicationsFilterSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('modal-id')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('usePublicationsFilterSheet', () => {
    it('opens a left-hand sheet keyed by the table', () => {
        const { result } = renderHookWithProviders(() => usePublicationsFilterSheet())

        result.current()

        expect(openModal).toHaveBeenCalledWith(
            'sheet',
            expect.objectContaining({
                id: 'publication-filters-publications',
                component: PublicationsFilterSheet,
                props: expect.objectContaining({
                    side: 'left',
                    tableId: 'publications',
                    enableQueryURL: true,
                }),
            }),
        )
    })

    it('honours an explicit table and side', () => {
        const { result } = renderHookWithProviders(() => usePublicationsFilterSheet())

        result.current({ tableId: 'other', side: 'right', enableQueryURL: false })

        expect(openModal).toHaveBeenCalledWith(
            'sheet',
            expect.objectContaining({
                id: 'publication-filters-other',
                props: expect.objectContaining({
                    side: 'right',
                    tableId: 'other',
                    enableQueryURL: false,
                }),
            }),
        )
    })
})
