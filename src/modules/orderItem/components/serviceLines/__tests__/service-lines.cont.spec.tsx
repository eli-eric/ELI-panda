import { render, screen } from '@testing-library/react'

import { useServiceLineContext } from '../../../context'
import { ServiceLinesContainer } from '../service-lines.cont'

jest.mock('../../../context', () => ({
    useServiceLineContext: jest.fn(),
}))

jest.mock('../service-lines.columns', () => ({
    useServiceLinesColumns: jest.fn(() => []),
}))

jest.mock('../service-lines-add-button', () => ({
    ServiceLinesAddButton: () => <button data-testid="add-btn" />,
}))

jest.mock('@/components/ui/table/table', () => ({
    Table: ({ data }: { data: unknown[] }) => (
        <div data-testid="table" data-count={data.length} />
    ),
}))

jest.mock('@/components/layout/Heading', () => ({
    Heading: ({ children, text }: { children?: React.ReactNode; text: string }) => (
        <div data-testid="heading" data-text={text}>
            {children}
        </div>
    ),
}))

const mockUseServiceLineContext = useServiceLineContext as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('ServiceLinesContainer', () => {
    it('renders Add button when not disabled', () => {
        mockUseServiceLineContext.mockReturnValue({ fields: [] })
        render(<ServiceLinesContainer />)
        expect(screen.getByTestId('add-btn')).toBeInTheDocument()
    })

    it('hides Add button when disabledEdit', () => {
        mockUseServiceLineContext.mockReturnValue({ fields: [] })
        render(<ServiceLinesContainer disabledEdit />)
        expect(screen.queryByTestId('add-btn')).toBeNull()
    })

    it('passes service-line fields into Table as data', () => {
        mockUseServiceLineContext.mockReturnValue({
            fields: [{ uid: '1' }, { uid: '2' }, { uid: '3' }],
        })
        render(<ServiceLinesContainer />)
        expect(screen.getByTestId('table').dataset.count).toBe('3')
    })

    it('heading uses ordersPage.serviceLines.header message id', () => {
        mockUseServiceLineContext.mockReturnValue({ fields: [] })
        render(<ServiceLinesContainer />)
        expect(screen.getByTestId('heading').dataset.text).toContain('header')
    })
})
