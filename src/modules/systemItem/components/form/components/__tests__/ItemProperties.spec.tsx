import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ItemProperties } from '../ItemProperties'

jest.mock('../ItemProperty', () => ({
    ItemProperty: ({ index, detail }: { index: number; detail: any }) => (
        <div data-testid={`prop-${index}`} data-uid={detail.property.uid} />
    ),
}))

jest.mock('@/components/ui', () => ({
    Disclosure: ({ children }: { children: React.ReactNode }) => (
        <section data-testid="disclosure">{children}</section>
    ),
}))

describe('ItemProperties', () => {
    it('returns null when properties undefined', () => {
        const { container } = renderWithProviders(<ItemProperties properties={undefined} />)
        expect(container.firstChild).toBeNull()
    })

    it('returns null when properties is empty array', () => {
        const { container } = renderWithProviders(<ItemProperties properties={[]} />)
        expect(container.firstChild).toBeNull()
    })

    it('renders one ItemProperty per entry with index', () => {
        const properties = [
            { property: { uid: 'a' } },
            { property: { uid: 'b' } },
            { property: { uid: 'c' } },
        ]
        renderWithProviders(<ItemProperties properties={properties as any} />)
        expect(screen.getByTestId('prop-0').dataset.uid).toBe('a')
        expect(screen.getByTestId('prop-1').dataset.uid).toBe('b')
        expect(screen.getByTestId('prop-2').dataset.uid).toBe('c')
    })
})
