import { render, screen } from '@testing-library/react'

import { ITEM_USAGE } from '@/modules/systems/types/constants'

import { IconCell } from '../IconCell'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tt" data-content={content}>
            {children}
        </div>
    ),
}))

describe('IconCell', () => {
    it('renders nothing for unknown itemUsageUid', () => {
        const { container } = render(<IconCell />)
        expect(container).toBeEmptyDOMElement()
    })

    const cases: Array<[ITEM_USAGE, string]> = [
        [ITEM_USAGE.SPARE_PART, 'Spare part'],
        [ITEM_USAGE.IN_SYSTEM_PART, 'In system part'],
        [ITEM_USAGE.STOCK_ITEM, 'Stock item'],
        [ITEM_USAGE.EXPERIMENTAL_LOAN_POOL_PART, 'Experimental loan pool part'],
        [ITEM_USAGE.TEST_AND_MEASURMENT, 'Test and measurment'],
        [ITEM_USAGE.OTHER, 'Other'],
    ]

    it.each(cases)('renders tooltip "%s" for %s', (usage, label) => {
        render(<IconCell itemUsageUid={usage} />)
        expect(screen.getByTestId('tt').dataset.content).toBe(label)
    })
})
