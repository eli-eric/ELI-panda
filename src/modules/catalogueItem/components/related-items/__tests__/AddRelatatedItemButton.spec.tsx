import { fireEvent, render, screen } from '@testing-library/react'

import { AddRelatatedItemButton } from '../AddRelatatedItemButton'
import { openSelectRelatedItemsModal } from '../SelectRelatatedItems.modal'

jest.mock('../SelectRelatatedItems.modal', () => ({
    openSelectRelatedItemsModal: jest.fn(),
}))

const mockOpen = openSelectRelatedItemsModal as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('AddRelatatedItemButton', () => {
    it('renders a button', () => {
        render(<AddRelatatedItemButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click opens related-items selection modal', () => {
        render(<AddRelatatedItemButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockOpen).toHaveBeenCalled()
    })
})
