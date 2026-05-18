import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ItemMoveButton } from '../item-move.button'
import { openItemMoveModal } from '../item-move.modal'

jest.mock('../item-move.modal', () => ({
    openItemMoveModal: jest.fn(),
}))

const mockOpenItemMoveModal = openItemMoveModal as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('ItemMoveButton', () => {
    it('renders a button', () => {
        renderWithProviders(<ItemMoveButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click opens item-move modal', () => {
        renderWithProviders(<ItemMoveButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockOpenItemMoveModal).toHaveBeenCalled()
    })
})
