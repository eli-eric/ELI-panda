import { render, screen } from '@testing-library/react'

import { HeaderWrapper } from '../HeaderWrapper'

jest.mock('@/components/ui/sidebar', () => ({
    SidebarTrigger: () => <button data-testid="sidebar-trigger" />,
}))

describe('HeaderWrapper', () => {
    it('renders sticky bar with sidebar trigger', () => {
        render(<HeaderWrapper />)
        expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument()
    })

    it('renders children alongside trigger', () => {
        render(
            <HeaderWrapper>
                <span>child</span>
            </HeaderWrapper>,
        )
        expect(screen.getByText('child')).toBeInTheDocument()
    })

    it('top wrapper uses sticky + z-10', () => {
        const { container } = render(<HeaderWrapper />)
        expect(container.firstChild).toHaveClass('sticky', 'top-0', 'z-10')
    })
})
