import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ManufacturerUrl } from '../ManufacturerUrlCell'

jest.mock('@/components/decorators', () => ({
    LinkDecorator: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

const cell = (value: string | undefined) => ({ getValue: () => value }) as any

describe('ManufacturerUrl cell', () => {
    it('returns nothing when value missing', () => {
        const { container } = renderWithProviders(<ManufacturerUrl {...cell(undefined)} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders link with target=_blank when url present', () => {
        renderWithProviders(<ManufacturerUrl {...cell('https://example.com')} />)
        const a = screen.getByRole('link')
        expect(a).toHaveAttribute('href', 'https://example.com')
        expect(a).toHaveAttribute('target', '_blank')
    })

    it('truncates to 25 chars with ellipsis', () => {
        const long = 'https://example.com/'.repeat(5) // 100 chars
        renderWithProviders(<ManufacturerUrl {...cell(long)} />)
        const link = screen.getByRole('link')
        // 25 chars + ellipsis text from message id (translated/i18n)
        expect(link.textContent!.startsWith(long.substring(0, 25))).toBe(true)
        expect(link.textContent!.length).toBeLessThan(long.length)
    })
})
