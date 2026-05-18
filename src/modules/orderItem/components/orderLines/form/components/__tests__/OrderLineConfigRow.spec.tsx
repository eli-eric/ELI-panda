import { fireEvent, render, screen } from '@testing-library/react'

import { OrderLineConfigRow } from '../OrderLineConfigRow'

jest.mock('../order-line-system-type-combo', () => ({
    OrderLineSystemTypeCombo: ({
        onChange,
    }: {
        value?: unknown
        onChange: (type: string, sys?: unknown, parent?: unknown) => void
    }) => (
        <button data-testid="combo" onClick={() => onChange('new', { uid: 's', name: 'S' })}>
            combo
        </button>
    ),
}))

const baseConfig = {
    itemName: 'Pump',
    serialNumber: 'SN-1',
    parentSystem: { uid: 'p', name: 'Parent' },
    systemName: 'My System',
    systemType: { uid: 't', name: 'Type' },
} as any

const wrap = (children: React.ReactNode) => (
    <table>
        <tbody>{children}</tbody>
    </table>
)

describe('OrderLineConfigRow', () => {
    it('renders index+1 as 1-based row number', () => {
        render(
            wrap(<OrderLineConfigRow index={2} config={baseConfig} onTypeChange={jest.fn()} />),
        )
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders item name + parent + system name', () => {
        render(
            wrap(<OrderLineConfigRow index={0} config={baseConfig} onTypeChange={jest.fn()} />),
        )
        expect(screen.getByText('Pump')).toBeInTheDocument()
        expect(screen.getByText('Parent')).toBeInTheDocument()
        expect(screen.getByText('My System')).toBeInTheDocument()
    })

    it('serial number column hidden by default', () => {
        render(
            wrap(<OrderLineConfigRow index={0} config={baseConfig} onTypeChange={jest.fn()} />),
        )
        expect(screen.queryByText('SN-1')).toBeNull()
    })

    it('serial number column shown when showSerialNumber=true', () => {
        render(
            wrap(
                <OrderLineConfigRow
                    index={0}
                    config={baseConfig}
                    onTypeChange={jest.fn()}
                    showSerialNumber
                />,
            ),
        )
        expect(screen.getByText('SN-1')).toBeInTheDocument()
    })

    it('serial number fallback to "-" when missing', () => {
        render(
            wrap(
                <OrderLineConfigRow
                    index={0}
                    config={{ ...baseConfig, serialNumber: '' }}
                    onTypeChange={jest.fn()}
                    showSerialNumber
                />,
            ),
        )
        // The "-" appears for parentSystem column when missing too; just ensure cell rendered with the placeholder
        expect(screen.getAllByText('-').length).toBeGreaterThan(0)
    })

    it('parentSystem fallback to "-" when missing', () => {
        render(
            wrap(
                <OrderLineConfigRow
                    index={0}
                    config={{ ...baseConfig, parentSystem: null }}
                    onTypeChange={jest.fn()}
                />,
            ),
        )
        expect(screen.getByText('-')).toBeInTheDocument()
    })

    it('combo change invokes onTypeChange with index + payload', () => {
        const onTypeChange = jest.fn()
        render(
            wrap(<OrderLineConfigRow index={3} config={baseConfig} onTypeChange={onTypeChange} />),
        )
        fireEvent.click(screen.getByTestId('combo'))
        expect(onTypeChange).toHaveBeenCalledWith(
            3,
            'new',
            { uid: 's', name: 'S' },
            undefined,
        )
    })
})
