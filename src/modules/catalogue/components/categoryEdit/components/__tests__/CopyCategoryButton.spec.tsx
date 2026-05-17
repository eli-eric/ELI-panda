import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CopyCategoryButton } from '../CopyCategoryButton'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenuItem: ({
        onClick,
        children,
    }: {
        onClick?: (e: any) => void
        children: React.ReactNode
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
}))

describe('CopyCategoryButton', () => {
    it('renders a Copy menu item button', () => {
        renderWithProviders(<CopyCategoryButton handleCopyCategory={jest.fn()} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click forwards to handleCopyCategory', () => {
        const handleCopyCategory = jest.fn()
        renderWithProviders(<CopyCategoryButton handleCopyCategory={handleCopyCategory} />)
        fireEvent.click(screen.getByRole('button'))
        expect(handleCopyCategory).toHaveBeenCalled()
    })
})
