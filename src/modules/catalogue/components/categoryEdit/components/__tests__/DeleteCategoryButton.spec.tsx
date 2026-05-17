import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { DeleteCategoryButton } from '../DeleteCategoryButton'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenuItem: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('DeleteCategoryButton', () => {
    it('renders a delete button with destructive styling', () => {
        renderWithProviders(<DeleteCategoryButton handleDelete={jest.fn()} />)
        const btn = screen.getByRole('button')
        expect(btn).toBeInTheDocument()
        expect(btn.className).toContain('text-destructive')
    })

    it('click forwards to handleDelete', () => {
        const handleDelete = jest.fn()
        renderWithProviders(<DeleteCategoryButton handleDelete={handleDelete} />)
        fireEvent.click(screen.getByRole('button'))
        expect(handleDelete).toHaveBeenCalled()
    })
})
