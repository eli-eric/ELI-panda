import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/testutils'

jest.mock('../OrderIsDeliveryForm', () => ({
    OrderIsDeliveryForm: () => <div data-testid="delivery-form" />,
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { OrderIsDeliveryModal } = require('../OrderIsDeliveryModal')

describe('OrderIsDeliveryModal', () => {
    it('renders the inner delivery form', () => {
        renderWithProviders(
            <OrderIsDeliveryModal
                orderLine={{
                    name: 'L',
                    catalogueNumber: 'CAT',
                    serialNumber: 'SN-1',
                } as never}
                onClose={jest.fn()}
                onSubmit={jest.fn()}
            />,
        )
        expect(screen.getByTestId('delivery-form')).toBeInTheDocument()
    })

    it('calls onClose when Close button clicked', () => {
        const onClose = jest.fn()
        renderWithProviders(
            <OrderIsDeliveryModal
                orderLine={{ name: 'L', catalogueNumber: 'CAT' } as never}
                onClose={onClose}
                onSubmit={jest.fn()}
            />,
        )
        const closeBtn = screen
            .getAllByRole('button')
            .find(b => /close/i.test(b.textContent ?? ''))
        if (!closeBtn) throw new Error('close button not found')
        fireEvent.click(closeBtn)
        expect(onClose).toHaveBeenCalled()
    })

    it('submits default values when Save clicked', async () => {
        const onSubmit = jest.fn()
        const onClose = jest.fn()
        renderWithProviders(
            <OrderIsDeliveryModal
                orderLine={{
                    name: 'L',
                    catalogueNumber: 'CAT',
                    serialNumber: 'default-sn',
                } as never}
                onClose={onClose}
                onSubmit={onSubmit}
            />,
        )
        const saveBtn = screen
            .getAllByRole('button')
            .find(b => /save/i.test(b.textContent ?? ''))
        if (!saveBtn) throw new Error('save button not found')
        fireEvent.click(saveBtn)
        await waitFor(() => expect(onSubmit).toHaveBeenCalled())
        const data = onSubmit.mock.calls[0][0]
        expect(data.serialNumber).toBe('default-sn')
    })

    it('calls onClose after successful submit', async () => {
        const onSubmit = jest.fn()
        const onClose = jest.fn()
        renderWithProviders(
            <OrderIsDeliveryModal
                orderLine={{ name: 'L', catalogueNumber: 'CAT' } as never}
                onClose={onClose}
                onSubmit={onSubmit}
            />,
        )
        const saveBtn = screen
            .getAllByRole('button')
            .find(b => /save/i.test(b.textContent ?? ''))
        if (!saveBtn) throw new Error('save button not found')
        fireEvent.click(saveBtn)
        await waitFor(() => expect(onClose).toHaveBeenCalled())
    })
})
