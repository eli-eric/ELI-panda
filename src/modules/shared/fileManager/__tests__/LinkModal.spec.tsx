import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useLinkCreate } from '../hooks/useLinks'
import { LinkModalContent } from '../LinkModal'

jest.mock('../hooks/useLinks', () => ({
    useLinkCreate: jest.fn(),
}))

const mockUseLinkCreate = useLinkCreate as jest.Mock

let mutate: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mutate = jest.fn()
    mockUseLinkCreate.mockReturnValue({ mutate })
})

describe('LinkModalContent', () => {
    it('Continue disabled when url or name missing', () => {
        renderWithProviders(<LinkModalContent />)
        const buttons = screen.getAllByRole('button')
        // 0 = Cancel, 1 = Continue
        expect(buttons[1]).toBeDisabled()
    })

    it('Continue enabled when both url + name filled, click invokes linkCreate', () => {
        renderWithProviders(<LinkModalContent />)
        fireEvent.change(screen.getByLabelText('Link URL'), {
            target: { value: 'https://x' },
        })
        fireEvent.change(screen.getByLabelText('Link Name'), {
            target: { value: 'Docs' },
        })
        const buttons = screen.getAllByRole('button')
        expect(buttons[1]).not.toBeDisabled()
        fireEvent.click(buttons[1])
        expect(mutate).toHaveBeenCalledWith({ name: 'Docs', url: 'https://x' })
    })

    it('Cancel click invokes onClose', () => {
        const onClose = jest.fn()
        renderWithProviders(<LinkModalContent onClose={onClose} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(onClose).toHaveBeenCalled()
    })

    it('passes parentUid into useLinkCreate', () => {
        renderWithProviders(<LinkModalContent parentUid="p-42" />)
        expect(mockUseLinkCreate).toHaveBeenCalledWith({ parentUid: 'p-42' })
    })
})
