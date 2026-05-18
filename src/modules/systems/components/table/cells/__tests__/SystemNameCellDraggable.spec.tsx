import { render, screen } from '@testing-library/react'

import { SystemNameCellDraggable } from '../SystemNameCellDraggable.comp'

jest.mock('react-dnd', () => ({
    useDrag: () => [{ isDragging: false }, jest.fn(), jest.fn()],
}))

describe('SystemNameCellDraggable', () => {
    it('renders children inside wrapper', () => {
        render(
            <SystemNameCellDraggable
                original={{ uid: 'u-1' } as any}
                tableId="t-1"
            >
                <span data-testid="child">Hi</span>
            </SystemNameCellDraggable>,
        )
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })
})
