import { fireEvent, render, screen } from '@testing-library/react'

import { CodebookSidebarItem } from '../CodebookSidebarItem'

describe('CodebookSidebarItem', () => {
    it('renders code label', () => {
        render(<CodebookSidebarItem code="ABC" isSelected={false} onClick={jest.fn()} />)
        expect(screen.getByRole('button', { name: 'ABC' })).toBeInTheDocument()
    })

    it('applies bg-accent when isSelected', () => {
        const { container } = render(
            <CodebookSidebarItem code="X" isSelected={true} onClick={jest.fn()} />,
        )
        expect(container.querySelector('button')).toHaveClass('bg-accent')
    })

    it('does not apply bg-accent when not selected', () => {
        const { container } = render(
            <CodebookSidebarItem code="X" isSelected={false} onClick={jest.fn()} />,
        )
        expect(container.querySelector('button')).not.toHaveClass('bg-accent')
    })

    it('click fires onClick', () => {
        const onClick = jest.fn()
        render(<CodebookSidebarItem code="X" isSelected={false} onClick={onClick} />)
        fireEvent.click(screen.getByRole('button'))
        expect(onClick).toHaveBeenCalled()
    })
})
