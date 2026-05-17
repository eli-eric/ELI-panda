import { fireEvent, render, screen } from '@testing-library/react'

import { openGraphModal } from '../GraphModal'
import { GraphModalButton, GraphModalTableButton } from '../GraphModalButton'

jest.mock('../GraphModal', () => ({
    openGraphModal: jest.fn(),
}))

const mockOpenGraphModal = openGraphModal as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('GraphModalButton', () => {
    it('returns null without uid', () => {
        const { container } = render(<GraphModalButton />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders button + click opens graph modal with uid', () => {
        render(<GraphModalButton uid="sys-1" />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockOpenGraphModal).toHaveBeenCalledWith('sys-1')
    })
})

describe('GraphModalTableButton', () => {
    it('returns null without uid', () => {
        const { container } = render(<GraphModalTableButton />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders button + click opens graph modal', () => {
        render(<GraphModalTableButton uid="sys-2" />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockOpenGraphModal).toHaveBeenCalledWith('sys-2')
    })

    it('button uses ghost icon variant (hover:text-orange-500)', () => {
        render(<GraphModalTableButton uid="x" />)
        expect(screen.getByRole('button').className).toContain('hover:text-orange-500')
    })
})
