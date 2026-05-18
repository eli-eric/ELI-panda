import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { DeliveryStatusBadge } from '../delivery-status-badge'

describe('DeliveryStatusBadge', () => {
    it('shows delivered styling + Check icon when isDelivered=true', () => {
        const { container } = renderWithProviders(<DeliveryStatusBadge isDelivered />)
        const badge = container.querySelector('[data-slot="badge"]')
        expect(badge?.className).toContain('bg-green-500')
        // first svg is the Check icon (lucide renders as <svg>)
        expect(badge?.querySelector('svg')).toBeInTheDocument()
    })

    it('shows pending styling + Clock icon when isDelivered=false', () => {
        const { container } = renderWithProviders(<DeliveryStatusBadge isDelivered={false} />)
        const badge = container.querySelector('[data-slot="badge"]')
        expect(badge?.className).toContain('bg-muted')
        expect(badge?.querySelector('svg')).toBeInTheDocument()
    })

    it('passes through additional Badge props (e.g., data-testid)', () => {
        renderWithProviders(
            <DeliveryStatusBadge isDelivered data-testid="dsb" />,
        )
        expect(screen.getByTestId('dsb')).toBeInTheDocument()
    })
})
