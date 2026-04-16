import { fireEvent, render, screen } from '@testing-library/react'

import MoveButtons from '../MoveButtons'

describe('MoveButtons', () => {
    it('disables up button when index is 0', () => {
        render(<MoveButtons index={0} length={3} moveUp={jest.fn()} moveDown={jest.fn()} />)
        const [up, down] = screen.getAllByRole('button')
        expect(up).toBeDisabled()
        expect(down).not.toBeDisabled()
    })

    it('disables down button when index is last', () => {
        render(<MoveButtons index={2} length={3} moveUp={jest.fn()} moveDown={jest.fn()} />)
        const [up, down] = screen.getAllByRole('button')
        expect(up).not.toBeDisabled()
        expect(down).toBeDisabled()
    })

    it('disables both buttons when single item (index 0 of length 1)', () => {
        render(<MoveButtons index={0} length={1} moveUp={jest.fn()} moveDown={jest.fn()} />)
        const [up, down] = screen.getAllByRole('button')
        expect(up).toBeDisabled()
        expect(down).toBeDisabled()
    })

    it('calls moveUp with index on up click', () => {
        const moveUp = jest.fn()
        render(<MoveButtons index={1} length={3} moveUp={moveUp} moveDown={jest.fn()} />)
        fireEvent.click(screen.getAllByRole('button')[0])
        expect(moveUp).toHaveBeenCalledWith(1)
    })

    it('calls moveDown with index on down click', () => {
        const moveDown = jest.fn()
        render(<MoveButtons index={1} length={3} moveUp={jest.fn()} moveDown={moveDown} />)
        fireEvent.click(screen.getAllByRole('button')[1])
        expect(moveDown).toHaveBeenCalledWith(1)
    })
})
