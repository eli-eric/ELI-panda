import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { PublicationsFilterSheet } from '../../PublicationsFilterSheet.cont'
import { usePublicationsFilterSheet } from '../usePublicationsFilterSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../PublicationsFilterSheet.cont', () => ({
    PublicationsFilterSheet: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    openModal = jest.fn().mockReturnValue('modal-id')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

const renderOpen = () =>
    renderHook(() => usePublicationsFilterSheet(), { wrapper: AllProvidersWrapper }).result
        .current

describe('usePublicationsFilterSheet', () => {
    it('opens the publications filter sheet on the left with a translated title', () => {
        expect(renderOpen()()).toBe('modal-id')

        expect(openModal).toHaveBeenCalledWith('sheet', {
            id: 'publication-filters-publications',
            component: PublicationsFilterSheet,
            props: {
                title: 'Publication Filters',
                size: 'l',
                side: 'left',
                tableId: 'publications',
                enableQueryURL: true,
            },
        })
    })

    it('scopes the modal id and sheet state to a custom table', () => {
        renderOpen()({ tableId: 'myPublications', enableQueryURL: false, side: 'right' })

        const [, config] = openModal.mock.calls[0]
        expect(config.id).toBe('publication-filters-myPublications')
        expect(config.props).toMatchObject({
            tableId: 'myPublications',
            enableQueryURL: false,
            side: 'right',
        })
    })
})
