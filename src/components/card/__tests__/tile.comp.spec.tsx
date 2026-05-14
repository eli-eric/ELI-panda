import { render, screen } from '@testing-library/react'

import { ROLE } from '@/types/constants/roles'

import { Tile, TileContainer } from '../tile.comp'

jest.mock('../../auth/AccesControl', () => ({
    AccessControl: ({
        children,
        roles,
    }: {
        children: React.ReactNode
        roles: string
    }) => <div data-testid={`access-${roles}`}>{children}</div>,
}))

const Icon = () => <span data-testid="icon" />

describe('Tile', () => {
    it('wraps in Link when link provided', () => {
        render(<Tile name="X" link="/dest" Icon={Icon} role={ROLE.SYSTEMS_VIEW} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/dest')
    })

    it('renders without Link when no link', () => {
        render(<Tile name="X" Icon={Icon} role={ROLE.SYSTEMS_VIEW} />)
        expect(screen.queryByRole('link')).toBeNull()
        expect(screen.getByTestId('tile-X')).toBeInTheDocument()
    })

    it('passes role through AccessControl', () => {
        render(<Tile name="X" Icon={Icon} role={ROLE.SYSTEMS_VIEW} />)
        expect(screen.getByTestId(`access-${ROLE.SYSTEMS_VIEW}`)).toBeInTheDocument()
    })

    it('renders Icon + name', () => {
        render(<Tile name="My Tile" Icon={Icon} role={ROLE.SYSTEMS_VIEW} />)
        expect(screen.getByTestId('icon')).toBeInTheDocument()
        expect(screen.getByText('My Tile')).toBeInTheDocument()
    })
})

describe('TileContainer', () => {
    it('renders children inside grid container', () => {
        render(
            <TileContainer>
                <span data-testid="kid">k</span>
            </TileContainer>,
        )
        expect(screen.getByTestId('tile-container')).toBeInTheDocument()
        expect(screen.getByTestId('kid')).toBeInTheDocument()
    })
})
