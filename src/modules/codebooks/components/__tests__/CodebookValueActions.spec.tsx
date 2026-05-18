import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CodebookValueActions } from '../CodebookValueActions'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({
        onClick,
        children,
    }: {
        onClick?: () => void
        children: ReactNode
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
}))

describe('CodebookValueActions', () => {
    it('renders trigger + delete menu button', () => {
        renderWithProviders(<CodebookValueActions onDelete={jest.fn()} />)
        // two buttons: trigger + delete item
        expect(screen.getAllByRole('button').length).toBe(2)
    })

    it('Delete item click invokes onDelete', () => {
        const onDelete = jest.fn()
        renderWithProviders(<CodebookValueActions onDelete={onDelete} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[buttons.length - 1])
        expect(onDelete).toHaveBeenCalled()
    })
})
