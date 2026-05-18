import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { InlineEditModalSelect } from '../InlineEditModalSelect'

describe('InlineEditModalSelect', () => {
    it('shows N/A when value null', () => {
        renderWithProviders(<InlineEditModalSelect name="x" label="My Label" />, {
            withForm: true,
        })
        expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    it('shows string value as-is', () => {
        renderWithProviders(<InlineEditModalSelect name="x" label="My Label" />, {
            withForm: true,
            formProps: { defaultValues: { x: 'Plain text' } },
        })
        expect(screen.getByText('Plain text')).toBeInTheDocument()
    })

    it('shows "name (code)" format when both present', () => {
        renderWithProviders(<InlineEditModalSelect name="x" label="My Label" />, {
            withForm: true,
            formProps: { defaultValues: { x: { name: 'Room A', code: 'R-001' } } },
        })
        expect(screen.getByText('Room A (R-001)')).toBeInTheDocument()
    })

    it('shows just name when no code', () => {
        renderWithProviders(<InlineEditModalSelect name="x" label="My Label" />, {
            withForm: true,
            formProps: { defaultValues: { x: { name: 'Without Code' } } },
        })
        expect(screen.getByText('Without Code')).toBeInTheDocument()
    })

    it('click invokes onClick when not disabled', () => {
        const onClick = jest.fn()
        const { container } = renderWithProviders(
            <InlineEditModalSelect name="x" label="L" onClick={onClick} />,
            { withForm: true },
        )
        fireEvent.click(container.firstChild as Element)
        expect(onClick).toHaveBeenCalled()
    })

    it('disabled state ignores onClick', () => {
        const onClick = jest.fn()
        const { container } = renderWithProviders(
            <InlineEditModalSelect name="x" label="L" onClick={onClick} disabled />,
            { withForm: true },
        )
        fireEvent.click(container.firstChild as Element)
        expect(onClick).not.toHaveBeenCalled()
    })

    it('clear button (X) triggers onClear', () => {
        const onClear = jest.fn()
        renderWithProviders(
            <InlineEditModalSelect name="x" label="L" onClear={onClear} />,
            {
                withForm: true,
                formProps: { defaultValues: { x: { name: 'Selected' } } },
            },
        )
        fireEvent.click(screen.getByTitle('Clear selection'))
        expect(onClear).toHaveBeenCalled()
    })
})
