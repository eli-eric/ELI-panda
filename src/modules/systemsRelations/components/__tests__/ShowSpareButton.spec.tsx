import { fireEvent, render, screen } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ShowSpareButton } from '../ShowSpareButton'

jest.mock('@/components/Buttons', () => ({
    TableStatsButton: ({ onClick }: { onClick?: () => void }) => (
        <button type="button" onClick={onClick}>
            stats
        </button>
    ),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    mockUseDynamicModalStore.mockImplementation((selector: any) => selector({ openModal }))
})

describe('ShowSpareButton', () => {
    it('returns null when spare-parts tableId and sparesOut=0', () => {
        const { container } = render(
            <ShowSpareButton uid="x" tableId="spare-parts" sparesOut={0} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('returns null when for-system tableId and sparesIn=0', () => {
        const { container } = render(
            <ShowSpareButton uid="x" tableId="for-system" sparesIn={0} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('systems tableId with both hasSparesIn + hasSparesOut → 2 buttons', () => {
        render(
            <ShowSpareButton uid="x" tableId="systems" sparesIn={1} sparesOut={1} />,
        )
        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('systems tableId with only sparesIn → single SpareParts button', () => {
        render(<ShowSpareButton uid="x" tableId="systems" sparesIn={1} sparesOut={0} />)
        const btn = screen.getByRole('button')
        fireEvent.click(btn)
        expect(openModal.mock.calls[0][1].id).toBe('spare-parts-in-x')
    })

    it('systems tableId with only sparesOut → single SparePartsFor button', () => {
        render(<ShowSpareButton uid="x" tableId="systems" sparesIn={0} sparesOut={1} />)
        const btn = screen.getByRole('button')
        fireEvent.click(btn)
        expect(openModal.mock.calls[0][1].id).toBe('spare-parts-out-x')
    })

    it('systems tableId with neither → null', () => {
        const { container } = render(
            <ShowSpareButton uid="x" tableId="systems" sparesIn={0} sparesOut={0} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('default tableId (other than spare-parts/systems) opens SpareParts (handleSpareShow)', () => {
        render(<ShowSpareButton uid="x" tableId="other" sparesIn={5} sparesOut={5} />)
        fireEvent.click(screen.getByRole('button'))
        expect(openModal.mock.calls[0][1].id).toBe('spare-parts-in-x')
    })
})
