import { fireEvent, screen, waitFor } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SaveFilterModalContent } from '../SaveFilterModalContent'

describe('SaveFilterModalContent', () => {
    it('renders name input + Cancel + Save buttons', () => {
        renderWithProviders(<SaveFilterModalContent onSubmit={jest.fn()} onClose={jest.fn()} />)
        expect(screen.getByPlaceholderText('Type filter name')).toBeInTheDocument()
        expect(screen.getAllByRole('button').length).toBe(2)
    })

    it('Cancel click invokes onClose immediately (no submit)', () => {
        const onClose = jest.fn()
        const onSubmit = jest.fn()
        renderWithProviders(<SaveFilterModalContent onSubmit={onSubmit} onClose={onClose} />)
        // first button = Cancel (secondary variant first in DOM order)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(onClose).toHaveBeenCalled()
        expect(onSubmit).not.toHaveBeenCalled()
    })

    it('Save click submits typed name and passes onClose as success cb', async () => {
        const onClose = jest.fn()
        const onSubmit = jest.fn()
        renderWithProviders(<SaveFilterModalContent onSubmit={onSubmit} onClose={onClose} />)
        const input = screen.getByPlaceholderText('Type filter name')
        fireEvent.change(input, { target: { value: 'Monthly stocks' } })
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[1])
        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith('Monthly stocks', onClose)
        })
    })
})
