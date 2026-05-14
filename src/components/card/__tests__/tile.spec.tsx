import { render, screen } from '@testing-library/react'

import { Tile, TileContainer } from '../tile.comp'

jest.mock('../../auth/AccesControl', () => ({
    AccessControl: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const Icon = () => <svg data-testid="icon" />

describe('Tile', () => {
    it('renders name + icon inside a card', () => {
        render(<Tile name="Home" Icon={Icon} role={'ADMIN' as any} />)
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByTestId('icon')).toBeInTheDocument()
        expect(screen.getByTestId('tile-Home')).toBeInTheDocument()
    })

    it('wraps card in a Link when link prop provided', () => {
        const { container } = render(
            <Tile name="Z" link="/zones" Icon={Icon} role={'ADMIN' as any} />,
        )
        const a = container.querySelector('a')
        expect(a).not.toBeNull()
        expect(a?.getAttribute('href')).toBe('/zones')
    })

    it('renders without Link when no link prop', () => {
        const { container } = render(
            <Tile name="NoLink" Icon={Icon} role={'ADMIN' as any} />,
        )
        expect(container.querySelector('a')).toBeNull()
    })
})

describe('TileContainer', () => {
    it('renders children inside grid container', () => {
        render(
            <TileContainer>
                <span>child</span>
            </TileContainer>,
        )
        const grid = screen.getByTestId('tile-container')
        expect(grid).toBeInTheDocument()
        expect(grid.className).toContain('grid')
        expect(grid.textContent).toBe('child')
    })
})
