import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { GRAPH_LAYOUT_MODES } from '../../../types/graph'
import { LayoutSwitcher } from '../LayoutSwitcher.comp'

describe('LayoutSwitcher', () => {
    it('marks vertical button as active when activeLayout=VERTICAL', () => {
        renderWithProviders(
            <LayoutSwitcher
                activeLayout={GRAPH_LAYOUT_MODES.VERTICAL}
                onLayoutChange={jest.fn()}
            />,
        )
        const [vert, horiz] = screen.getAllByRole('button')
        expect(vert.getAttribute('data-state')).toBe('on')
        expect(horiz.getAttribute('data-state')).toBe('off')
    })

    it('marks horizontal button as active when activeLayout=HORIZONTAL', () => {
        renderWithProviders(
            <LayoutSwitcher
                activeLayout={GRAPH_LAYOUT_MODES.HORIZONTAL}
                onLayoutChange={jest.fn()}
            />,
        )
        const [vert, horiz] = screen.getAllByRole('button')
        expect(vert.getAttribute('data-state')).toBe('off')
        expect(horiz.getAttribute('data-state')).toBe('on')
    })

    it('clicks invoke onLayoutChange with the appropriate mode', () => {
        const onLayoutChange = jest.fn()
        renderWithProviders(
            <LayoutSwitcher
                activeLayout={GRAPH_LAYOUT_MODES.VERTICAL}
                onLayoutChange={onLayoutChange}
            />,
        )
        const [vert, horiz] = screen.getAllByRole('button')
        fireEvent.click(vert)
        fireEvent.click(horiz)
        expect(onLayoutChange).toHaveBeenNthCalledWith(1, GRAPH_LAYOUT_MODES.VERTICAL)
        expect(onLayoutChange).toHaveBeenNthCalledWith(2, GRAPH_LAYOUT_MODES.HORIZONTAL)
    })
})
