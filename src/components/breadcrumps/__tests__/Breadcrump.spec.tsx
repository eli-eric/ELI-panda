import { fireEvent, render, screen } from '@testing-library/react'

import { BreadcrumpContainer, BreadcrumpItem } from '../index'

describe('BreadcrumpContainer', () => {
    it('renders without home link by default', () => {
        render(
            <BreadcrumpContainer testId="bc">
                <li>child</li>
            </BreadcrumpContainer>,
        )
        expect(screen.getByTestId('bc')).toBeInTheDocument()
        expect(screen.queryByTestId('bc-home')).not.toBeInTheDocument()
    })

    it('renders the home link when homeLink is provided', () => {
        render(
            <BreadcrumpContainer testId="bc" homeLink="/dashboard">
                <li>child</li>
            </BreadcrumpContainer>,
        )
        const home = screen.getByTestId('bc-home')
        expect(home).toBeInTheDocument()
        expect(home).toHaveAttribute('href', '/dashboard')
    })
})

describe('BreadcrumpItem', () => {
    it('renders plain span when no link / setCategoryFilter', () => {
        render(<BreadcrumpItem name="Section" />)
        expect(screen.getByText('Section').tagName.toLowerCase()).toBe('span')
    })

    it('renders a Link when link is provided', () => {
        render(<BreadcrumpItem name="Page" link="/foo" />)
        const link = screen.getByText('Page').closest('a')
        expect(link).toHaveAttribute('href', '/foo')
    })

    it('fires setCategoryFilter with the path payload', () => {
        const setCategoryFilter = jest.fn()
        const path = { uid: 'uid-1', name: 'Cat' } as any
        render(
            <BreadcrumpItem
                name="Click"
                setCategoryFilter={setCategoryFilter}
                path={path}
            />,
        )
        fireEvent.click(screen.getByRole('button', { name: 'Click' }))
        expect(setCategoryFilter).toHaveBeenCalledWith({ uid: 'uid-1', name: 'Cat' })
    })

    it('omits chevron when noIcon=true', () => {
        const { container } = render(<BreadcrumpItem name="Last" noIcon />)
        expect(container.querySelector('svg')).toBeNull()
    })
})
