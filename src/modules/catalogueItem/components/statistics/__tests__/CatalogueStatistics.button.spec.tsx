import { fireEvent, render, screen } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ModalStatisticsButtonLarge } from '../CatalogueStatistics.button'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../CatalogueStatistics.cont', () => ({
    CatalogueStatisticsContainer: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    // useDynamicModalStore(selector) — selector picks openModal
    mockUseDynamicModalStore.mockImplementation((selector: (s: any) => any) =>
        selector({ openModal }),
    )
})

describe('ModalStatisticsButtonLarge', () => {
    it('renders a button', () => {
        render(<ModalStatisticsButtonLarge />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click opens dialog with catalogue-stats id + modal/xl/title and global undefined uid', () => {
        render(<ModalStatisticsButtonLarge />)
        fireEvent.click(screen.getByRole('button'))
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('catalogue-stats')
        expect(config.props).toEqual({
            variant: 'modal',
            size: 'xl',
            title: 'Physical Items Statistics',
            catalogueItemUid: undefined,
        })
    })
})
