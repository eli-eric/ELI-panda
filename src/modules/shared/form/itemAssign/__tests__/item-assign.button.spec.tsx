import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ItemAssignButton } from '../item-assign.button'
import { openItemAssignModal } from '../item-assign.modal'

jest.mock('../item-assign.modal', () => ({
    openItemAssignModal: jest.fn(),
}))

const mockOpenItemAssignModal = openItemAssignModal as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('ItemAssignButton', () => {
    it('renders a button', () => {
        renderWithProviders(<ItemAssignButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click opens item-assign modal', () => {
        renderWithProviders(<ItemAssignButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockOpenItemAssignModal).toHaveBeenCalled()
    })
})
