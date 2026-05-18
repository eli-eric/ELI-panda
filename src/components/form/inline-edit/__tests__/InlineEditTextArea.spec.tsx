import { fireEvent, screen } from '@testing-library/react'

import { FormWrapper } from '@/testutils'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { InlineEditTextArea } from '../InlineEditTextArea'

describe('InlineEditTextArea', () => {
    it('returns null when disabled', () => {
        const { container } = renderWithProviders(
            <FormWrapper>
                <InlineEditTextArea name="notes" label="Notes" disabled />
            </FormWrapper>,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders label in view mode', () => {
        renderWithProviders(
            <FormWrapper>
                <InlineEditTextArea name="notes" label="Notes" />
            </FormWrapper>,
        )
        expect(screen.getByText(/Notes:/)).toBeInTheDocument()
    })

    it('click opens textarea in edit mode (autofocused)', () => {
        const { container } = renderWithProviders(
            <FormWrapper>
                <InlineEditTextArea name="notes" label="Notes" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Notes:/))
        expect(container.querySelector('textarea')).toBeInTheDocument()
    })

    it('plain Enter does NOT save, Ctrl+Enter saves', () => {
        const { container } = renderWithProviders(
            <FormWrapper>
                <InlineEditTextArea name="notes" label="Notes" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Notes:/))
        const ta = container.querySelector('textarea')!
        fireEvent.change(ta, { target: { value: 'hello' } })
        fireEvent.keyDown(ta, { key: 'Enter' })
        // Still in edit mode after plain Enter
        expect(container.querySelector('textarea')).toBeInTheDocument()
        // Ctrl+Enter saves
        fireEvent.keyDown(ta, { key: 'Enter', ctrlKey: true })
        expect(container.querySelector('textarea')).toBeNull()
        expect(screen.getByText('hello')).toBeInTheDocument()
    })

    it('Escape cancels edit (no save)', () => {
        const { container } = renderWithProviders(
            <FormWrapper>
                <InlineEditTextArea name="notes" label="Notes" />
            </FormWrapper>,
        )
        fireEvent.click(screen.getByText(/Notes:/))
        const ta = container.querySelector('textarea')!
        fireEvent.change(ta, { target: { value: 'discarded' } })
        fireEvent.keyDown(ta, { key: 'Escape' })
        expect(container.querySelector('textarea')).toBeNull()
        // Value not saved -> no "discarded" text shown
        expect(screen.queryByText('discarded')).toBeNull()
    })
})
